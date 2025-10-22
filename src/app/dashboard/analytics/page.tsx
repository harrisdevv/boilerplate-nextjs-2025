'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { hasLifetimeAccess } from '@/lib/auth'
import { useEffect, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share,
  BarChart3,
  Calendar,
  Users,
  Lock,
  AlertTriangle
} from 'lucide-react'
import { PricingSection } from '@/components/landing/pricing-section'

// Fake analytics data
const fakeAnalyticsData = {
  overview: {
    totalViews: 125430,
    totalLikes: 8920,
    totalComments: 1240,
    totalShares: 890,
    viewsChange: 12.5,
    likesChange: -3.2,
    commentsChange: 8.7,
    sharesChange: 15.3
  },
  topPosts: [
    { id: 1, title: 'Social Media Marketing Tips', platform: 'LinkedIn', views: 12500, likes: 890, comments: 45, shares: 67 },
    { id: 2, title: 'AI Content Creation Guide', platform: 'Twitter', views: 8900, likes: 567, comments: 23, shares: 34 },
    { id: 3, title: 'Behind the Scenes Video', platform: 'Instagram', views: 7800, likes: 1200, comments: 89, shares: 45 },
    { id: 4, title: 'Weekly Newsletter', platform: 'LinkedIn', views: 6700, likes: 234, comments: 12, shares: 23 },
  ],
  platformStats: [
    { platform: 'LinkedIn', posts: 45, views: 45600, engagement: 8.9, color: 'bg-blue-500' },
    { platform: 'Twitter', posts: 89, views: 34200, engagement: 6.7, color: 'bg-sky-500' },
    { platform: 'Instagram', posts: 67, views: 28900, engagement: 12.3, color: 'bg-pink-500' },
    { platform: 'Facebook', posts: 34, views: 16700, engagement: 4.2, color: 'bg-blue-600' },
  ]
}

export default function AnalyticsPage() {
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

    // Re-check access periodically to catch updates from other tabs/windows
    const interval = setInterval(checkAccess, 2000)

    return () => clearInterval(interval)
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
                To access analytics and all features, you need to purchase lifetime access.
                This is a one-time payment that gives you unlimited access forever.
              </p>
            </div>

            {/* Pricing Section */}
            <div className="max-w-4xl mx-auto">
              <PricingSection />
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
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Track your content performance and engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeAnalyticsData.overview.totalViews.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {fakeAnalyticsData.overview.viewsChange > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={fakeAnalyticsData.overview.viewsChange > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(fakeAnalyticsData.overview.viewsChange)}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeAnalyticsData.overview.totalLikes.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {fakeAnalyticsData.overview.likesChange > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={fakeAnalyticsData.overview.likesChange > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(fakeAnalyticsData.overview.likesChange)}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeAnalyticsData.overview.totalComments.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {fakeAnalyticsData.overview.commentsChange > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={fakeAnalyticsData.overview.commentsChange > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(fakeAnalyticsData.overview.commentsChange)}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shares</CardTitle>
              <Share className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeAnalyticsData.overview.totalShares.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-xs">
                {fakeAnalyticsData.overview.sharesChange > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={fakeAnalyticsData.overview.sharesChange > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(fakeAnalyticsData.overview.sharesChange)}%
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Performing Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Your best content this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fakeAnalyticsData.topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{post.title}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.platform}</span>
                        <span>{post.views.toLocaleString()} views</span>
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Engagement by social platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fakeAnalyticsData.platformStats.map((platform) => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                        <span className="text-sm font-medium">{platform.platform}</span>
                      </div>
                      <Badge variant="outline">{platform.engagement}% engagement</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{platform.posts} posts</span>
                      <span>{platform.views.toLocaleString()} views</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${platform.color}`}
                        style={{ width: `${Math.min(platform.engagement * 8, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
    </ProtectedRoute>
  )
}

