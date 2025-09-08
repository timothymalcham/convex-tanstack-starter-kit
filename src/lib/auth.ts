import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import {requireEnv, requireMutationCtx} from "@convex-dev/better-auth/utils";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins"
import { betterAuthComponent } from "~/auth";
import { type GenericCtx } from "~/_generated/server";
import {sendOTPVerification} from "~/emails";

const siteUrl = requireEnv("SITE_URL");

export const createAuth = (ctx: GenericCtx) =>
    // Configure your Better Auth instance here
    betterAuth({
        // All auth requests will be proxied through your TanStack Start server
        baseURL: siteUrl,
        database: convexAdapter(ctx, betterAuthComponent),

        // Simple non-verified email/password to get started
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            // The Convex plugin is required
            convex(),
            // Handle emailed One Time Passwords (OTPs)
            emailOTP({
                async sendVerificationOTP({ email, otp }) {
                    await sendOTPVerification(requireMutationCtx(ctx), {
                        to: email,
                        code: otp,
                    })
                },
            })
        ],
    });