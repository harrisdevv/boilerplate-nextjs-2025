import { auth } from '@/lib/firebase/config'
import { User } from 'firebase/auth'

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
