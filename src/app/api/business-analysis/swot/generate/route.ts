import { NextRequest, NextResponse } from 'next/server'
import { openrouter } from '@/lib/openrouter'
import { logger } from '@/lib/logger'

interface SwotRequest {
  strengths: string
  weaknesses: string
  opportunities: string
  threats: string
}

export async function POST(request: NextRequest) {
  try {
    const { strengths, weaknesses, opportunities, threats }: SwotRequest = await request.json()

    // Validate input
    if (!strengths || !weaknesses || !opportunities || !threats) {
      return NextResponse.json(
        { error: 'All SWOT fields are required' },
        { status: 400 }
      )
    }

    logger.info('Generating SWOT analysis insights', {
      context: 'swot-api',
      metadata: {
        strengthsLength: strengths.length,
        weaknessesLength: weaknesses.length,
        opportunitiesLength: opportunities.length,
        threatsLength: threats.length,
      },
    })

    // Generate AI insights
    const insightsPrompt = `
As a strategic business analyst, analyze the following SWOT analysis and provide deep insights:

STRENGTHS:
${strengths}

WEAKNESSES:
${weaknesses}

OPPORTUNITIES:
${opportunities}

THREATS:
${threats}

Please provide comprehensive strategic insights covering:

1. **Strategic Position Analysis**:
   - Overall strategic position assessment
   - Key competitive advantages identified
   - Critical areas requiring immediate attention

2. **Pattern Recognition**:
   - Connections between different SWOT elements
   - How strengths can leverage opportunities
   - How weaknesses might be exacerbated by threats
   - Hidden synergies or conflicts

3. **Market Position Assessment**:
   - Where the business stands in its competitive landscape
   - Key differentiators and value propositions
   - Market gaps and opportunities for growth

4. **Risk Assessment**:
   - Highest priority risks to address
   - Risk mitigation strategies
   - Early warning signs to monitor

Provide specific, actionable insights that go beyond generic business advice. Focus on the unique aspects of this particular SWOT analysis.

Format your response as clear, well-structured paragraphs with bold headings for each section.
`

    const insightsResponse = await openrouter.createCompletion({
      model: 'anthropic/claude-3-haiku',
      messages: [
        {
          role: 'system',
          content: 'You are an expert strategic business analyst with deep expertise in SWOT analysis, competitive strategy, and market positioning. Provide specific, actionable insights based on the provided SWOT data.'
        },
        {
          role: 'user',
          content: insightsPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 1500,
    })

    // Generate recommendations
    const recommendationsPrompt = `
Based on the following SWOT analysis, create a detailed action plan with specific recommendations:

STRENGTHS:
${strengths}

WEAKNESSES:
${weaknesses}

OPPORTUNITIES:
${opportunities}

THREATS:
${threats}

Please provide a comprehensive action plan with:

1. **Immediate Actions (0-30 days)**:
   - 3-4 specific, actionable steps to take immediately
   - Focus on quick wins and addressing urgent issues

2. **Short-term Priorities (30-90 days)**:
   - Strategic initiatives to build momentum
   - Areas to develop or improve

3. **Long-term Strategy (90+ days)**:
   - Major strategic initiatives
   - Positioning for sustainable growth

4. **Resource Allocation**:
   - Where to focus time, money, and effort
   - Priority ranking of initiatives

5. **Success Metrics**:
   - How to measure progress for each recommendation
   - Key performance indicators to track

For each recommendation, include:
- Specific action steps
- Timeline/deadline
- Required resources
- Expected outcomes
- Success metrics

Make recommendations practical, specific, and aligned with the SWOT analysis findings.
`

    const recommendationsResponse = await openrouter.createCompletion({
      model: 'anthropic/claude-3-haiku',
      messages: [
        {
          role: 'system',
          content: 'You are an expert business strategist and implementation consultant. Create practical, actionable recommendations that businesses can actually implement based on their SWOT analysis.'
        },
        {
          role: 'user',
          content: recommendationsPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 2000,
    })

    const insights = insightsResponse.choices[0].message.content
    const recommendations = recommendationsResponse.choices[0].message.content

    logger.info('SWOT analysis generated successfully', {
      context: 'swot-api',
      metadata: {
        insightsTokens: insightsResponse.usage.total_tokens,
        recommendationsTokens: recommendationsResponse.usage.total_tokens,
        totalTokens: insightsResponse.usage.total_tokens + recommendationsResponse.usage.total_tokens,
      },
    })

    return NextResponse.json({
      insights,
      recommendations,
    })

  } catch (error) {
    logger.error('Failed to generate SWOT analysis', error, {
      context: 'swot-api',
    })

    return NextResponse.json(
      { error: 'Failed to generate SWOT analysis' },
      { status: 500 }
    )
  }
}