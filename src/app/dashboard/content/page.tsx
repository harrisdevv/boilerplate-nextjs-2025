'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { hasLifetimeAccess, getUserSubscription } from '@/lib/auth'
import { useEffect, useState } from 'react'
import {
  Plus,
  FileText,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Lock,
  AlertTriangle
} from 'lucide-react'
import { PricingSection } from '@/components/landing/pricing-section'

// Fake content data
const fakeContentData = {
  posts: [
    { 
      id: 1, 
      title: 'Social Media Marketing Tips for 2025', 
      platform: 'LinkedIn', 
      status: 'published', 
      publishedAt: '2025-01-20T10:00:00Z',
      views: 12500,
      engagement: 8.9
    },
    { 
      id: 2, 
      title: 'AI Content Creation Guide', 
      platform: 'Twitter', 
      status: 'scheduled', 
      scheduledFor: '2025-01-22T14:00:00Z',
      views: 0,
      engagement: 0
    },
    { 
      id: 3, 
      title: 'Behind the Scenes: Our Development Process', 
      platform: 'Instagram', 
      status: 'draft', 
      createdAt: '2025-01-19T16:30:00Z',
      views: 0,
      engagement: 0
    },
    { 
      id: 4, 
      title: 'Weekly Newsletter: Industry Updates', 
      platform: 'LinkedIn', 
      status: 'published', 
      publishedAt: '2025-01-18T09:00:00Z',
      views: 6700,
      engagement: 6.2
    },
    { 
      id: 5, 
      title: 'Product Launch Announcement', 
      platform: 'Twitter', 
      status: 'scheduled', 
      scheduledFor: '2025-01-23T11:00:00Z',
      views: 0,
      engagement: 0
    },
  ],
  stats: {
    totalPosts: 247,
    publishedPosts: 189,
    scheduledPosts: 23,
    draftPosts: 35
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'published':
      return 'bg-green-500'
    case 'scheduled':
      return 'bg-blue-500'
    case 'draft':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'LinkedIn':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'Twitter':
      return 'text-sky-600 bg-sky-50 border-sky-200'
    case 'Instagram':
      return 'text-pink-600 bg-pink-50 border-pink-200'
    case 'Facebook':
      return 'text-blue-700 bg-blue-50 border-blue-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function ContentPage() {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscriptionData, setSubscriptionData] = useState<{
    paymentMode: string
    status: string
  } | null>(null)

  const userData = {
    id: user?.uid || '',
    name: user?.displayName || 'User',
    email: user?.email || '',
    image: user?.photoURL || null,
    role: 'user'
  }

  useEffect(() => {
    const checkAccess = async () => {
      if (user?.uid) {
        try {
          const [access, subscription] = await Promise.all([
            hasLifetimeAccess(user.uid),
            getUserSubscription(user.uid)
          ])
          setHasAccess(access)
          setSubscriptionData(subscription)
        } catch (error) {
          console.error('Error checking access:', error)
          setHasAccess(false)
          setSubscriptionData(null)
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
                To access content management and all features, you need to purchase lifetime access.
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
            <h1 className="text-3xl font-bold tracking-tight">Content</h1>
            <p className="text-muted-foreground">Manage your posts and content calendar</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeContentData.stats.totalPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeContentData.stats.publishedPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeContentData.stats.scheduledPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeContentData.stats.draftPosts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Content List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest content across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fakeContentData.posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(post.status)}`} />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <Badge variant="outline" className={getPlatformColor(post.platform)}>
                        {post.platform}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {post.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {post.status === 'published' && post.publishedAt && (
                        <>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views.toLocaleString()} views</span>
                          </div>
                          <span>{post.engagement}% engagement</span>
                        </>
                      )}
                      
                      {post.status === 'scheduled' && post.scheduledFor && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Scheduled for {new Date(post.scheduledFor).toLocaleString()}</span>
                        </div>
                      )}
                      
                      {post.status === 'draft' && post.createdAt && (
                        <div className="flex items-center gap-1">
                          <Edit className="w-3 h-3" />
                          <span>Created {new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
    </ProtectedRoute>
  )
}

