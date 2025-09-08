import { cronJobs } from "convex/server";
import { components, internal } from "./_generated/api.js";
import { internalMutation } from "./_generated/server.js";

const crons = cronJobs();
crons.interval(
    "Remove old emails from the resend component",
    { hours: 1 },
    internal.crons.cleanupResend
);

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
//
// Cleanup up finalized emails on a regular schedule (every 7 days)
// see https://www.convex.dev/components/resend#data-retention
//
export const cleanupResend = internalMutation({
    args: {},
    handler: async (ctx) => {
        await ctx.scheduler.runAfter(0, components.resend.lib.cleanupOldEmails, {
            olderThan: ONE_WEEK_MS,
        });
        await ctx.scheduler.runAfter(
            0,
            components.resend.lib.cleanupAbandonedEmails,
            // These generally indicate a bug, so keep them around for longer.
            { olderThan: 4 * ONE_WEEK_MS }
        );
    },
});

export default crons;