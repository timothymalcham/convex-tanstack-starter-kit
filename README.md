# Convex / Tanstack Starter Kit

A starter kit for SaaS style web apps. Use this project to get a jump start on your own projects, both personal and commercial. Heavily inspired by the Epic Stack.

This starter kit takes a maximalist approach, it contains a lot of features. Delete whatever you don't need. If you think something is missing, open a PR to add it.

## Features / Stack:

- Typescript: everywhere
- Convex: Backend as a Service
- Convex Auth: email/password authentication (https://labs.convex.dev/auth)
- Tanstack Start, Query, Router, Forms: SSR, routing, query, forms, etc.
- Stripe: billing with Polar.sh
- Sonner: for toasts
- BaseUI: for components (https://base-ui.com/react/overview/quick-start)
- TailwindCSS: for styling, no writing CSS as much as possible! 
- Framer Motion: for animations (https://motion.dev/)
- Client Hints: https://github.com/epicweb-dev/client-hints
- Invariant pattern: https://github.com/epicweb-dev/invariant
- Resend: for emails (with react email for building the emails)
- Biome: for linting and formatting
- Zod: for schema validation
- Light/Dark/System mode (without a flash of incorrect theme)
- Posthog: (hosted in the EU) for error tracking, analytics, feature flags, and more
- Github actions 
- Deployments to Netlify / Fly.io

## Pages
- Landing page (homepage when unauthenticated)
- Dashboard (homepage when authenticated)
- Dashboard: user account / settings / profile / manage billing
- Dashboard: todo CRUD example (list todos, create todo, delete todo, view todo details, etc.)
- Auth: login / signup (with email confirmation) / forgot password 
- Terms of Service
- Privacy Policy

## Getting Started:

```
  npm run seed
  npm run dev
```