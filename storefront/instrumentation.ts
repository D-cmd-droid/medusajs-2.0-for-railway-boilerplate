// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import the packages directly without await
    require('pino');
    require('next-logger');
  }
}