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
  Lightbulb,
  Target,
  Users,
  Zap,
  CheckCircle,
  Loader2,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react'

interface UspData {
  targetMarket: string
  problemSolved: string
  solutionOffered: string
  keyDifferentiator: string
  generatedUsps?: string
  selectedUsp?: string
  testResults?: string
}

interface UspOption {
  id: string
  text: string
  strengths: string[]
  weaknesses: string[]
  score: number
}

export default function UspGeneratorPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('input')
  const [uspData, setUspData] = useState<UspData>({
    targetMarket: '',
    problemSolved: '',
    solutionOffered: '',
    keyDifferentiator: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  const [generatedOptions, setGeneratedOptions] = useState<UspOption[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('')

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

  const handleInputChange = (field: keyof UspData, value: string) => {
    setUspData(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  const generateUSPs = async () => {
    setLoading(true)
    setErrors([])

    try {
      const response = await fetch('/api/business-analysis/usp/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetMarket: uspData.targetMarket,
          problemSolved: uspData.problemSolved,
          solutionOffered: uspData.solutionOffered,
          keyDifferentiator: uspData.keyDifferentiator,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate USPs')
      }

      const data = await response.json()
      setGeneratedOptions(data.options)
      setActiveTab('options')
    } catch (error) {
      setErrors(['Failed to generate USPs. Please try again.'])
      console.error('Error generating USPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateAndGenerate = () => {
    const newErrors: string[] = []

    if (!uspData.targetMarket.trim()) {
      newErrors.push('Please describe your target market')
    }
    if (!uspData.problemSolved.trim()) {
      newErrors.push('Please describe the problem you solve')
    }
    if (!uspData.solutionOffered.trim()) {
      newErrors.push('Please describe your solution')
    }
    if (!uspData.keyDifferentiator.trim()) {
      newErrors.push('Please describe what makes you different')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    generateUSPs()
  }

  const selectUsp = (option: UspOption) => {
    setSelectedOption(option.id)
    setUspData(prev => ({ ...prev, selectedUsp: option.text }))
  }

  const testSelectedUsp = async () => {
    if (!selectedOption) return

    setLoading(true)
    try {
      const response = await fetch('/api/business-analysis/usp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usp: generatedOptions.find(opt => opt.id === selectedOption)?.text,
          targetMarket: uspData.targetMarket,
          problemSolved: uspData.problemSolved,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to test USP')
      }

      const data = await response.json()
      setUspData(prev => ({ ...prev, testResults: data.testResults }))
      setActiveTab('testing')
    } catch (error) {
      setErrors(['Failed to test USP. Please try again.'])
      console.error('Error testing USP:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveUspAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/business-analysis/usp/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...uspData,
          userId: user?.uid,
          generatedUsps: JSON.stringify(generatedOptions),
          isCompleted: true
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save USP analysis')
      }

      setErrors([])
    } catch (error) {
      setErrors(['Failed to save USP analysis. Please try again.'])
      console.error('Error saving USP analysis:', error)
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
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">USP Generator</h1>
                <p className="text-muted-foreground">
                  Discover your Unique Selling Proposition
                </p>
              </div>
            </div>
            <Button
              onClick={saveUspAnalysis}
              disabled={loading || !uspData.selectedUsp}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Save USP
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="input">Input Details</TabsTrigger>
              <TabsTrigger value="options" disabled={generatedOptions.length === 0}>
                USP Options
              </TabsTrigger>
              <TabsTrigger value="testing" disabled={!uspData.testResults}>
                Testing Results
              </TabsTrigger>
              <TabsTrigger value="final" disabled={!uspData.selectedUsp}>
                Final USP
              </TabsTrigger>
            </TabsList>

            {/* Input Tab */}
            <TabsContent value="input" className="space-y-6">
              <div className="grid gap-6">
                {/* Target Market */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Users className="w-5 h-5" />
                      Target Market
                    </CardTitle>
                    <CardDescription>
                      Who are you trying to reach? Be specific about demographics, psychographics, and behaviors.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Small business owners aged 25-45 who struggle with social media marketing and have limited time but are tech-savvy..."
                      value={uspData.targetMarket}
                      onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Problem Solved */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Target className="w-5 h-5" />
                      Problem Solved
                    </CardTitle>
                    <CardDescription>
                      What specific pain points or challenges do you solve for your target market?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Business owners spend too much time creating content, don't know what to post, and struggle to maintain consistency..."
                      value={uspData.problemSolved}
                      onChange={(e) => handleInputChange('problemSolved', e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Solution Offered */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Zap className="w-5 h-5" />
                      Solution Offered
                    </CardTitle>
                    <CardDescription>
                      How do you solve these problems? What specific value do you provide?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., AI-powered content planning tool that generates 30 days of content in minutes, with platform-specific optimization and authenticity tracking..."
                      value={uspData.solutionOffered}
                      onChange={(e) => handleInputChange('solutionOffered', e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Key Differentiator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Star className="w-5 h-5" />
                      Key Differentiator
                    </CardTitle>
                    <CardDescription>
                      What makes you different from competitors? What's your secret sauce?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Unlike generic content tools, we analyze your business DNA through SWOT analysis, ensuring every post reflects your authentic voice and strategic goals..."
                      value={uspData.keyDifferentiator}
                      onChange={(e) => handleInputChange('keyDifferentiator', e.target.value)}
                      rows={3}
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
                    <Lightbulb className="w-4 h-4 mr-2" />
                  )}
                  Generate USP Options
                </Button>
              </div>
            </TabsContent>

            {/* Options Tab */}
            <TabsContent value="options" className="space-y-6">
              <div className="grid gap-4">
                {generatedOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      selectedOption === option.id
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => selectUsp(option)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {selectedOption === option.id && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            USP Option {option.id}
                            <Badge variant="outline">
                              Score: {option.score}/10
                            </Badge>
                          </CardTitle>
                        </div>
                        {selectedOption !== option.id && (
                          <Button variant="outline" size="sm">
                            Select
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-3">{option.text}</p>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-green-600 mb-1">Strengths:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {option.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-orange-600 mb-1">Considerations:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {option.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedOption && (
                <div className="flex justify-center">
                  <Button
                    onClick={testSelectedUsp}
                    disabled={loading}
                    size="lg"
                    className="px-8"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Test Selected USP
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Testing Results Tab */}
            <TabsContent value="testing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    USP Testing Results
                  </CardTitle>
                  <CardDescription>
                    Analysis of your selected USP against market standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {uspData.testResults ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm">
                        {uspData.testResults}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a USP option and run tests to see results here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {uspData.testResults && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setActiveTab('final')}
                    size="lg"
                    className="px-8"
                  >
                    View Final USP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Final USP Tab */}
            <TabsContent value="final" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Your Final USP
                  </CardTitle>
                  <CardDescription>
                    Your validated Unique Selling Proposition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {uspData.selectedUsp ? (
                    <div className="space-y-4">
                      <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                        <p className="text-lg font-medium text-center">
                          {uspData.selectedUsp}
                        </p>
                      </div>

                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          This USP has been tested and validated based on your target market and competitive landscape.
                        </p>
                        <div className="flex justify-center gap-2">
                          <Badge variant="secondary">Market Validated</Badge>
                          <Badge variant="secondary">Competitive Advantage</Badge>
                          <Badge variant="secondary">Authentic</Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Complete the USP generation process to see your final USP here.</p>
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