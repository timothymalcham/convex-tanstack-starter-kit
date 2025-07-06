import { v } from "convex/values";
import { mutation, query, action, internalMutation, internalQuery } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// Batch update user statuses
export const batchUpdateUserStatuses = mutation({
  args: {
    organizationId: v.id("organizations"),
    userIds: v.array(v.id("users")),
    status: v.union(
      v.literal("active"),
      v.literal("suspended")
    ),
    reason: v.optional(v.string()),
  },
  returns: v.object({
    successCount: v.number(),
    failureCount: v.number(),
    failures: v.array(v.object({
      userId: v.id("users"),
      error: v.string(),
    })),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user has admin permissions
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      throw new Error("Insufficient permissions");
    }

    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (const targetUserId of args.userIds) {
      try {
        // Don't allow modifying owner accounts unless current user is also owner
        const targetMembership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", args.organizationId).eq("userId", targetUserId)
          )
          .unique();

        if (!targetMembership) {
          failures.push({
            userId: targetUserId,
            error: "User is not a member of this organization",
          });
          failureCount++;
          continue;
        }

        if (targetMembership.role === "owner" && membership.role !== "owner") {
          failures.push({
            userId: targetUserId,
            error: "Cannot modify owner account",
          });
          failureCount++;
          continue;
        }

        // Update status
        await ctx.db.patch(targetMembership._id, {
          status: args.status,
        });

        // Create audit log
        await ctx.scheduler.runAfter(0, internal.adminOperations.createAdminAuditLog, {
          adminUserId: userId,
          organizationId: args.organizationId,
          action: `user.status.${args.status}`,
          targetUserId,
          reason: args.reason,
        });

        successCount++;
      } catch (error) {
        failures.push({
          userId: targetUserId,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        failureCount++;
      }
    }

    return {
      successCount,
      failureCount,
      failures,
    };
  },
});

// Batch delete files
export const batchDeleteFiles = mutation({
  args: {
    organizationId: v.optional(v.id("organizations")),
    fileIds: v.array(v.id("files")),
  },
  returns: v.object({
    successCount: v.number(),
    failureCount: v.number(),
    totalSizeDeleted: v.number(),
    failures: v.array(v.object({
      fileId: v.id("files"),
      error: v.string(),
    })),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check permissions
    if (args.organizationId) {
      const membership = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organizationAndUser", q => 
          q.eq("organizationId", args.organizationId!).eq("userId", userId)
        )
        .filter(q => q.eq(q.field("status"), "active"))
        .unique();

      if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
        throw new Error("Insufficient permissions");
      }
    }

    let successCount = 0;
    let failureCount = 0;
    let totalSizeDeleted = 0;
    const failures = [];

    for (const fileId of args.fileIds) {
      try {
        const file = await ctx.db.get(fileId);
        if (!file) {
          failures.push({
            fileId,
            error: "File not found",
          });
          failureCount++;
          continue;
        }

        // Check access permissions
        if (file.userId !== userId) {
          if (args.organizationId && file.organizationId === args.organizationId) {
            // Admin can delete organization files
          } else {
            failures.push({
              fileId,
              error: "Insufficient permissions",
            });
            failureCount++;
            continue;
          }
        }

        // Delete from storage
        await ctx.storage.delete(file.storageId);
        
        // Delete from database
        await ctx.db.delete(fileId);

        totalSizeDeleted += file.size;
        successCount++;

        // Create audit log
        await ctx.scheduler.runAfter(0, internal.adminOperations.createAdminAuditLog, {
          adminUserId: userId,
          organizationId: args.organizationId,
          action: "file.batch_deleted",
          targetUserId: file.userId,
          details: {
            fileName: file.name,
            fileSize: file.size,
          },
        });

      } catch (error) {
        failures.push({
          fileId,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        failureCount++;
      }
    }

    return {
      successCount,
      failureCount,
      totalSizeDeleted,
      failures,
    };
  },
});

// Batch send notifications
export const batchSendNotifications = mutation({
  args: {
    organizationId: v.id("organizations"),
    userIds: v.array(v.id("users")),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    actionUrl: v.optional(v.string()),
    actionText: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  returns: v.object({
    successCount: v.number(),
    failureCount: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user has admin permissions
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      throw new Error("Insufficient permissions");
    }

    let successCount = 0;
    let failureCount = 0;

    for (const targetUserId of args.userIds) {
      try {
        // Verify user is a member of the organization
        const targetMembership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", args.organizationId).eq("userId", targetUserId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        if (!targetMembership) {
          failureCount++;
          continue;
        }

        // Create notification
        await ctx.scheduler.runAfter(0, internal.notifications.createNotification, {
          userId: targetUserId,
          organizationId: args.organizationId,
          type: args.type,
          title: args.title,
          message: args.message,
          actionUrl: args.actionUrl,
          actionText: args.actionText,
          expiresAt: args.expiresAt,
        });

        successCount++;
      } catch (error) {
        failureCount++;
      }
    }

    return {
      successCount,
      failureCount,
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

// Batch cleanup expired data
export const batchCleanupExpiredData = action({
  args: {
    organizationId: v.optional(v.id("organizations")),
    dataTypes: v.array(v.union(
      v.literal("notifications"),
      v.literal("files"),
      v.literal("sessions"),
      v.literal("audit_logs")
    )),
  },
  returns: v.object({
    notificationsDeleted: v.number(),
    filesDeleted: v.number(),
    sessionsDeleted: v.number(),
    auditLogsDeleted: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check permissions for organization-level cleanup
    if (args.organizationId) {
      const permissionCheck = await ctx.runQuery(checkOrganizationPermissions, {
        organizationId: args.organizationId,
        userId,
        requiredRole: "owner",
      });

      if (!permissionCheck.hasPermission) {
        throw new Error("Only organization owners can perform bulk cleanup");
      }
    }

    const results = {
      notificationsDeleted: 0,
      filesDeleted: 0,
      sessionsDeleted: 0,
      auditLogsDeleted: 0,
    };

    const now = Date.now();

    // Cleanup expired notifications
    if (args.dataTypes.includes("notifications")) {
      results.notificationsDeleted = await ctx.runMutation(internal.adminOperations.cleanupExpiredNotifications, {
        organizationId: args.organizationId,
        beforeTime: now,
      });
    }

    // Cleanup expired files
    if (args.dataTypes.includes("files")) {
      results.filesDeleted = await ctx.runMutation(internal.adminOperations.cleanupExpiredFiles, {
        organizationId: args.organizationId,
        beforeTime: now,
      });
    }

    // Cleanup expired sessions
    if (args.dataTypes.includes("sessions")) {
      results.sessionsDeleted = await ctx.runMutation(internal.sessions.cleanupExpiredSessions, {});
    }

    // Cleanup old audit logs (older than 1 year)
    if (args.dataTypes.includes("audit_logs")) {
      const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
      results.auditLogsDeleted = await ctx.runMutation(internal.adminOperations.cleanupOldAuditLogs, {
        organizationId: args.organizationId,
        beforeTime: oneYearAgo,
      });
    }

    return results;
  },
});

// Internal cleanup functions
export const cleanupExpiredNotifications = internalMutation({
  args: {
    organizationId: v.optional(v.id("organizations")),
    beforeTime: v.number(),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    const expiredNotifications = await (args.organizationId
      ? ctx.db.query("notifications").withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      : ctx.db.query("notifications"))
      .filter(q => 
        q.and(
          q.neq(q.field("expiresAt"), undefined),
          q.lt(q.field("expiresAt"), args.beforeTime)
        )
      )
      .collect();

    for (const notification of expiredNotifications) {
      await ctx.db.delete(notification._id);
    }

    return expiredNotifications.length;
  },
});

export const cleanupExpiredFiles = internalMutation({
  args: {
    organizationId: v.optional(v.id("organizations")),
    beforeTime: v.number(),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    const expiredFiles = await (args.organizationId
      ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      : ctx.db.query("files"))
      .filter(q => 
        q.and(
          q.neq(q.field("expiresAt"), undefined),
          q.lt(q.field("expiresAt"), args.beforeTime)
        )
      )
      .collect();

    for (const file of expiredFiles) {
      try {
        await ctx.storage.delete(file.storageId);
      } catch (error) {
        // File might already be deleted from storage, continue with database cleanup
      }
      await ctx.db.delete(file._id);
    }

    return expiredFiles.length;
  },
});

export const cleanupOldAuditLogs = internalMutation({
  args: {
    organizationId: v.optional(v.id("organizations")),
    beforeTime: v.number(),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    const oldLogs = await (args.organizationId
      ? ctx.db.query("auditLogs").withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      : ctx.db.query("auditLogs"))
      .filter(q => q.lt(q.field("_creationTime"), args.beforeTime))
      .take(1000); // Process in batches to avoid timeouts

    for (const log of oldLogs) {
      await ctx.db.delete(log._id);
    }

    return oldLogs.length;
  },
});

// Create admin audit log
export const createAdminAuditLog = action({
  args: {
    adminUserId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    action: v.string(),
    targetUserId: v.optional(v.id("users")),
    reason: v.optional(v.string()),
    details: v.optional(v.record(v.string(), v.any())),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.auditLogs.createAuditLog, {
      userId: args.adminUserId,
      organizationId: args.organizationId,
      action: args.action,
      resource: "admin_operation",
      resourceId: args.targetUserId,
      details: {
        metadata: {
          reason: args.reason,
          ...args.details,
        },
      },
      severity: "medium",
    });
    return null;
  },
});

// Get admin dashboard statistics
export const getAdminStats = query({
  args: {
    organizationId: v.id("organizations"),
  },
  returns: v.object({
    totalMembers: v.number(),
    activeMembers: v.number(),
    totalFiles: v.number(),
    totalStorageUsed: v.number(),
    recentActivity: v.number(),
    pendingInvitations: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user has admin permissions
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      throw new Error("Insufficient permissions");
    }

    // Get member statistics
    const allMembers = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .collect();

    const activeMembers = allMembers.filter(m => m.status === "active").length;
    const pendingInvitations = allMembers.filter(m => m.status === "invited").length;

    // Get file statistics
    const files = await ctx.db
      .query("files")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .collect();

    const totalFiles = files.length;
    const totalStorageUsed = files.reduce((sum, file) => sum + file.size, 0);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentAuditLogs = await ctx.db
      .query("auditLogs")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .filter(q => q.gte(q.field("_creationTime"), sevenDaysAgo))
      .collect();

    return {
      totalMembers: allMembers.length,
      activeMembers,
      totalFiles,
      totalStorageUsed,
      recentActivity: recentAuditLogs.length,
      pendingInvitations,
    };
  },
});