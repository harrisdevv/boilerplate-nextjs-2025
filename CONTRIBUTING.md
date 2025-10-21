# Contributing to Next.js Production Boilerplate

Thank you for your interest in improving this boilerplate! This guide will help you understand how to contribute effectively.

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Code Style

This project uses:

- **TypeScript** for type safety
- **Prettier** for code formatting
- **ESLint** for code quality
- **Functional components** over class components
- **Named exports** for components

### Code Formatting

```bash
# Format all files
npm run format

# Check linting
npm run lint
```

### TypeScript Rules

- Use interfaces over types when possible
- Avoid `any` types
- Provide proper return types for functions
- Use optional chaining and nullish coalescing

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Interfaces
interface ComponentProps {
  title: string
  onAction?: () => void
}

// 3. Component
export function Component({ title, onAction }: ComponentProps) {
  // 4. State and hooks
  const [isOpen, setIsOpen] = useState(false)
  
  // 5. Handlers
  function handleClick() {
    setIsOpen(!isOpen)
    onAction?.()
  }
  
  // 6. Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}
```

## File Naming

- Components: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- Utilities: `kebab-case.ts` (e.g., `date-utils.ts`)
- Types: `kebab-case.type.ts` (e.g., `user.type.ts`)
- Tests: `kebab-case.test.ts` (e.g., `utils.test.ts`)

## Commit Messages

Use conventional commits:

```
feat: add user profile page
fix: resolve authentication bug
docs: update README with new features
style: format code with prettier
refactor: simplify database queries
test: add unit tests for utilities
chore: update dependencies
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm test` (if tests exist)
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Update CHANGELOG.md
7. Submit PR with clear description

## Adding New Features

### 1. Database Changes

```bash
# Edit prisma/schema.prisma
# Then push changes
npm run db:push

# Or create migration
npm run db:migrate
```

### 2. New API Route

```typescript
// src/app/api/your-route/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    logger.info('API endpoint called', { context: 'api-your-route' })
    
    // Your logic here
    const data = await prisma.yourModel.findMany()
    
    return NextResponse.json(data)
  } catch (error) {
    logger.error('API error', error, { context: 'api-your-route' })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 3. New UI Component

```bash
# Using shadcn CLI (recommended)
npx shadcn@latest add [component-name]

# Or create manually in src/components/ui/
```

### 4. New Page

```typescript
// src/app/your-page/page.tsx
import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description',
}

export default function YourPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Your content */}
      </main>
      <Footer />
    </div>
  )
}
```

## Testing

### Running Tests

```bash
# Unit tests (when implemented)
npm test

# E2E tests (when implemented)
npm run test:e2e

# Lighthouse tests
npm run lighthouse
```

### Writing Tests

```typescript
// Example test structure
import { describe, it, expect } from '@jest/globals'
import { yourFunction } from './your-file'

describe('yourFunction', () => {
  it('should do something', () => {
    const result = yourFunction('input')
    expect(result).toBe('expected output')
  })
  
  it('should handle edge cases', () => {
    expect(() => yourFunction(null)).toThrow()
  })
})
```

## Documentation

- Update README.md for major features
- Update QUICK_START.md for setup changes
- Update CHANGELOG.md for all changes
- Add JSDoc comments for complex functions
- Update inline comments for tricky logic

## Performance Guidelines

- Use React Server Components by default
- Add 'use client' only when necessary
- Optimize images with next/image
- Lazy load heavy components
- Use proper caching strategies
- Test with Lighthouse regularly

## Security Guidelines

- Never commit secrets or API keys
- Use environment variables
- Encrypt sensitive data
- Validate all inputs
- Sanitize user content
- Use parameterized queries (Prisma handles this)

## Questions?

- Check existing issues
- Read the documentation
- Ask in discussions

Thank you for contributing! 🎉

