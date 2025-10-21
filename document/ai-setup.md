# AI Integration with OpenRouter

Complete guide to setting up AI features using OpenRouter, building AI agents, and implementing intelligent workflows in your Next.js application.

## 📋 Table of Contents

- [Overview](#overview)
- [Why OpenRouter?](#why-openrouter)
- [Setup & Configuration](#setup--configuration)
- [Available Models](#available-models)
- [Basic Usage](#basic-usage)
- [Building AI Agents](#building-ai-agents)
- [Advanced Patterns](#advanced-patterns)
- [Cost Optimization](#cost-optimization)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This boilerplate uses **OpenRouter** for AI integration with a **BYOK (Bring Your Own Key)** model, where users provide their own API keys.

**Key Features:**
- ✅ Access to 100+ AI models via one API
- ✅ User-provided API keys (no proxy costs)
- ✅ Encrypted key storage (AES-256-GCM)
- ✅ Support for Claude, GPT-4, Gemini, and more
- ✅ Built-in logging and error handling
- ✅ Ready for AI agent implementation

## Why OpenRouter?

**OpenRouter** is a unified API for accessing multiple AI models:

**Advantages:**
- 🌐 **One API, Many Models**: Access Claude, GPT-4, Gemini, Llama, etc.
- 💰 **Cost-Effective**: Users pay for their own usage
- 🔒 **Secure**: API keys encrypted in your database
- 🚀 **No Vendor Lock-in**: Switch models easily
- 📊 **Usage Analytics**: Track costs and usage
- ⚡ **Fast Integration**: Simple REST API

**Supported Model Providers:**
- OpenAI (GPT-4, GPT-4o, GPT-3.5)
- Anthropic (Claude 3.5 Sonnet, Claude 3 Opus/Sonnet/Haiku)
- Google (Gemini Pro, Gemini Ultra)
- Meta (Llama 3, Llama 2)
- Mistral AI (Mistral Large, Medium, Small)
- And 100+ more models!

## Setup & Configuration

### Step 1: Get OpenRouter API Key

1. **Go to [OpenRouter.ai](https://openrouter.ai)**
2. Click **"Sign In"** → Sign in with Google or GitHub
3. Navigate to **"Keys"** in the dashboard
4. Click **"Create Key"**
5. Give it a name (e.g., "My App Development")
6. Copy the API key: `sk-or-v1-xxxxx`

> **Cost:** OpenRouter charges per token. Most models are very affordable:
> - Claude Haiku: ~$0.25 per 1M tokens
> - GPT-4o-mini: ~$0.15 per 1M tokens

### Step 2: Test Your API Key (Optional)

```bash
# Test with curl
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Step 3: Store API Key in Your App

The boilerplate encrypts user API keys before storing them.

**API Implementation Example:**

```typescript
// src/app/api/user/api-key/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { encrypt } from '@/lib/encryption'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { apiKey } = await req.json()
    
    // Validate API key format
    if (!apiKey || !apiKey.startsWith('sk-or-')) {
      return NextResponse.json({ error: 'Invalid OpenRouter API key' }, { status: 400 })
    }
    
    // Encrypt the API key
    const { encrypted, iv } = encrypt(apiKey)
    
    // Store in database
    await prisma.apiKey.upsert({
      where: {
        userId_name: {
          userId: session.user.id,
          name: 'OpenRouter',
        },
      },
      update: {
        encryptedKey: encrypted,
        iv: iv,
      },
      create: {
        userId: session.user.id,
        name: 'OpenRouter',
        encryptedKey: encrypted,
        iv: iv,
      },
    })
    
    logger.info('OpenRouter API key stored', {
      context: 'api-key',
      metadata: { userId: session.user.id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to store API key', error, { context: 'api-key' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Available Models

### Recommended Models by Use Case

The boilerplate includes recommended models in `src/lib/openrouter.ts`:

```typescript
export const recommendedModels = {
  planning: 'anthropic/claude-3-haiku',        // Fast, cheap for planning
  writing: 'openai/gpt-4o-mini',              // Balanced for content
  formatting: 'anthropic/claude-3-haiku',      // Fast formatting
  advanced: 'anthropic/claude-3.5-sonnet',    // Best quality, complex tasks
  coding: 'anthropic/claude-3.5-sonnet',      // Code generation
  chat: 'openai/gpt-4o-mini',                 // Conversational AI
}
```

### Model Comparison

| Model | Speed | Cost | Quality | Best For |
|-------|-------|------|---------|----------|
| **Claude 3.5 Sonnet** | ⚡⚡⚡ | 💰💰💰 | ⭐⭐⭐⭐⭐ | Complex reasoning, coding, analysis |
| **Claude 3 Opus** | ⚡⚡ | 💰💰💰💰 | ⭐⭐⭐⭐⭐ | Highest quality tasks |
| **Claude 3 Haiku** | ⚡⚡⚡⚡⚡ | 💰 | ⭐⭐⭐⭐ | Fast, simple tasks |
| **GPT-4o** | ⚡⚡⚡⚡ | 💰💰 | ⭐⭐⭐⭐⭐ | General purpose, vision |
| **GPT-4o-mini** | ⚡⚡⚡⚡⚡ | 💰 | ⭐⭐⭐⭐ | Cost-effective, fast |
| **Gemini Pro** | ⚡⚡⚡⚡ | 💰💰 | ⭐⭐⭐⭐ | Long context, multimodal |
| **Llama 3 70B** | ⚡⚡⚡ | 💰 | ⭐⭐⭐⭐ | Open source, fast |

### Get All Available Models

```typescript
import { openrouter } from '@/lib/openrouter'

const models = await openrouter.getModels()
console.log(models) // List of 100+ models
```

## Basic Usage

### Simple Text Completion

```typescript
import { openrouter } from '@/lib/openrouter'
import { prisma } from '@/lib/prisma'

// Get user's API key from database
const apiKey = await prisma.apiKey.findFirst({
  where: {
    userId: user.id,
    name: 'OpenRouter',
  },
})

if (!apiKey) {
  throw new Error('OpenRouter API key not found')
}

// Create completion
const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'openai/gpt-4o-mini',
    messages: [
      { role: 'user', content: 'Write a short poem about coding' }
    ],
    temperature: 0.7,
    maxTokens: 200,
  }
)

const poem = response.choices[0].message.content
console.log(poem)
```

### Chat Conversation

```typescript
const messages = [
  { role: 'system', content: 'You are a helpful coding assistant.' },
  { role: 'user', content: 'How do I use async/await in JavaScript?' },
  { role: 'assistant', content: 'Async/await is a way to handle asynchronous operations...' },
  { role: 'user', content: 'Can you show me an example?' },
]

const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'anthropic/claude-3.5-sonnet',
    messages: messages,
    temperature: 0.5,
  }
)

const answer = response.choices[0].message.content
```

### Streaming Responses

For real-time streaming responses:

```typescript
// src/app/api/ai/stream/route.ts
import { openrouter } from '@/lib/openrouter'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  
  // Get user's API key...
  
  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${decryptedKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          stream: true,
        }),
      })
      
      const reader = response.body?.getReader()
      
      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        controller.enqueue(value)
      }
      
      controller.close()
    },
  })
  
  return new Response(stream)
}
```

## Building AI Agents

### Agent Architecture

An AI agent is an autonomous system that:
1. **Perceives** the environment (receives input)
2. **Reasons** about what to do (plans actions)
3. **Acts** on the environment (executes tasks)
4. **Learns** from outcomes (improves over time)

### Simple Agent Example

```typescript
// src/lib/agents/content-agent.ts
import { openrouter } from '@/lib/openrouter'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface ContentAgentConfig {
  userId: string
  topic: string
  platform: 'twitter' | 'linkedin' | 'blog'
}

export class ContentAgent {
  private userId: string
  private topic: string
  private platform: string
  
  constructor(config: ContentAgentConfig) {
    this.userId = config.userId
    this.topic = config.topic
    this.platform = config.platform
  }
  
  async generateContent(): Promise<string> {
    logger.info('Content agent starting', {
      context: 'agent',
      metadata: { topic: this.topic, platform: this.platform },
    })
    
    // Step 1: Get user's API key
    const apiKey = await this.getApiKey()
    
    // Step 2: Plan the content
    const outline = await this.planContent(apiKey)
    
    // Step 3: Write the content
    const content = await this.writeContent(apiKey, outline)
    
    // Step 4: Format for platform
    const formatted = await this.formatContent(apiKey, content)
    
    logger.info('Content agent completed', {
      context: 'agent',
      metadata: { contentLength: formatted.length },
    })
    
    return formatted
  }
  
  private async getApiKey() {
    const apiKey = await prisma.apiKey.findFirst({
      where: { userId: this.userId, name: 'OpenRouter' },
    })
    
    if (!apiKey) throw new Error('API key not found')
    return apiKey
  }
  
  private async planContent(apiKey: any): Promise<string> {
    const response = await openrouter.createCompletion(
      apiKey.encryptedKey,
      apiKey.iv,
      {
        model: 'anthropic/claude-3-haiku', // Fast planning
        messages: [
          {
            role: 'system',
            content: 'You are a content strategist. Create detailed content outlines.',
          },
          {
            role: 'user',
            content: `Create an outline for a ${this.platform} post about: ${this.topic}`,
          },
        ],
        temperature: 0.5,
        maxTokens: 500,
      }
    )
    
    return response.choices[0].message.content
  }
  
  private async writeContent(apiKey: any, outline: string): Promise<string> {
    const response = await openrouter.createCompletion(
      apiKey.encryptedKey,
      apiKey.iv,
      {
        model: 'openai/gpt-4o-mini', // Good for writing
        messages: [
          {
            role: 'system',
            content: 'You are a professional content writer.',
          },
          {
            role: 'user',
            content: `Write content based on this outline:\n\n${outline}`,
          },
        ],
        temperature: 0.7,
        maxTokens: 1000,
      }
    )
    
    return response.choices[0].message.content
  }
  
  private async formatContent(apiKey: any, content: string): Promise<string> {
    const platformGuidelines = {
      twitter: 'Format as a Twitter thread. Max 280 chars per tweet. Use emojis.',
      linkedin: 'Format for LinkedIn. Professional tone. Use line breaks for readability.',
      blog: 'Format as a blog post with headings, paragraphs, and conclusion.',
    }
    
    const response = await openrouter.createCompletion(
      apiKey.encryptedKey,
      apiKey.iv,
      {
        model: 'anthropic/claude-3-haiku', // Fast formatting
        messages: [
          {
            role: 'system',
            content: `You format content for ${this.platform}. ${platformGuidelines[this.platform]}`,
          },
          {
            role: 'user',
            content: `Format this content:\n\n${content}`,
          },
        ],
        temperature: 0.3,
        maxTokens: 1000,
      }
    )
    
    return response.choices[0].message.content
  }
}

// Usage
export async function createContent(userId: string, topic: string, platform: string) {
  const agent = new ContentAgent({ userId, topic, platform })
  const content = await agent.generateContent()
  return content
}
```

### Multi-Step Agent Workflow

```typescript
// src/lib/agents/research-agent.ts
export class ResearchAgent {
  async research(topic: string): Promise<ResearchResult> {
    // Step 1: Generate research questions
    const questions = await this.generateQuestions(topic)
    
    // Step 2: Answer each question
    const answers = await Promise.all(
      questions.map(q => this.answerQuestion(q))
    )
    
    // Step 3: Synthesize findings
    const synthesis = await this.synthesize(answers)
    
    // Step 4: Create summary
    const summary = await this.summarize(synthesis)
    
    return {
      questions,
      answers,
      synthesis,
      summary,
    }
  }
  
  private async generateQuestions(topic: string): Promise<string[]> {
    const response = await openrouter.createCompletion(...)
    // Parse response into questions array
    return questions
  }
  
  // ... other methods
}
```

### Agent with Memory

```typescript
// src/lib/agents/conversational-agent.ts
export class ConversationalAgent {
  private conversationHistory: Message[] = []
  private maxHistory = 10
  
  async chat(userMessage: string): Promise<string> {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
    })
    
    // Keep only last N messages
    if (this.conversationHistory.length > this.maxHistory) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistory)
    }
    
    // Generate response with full context
    const response = await openrouter.createCompletion(
      apiKey.encryptedKey,
      apiKey.iv,
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...this.conversationHistory,
        ],
        temperature: 0.7,
      }
    )
    
    const assistantMessage = response.choices[0].message.content
    
    // Add assistant response to history
    this.conversationHistory.push({
      role: 'assistant',
      content: assistantMessage,
    })
    
    return assistantMessage
  }
  
  clearHistory() {
    this.conversationHistory = []
  }
}
```

## Advanced Patterns

### Function Calling / Tool Use

Some models support function calling (Claude, GPT-4):

```typescript
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get the current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name' },
        },
        required: ['location'],
      },
    },
  },
]

const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'openai/gpt-4o',
    messages: [{ role: 'user', content: 'What\'s the weather in Paris?' }],
    tools: tools,
  }
)

// Check if model wants to call a function
if (response.choices[0].message.tool_calls) {
  const toolCall = response.choices[0].message.tool_calls[0]
  const functionName = toolCall.function.name
  const functionArgs = JSON.parse(toolCall.function.arguments)
  
  // Execute the function
  const result = await executeFunction(functionName, functionArgs)
  
  // Send result back to model
  // ... continue conversation
}
```

### Chain of Thought Prompting

Improve reasoning with chain-of-thought:

```typescript
const prompt = `
Let's solve this step by step:

1. First, identify the key information
2. Then, break down the problem
3. Finally, provide the solution

Problem: ${userProblem}

Let's think through this:
`

const response = await openrouter.createCompletion(
  apiKey.encryptedKey,
  apiKey.iv,
  {
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  }
)
```

### Parallel Agent Execution

Run multiple agents in parallel:

```typescript
async function analyzeContent(text: string) {
  const [sentiment, keywords, summary] = await Promise.all([
    analyzeSentiment(text),
    extractKeywords(text),
    generateSummary(text),
  ])
  
  return { sentiment, keywords, summary }
}
```

### Self-Improving Agent

Agent that learns from feedback:

```typescript
export class SelfImprovingAgent {
  private learnings: string[] = []
  
  async perform(task: string): Promise<{ result: string; quality: number }> {
    // Include past learnings in context
    const context = this.learnings.join('\n')
    
    const response = await openrouter.createCompletion(
      apiKey.encryptedKey,
      apiKey.iv,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are an agent that improves over time. Past learnings:\n${context}`,
          },
          { role: 'user', content: task },
        ],
      }
    )
    
    const result = response.choices[0].message.content
    
    // Evaluate quality
    const quality = await this.evaluateQuality(result)
    
    // If quality is low, learn from it
    if (quality < 0.7) {
      await this.learnFromMistake(task, result)
    }
    
    return { result, quality }
  }
  
  private async learnFromMistake(task: string, result: string) {
    // Analyze what went wrong
    const analysis = await openrouter.createCompletion(...)
    
    // Store learning
    this.learnings.push(analysis)
    
    // Persist to database
    await prisma.agentLearning.create({
      data: { learning: analysis },
    })
  }
}
```

## Cost Optimization

### 1. Model Selection

Choose the right model for the task:

```typescript
const modelByComplexity = {
  simple: 'anthropic/claude-3-haiku',        // $0.25/1M tokens
  medium: 'openai/gpt-4o-mini',             // $0.15/1M tokens
  complex: 'anthropic/claude-3.5-sonnet',   // $3.00/1M tokens
}

// Use cheaper models when possible
const model = complexity === 'high' ? modelByComplexity.complex : modelByComplexity.simple
```

### 2. Token Optimization

Reduce token usage:

```typescript
// ❌ Bad: Wasteful
const response = await openrouter.createCompletion(..., {
  messages: [
    { role: 'user', content: longDocument + '\n\nSummarize this in one sentence.' }
  ],
  maxTokens: 4000, // Way more than needed
})

// ✅ Good: Optimized
const response = await openrouter.createCompletion(..., {
  messages: [
    { role: 'user', content: longDocument + '\n\nSummarize this in one sentence.' }
  ],
  maxTokens: 100, // Just enough
  temperature: 0.3, // Lower temp = more focused
})
```

### 3. Caching Results

Cache responses for common queries:

```typescript
import { prisma } from '@/lib/prisma'

async function getCachedCompletion(prompt: string, model: string) {
  // Check cache
  const cached = await prisma.aiCache.findFirst({
    where: { prompt, model, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  })
  
  if (cached) {
    logger.info('Cache hit', { context: 'ai-cache' })
    return cached.response
  }
  
  // Generate new response
  const response = await openrouter.createCompletion(...)
  
  // Store in cache
  await prisma.aiCache.create({
    data: { prompt, model, response: response.choices[0].message.content },
  })
  
  return response.choices[0].message.content
}
```

### 4. Batch Processing

Process multiple items in one request:

```typescript
// ❌ Bad: Multiple API calls
for (const item of items) {
  await processItem(item)
}

// ✅ Good: Batch processing
const batchPrompt = items.map((item, i) => `${i + 1}. ${item}`).join('\n')
const response = await openrouter.createCompletion(..., {
  messages: [{ role: 'user', content: `Process these items:\n${batchPrompt}` }],
})
```

### 5. Usage Monitoring

Track usage and costs:

```typescript
// After each completion
await prisma.aiUsage.create({
  data: {
    userId: user.id,
    model: response.model,
    promptTokens: response.usage.prompt_tokens,
    completionTokens: response.usage.completion_tokens,
    totalTokens: response.usage.total_tokens,
    cost: calculateCost(response.usage, response.model),
  },
})
```

## Best Practices

### 1. Error Handling

```typescript
async function safeCompletion(params: CompletionParams) {
  try {
    return await openrouter.createCompletion(...)
  } catch (error) {
    logger.error('AI completion failed', error, { context: 'ai' })
    
    // Fallback strategy
    if (error.message.includes('rate limit')) {
      // Wait and retry
      await wait(5000)
      return await openrouter.createCompletion(...)
    }
    
    if (error.message.includes('insufficient credits')) {
      throw new Error('Please add credits to your OpenRouter account')
    }
    
    // Generic error
    throw new Error('AI service temporarily unavailable')
  }
}
```

### 2. Input Validation

```typescript
function validatePrompt(prompt: string): string {
  // Remove sensitive data
  const cleaned = prompt.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED]') // SSN
  
  // Limit length
  if (cleaned.length > 10000) {
    throw new Error('Prompt too long (max 10,000 characters)')
  }
  
  return cleaned
}
```

### 3. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit'

const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window
  message: 'Too many AI requests, please try again later',
})

// Apply to AI routes
export async function POST(req: Request) {
  await aiRateLimiter(req)
  // ... AI logic
}
```

### 4. Logging

```typescript
logger.info('AI request started', {
  context: 'ai',
  metadata: { model: params.model, userId: user.id },
})

const start = Date.now()
const response = await openrouter.createCompletion(...)
const duration = Date.now() - start

logger.info('AI request completed', {
  context: 'ai',
  metadata: {
    model: params.model,
    tokens: response.usage.total_tokens,
    duration,
    cost: calculateCost(response.usage, params.model),
  },
})
```

## Troubleshooting

### Error: "Invalid API Key"

**Solution:**
1. Verify API key starts with `sk-or-`
2. Check key is active in OpenRouter dashboard
3. Ensure key is properly encrypted/decrypted

### Error: "Insufficient Credits"

**Solution:**
1. Add credits to OpenRouter account
2. Inform user to check their OpenRouter balance
3. Implement graceful error message

### Slow Responses

**Solutions:**
1. Use faster models (Claude Haiku, GPT-4o-mini)
2. Reduce `maxTokens`
3. Lower `temperature` for more focused responses
4. Implement streaming for better UX

### High Costs

**Solutions:**
1. Use cheaper models when possible
2. Implement caching
3. Reduce token usage
4. Batch requests
5. Monitor usage with analytics

## Next Steps

1. **Implement User API Key Management UI**
   - Page for users to add their OpenRouter key
   - Display usage statistics
   - Cost tracking

2. **Build Your First Agent**
   - Start with simple content generation
   - Add more steps and complexity
   - Implement error handling and logging

3. **Create AI-Powered Features**
   - Blog post generator
   - Social media content planner
   - Email assistant
   - Chat support bot

4. **Optimize Performance**
   - Add caching layer
   - Implement rate limiting
   - Monitor costs

---

**Resources:**
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenRouter Models](https://openrouter.ai/models)
- [OpenRouter Pricing](https://openrouter.ai/docs#models)

**Last Updated:** October 21, 2025

