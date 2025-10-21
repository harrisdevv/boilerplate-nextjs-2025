# Project Overview

## What is This Boilerplate?

This is a **production-grade Next.js 14 boilerplate** designed to help you launch web applications quickly. It includes everything you need for a modern SaaS application:

- ✅ User authentication
- ✅ Payment processing (lifetime + subscription)
- ✅ Blog/content system
- ✅ AI integration ready
- ✅ SEO optimized
- ✅ Performance tested

## Directory Structure Explained

```
boilerplate/
│
├── prisma/                    # Database layer
│   ├── schema.prisma         # Database models and relations
│   └── seed.ts               # Initial data for development
│
├── scripts/                   # Utility scripts
│   └── lighthouse.js         # Performance testing
│
├── src/
│   ├── app/                  # Next.js App Router (pages & API)
│   │   ├── api/              # Backend API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── config/       # Configuration endpoints
│   │   │   └── paddle/       # Payment webhooks
│   │   ├── auth/             # Auth pages (signin, etc.)
│   │   ├── blog/             # Blog pages
│   │   ├── dashboard/        # Protected dashboard
│   │   ├── layout.tsx        # Root layout (wraps all pages)
│   │   ├── page.tsx          # Landing page
│   │   ├── robots.ts         # SEO robots.txt
│   │   └── sitemap.ts        # SEO sitemap
│   │
│   ├── components/           # React components
│   │   ├── landing/          # Landing page sections
│   │   ├── layout/           # Header, Footer, etc.
│   │   ├── ui/               # shadcn/ui components
│   │   └── providers.tsx     # App-wide providers
│   │
│   ├── lib/                  # Utilities and services
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── encryption.ts     # AES-256-GCM encryption
│   │   ├── logger.ts         # Logging utility
│   │   ├── openrouter.ts     # AI service
│   │   ├── paddle.ts         # Payment service
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   │
│   ├── stores/               # State management (Zustand)
│   │   ├── ui-store.ts       # UI state (theme, toasts, modals)
│   │   └── user-store.ts     # User & subscription state
│   │
│   └── middleware.ts         # Route protection
│
├── document/                  # Documentation
│   └── changelog.md          # Version history
│
├── .env.example              # Environment variables template
├── components.json           # shadcn/ui configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Full documentation
├── QUICK_START.md            # 10-minute setup guide
└── CONTRIBUTING.md           # Contribution guidelines
```

## Key Concepts

### 1. App Router (src/app/)

Next.js 14 uses file-based routing in the `app/` directory:

- `page.tsx` → Creates a page
- `layout.tsx` → Wraps multiple pages
- `route.ts` → API endpoint

Example:
```
app/
├── page.tsx              → /
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/[slug]
└── api/
    └── users/
        └── route.ts      → /api/users
```

### 2. Server vs Client Components

**Server Components** (default):
- Run on the server
- Can directly access database
- Don't ship JS to client
- Cannot use hooks or browser APIs

**Client Components** (with 'use client'):
- Run in browser
- Can use hooks (useState, useEffect)
- Can access browser APIs
- Required for interactivity

Example:
```typescript
// Server Component (default)
export default async function Page() {
  const data = await prisma.post.findMany() // ✅ Direct DB access
  return <div>{data}</div>
}

// Client Component
'use client'
export function Counter() {
  const [count, setCount] = useState(0) // ✅ Hooks work here
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 3. Database with Prisma

Prisma provides type-safe database access:

```typescript
// Define schema in prisma/schema.prisma
model Post {
  id    String @id @default(cuid())
  title String
  views Int    @default(0)
}

// Use in code (fully typed!)
const post = await prisma.post.create({
  data: { title: 'Hello World' }
})

post.title // ✅ TypeScript knows this exists
post.xyz   // ❌ TypeScript error
```

### 4. State Management with Zustand

Zustand is a simple, lightweight state manager:

```typescript
// Define store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))

// Use in component
function Component() {
  const { count, increment } = useStore()
  return <button onClick={increment}>{count}</button>
}
```

### 5. Payment Flow

**Lifetime Payment:**
1. User clicks "Buy Now"
2. Paddle checkout opens
3. User completes payment
4. Webhook received → Create subscription record
5. User gets lifetime access

**Subscription:**
1. User selects monthly/annual plan
2. Paddle checkout with recurring billing
3. User subscribes
4. Webhook received → Create subscription record
5. Automatic renewal each period

### 6. Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth
3. User approves
4. Google redirects back to app
5. NextAuth creates session
6. User data stored in database
7. Session cookie set
8. Protected routes accessible

## Common Use Cases

### Add a New Page

```typescript
// src/app/about/page.tsx
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company'
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1>About Us</h1>
        <p>We build amazing products.</p>
      </main>
      <Footer />
    </div>
  )
}
```

### Create an API Endpoint

```typescript
// src/app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    take: 10
  })
  
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const body = await req.json()
  
  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId
    }
  })
  
  return NextResponse.json(post)
}
```

### Add a Database Model

```prisma
// prisma/schema.prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Decimal  @db.Decimal(10, 2)
  description String?
  inStock     Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Then run:
```bash
npm run db:push
```

### Use AI (OpenRouter)

```typescript
import { openrouter } from '@/lib/openrouter'
import { prisma } from '@/lib/prisma'

// Get user's encrypted API key
const apiKey = await prisma.apiKey.findFirst({
  where: { userId: user.id, name: 'OpenRouter' }
})

// Generate text
const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Write a blog post about Next.js' }
    ],
    temperature: 0.7,
    maxTokens: 1000
  }
)

const content = response.choices[0].message.content
```

### Show a Toast Notification

```typescript
'use client'
import { useUIStore } from '@/stores/ui-store'

function MyComponent() {
  const { addToast } = useUIStore()
  
  function handleAction() {
    // Do something...
    
    addToast({
      title: 'Success!',
      description: 'Your action was completed',
      type: 'success'
    })
  }
  
  return <button onClick={handleAction}>Click me</button>
}
```

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes** to code
3. **Check database**: `npm run db:studio`
4. **Test locally**: Visit http://localhost:3000
5. **Run tests**: `npm run lighthouse`
6. **Build**: `npm run build`
7. **Deploy**: Push to Vercel/Netlify/etc.

## Production Checklist

Before deploying to production:

- [ ] Set all environment variables
- [ ] Use production database (not local)
- [ ] Generate strong secrets (NEXTAUTH_SECRET, ENCRYPTION_KEY)
- [ ] Set up Google OAuth production credentials
- [ ] Configure Paddle in production mode
- [ ] Update NEXT_PUBLIC_APP_URL to production URL
- [ ] Run `npm run build` to test build
- [ ] Test payment flow in production
- [ ] Test authentication flow
- [ ] Run Lighthouse tests
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)

## Support & Resources

- **README.md**: Full documentation
- **QUICK_START.md**: 10-minute setup
- **CONTRIBUTING.md**: How to contribute
- **document/changelog.md**: Version history

**External Resources:**
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

**Happy Building! 🚀**

