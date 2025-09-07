import { createFileRoute, redirect } from '@tanstack/react-router'
import {SignInForm} from "@/components/sign-in-form";

export const Route = createFileRoute('/_public/sign-in')({
    beforeLoad: ({ context }) => {
        if (context.userId) {
            throw redirect({ to: '/' })
        }
    },
  component: SignInForm,
})
