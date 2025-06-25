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
      emailVerified: v.optional(v.boolean()),
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
    
    return {
      _id: user._id,
      _creationTime: user._creationTime,
      email: user.email || "",
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
    };
  },
});

// Update the current user's profile
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    const updates: Record<string, any> = {};
    
    if (args.name !== undefined) {
      updates.name = args.name;
    }
    
    if (args.image !== undefined) {
      updates.image = args.image;
    }
    
    await ctx.db.patch(userId, updates);
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