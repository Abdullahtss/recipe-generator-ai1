import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Add configurations to help with hydration
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  
  // Suppress hydration warnings in development for dynamic content
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;