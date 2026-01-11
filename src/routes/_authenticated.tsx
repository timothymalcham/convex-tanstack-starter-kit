import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
        console.log("redirecting to /");
        throw redirect({ to: "/" });
    }
  },
})
