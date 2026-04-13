import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: path.join(__dirname, ".."),
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
