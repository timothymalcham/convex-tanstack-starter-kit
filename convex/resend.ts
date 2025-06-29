import Resend from "@convex-dev/resend";
import { components } from "./_generated/api";

export const resend = new Resend(components.resend, {
  apiKey: process.env.STARTER_KIT_RESEND_KEY,
});