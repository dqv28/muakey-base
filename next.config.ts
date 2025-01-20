import NextBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
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
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'dayjs',
      'showdown',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
    ],
    webpackMemoryOptimizations: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
    }

    return config
  },
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
