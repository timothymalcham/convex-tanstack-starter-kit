import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// Generate upload URL for file storage
export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.storage.generateUploadUrl();
  },
});

// Save file information after upload
export const saveFile = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    organizationId: v.optional(v.id("organizations")),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      width: v.optional(v.number()),
      height: v.optional(v.number()),
      duration: v.optional(v.number()),
    })),
    expiresAt: v.optional(v.number()),
  },
  returns: v.object({
    fileId: v.id("files"),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // If organizationId is provided, verify user is a member
    if (args.organizationId) {
      const membership = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organizationAndUser", q => 
          q.eq("organizationId", args.organizationId!).eq("userId", userId)
        )
        .filter(q => q.eq(q.field("status"), "active"))
        .unique();

      if (!membership) {
        throw new Error("Not a member of this organization");
      }
    }

    const fileId = await ctx.db.insert("files", {
      storageId: args.storageId,
      userId,
      organizationId: args.organizationId,
      name: args.name,
      originalName: args.originalName,
      mimeType: args.mimeType,
      size: args.size,
      isPublic: args.isPublic ?? false,
      tags: args.tags,
      metadata: args.metadata,
      uploadedAt: Date.now(),
      expiresAt: args.expiresAt,
    });

    // Schedule audit log creation
    await ctx.scheduler.runAfter(0, internal.files.createFileAuditLog, {
      userId,
      organizationId: args.organizationId,
      fileId,
      action: "file.created",
      fileName: args.name,
      fileSize: args.size,
    });

    return { fileId };
  },
});

// Create audit log for file operations
export const createFileAuditLog = action({
  args: {
    userId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    fileId: v.id("files"),
    action: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.auditLogs.createAuditLog, {
      userId: args.userId,
      organizationId: args.organizationId,
      action: args.action,
      resource: "file",
      resourceId: args.fileId,
      details: {
        metadata: {
          fileName: args.fileName,
          fileSize: args.fileSize,
        },
      },
      severity: "low",
    });
    return null;
  },
});

// Get file by ID with access control
export const getFile = query({
  args: {
    fileId: v.id("files"),
  },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("files"),
      _creationTime: v.number(),
      name: v.string(),
      originalName: v.string(),
      mimeType: v.string(),
      size: v.number(),
      url: v.optional(v.string()),
      isPublic: v.optional(v.boolean()),
      tags: v.optional(v.array(v.string())),
      metadata: v.optional(v.object({
        width: v.optional(v.number()),
        height: v.optional(v.number()),
        duration: v.optional(v.number()),
      })),
      uploadedAt: v.number(),
      expiresAt: v.optional(v.number()),
      uploaderName: v.optional(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const file = await ctx.db.get(args.fileId);
    
    if (!file) {
      return null;
    }

    // Check access permissions
    if (!file.isPublic) {
      if (!userId) {
        return null;
      }

      // User can access their own files
      if (file.userId !== userId) {
        // Or organization files if they're a member
        if (file.organizationId) {
          const membership = await ctx.db
            .query("organizationMembers")
            .withIndex("by_organizationAndUser", q => 
              q.eq("organizationId", file.organizationId!).eq("userId", userId)
            )
            .filter(q => q.eq(q.field("status"), "active"))
            .unique();

          if (!membership) {
            return null;
          }
        } else {
          return null;
        }
      }
    }

    // Check if file is expired
    if (file.expiresAt && file.expiresAt < Date.now()) {
      return null;
    }

    // Get uploader information
    const uploader = await ctx.db.get(file.userId);
    
    // Get storage URL
    const url = await ctx.storage.getUrl(file.storageId);

    return {
      _id: file._id,
      _creationTime: file._creationTime,
      name: file.name,
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      url: url ?? undefined,
      isPublic: file.isPublic,
      tags: file.tags,
      metadata: file.metadata,
      uploadedAt: file.uploadedAt,
      expiresAt: file.expiresAt,
      uploaderName: uploader?.name,
    };
  },
});

