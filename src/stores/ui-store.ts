import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Toast {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface Modal {
  id: string
  isOpen: boolean
  data?: unknown
}

interface UIState {
  // Theme
  theme: 'light' | 'dark'
  
  // Toasts
  toasts: Toast[]
  
  // Modals
  modals: Record<string, Modal>
  
  // Loading states
  isPageLoading: boolean
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  
  openModal: (id: string, data?: unknown) => void
  closeModal: (id: string) => void
  
  setPageLoading: (isLoading: boolean) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      theme: 'light',
      toasts: [],
      modals: {},
      isPageLoading: false,

      setTheme: (theme) => {
        set({ theme }, false, 'setTheme')
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        }
      },

      toggleTheme: () => {
        set(
          (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            if (typeof window !== 'undefined') {
              document.documentElement.classList.toggle('dark', newTheme === 'dark')
            }
            return { theme: newTheme }
          },
          false,
          'toggleTheme'
        )
      },

      addToast: (toast) => {
        const id = Math.random().toString(36).substring(7)
        set(
          (state) => ({
            toasts: [...state.toasts, { ...toast, id }],
          }),
          false,
          'addToast'
        )

        // Auto remove after 5 seconds
        setTimeout(() => {
          set(
            (state) => ({
              toasts: state.toasts.filter((t) => t.id !== id),
            }),
            false,
            'removeToast'
          )
        }, 5000)
      },

      removeToast: (id) => {
        set(
          (state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }),
          false,
          'removeToast'
        )
      },

      openModal: (id, data) => {
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [id]: { id, isOpen: true, data },
            },
          }),
          false,
          'openModal'
        )
      },

      closeModal: (id) => {
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [id]: { id, isOpen: false },
            },
          }),
          false,
          'closeModal'
        )
      },

      setPageLoading: (isPageLoading) => {
        set({ isPageLoading }, false, 'setPageLoading')
      },
    }),
    { name: 'UIStore' }
  )
)

