import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard")({
    beforeLoad: ({ context }) => {
        if (!context.userId) {
            throw redirect({
                to: "/sign-in",
            })
        }
    },
    component: () => (
        <Outlet />
    ),
})
