import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create an audit log entry
export const createAuditLog = internalMutation({
  args: {
    userId: v.optional(v.id("users")),
    organizationId: v.optional(v.id("organizations")),
    action: v.string(),
    resource: v.string(),
    resourceId: v.optional(v.string()),
    details: v.optional(v.object({
      changes: v.optional(v.record(v.string(), v.any())),
      metadata: v.optional(v.record(v.string(), v.any())),
    })),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    severity: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
  },
  returns: v.id("auditLogs"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("auditLogs", args);
  },
});

// Get audit logs for an organization
export const getOrganizationAuditLogs = query({
  args: {
    organizationId: v.id("organizations"),
    limit: v.optional(v.number()),
    severity: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    )),
    action: v.optional(v.string()),
  },
  returns: v.array(v.object({
    _id: v.id("auditLogs"),
    _creationTime: v.number(),
    userId: v.optional(v.id("users")),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string()),
    action: v.string(),
    resource: v.string(),
    resourceId: v.optional(v.string()),
    details: v.optional(v.object({
      changes: v.optional(v.record(v.string(), v.any())),
      metadata: v.optional(v.record(v.string(), v.any())),
    })),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    severity: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // Check if user has access to this organization
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
      return [];
    }

    let query = ctx.db
      .query("auditLogs")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .order("desc");

    // Apply filters
    if (args.severity) {
      query = query.filter(q => q.eq(q.field("severity"), args.severity));
    }

    if (args.action) {
      query = query.filter(q => q.eq(q.field("action"), args.action));
    }

    const logs = await query.take(args.limit || 50);

    // Enhance with user information
    const enhancedLogs = [];
    for (const log of logs) {
      let userName: string | undefined;
      let userEmail: string | undefined;

      if (log.userId) {
        const user = await ctx.db.get(log.userId);
        if (user) {
          userName = user.name;
          userEmail = user.email;
        }
      }

      enhancedLogs.push({
        _id: log._id,
        _creationTime: log._creationTime,
        userId: log.userId,
        userName,
        userEmail,
        action: log.action,
        resource: log.resource,
        resourceId: log.resourceId,
        details: log.details,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        severity: log.severity,
      });
    }

    return enhancedLogs;
  },
});

// Get audit logs for a specific user (admin only)
export const getUserAuditLogs = query({
  args: {
    targetUserId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    limit: v.optional(v.number()),
  },
  returns: v.array(v.object({
    _id: v.id("auditLogs"),
    _creationTime: v.number(),
    action: v.string(),
    resource: v.string(),
    resourceId: v.optional(v.string()),
    details: v.optional(v.object({
      changes: v.optional(v.record(v.string(), v.any())),
      metadata: v.optional(v.record(v.string(), v.any())),
    })),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    severity: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // Check permissions - user can view their own logs or admin can view any
    if (userId !== args.targetUserId) {
      if (args.organizationId) {
        const membership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", args.organizationId).eq("userId", userId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
          return [];
        }
      } else {
        // Only allow viewing own logs unless organization admin
        return [];
      }
    }

    let query = ctx.db
      .query("auditLogs")
      .withIndex("by_user", q => q.eq("userId", args.targetUserId))
      .order("desc");

    if (args.organizationId) {
      query = query.filter(q => q.eq(q.field("organizationId"), args.organizationId));
    }

    const logs = await query.take(args.limit || 50);

    return logs.map(log => ({
      _id: log._id,
      _creationTime: log._creationTime,
      action: log.action,
      resource: log.resource,
      resourceId: log.resourceId,
      details: log.details,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      severity: log.severity,
    }));
  },
});

// Get audit log statistics
export const getAuditLogStats = query({
  args: {
    organizationId: v.id("organizations"),
    days: v.optional(v.number()), // Default to last 30 days
  },
  returns: v.object({
    totalLogs: v.number(),
    severityBreakdown: v.record(v.string(), v.number()),
    actionBreakdown: v.record(v.string(), v.number()),
    resourceBreakdown: v.record(v.string(), v.number()),
    dailyActivity: v.array(v.object({
      date: v.string(),
      count: v.number(),
    })),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check permissions
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

    const days = args.days || 30;
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);

    const logs = await ctx.db
      .query("auditLogs")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .filter(q => q.gte(q.field("_creationTime"), cutoffTime))
      .collect();

    // Calculate statistics
    const severityBreakdown: Record<string, number> = {};
    const actionBreakdown: Record<string, number> = {};
    const resourceBreakdown: Record<string, number> = {};
    const dailyActivity: Record<string, number> = {};

    for (const log of logs) {
      // Severity breakdown
      severityBreakdown[log.severity] = (severityBreakdown[log.severity] || 0) + 1;
      
      // Action breakdown
      actionBreakdown[log.action] = (actionBreakdown[log.action] || 0) + 1;
      
      // Resource breakdown
      resourceBreakdown[log.resource] = (resourceBreakdown[log.resource] || 0) + 1;
      
      // Daily activity
      const date = new Date(log._creationTime).toISOString().split('T')[0];
      dailyActivity[date] = (dailyActivity[date] || 0) + 1;
    }

    // Convert daily activity to array format
    const dailyActivityArray = Object.entries(dailyActivity)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalLogs: logs.length,
      severityBreakdown,
      actionBreakdown,
      resourceBreakdown,
      dailyActivity: dailyActivityArray,
    };
  },
});