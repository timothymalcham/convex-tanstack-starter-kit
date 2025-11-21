import {
    AuthFunctions,
    createClient,
    type GenericCtx,
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel, Id } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";
import { betterAuth } from "better-auth";
import { withoutSystemFields } from "convex-helpers";

const siteUrl = process.env.SITE_URL!;

const authFunctions: AuthFunctions = internal.auth;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth, {
    authFunctions,
    verbose: true,
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
                await ctx.db.patch(newUser.userId as Id<"users">, {
                    email: newUser.email,
                });
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
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
            resetPasswordTokenExpiresIn: 900, // 15 minutes
            sendResetPassword: async ({ user, url }) => {
                // await sendResetPassword(requireActionCtx(ctx), {
                //     to: user.email,
                //     url,
                // });
            },
            emailVerification: {
                // sendVerificationEmail: async ({ user, url }) => {
                //     await sendEmailVerification(requireActionCtx(ctx), {
                //         to: user.email,
                //         url,
                //     });
                // },
            },
        },
        plugins: [
            // The Convex plugin is required for Convex compatibility
            convex(),
        ],
    });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const safeGetUser = async (ctx: QueryCtx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
        return;
    }
    const user = await ctx.db.get(authUser.userId as Id<"users">);
    if (!user) {
        return;
    }
    return { ...user, ...withoutSystemFields(authUser) };
};

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        return authComponent.getAuthUser(ctx);
    },
});
