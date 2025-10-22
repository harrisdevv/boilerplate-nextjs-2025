import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  } else {
    // For development/local testing, use default credentials
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  }
}

export const adminAuth = admin.auth()
export const adminFirestore = admin.firestore()

// Server-side token verification
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error('Token verification failed:', error)
    throw new Error('Invalid authentication token')
  }
}

// Get user data from Firebase Auth
export async function getUserFromToken(token: string) {
  const decodedToken = await verifyIdToken(token)
  return decodedToken
}

// Create or update user in database after Firebase auth
export async function syncUserWithDatabase(uid: string, userData: any) {
  try {
    const { prisma } = await import('@/lib/prisma')

    const existingUser = await prisma.user.findUnique({
      where: { id: uid },
    })

    if (!existingUser) {
      // Create new user
      await prisma.user.create({
        data: {
          id: uid,
          name: userData.name,
          email: userData.email,
          image: userData.picture,
          role: 'user',
        },
      })
    } else {
      // Update existing user
      await prisma.user.update({
        where: { id: uid },
        data: {
          name: userData.name,
          email: userData.email,
          image: userData.picture,
          updatedAt: new Date(),
        },
      })
    }
  } catch (error) {
    console.error('Error syncing user with database:', error)
    throw error
  }
}