import {
    AuthFunctions,
    createClient,
    type GenericCtx,
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";

const siteUrl = process.env.SITE_URL!;

const authFunctions: AuthFunctions = internal.auth;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth, {
    authFunctions,
    triggers: {
        user: {
            onCreate: async (ctx, authUser) => {
                // Any `onCreateUser` logic should be moved here
                await ctx.db.insert("users", {
                    email: authUser.email,
                });
            },
            onUpdate: async (ctx, oldUser, newUser) => {
                // Any `onUpdateUser` logic should be moved here
            },
            onDelete: async (ctx, authUser) => {
                await ctx.db.delete(authUser.userId as Id<"users">);
            },
        },
    },
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

export const createAuth = (
    ctx: GenericCtx<DataModel>,
    { optionsOnly } = { optionsOnly: false }
) => {
    return betterAuth({
        // disable logging when createAuth is called just to generate options.
        // this is not required, but there's a lot of noise in logs without it.
        logger: {
            disabled: optionsOnly,
        },
        baseURL: siteUrl,
        database: authComponent.adapter(ctx),
        // Configure simple, non-verified email/password to get started
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            // The Convex plugin is required for Convex compatibility
            convex(),
        ],
    });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        return authComponent.getAuthUser(ctx);
    },
});
