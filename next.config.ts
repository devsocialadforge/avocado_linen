import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Optimized quality levels for different use cases
    qualities: [50, 65, 75, 80, 85, 90, 100],
    // Enable modern formats
    formats: ["image/webp", "image/avif"],
    // Responsive breakpoints for your large images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@sanity/image-url"],
  },
};

export default nextConfig;
