import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface UspSaveRequest {
  userId: string
  targetMarket: string
  problemSolved: string
  solutionOffered: string
  keyDifferentiator: string
  generatedUsps?: string
  selectedUsp?: string
  testResults?: string
  isCompleted: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: UspSaveRequest = await request.json()

    // Validate required fields
    if (!data.userId || !data.targetMarket || !data.problemSolved || !data.solutionOffered || !data.keyDifferentiator) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    logger.info('Saving USP analysis', {
      context: 'usp-save-api',
      metadata: { userId: data.userId },
    })

    // Check if user already has a USP analysis
    const existingUsp = await prisma.uspAnalysis.findFirst({
      where: { userId: data.userId }
    })

    let uspAnalysis

    if (existingUsp) {
      // Update existing analysis
      uspAnalysis = await prisma.uspAnalysis.update({
        where: { id: existingUsp.id },
        data: {
          targetMarket: data.targetMarket,
          problemSolved: data.problemSolved,
          solutionOffered: data.solutionOffered,
          keyDifferentiator: data.keyDifferentiator,
          generatedUsps: data.generatedUsps,
          selectedUsp: data.selectedUsp,
          testResults: data.testResults,
          isCompleted: data.isCompleted,
          updatedAt: new Date(),
        }
      })

      logger.info('Updated existing USP analysis', {
        context: 'usp-save-api',
        metadata: {
          userId: data.userId,
          uspId: existingUsp.id
        },
      })
    } else {
      // Create new analysis
      uspAnalysis = await prisma.uspAnalysis.create({
        data: {
          userId: data.userId,
          targetMarket: data.targetMarket,
          problemSolved: data.problemSolved,
          solutionOffered: data.solutionOffered,
          keyDifferentiator: data.keyDifferentiator,
          generatedUsps: data.generatedUsps,
          selectedUsp: data.selectedUsp,
          testResults: data.testResults,
          isCompleted: data.isCompleted,
        }
      })

      logger.info('Created new USP analysis', {
        context: 'usp-save-api',
        metadata: {
          userId: data.userId,
          uspId: uspAnalysis.id
        },
      })
    }

    return NextResponse.json({
      success: true,
      uspAnalysis: {
        id: uspAnalysis.id,
        isCompleted: uspAnalysis.isCompleted,
        updatedAt: uspAnalysis.updatedAt,
      }
    })

  } catch (error) {
    logger.error('Failed to save USP analysis', error, {
      context: 'usp-save-api',
    })

    return NextResponse.json(
      { error: 'Failed to save USP analysis' },
      { status: 500 }
    )
  }
}