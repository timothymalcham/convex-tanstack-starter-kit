import { jsx, jsxs } from 'react/jsx-runtime';
import { createRootRouteWithContext, useRouteContext, Outlet, HeadContent, Scripts, useRouterState } from '@tanstack/react-router';
import { c as createServerRpc, b as createServerFn, g as getCookieName, d as getCookie, e as getWebRequest, f as fetchSession, h as appCss, N as NotFound, D as DefaultCatchBoundary, a as authClient, T as Toaster, i as TanStackRouterDevtools, L as Loader } from './ssr.mjs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import '@tanstack/react-query';
import 'react';
import '@tanstack/router-ssr-query-core';
import '@convex-dev/react-query';
import 'convex/react';
import 'sonner';
import 'better-auth/react';
import '@convex-dev/better-auth/client/plugins';
import 'better-auth/client/plugins';
import '@convex-dev/better-auth';
import '@convex-dev/better-auth/plugins';
import '@convex-dev/better-auth/utils';
import 'better-auth';
import 'better-auth/plugins';
import 'convex/server';
import '@convex-dev/resend';
import '@react-email/components';
import '@convex-dev/better-auth/react-start';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import 'zod';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const fetchAuth_createServerFn_handler = createServerRpc("src_routes_root_tsx--fetchAuth_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchAuth.__executeServer(opts, signal);
});
const fetchAuth = createServerFn({
  method: "GET"
}).handler(fetchAuth_createServerFn_handler, async () => {
  const sessionCookieName = await getCookieName();
  const token = getCookie(sessionCookieName);
  const request = getWebRequest();
  const {
    session
  } = await fetchSession(request);
  return {
    userId: session == null ? void 0 : session.user.id,
    token
  };
});
function RootComponent() {
  const context = useRouteContext({
    from: Route.id
  });
  return /* @__PURE__ */ jsx(ConvexBetterAuthProvider, { client: context.convexClient, authClient, children: /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "root h-screen flex flex-col min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border", children: [
          /* @__PURE__ */ jsx(LoadingIndicator, {}),
          /* @__PURE__ */ jsx("div", { className: "flex-grow min-h-0 h-full flex flex-col", children })
        ] }),
        /* @__PURE__ */ jsx(Toaster, {})
      ] }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, {}),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "TanStack Start Starter"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }]
  }),
  beforeLoad: async (ctx) => {
    var _a;
    const auth = await fetchAuth();
    const {
      userId,
      token
    } = auth;
    if (token) {
      (_a = ctx.context.convexQueryClient.serverHttpClient) == null ? void 0 : _a.setAuth(token);
    }
    return {
      userId,
      token
    };
  },
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function LoadingIndicator() {
  const isLoading = useRouterState({
    select: (s) => s.isLoading
  });
  return /* @__PURE__ */ jsx("div", { className: `h-12 transition-all duration-300 ${isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`}`, children: /* @__PURE__ */ jsx(Loader, {}) });
}

export { fetchAuth_createServerFn_handler };
//# sourceMappingURL=__root-Y_0bPmFO.mjs.map
