# convex-tanstack-starter-kit

## WARNING

This is a work in progress and is not yet ready for production use. My goal is to create a highly opinionated "batteries included" starter kit that lets devs build serious software quickly, using Convex, Tanstack Start, and Effect. I'm actively working on finishing up the initial work, docs, and instructions.

## Getting Started

To install dependencies:

```bash
npm install
```

To run:

```bash
npm run dev
npx convex dev
```

To build:

```bash
npm run build
```

To deploy:

```bash
npx convex deploy
```

## Stack

- Typescript
- Convex
- Tanstack (start/router/query/forms/etc.)
- Tailwind + Shadcn UI / BaseUI (moving to BaseUI as components become available)
- Cloudflare R2 for image storage
- Resend for emails
- Polar or Autumn for billing/subscriptions (undecided which one atm)

## TODO

- [x] Reset Passwords (via Better Auth component)
- [ ] Account page
- [ ] Account page: Change password
- [ ] Subscriptions / Billing page - show subscription
- [ ] Upgrade to Pro functionality
- [ ] Notifications
- [ ] Comprehensive todo list functionality
- [ ] R2 Component integration
- [ ] Account page: profile pic uploader
- [ ] Presence Component
- [ ] Team / Org setup
- [ ] Dark / light mode
- [ ] User Impersonation
- [ ] Social Sign-On: Google / Github / Apple
- [ ] Last Login Method (Better Auth utility w/social sign-on)
- [ ] Two factor auth (Better Auth util)
- [ ] Sentry setup guide
- [ ] Logging setup guide
- [ ] Analytics setup guide
- [ ] Save sidebar state to cookie
- [ ] Convex Effect integration
- [ ] Convex Ents integration
- [ ] Unit tests
- [ ] Integration tests
