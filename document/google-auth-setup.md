# Google OAuth Authentication Setup

Complete guide to setting up Google OAuth authentication for your Next.js application, including Replit deployment configuration.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Google Cloud Console Setup](#google-cloud-console-setup)
- [Local Development Configuration](#local-development-configuration)
- [Replit Configuration](#replit-configuration)
- [Production Configuration](#production-configuration)
- [Testing Authentication](#testing-authentication)
- [Troubleshooting](#troubleshooting)

## Overview

This boilerplate uses NextAuth.js with Google OAuth provider for user authentication. Users can sign in with their Google accounts.

**What you'll get:**
- ✅ Secure Google OAuth 2.0 authentication
- ✅ Automatic user creation in database
- ✅ Session management
- ✅ Profile information (name, email, avatar)

## Prerequisites

Before starting:
- Google account
- Access to [Google Cloud Console](https://console.cloud.google.com)
- Your app deployed or running locally

## Google Cloud Console Setup

### Step 1: Create a Google Cloud Project

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. Click **"Select a project"** dropdown at the top
3. Click **"New Project"**
4. Enter project details:
   - **Project name**: `Your App Name`
   - **Organization**: Leave default
5. Click **"Create"**
6. Wait for project creation (takes ~30 seconds)

### Step 2: Enable Google+ API

1. In the Google Cloud Console, ensure your project is selected
2. Click the **hamburger menu** (☰) > **"APIs & Services"** > **"Library"**
3. Search for **"Google+ API"**
4. Click on **"Google+ API"**
5. Click **"Enable"**

> **Note:** You may also want to enable **"Google People API"** for additional profile information.

### Step 3: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** > **"OAuth consent screen"**

2. **Choose user type:**
   - **Internal**: Only for Google Workspace users (not recommended)
   - **External**: For public apps (recommended)
   - Select **"External"**
   - Click **"Create"**

3. **Configure OAuth consent screen:**

   **App information:**
   - **App name**: `Your App Name`
   - **User support email**: `your-email@gmail.com`
   - **App logo**: Upload your logo (optional)

   **App domain:**
   - **Application home page**: `https://yourdomain.com`
   - **Application privacy policy**: `https://yourdomain.com/privacy`
   - **Application terms of service**: `https://yourdomain.com/terms`

   **Authorized domains:**
   Add your domains (one per line):
   ```
   yourdomain.com
   your-repl-name.your-username.repl.co
   ```

   **Developer contact information:**
   - **Email addresses**: `your-email@gmail.com`

4. Click **"Save and Continue"**

5. **Scopes:**
   - Click **"Add or Remove Scopes"**
   - Select these scopes:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`
   - Click **"Update"**
   - Click **"Save and Continue"**

6. **Test users** (for development):
   - Click **"Add Users"**
   - Add your Google account email
   - Click **"Add"**
   - Click **"Save and Continue"**

7. **Summary:**
   - Review your settings
   - Click **"Back to Dashboard"**

### Step 4: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** > **"Credentials"**

2. Click **"Create Credentials"** > **"OAuth client ID"**

3. **Configure OAuth client:**
   - **Application type**: Select **"Web application"**
   - **Name**: `Your App Web Client`

4. **Authorized JavaScript origins:**
   
   Add all your app URLs (click **"Add URI"** for each):
   ```
   http://localhost:3000
   https://yourdomain.com
   https://your-repl-name.your-username.repl.co
   ```

5. **Authorized redirect URIs:**
   
   ⚠️ **This is critical!** Add these URIs (click **"Add URI"** for each):
   
   **For local development:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   
   **For Replit:**
   ```
   https://your-repl-name.your-username.repl.co/api/auth/callback/google
   ```
   
   **For production domain:**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

   > **Format:** Always use `https://your-domain.com/api/auth/callback/google`

6. Click **"Create"**

7. **Save your credentials:**
   - **Client ID**: `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: `xxxxxx`
   
   ⚠️ **Important:** Copy these immediately! You'll need them for environment variables.

## Local Development Configuration

### Step 1: Add Credentials to `.env`

Edit your `.env` file:

```bash
# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"  # Generate with: openssl rand -base64 32
```

### Step 2: Verify Configuration

Check `src/lib/auth.ts` includes Google provider:

```typescript
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... other config
}
```

### Step 3: Test Locally

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000`
3. Click **"Sign in"**
4. Click **"Sign in with Google"**
5. You should be redirected to Google OAuth
6. Authorize your app
7. You should be redirected back and signed in!

## Replit Configuration

### Step 1: Get Your Replit URL

After deploying to Replit, your URL will be:
```
https://your-repl-name.your-username.repl.co
```

Or if you configured a custom domain:
```
https://yourdomain.com
```

### Step 2: Update Google OAuth Credentials

1. **Go back to [Google Cloud Console](https://console.cloud.google.com)**
2. Navigate to **"APIs & Services"** > **"Credentials"**
3. Click on your OAuth 2.0 Client ID
4. **Add Replit URLs:**

   **Authorized JavaScript origins:**
   - Click **"Add URI"**
   - Add: `https://your-repl-name.your-username.repl.co`
   
   **Authorized redirect URIs:**
   - Click **"Add URI"**
   - Add: `https://your-repl-name.your-username.repl.co/api/auth/callback/google`

5. Click **"Save"**

### Step 3: Update Replit Secrets

In your Repl:
1. Click **"Secrets"** tab (lock icon)
2. Update or add these secrets:

```bash
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="https://your-repl-name.your-username.repl.co"
NEXTAUTH_SECRET="your-generated-secret"
```

### Step 4: Redeploy

1. Click **"Deploy"** in Deployments tab
2. Wait for deployment to complete
3. Test authentication on your Replit URL

## Production Configuration

### For Custom Domain on Replit

Once you've configured a custom domain (see [[replit-setup.md]]):

1. **Update Google OAuth in Cloud Console:**

   Add production URLs to your OAuth credentials:
   
   **Authorized JavaScript origins:**
   ```
   https://yourdomain.com
   ```
   
   **Authorized redirect URIs:**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

2. **Update Replit Secrets:**

   ```bash
   NEXTAUTH_URL="https://yourdomain.com"
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

3. **Redeploy**

### For Other Hosting Platforms

**Vercel:**
```
https://your-app.vercel.app/api/auth/callback/google
```

**Netlify:**
```
https://your-app.netlify.app/api/auth/callback/google
```

**Railway:**
```
https://your-app.up.railway.app/api/auth/callback/google
```

Always use the pattern: `https://your-domain.com/api/auth/callback/google`

## Testing Authentication

### Test Checklist

- [ ] Can access sign-in page
- [ ] "Sign in with Google" button appears
- [ ] Click redirects to Google OAuth consent screen
- [ ] Can select Google account
- [ ] Can grant permissions
- [ ] Redirects back to your app
- [ ] User is signed in (name/email displayed)
- [ ] User record created in database
- [ ] Can access protected pages (dashboard)
- [ ] Can sign out successfully

### Manual Testing

1. **Clear browser cookies/cache** (important!)

2. **Visit your app:**
   ```
   http://localhost:3000
   or
   https://your-repl-name.your-username.repl.co
   ```

3. **Click "Sign In"** → Should redirect to `/auth/signin`

4. **Click "Sign in with Google"**
   - Should redirect to Google OAuth
   - URL should be `accounts.google.com/o/oauth2/v2/auth...`

5. **Select your Google account**
   - Grant permissions when prompted
   - Should see scopes: email, profile

6. **After authorization:**
   - Should redirect to: `your-domain.com/api/auth/callback/google?code=...`
   - Then redirect to your app (usually `/dashboard` or `/`)
   - You should see your name/email in the UI

7. **Check database:**
   ```bash
   npx prisma studio
   ```
   - Navigate to `User` table
   - Your user should be created with Google data

### Debug Authentication

Enable debug logs in `.env.local`:

```bash
NEXTAUTH_DEBUG=true
```

Check console/server logs for detailed OAuth flow.

## Troubleshooting

### Error: "Redirect URI Mismatch"

**Problem:** OAuth redirect URI doesn't match Google Cloud Console settings.

**Solutions:**
1. Check exact redirect URI in error message
2. Ensure it's added to **"Authorized redirect URIs"** in Google Cloud Console
3. URIs are case-sensitive and must match exactly
4. Include the full path: `/api/auth/callback/google`
5. Use `https://` for production (not `http://`)

### Error: "Access Blocked: This app's request is invalid"

**Problem:** OAuth consent screen not properly configured.

**Solutions:**
1. Complete OAuth consent screen setup
2. Add your email to test users (for development)
3. Ensure app is published (for production)
4. Check authorized domains include your domain

### Error: "invalid_client"

**Problem:** Wrong Client ID or Client Secret.

**Solutions:**
1. Verify `GOOGLE_CLIENT_ID` in environment variables
2. Verify `GOOGLE_CLIENT_SECRET` in environment variables
3. Check for extra spaces or newlines in credentials
4. Regenerate credentials if necessary

### Sign-in Button Doesn't Appear

**Solutions:**
1. Check `src/lib/auth.ts` includes GoogleProvider
2. Verify environment variables are set
3. Restart development server after changing `.env`
4. Check browser console for JavaScript errors

### Redirect Works but User Not Created

**Solutions:**
1. Check database connection (`DATABASE_URL`)
2. Run `npm run db:push` to ensure schema is up to date
3. Check Prisma schema has `Account`, `Session`, `User` models
4. Enable `NEXTAUTH_DEBUG=true` to see errors

### Works Locally but Not on Replit

**Solutions:**
1. Verify Replit URL is in Google OAuth authorized URIs
2. Check Replit Secrets are set correctly
3. Ensure `NEXTAUTH_URL` matches your Replit URL
4. Redeploy after updating secrets
5. Clear browser cache/cookies

### "This app hasn't been verified"

**Expected for development.** Users will see:
> "Google hasn't verified this app"

**For production:**
1. Go through Google's verification process
2. Or stay in testing mode (up to 100 test users)
3. Users can click "Advanced" → "Go to [Your App] (unsafe)" during testing

## Security Best Practices

1. ✅ **Never commit** credentials to Git
2. ✅ **Use environment variables** for all secrets
3. ✅ **Rotate secrets** regularly
4. ✅ **Limit authorized domains** to only your domains
5. ✅ **Use HTTPS** in production (never HTTP)
6. ✅ **Keep Client Secret** confidential
7. ✅ **Monitor OAuth usage** in Google Cloud Console
8. ✅ **Implement rate limiting** for auth endpoints

## Multiple Environments

Manage multiple environments with separate OAuth credentials:

**Development:**
- Client ID: `dev-client-id.apps.googleusercontent.com`
- Redirect: `http://localhost:3000/api/auth/callback/google`

**Staging (Replit):**
- Client ID: `staging-client-id.apps.googleusercontent.com`
- Redirect: `https://your-repl.repl.co/api/auth/callback/google`

**Production:**
- Client ID: `prod-client-id.apps.googleusercontent.com`
- Redirect: `https://yourdomain.com/api/auth/callback/google`

Or use one OAuth client with multiple redirect URIs (easier to manage).

## Adding Additional OAuth Providers

This boilerplate supports multiple providers. To add more:

**GitHub:**
```typescript
import GithubProvider from 'next-auth/providers/github'

providers: [
  GoogleProvider({ /* ... */ }),
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
]
```

See [NextAuth Providers](https://next-auth.js.org/providers/) for more options.

## Monitoring & Analytics

Track authentication in Google Cloud Console:

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click on your OAuth client
3. View **"OAuth consent metrics"** for usage stats

## Next Steps

After setting up Google OAuth:

1. **Test thoroughly** on all environments
2. **Setup Replit deployment**: See [[replit-setup.md]]
3. **Customize sign-in page**: Edit `src/app/auth/signin/page.tsx`
4. **Add user onboarding**: Create welcome flow for new users
5. **Implement role-based access**: Use user roles for permissions

---

**Need help?** Check [NextAuth.js Documentation](https://next-auth.js.org) or [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2).

**Last Updated:** October 21, 2025

