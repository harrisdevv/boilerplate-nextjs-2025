# Replit Deployment & Custom Domain Setup

Complete guide to deploying your Next.js boilerplate on Replit and configuring custom domains.

## 📋 Table of Contents

- [Why Replit?](#why-replit)
- [Initial Deployment](#initial-deployment)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [Database Configuration](#database-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Why Replit?

Replit is an excellent platform for deploying Next.js applications with:

- ✅ **Free hosting tier** with generous limits
- ✅ **Automatic deployments** from Git repositories
- ✅ **Built-in database** support (PostgreSQL)
- ✅ **Custom domain** support
- ✅ **Zero-config deployments** for most Next.js apps
- ✅ **Collaborative development** environment

## Initial Deployment

### Step 1: Import Your Project

1. **Go to [Replit](https://replit.com)**
2. Click **"Create Repl"**
3. Select **"Import from GitHub"**
4. Enter your repository URL or select from your GitHub account
5. Replit will auto-detect it's a Next.js project
6. Click **"Import from GitHub"**

### Step 2: Configure Run Command

Replit should auto-detect Next.js, but verify the `.replit` configuration:

```toml
# .replit
run = "npm run dev"

[deployment]
run = ["sh", "-c", "npm run build && npm run start"]
```

### Step 3: Install Dependencies

Replit will automatically run `npm install` on first import. If needed, run manually:

```bash
npm install
```

### Step 4: Initial Test

Click the **"Run"** button to start the development server. You should see your app at the Replit-provided URL.

## Environment Variables

### Setting Up Secrets in Replit

1. Click the **"Secrets"** tab (lock icon) in the left sidebar
2. Add each environment variable as a key-value pair

### Required Environment Variables

```bash
# Database (use Replit PostgreSQL or external)
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# NextAuth
NEXTAUTH_URL="https://your-repl-name.repl.co"  # Update after deployment
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (see google-auth-setup.md)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Encryption
ENCRYPTION_KEY="your-32-byte-hex-encryption-key"

# Paddle Payments
PADDLE_VENDOR_ID="your-paddle-vendor-id"
PADDLE_API_KEY="your-paddle-api-key"
PADDLE_PUBLIC_KEY="your-paddle-public-key"
PADDLE_ENVIRONMENT="sandbox"  # or "production"

# Payment Mode
PAYMENT_MODE="lifetime"  # or "subscription"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-repl-name.repl.co"  # Update with your URL
NEXT_PUBLIC_APP_NAME="Your App Name"
```

### Generate Secrets

Run these commands in the Replit Shell:

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Custom Domain Setup

### Prerequisites

- A custom domain (e.g., `yourdomain.com`)
- Access to your domain's DNS settings
- Replit account (free or paid)

### Step 1: Get Your Replit URL

After deployment, note your Replit URL:
```
https://your-repl-name.your-username.repl.co
```

### Step 2: Add Custom Domain in Replit

1. Open your Repl
2. Click on the **"Deployments"** tab
3. Find **"Custom Domain"** section
4. Click **"Add Domain"**
5. Enter your domain: `yourdomain.com` or `app.yourdomain.com`
6. Replit will provide DNS records to configure

### Step 3: Configure DNS Records

Replit will show you what DNS records to add. Typically:

**For root domain (yourdomain.com):**

```
Type: A
Name: @
Value: [Replit IP address provided]
TTL: 3600
```

**For subdomain (app.yourdomain.com):**

```
Type: CNAME
Name: app
Value: your-repl-name.your-username.repl.co
TTL: 3600
```

### Step 4: Configure Your DNS Provider

#### Common DNS Providers

**Cloudflare:**
1. Go to your domain in Cloudflare dashboard
2. Navigate to **DNS** > **Records**
3. Click **"Add record"**
4. Add the A or CNAME record from Replit
5. Set **Proxy status** to **"DNS only"** (orange cloud off)
6. Click **"Save"**

**Namecheap:**
1. Go to Domain List > Manage
2. Click **"Advanced DNS"**
3. Click **"Add New Record"**
4. Add the record provided by Replit
5. Click **"Save"**

**GoDaddy:**
1. Go to Domain Settings
2. Click **"DNS"** > **"Manage DNS"**
3. Click **"Add"** under Records
4. Add the record from Replit
5. Click **"Save"**

### Step 5: Wait for DNS Propagation

- DNS changes can take **15 minutes to 48 hours**
- Check status: `dig yourdomain.com` or use [DNS Checker](https://dnschecker.org)

### Step 6: Enable HTTPS

Replit automatically provisions SSL certificates via Let's Encrypt:

1. After DNS propagation, go to **Deployments** tab
2. Replit will show SSL status
3. Once verified, your site will be available via HTTPS

### Step 7: Update Environment Variables

Update these secrets in Replit:

```bash
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Step 8: Redeploy

1. Click **"Deploy"** button in Deployments tab
2. Wait for deployment to complete
3. Visit your custom domain!

## Database Configuration

### Option 1: Replit PostgreSQL (Recommended)

Replit offers built-in PostgreSQL:

1. Click **"Database"** tab in left sidebar
2. Click **"Create PostgreSQL Database"**
3. Copy the connection string
4. Add to Secrets as `DATABASE_URL`

### Option 2: External Database

Use external PostgreSQL providers:

**Recommended providers:**
- [Supabase](https://supabase.com) - Free tier with 500MB
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Railway](https://railway.app) - PostgreSQL with free tier
- [ElephantSQL](https://www.elephantsql.com) - Managed PostgreSQL

**Setup:**
1. Create database on your chosen provider
2. Get connection string
3. Add to Replit Secrets as `DATABASE_URL`

### Initialize Database

After setting `DATABASE_URL`, run in Replit Shell:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

## Performance Optimization

### 1. Enable Replit Boosted Deployments

For better performance:
1. Go to **Deployments** tab
2. Enable **"Boosted"** mode (paid feature)
3. Get dedicated resources and faster cold starts

### 2. Optimize Next.js Build

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp'],
  },
  
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

### 3. Use Environment Variables for API Routes

Ensure API routes use environment variables, not hardcoded values:

```typescript
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
```

### 4. Enable Caching

Leverage Next.js caching:

```typescript
// In your API routes
export const revalidate = 3600 // Revalidate every hour
```

## Google OAuth Configuration

⚠️ **Important:** After deploying to Replit, update Google OAuth settings!

See **[[google-auth-setup.md]]** for detailed instructions, but key steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth credentials
3. Add authorized redirect URI:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
   Or if using Replit subdomain:
   ```
   https://your-repl-name.your-username.repl.co/api/auth/callback/google
   ```
4. Save changes

## Troubleshooting

### Build Fails

**Issue:** `npm run build` fails

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Database Connection Error

**Issue:** `Can't reach database server`

**Solutions:**
1. Verify `DATABASE_URL` in Secrets
2. Check database is running (Replit DB or external)
3. Ensure IP whitelist includes Replit IPs (for external DBs)

### Custom Domain Not Working

**Issue:** Domain doesn't resolve

**Solutions:**
1. Wait for DNS propagation (up to 48 hours)
2. Check DNS records with `dig yourdomain.com`
3. Verify DNS records match Replit's instructions exactly
4. Disable proxy/CDN temporarily (Cloudflare orange cloud)

### Environment Variables Not Loading

**Issue:** App can't find environment variables

**Solutions:**
1. Verify secrets are set in **Secrets** tab (not `.env` file)
2. Redeploy after adding secrets
3. Restart the Repl

### SSL Certificate Issues

**Issue:** HTTPS not working

**Solutions:**
1. Wait for DNS propagation first
2. Replit provisions SSL automatically after DNS resolves
3. Check Deployments tab for SSL status
4. May take up to 24 hours after DNS propagation

### App Running Slow

**Solutions:**
1. Consider upgrading to Replit Boosted
2. Optimize database queries
3. Enable Next.js production mode
4. Use CDN for static assets
5. Implement caching strategies

### Authentication Redirects Fail

**Issue:** OAuth redirects to wrong URL

**Solutions:**
1. Update `NEXTAUTH_URL` to match your domain
2. Update Google OAuth authorized redirect URIs
3. Clear browser cookies/cache
4. Redeploy after updating environment variables

## Monitoring & Logs

### View Logs

1. Click **"Console"** tab to see application logs
2. Use `logger.info()`, `logger.error()` from `@/lib/logger`
3. Check deployment logs in **"Deployments"** tab

### Monitor Performance

```typescript
// Add to your app
import { logger } from '@/lib/logger'

logger.info('Request processed', {
  context: 'api',
  metadata: { duration: endTime - startTime }
})
```

## Security Best Practices

1. ✅ **Use Secrets tab** for all sensitive data
2. ✅ **Never commit** `.env` file to Git
3. ✅ **Enable HTTPS** via custom domain
4. ✅ **Rotate secrets** regularly
5. ✅ **Use strong** `NEXTAUTH_SECRET` and `ENCRYPTION_KEY`
6. ✅ **Whitelist domains** in Google OAuth
7. ✅ **Use production mode** for Paddle

## Deployment Checklist

Before going live:

- [ ] All environment variables set in Secrets
- [ ] Custom domain configured and DNS propagated
- [ ] SSL certificate active (HTTPS working)
- [ ] Database connected and seeded
- [ ] Google OAuth configured with production URLs
- [ ] Paddle configured in production mode
- [ ] `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` updated
- [ ] Build succeeds: `npm run build`
- [ ] Test authentication flow
- [ ] Test payment flow (if applicable)
- [ ] Monitor logs for errors
- [ ] Performance tested

## Next Steps

After deploying to Replit:

1. **Configure Google Auth**: See [[google-auth-setup.md]]
2. **Setup AI Features**: See [[ai-setup.md]]
3. **Customize Your App**: Update branding and content
4. **Monitor Performance**: Check logs and performance metrics

---

**Need help?** Check the [Replit Documentation](https://docs.replit.com) or [Replit Community](https://ask.replit.com).

**Last Updated:** October 21, 2025

