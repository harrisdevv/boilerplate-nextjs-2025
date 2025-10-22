'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Key, CheckCircle, AlertCircle } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export function ApiKeySetup() {
  const { user } = useAuth()
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      fetchApiKeys()
    }
  }, [user])

  const fetchApiKeys = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch(`/api/auth/apikey?userId=${user.uid}`)
      if (response.ok) {
        const data = await response.json()
        setApiKeys(data.apiKeys)
      } else {
        const error = await response.json()
        setError(error.error || 'Failed to fetch API keys')
      }
    } catch (err) {
      setError('Failed to fetch API keys')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !apiKey.trim()) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/apikey?userId=' + user.uid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          name: 'OpenRouter',
        }),
      })

      if (response.ok) {
        setSuccess('API key saved successfully!')
        setApiKey('')
        await fetchApiKeys()
      } else {
        const error = await response.json()
        setError(error.error || 'Failed to save API key')
      }
    } catch (err) {
      setError('Failed to save API key')
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Setup
          </CardTitle>
          <CardDescription>
            Please sign in to manage your API keys
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenRouter API Key Setup
        </CardTitle>
        <CardDescription>
          Configure your OpenRouter API key to enable AI-powered content generation.
          Your key is encrypted and stored securely.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current API Keys */}
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2">Loading API keys...</span>
          </div>
        ) : apiKeys.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current API Keys</h4>
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{key.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Updated {new Date(key.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No API key configured yet. Add your OpenRouter API key below to get started.
            </AlertDescription>
          </Alert>
        )}

        {/* Add/Update API Key Form */}
        <form onSubmit={handleSaveApiKey} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenRouter API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-or-v1-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenRouter Dashboard
              </a>
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={saving || !apiKey.trim()}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {apiKeys.length > 0 ? 'Update API Key' : 'Save API Key'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}