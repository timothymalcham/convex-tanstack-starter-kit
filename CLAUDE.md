# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development (both commands needed in separate terminals)
npm run dev          # Vite dev server on port 3000
npx convex dev       # Convex backend dev server

# Build for production
npm run build

# Deploy Convex backend
npx convex deploy
```

## Architecture Overview

This is a full-stack TypeScript starter using **Convex** as the backend with **TanStack Start** (SSR React framework) on the frontend.

### Key Integration Points

**Authentication Flow** (`@convex-dev/better-auth`):
- `convex/auth.ts` - Server-side auth setup with Better Auth, user triggers (onCreate/onUpdate/onDelete), email verification & password reset handlers
- `src/lib/auth-client.ts` - Browser auth client
- `src/lib/auth-server.ts` - SSR auth helpers for token management
- `src/routes/__root.tsx` - Wraps app in `ConvexBetterAuthProvider`, handles SSR token injection

**Data Layer**:
- `src/router.tsx` - Creates `ConvexQueryClient` that bridges Convex with TanStack Query
- All Convex queries/mutations can be used through TanStack Query hooks
- SSR data fetching via `convexQueryClient.serverHttpClient` during `beforeLoad`

**Routing** (TanStack Router file-based):
- `src/routes/__root.tsx` - Root layout with providers
- `src/routes/_authenticated.tsx` - Layout route protecting authenticated pages
- Authenticated routes go in `src/routes/_authenticated/` directory

### Convex Structure

- `convex/convex.config.ts` - App configuration loading Better Auth and Resend components
- `convex/http.ts` - HTTP router for auth endpoints
- `convex/emails.tsx` - Email templates (Node action using `@react-email`)
- `convex/_generated/` - Auto-generated types and API (don't edit)

### Frontend Structure

- `src/components/ui/` - Shadcn UI components (new-york style, Tailwind v4)
- `src/components/` - App-level components (sidebar, header, nav)
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging

## Environment Variables

Required in `.env.local`:
- `VITE_CONVEX_URL` - Convex deployment URL
- `VITE_CONVEX_SITE_URL` - Convex HTTP endpoint URL
- `VITE_SITE_URL` - Frontend site URL (for auth redirects)
- `SITE_URL` - Same as VITE_SITE_URL (server-side access)

## Shadcn UI

Components configured in `components.json`. Add new components:
```bash
npx shadcn@latest add <component-name>
```

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)
