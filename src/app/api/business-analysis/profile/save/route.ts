import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface BusinessProfileRequest {
  userId: string
  companyName: string
  industry: string
  website: string
  description: string
  targetAudience: string
  targetDemographics: string
  targetPsychographics: string
  brandVoice: string
  brandValues: string
  brandPersonality: string
  mainCompetitors: string
  marketPosition: string
  uniqueValue: string
}

export async function POST(request: NextRequest) {
  try {
    const data: BusinessProfileRequest = await request.json()

    // Validate required fields
    if (!data.userId || !data.companyName || !data.industry || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, companyName, industry, description' },
        { status: 400 }
      )
    }

    logger.info('Saving business profile', {
      context: 'profile-save-api',
      metadata: {
        userId: data.userId,
        companyName: data.companyName
      },
    })

    // Check if user already has a business profile
    const existingProfile = await prisma.businessProfile.findFirst({
      where: { userId: data.userId }
    })

    let businessProfile

    if (existingProfile) {
      // Update existing profile
      businessProfile = await prisma.businessProfile.update({
        where: { id: existingProfile.id },
        data: {
          companyName: data.companyName,
          industry: data.industry,
          website: data.website,
          description: data.description,
          targetAudience: data.targetAudience,
          targetDemographics: data.targetDemographics,
          targetPsychographics: data.targetPsychographics,
          brandVoice: data.brandVoice,
          brandValues: data.brandValues,
          brandPersonality: data.brandPersonality,
          mainCompetitors: data.mainCompetitors,
          marketPosition: data.marketPosition,
          uniqueValue: data.uniqueValue,
          updatedAt: new Date(),
        }
      })

      logger.info('Updated existing business profile', {
        context: 'profile-save-api',
        metadata: {
          userId: data.userId,
          profileId: existingProfile.id
        },
      })
    } else {
      // Create new profile
      businessProfile = await prisma.businessProfile.create({
        data: {
          userId: data.userId,
          companyName: data.companyName,
          industry: data.industry,
          website: data.website,
          description: data.description,
          targetAudience: data.targetAudience,
          targetDemographics: data.targetDemographics,
          targetPsychographics: data.targetPsychographics,
          brandVoice: data.brandVoice,
          brandValues: data.brandValues,
          brandPersonality: data.brandPersonality,
          mainCompetitors: data.mainCompetitors,
          marketPosition: data.marketPosition,
          uniqueValue: data.uniqueValue,
        }
      })

      logger.info('Created new business profile', {
        context: 'profile-save-api',
        metadata: {
          userId: data.userId,
          profileId: businessProfile.id
        },
      })
    }

    return NextResponse.json({
      success: true,
      businessProfile: {
        id: businessProfile.id,
        companyName: businessProfile.companyName,
        updatedAt: businessProfile.updatedAt,
      }
    })

  } catch (error) {
    logger.error('Failed to save business profile', error, {
      context: 'profile-save-api',
    })

    return NextResponse.json(
      { error: 'Failed to save business profile' },
      { status: 500 }
    )
  }
}