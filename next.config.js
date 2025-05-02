/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    // If you're using the App Router
    appDir: true,
  },
  // Skip API routes during static generation
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
};


module.exports = nextConfig;
