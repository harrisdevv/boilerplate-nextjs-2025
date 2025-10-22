'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PricingSection } from '@/components/landing/pricing-section'
import { hasLifetimeAccess } from '@/lib/auth'
import { useEffect, useState } from 'react'
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Clock,
  Zap,
  Crown,
  Plus,
  ArrowRight,
  Lock,
  AlertTriangle
} from 'lucide-react'

// Fake data for demonstration
const fakeDashboardData = {
  stats: {
    totalPosts: 247,
    scheduledPosts: 89,
    totalViews: 125430,
    engagement: 8.7,
    followers: 12450,
    weeklyGrowth: 12.5
  },
  recentActivity: [
    { id: 1, action: 'Created post', content: 'Social Media Marketing Tips', time: '2 hours ago', type: 'create' },
    { id: 2, action: 'Scheduled post', content: 'Weekly Newsletter', time: '4 hours ago', type: 'schedule' },
    { id: 3, action: 'Analytics report', content: 'Monthly Performance', time: '1 day ago', type: 'analytics' },
    { id: 4, action: 'Updated profile', content: 'Bio and links', time: '2 days ago', type: 'profile' },
  ],
  upcomingPosts: [
    { id: 1, title: 'Monday Motivation Quote', platform: 'Twitter', scheduledFor: '2025-01-22T09:00:00Z' },
    { id: 2, title: 'Product Feature Highlight', platform: 'LinkedIn', scheduledFor: '2025-01-22T14:00:00Z' },
    { id: 3, title: 'Behind the Scenes Video', platform: 'Instagram', scheduledFor: '2025-01-23T11:00:00Z' },
  ]
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  const userData = {
    id: user?.uid || '',
    name: user?.displayName || 'User',
    email: user?.email || '',
    image: user?.photoURL || null,
    role: 'user'
  }

  const subscriptionData = {
    paymentMode: 'LIFETIME',
    status: 'ACTIVE'
  }

  useEffect(() => {
    const checkAccess = async () => {
      if (user?.uid) {
        try {
          const access = await hasLifetimeAccess(user.uid)
          setHasAccess(access)
        } catch (error) {
          console.error('Error checking access:', error)
          setHasAccess(false)
        }
      }
      setLoading(false)
    }

    checkAccess()
  }, [user?.uid])

  // Check for payment success parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('payment') === 'success') {
        // Clear the URL parameter
        window.history.replaceState({}, '', window.location.pathname)
        // Force re-check access
        if (user?.uid) {
          hasLifetimeAccess(user.uid).then(setHasAccess)
        }
      }
    }
  }, [user?.uid])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!hasAccess) {
    return (
      <ProtectedRoute>
        <AppLayout user={userData} subscription={subscriptionData}>
          <div className="p-6 space-y-6">
            {/* Payment Required Header */}
            <div className="text-center space-y-4 py-12">
              <div className="flex items-center justify-center gap-2 text-destructive">
                <Lock className="w-8 h-8" />
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Payment Required</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                To access the full dashboard and all features, you need to purchase lifetime access.
                This is a one-time payment that gives you unlimited access forever.
              </p>
            </div>

            {/* Pricing Section */}
            <div className="max-w-4xl mx-auto">
              <PricingSection />
            </div>

            {/* Additional Info */}
            <div className="text-center space-y-4 py-8">
              <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Why Lifetime Access?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Full access to all dashboard features</li>
                  <li>• Unlimited content creation and management</li>
                  <li>• Priority support and updates</li>
                  <li>• No recurring fees or subscriptions</li>
                  <li>• 14-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AppLayout user={userData} subscription={subscriptionData}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.displayName || 'User'}</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeDashboardData.stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeDashboardData.stats.scheduledPosts}</div>
              <p className="text-xs text-muted-foreground">
                Next 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeDashboardData.stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{fakeDashboardData.stats.weeklyGrowth}% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeDashboardData.stats.engagement}%</div>
              <p className="text-xs text-muted-foreground">
                Above average
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fakeDashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.content}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                Subscription
              </CardTitle>
              <CardDescription>Your current plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan:</span>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      <Crown className="w-3 h-3 mr-1" />
                      {subscriptionData.paymentMode === 'LIFETIME' ? 'Lifetime' : 'Monthly'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="default" className="bg-green-500">
                      {subscriptionData.status}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">No active subscription</p>
                  <Button size="sm" asChild>
                    <a href="/#pricing">
                      <Zap className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Upcoming Posts
              </CardTitle>
              <CardDescription>Your scheduled content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fakeDashboardData.upcomingPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.platform}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.scheduledFor).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/content">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Content
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/settings">
                  <Users className="w-4 h-4 mr-2" />
                  Account Settings
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
    </ProtectedRoute>
  )
}

