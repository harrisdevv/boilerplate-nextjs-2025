import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
}

interface Subscription {
  id: string
  paymentMode: string
  status: string
  interval?: string
  currentPeriodEnd?: Date
}

interface UserState {
  user: User | null
  subscription: Subscription | null
  isLoading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setSubscription: (subscription: Subscription | null) => void
  setLoading: (isLoading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        subscription: null,
        isLoading: false,

        setUser: (user) => {
          set({ user }, false, 'setUser')
        },

        setSubscription: (subscription) => {
          set({ subscription }, false, 'setSubscription')
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'setLoading')
        },

        clearUser: () => {
          set({ user: null, subscription: null }, false, 'clearUser')
        },
      }),
      {
        name: 'user-storage',
      }
    ),
    { name: 'UserStore' }
  )
)

