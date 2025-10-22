'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Loader2,
  BarChart3
} from 'lucide-react'

interface SwotData {
  strengths: string
  weaknesses: string
  opportunities: string
  threats: string
  aiInsights?: string
  recommendations?: string
}

export default function SwotAnalysisPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('input')
  const [swotData, setSwotData] = useState<SwotData>({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  })
  const [errors, setErrors] = useState<string[]>([])

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

  const handleInputChange = (field: keyof SwotData, value: string) => {
    setSwotData(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  const generateAIInsights = async () => {
    setLoading(true)
    setErrors([])

    try {
      const response = await fetch('/api/business-analysis/swot/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strengths: swotData.strengths,
          weaknesses: swotData.weaknesses,
          opportunities: swotData.opportunities,
          threats: swotData.threats,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI insights')
      }

      const data = await response.json()
      setSwotData(prev => ({
        ...prev,
        aiInsights: data.insights,
        recommendations: data.recommendations
      }))
      setActiveTab('insights')
    } catch (error) {
      setErrors(['Failed to generate AI insights. Please try again.'])
      console.error('Error generating AI insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateAndGenerate = () => {
    const newErrors: string[] = []

    if (!swotData.strengths.trim()) {
      newErrors.push('Please enter at least one strength')
    }
    if (!swotData.weaknesses.trim()) {
      newErrors.push('Please enter at least one weakness')
    }
    if (!swotData.opportunities.trim()) {
      newErrors.push('Please enter at least one opportunity')
    }
    if (!swotData.threats.trim()) {
      newErrors.push('Please enter at least one threat')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    generateAIInsights()
  }

  const saveSwotAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/business-analysis/swot/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...swotData,
          userId: user?.uid,
          isCompleted: true
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save SWOT analysis')
      }

      setErrors([])
      // Show success message or redirect
    } catch (error) {
      setErrors(['Failed to save SWOT analysis. Please try again.'])
      console.error('Error saving SWOT analysis:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <AppLayout user={userData} subscription={subscriptionData}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">SWOT Analysis</h1>
                <p className="text-muted-foreground">
                  Analyze your Strengths, Weaknesses, Opportunities, and Threats
                </p>
              </div>
            </div>
            <Button
              onClick={saveSwotAnalysis}
              disabled={loading || !swotData.aiInsights}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Save Analysis
            </Button>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input">Input SWOT</TabsTrigger>
              <TabsTrigger value="insights" disabled={!swotData.aiInsights}>
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="action" disabled={!swotData.recommendations}>
                Action Plan
              </TabsTrigger>
            </TabsList>

            {/* Input Tab */}
            <TabsContent value="input" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Target className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                    <CardDescription>
                      What are your internal advantages and capabilities?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Strong brand recognition, experienced team, proprietary technology..."
                      value={swotData.strengths}
                      onChange={(e) => handleInputChange('strengths', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Weaknesses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Weaknesses
                    </CardTitle>
                    <CardDescription>
                      What are your internal limitations and areas for improvement?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Limited budget, small team, lack of brand awareness..."
                      value={swotData.weaknesses}
                      onChange={(e) => handleInputChange('weaknesses', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-5 h-5" />
                      Opportunities
                    </CardTitle>
                    <CardDescription>
                      What external factors could help you succeed?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Growing market demand, new technology trends, competitor weaknesses..."
                      value={swotData.opportunities}
                      onChange={(e) => handleInputChange('opportunities', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Threats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                      Threats
                    </CardTitle>
                    <CardDescription>
                      What external factors could hinder your success?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Strong competition, market saturation, regulatory changes..."
                      value={swotData.threats}
                      onChange={(e) => handleInputChange('threats', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button
                  onClick={validateAndGenerate}
                  disabled={loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="w-4 h-4 mr-2" />
                  )}
                  Generate AI Insights
                </Button>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    AI-Generated Insights
                  </CardTitle>
                  <CardDescription>
                    Strategic analysis based on your SWOT inputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {swotData.aiInsights ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm">
                        {swotData.aiInsights}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Complete your SWOT analysis and generate insights to see strategic analysis here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Action Plan Tab */}
            <TabsContent value="action" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Recommendations & Action Plan
                  </CardTitle>
                  <CardDescription>
                    Specific actions to leverage your SWOT analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {swotData.recommendations ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm">
                        {swotData.recommendations}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generate insights to see personalized recommendations here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}