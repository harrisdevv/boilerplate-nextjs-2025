# Next.js Production Boilerplate

## Overview

This is a production-ready Next.js 14 boilerplate designed for rapid SaaS application development. It provides a complete foundation for building modern web applications with authentication, content management, and monetization capabilities. The architecture emphasizes developer experience, performance, and scalability while maintaining simplicity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- Next.js 14 with App Router for file-based routing and React Server Components
- TypeScript for type safety across the application
- Server-side rendering (SSR) and static site generation (SSG) for optimal performance and SEO

**UI & Styling**
- Tailwind CSS for utility-first styling with custom theme configuration
- shadcn/ui component library built on Radix UI primitives
- Responsive design with mobile-first approach
- Dark mode support through CSS variables

**State Management**
- Zustand for client-side state (UI state and user data)
- Separate stores for UI concerns (`ui-store.ts`) and user data (`user-store.ts`)
- Persistent storage for user preferences using Zustand middleware

**Component Structure**
- Feature-based organization under `src/components/`
- Landing page components isolated in `components/landing/`
- Shared UI components in `components/ui/`
- Layout components (Header, Footer, Sidebar) in `components/layout/`

### Backend Architecture

**Authentication System**
- Firebase Authentication for user management
- Google OAuth and email/password authentication supported
- Context-based auth state management (`src/lib/firebase/auth-context.tsx`)
- Protected routes with client-side route guards (`src/components/auth/protected-route.tsx`)
- Client-side authentication flow (dashboard pages are client components)
- No traditional session management - relies on Firebase tokens
- Note: Server-side/API route authentication not yet implemented (would require ID token verification)

**Database Layer**
- PostgreSQL as the primary database
- Prisma ORM for type-safe database access
- Schema includes models for users, blog posts, categories, tags, and site configuration
- Graceful degradation when database is unavailable (particularly for blog features)

**Content Management**
- Hybrid blog system combining markdown files and database posts
- Markdown posts stored in `content/blog/` directory with frontmatter metadata
- Database posts for dynamic, user-generated content
- MDX processing with gray-matter for frontmatter parsing
- Reading time calculation for blog posts

**API Routes**
- API routes located in `src/app/api/`
- RESTful endpoints for configuration (`/api/config/pricing`)
- Webhook endpoints for payment processing (`/api/paddle/`)

### External Dependencies

**Authentication**
- Firebase Authentication (email/password and Google OAuth)
- Configuration requires Firebase project setup with web app credentials

**Payment Processing**
- Paddle.com as merchant of record
- Supports both lifetime (one-time) and subscription billing models
- Webhook integration for payment events
- No direct credit card handling - all processed through Paddle
- Sandbox and production environments supported

**AI Integration**
- OpenRouter API for multi-model AI access (optional feature)
- Bring-your-own-key (BYOK) model - users provide their own API keys
- AES-256-GCM encryption for storing API keys
- Support for Claude, GPT-4, Gemini, and other models through unified interface

**Content Processing**
- `gray-matter` for markdown frontmatter parsing
- `next-mdx-remote` for MDX content rendering
- `reading-time` for blog post reading time estimation
- `rehype-highlight` for code syntax highlighting
- `remark-gfm` for GitHub Flavored Markdown support

**UI Components**
- Radix UI primitives for accessible component foundations
- Tiptap rich text editor for content creation
- Lucide React for icon library

**Development & Quality**
- Lighthouse for performance auditing (`scripts/lighthouse.js`)
- ESLint for code quality
- TypeScript for type checking
- Prettier (implied by code style)

### Data Flow & Security

**Encryption**
- AES-256-GCM encryption for sensitive data (API keys)
- Encryption key stored in environment variables
- Separate initialization vectors (IV) for each encrypted value

**Logging**
- Custom logger utility (`lib/logger.ts`) with context support
- Different log levels (INFO, DEBUG, ERROR, WARN)
- Debug logs only in development environment

**SEO Optimization**
- Dynamic sitemap generation at `/sitemap.ts`
- Robots.txt configuration at `/robots.ts`
- Meta tags and Open Graph support in layout
- Per-page and per-post metadata customization

### Deployment Considerations

**Environment Variables Required**
- Database connection string (PostgreSQL)
- Firebase credentials (6 keys for web app configuration)
- Encryption key for sensitive data
- Paddle credentials (vendor ID, API key, public key)
- OpenRouter API configuration (optional)
- Application URLs for various environments

**Performance Features**
- Image optimization through Next.js Image component
- WebP and AVIF format support
- SWC minification enabled
- React strict mode for development

**Hosting Compatibility**
- Designed for Replit deployment (dev server runs on port 5000 with 0.0.0.0 binding)
- Compatible with Vercel and other Next.js hosting platforms
- Static asset serving through public directory