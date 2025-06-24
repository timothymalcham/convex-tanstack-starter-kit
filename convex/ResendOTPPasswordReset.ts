import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { render } from "@react-email/render";
import PasswordResetEmail from "../emails/PasswordResetEmail";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp-password-reset",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    
    const emailHtml = await render(PasswordResetEmail({
      resetCode: token,
      email: email,
    }));
    
    const { error } = await resend.emails.send({
      from: "Convex TanStack Starter <onboarding@resend.dev>",
      to: [email],
      subject: `Reset your password - Convex TanStack Starter`,
      html: emailHtml,
      text: `You requested to reset your password. Your password reset code is: ${token}\n\nThis code will expire in 10 minutes.`,
    });

    if (error) {
      throw new Error(`Could not send password reset email: ${error.message}`);
    }
  },
});