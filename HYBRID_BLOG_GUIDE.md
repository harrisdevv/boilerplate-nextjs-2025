# Hybrid Blog System Guide

## 🎯 Overview

This boilerplate now features a **hybrid blog system** that combines:

- **📝 Markdown Files** - For static, SEO-optimized content
- **💾 Database Posts** - For dynamic, user-generated content

Both types of posts appear seamlessly in the same blog, giving you the best of both worlds!

## 🌟 Benefits

### Markdown Posts
- ✅ **Best SEO** - Static generation for optimal search rankings
- ✅ **Git Version Control** - Track changes to content over time
- ✅ **Developer-Friendly** - Write in markdown/MDX
- ✅ **Fast Performance** - Pre-rendered at build time
- ✅ **No Database Required** - Works even without DB connection

### Database Posts
- ✅ **Dynamic Content** - Update without rebuilding
- ✅ **User Management** - Multiple authors and roles
- ✅ **Analytics** - View counters, likes, comments
- ✅ **CMS Integration** - Non-technical editors can create content
- ✅ **Advanced Features** - Search, filtering, categorization

## 📁 Directory Structure

```
boilerplate/
├── content/blog/          # Markdown/MDX files go here
│   ├── welcome-to-hybrid-blog.md
│   └── seo-best-practices.md
├── src/
│   ├── app/blog/
│   │   ├── page.tsx       # Lists both markdown + database posts
│   │   └── [slug]/
│   │       └── page.tsx   # Renders either type based on slug
│   └── lib/
│       └── mdx.ts         # Markdown processing utilities
```

## 📝 Creating Markdown Posts

### Step 1: Create a New File

Create a file in `content/blog/your-post-name.md`:

```markdown
---
title: "Your Amazing Post Title"
description: "A brief description for SEO and preview"
date: "2025-10-21"
author: "Your Name"
authorImage: "/images/authors/you.jpg"  # Optional
coverImage: "/images/blog/cover.jpg"     # Optional
tags: ["nextjs", "tutorial", "seo"]
categories: ["Guides", "Tutorial"]

# SEO Fields (Optional but recommended)
metaTitle: "Custom SEO Title | Your Site"
metaDescription: "Custom meta description for search engines"
metaKeywords: "nextjs, blog, seo, tutorial"
ogImage: "/images/og/post.jpg"
---

# Your Content Here

Write your blog post content in **Markdown**!

## Features

- Supports all markdown syntax
- Code blocks with syntax highlighting
- Images, lists, tables
- Links and more!

\`\`\`javascript
// Code example
const hello = "world"
console.log(hello)
\`\`\`

> Blockquotes work too!
```

### Step 2: That's It!

The post is automatically:
- ✅ Parsed and rendered
- ✅ Added to blog listing
- ✅ SEO optimized
- ✅ Accessible at `/blog/your-post-name`

## 💾 Creating Database Posts

### Via Prisma Studio (Development)

```bash
npm run db:studio
```

1. Navigate to `BlogPost`
2. Click "Add Record"
3. Fill in fields:
   - **slug**: `my-database-post` (URL-friendly)
   - **title**: "My Database Post"
   - **content**: `<p>HTML content here</p>`
   - **status**: `PUBLISHED`
   - **authorId**: Select your user
   - Add tags, categories, images, etc.
4. Save

### Via Admin Interface (TODO)

You can build an admin interface using the Prisma models:

```typescript
// Example: Creating a post via API
const post = await prisma.blogPost.create({
  data: {
    slug: 'dynamic-post',
    title: 'My Dynamic Post',
    description: 'This post was created dynamically',
    content: '<p>HTML content</p>',
    status: 'PUBLISHED',
    authorId: userId,
    tags: {
      connect: [{ id: tagId1 }, { id: tagId2 }]
    }
  }
})
```

## 🔀 How the Hybrid System Works

### Priority Order

When a user visits `/blog/some-slug`, the system:

1. **Checks markdown files first** (faster, static)
2. **Falls back to database** if not found in markdown
3. **Shows 404** if not found anywhere

### Blog Listing

