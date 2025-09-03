// This script tests the logger functionality
import logger from '../lib/util/logger';
import { clientLogger } from '../lib/util/client-logger';

// Test server-side logger
logger.info('This is an info log from server-side logger');
logger.info({ userId: '123', action: 'login' }, 'User logged in');
logger.warn('This is a warning log');
logger.error({ error: new Error('Test error'), code: 500 }, 'An error occurred');

// Log with child logger
const contextLogger = logger.child({ context: 'test-script' });
contextLogger.info('This is a log from a child logger');

console.log('Server logger tests complete');

// Test client-side logger in server environment
console.log('Testing client logger (these will only show in development)');
clientLogger.info('This is an info log from client-side logger');
clientLogger.info({ userId: '123', action: 'login' }, 'User logged in');
clientLogger.warn('This is a warning log');
clientLogger.error({ error: 'Test error', code: 500 }, 'An error occurred');

console.log('All logger tests complete');