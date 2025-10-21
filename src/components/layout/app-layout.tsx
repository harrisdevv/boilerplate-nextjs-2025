'use client'

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'

interface AppLayoutProps {
  children: ReactNode
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }
  subscription?: {
    paymentMode: string
    status: string
  } | null
}

export function AppLayout({ children, user, subscription }: AppLayoutProps) {
  console.log('AppLayout render:', { user, subscription })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} subscription={subscription} />
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

