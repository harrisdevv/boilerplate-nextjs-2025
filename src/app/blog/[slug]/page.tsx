import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { prisma } from '@/lib/prisma'
import { getMarkdownPostBySlug, getAllMarkdownPostSlugs } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { logger } from '@/lib/logger'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // Generate params for markdown posts at build time
  const markdownSlugs = getAllMarkdownPostSlugs()
  return markdownSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Try markdown first
  const markdownPost = getMarkdownPostBySlug(params.slug)
  if (markdownPost) {
    return {
      title: markdownPost.metaTitle || markdownPost.title,
      description: markdownPost.metaDescription || markdownPost.description || undefined,
      keywords: markdownPost.metaKeywords || undefined,
      openGraph: {
        title: markdownPost.metaTitle || markdownPost.title,
        description: markdownPost.metaDescription || markdownPost.description || undefined,
        images: markdownPost.ogImage 
          ? [markdownPost.ogImage] 
          : markdownPost.coverImage 
            ? [markdownPost.coverImage] 
            : undefined,
        type: 'article',
        publishedTime: markdownPost.date,
      },
    }
  }

  // Try database
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    })

    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description || undefined,
      keywords: post.metaKeywords || undefined,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.description || undefined,
        images: post.ogImage ? [post.ogImage] : post.coverImage ? [post.coverImage] : undefined,
        type: 'article',
        publishedTime: post.publishedAt?.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
      },
    }
  } catch (error) {
    logger.error('Error generating metadata', error, { context: 'blog' })
    return {
      title: 'Post Not Found',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Try markdown first
  const markdownPost = getMarkdownPostBySlug(params.slug)
  
  if (markdownPost) {
    logger.info('Serving markdown post', {
      context: 'blog',
      metadata: { slug: params.slug, source: 'markdown' },
    })

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <article className="container py-12 max-w-4xl">
            {/* Source badge */}
            <div className="mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                📝 Markdown Post (Static)
              </span>
            </div>

            {markdownPost.coverImage && (
              <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                <img
                  src={markdownPost.coverImage}
                  alt={markdownPost.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                {markdownPost.categories.map((category) => (
                  <span
                    key={category}
                    className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                {markdownPost.title}
              </h1>

              {markdownPost.description && (
                <p className="text-xl text-muted-foreground mb-4">
                  {markdownPost.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {markdownPost.authorImage && (
                    <img
                      src={markdownPost.authorImage}
                      alt={markdownPost.author}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{markdownPost.author}</span>
                </div>
                <span>•</span>
                <span>{formatDate(markdownPost.date)}</span>
                <span>•</span>
                <span>{markdownPost.readingTime}</span>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote
                source={markdownPost.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
              />
            </div>

            {markdownPost.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {markdownPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
        <Footer />
      </div>
    )
  }

  // Fallback to database
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        author: true,
        tags: true,
        categories: true,
      },
    })

    if (!post || post.status !== 'PUBLISHED') {
      notFound()
    }

    logger.info('Serving database post', {
      context: 'blog',
      metadata: { slug: params.slug, source: 'database' },
    })

    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <article className="container py-12 max-w-4xl">
            {/* Source badge */}
            <div className="mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                💾 Database Post (Dynamic)
              </span>
            </div>

            {post.coverImage && (
              <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-muted-foreground mb-4">{post.description}</p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.name || 'Author'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
                <span>•</span>
                <span>{post.publishedAt && formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    logger.error('Error loading database post', error, { context: 'blog' })
    notFound()
  }
}
