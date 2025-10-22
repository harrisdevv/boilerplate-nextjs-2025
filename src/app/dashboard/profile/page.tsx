'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { ApiKeySetup } from '@/components/auth/api-key-setup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Globe, 
  Twitter, 
  Linkedin, 
  Github,
  Edit,
  Crown,
  Shield,
  Clock,
  Activity
} from 'lucide-react'

// Fake data for demonstration
const fakeUserData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: null,
  role: 'USER',
  bio: 'Digital marketing specialist passionate about social media automation and content creation. Helping businesses grow their online presence through strategic content planning.',
  location: 'San Francisco, CA',
  website: 'https://sarahjohnson.dev',
  twitter: '@sarahjohnson',
  linkedin: 'sarah-johnson-marketing',
  github: 'sarahjohnson',
  joinedDate: '2024-01-15',
  lastActive: '2025-01-21T10:30:00Z',
  timezone: 'PST (UTC-8)',
  language: 'English',
  stats: {
    postsCreated: 247,
    scheduledPosts: 89,
    totalViews: 125430,
    engagement: 8.7
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    marketingEmails: false
  }
}

const fakeSubscriptionData = {
  paymentMode: 'LIFETIME',
  status: 'ACTIVE',
  purchaseDate: '2024-01-15',
  amount: 49,
  features: [
    'Unlimited content generation',
    'Advanced analytics',
    'Priority support',
    'Custom branding',
    'API access',
    'Team collaboration'
  ]
}

export default function ProfilePage() {
  const { user } = useAuth()

  const userData = {
    ...fakeUserData,
    name: user?.displayName || fakeUserData.name,
    email: user?.email || fakeUserData.email,
    avatar: user?.photoURL || fakeUserData.avatar,
    role: 'user',
  }

  const subscriptionData = fakeSubscriptionData

  return (
    <ProtectedRoute>
    <AppLayout user={userData} subscription={subscriptionData}>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Avatar & Basic Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      {userData.avatar ? (
                        <img 
                          src={userData.avatar} 
                          alt={userData.name} 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    {subscriptionData.paymentMode === 'LIFETIME' && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-muted-foreground">{userData.email}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant={userData.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {userData.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                        {userData.role}
                      </Badge>
                      {subscriptionData.paymentMode === 'LIFETIME' && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          <Crown className="w-3 h-3 mr-1" />
                          Lifetime
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={userData.website} className="text-sm text-primary hover:underline">
                    {userData.website}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.timezone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.twitter}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.linkedin}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.github}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {userData.bio}
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Stats</CardTitle>
                <CardDescription>Your usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.postsCreated}</div>
                    <div className="text-xs text-muted-foreground">Posts Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.scheduledPosts}</div>
                    <div className="text-xs text-muted-foreground">Scheduled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.totalViews.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Subscription Details
                </CardTitle>
                <CardDescription>Your current plan and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Plan Type:</span>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                    <Crown className="w-3 h-3 mr-1" />
                    Lifetime Access
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default" className="bg-green-500">
                    <Activity className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Purchase Date:</span>
                  <span className="text-sm">{new Date(subscriptionData.purchaseDate || '2024-01-15').toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount Paid:</span>
                  <span className="text-sm font-semibold">${subscriptionData.amount || 49}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Included Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(subscriptionData.features || fakeSubscriptionData.features).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Key Setup - Only for Lifetime Users */}
            {subscriptionData.paymentMode === 'LIFETIME' && (
              <ApiKeySetup />
            )}

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Member Since:</span>
                  <span className="text-sm">{new Date(userData.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Active:</span>
                  <span className="text-sm">{new Date(userData.lastActive).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Language:</span>
                  <span className="text-sm">{userData.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time Zone:</span>
                  <span className="text-sm">{userData.timezone}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
    </ProtectedRoute>
  )
}