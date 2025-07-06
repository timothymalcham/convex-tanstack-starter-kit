import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create a notification
export const createNotification = internalMutation({
  args: {
    userId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("invitation"),
      v.literal("billing"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    actionUrl: v.optional(v.string()),
    actionText: v.optional(v.string()),
    metadata: v.optional(v.object({
      relatedEntityId: v.optional(v.string()),
      relatedEntityType: v.optional(v.string()),
    })),
    expiresAt: v.optional(v.number()),
  },
  returns: v.id("notifications"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      ...args,
      isRead: false,
    });
  },
});

// Get user notifications
export const getUserNotifications = query({
  args: {
    limit: v.optional(v.number()),
    unreadOnly: v.optional(v.boolean()),
    type: v.optional(v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("invitation"),
      v.literal("billing"),
      v.literal("system")
    )),
  },
  returns: v.array(v.object({
    _id: v.id("notifications"),
    _creationTime: v.number(),
    organizationId: v.optional(v.id("organizations")),
    organizationName: v.optional(v.string()),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("invitation"),
      v.literal("billing"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    isRead: v.optional(v.boolean()),
    readAt: v.optional(v.number()),
    actionUrl: v.optional(v.string()),
    actionText: v.optional(v.string()),
    metadata: v.optional(v.object({
      relatedEntityId: v.optional(v.string()),
      relatedEntityType: v.optional(v.string()),
    })),
    expiresAt: v.optional(v.number()),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    let query = ctx.db
      .query("notifications")
      .withIndex("by_user", q => q.eq("userId", userId))
      .order("desc");

    // Filter by unread status
    if (args.unreadOnly) {
      query = query.filter(q => q.eq(q.field("isRead"), false));
    }

    // Filter by type
    if (args.type) {
      query = query.filter(q => q.eq(q.field("type"), args.type));
    }

    // Filter out expired notifications
    const now = Date.now();
    query = query.filter(q => 
      q.or(
        q.eq(q.field("expiresAt"), undefined),
        q.gte(q.field("expiresAt"), now)
      )
    );

    const notifications = await query.take(args.limit || 50);

    // Enhance with organization information
    const enhancedNotifications = [];
    for (const notification of notifications) {
      let organizationName: string | undefined;

      if (notification.organizationId) {
        const organization = await ctx.db.get(notification.organizationId);
        organizationName = organization?.name;
      }

      enhancedNotifications.push({
        _id: notification._id,
        _creationTime: notification._creationTime,
        organizationId: notification.organizationId,
        organizationName,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        isRead: notification.isRead,
        readAt: notification.readAt,
        actionUrl: notification.actionUrl,
        actionText: notification.actionText,
        metadata: notification.metadata,
        expiresAt: notification.expiresAt,
      });
    }

    return enhancedNotifications;
  },
});

// Mark notification as read
export const markNotificationRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const notification = await ctx.db.get(args.notificationId);
    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found");
    }

    await ctx.db.patch(args.notificationId, {
      isRead: true,
      readAt: Date.now(),
    });

    return null;
  },
});

// Mark all notifications as read
export const markAllNotificationsRead = mutation({
  args: {
    organizationId: v.optional(v.id("organizations")),
  },
  returns: v.object({
    updatedCount: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    let query = ctx.db
      .query("notifications")
      .withIndex("by_userAndIsRead", q => q.eq("userId", userId).eq("isRead", false));

    if (args.organizationId) {
      query = query.filter(q => q.eq(q.field("organizationId"), args.organizationId));
    }

    const unreadNotifications = await query.collect();

    for (const notification of unreadNotifications) {
      await ctx.db.patch(notification._id, {
        isRead: true,
        readAt: Date.now(),
      });
    }

    return { updatedCount: unreadNotifications.length };
  },
});

// Delete notification
export const deleteNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const notification = await ctx.db.get(args.notificationId);
    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found");
    }

    await ctx.db.delete(args.notificationId);
    return null;
  },
});

// Get notification count
export const getNotificationCount = query({
  args: {
    unreadOnly: v.optional(v.boolean()),
    organizationId: v.optional(v.id("organizations")),
  },
  returns: v.object({
    total: v.number(),
    unread: v.number(),
    byType: v.record(v.string(), v.number()),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { total: 0, unread: 0, byType: {} };
    }

    let allQuery = ctx.db
      .query("notifications")
      .withIndex("by_user", q => q.eq("userId", userId));

    let unreadQuery = ctx.db
      .query("notifications")
      .withIndex("by_userAndIsRead", q => q.eq("userId", userId).eq("isRead", false));

    if (args.organizationId) {
      allQuery = allQuery.filter(q => q.eq(q.field("organizationId"), args.organizationId));
      unreadQuery = unreadQuery.filter(q => q.eq(q.field("organizationId"), args.organizationId));
    }

    // Filter out expired notifications
    const now = Date.now();
    const expiredFilter = (q: any) => 
      q.or(
        q.eq(q.field("expiresAt"), undefined),
        q.gte(q.field("expiresAt"), now)
      );

    allQuery = allQuery.filter(expiredFilter);
    unreadQuery = unreadQuery.filter(expiredFilter);

    const [allNotifications, unreadNotifications] = await Promise.all([
      allQuery.collect(),
      unreadQuery.collect(),
    ]);

    // Count by type
    const byType: Record<string, number> = {};
    for (const notification of unreadNotifications) {
      byType[notification.type] = (byType[notification.type] || 0) + 1;
    }

    return {
      total: allNotifications.length,
      unread: unreadNotifications.length,
      byType,
    };
  },
});

// Get/Set notification preferences
export const getNotificationPreferences = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("notificationPreferences"),
      emailNotifications: v.optional(v.boolean()),
      pushNotifications: v.optional(v.boolean()),
      preferences: v.object({
        invitations: v.optional(v.boolean()),
        billing: v.optional(v.boolean()),
        system: v.optional(v.boolean()),
        marketing: v.optional(v.boolean()),
        teamUpdates: v.optional(v.boolean()),
      }),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const preferences = await ctx.db
      .query("notificationPreferences")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();

    if (!preferences) {
      return null;
    }

    return {
      _id: preferences._id,
      emailNotifications: preferences.emailNotifications,
      pushNotifications: preferences.pushNotifications,
      preferences: preferences.preferences,
    };
  },
});

export const updateNotificationPreferences = mutation({
  args: {
    emailNotifications: v.optional(v.boolean()),
    pushNotifications: v.optional(v.boolean()),
    preferences: v.optional(v.object({
      invitations: v.optional(v.boolean()),
      billing: v.optional(v.boolean()),
      system: v.optional(v.boolean()),
      marketing: v.optional(v.boolean()),
      teamUpdates: v.optional(v.boolean()),
    })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingPreferences = await ctx.db
      .query("notificationPreferences")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();

    const updates: Record<string, any> = {};
    if (args.emailNotifications !== undefined) {
      updates.emailNotifications = args.emailNotifications;
    }
    if (args.pushNotifications !== undefined) {
      updates.pushNotifications = args.pushNotifications;
    }
    if (args.preferences !== undefined) {
      updates.preferences = args.preferences;
    }

    if (existingPreferences) {
      await ctx.db.patch(existingPreferences._id, updates);
    } else {
      await ctx.db.insert("notificationPreferences", {
        userId,
        emailNotifications: args.emailNotifications ?? true,
        pushNotifications: args.pushNotifications ?? true,
        preferences: args.preferences ?? {
          invitations: true,
          billing: true,
          system: true,
          marketing: false,
          teamUpdates: true,
        },
      });
    }

    return null;
  },
});