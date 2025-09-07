// src/routes/__root.tsx
/// <reference types="vite/client" />
import * as React from 'react'
import {
    Outlet,
    createRootRouteWithContext,
    HeadContent,
    Scripts,
    useRouterState,
    useRouteContext,
} from '@tanstack/react-router'
import {
    createServerFn,
} from '@tanstack/react-start'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'
import { Loader } from '@/components/Loader'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { Toaster } from "@/components/ui/sonner"
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexReactClient } from 'convex/react'
import { getCookie, getWebRequest } from '@tanstack/react-start/server'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { authClient } from "@/lib/auth-client";
import {
    fetchSession,
    getCookieName,
} from '@/lib/server-auth-utils'

// CSS Imports
import appCss from '../styles/app.css?url'

// Server side session request
const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
    const sessionCookieName = await getCookieName()
    const token = getCookie(sessionCookieName)
    const request = getWebRequest()
    const { session } = await fetchSession(request)
    return {
        userId: session?.user.id,
        token,
    }
})

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
    convexClient: ConvexReactClient
    convexQueryClient: ConvexQueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [{ rel: 'stylesheet', href: appCss }],
    }),
    beforeLoad: async (ctx) => {
        // all queries, mutations and action made with TanStack Query will be
        // authenticated by an identity token.
        const auth = await fetchAuth()
        const { userId, token } = auth

        // During SSR only (the only time serverHttpClient exists),
        // set the auth token for Convex to make HTTP queries with.
        if (token) {
            ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
        }

        return { userId, token }
    },
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        )
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
})

function RootComponent() {
    const context = useRouteContext({ from: Route.id })
    return (
        <ConvexBetterAuthProvider
            client={context.convexClient}
            authClient={authClient}
        >
        <RootDocument>
            <Outlet />
        </RootDocument>
        </ConvexBetterAuthProvider>
    )
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                <div className="root h-screen flex flex-col min-h-0">
                    <div className="border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
                        <LoadingIndicator />
                        <div className="flex-grow min-h-0 h-full flex flex-col">
                            {children}
                            <Toaster />
                        </div>
                    </div>
                </div>
                <ReactQueryDevtools />
                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    )
}

function LoadingIndicator() {
    const isLoading = useRouterState({ select: (s) => s.isLoading })
    return (
        <div
            className={`h-12 transition-all duration-300 ${
                isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
            }`}
        >
            <Loader />
        </div>
    )
}