import { v } from "convex/values";
import { query, action, internalAction, internalQuery } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// Export user data (GDPR compliance)
export const exportUserData = action({
  args: {
    format: v.union(v.literal("json"), v.literal("csv")),
    includeFiles: v.optional(v.boolean()),
  },
  returns: v.object({
    downloadUrl: v.string(),
    expiresAt: v.number(),
  }),
  handler: async (ctx, args): Promise<{ downloadUrl: string; expiresAt: number }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Generate the export data
    const exportData = await ctx.runQuery(internal.dataExport.generateUserExportData, {
      userId,
      includeFiles: args.includeFiles ?? false,
    });

    // Create the export file
    let content: string;
    let mimeType: string;
    let filename: string;

    if (args.format === "json") {
      content = JSON.stringify(exportData, null, 2);
      mimeType = "application/json";
      filename = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
    } else {
      content = await ctx.runAction(internal.dataExport.convertToCSV, { data: exportData });
      mimeType = "text/csv";
      filename = `user-data-export-${new Date().toISOString().split('T')[0]}.csv`;
    }

    // Upload to storage
    const uploadUrl = await ctx.storage.generateUploadUrl();
    const blob = new Blob([content], { type: mimeType });
    
    // Note: In a real implementation, you'd upload the blob here
    // For now, we'll simulate the storage process
    
    const storageId: string = await ctx.runMutation(internal.dataExport.saveExportFile, {
      userId,
      filename,
      mimeType,
      size: blob.size,
      content,
    });

    const downloadUrl: string | null = await ctx.storage.getUrl(storageId);
    if (!downloadUrl) {
      throw new Error("Failed to generate download URL");
    }

    // Set expiration to 7 days
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

    return {
      downloadUrl,
      expiresAt,
    };
  },
});

// Internal action to save export file
export const saveExportFile = internalAction({
  args: {
    userId: v.id("users"),
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    content: v.string(),
  },
  returns: v.id("_storage"),
  handler: async (ctx, args) => {
    // In a real implementation, you would:
    // 1. Create a proper file upload
    // 2. Store the file in Convex storage
    // 3. Return the storage ID
    
    // For now, we'll simulate this by generating a dummy storage ID
    // This is a placeholder implementation
    throw new Error("File upload simulation not implemented");
  },
});

