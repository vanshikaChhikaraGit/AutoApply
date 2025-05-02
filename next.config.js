/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // If you're using App Router
    appDir: true,
    // Enable if using server actions
    serverActions: true,
  },
  // Skip API routes during static generation
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // Optional: Add logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;