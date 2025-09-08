import './polyfills'
import { Resend } from '@convex-dev/resend'
import VerifyEmailOTP from './emails/verifyEmail'
import { render } from '@react-email/components'
import React from 'react'
import { components } from './_generated/api'
import { RunMutationCtx } from '@convex-dev/better-auth'

export const resend: Resend = new Resend(components.resend, {
    testMode: false,
});

const sendEmail = async (
    ctx: RunMutationCtx,
    {
        to,
        subject,
        html,
    }: {
        to: string
        subject: string
        html: string
    },
) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing, skipping sending email")
        return
    }

    try {
        await resend.sendEmail(ctx, {
            from: 'Your <email@goes.here>',
            to,
            subject,
            html,
        })
} catch (error: unknown) {
    if (error instanceof Error) {
        if (error.message === "API key is not set") {
            console.error("RESEND_API_KEY is not set or is invalid")
        }
    }
}
}

export const sendOTPVerification = async (
    ctx: RunMutationCtx,
    {
        to,
        code,
    }: {
        to: string
        code: string
    },
) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn(`RESEND_API_KEY is missing, skipping sending email. Here's the OTP code that would have been sent to ${to}: ${code}`)
        return
    }

        await sendEmail(ctx, {
            to,
            subject: 'Verify your email address',
            html: await render(<VerifyEmailOTP code={code}/>),
        })
}