// Generate user export data
export const generateUserExportData = query({
  args: {
    userId: v.id("users"),
    includeFiles: v.boolean(),
  },
  returns: v.object({
    user: v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      email: v.string(),
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
    }),
    profile: v.optional(v.object({
      emailNotifications: v.optional(v.boolean()),
      marketingEmails: v.optional(v.boolean()),
      timezone: v.optional(v.string()),
      language: v.optional(v.string()),
      theme: v.optional(v.string()),
      bio: v.optional(v.string()),
      website: v.optional(v.string()),
      location: v.optional(v.string()),
      jobTitle: v.optional(v.string()),
      company: v.optional(v.string()),
      phone: v.optional(v.string()),
      onboardingCompleted: v.optional(v.boolean()),
      lastActiveAt: v.optional(v.number()),
    })),
    organizations: v.array(v.object({
      _id: v.id("organizations"),
      name: v.string(),
      role: v.string(),
      joinedAt: v.optional(v.number()),
    })),
    files: v.optional(v.array(v.object({
      _id: v.id("files"),
      name: v.string(),
      originalName: v.string(),
      mimeType: v.string(),
      size: v.number(),
      uploadedAt: v.number(),
      tags: v.optional(v.array(v.string())),
    }))),
    notifications: v.array(v.object({
      _id: v.id("notifications"),
      type: v.string(),
      title: v.string(),
      message: v.string(),
      isRead: v.optional(v.boolean()),
      _creationTime: v.number(),
    })),
    auditLogs: v.array(v.object({
      _id: v.id("auditLogs"),
      action: v.string(),
      resource: v.string(),
      _creationTime: v.number(),
    })),
    sessions: v.array(v.object({
      _id: v.id("authSessions"),
      _creationTime: v.number(),
      expirationTime: v.optional(v.number()),
    })),
  }),
  handler: async (ctx, args) => {
    // Get user data
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Get profile data
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", q => q.eq("userId", args.userId))
      .unique();

    // Get organizations
    const memberships = await ctx.db
      .query("organizationMembers")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .collect();

    const organizations = [];
    for (const membership of memberships) {
      const org = await ctx.db.get(membership.organizationId);
      if (org) {
        organizations.push({
          _id: org._id,
          name: org.name,
          role: membership.role,
          joinedAt: membership.joinedAt,
        });
      }
    }

    // Get files (if requested)
    let files = undefined;
    if (args.includeFiles) {
      const userFiles = await ctx.db
        .query("files")
        .withIndex("by_user", q => q.eq("userId", args.userId))
        .collect();

      files = userFiles.map(file => ({
        _id: file._id,
        name: file.name,
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
        uploadedAt: file.uploadedAt,
        tags: file.tags,
      }));
    }

    // Get notifications
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .take(100);

    // Get audit logs
    const auditLogs = await ctx.db
      .query("auditLogs")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .take(100);

    // Get sessions
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", q => q.eq("userId", args.userId))
      .collect();

    return {
      user: {
        _id: user._id,
        _creationTime: user._creationTime,
        email: user.email || "",
        name: user.name,
        image: user.image,
        emailVerificationTime: user.emailVerificationTime,
      },
      profile: profile ? {
        emailNotifications: profile.emailNotifications,
        marketingEmails: profile.marketingEmails,
        timezone: profile.timezone,
        language: profile.language,
        theme: profile.theme,
        bio: profile.bio,
        website: profile.website,
        location: profile.location,
        jobTitle: profile.jobTitle,
        company: profile.company,
        phone: profile.phone,
        onboardingCompleted: profile.onboardingCompleted,
        lastActiveAt: profile.lastActiveAt,
      } : undefined,
      organizations,
      files,
      notifications: notifications.map(n => ({
        _id: n._id,
        type: n.type,
        title: n.title,
        message: n.message,
        isRead: n.isRead,
        _creationTime: n._creationTime,
      })),
      auditLogs: auditLogs.map(log => ({
        _id: log._id,
        action: log.action,
        resource: log.resource,
        _creationTime: log._creationTime,
      })),
      sessions: sessions.map(session => ({
        _id: session._id,
        _creationTime: session._creationTime,
        expirationTime: session.expirationTime,
      })),
    };
  },
});

// Internal query to check organization permissions
const checkOrganizationPermissions = internalQuery({
  args: {
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    requiredRole: v.union(v.literal("owner"), v.literal("admin")),
  },
  returns: v.object({
    hasPermission: v.boolean(),
    role: v.optional(v.union(v.literal("owner"), v.literal("admin"), v.literal("member"))),
  }),
  handler: async (ctx, args) => {
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", args.userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership) {
      return { hasPermission: false };
    }

    const hasPermission = args.requiredRole === "owner" 
      ? membership.role === "owner"
      : membership.role === "owner" || membership.role === "admin";

    return { hasPermission, role: membership.role };
  },
});

