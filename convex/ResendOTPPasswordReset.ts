import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
// TODO: Re-enable React Email once MessageChannel issue is resolved
// import { render } from "@react-email/render";
// import PasswordResetEmail from "../emails/PasswordResetEmail";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp-password-reset",
  apiKey: process.env.STARTER_KIT_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    
    // TODO: Use React Email template once MessageChannel issue is resolved
    // const emailHtml = await render(PasswordResetEmail({
    //   resetCode: token,
    //   email: email,
    // }));
    
    // Simple HTML template for now
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset your password</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <table style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 40px;">
                <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Reset your password</h1>
                <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                  You requested to reset your password. Please enter this code to continue:
                </p>
                <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${token}</span>
                </div>
                <p style="color: #999; font-size: 14px; text-align: center;">
                  This code will expire in 10 minutes. If you didn't request this, please ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
    
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