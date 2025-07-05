# OAuth Setup Guide

This guide explains how to set up OAuth authentication with GitHub and Google for the Convex TanStack Starter Kit.

## Prerequisites

- A deployed Convex backend (to get your callback URLs)
- GitHub account for GitHub OAuth
- Google Cloud Console account for Google OAuth

## GitHub OAuth Setup

1. **Create a GitHub OAuth App**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the application details:
     - **Application name**: Your app name
     - **Homepage URL**: Your app's URL (e.g., `http://localhost:5173` for development)
     - **Authorization callback URL**: `https://your-backend.convex.site/api/auth/callback/github`
     - Replace `your-backend` with your actual Convex deployment URL

2. **Configure Environment Variables**
   ```bash
   npx convex env set AUTH_GITHUB_ID your_github_client_id
   npx convex env set AUTH_GITHUB_SECRET your_github_client_secret
   ```

## Google OAuth Setup

1. **Create a Google OAuth Client**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `https://your-backend.convex.site/api/auth/callback/google`
     - Replace `your-backend` with your actual Convex deployment URL

2. **Configure Environment Variables**
   ```bash
   npx convex env set AUTH_GOOGLE_ID your_google_client_id
   npx convex env set AUTH_GOOGLE_SECRET your_google_client_secret
   ```

## Site URL Configuration

Set your site URL for proper OAuth redirects:

```bash
# For development
npx convex env set CONVEX_SITE_URL http://localhost:5173

# For production
npx convex env set CONVEX_SITE_URL https://your-production-domain.com
```

## Testing OAuth

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login` or `/signup`

3. Click on the GitHub or Google buttons to test OAuth authentication

## Production Considerations

1. **Separate OAuth Apps**: Create separate OAuth applications for development and production environments

2. **Environment Variables**: Ensure all OAuth credentials are properly set in your production Convex deployment

3. **Callback URLs**: Update callback URLs to match your production Convex backend URL

4. **HTTPS**: Ensure your production site uses HTTPS for security

## Troubleshooting

- **Invalid callback URL**: Ensure the callback URL in your OAuth app matches exactly with your Convex backend URL
- **Missing credentials**: Verify all environment variables are set correctly using `npx convex env get`
- **Authentication errors**: Check the browser console and Convex logs for detailed error messages

## Security Best Practices

1. Never commit OAuth credentials to version control
2. Use environment variables for all sensitive information
3. Regularly rotate OAuth secrets
4. Monitor OAuth app usage for suspicious activity
5. Implement rate limiting on authentication endpoints