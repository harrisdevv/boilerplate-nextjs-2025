import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/mdx'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface BlogPost {
  slug: string
  title: string
  date: Date
}

async function getRecentBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get markdown posts
    const markdownPosts = getAllMarkdownPosts().slice(0, 5)
    
    // Try to get database posts
    let databasePosts: any[] = []
    try {
      databasePosts = await prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, title: true, publishedAt: true },
        orderBy: { publishedAt: 'desc' },
        take: 5
      })
    } catch (error) {
      logger.debug('Database not available for footer blog posts', { context: 'footer' })
    }

    // Combine and sort posts
    const allPosts: BlogPost[] = [
      ...markdownPosts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: new Date(post.date)
      })),
      ...databasePosts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: new Date(post.publishedAt || new Date())
      }))
    ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)

    return allPosts
  } catch (error) {
    logger.error('Error fetching blog posts for footer', error, { context: 'footer' })
    return []
  }
}

export async function Footer() {
  const currentYear = new Date().getFullYear()
  let recentPosts: BlogPost[] = []
  
  try {
    recentPosts = await getRecentBlogPosts()
  } catch (error) {
    logger.error('Error in Footer component', error, { context: 'footer' })
    // Continue with empty posts array
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Company Info & CTA */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary">
                YourApp
              </Link>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Transform your workflow in minutes. Save 10+ hours per week with intelligent automation.
              </p>
            </div>
            
            {/* Footer CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">🚀 Ready to get started?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Join 2,500+ users saving hours daily
              </p>
              <Link 
                href="#pricing"
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Get Lifetime Access →
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#story" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="mailto:support@yourapp.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Recent Blog Posts */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Recent Posts</h3>
            {recentPosts.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors line-clamp-2 leading-relaxed"
                      title={post.title}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    View All Posts
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} YourApp. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>GDPR</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

