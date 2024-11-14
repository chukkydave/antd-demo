import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // your existing patterns
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.ignoreWarnings = [
        { module: /node_modules\/@rc-component\/trigger/ },
      ];
    }
    return config;
  },
};

export default nextConfig;
