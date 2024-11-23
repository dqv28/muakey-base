import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '14.225.204.53',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'work.1997.pro.vn',
        port: '',
        pathname: '/storage/**',
      }
    ]
  },
};

export default nextConfig;
