import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SEO, SITE } from '@/lib/constants';
import LenisProvider from '@/components/LenisProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import FloatingCTA from '@/components/FloatingCTA';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: 'Muhammed Mekky' }],
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: SEO.title,
    description: SEO.description,
    images: [{ url: SEO.image, width: 1200, height: 630, alt: SEO.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: [SEO.image],
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <NoiseOverlay />
        <LenisProvider>{children}</LenisProvider>
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  );
}
