'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  Settings,
  CreditCard,
  BarChart3,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Crown,
  Zap,
  Lock
} from 'lucide-react'
import { hasLifetimeAccess } from '@/lib/auth'
import { useAuth } from '@/lib/firebase/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SidebarProps {
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

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
]

export function Sidebar({ user, subscription }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const pathname = usePathname()
  const { user: authUser } = useAuth()

  const isLifetimeUser = subscription?.paymentMode === 'LIFETIME'
  const hasActiveSubscription = subscription?.status === 'ACTIVE'

  useEffect(() => {
    const checkAccess = async () => {
      if (authUser?.uid) {
        try {
          const access = await hasLifetimeAccess(authUser.uid)
          setHasAccess(access)
        } catch (error) {
          console.error('Error checking access in sidebar:', error)
          setHasAccess(false)
        }
      }
    }

    checkAccess()
  }, [authUser?.uid])

  console.log('Sidebar render:', { user, subscription, isLifetimeUser, hasActiveSubscription, hasAccess })

  return (
    <div className={cn(
      'flex flex-col h-screen bg-background border-r transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">SocialAI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* User Avatar Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={user.name || 'User'} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            {isLifetimeUser && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || 'guest@example.com'}
              </p>
              {isLifetimeUser && (
                <div className="flex items-center gap-1 mt-1">
                  <Crown className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-yellow-600 font-medium">Lifetime</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isLocked = !hasAccess && item.href !== '/dashboard'

          return (
            <div key={item.name} className="relative">
              <Link
                href={isLocked ? '#' : item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isLocked
                      ? 'text-muted-foreground/50 cursor-not-allowed opacity-50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                  collapsed && 'justify-center'
                )}
                onClick={isLocked ? (e) => e.preventDefault() : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span>{item.name}</span>
                    {isLocked && <Lock className="w-3 h-3 ml-auto text-muted-foreground/50" />}
                  </>
                )}
              </Link>
              {isLocked && !collapsed && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Upgrade to access this feature
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Upgrade CTA */}
      {hasAccess === false && !collapsed && (
        <div className="p-4 border-t">
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Payment Required</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to lifetime access to unlock all features
              </p>
              <Link href="/#pricing">
                <Button size="sm" className="w-full" variant="destructive">
                  Upgrade Now - $49
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">
            © 2025 SocialAI
          </div>
        )}
      </div>
    </div>
  )
}

