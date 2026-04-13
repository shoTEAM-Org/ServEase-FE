import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react-router": path.resolve(process.cwd(), "src/lib/react-router-compat.tsx"),
    };

    return config;
  },
};

export default nextConfig;
