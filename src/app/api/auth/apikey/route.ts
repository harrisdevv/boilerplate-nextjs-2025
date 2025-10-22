import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/config'
import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/encryption'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    // For Firebase auth, we need to get the user from the request headers or use Firebase Admin SDK
    // Since we're using Firebase Auth, we'll need to verify the token
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    // For now, we'll use a simple approach - in production you'd verify the token
    // const decodedToken = await auth.verifyIdToken(idToken)
    // const userId = decodedToken.uid

    // Temporary: get userId from query param for testing
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Check if user has lifetime subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: userId },
    })

    if (!subscription || subscription.paymentMode !== 'LIFETIME') {
      return NextResponse.json(
        { error: 'Lifetime subscription required' },
        { status: 403 }
      )
    }

    // Get user's API keys
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId: userId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ apiKeys })
  } catch (error) {
    logger.error('Failed to get API keys', error, { context: 'apikey' })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // For Firebase auth, we need to get the user from the request headers or use Firebase Admin SDK
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    // Temporary: get userId from query param for testing
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Check if user has lifetime subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: userId },
    })

    if (!subscription || subscription.paymentMode !== 'LIFETIME') {
      return NextResponse.json(
        { error: 'Lifetime subscription required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { apiKey, name = 'OpenRouter' } = body

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    // Encrypt the API key
    const { encrypted, iv } = encrypt(apiKey)

    // Check if API key already exists for this user and name
    const existingKey = await prisma.apiKey.findFirst({
      where: {
        userId: userId,
        name,
        isActive: true,
      },
    })

    if (existingKey) {
      // Update existing key
      await prisma.apiKey.update({
        where: { id: existingKey.id },
        data: {
          encryptedKey: encrypted,
          iv,
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new API key
      await prisma.apiKey.create({
        data: {
          userId: userId,
          name,
          encryptedKey: encrypted,
          iv,
        },
      })
    }

    logger.info('API key saved successfully', {
      context: 'apikey',
      metadata: { userId: userId, name },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to save API key', error, { context: 'apikey' })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}