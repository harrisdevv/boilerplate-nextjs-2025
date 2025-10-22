import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/signin',
    '/privacy',
    '/terms',
    '/blog',
    '/api/config',
  ]

  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // Allow public routes and API routes (they handle their own auth)
  if (isPublicRoute || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // For protected routes, check if token exists (full verification happens client-side and in API routes)
  const token = request.cookies.get('token')?.value

  if (!token) {
    // Redirect to sign-in for protected routes without token
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Token exists, allow through - actual verification happens via Firebase client SDK and API routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|_next/webpack-hmr).*)',
  ],
}
