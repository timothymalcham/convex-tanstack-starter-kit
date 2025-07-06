import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create a new organization
export const createOrganization = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    industry: v.optional(v.string()),
    size: v.optional(v.union(
      v.literal("1-10"),
      v.literal("11-50"),
      v.literal("51-200"),
      v.literal("201-1000"),
      v.literal("1000+")
    )),
  },
  returns: v.object({
    organizationId: v.id("organizations"),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if slug is already taken
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .unique();

    if (existingOrg) {
      throw new Error("Organization slug already exists");
    }

    // Create the organization
    const organizationId = await ctx.db.insert("organizations", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      website: args.website,
      industry: args.industry,
      size: args.size,
      createdBy: userId,
      isActive: true,
      settings: {
        allowInvites: true,
        requireApproval: false,
        defaultRole: "member",
      },
    });

    // Add the creator as the owner
    await ctx.db.insert("organizationMembers", {
      organizationId,
      userId,
      role: "owner",
      status: "active",
      joinedAt: Date.now(),
    });

    return { organizationId };
  },
});

// Get organizations for the current user
export const getUserOrganizations = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("organizations"),
    _creationTime: v.number(),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    memberCount: v.number(),
  })),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // Get user's organization memberships
    const memberships = await ctx.db
      .query("organizationMembers")
      .withIndex("by_user", q => q.eq("userId", userId))
      .filter(q => q.eq(q.field("status"), "active"))
      .collect();

    const organizations = [];
    for (const membership of memberships) {
      const org = await ctx.db.get(membership.organizationId);
      if (org && org.isActive) {
        // Get member count
        const memberCount = await ctx.db
          .query("organizationMembers")
          .withIndex("by_organization", q => q.eq("organizationId", org._id))
          .filter(q => q.eq(q.field("status"), "active"))
          .collect()
          .then(members => members.length);

        organizations.push({
          _id: org._id,
          _creationTime: org._creationTime,
          name: org.name,
          slug: org.slug,
          description: org.description,
          logo: org.logo,
          role: membership.role,
          memberCount,
        });
      }
    }

    return organizations;
  },
});

// Get organization details by ID
export const getOrganization = query({
  args: {
    organizationId: v.id("organizations"),
  },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("organizations"),
      _creationTime: v.number(),
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      website: v.optional(v.string()),
      logo: v.optional(v.string()),
      industry: v.optional(v.string()),
      size: v.optional(v.union(
        v.literal("1-10"),
        v.literal("11-50"),
        v.literal("51-200"),
        v.literal("201-1000"),
        v.literal("1000+")
      )),
      settings: v.optional(v.object({
        allowInvites: v.optional(v.boolean()),
        requireApproval: v.optional(v.boolean()),
        defaultRole: v.optional(v.string()),
      })),
      userRole: v.optional(v.union(
        v.literal("owner"),
        v.literal("admin"),
        v.literal("member"),
        v.literal("viewer")
      )),
      memberCount: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const org = await ctx.db.get(args.organizationId);
    if (!org || !org.isActive) {
      return null;
    }

    // Check if user is a member
    const membership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!membership) {
      return null;
    }

    // Get member count
    const memberCount = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", q => q.eq("organizationId", org._id))
      .filter(q => q.eq(q.field("status"), "active"))
      .collect()
      .then(members => members.length);

    return {
      _id: org._id,
      _creationTime: org._creationTime,
      name: org.name,
      slug: org.slug,
      description: org.description,
      website: org.website,
      logo: org.logo,
      industry: org.industry,
      size: org.size,
      settings: org.settings,
      userRole: membership.role,
      memberCount,
    };
  },
});

// Update organization
export const updateOrganization = mutation({
  args: {
    organizationId: v.id("organizations"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
    industry: v.optional(v.string()),
    size: v.optional(v.union(
      v.literal("1-10"),
      v.literal("11-50"),
      v.literal("51-200"),
      v.literal("201-1000"),
      v.literal("1000+")
    )),
    settings: v.optional(v.object({
      allowInvites: v.optional(v.boolean()),
      requireApproval: v.optional(v.boolean()),
      defaultRole: v.optional(v.string()),
    })),
  },
  returns: v.null(),
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

    const updates: Record<string, any> = {};
    const { organizationId, ...updateFields } = args;

    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(args.organizationId, updates);
    }

    return null;
  },
});

// Get organization members
export const getOrganizationMembers = query({
  args: {
    organizationId: v.id("organizations"),
  },
  returns: v.array(v.object({
    _id: v.id("organizationMembers"),
    _creationTime: v.number(),
    userId: v.id("users"),
    userName: v.optional(v.string()),
    userEmail: v.string(),
    userImage: v.optional(v.string()),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    status: v.union(
      v.literal("active"),
      v.literal("invited"),
      v.literal("suspended")
    ),
    joinedAt: v.optional(v.number()),
    invitedAt: v.optional(v.number()),
  })),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    // Check if user is a member
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

    // Get all members
    const memberships = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", q => q.eq("organizationId", args.organizationId))
      .collect();

    const members = [];
    for (const membership of memberships) {
      const user = await ctx.db.get(membership.userId);
      if (user) {
        members.push({
          _id: membership._id,
          _creationTime: membership._creationTime,
          userId: membership.userId,
          userName: user.name,
          userEmail: user.email || "",
          userImage: user.image,
          role: membership.role,
          status: membership.status,
          joinedAt: membership.joinedAt,
          invitedAt: membership.invitedAt,
        });
      }
    }

    return members;
  },
});

// Invite user to organization
export const inviteToOrganization = mutation({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
  },
  returns: v.object({
    membershipId: v.id("organizationMembers"),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user has permission to invite
    const userMembership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", userId)
      )
      .filter(q => q.eq(q.field("status"), "active"))
      .unique();

    if (!userMembership || (userMembership.role !== "owner" && userMembership.role !== "admin")) {
      throw new Error("Insufficient permissions");
    }

    // Check if user exists
    const inviteeUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .unique();

    if (!inviteeUser) {
      throw new Error("User with this email does not exist");
    }

    // Check if user is already a member
    const existingMembership = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organizationAndUser", q => 
        q.eq("organizationId", args.organizationId).eq("userId", inviteeUser._id)
      )
      .unique();

    if (existingMembership) {
      throw new Error("User is already a member of this organization");
    }

    // Create invitation
    const membershipId = await ctx.db.insert("organizationMembers", {
      organizationId: args.organizationId,
      userId: inviteeUser._id,
      role: args.role,
      status: "invited",
      invitedBy: userId,
      invitedAt: Date.now(),
    });

    return { membershipId };
  },
});