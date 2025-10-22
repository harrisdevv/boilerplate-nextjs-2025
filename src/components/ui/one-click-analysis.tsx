'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Brain,
  TrendingUp,
  BarChart3,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
  Play,
  Clock,
  Zap,
  FileText,
  Sparkles
} from 'lucide-react'

interface AnalysisStep {
  id: string
  name: string
  icon: any
  status: 'pending' | 'running' | 'completed' | 'error'
  estimatedTime: number // in seconds
  description: string
  currentTask?: string
  result?: any
}

interface OneClickAnalysisProps {
  businessDocumentText: string
  onAnalysisComplete: (results: any) => void
  onAnalysisStart: () => void
  onError: (error: string) => void
}

export function OneClickAnalysis({ businessDocumentText, onAnalysisComplete, onAnalysisStart, onError }: OneClickAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(0)

  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'swot',
      name: 'SWOT Analysis',
      icon: BarChart3,
      status: 'pending',
      estimatedTime: 30,
      description: 'Analyzing strengths, weaknesses, opportunities, and threats',
      currentTask: ''
    },
    {
      id: 'usp',
      name: 'USP Generator',
      icon: TrendingUp,
      status: 'pending',
      estimatedTime: 35,
      description: 'Creating unique selling propositions and value propositions',
      currentTask: ''
    },
    {
      id: 'profile',
      name: 'Business Profile',
      icon: Users,
      status: 'pending',
      estimatedTime: 40,
      description: 'Building comprehensive business profile and brand personality',
      currentTask: ''
    }
  ])

  const totalEstimatedTime = steps.reduce((sum, step) => sum + step.estimatedTime, 0)

  const updateStepStatus = (stepId: string, status: AnalysisStep['status'], currentTask?: string) => {
    setSteps(prev => prev.map(step =>
      step.id === stepId ? { ...step, status, currentTask: currentTask || step.currentTask } : step
    ))
  }

  const updateStepTask = (stepId: string, currentTask: string) => {
    setSteps(prev => prev.map(step =>
      step.id === stepId ? { ...step, currentTask } : step
    ))
  }

  const simulateProgress = () => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 2
      if (currentProgress >= 100) {
        clearInterval(interval)
        return
      }
      setProgress(currentProgress)

      // Calculate estimated time left
      const totalSteps = steps.length
      const completedSteps = Math.floor((currentProgress / 100) * totalSteps)
      const remainingTime = totalEstimatedTime - (completedSteps * 30) // Rough estimate
      setEstimatedTimeLeft(Math.max(0, remainingTime))
    }, 200)

    return interval
  }

  const startAnalysis = async () => {
    if (!companyName.trim() || !industry.trim()) {
      onError('Please provide company name and industry')
      return
    }

    if (!businessDocumentText || businessDocumentText.length < 100) {
      onError('Please upload a business document first')
      return
    }

    onAnalysisStart()
    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep(0)
    setEstimatedTimeLeft(totalEstimatedTime)

    try {
      // Start progress simulation
      const progressInterval = simulateProgress()

      // Get user token
      const token = localStorage.getItem('firebaseAuthToken') || ''

      // Step 1: Start SWOT Analysis
      setCurrentStep(0)
      updateStepStatus('swot', 'running', 'Initializing SWOT analysis engine...')

      // Simulate detailed progress for SWOT
      setTimeout(() => updateStepTask('swot', 'Parsing business document structure...'), 2000)
      setTimeout(() => updateStepTask('swot', 'Identifying business strengths...'), 5000)
      setTimeout(() => updateStepTask('swot', 'Analyzing competitive weaknesses...'), 8000)
      setTimeout(() => updateStepTask('swot', 'Scanning market opportunities...'), 12000)
      setTimeout(() => updateStepTask('swot', 'Evaluating potential threats...'), 16000)
      setTimeout(() => updateStepTask('swot', 'Generating strategic recommendations...'), 20000)
      setTimeout(() => updateStepTask('swot', 'Finalizing SWOT analysis...'), 25000)

      // Step 2: Start USP Generation
      setTimeout(() => {
        updateStepStatus('swot', 'completed')
        setCurrentStep(1)
        updateStepStatus('usp', 'running', 'Analyzing market positioning...')

        // Simulate detailed progress for USP
        setTimeout(() => updateStepTask('usp', 'Identifying target audience segments...'), 2000)
        setTimeout(() => updateStepTask('usp', 'Analyzing customer pain points...'), 5000)
        setTimeout(() => updateStepTask('usp', 'Evaluating unique value propositions...'), 8000)
        setTimeout(() => updateStepTask('usp', 'Crafting compelling USP options...'), 12000)
        setTimeout(() => updateStepTask('usp', 'Testing USP effectiveness...'), 16000)
        setTimeout(() => updateStepTask('usp', 'Validating market fit...'), 20000)
        setTimeout(() => updateStepTask('usp', 'Finalizing USP recommendations...'), 28000)
        setTimeout(() => updateStepTask('usp', 'Completing USP analysis...'), 32000)
      }, steps[0].estimatedTime * 1000)

      // Step 3: Start Business Profile
      setTimeout(() => {
        updateStepStatus('usp', 'completed')
        setCurrentStep(2)
        updateStepStatus('profile', 'running', 'Building comprehensive business profile...')

        // Simulate detailed progress for Business Profile
        setTimeout(() => updateStepTask('profile', 'Extracting brand personality traits...'), 3000)
        setTimeout(() => updateStepTask('profile', 'Analyzing target demographics...'), 6000)
        setTimeout(() => updateStepTask('profile', 'Defining brand voice and tone...'), 10000)
        setTimeout(() => updateStepTask('profile', 'Mapping competitive landscape...'), 15000)
        setTimeout(() => updateStepTask('profile', 'Creating audience personas...'), 20000)
        setTimeout(() => updateStepTask('profile', 'Developing messaging framework...'), 25000)
        setTimeout(() => updateStepTask('profile', 'Generating strategic recommendations...'), 30000)
        setTimeout(() => updateStepTask('profile', 'Finalizing business profile...'), 35000)
      }, (steps[0].estimatedTime + steps[1].estimatedTime) * 1000)

      // Make API call
      const response = await fetch('/api/business-analysis/comprehensive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          businessDocumentText,
          companyName,
          industry
        })
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()

      // Mark all steps as completed
      updateStepStatus('profile', 'completed')
      setProgress(100)
      setEstimatedTimeLeft(0)

      // Update steps with results
      setSteps(prev => prev.map(step => ({
        ...step,
        status: 'completed' as const,
        result: data.results[step.id + 'Analysis'] || null
      })))

      setAnalysisResults(data.results)
      onAnalysisComplete(data.results)

    } catch (error) {
      console.error('Analysis error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed'

      // Mark current step as error
      if (currentStep < steps.length) {
        updateStepStatus(steps[currentStep].id, 'error')
      }

      onError(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setSteps(prev => prev.map(step => ({
      ...step,
      status: 'pending',
      currentTask: '',
      result: undefined
    })))
    setAnalysisResults(null)
    setProgress(0)
    setCurrentStep(0)
    setEstimatedTimeLeft(0)
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Business Analysis
          </CardTitle>
          <CardDescription>
            Get comprehensive SWOT analysis, USP generation, and business profile with a single click
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., Tech Solutions Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                placeholder="e.g., Software Development"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
          </div>

          {!businessDocumentText && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please upload a business document before starting the analysis.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-4">
            <Button
              onClick={startAnalysis}
              disabled={isAnalyzing || !companyName.trim() || !industry.trim() || !businessDocumentText}
              size="lg"
              className="px-8"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Comprehensive Analysis
                </>
              )}
            </Button>

            {isAnalyzing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Estimated time: {Math.ceil(estimatedTimeLeft / 60)}m {estimatedTimeLeft % 60}s
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Steps */}
      {(isAnalyzing || analysisResults) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Analysis Steps
            </CardTitle>
            <CardDescription>
              {isAnalyzing ? 'Processing your business document...' : 'Analysis completed successfully!'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep && isAnalyzing
                const isCompleted = step.status === 'completed'
                const isError = step.status === 'error'

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      isActive ? 'border-primary bg-primary/5' :
                      isCompleted ? 'border-green-200 bg-green-50' :
                      isError ? 'border-red-200 bg-red-50' :
                      'border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {step.status === 'pending' && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      {step.status === 'running' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                        </div>
                      )}
                      {step.status === 'completed' && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {step.status === 'error' && (
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{step.name}</h3>
                        <Badge
                          variant={isCompleted ? "default" : isActive ? "secondary" : "outline"}
                        >
                          {step.status === 'pending' && 'Waiting'}
                          {step.status === 'running' && 'Processing...'}
                          {step.status === 'completed' && 'Completed'}
                          {step.status === 'error' && 'Error'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                      {isActive && isAnalyzing && step.currentTask && (
                        <div className="mt-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                          <p className="text-xs text-primary font-medium">
                            {step.currentTask}
                          </p>
                        </div>
                      )}
                      {!isActive && isAnalyzing && step.status === 'pending' && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Waiting in queue...
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-xs text-muted-foreground">
                      ~{step.estimatedTime}s
                    </div>
                  </div>
                )
              })}
            </div>

            {analysisResults && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-green-600">Analysis Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      All business analyses have been generated successfully.
                    </p>
                  </div>
                  <Button onClick={resetAnalysis} variant="outline">
                    Run New Analysis
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}