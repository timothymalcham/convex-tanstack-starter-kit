import { zCustomQuery, zCustomMutation } from "convex-helpers/server/zod"
import { NoOp } from "convex-helpers/server/customFunctions"
import { query, mutation } from "./_generated/server"
import { betterAuthComponent } from "./auth"
import { Id } from "./_generated/dataModel"
import { zid } from "convex-helpers/server/zod"

// Convex ID validators using convex-helpers
const userIdValidator = zid("users")

// Create custom query and mutation functions with Zod validation
const zQuery = zCustomQuery(query, NoOp)
const zMutation = zCustomMutation(mutation, NoOp)

export const getUser = zQuery({
    args: {},
    handler: async (ctx) => {
        const betterAuthUser = await betterAuthComponent.getAuthUser(ctx)
        if (!betterAuthUser) return null
        const convexUser = await ctx.db.get(betterAuthUser.userId as Id<"users">)
        return { ...betterAuthUser, ...convexUser }
    },
})

// Get user by ID
export const getUserById = zQuery({
    args: {
        userId: userIdValidator,
    },
    handler: async (ctx, { userId }) => {
        return await ctx.db.get(userId)
    },
})

export const getCurrentUserId = zQuery({
    args: {},
    handler: async (ctx) => {
        const userId = await betterAuthComponent.getAuthUserId(ctx)
        if (!userId) return null
        return userId
    },
})