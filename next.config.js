/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'nxqwqvpgdaksxhkhkiem.supabase.co'
      },
      {
        hostname: 'oaidalleapiprodscus.blob.core.windows.net'
      },
    ],
    experimental: {
      turbo: false,
    },
  },
});