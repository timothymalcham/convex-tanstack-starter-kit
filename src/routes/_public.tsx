import { createFileRoute, redirect, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_public")({
    beforeLoad: ({ context }) => {
        if (context.userId) {
            throw redirect({
                to: "/",
            })
        }
    },
    component: () => <Outlet />,
})
