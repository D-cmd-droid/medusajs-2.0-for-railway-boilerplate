'use client'
// src/lib/util/client-logger.ts

/**
 * Simple client-side logger with levels that won't affect bundle size
 * Supports both string messages and structured logging:
 * - clientLogger.info('Simple message')
 * - clientLogger.info('User event', { userId: '123', action: 'click' })
 * - clientLogger.error('Error occurred', error)
 */
export const clientLogger = {
  /**
   * Debug level logging - only appears in development
   * @param message - Log message or object
   * @param data - Optional data to include
   */
  debug: (message: string | object, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof message === 'object') {
        console.debug('[debug]', message)
      } else {
        console.debug(`[debug] ${message}`, data)
      }
    }
  },

  /**
   * Info level logging - only appears in development
   * @param message - Log message or object
   * @param data - Optional data to include
   */
  info: (message: string | object, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof message === 'object') {
        console.info('[info]', message)
      } else {
        console.info(`[info] ${message}`, data)
      }
    }
  },

  /**
   * Warning level logging - appears in all environments
   * @param message - Log message or object
   * @param data - Optional data to include
   */
  warn: (message: string | object, data?: any) => {
    if (typeof message === 'object') {
      console.warn('[warn]', message)
    } else {
      console.warn(`[warn] ${message}`, data)
    }
  },

  /**
   * Error level logging - appears in all environments
   * @param message - Log message or object
   * @param data - Optional data to include
   */
  error: (message: string | object, data?: any) => {
    if (typeof message === 'object') {
      console.error('[error]', message)
    } else {
      console.error(`[error] ${message}`, data)
    }
    
    // In production, could also send to error tracking service
    // if available in the future
  }
}