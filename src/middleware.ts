import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow access to public routes
      const publicPaths = ['/', '/blog', '/auth/signin', '/api/auth']
      const isPublicPath = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))
      
      if (isPublicPath) return true
      
      // Require authentication for other routes
      return !!token
    },
  },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

