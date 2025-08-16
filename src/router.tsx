import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import {
    MutationCache,
    QueryClient,
    notifyManager,
} from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import {NotFound} from "./components/NotFound";

export function createRouter() {
    if (typeof document !== 'undefined') {
        notifyManager.setScheduler(window.requestAnimationFrame)
    }

    const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
    if (!CONVEX_URL) {
        console.error("missing envar VITE_CONVEX_URL");
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
                // toast(error.message, { className: 'bg-red-500 text-white' })
            },
        }),
    })
    convexQueryClient.connect(queryClient)

    const router = createTanStackRouter({
        routeTree,
        defaultPreload: 'intent',
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: () => <NotFound />,
        context: { queryClient },
        Wrap: ({ children }) => (
            <ConvexAuthProvider client={convexQueryClient.convexClient}>
                {children}
            </ConvexAuthProvider>
        ),
        scrollRestoration: true,
    })
    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    })

    return router
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}