import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAllMarkdownPosts } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { logger } from '@/lib/logger'

export const metadata: Metadata = {
  title: 'Blog - Your App',
  description: 'Read our latest articles and updates',
}

interface Post {
  slug: string
  title: string
  description: string | null
  publishedAt?: Date | null
  date?: string
  coverImage: string | null
  tags: Array<{ id: string; name: string }>
  source: 'database' | 'markdown'
}

export default async function BlogPage() {
  // Get markdown posts
  const markdownPosts = getAllMarkdownPosts()

  // Get database posts (with error handling)
  let databasePosts: any[] = []
  try {
    databasePosts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        author: true,
        tags: true,
        categories: true,
      },
    })
  } catch (error) {
    logger.warn('Database not available, showing markdown posts only', { 
      context: 'blog',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
    })
  }

  // Combine and sort all posts
  const allPosts: Post[] = [
    // Markdown posts
    ...markdownPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      coverImage: post.coverImage || null,
      tags: post.tags.map(tag => ({ id: tag, name: tag })),
      source: 'markdown' as const,
    })),
    // Database posts
    ...databasePosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.publishedAt?.toISOString() || new Date().toISOString(),
      coverImage: post.coverImage,
      tags: post.tags,
      source: 'database' as const,
    })),
  ].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, updates, and stories from our team
            </p>
            {markdownPosts.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                📝 {markdownPosts.length} markdown posts • 💾 {databasePosts.length} database posts
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              allPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow relative">
                    {/* Source badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.source === 'markdown' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {post.source === 'markdown' ? '📝 MD' : '💾 DB'}
                      </span>
                    </div>

                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {post.publishedAt 
                          ? formatDate(post.publishedAt)
                          : post.date 
                            ? formatDate(post.date)
                            : 'No date'
                        }
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
