'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface PDFUploadProps {
  onTextExtracted: (text: string, metadata: any) => void
  onError: (error: string) => void
}

interface PDFMetadata {
  fileName: string
  fileSize: number
  pages: number
  extractedAt: string
}

export function PDFUpload({ onTextExtracted, onError }: PDFUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [extractedText, setExtractedText] = useState<string>('')
  const [metadata, setMetadata] = useState<PDFMetadata | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setExtractedText('')
      setMetadata(null)
      handleFileUpload(uploadedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  })

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    setUploadProgress(0)

    try {
      // Get user token (you'll need to implement this based on your auth system)
      const token = localStorage.getItem('firebaseAuthToken') || ''

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process PDF')
      }

      const data = await response.json()
      setExtractedText(data.text)
      setMetadata(data.metadata)
      setUploadProgress(100)

      // Callback to parent component
      onTextExtracted(data.text, data.metadata)

    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to process PDF'
      onError(errorMessage)
      setFile(null)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const removeFile = () => {
    setFile(null)
    setExtractedText('')
    setMetadata(null)
    setUploadProgress(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {!file && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : isDragReject
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive
                    ? 'Drop your PDF file here'
                    : 'Upload your business document'
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop a PDF file, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 10MB • PDF format only
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Upload Progress */}
      {file && uploading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing PDF...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>

            {uploadProgress === 100 && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">PDF processed successfully!</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* File Information and Extracted Text Preview */}
      {file && !uploading && extractedText && metadata && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Document Information
            </CardTitle>
            <CardDescription>
              Your business document has been processed and is ready for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium">File Name</p>
                <p className="text-sm text-muted-foreground truncate">{metadata.fileName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">File Size</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(metadata.fileSize)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Pages</p>
                <p className="text-sm text-muted-foreground">{metadata.pages}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Extracted</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(metadata.extractedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Text Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Extracted Text Preview</p>
                <Badge variant="secondary">
                  {extractedText.length.toLocaleString()} characters
                </Badge>
              </div>
              <div className="p-3 bg-gray-50 rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {extractedText.substring(0, 500)}
                  {extractedText.length > 500 && '...'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(extractedText)
                }}
              >
                Copy Text
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {file && !uploading && !extractedText && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to process the PDF file. Please try uploading again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}