import type { NextConfig } from "next";
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '26.184.11.81',
        port: '8000',
        pathname: '/images/**',
      }
    ]
  }
};

export default nextConfig;