The `/blog` page automatically:
- ✅ Combines both markdown and database posts
- ✅ Sorts by date (newest first)
- ✅ Shows source badge (📝 MD or 💾 DB)
- ✅ Works even if database is offline (markdown only)

### Code Implementation

```typescript
// src/app/blog/[slug]/page.tsx (simplified)

export default async function BlogPost({ params }) {
  // Try markdown first
  const markdownPost = getMarkdownPostBySlug(params.slug)
  if (markdownPost) {
    return <MarkdownPostView post={markdownPost} />
  }
  
  // Fallback to database
  const dbPost = await prisma.blogPost.findUnique(...)
  if (dbPost) {
    return <DatabasePostView post={dbPost} />
  }
  
  // Not found
  notFound()
}
```

## 🎨 Styling & Customization

Both post types use the same beautiful styling with:

- Responsive design (mobile-first)
- Dark mode support
- Syntax highlighting for code
- Optimized images
- Reading time estimates (markdown only)
- View counters (database only)

### Customize Markdown Styling

Edit the prose classes in `/blog/[slug]/page.tsx`:

```tsx
<div className="prose prose-lg dark:prose-invert max-w-none">
  {/* Rendered markdown */}
</div>
```

Tailwind Typography handles the styling automatically!

## 📊 Use Cases

### Use Markdown For:

1. **Marketing Blog Posts**
   - Product announcements
   - Company updates
   - SEO-focused articles

2. **Documentation**
   - How-to guides
   - API documentation
   - Changelog

3. **Static Content**
   - About page
   - Privacy policy
   - Terms of service

### Use Database For:

1. **User-Generated Content**
   - Community posts
   - User stories
   - Reviews

2. **Dynamic Features**
   - Posts with comments
   - Posts with likes/reactions
   - Posts with analytics

3. **Collaborative Content**
   - Multi-author blogs
   - Content requiring approval workflow
   - Frequently updated content

## 🚀 Best Practices

### For Maximum SEO:

1. **Use markdown** for your main blog content
2. Add comprehensive frontmatter:
   ```yaml
   metaTitle: "Specific SEO Title | Brand"
   metaDescription: "Compelling 155-char description"
   metaKeywords: "targeted, keywords, here"
   ogImage: "/images/og/specific-image.jpg"
   ```
3. Include cover images (helps social sharing)
4. Use descriptive slugs (`seo-best-practices` not `post-1`)

### For Maximum Flexibility:

1. **Use database** for content that needs:
   - User interaction
   - Frequent updates
   - Analytics tracking
   - Dynamic features

2. Build an admin interface for content creators
3. Implement search and filtering
4. Add commenting system

## 🔧 Advanced Features

### MDX Support

Create `.mdx` files to embed React components:

```mdx
---
title: "Interactive Post"
---

# My Post

import { Button } from '@/components/ui/button'

This is regular markdown, but you can also use components:

<Button>Click Me!</Button>
```

### Syntax Highlighting

Code blocks automatically get syntax highlighting:

````markdown
```typescript
// TypeScript example
interface Post {
  title: string
  content: string
}
```
````

### Reading Time

Markdown posts automatically calculate reading time:

```typescript
// Displayed as "5 min read"
```

## 📈 Performance

### Markdown Posts:
- ⚡ Pre-rendered at build time
- ⚡ Served as static HTML
- ⚡ Lighthouse score: 100/100
- ⚡ No database queries needed

### Database Posts:
- 🔄 Rendered on request
- 🔄 Requires database connection
- 🔄 Enables dynamic features
- 🔄 Still fast with proper caching

## 🛠️ Troubleshooting

### "Post not found" for markdown files

1. Check file is in `content/blog/`
2. Check file ends with `.md` or `.mdx`
3. Verify frontmatter is valid YAML
4. Restart dev server

### Database posts not showing

1. Check database connection
2. Verify post status is `PUBLISHED`
3. Check slug is unique
4. Review logs for errors

### Both types showing same post

Posts prioritize markdown over database. If you have:
- `content/blog/my-post.md` 
- Database post with slug `my-post`

The markdown version will be shown. Use different slugs!

## 📚 Learn More

- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Ready to start blogging?** Create your first markdown post in `content/blog/` and see it live! 🚀

