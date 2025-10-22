import { NextRequest, NextResponse } from 'next/server'
import { openrouter } from '@/lib/openrouter'
import { logger } from '@/lib/logger'

interface ProfileSuggestionsRequest {
  companyName: string
  industry: string
  description: string
}

export async function POST(request: NextRequest) {
  try {
    const { companyName, industry, description }: ProfileSuggestionsRequest = await request.json()

    // Validate input
    if (!companyName || !industry || !description) {
      return NextResponse.json(
        { error: 'Company name, industry, and description are required' },
        { status: 400 }
      )
    }

    logger.info('Generating business profile suggestions', {
      context: 'profile-suggestions-api',
      metadata: {
        companyName,
        industry,
        descriptionLength: description.length,
      },
    })

    // Generate AI suggestions
    const suggestionsPrompt = `
As a brand strategist and marketing expert, analyze this business and provide suggestions for their business profile:

COMPANY NAME: ${companyName}
INDUSTRY: ${industry}
DESCRIPTION: ${description}

Based on this information, provide intelligent suggestions for the following sections:

## Target Audience
Suggest 2-3 specific target audience segments that would be most interested in this business. For each segment, include:
- Who they are (demographics)
- Why they would be interested
- Key pain points this business solves for them

## Brand Voice
Suggest a brand voice that would resonate with the target audience and reflect the business's values. Include:
- 3-4 adjectives describing the voice
- Examples of how this voice would sound in practice
- How this voice differentiates from competitors

## Brand Values
Suggest 3-5 core brand values that align with the business's mission and resonate with customers. For each value:
- The value name (e.g., "Innovation", "Integrity")
- Brief explanation of what it means in practice
- How it benefits customers

## Unique Value Proposition
Based on the business description, suggest a compelling unique value proposition that:
- Clearly communicates what makes this business special
- Addresses specific customer needs
- Differentiates from typical competitors in this industry
- Is authentic and believable

Format your response as JSON with this structure:
{
  "targetAudience": "Detailed description of ideal target audience segments...",
  "brandVoice": "Description of the recommended brand voice with examples...",
  "brandValues": "Description of 3-5 core brand values with explanations...",
  "uniqueValue": "Compelling unique value proposition statement..."
}

Be specific and actionable in your suggestions. Avoid generic advice and focus on what would work best for this particular business.
`

    const response = await openrouter.createCompletion({
      model: 'anthropic/claude-3-haiku',
      messages: [
        {
          role: 'system',
          content: 'You are an expert brand strategist and marketing consultant who helps businesses define their identity and connect with their ideal customers. Provide specific, actionable suggestions based on the business information provided.'
        },
        {
          role: 'user',
          content: suggestionsPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 1500,
    })

    const content = response.choices[0].message.content

    // Parse the JSON response
    let suggestions
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      logger.error('Failed to parse profile suggestions', parseError, {
        context: 'profile-suggestions-api',
        metadata: { rawResponse: content },
      })
      throw new Error('Failed to parse profile suggestions')
    }

    logger.info('Business profile suggestions generated successfully', {
      context: 'profile-suggestions-api',
      metadata: {
        tokensUsed: response.usage.total_tokens,
      },
    })

    return NextResponse.json(suggestions)

  } catch (error) {
    logger.error('Failed to generate business profile suggestions', error, {
      context: 'profile-suggestions-api',
    })

    return NextResponse.json(
      { error: 'Failed to generate business profile suggestions' },
      { status: 500 }
    )
  }
}