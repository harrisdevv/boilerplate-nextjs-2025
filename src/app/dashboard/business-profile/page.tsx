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
  Building,
  Users,
  Target,
  Palette,
  TrendingUp,
  CheckCircle,
  Loader2,
  Globe,
  Eye,
  Heart,
  Brain,
  Star
} from 'lucide-react'

interface BusinessProfileData {
  // Basic business info
  companyName: string
  industry: string
  website: string
  description: string

  // Target audience
  targetAudience: string
  targetDemographics: string
  targetPsychographics: string

  // Brand personality
  brandVoice: string
  brandValues: string
  brandPersonality: string

  // Competitive landscape
  mainCompetitors: string
  marketPosition: string
  uniqueValue: string
}

export default function BusinessProfilePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [profileData, setProfileData] = useState<BusinessProfileData>({
    companyName: '',
    industry: '',
    website: '',
    description: '',
    targetAudience: '',
    targetDemographics: '',
    targetPsychographics: '',
    brandVoice: '',
    brandValues: '',
    brandPersonality: '',
    mainCompetitors: '',
    marketPosition: '',
    uniqueValue: ''
  })

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

  const handleInputChange = (field: keyof BusinessProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
    setErrors([])
    setSaved(false)
  }

  const validateAndSave = async () => {
    const newErrors: string[] = []

    // Basic validation
    if (!profileData.companyName.trim()) {
      newErrors.push('Company name is required')
    }
    if (!profileData.industry.trim()) {
      newErrors.push('Industry is required')
    }
    if (!profileData.description.trim()) {
      newErrors.push('Business description is required')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    await saveProfile()
  }

  const saveProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/business-analysis/profile/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profileData,
          userId: user?.uid,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save business profile')
      }

      setSaved(true)
      setErrors([])

      // Clear success message after 3 seconds
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      setErrors(['Failed to save business profile. Please try again.'])
      console.error('Error saving business profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateProfileSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/business-analysis/profile/generate-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: profileData.companyName,
          industry: profileData.industry,
          description: profileData.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate suggestions')
      }

      const data = await response.json()

      // Update the profile with AI suggestions
      setProfileData(prev => ({
        ...prev,
        targetAudience: data.targetAudience || prev.targetAudience,
        brandVoice: data.brandVoice || prev.brandVoice,
        brandValues: data.brandValues || prev.brandValues,
        uniqueValue: data.uniqueValue || prev.uniqueValue,
      }))

      setSaved(false)
    } catch (error) {
      setErrors(['Failed to generate suggestions. Please try again.'])
      console.error('Error generating suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const isBasicInfoComplete = profileData.companyName && profileData.industry && profileData.description

  return (
    <ProtectedRoute>
      <AppLayout user={userData} subscription={subscriptionData}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Business Profile</h1>
                <p className="text-muted-foreground">
                  Define your business identity and brand personality
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isBasicInfoComplete && (
                <Button
                  variant="outline"
                  onClick={generateProfileSuggestions}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="w-4 h-4 mr-2" />
                  )}
                  AI Suggestions
                </Button>
              )}
              <Button
                onClick={validateAndSave}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Save Profile
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {saved && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Business profile saved successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <Target className="h-4 w-4" />
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="audience">Target Audience</TabsTrigger>
              <TabsTrigger value="brand">Brand Personality</TabsTrigger>
              <TabsTrigger value="competition">Competition</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Company Details
                    </CardTitle>
                    <CardDescription>
                      Basic information about your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Company Name *</label>
                      <Input
                        placeholder="e.g., Tech Solutions Inc."
                        value={profileData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Industry *</label>
                      <Input
                        placeholder="e.g., Software Development, Consulting, E-commerce"
                        value={profileData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Website</label>
                      <Input
                        placeholder="e.g., https://techsolutions.com"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Business Description
                    </CardTitle>
                    <CardDescription>
                      What does your business do and what makes it unique?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Describe your business, what you offer, your mission, and what makes you different from competitors..."
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Target Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Target className="w-5 h-5" />
                      Target Audience Overview
                    </CardTitle>
                    <CardDescription>
                      Who are your ideal customers? Be as specific as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Small business owners in the tech industry, aged 25-45, looking to streamline their operations and improve efficiency..."
                      value={profileData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Users className="w-5 h-5" />
                        Demographics
                      </CardTitle>
                      <CardDescription>
                        Age, location, income, education, family status, etc.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., Age 28-45, urban areas, $50k-150k income, college-educated, early adopters of technology..."
                        value={profileData.targetDemographics}
                        onChange={(e) => handleInputChange('targetDemographics', e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-600">
                        <Eye className="w-5 h-5" />
                        Psychographics
                      </CardTitle>
                      <CardDescription>
                        Values, interests, lifestyle, pain points, motivations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., Value efficiency and innovation, interested in business growth, frustrated with manual processes, motivated by ROI..."
                        value={profileData.targetPsychographics}
                        onChange={(e) => handleInputChange('targetPsychographics', e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Brand Personality Tab */}
            <TabsContent value="brand" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Palette className="w-5 h-5" />
                      Brand Voice
                    </CardTitle>
                    <CardDescription>
                      How does your brand sound when communicating?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Professional yet approachable, educational, confident, data-driven, slightly informal but authoritative..."
                      value={profileData.brandVoice}
                      onChange={(e) => handleInputChange('brandVoice', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Heart className="w-5 h-5" />
                      Brand Values
                    </CardTitle>
                    <CardDescription>
                      What principles guide your business decisions?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Innovation, customer success, integrity, continuous improvement, transparency..."
                      value={profileData.brandValues}
                      onChange={(e) => handleInputChange('brandValues', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-600">
                      <Brain className="w-5 h-5" />
                      Brand Personality
                    </CardTitle>
                    <CardDescription>
                      If your brand were a person, who would it be?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., The knowledgeable expert who's also a helpful mentor, innovative but practical, ahead of trends but grounded in reality..."
                      value={profileData.brandPersonality}
                      onChange={(e) => handleInputChange('brandPersonality', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Competition Tab */}
            <TabsContent value="competition" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <TrendingUp className="w-5 h-5" />
                      Main Competitors
                    </CardTitle>
                    <CardDescription>
                      Who are your primary competitors and what do they do well?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Competitor A: Strong in enterprise solutions but expensive. Competitor B: Cheap but limited features. Competitor C: Good UI but poor customer support..."
                      value={profileData.mainCompetitors}
                      onChange={(e) => handleInputChange('mainCompetitors', e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <Target className="w-5 h-5" />
                        Market Position
                      </CardTitle>
                      <CardDescription>
                        Where do you fit in the competitive landscape?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., Premium mid-market solution, more affordable than enterprise options but more powerful than basic tools..."
                        value={profileData.marketPosition}
                        onChange={(e) => handleInputChange('marketPosition', e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Star className="w-5 h-5" />
                        Unique Value
                      </CardTitle>
                      <CardDescription>
                        What makes you truly different from all competitors?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., Only solution that combines AI-powered automation with personalized human support, specifically designed for growing businesses..."
                        value={profileData.uniqueValue}
                        onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}