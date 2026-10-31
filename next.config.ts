import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: '/share', destination: '/share/index.html' }];
  },
  async headers() {
    return [{ source: '/share/Muhammed-Mekky.vcf', headers: [
      { key: 'Content-Type', value: 'text/vcard; charset=utf-8' },
      { key: 'Content-Disposition', value: 'attachment; filename="Muhammed-Mekky.vcf"' },
    ] }];
  },
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
