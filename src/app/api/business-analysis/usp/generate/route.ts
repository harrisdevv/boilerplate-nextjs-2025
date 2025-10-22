import { NextRequest, NextResponse } from 'next/server'
import { openrouter } from '@/lib/openrouter'
import { logger } from '@/lib/logger'

interface UspRequest {
  targetMarket: string
  problemSolved: string
  solutionOffered: string
  keyDifferentiator: string
}

export async function POST(request: NextRequest) {
  try {
    const { targetMarket, problemSolved, solutionOffered, keyDifferentiator }: UspRequest = await request.json()

    // Validate input
    if (!targetMarket || !problemSolved || !solutionOffered || !keyDifferentiator) {
      return NextResponse.json(
        { error: 'All USP fields are required' },
        { status: 400 }
      )
    }

    logger.info('Generating USP options', {
      context: 'usp-api',
      metadata: {
        targetMarketLength: targetMarket.length,
        problemSolvedLength: problemSolved.length,
        solutionOfferedLength: solutionOffered.length,
        keyDifferentiatorLength: keyDifferentiator.length,
      },
    })

    // Generate USP options
    const uspPrompt = `
As a expert brand strategist and copywriter, generate 5 compelling Unique Selling Proposition (USP) options based on the following business analysis:

TARGET MARKET:
${targetMarket}

PROBLEM SOLVED:
${problemSolved}

SOLUTION OFFERED:
${solutionOffered}

KEY DIFFERENTIATOR:
${keyDifferentiator}

Requirements for USP options:
1. Each USP should be concise (15-25 words)
2. Must clearly communicate unique value
3. Should resonate with the target market
4. Must be authentic and believable
5. Should differentiate from competitors
6. Focus on benefits, not just features

For each USP option, provide:
- The USP statement (clear, compelling, unique)
- 3-4 strengths (why it works well)
- 2-3 considerations or potential weaknesses
- A score from 1-10 for overall effectiveness

Format your response as a JSON array with this structure:
[
  {
    "id": "1",
    "text": "USP statement here",
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "weaknesses": ["consideration 1", "consideration 2"],
    "score": 8
  }
]

Make each USP distinct in approach - some may focus on simplicity, others on innovation, others on trust, etc.
`

    const response = await openrouter.createCompletion({
      model: 'anthropic/claude-3-haiku',
      messages: [
        {
          role: 'system',
          content: 'You are an expert brand strategist and copywriter specializing in crafting compelling Unique Selling Propositions. You understand how to create USPs that are clear, compelling, and differentiate businesses in crowded markets.'
        },
        {
          role: 'user',
          content: uspPrompt
        }
      ],
      temperature: 0.8,
      maxTokens: 2000,
    })

    const content = response.choices[0].message.content

    // Parse the JSON response
    let options
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        options = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      logger.error('Failed to parse USP options', parseError, {
        context: 'usp-api',
        metadata: { rawResponse: content },
      })
      throw new Error('Failed to parse USP options')
    }

    logger.info('USP options generated successfully', {
      context: 'usp-api',
      metadata: {
        optionsCount: options.length,
        tokensUsed: response.usage.total_tokens,
      },
    })

    return NextResponse.json({
      options,
    })

  } catch (error) {
    logger.error('Failed to generate USP options', error, {
      context: 'usp-api',
    })

    return NextResponse.json(
      { error: 'Failed to generate USP options' },
      { status: 500 }
    )
  }
}