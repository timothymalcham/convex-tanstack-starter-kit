import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get the current user's profile
export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      email: v.string(),
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      emailNotifications: v.optional(v.boolean()),
      marketingEmails: v.optional(v.boolean()),
      timezone: v.optional(v.string()),
      language: v.optional(v.string()),
      theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
      bio: v.optional(v.string()),
      website: v.optional(v.string()),
      location: v.optional(v.string()),
      jobTitle: v.optional(v.string()),
      company: v.optional(v.string()),
      phone: v.optional(v.string()),
      onboardingCompleted: v.optional(v.boolean()),
      lastActiveAt: v.optional(v.number()),
      emailVerificationTime: v.optional(v.number()),
      authProviders: v.array(v.string()),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    
    // Get profile preferences
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .unique();
    
    // Get authentication providers
    const authAccounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", q => q.eq("userId", userId))
      .collect();
    
    const authProviders = authAccounts.map(account => account.provider);
    
    return {
      _id: user._id,
      _creationTime: user._creationTime,
      email: user.email || "",
      name: user.name,
      image: user.image,
      emailNotifications: profile?.emailNotifications ?? true,
      marketingEmails: profile?.marketingEmails,
      timezone: profile?.timezone,
      language: profile?.language,
      theme: profile?.theme,
      bio: profile?.bio,
      website: profile?.website,
      location: profile?.location,
      jobTitle: profile?.jobTitle,
      company: profile?.company,
      phone: profile?.phone,
      onboardingCompleted: profile?.onboardingCompleted,
      lastActiveAt: profile?.lastActiveAt,
      emailVerificationTime: user.emailVerificationTime,
      authProviders,
    };
  },
});

// Update the current user's profile
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    emailNotifications: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
    timezone: v.optional(v.string()),
    language: v.optional(v.string()),
    theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    location: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    // Update user fields
    const userUpdates: Record<string, any> = {};
    
    if (args.name !== undefined) {
      userUpdates.name = args.name;
    }
    
    if (args.image !== undefined) {
      userUpdates.image = args.image;
    }
    
    if (Object.keys(userUpdates).length > 0) {
      await ctx.db.patch(userId, userUpdates);
    }
    
    // Update profile preferences
    const profileUpdates: Record<string, any> = {};
    const profileFields = [
      'emailNotifications', 'marketingEmails', 'timezone', 'language', 
      'theme', 'bio', 'website', 'location', 'jobTitle', 'company', 'phone'
    ];
    
    for (const field of profileFields) {
      if (args[field as keyof typeof args] !== undefined) {
        profileUpdates[field] = args[field as keyof typeof args];
      }
    }
    
    if (Object.keys(profileUpdates).length > 0) {
      // Update lastActiveAt when profile is updated
      profileUpdates.lastActiveAt = Date.now();
      
      const existingProfile = await ctx.db
        .query("userProfiles")
        .withIndex("by_userId", q => q.eq("userId", userId))
        .unique();
      
      if (existingProfile) {
        await ctx.db.patch(existingProfile._id, profileUpdates);
      } else {
        await ctx.db.insert("userProfiles", {
          userId,
          ...profileUpdates,
        });
      }
    }
    
    return null;
  },
});

// Delete user account
export const deleteAccount = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    // Delete all auth-related data
    const authAccounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", q => q.eq("userId", userId))
      .collect();
    
    for (const account of authAccounts) {
      await ctx.db.delete(account._id);
    }
    
    const authSessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", q => q.eq("userId", userId))
      .collect();
    
    for (const session of authSessions) {
      await ctx.db.delete(session._id);
    }
    
    // Delete the user
    await ctx.db.delete(userId);
    
    return null;
  },
});

// Check if a user has completed their profile
export const hasCompletedProfile = query({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }
    
    const user = await ctx.db.get(userId);
    if (!user) {
      return false;
    }
    
    // A profile is considered complete if it has a name
    return !!user.name;
  },
});

// Get a user by ID (for public profiles)
export const getUserById = query({
  args: { userId: v.id("users") },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      image: v.optional(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      return null;
    }
    
    // Return only public information
    return {
      _id: user._id,
      name: user.name,
      image: user.image,
    };
  },
});