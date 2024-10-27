import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Ignore the warning in development
    if (!isServer) {
      config.ignoreWarnings = [
        { module: /node_modules\/@rc-component\/trigger/ },
      ];
    }
    return config;
  },
};

export default nextConfig;
