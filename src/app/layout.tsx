import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SEO_TITLE || 'Your App Name',
  description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'Your app description',
  keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS || 'nextjs, react, typescript',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: process.env.NEXT_PUBLIC_SEO_TITLE || 'Your App Name',
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'Your app description',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_SEO_TITLE || 'Your App Name',
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'Your app description',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

