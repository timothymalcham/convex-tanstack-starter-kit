import { createFileRoute, redirect } from '@tanstack/react-router'
import {VerifyEmailForm} from "@/components/verify-email-form";
import {z} from "zod";

const searchParamsSchema = z.object({
    email: z.email()
})

export const Route = createFileRoute('/_public/verify-email')({
    beforeLoad: ({ context }) => {
        if (context.userId) {
            throw redirect({ to: '/' })
        }
    },
    validateSearch: searchParamsSchema,
    component: VerifyEmailComponent,
})

function VerifyEmailComponent() {
    const { email } = Route.useSearch()
    return (
        <VerifyEmailForm email={email} />
    )
}