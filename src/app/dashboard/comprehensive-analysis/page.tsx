'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { PDFUpload } from '@/components/ui/pdf-upload'
import { OneClickAnalysis } from '@/components/ui/one-click-analysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Brain,
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Star,
  Download,
  Eye,
  Loader2
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ComprehensiveAnalysisPage() {
  const { user } = useAuth()
  const [businessDocumentText, setBusinessDocumentText] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [documentMetadata, setDocumentMetadata] = useState(null)

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

  const handleTextExtracted = (text: string, metadata: any) => {
    setBusinessDocumentText(text)
    setDocumentMetadata(metadata)
    setErrors([])
  }

  const handleError = (error: string) => {
    setErrors([error])
  }

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results)
    setIsAnalyzing(false)
    setErrors([])
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(true)
    setAnalysisResults(null)
    setErrors([])
  }

  const clearErrors = () => {
    setErrors([])
  }

  return (
    <ProtectedRoute>
      <AppLayout user={userData} subscription={subscriptionData}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Comprehensive Analysis</h1>
                <p className="text-muted-foreground">
                  Upload your business documents and get complete AI-powered analysis
                </p>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Document</TabsTrigger>
              <TabsTrigger value="analysis" disabled={!businessDocumentText}>
                Run Analysis
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResults}>
                View Results
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* PDF Upload */}
                <div>
                  <PDFUpload
                    onTextExtracted={handleTextExtracted}
                    onError={handleError}
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        How It Works
                      </CardTitle>
                      <CardDescription>
                        Get comprehensive business analysis in 3 simple steps
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Upload Business Document</h4>
                            <p className="text-sm text-muted-foreground">
                              Upload your business plan, financial statements, market research, or any relevant business documents in PDF format.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Provide Business Details</h4>
                            <p className="text-sm text-muted-foreground">
                              Enter your company name and industry to help our AI understand your business context.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Get Comprehensive Analysis</h4>
                            <p className="text-sm text-muted-foreground">
                              Our AI will perform SWOT analysis, generate USPs, and create a detailed business profile based on your documents.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Recommended Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Business plans and executive summaries</li>
                        <li>• Market research and competitor analysis</li>
                        <li>• Financial statements and projections</li>
                        <li>• Marketing materials and brochures</li>
                        <li>• Customer feedback and testimonials</li>
                        <li>• Product or service descriptions</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {businessDocumentText && (
                <div className="flex justify-center">
                  <Button onClick={() => clearErrors()} className="px-8">
                    Proceed to Analysis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <OneClickAnalysis
                businessDocumentText={businessDocumentText}
                onAnalysisComplete={handleAnalysisComplete}
                onAnalysisStart={handleAnalysisStart}
                onError={handleError}
              />

              {businessDocumentText && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Document Preview
                    </CardTitle>
                    <CardDescription>
                      Your uploaded document that will be analyzed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-50 rounded-md max-h-48 overflow-y-auto">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {businessDocumentText.substring(0, 1000)}
                        {businessDocumentText.length > 1000 && '...'}
                      </p>
                    </div>
                    {documentMetadata && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        Source: {documentMetadata.fileName} • {documentMetadata.pages} pages •
                        Extracted {new Date(documentMetadata.extractedAt).toLocaleString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {analysisResults ? (
                <div className="grid gap-6">
                  {/* SWOT Analysis Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        SWOT Analysis Results
                      </CardTitle>
                      <CardDescription>
                        Strategic analysis of your business strengths, weaknesses, opportunities, and threats
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm">
                          {analysisResults.swotAnalysis?.aiInsights || 'SWOT analysis generated successfully'}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="/dashboard/swot">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Analysis
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* USP Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        USP Generation Results
                      </CardTitle>
                      <CardDescription>
                        Your unique selling propositions and competitive advantages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Recommended USP</h4>
                          <p className="text-sm text-green-700">
                            {analysisResults.uspAnalysis?.selectedUsp || 'USP generated successfully'}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <strong>Validation Results:</strong> Market-tested and optimized for your target audience
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="/dashboard/usp">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full USP Analysis
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Profile Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        Business Profile Results
                      </CardTitle>
                      <CardDescription>
                        Comprehensive business profile and brand personality analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm">
                          {analysisResults.businessProfile?.aiGeneratedProfile || 'Business profile generated successfully'}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="/dashboard/business-profile">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Profile
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                          </div>
                          <h4 className="font-medium">Refine SWOT</h4>
                          <p className="text-sm text-muted-foreground">
                            Fine-tune your SWOT analysis with additional insights
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/dashboard/swot">Edit SWOT</a>
                          </Button>
                        </div>

                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                          <h4 className="font-medium">Test USP</h4>
                          <p className="text-sm text-muted-foreground">
                            Test different USP variations and get market feedback
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/dashboard/usp">Test USP</a>
                          </Button>
                        </div>

                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-6 h-6 text-purple-600" />
                          </div>
                          <h4 className="font-medium">Complete Profile</h4>
                          <p className="text-sm text-muted-foreground">
                            Add more details to your business profile
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/dashboard/business-profile">Edit Profile</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : isAnalyzing ? (
                // Loading Skeleton
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <Skeleton className="h-6 w-48" />
                      </div>
                      <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex gap-2 mt-4">
                          <Skeleton className="h-8 w-32" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <Skeleton className="h-6 w-40" />
                      </div>
                      <Skeleton className="h-4 w-60" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2 mt-4">
                          <Skeleton className="h-8 w-28" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        <Skeleton className="h-6 w-44" />
                      </div>
                      <Skeleton className="h-4 w-72" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex gap-2 mt-4">
                          <Skeleton className="h-8 w-30" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      Your comprehensive analysis is being generated...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Results Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete the analysis to see your comprehensive business insights here.
                  </p>
                  <Button onClick={() => clearErrors()}>
                    Start Analysis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}