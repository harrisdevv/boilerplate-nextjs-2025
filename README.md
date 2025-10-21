# Next.js Production Boilerplate

A comprehensive, production-ready Next.js 14 boilerplate with authentication, payments, blog system, and SEO optimization. Built with TypeScript, Prisma, Tailwind CSS, and modern best practices.

## 🚀 Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Prisma ORM** with PostgreSQL
- ✅ **Authentication** with NextAuth (Google OAuth)
- ✅ **Payments** with Paddle (Lifetime + Subscription)
- ✅ **Blog System** with SEO optimization
- ✅ **State Management** with Zustand
- ✅ **UI Components** with shadcn/ui + Tailwind CSS
- ✅ **Rich Text Editor** with Tiptap
- ✅ **AI Integration** with OpenRouter (BYOK)
- ✅ **SEO Tools** (Sitemap, Robots.txt, Meta tags)
- ✅ **Lighthouse Testing** for performance monitoring
- ✅ **Encryption** for sensitive data (AES-256-GCM)
- ✅ **Debug Logging** for troubleshooting

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or higher
- npm 9.x or higher
- PostgreSQL database
- Google OAuth credentials
- Paddle account (optional for payments)

## 🛠️ Quick Start

### 1. Clone and Install

```bash
# Navigate to the boilerplate directory
cd /home/hienphan/Desktop/code/boilerplate

# Install dependencies
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Encryption (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ENCRYPTION_KEY="your-32-byte-hex-key"

# Paddle (optional)
PADDLE_VENDOR_ID="your-paddle-vendor-id"
PADDLE_API_KEY="your-paddle-api-key"
PADDLE_PUBLIC_KEY="your-paddle-public-key"
PADDLE_ENVIRONMENT="sandbox"

# Payment Mode
PAYMENT_MODE="lifetime"  # or "subscription"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Your App Name"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

### Project Structure

```
boilerplate/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── scripts/
│   └── lighthouse.js          # Lighthouse testing
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── blog/              # Blog pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── robots.ts          # Robots.txt
│   │   └── sitemap.ts         # Sitemap
│   ├── components/            # React components
│   │   ├── landing/           # Landing page sections
│   │   ├── layout/            # Layout components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilities
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── encryption.ts      # Encryption utilities
│   │   ├── logger.ts          # Logging utility
│   │   ├── openrouter.ts      # OpenRouter integration
│   │   ├── paddle.ts          # Paddle integration
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # Common utilities
│   └── stores/                # Zustand stores
│       ├── ui-store.ts        # UI state
│       └── user-store.ts      # User state
├── .env.example               # Environment variables template
├── package.json               # Dependencies
└── README.md                  # This file
```

### Authentication Setup

#### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to "Credentials"
4. Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

#### 2. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Add the output to `NEXTAUTH_SECRET` in `.env`

### Payment Setup with Paddle

#### 1. Paddle Account Setup

1. Sign up at [Paddle](https://paddle.com)
2. Get your Vendor ID from Settings
3. Generate API Key
4. Copy credentials to `.env`

#### 2. Payment Mode Toggle

The boilerplate supports two payment modes:

**Lifetime Payment** (One-time purchase):
```env
PAYMENT_MODE="lifetime"
```

**Subscription** (Monthly/Annual):
```env
PAYMENT_MODE="subscription"
```

#### 3. Configure Pricing

Update pricing in the database:

```bash
npx prisma studio
```

Navigate to `SiteConfig` and update:
- `lifetimePrice`: One-time payment amount
- `monthlyPrice`: Monthly subscription amount
- `annualPrice`: Annual subscription amount
- `paymentMode`: LIFETIME or SUBSCRIPTION

### Database Management

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Run migrations (production)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database
npm run db:seed
```

### Blog System

#### Creating Blog Posts

Blog posts are managed through the database. Use Prisma Studio or create an admin interface.

**Via Prisma Studio:**

1. Run `npm run db:studio`
2. Navigate to `BlogPost`
3. Create new post with:
   - `title`: Post title
   - `slug`: URL-friendly slug
   - `content`: HTML content
   - `status`: DRAFT or PUBLISHED
   - `authorId`: User ID

**SEO Fields:**
- `metaTitle`: SEO title
- `metaDescription`: SEO description
- `metaKeywords`: Comma-separated keywords
- `ogImage`: Open Graph image URL

