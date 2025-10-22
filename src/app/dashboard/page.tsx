'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  FileText,
  Calendar,
  BarChart3,
  Zap,
  Crown,
  Plus,
  TrendingUp,
  Brain
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

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
            Generate Content Plan
          </Button>
        </div>

        {/* Main Action Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Comprehensive Analysis - New Feature */}
          <Card className="md:col-span-2 lg:col-span-1 border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI-Powered Analysis
              </CardTitle>
              <CardDescription>Upload your business documents and get complete analysis in one click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <a href="/dashboard/comprehensive-analysis">
                  <Brain className="w-4 h-4 mr-2" />
                  Comprehensive Analysis
                  <div className="ml-auto">
                    <div className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      NEW
                    </div>
                  </div>
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                📄 Upload PDF business documents<br/>
                🤖 AI-powered SWOT, USP & Business Profile<br/>
                ⚡ Get results in under 2 minutes
              </p>
            </CardContent>
          </Card>

          {/* Individual Business Analysis Tools */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Individual Tools</CardTitle>
              <CardDescription>Specific business analysis tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/swot">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  SWOT Analysis
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/usp">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  USP Generator
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/business-profile">
                  <Users className="w-4 h-4 mr-2" />
                  Business Profile
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Content Planning */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Content Planning</CardTitle>
              <CardDescription>Create your content strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/content-planner">
                  <Calendar className="w-4 h-4 mr-2" />
                  30-Day Content Plan
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/post-composer">
                  <FileText className="w-4 h-4 mr-2" />
                  Post Composer
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/dashboard/content-themes">
                  <Zap className="w-4 h-4 mr-2" />
                  Content Themes
                </a>
              </Button>
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
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to create your content strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="font-medium">Business Analysis</h3>
                <p className="text-sm text-muted-foreground">Complete your SWOT and USP analysis</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="font-medium">Content Themes</h3>
                <p className="text-sm text-muted-foreground">Define your content pillars</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="font-medium">Generate Plan</h3>
                <p className="text-sm text-muted-foreground">Create your 30-day content calendar</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold">4</span>
                </div>
                <h3 className="font-medium">Create Content</h3>
                <p className="text-sm text-muted-foreground">Generate and customize your posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
    </ProtectedRoute>
  )
}

