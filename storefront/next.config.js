const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: [
      "thread-stream",
      "pino",
      "pino-worker",
      "pino-file",
      "pino-pretty",
      "next-logger"
    ],
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      "thread-stream": "commonjs thread-stream",
      "pino-worker": "commonjs pino-worker",
      "pino-file": "commonjs pino-file",
      "pino-abstract-transport": "commonjs pino-abstract-transport",
      "sonic-boom": "commonjs sonic-boom",
      "real-require": "commonjs real-require",
      "node:fs": "commonjs fs",
      "node:path": "commonjs path"
    });
    
    // Make sure node modules are resolved correctly
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      worker_threads: false
    };
    
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        
      },
      { // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
      },
      { // Note: only needed when using local-file for product media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace('https://', ''),
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  }
}

module.exports = nextConfig
