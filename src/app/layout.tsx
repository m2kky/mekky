import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SEO } from '@/lib/constants';
import LenisProvider from '@/components/LenisProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: 'Muhammed Mekky' }],
  openGraph: {
    type: 'website',
    url: 'https://muhammedmekky.com',
    title: SEO.title,
    description: SEO.description,
    images: [{ url: SEO.image, width: 1200, height: 630 }],
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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
