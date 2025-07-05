import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { getAuthUserId, getAuthSessionId } from "@convex-dev/auth/server";

// Get current session details
export const getCurrentSession = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("authSessions"),
      _creationTime: v.number(),
      userId: v.id("users"),
      expirationTime: v.optional(v.number()),
    })
  ),
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (!sessionId) {
      return null;
    }
    
    const session = await ctx.db.get(sessionId);
    if (!session) {
      return null;
    }
    
    return {
      _id: session._id,
      _creationTime: session._creationTime,
      userId: session.userId,
      expirationTime: session.expirationTime,
    };
  },
});

// Get all active sessions for the current user
export const getUserSessions = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("authSessions"),
      _creationTime: v.number(),
      expirationTime: v.optional(v.number()),
      isCurrent: v.boolean(),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    
    const currentSessionId = await getAuthSessionId(ctx);
    
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", q => q.eq("userId", userId))
      .collect();
    
    // Filter out expired sessions and map to return format
    const now = Date.now();
    const activeSessions = sessions
      .filter(session => !session.expirationTime || session.expirationTime > now)
      .map(session => ({
        _id: session._id,
        _creationTime: session._creationTime,
        expirationTime: session.expirationTime,
        isCurrent: session._id === currentSessionId,
      }));
    
    return activeSessions;
  },
});

// Revoke a specific session
export const revokeSession = mutation({
  args: {
    sessionId: v.id("authSessions"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    const session = await ctx.db.get(args.sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    
    // Verify the session belongs to the current user
    if (session.userId !== userId) {
      throw new Error("Unauthorized");
    }
    
    // Delete the session
    await ctx.db.delete(args.sessionId);
    
    return null;
  },
});

// Revoke all other sessions (keep only current)
export const revokeOtherSessions = mutation({
  args: {},
  returns: v.object({
    revokedCount: v.number(),
  }),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    const currentSessionId = await getAuthSessionId(ctx);
    if (!currentSessionId) {
      throw new Error("No current session");
    }
    
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", q => q.eq("userId", userId))
      .collect();
    
    let revokedCount = 0;
    for (const session of sessions) {
      if (session._id !== currentSessionId) {
        await ctx.db.delete(session._id);
        revokedCount++;
      }
    }
    
    return { revokedCount };
  },
});

// Get session statistics for the current user
export const getSessionStats = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      totalSessions: v.number(),
      activeSessions: v.number(),
      oldestSessionAge: v.number(), // in milliseconds
      newestSessionAge: v.number(), // in milliseconds
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", q => q.eq("userId", userId))
      .collect();
    
    if (sessions.length === 0) {
      return null;
    }
    
    const now = Date.now();
    const activeSessions = sessions.filter(
      session => !session.expirationTime || session.expirationTime > now
    );
    
    const sessionAges = sessions.map(session => now - session._creationTime);
    
    return {
      totalSessions: sessions.length,
      activeSessions: activeSessions.length,
      oldestSessionAge: Math.max(...sessionAges),
      newestSessionAge: Math.min(...sessionAges),
    };
  },
});

// Internal mutation to clean up expired sessions (can be called by a cron job)
export const cleanupExpiredSessions = internalMutation({
  args: {},
  returns: v.object({
    deletedCount: v.number(),
  }),
  handler: async (ctx) => {
    const now = Date.now();
    
    // Query all sessions with expiration time
    const allSessions = await ctx.db
      .query("authSessions")
      .collect();
    
    let deletedCount = 0;
    for (const session of allSessions) {
      if (session.expirationTime && session.expirationTime < now) {
        await ctx.db.delete(session._id);
        deletedCount++;
      }
    }
    
    return { deletedCount };
  },
});