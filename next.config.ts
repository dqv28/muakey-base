import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '14.225.204.53',
        port: '8000',
        pathname: '/images/**',
      }
    ]
  },
};

export default nextConfig;
