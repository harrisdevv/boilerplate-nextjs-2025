/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Server Actions are enabled by default in Next.js 14
}

module.exports = nextConfig

