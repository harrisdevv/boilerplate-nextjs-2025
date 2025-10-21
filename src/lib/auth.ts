import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      logger.debug('Session callback', {
        context: 'auth',
        metadata: { userId: user.id },
      })

      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }

      return session
    },
    async signIn({ user, account, profile }) {
      logger.info('User sign in', {
        context: 'auth',
        metadata: { userId: user.id, provider: account?.provider },
      })

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
  debug: process.env.NODE_ENV === 'development',
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    role: string
  }
}

