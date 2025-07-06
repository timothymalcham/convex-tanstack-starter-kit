import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Global search across multiple entities
export const globalSearch = query({
  args: {
    query: v.string(),
    organizationId: v.optional(v.id("organizations")),
    entityTypes: v.optional(v.array(v.union(
      v.literal("users"),
      v.literal("organizations"),
      v.literal("files"),
      v.literal("notifications")
    ))),
    limit: v.optional(v.number()),
  },
  returns: v.object({
    users: v.array(v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      email: v.string(),
      image: v.optional(v.string()),
      type: v.literal("user"),
    })),
    organizations: v.array(v.object({
      _id: v.id("organizations"),
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      type: v.literal("organization"),
    })),
    files: v.array(v.object({
      _id: v.id("files"),
      name: v.string(),
      originalName: v.string(),
      mimeType: v.string(),
      size: v.number(),
      uploadedAt: v.number(),
      type: v.literal("file"),
    })),
    notifications: v.array(v.object({
      _id: v.id("notifications"),
      title: v.string(),
      message: v.string(),
      type: v.union(
        v.literal("info"),
        v.literal("success"),
        v.literal("warning"),
        v.literal("error"),
        v.literal("invitation"),
        v.literal("billing"),
        v.literal("system")
      ),
      _creationTime: v.number(),
    })),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId || !args.query.trim()) {
      return {
        users: [],
        organizations: [],
        files: [],
        notifications: [],
      };
    }

    const limit = args.limit || 10;
    const entityTypes = args.entityTypes || ["users", "organizations", "files", "notifications"];
    
    const results = {
      users: [] as any[],
      organizations: [] as any[],
      files: [] as any[],
      notifications: [] as any[],
    };

    // Search users (only if user is part of an organization or searching their own data)
    if (entityTypes.includes("users")) {
      if (args.organizationId) {
        // Check if user is a member of the organization
        const membership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", args.organizationId!).eq("userId", userId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        if (membership) {
          // Get organization members
          const orgMembers = await ctx.db
            .query("organizationMembers")
            .withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
            .filter(q => q.eq(q.field("status"), "active"))
            .take(100);

          for (const member of orgMembers) {
            const user = await ctx.db.get(member.userId);
            if (user && (
              user.name?.toLowerCase().includes(args.query.toLowerCase()) ||
              user.email?.toLowerCase().includes(args.query.toLowerCase())
            )) {
              results.users.push({
                _id: user._id,
                name: user.name,
                email: user.email || "",
                image: user.image,
                type: "user" as const,
              });

              if (results.users.length >= limit) break;
            }
          }
        }
      }
    }

    // Search organizations (only those user is a member of)
    if (entityTypes.includes("organizations")) {
      const userMemberships = await ctx.db
        .query("organizationMembers")
        .withIndex("by_user", q => q.eq("userId", userId))
        .filter(q => q.eq(q.field("status"), "active"))
        .take(50);

      for (const membership of userMemberships) {
        const org = await ctx.db.get(membership.organizationId);
        if (org && org.isActive && (
          org.name.toLowerCase().includes(args.query.toLowerCase()) ||
          org.slug.toLowerCase().includes(args.query.toLowerCase()) ||
          org.description?.toLowerCase().includes(args.query.toLowerCase())
        )) {
          results.organizations.push({
            _id: org._id,
            name: org.name,
            slug: org.slug,
            description: org.description,
            type: "organization" as const,
          });

          if (results.organizations.length >= limit) break;
        }
      }
    }

    // Search files
    if (entityTypes.includes("files")) {
      let useOrgScope = false;
      
      if (args.organizationId) {
        // Check if user is a member of the organization
        const membership = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organizationAndUser", q => 
            q.eq("organizationId", args.organizationId!).eq("userId", userId)
          )
          .filter(q => q.eq(q.field("status"), "active"))
          .unique();

        useOrgScope = !!membership;
      }

      const files = await (useOrgScope
        ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
        : ctx.db.query("files").withIndex("by_user", q => q.eq("userId", userId))
      ).take(100);
      const now = Date.now();

      for (const file of files) {
        // Skip expired files
        if (file.expiresAt && file.expiresAt < now) continue;

        if (
          file.name.toLowerCase().includes(args.query.toLowerCase()) ||
          file.originalName.toLowerCase().includes(args.query.toLowerCase()) ||
          file.tags?.some(tag => tag.toLowerCase().includes(args.query.toLowerCase()))
        ) {
          results.files.push({
            _id: file._id,
            name: file.name,
            originalName: file.originalName,
            mimeType: file.mimeType,
            size: file.size,
            uploadedAt: file.uploadedAt,
            type: "file" as const,
          });

          if (results.files.length >= limit) break;
        }
      }
    }

    // Search notifications
    if (entityTypes.includes("notifications")) {
      let notificationQuery = ctx.db
        .query("notifications")
        .withIndex("by_user", q => q.eq("userId", userId));

      if (args.organizationId) {
        notificationQuery = notificationQuery.filter(q => q.eq(q.field("organizationId"), args.organizationId));
      }

      const notifications = await notificationQuery.take(100);
      const now = Date.now();

      for (const notification of notifications) {
        // Skip expired notifications
        if (notification.expiresAt && notification.expiresAt < now) continue;

        if (
          notification.title.toLowerCase().includes(args.query.toLowerCase()) ||
          notification.message.toLowerCase().includes(args.query.toLowerCase())
        ) {
          results.notifications.push({
            _id: notification._id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            _creationTime: notification._creationTime,
          });

          if (results.notifications.length >= limit) break;
        }
      }
    }

    return results;
  },
});

