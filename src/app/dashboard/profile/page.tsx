'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Calendar,
  Edit,
  Crown,
  Shield,
  Activity
} from 'lucide-react'

// Simplified data for MVP
const fakeSubscriptionData = {
  paymentMode: 'LIFETIME',
  status: 'ACTIVE',
  purchaseDate: '2024-01-15',
  amount: 49,
  features: [
    'Unlimited content generation',
    'Business analysis tools',
    '30-day content planning',
    'AI-powered post creation',
    'Priority support'
  ]
}

export default function ProfilePage() {
  const { user } = useAuth()

  const userData = {
    name: user?.displayName || 'User',
    email: user?.email || '',
    avatar: user?.photoURL || null,
    role: 'USER',
    bio: 'Content marketing automation user',
    joinedDate: '2024-01-15',
    lastActive: new Date().toISOString(),
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
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Member since {new Date(userData.joinedDate).toLocaleDateString()}</span>
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
                  <span className="text-sm">{new Date(subscriptionData.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount Paid:</span>
                  <span className="text-sm font-semibold">${subscriptionData.amount}</span>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Included Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subscriptionData.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
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