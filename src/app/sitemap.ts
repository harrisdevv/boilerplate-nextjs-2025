import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  let blogUrls: MetadataRoute.Sitemap = []

  try {
    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    blogUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    // Database not available during build - return basic sitemap
    console.log('Database not available for sitemap generation, using basic sitemap')
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}