// Search users within an organization
export const searchOrganizationUsers = query({
  args: {
    organizationId: v.id("organizations"),
    query: v.string(),
    roleFilter: v.optional(v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    )),
    limit: v.optional(v.number()),
  },
  returns: v.array(v.object({
    _id: v.id("users"),
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    joinedAt: v.optional(v.number()),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId || !args.query.trim()) {
      return [];
    }

    // Check if user is a member of the organization
    const userMembership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!userMembership) {
      return [];
    }

    // Get organization members
    let membersQuery = ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .filter(q => q.eq(q.field("status"), "active"));

    if (args.roleFilter) {
      membersQuery = membersQuery.filter(q => q.eq(q.field("role"), args.roleFilter));
    }

    const members = await membersQuery.take(100);
    const results = [];

    for (const member of members) {
      const user = await ctx.db.get(member.userId);
      if (user && (
        user.name?.toLowerCase().includes(args.query.toLowerCase()) ||
        user.email?.toLowerCase().includes(args.query.toLowerCase())
      )) {
        results.push({
          _id: user._id,
          name: user.name,
          email: user.email || "",
          image: user.image,
          role: member.role,
          joinedAt: member.joinedAt,
        });

        if (results.length >= (args.limit || 20)) break;
      }
    }

    return results;
  },
});

// Search files with advanced filters
export const searchFiles = query({
  args: {
    query: v.string(),
    organizationId: v.optional(v.id("organizations")),
    mimeTypeFilter: v.optional(v.string()),
    sizeRange: v.optional(v.object({
      min: v.optional(v.number()),
      max: v.optional(v.number()),
    })),
    dateRange: v.optional(v.object({
      start: v.optional(v.number()),
      end: v.optional(v.number()),
    })),
    tags: v.optional(v.array(v.string())),
    limit: v.optional(v.number()),
  },
  returns: v.array(v.object({
    _id: v.id("files"),
    name: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    tags: v.optional(v.array(v.string())),
    uploadedAt: v.number(),
    uploaderName: v.optional(v.string()),
    url: v.optional(v.string()),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId || !args.query.trim()) {
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

    const files = await (args.organizationId
      ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
      : ctx.db.query("files").withIndex("by_user", q => q.eq("userId", userId))
    ).take(200);
    const results = [];
    const now = Date.now();

    for (const file of files) {
      // Skip expired files
      if (file.expiresAt && file.expiresAt < now) continue;

      // Text search
      const matchesQuery = 
        file.name.toLowerCase().includes(args.query.toLowerCase()) ||
        file.originalName.toLowerCase().includes(args.query.toLowerCase()) ||
        file.tags?.some(tag => tag.toLowerCase().includes(args.query.toLowerCase()));

      if (!matchesQuery) continue;

      // Apply filters
      if (args.mimeTypeFilter && !file.mimeType.startsWith(args.mimeTypeFilter)) {
        continue;
      }

      if (args.sizeRange) {
        if (args.sizeRange.min && file.size < args.sizeRange.min) continue;
        if (args.sizeRange.max && file.size > args.sizeRange.max) continue;
      }

      if (args.dateRange) {
        if (args.dateRange.start && file.uploadedAt < args.dateRange.start) continue;
        if (args.dateRange.end && file.uploadedAt > args.dateRange.end) continue;
      }

      if (args.tags && args.tags.length > 0) {
        if (!file.tags || !args.tags.some(tag => file.tags!.includes(tag))) {
          continue;
        }
      }

      // Get additional data
      const uploader = await ctx.db.get(file.userId);
      const url = await ctx.storage.getUrl(file.storageId);

      results.push({
        _id: file._id,
        name: file.name,
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
        tags: file.tags,
        uploadedAt: file.uploadedAt,
        uploaderName: uploader?.name,
        url: url ?? undefined,
      });

      if (results.length >= (args.limit || 20)) break;
    }

    return results;
  },
});

// Get search suggestions based on user's data
export const getSearchSuggestions = query({
  args: {
    organizationId: v.optional(v.id("organizations")),
  },
  returns: v.object({
    recentSearches: v.array(v.string()),
    popularTags: v.array(v.string()),
    frequentContacts: v.array(v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      email: v.string(),
    })),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        recentSearches: [],
        popularTags: [],
        frequentContacts: [],
      };
    }

    // For now, we'll provide basic suggestions
    // In a real app, you'd track search history and user interactions

    // Get popular file tags
    let useOrgScope = false;
    
    if (args.organizationId) {
      const membership = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organizationAndUser", q => 
          q.eq("organizationId", args.organizationId!).eq("userId", userId)
        )
        .filter(q => q.eq(q.field("status"), "active"))
        .unique();

      useOrgScope = !!membership;
    }

    const files = await (useOrgScope
      ? ctx.db.query("files").withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
      : ctx.db.query("files").withIndex("by_user", q => q.eq("userId", userId))
    ).take(100);
    const tagCounts: Record<string, number> = {};

    for (const file of files) {
      if (file.tags) {
        for (const tag of file.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }
    }

    const popularTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);

    // Get frequent contacts (recent collaborators)
    const frequentContacts = [];
    if (args.organizationId) {
      const members = await ctx.db
        .query("organizationMembers")
        .withIndex("by_organization", q => q.eq("organizationId", args.organizationId!))
        .filter(q => q.eq(q.field("status"), "active"))
        .take(10);

      for (const member of members) {
        if (member.userId !== userId) {
          const user = await ctx.db.get(member.userId);
          if (user) {
            frequentContacts.push({
              _id: user._id,
              name: user.name,
              email: user.email || "",
            });
          }
        }
      }
    }

    return {
      recentSearches: [], // Would be populated from search history
      popularTags,
      frequentContacts,
    };
  },
});