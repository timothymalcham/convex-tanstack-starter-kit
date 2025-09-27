# convex-tanstack-starter-kit

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## Stack

- Bun
- Typescript
- Convex 
- Tanstack (start/router/query/forms/etc.)
- Tailwind + Shadcn UI / BaseUI (moving to BaseUI as components become available)
- Cloudflare R2 for image storage
- Resend for emails
- Polar or Autumn for billing/subscriptions (undecided which one atm)

## TODO

- Reset Passwords (via Better Auth component)
- Verify email - show link to page to verify email instead of entering in code
- Account page
- Account page: Change password
- Subscriptions / Billing page - show subscription 
- Upgrade to Pro functionality
- Notifications
- Comprehensive todo list functionality
- R2 Component integration
- Account page: profile pic uploader
- Presence Component
- Team / Org setup
- Dark / light mode
- User Impersonation 
- Social Sign-On: Google / Github / Apple
- Last Login Method (Better Auth utility w/social sign-on)
- Two factor auth (Better Auth util)
- Sentry setup guide
- Logging setup guide
- Analytics setup guide