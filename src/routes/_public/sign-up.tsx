import { createFileRoute, redirect } from '@tanstack/react-router'
import {SignUpForm} from "@/components/sign-up-form";

export const Route = createFileRoute('/_public/sign-up')({
    beforeLoad: ({ context }) => {
        if (context.userId) {
            throw redirect({ to: '/' })
        }
    },
    component: SignUpForm,
})
