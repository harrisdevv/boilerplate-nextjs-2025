import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken } from '@/lib/firebase/admin-config'
import { hasLifetimeAccess } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 })
    }

    // Verify the token
    const decodedToken = await verifyIdToken(token)

    // Check payment status
    const hasAccess = await hasLifetimeAccess(decodedToken.uid)

    return NextResponse.json({
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      },
      hasLifetimeAccess: hasAccess,
    })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Authentication verification failed' },
      { status: 401 }
    )
  }
}