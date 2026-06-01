import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/ai-solutions',
        destination: '/services/ai-marketing-systems',
        permanent: true,
      },
      {
        source: '/services/business-automation',
        destination: '/services/marketing-automation',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