// List files with pagination and filtering
export const listFiles = query({
  args: {
    organizationId: v.optional(v.id("organizations")),
    mimeTypePrefix: v.optional(v.string()), // e.g., "image/", "video/"
    tags: v.optional(v.array(v.string())),
    limit: v.optional(v.number()),
    includeExpired: v.optional(v.boolean()),
  },
  returns: v.array(v.object({
    _id: v.id("files"),
    _creationTime: v.number(),
    name: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    url: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    uploadedAt: v.number(),
    expiresAt: v.optional(v.number()),
    uploaderName: v.optional(v.string()),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    if (args.organizationId) {
      // Check if user is a member of the organization
      const membership = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organizationAndUser", q => 
          q.eq("organizationId", args.organizationId!).eq("userId", userId)
        )
        .filter(q => q.eq(q.field("status"), "active"))
        .unique();

      if (!membership) {
        return [];
      }
    }

    let files = await (args.organizationId
      ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
      : ctx.db.query("files").withIndex("by_user", q => q.eq("userId", userId))
    ).order("desc").take(args.limit || 50);

    // Apply filters
    files = files.filter(file => {
      // MIME type filter
      if (args.mimeTypePrefix && !file.mimeType.startsWith(args.mimeTypePrefix)) {
        return false;
      }

      // Tags filter
      if (args.tags && args.tags.length > 0) {
        if (!file.tags || !args.tags.some(tag => file.tags!.includes(tag))) {
          return false;
        }
      }

      // Expiration filter
      if (!args.includeExpired && file.expiresAt && file.expiresAt < Date.now()) {
        return false;
      }

      return true;
    });

    // Enhance with additional data
    const enhancedFiles = [];
    for (const file of files) {
      const uploader = await ctx.db.get(file.userId);
      const url = await ctx.storage.getUrl(file.storageId);

      enhancedFiles.push({
        _id: file._id,
        _creationTime: file._creationTime,
        name: file.name,
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
        url: url ?? undefined,
        isPublic: file.isPublic,
        tags: file.tags,
        uploadedAt: file.uploadedAt,
        expiresAt: file.expiresAt,
        uploaderName: uploader?.name,
      });
    }

    return enhancedFiles;
  },
});

// Update file metadata
export const updateFile = mutation({
  args: {
    fileId: v.id("files"),
    name: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    expiresAt: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check permissions
    if (file.userId !== userId) {
      if (file.organizationId) {
        const membership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", file.organizationId!).eq("userId", userId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
          throw new Error("Insufficient permissions");
        }
      } else {
        throw new Error("Insufficient permissions");
      }
    }

    const updates: Record<string, any> = {};
    const { fileId, ...updateFields } = args;

    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(args.fileId, updates);

      // Schedule audit log
      await ctx.scheduler.runAfter(0, internal.files.createFileAuditLog, {
        userId,
        organizationId: file.organizationId,
        fileId: args.fileId,
        action: "file.updated",
        fileName: file.name,
        fileSize: file.size,
      });
    }

    return null;
  },
});

// Delete file
export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check permissions
    if (file.userId !== userId) {
      if (file.organizationId) {
        const membership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", file.organizationId!).eq("userId", userId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
          throw new Error("Insufficient permissions");
        }
      } else {
        throw new Error("Insufficient permissions");
      }
    }

    // Delete from storage
    await ctx.storage.delete(file.storageId);
    
    // Delete from database
    await ctx.db.delete(args.fileId);

    // Schedule audit log
    await ctx.scheduler.runAfter(0, internal.files.createFileAuditLog, {
      userId,
      organizationId: file.organizationId,
      fileId: args.fileId,
      action: "file.deleted",
      fileName: file.name,
      fileSize: file.size,
    });

    return null;
  },
});

// Get file storage statistics
export const getStorageStats = query({
  args: {
    organizationId: v.optional(v.id("organizations")),
  },
  returns: v.object({
    totalFiles: v.number(),
    totalSize: v.number(),
    filesByType: v.record(v.string(), v.number()),
    sizeByType: v.record(v.string(), v.number()),
    recentUploads: v.number(), // last 7 days
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        totalFiles: 0,
        totalSize: 0,
        filesByType: {},
        sizeByType: {},
        recentUploads: 0,
      };
    }

    if (args.organizationId) {
      // Check if user is a member of the organization
      const membership = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organizationAndUser", q => 
          q.eq("organizationId", args.organizationId!).eq("userId", userId)
        )
        .filter(q => q.eq(q.field("status"), "active"))
        .unique();

      if (!membership) {
        return {
          totalFiles: 0,
          totalSize: 0,
          filesByType: {},
          sizeByType: {},
          recentUploads: 0,
        };
      }
    }

    const files = await (args.organizationId
      ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
      : ctx.db.query("files").withIndex("by_user", q => q.eq("userId", userId))
    ).collect();

    // Calculate statistics
    let totalFiles = 0;
    let totalSize = 0;
    const filesByType: Record<string, number> = {};
    const sizeByType: Record<string, number> = {};
    let recentUploads = 0;

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    for (const file of files) {
      // Skip expired files
      if (file.expiresAt && file.expiresAt < Date.now()) {
        continue;
      }

      totalFiles++;
      totalSize += file.size;

      const mimeType = file.mimeType.split('/')[0]; // e.g., "image", "video", "application"
      filesByType[mimeType] = (filesByType[mimeType] || 0) + 1;
      sizeByType[mimeType] = (sizeByType[mimeType] || 0) + file.size;

      if (file.uploadedAt > sevenDaysAgo) {
        recentUploads++;
      }
    }

    return {
      totalFiles,
      totalSize,
      filesByType,
      sizeByType,
      recentUploads,
    };
  },
});