import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { MutationCache, notifyManager, QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
    if (typeof document !== "undefined") {
        notifyManager.setScheduler(window.requestAnimationFrame);
    }

    const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
    if (!CONVEX_URL) {
        console.error("missing envar CONVEX_URL");
    }
    const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

    const queryClient: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                queryKeyHashFn: convexQueryClient.hashFn(),
                queryFn: convexQueryClient.queryFn(),
            },
        },
        mutationCache: new MutationCache({
            onError: (error) => {
                // toast(error.message, { className: "bg-red-500 text-white" });
            },
        }),
    });
    convexQueryClient.connect(queryClient);

    const router = routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            defaultPreload: "intent",
            defaultErrorComponent: DefaultCatchBoundary,
            defaultNotFoundComponent: () => <NotFound />,
            context: { queryClient },
            Wrap: ({ children }) => (
                <ConvexAuthProvider client={convexQueryClient.convexClient}>{children}</ConvexAuthProvider>
            ),
            scrollRestoration: true,
        }),
        queryClient,
    );

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
