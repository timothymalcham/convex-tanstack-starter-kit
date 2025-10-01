import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
    const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
    if (!CONVEX_URL) {
        console.error("missing envar VITE_CONVEX_URL");
    }
    const convex = new ConvexReactClient(CONVEX_URL, {
        unsavedChangesWarning: false,
    });
    const convexQueryClient = new ConvexQueryClient(convex)

    const queryClient: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                queryKeyHashFn: convexQueryClient.hashFn(),
                queryFn: convexQueryClient.queryFn(),
            },
        },
    });
    convexQueryClient.connect(queryClient);

    return routerWithQueryClient(
        createRouter({
            routeTree,
            defaultPreload: "intent",
            context: { queryClient, convexClient: convex, convexQueryClient },
            scrollRestoration: true,
            Wrap: ({ children }) => (
                <ConvexProvider client={convexQueryClient.convexClient}>
                    {children}
                </ConvexProvider>
            ),
        }),
        queryClient,
    );
}