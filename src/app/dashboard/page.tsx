import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  ArrowRight
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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  }).catch(() => null)

  console.log('Dashboard render:', { session, subscription })

  // Use fake subscription data if none exists
  const subscriptionData = subscription || {
    paymentMode: 'LIFETIME',
    status: 'ACTIVE'
  }

  return (
    <AppLayout user={session.user} subscription={subscriptionData}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {session.user.name || 'User'}</p>
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
              {subscription ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan:</span>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      <Crown className="w-3 h-3 mr-1" />
                      {subscription.paymentMode === 'LIFETIME' ? 'Lifetime' : subscription.interval}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="default" className="bg-green-500">
                      {subscription.status}
                    </Badge>
                  </div>
                  {subscription.currentPeriodEnd && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Renews:</span>
                      <span className="text-sm">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                    </div>
                  )}
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
  )
}

