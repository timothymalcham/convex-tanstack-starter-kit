/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { Loader } from "~/components/Loader";
import { NotFound } from "~/components/NotFound";
import { Toast } from "~/components/ui/Toast";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            ...seo({
                title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
                description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
            }),
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/apple-touch-icon.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/favicon-32x32.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/favicon-16x16.png",
            },
            { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
            { rel: "icon", href: "/favicon.ico" },
        ],
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        );
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                <div className="h-screen flex flex-col min-h-0">
                    <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
                        <div className="flex items-center gap-4">
                            <div>
                                <Link to="/" className="block leading-tight">
                                    <div className="font-black text-2xl text-white">Trellaux</div>
                                    <div className="text-slate-500">a TanStack Demo</div>
                                </Link>
                            </div>
                            <LoadingIndicator />
                        </div>
                    </div>

                    <div className="grow min-h-0 h-full flex flex-col">
                        {children}
                        <Toast />
                    </div>
                </div>
                <ReactQueryDevtools />
                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    );
}

function LoadingIndicator() {
    const isLoading = useRouterState({ select: (s) => s.isLoading });
    return (
        <div
            className={`h-12 transition-all duration-300 ${isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`}`}
        >
            <Loader />
        </div>
    );
}
