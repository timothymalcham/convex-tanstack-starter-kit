/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { ClientHintCheck } from "~/components/ClientHintCheck";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { Loader } from "~/components/Loader";
import { NotFound } from "~/components/NotFound";
import { ThemeScript } from "~/components/ThemeScript";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Toast } from "~/components/ui/Toast";
import { ThemeProvider } from "~/contexts/ThemeContext";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import { getActualTheme, getSystemTheme, getTheme, getUserThemePreference, hintsUtils } from "~/utils/theme";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    beforeLoad: async ({ context }) => {
        // For now, we'll handle theme detection on the client side
        // TanStack Router doesn't provide request object in the same way
        return {};
    },
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
    // Initialize theme from values set by ThemeScript to prevent hydration mismatch
    const [userPreference, setUserPreference] = React.useState<"light" | "dark" | "system">(() => {
        if (typeof window !== "undefined" && (window as any).__userThemePreference) {
            return (window as any).__userThemePreference;
        }
        return "system";
    });

    const [actualTheme, setActualTheme] = React.useState<"light" | "dark">(() => {
        if (typeof window !== "undefined" && (window as any).__actualTheme) {
            return (window as any).__actualTheme;
        }
        return "light";
    });

    React.useEffect(() => {
        // Get user preference from cookie
        const themeCookie = document.cookie
            .split(";")
            .find((c) => c.trim().startsWith("theme="))
            ?.split("=")[1];

        const preference = (themeCookie as "light" | "dark" | "system") || "system";
        setUserPreference(preference);

        // Get actual theme to apply
        const detectedTheme = getSystemTheme();
        const resolvedTheme = getActualTheme(preference, detectedTheme);
        setActualTheme(resolvedTheme);

        // Apply theme to document (in case it wasn't already applied by ThemeScript)
        document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    }, []);

    return (
        <html>
            <head>
                <ThemeScript />
                <ClientHintCheck />
                <HeadContent />
            </head>
            <body>
                <ThemeProvider theme={userPreference} actualTheme={actualTheme}>
                    <div className="h-screen flex flex-col min-h-0">
                        <div className="bg-slate-900 dark:bg-slate-900 border-b border-slate-800 dark:border-slate-700 flex items-center justify-between py-4 px-8 box-border">
                            <div className="flex items-center gap-4">
                                <div>
                                    <Link to="/" className="block leading-tight">
                                        <div className="font-black text-2xl text-white">Trellaux</div>
                                        <div className="text-slate-500">a TanStack Demo</div>
                                    </Link>
                                </div>
                                <LoadingIndicator />
                            </div>
                            <ThemeToggle />
                        </div>

                        <div className="grow min-h-0 h-full flex flex-col">
                            {children}
                            <Toast />
                        </div>
                    </div>
                </ThemeProvider>
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
