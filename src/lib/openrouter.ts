import { logger } from '@/lib/logger'
import { decrypt } from '@/lib/encryption'

interface OpenRouterConfig {
  apiKey: string
  baseUrl?: string
}

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface CompletionParams {
  model: string
  messages: Message[]
  temperature?: number
  maxTokens?: number
  topP?: number
}

interface CompletionResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class OpenRouterService {
  private baseUrl = 'https://openrouter.ai/api/v1'

  /**
   * Create a completion using OpenRouter
   * @param apiKey - User's encrypted API key info
   * @param params - Completion parameters
   */
  async createCompletion(
    encryptedKey: string,
    iv: string,
    params: CompletionParams
  ): Promise<CompletionResponse> {
    try {
      // Decrypt the API key
      const apiKey = decrypt(encryptedKey, iv)

      logger.debug('Creating OpenRouter completion', {
        context: 'openrouter',
        metadata: { model: params.model },
      })

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': process.env.NEXT_PUBLIC_APP_NAME || 'Your App',
        },
        body: JSON.stringify({
          model: params.model,
          messages: params.messages,
          temperature: params.temperature ?? 0.7,
          max_tokens: params.maxTokens ?? 1000,
          top_p: params.topP ?? 1,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        logger.error('OpenRouter API error', new Error(error), {
          context: 'openrouter',
          metadata: { status: response.status },
        })
        throw new Error(`OpenRouter API error: ${error}`)
      }

      const data = await response.json()

      logger.info('OpenRouter completion successful', {
        context: 'openrouter',
        metadata: {
          model: params.model,
          tokens: data.usage.total_tokens,
        },
      })

      return data
    } catch (error) {
      logger.error('OpenRouter completion failed', error, { context: 'openrouter' })
      throw error
    }
  }

  /**
   * Get available models from OpenRouter
   */
  async getModels(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch models')
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      logger.error('Failed to fetch OpenRouter models', error, { context: 'openrouter' })
      throw error
    }
  }

  /**
   * Recommended models for different use cases
   */
  getRecommendedModels() {
    return {
      planning: 'anthropic/claude-3-haiku', // Fast and cheap for planning
      writing: 'openai/gpt-4o-mini', // Good balance for content generation
      formatting: 'anthropic/claude-3-haiku', // Fast for formatting
      advanced: 'anthropic/claude-3.5-sonnet', // Best quality for complex tasks
    }
  }
}

export const openrouter = new OpenRouterService()

