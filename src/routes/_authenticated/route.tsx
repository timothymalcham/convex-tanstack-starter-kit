import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

export const Route = createFileRoute("/_authenticated")({
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    return (
        <>
            <Authenticated>
                <Outlet />
            </Authenticated>

            <Unauthenticated>
                <Navigate to="/login" search={{ redirect: currentPath }} />
            </Unauthenticated>
        </>
    );
}
