// src/routes/__root.tsx
/// <reference types="vite/client" />
import * as React from 'react'
import {
    Outlet,
    createRootRouteWithContext,
    HeadContent,
    Scripts,
    useRouterState,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'
import { Loader } from '@/components/Loader'

import appCss from '../styles/app.css?url'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
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
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
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
                        </div>
                    </div>
                </div>
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