### State Management with Zustand

#### User Store

```typescript
import { useUserStore } from '@/stores/user-store'

function Component() {
  const { user, subscription, setUser } = useUserStore()
  
  // Access user data
  console.log(user?.email)
  
  // Update user
  setUser({ id: '1', name: 'John', email: 'john@example.com', role: 'user' })
}
```

#### UI Store

```typescript
import { useUIStore } from '@/stores/ui-store'

function Component() {
  const { theme, toggleTheme, addToast } = useUIStore()
  
  // Toggle theme
  toggleTheme()
  
  // Show toast
  addToast({
    title: 'Success',
    description: 'Action completed',
    type: 'success'
  })
}
```

### OpenRouter AI Integration

#### 1. User API Key Management

Users provide their own OpenRouter API keys (BYOK - Bring Your Own Key).

#### 2. Store Encrypted API Key

```typescript
import { encrypt } from '@/lib/encryption'
import { prisma } from '@/lib/prisma'

// Encrypt and store
const { encrypted, iv } = encrypt(userApiKey)

await prisma.apiKey.create({
  data: {
    userId: user.id,
    name: 'OpenRouter',
    encryptedKey: encrypted,
    iv: iv,
  }
})
```

#### 3. Use AI Completion

```typescript
import { openrouter } from '@/lib/openrouter'

// Get user's API key
const apiKey = await prisma.apiKey.findFirst({
  where: { userId: user.id, name: 'OpenRouter' }
})

// Create completion
const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'anthropic/claude-3-haiku',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  }
)

console.log(response.choices[0].message.content)
```

### SEO Optimization

#### Automatic SEO Features

- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Meta tags in layout
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Semantic HTML structure

#### Custom Page SEO

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: 'keyword1, keyword2',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
}
```

### Lighthouse Testing

Run performance, accessibility, best practices, and SEO audits:

```bash
# Start dev server
npm run dev

# In another terminal, run Lighthouse
npm run lighthouse
```

Reports are saved in `lighthouse-reports/` directory.

### Logging and Debugging

The boilerplate includes a comprehensive logging system:

```typescript
import { logger } from '@/lib/logger'

// Info logs
logger.info('User logged in', {
  context: 'auth',
  metadata: { userId: user.id }
})

// Debug logs (dev only)
logger.debug('Processing request', {
  context: 'api',
  metadata: { endpoint: '/api/users' }
})

// Error logs
logger.error('Failed to process', error, {
  context: 'payment',
  metadata: { orderId: order.id }
})

// Warning logs
logger.warn('Rate limit approaching', {
  context: 'api',
  metadata: { remaining: 10 }
})
```

## 🚢 Deployment

### Environment Variables

Ensure all production environment variables are set:

- Database URL (production PostgreSQL)
- NextAuth secret and URL
- Google OAuth credentials
- Paddle credentials
- Encryption key

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deployment Platforms

This boilerplate works with:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**
- **AWS/GCP/Azure**

## 📦 Customization

### Changing App Name and Branding

1. Update `.env`:
   ```env
   NEXT_PUBLIC_APP_NAME="Your App Name"
   ```

2. Update `src/components/layout/header.tsx`:
   ```tsx
   <span className="font-bold">YourApp</span>
   ```

3. Update `src/app/layout.tsx` metadata

### Adding New Features

1. Create database models in `prisma/schema.prisma`
2. Run `npm run db:push`
3. Create API routes in `src/app/api/`
4. Create UI components in `src/components/`
5. Add pages in `src/app/`

### Styling

The boilerplate uses Tailwind CSS with shadcn/ui components.

**Customize theme** in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
    },
  },
}
```

**Add global styles** in `src/app/globals.css`

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ AES-256-GCM encryption for sensitive data
- ✅ Secure session management
- ✅ CSRF protection with NextAuth
- ✅ SQL injection protection with Prisma
- ✅ XSS protection with React

## 📝 License

MIT License - feel free to use this boilerplate for any project.

## 🤝 Contributing

This is a boilerplate template. Fork it and customize for your needs!

## 📮 Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check Next.js, Prisma, and NextAuth documentation
4. Open an issue on GitHub

---

Built with ❤️ for rapid production-ready development.

