import {createFileRoute, Outlet} from "@tanstack/react-router"
import * as React from "react"
import { LandingPage } from "@/components/marketing/landing-page"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { Dashboard } from "@/components/dashboard"
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "~/_generated/api";


export const Route = createFileRoute("/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: user } = useSuspenseQuery(convexQuery(api.users.getUser, {}))
    return (
        <>
            <AuthLoading>
                <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-2">
                            Loading...
                        </h1>
                    </div>
                </div>
            </AuthLoading>
            <Unauthenticated>
                <LandingPage />
            </Unauthenticated>
            <Authenticated>
                <Dashboard user={{ email: user?.email, name: user?.name }}>
                    <Outlet />
                </Dashboard>
            </Authenticated>
        </>
    )
}