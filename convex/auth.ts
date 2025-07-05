import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { ConvexError } from "convex/values";
import { z } from "zod";
import { ResendOTP } from "./ResendOTP";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

// Email validation schema
const ParamsSchema = z.object({
  email: z.string().email(),
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({ 
      verify: ResendOTP,
      reset: ResendOTPPasswordReset,
      profile(params) {
        const { error, data } = ParamsSchema.safeParse(params);
        if (error) {
          throw new ConvexError(error.format());
        }
        return { 
          email: data.email.toLowerCase(), // Normalize email to lowercase
        };
      },
    }),
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerificationTime: profile.email_verified ? Date.now() : undefined,
        };
      },
    }),
  ],
});
