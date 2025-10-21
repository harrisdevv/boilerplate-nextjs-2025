# Quick Start Guide

Get your Next.js production app running in 10 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd /home/hienphan/Desktop/code/boilerplate
npm install
```

## Step 2: Setup Environment (3 minutes)

```bash
# Copy example environment file
cp env.example .env
```

**Generate secrets:**

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Minimum required `.env` for local development:**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-generated-secret-here"
ENCRYPTION_KEY="paste-generated-key-here"

# Optional - Add later when ready
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Step 3: Setup Database (2 minutes)

**Option A: Local PostgreSQL**

1. Install PostgreSQL
2. Create database: `createdb myapp`
3. Update `DATABASE_URL` in `.env`

**Option B: Free Cloud Database**

1. Sign up for [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Create new database
3. Copy connection string to `DATABASE_URL`

**Initialize database:**

```bash
npm run db:push
npm run db:seed
```

## Step 4: Run Development Server (1 minute)

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## Step 5: Add Google Authentication (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy credentials to `.env`

## What's Next?

### Customize Your App

1. **Change app name:**
   - Edit `NEXT_PUBLIC_APP_NAME` in `.env`
   - Update `src/components/layout/header.tsx`

2. **Update landing page:**
   - Edit `src/components/landing/hero-section.tsx`
   - Modify features in `src/components/landing/features-section.tsx`

3. **Configure payments:**
   - Sign up for [Paddle](https://paddle.com)
   - Add credentials to `.env`
   - Set `PAYMENT_MODE` to "lifetime" or "subscription"

### Add Your First Blog Post

```bash
# Open Prisma Studio
npm run db:studio
```

1. Navigate to `BlogPost`
2. Click "Add Record"
3. Fill in:
   - Title: "My First Post"
   - Slug: "my-first-post"
   - Content: "<p>Hello world!</p>"
   - Status: PUBLISHED
   - Author: Select your user
4. Save

Visit: [http://localhost:3000/blog](http://localhost:3000/blog)

### Run Lighthouse Test

```bash
# In terminal 1
npm run dev

# In terminal 2
npm run lighthouse
```

Check reports in `lighthouse-reports/` folder.

## Common Issues

### Database Connection Error

- Check PostgreSQL is running: `pg_isready`
- Verify `DATABASE_URL` is correct
- Try: `npm run db:push` again

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Prisma Client Not Generated

```bash
npm run db:generate
```

## Scripts Reference

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run db:push      # Push schema to database
npm run db:studio    # Open database GUI
npm run db:seed      # Seed database
npm run lighthouse   # Run performance tests
```

## Next Steps

- Read full [README.md](./README.md)
- Review [CHANGELOG.md](./document/changelog.md)
- Customize components in `src/components/`
- Add your features!

---

**Happy coding! 🚀**

