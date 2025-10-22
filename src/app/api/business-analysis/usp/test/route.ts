import { NextRequest, NextResponse } from 'next/server'
import { openrouter } from '@/lib/openrouter'
import { logger } from '@/lib/logger'

interface UspTestRequest {
  usp: string
  targetMarket: string
  problemSolved: string
}

export async function POST(request: NextRequest) {
  try {
    const { usp, targetMarket, problemSolved }: UspTestRequest = await request.json()

    // Validate input
    if (!usp || !targetMarket || !problemSolved) {
      return NextResponse.json(
        { error: 'USP, target market, and problem solved are required' },
        { status: 400 }
      )
    }

    logger.info('Testing USP effectiveness', {
      context: 'usp-test-api',
      metadata: {
        uspLength: usp.length,
        targetMarketLength: targetMarket.length,
      },
    })

    // Test USP effectiveness
    const testPrompt = `
As a marketing and branding expert, analyze the effectiveness of this USP:

USP: "${usp}"

Target Market: ${targetMarket}

Problem Solved: ${problemSolved}

Please provide a comprehensive analysis covering:

## 1. Clarity Score (1-10)
- How clear and understandable is the USP?
- Is the value proposition immediately obvious?
- Any confusing elements or jargon?

## 2. Relevance Score (1-10)
- How well does it address the target market's needs?
- Does it connect with their pain points?
- Is the language appropriate for the audience?

## 3. Differentiation Score (1-10)
- How unique is this USP compared to typical competitors?
- Does it clearly stand out in the market?
- Is the differentiator meaningful and valuable?

## 4. Credibility Score (1-10)
- How believable is this USP?
- Does it sound like something the business can actually deliver?
- Any claims that might be hard to substantiate?

## 5. Memorability Score (1-10)
- How easy is this USP to remember?
- Does it have a memorable hook or phrase?
- Will it stick in customers' minds?

## 6. Overall Effectiveness
- Total average score
- Key strengths of this USP
- Main areas for improvement
- Specific recommendations for optimization

## 7. Market Testing Suggestions
- How to test this USP with real customers
- A/B testing ideas
- Metrics to track

Format your response with clear headings and bullet points. Be specific and actionable in your recommendations.
`

    const response = await openrouter.createCompletion({
      model: 'anthropic/claude-3-haiku',
      messages: [
        {
          role: 'system',
          content: 'You are an expert marketing analyst with deep experience in testing and optimizing Unique Selling Propositions. Provide honest, constructive feedback that helps businesses improve their messaging.'
        },
        {
          role: 'user',
          content: testPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 2000,
    })

    const testResults = response.choices[0].message.content

    logger.info('USP testing completed successfully', {
      context: 'usp-test-api',
      metadata: {
        tokensUsed: response.usage.total_tokens,
      },
    })

    return NextResponse.json({
      testResults,
    })

  } catch (error) {
    logger.error('Failed to test USP', error, {
      context: 'usp-test-api',
    })

    return NextResponse.json(
      { error: 'Failed to test USP' },
      { status: 500 }
    )
  }
}