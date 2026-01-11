import { createFileRoute, redirect } from '@tanstack/react-router'
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: ({ context }) => {
        if (!context.isAuthenticated) {
            throw redirect({ to: "/sign-in" });
        }
    },
    component: () => {
        return <Outlet />;
    },
});