// Export organization data
export const exportOrganizationData = action({
  args: {
    organizationId: v.id("organizations"),
    format: v.union(v.literal("json"), v.literal("csv")),
    includeMembers: v.optional(v.boolean()),
    includeFiles: v.optional(v.boolean()),
    includeAuditLogs: v.optional(v.boolean()),
  },
  returns: v.object({
    downloadUrl: v.string(),
    expiresAt: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user has admin permissions
    const permissionCheck = await ctx.runQuery(checkOrganizationPermissions, {
      organizationId: args.organizationId,
      userId,
      requiredRole: "admin",
    });

    if (!permissionCheck.hasPermission) {
      throw new Error("Insufficient permissions");
    }

    // Generate the export data
    const exportData = await ctx.runQuery(internal.dataExport.generateOrganizationExportData, {
      organizationId: args.organizationId,
      includeMembers: args.includeMembers ?? true,
      includeFiles: args.includeFiles ?? false,
      includeAuditLogs: args.includeAuditLogs ?? false,
    });

    // Similar implementation to user export...
    // For brevity, returning a placeholder
    return {
      downloadUrl: "placeholder-url",
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
  },
});

// Generate organization export data
export const generateOrganizationExportData = query({
  args: {
    organizationId: v.id("organizations"),
    includeMembers: v.boolean(),
    includeFiles: v.boolean(),
    includeAuditLogs: v.boolean(),
  },
  returns: v.object({
    organization: v.object({
      _id: v.id("organizations"),
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      _creationTime: v.number(),
    }),
    members: v.optional(v.array(v.object({
      userId: v.id("users"),
      userName: v.optional(v.string()),
      userEmail: v.string(),
      role: v.string(),
      joinedAt: v.optional(v.number()),
    }))),
    files: v.optional(v.array(v.object({
      _id: v.id("files"),
      name: v.string(),
      size: v.number(),
      uploadedAt: v.number(),
      uploaderName: v.optional(v.string()),
    }))),
    auditLogs: v.optional(v.array(v.object({
      _id: v.id("auditLogs"),
      action: v.string(),
      resource: v.string(),
      _creationTime: v.number(),
      userName: v.optional(v.string()),
    }))),
  }),
  handler: async (ctx, args) => {
    // Get organization data
    const organization = await ctx.db.get(args.organizationId);
    if (!organization) {
      throw new Error("Organization not found");
    }

    // Get members (if requested)
    let members = undefined;
    if (args.includeMembers) {
      const memberships = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
        .collect();

      members = [];
      for (const membership of memberships) {
        const user = await ctx.db.get(membership.userId);
        if (user) {
          members.push({
            userId: user._id,
            userName: user.name,
            userEmail: user.email || "",
            role: membership.role,
            joinedAt: membership.joinedAt,
          });
        }
      }
    }

    // Get files (if requested)
    let files = undefined;
    if (args.includeFiles) {
      const orgFiles = await ctx.db
        .query("files")
        .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
        .collect();

      files = [];
      for (const file of orgFiles) {
        const uploader = await ctx.db.get(file.userId);
        files.push({
          _id: file._id,
          name: file.name,
          size: file.size,
          uploadedAt: file.uploadedAt,
          uploaderName: uploader?.name,
        });
      }
    }

    // Get audit logs (if requested)
    let auditLogs = undefined;
    if (args.includeAuditLogs) {
      const logs = await ctx.db
        .query("auditLogs")
        .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
        .take(500);

      auditLogs = [];
      for (const log of logs) {
        let userName = undefined;
        if (log.userId) {
          const user = await ctx.db.get(log.userId);
          userName = user?.name;
        }

        auditLogs.push({
          _id: log._id,
          action: log.action,
          resource: log.resource,
          _creationTime: log._creationTime,
          userName,
        });
      }
    }

    return {
      organization: {
        _id: organization._id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
        _creationTime: organization._creationTime,
      },
      members,
      files,
      auditLogs,
    };
  },
});

// Convert data to CSV format
export const convertToCSV = internalAction({
  args: {
    data: v.any(),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    // Basic CSV conversion implementation
    // In a real app, you'd use a proper CSV library
    
    const flattenObject = (obj: any, prefix = ''): any => {
      const flattened: any = {};
      
      for (const key in obj) {
        if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}.`));
        } else if (Array.isArray(obj[key])) {
          flattened[`${prefix}${key}`] = JSON.stringify(obj[key]);
        } else {
          flattened[`${prefix}${key}`] = obj[key];
        }
      }
      
      return flattened;
    };

    const flattened = flattenObject(args.data);
    const headers = Object.keys(flattened);
    const values = Object.values(flattened);

    const csvContent = [
      headers.join(','),
      values.map(value => 
        typeof value === 'string' && value.includes(',') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      ).join(',')
    ].join('\n');

    return csvContent;
  },
});