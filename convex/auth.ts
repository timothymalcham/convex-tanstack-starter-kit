import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";
import { z } from "zod";
import { ResendOTP } from "./ResendOTP";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

// Email validation schema
const ParamsSchema = z.object({
  email: z.string().email(),
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ 
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
  })],
});
