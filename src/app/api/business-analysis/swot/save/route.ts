import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface SwotSaveRequest {
  userId: string
  strengths: string
  weaknesses: string
  opportunities: string
  threats: string
  aiInsights?: string
  recommendations?: string
  isCompleted: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: SwotSaveRequest = await request.json()

    // Validate required fields
    if (!data.userId || !data.strengths || !data.weaknesses || !data.opportunities || !data.threats) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    logger.info('Saving SWOT analysis', {
      context: 'swot-save-api',
      metadata: { userId: data.userId },
    })

    // Check if user already has a SWOT analysis
    const existingSwot = await prisma.swotAnalysis.findFirst({
      where: { userId: data.userId }
    })

    let swotAnalysis

    if (existingSwot) {
      // Update existing analysis
      swotAnalysis = await prisma.swotAnalysis.update({
        where: { id: existingSwot.id },
        data: {
          strengths: data.strengths,
          weaknesses: data.weaknesses,
          opportunities: data.opportunities,
          threats: data.threats,
          insights: data.aiInsights,
          recommendations: data.recommendations,
          isCompleted: data.isCompleted,
          updatedAt: new Date(),
        }
      })

      logger.info('Updated existing SWOT analysis', {
        context: 'swot-save-api',
        metadata: {
          userId: data.userId,
          swotId: existingSwot.id
        },
      })
    } else {
      // Create new analysis
      swotAnalysis = await prisma.swotAnalysis.create({
        data: {
          userId: data.userId,
          strengths: data.strengths,
          weaknesses: data.weaknesses,
          opportunities: data.opportunities,
          threats: data.threats,
          insights: data.aiInsights,
          recommendations: data.recommendations,
          isCompleted: data.isCompleted,
        }
      })

      logger.info('Created new SWOT analysis', {
        context: 'swot-save-api',
        metadata: {
          userId: data.userId,
          swotId: swotAnalysis.id
        },
      })
    }

    return NextResponse.json({
      success: true,
      swotAnalysis: {
        id: swotAnalysis.id,
        isCompleted: swotAnalysis.isCompleted,
        updatedAt: swotAnalysis.updatedAt,
      }
    })

  } catch (error) {
    logger.error('Failed to save SWOT analysis', error, {
      context: 'swot-save-api',
    })

    return NextResponse.json(
      { error: 'Failed to save SWOT analysis' },
      { status: 500 }
    )
  }
}