'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import { auth } from './config'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Store the ID token in cookies for server-side verification
        const token = await user.getIdToken()
        document.cookie = `token=${token}; path=/; max-age=3600; samesite=strict${process.env.NODE_ENV === 'production' ? '; secure' : ''}`

        // Sync user data with database
        try {
          const { syncUserWithDatabase } = await import('@/lib/firebase/admin-config')
          await syncUserWithDatabase(user.uid, {
            name: user.displayName,
            email: user.email,
            picture: user.photoURL,
          })
        } catch (error) {
          console.error('Error syncing user data:', error)
        }
      } else {
        // Clear token cookie when user signs out
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }

      setLoading(false)
    })

    getRedirectResult(auth).catch((error) => {
      console.error('Redirect sign-in error:', error)
    })

    return () => unsubscribe()
  }, [])

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      return await signInWithPopup(auth, provider)
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        return signInWithRedirect(auth, provider)
      }
      throw error
    }
  }

  const signOut = async () => {
    // Clear token cookie before signing out
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    return firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
