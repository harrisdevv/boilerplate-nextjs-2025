import { PrismaClient, PaymentMode } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create site configuration
  const siteConfig = await prisma.siteConfig.upsert({
    where: { id: 'site-config' },
    update: {},
    create: {
      id: 'site-config',
      paymentMode: PaymentMode.LIFETIME,
      lifetimePrice: 49,
      monthlyPrice: 9,
      annualPrice: 90,
      siteName: process.env.NEXT_PUBLIC_APP_NAME || 'Your App Name',
      siteDescription: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'Your app description',
      siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com',
    },
  })

  console.log('✅ Site config created:', siteConfig)

  // Create sample blog categories
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'tutorials' },
      update: {},
      create: {
        name: 'Tutorials',
        slug: 'tutorials',
        description: 'Step-by-step guides and tutorials',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'updates' },
      update: {},
      create: {
        name: 'Updates',
        slug: 'updates',
        description: 'Product updates and announcements',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'guides' },
      update: {},
      create: {
        name: 'Guides',
        slug: 'guides',
        description: 'In-depth guides and best practices',
      },
    }),
  ])

  console.log('✅ Blog categories created:', categories.length)

  // Create sample blog tags
  const tags = await Promise.all([
    prisma.blogTag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: {
        name: 'Next.js',
        slug: 'nextjs',
      },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
      },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: {
        name: 'TypeScript',
        slug: 'typescript',
      },
    }),
  ])

  console.log('✅ Blog tags created:', tags.length)

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

