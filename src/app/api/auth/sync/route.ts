import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, syncUserWithDatabase } from '@/lib/firebase/admin-config'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 })
    }

    // Verify the token
    const decodedToken = await verifyIdToken(token)

    // Sync user data with database
    await syncUserWithDatabase(decodedToken.uid, {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth sync error:', error)
    return NextResponse.json(
      { error: 'Authentication sync failed' },
      { status: 401 }
    )
  }
}