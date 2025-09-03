// src/lib/util/logger.ts
import pino from 'pino'

// Extend the Logger type to properly handle object parameters
declare module 'pino' {
  interface LogFn {
    // Add overloads that TypeScript understands for object parameters
    (obj: object, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
  }
}

// Determine environment
const isDev = process.env.NODE_ENV !== 'production'

// Configure logger based on environment
const logger = pino({
  level: process.env.NEXT_LOGGER_LEVEL || (isDev ? 'debug' : 'info'),
  
  // In development, use pino-pretty with sync option to avoid worker threads
  ...(isDev ? {
    transport: { 
      target: 'pino-pretty',
      options: { 
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
        sync: true // Use synchronous logging in development
      }
    }
  } : {}), // In production, use default async logging
  
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: process.env.NODE_ENV,
    app: 'seasun-storefront',
  },
})

/**
 * Creates a specialized logger for a specific context/component
 * 
 * @param context - The context or component name for this logger
 * @returns A child logger with the specified context
 */
export const createLogger = (context: string) => {
  return logger.child({ context })
}

/**
 * Default logger instance
 * Usage examples:
 * - logger.info('Simple message')
 * - logger.info({ userId: '123' }, 'User logged in')
 * - logger.error({ err }, 'Error occurred')
 */
export default logger