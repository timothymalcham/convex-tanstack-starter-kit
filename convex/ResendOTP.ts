import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { render } from "@react-email/render";
import VerificationEmail from "../emails/VerificationEmail";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    
    const emailHtml = await render(VerificationEmail({
      verificationCode: token,
      email: email,
    }));
    
    const { error } = await resend.emails.send({
      from: "Convex TanStack Starter <onboarding@resend.dev>",
      to: [email],
      subject: `Verify your email - Convex TanStack Starter`,
      html: emailHtml,
      text: `Thanks for signing up! Your verification code is: ${token}\n\nThis code will expire in 10 minutes.`,
    });

    if (error) {
      throw new Error(`Could not send verification email: ${error.message}`);
    }
  },
});