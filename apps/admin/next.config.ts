import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure we can handle local assets
  experimental: {
    // optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
