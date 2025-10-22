import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyIdToken } from '@/lib/firebase/admin-config'

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

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get('token')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    // Redirect to sign-in for protected routes
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
  }

  try {
    // Verify the token
    const decodedToken = await verifyIdToken(token)

    // Add user info to headers for downstream use
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decodedToken.uid)
    requestHeaders.set('x-user-email', decodedToken.email || '')

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Token verification failed:', error)

    // Clear invalid token and redirect to sign-in
    const response = NextResponse.redirect(new URL('/auth/signin', request.url))
    response.cookies.delete('token')
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|_next/webpack-hmr).*)',
  ],
}
