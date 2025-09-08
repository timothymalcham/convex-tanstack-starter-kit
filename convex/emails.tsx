import './polyfills'
import { Resend } from '@convex-dev/resend'
import VerifyEmailOTP from './emails/verify-email'
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
    await resend.sendEmail(ctx, {
        from: 'Your <email@goes.here>',
        to,
        subject,
        html,
    })
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
    await sendEmail(ctx, {
        to,
        subject: 'Verify your email address',
        html: await render(<VerifyEmailOTP code={code} />),
    })
}
