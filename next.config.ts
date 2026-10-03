import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the live preview intact when a production build runs at the same time.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  // Enable compression (Brotli by default in production)
  compress: true,
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security and performance headers
  async headers() {
    // Development bundles reuse URLs as the source changes. Keep Next's
    // no-cache defaults so a reload cannot restore an older version of the UI.
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        // HTML documents must stay revalidatable — an `immutable` blanket rule
        // here would pin published pages in browser caches, so content updates
        // would never reach returning visitors.
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
