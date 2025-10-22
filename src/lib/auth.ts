import { auth } from '@/lib/firebase/config'
import { User } from 'firebase/auth'
import { prisma } from '@/lib/prisma'

export async function getServerSideUser(): Promise<User | null> {
  return auth.currentUser
}

export function requireAuth(user: User | null) {
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function getUserRole(user: User | null): Promise<string> {
  return 'user'
}

export async function getUserSubscription(userId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        paymentMode: true,
        status: true,
        lifetimePurchaseDate: true,
      },
    })

    return subscription
  } catch (error) {
    console.error('Error fetching user subscription:', error)
    return null
  }
}

export async function hasLifetimeAccess(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId)
  return subscription?.paymentMode === 'LIFETIME' && subscription?.status === 'ACTIVE'
}
