---
title: "SEO Best Practices for Next.js 14"
description: "Complete guide to optimizing your Next.js application for search engines"
date: "2025-10-20"
author: "SEO Expert"
coverImage: "/images/blog/seo.jpg"
tags: ["seo", "nextjs", "optimization"]
categories: ["Guides", "SEO"]
metaTitle: "Next.js 14 SEO Best Practices - Complete Guide"
metaDescription: "Learn how to optimize your Next.js 14 app for search engines with metadata, sitemaps, and more"
metaKeywords: "nextjs seo, metadata, sitemap, robots.txt, open graph"
---

# SEO Best Practices for Next.js 14

Search Engine Optimization (SEO) is crucial for your website's visibility. Here's how to optimize your Next.js 14 application.

## 1. Metadata Configuration

Next.js 14 makes it easy to add metadata to your pages:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: 'keyword1, keyword2, keyword3',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
}
```

## 2. Dynamic Metadata

For dynamic pages, use `generateMetadata`:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.coverImage],
    },
  }
}
```

## 3. Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
```

## 4. Robots.txt

Create `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

## 5. Image Optimization

Always use Next.js Image component:

```jsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority // for above-the-fold images
/>
```

## 6. Semantic HTML

Use proper HTML5 semantic elements:

- `<header>` for page headers
- `<nav>` for navigation
- `<main>` for main content
- `<article>` for blog posts
- `<footer>` for footers

## 7. Performance Optimization

- ✅ Use Server Components by default
- ✅ Lazy load heavy components
- ✅ Optimize images (WebP, AVIF)
- ✅ Minimize JavaScript bundle
- ✅ Enable compression

## 8. Structured Data

Add JSON-LD structured data:

```typescript
export default function BlogPost({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* content */}
    </article>
  )
}
```

## 9. Mobile Responsiveness

Ensure your site is mobile-friendly:

- Use responsive design
- Test on multiple devices
- Optimize for touch interactions
- Fast mobile loading times

## 10. Lighthouse Testing

Run Lighthouse regularly:

```bash
npm run lighthouse
```

Aim for scores above 90 in all categories:
- Performance
- Accessibility
- Best Practices
- SEO

---

**Pro Tip**: This blog post is served from a markdown file, which gives it excellent SEO performance through static generation!

