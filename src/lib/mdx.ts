import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { logger } from '@/lib/logger'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface MarkdownPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  authorImage?: string
  coverImage?: string
  tags: string[]
  categories: string[]
  content: string
  readingTime: string
  // SEO
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  ogImage?: string
  // Metadata
  source: 'markdown'
}

/**
 * Get all markdown posts from content/blog directory
 */
export function getAllMarkdownPosts(): MarkdownPost[] {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(contentDirectory)) {
      logger.warn('Content directory does not exist', { context: 'mdx' })
      return []
    }

    const fileNames = fs.readdirSync(contentDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, '')
        return getMarkdownPostBySlug(slug)
      })
      .filter((post): post is MarkdownPost => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    logger.debug(`Found ${allPostsData.length} markdown posts`, { context: 'mdx' })
    return allPostsData
  } catch (error) {
    logger.error('Error reading markdown posts', error, { context: 'mdx' })
    return []
  }
}

/**
 * Get a single markdown post by slug
 */
export function getMarkdownPostBySlug(slug: string): MarkdownPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    const mdxPath = path.join(contentDirectory, `${slug}.mdx`)

    let filePath: string
    if (fs.existsSync(fullPath)) {
      filePath = fullPath
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else {
      logger.debug(`Markdown file not found: ${slug}`, { context: 'mdx' })
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      authorImage: data.authorImage,
      coverImage: data.coverImage,
      tags: data.tags || [],
      categories: data.categories || [],
      content,
      readingTime: stats.text,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
      ogImage: data.ogImage,
      source: 'markdown',
    }
  } catch (error) {
    logger.error(`Error reading markdown post: ${slug}`, error, { context: 'mdx' })
    return null
  }
}

/**
 * Get all markdown post slugs
 */
export function getAllMarkdownPostSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(contentDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
  } catch (error) {
    logger.error('Error reading markdown slugs', error, { context: 'mdx' })
    return []
  }
}

