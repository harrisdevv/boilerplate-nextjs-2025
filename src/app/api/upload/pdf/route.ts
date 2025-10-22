import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/firebase-admin'
import PDFParse from 'pdf-parse'

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decodedToken = await auth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse PDF
    const pdfData = await PDFParse(buffer)
    const extractedText = pdfData.text

    if (!extractedText || extractedText.trim().length < 100) {
      return NextResponse.json({
        error: 'PDF appears to be empty or contains very little text'
      }, { status: 400 })
    }

    // Return the extracted text
    return NextResponse.json({
      success: true,
      text: extractedText,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        pages: pdfData.numpages,
        extractedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('PDF parsing error:', error)
    return NextResponse.json({
      error: 'Failed to parse PDF file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}