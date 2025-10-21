/**
 * Simple logger utility for debugging and troubleshooting
 */

type LogLevel = 'INFO' | 'DEBUG' | 'ERROR' | 'WARN'

interface LogOptions {
  level?: LogLevel
  context?: string
  metadata?: Record<string, unknown>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = new Date().toISOString()
    const context = options?.context ? `[${options.context}]` : ''
    return `${timestamp} [${level}]${context} ${message}`
  }

  info(message: string, options?: Omit<LogOptions, 'level'>) {
    const formatted = this.formatMessage('INFO', message, options)
    console.info(formatted, options?.metadata || '')
  }

  debug(message: string, options?: Omit<LogOptions, 'level'>) {
    if (!this.isDevelopment) return
    const formatted = this.formatMessage('DEBUG', message, options)
    console.debug(formatted, options?.metadata || '')
  }

  error(message: string, error?: Error | unknown, options?: Omit<LogOptions, 'level'>) {
    const formatted = this.formatMessage('ERROR', message, options)
    console.error(formatted, error, options?.metadata || '')
  }

  warn(message: string, options?: Omit<LogOptions, 'level'>) {
    const formatted = this.formatMessage('WARN', message, options)
    console.warn(formatted, options?.metadata || '')
  }
}

export const logger = new Logger()

