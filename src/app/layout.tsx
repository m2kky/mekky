import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SEO, SITE } from '@/lib/constants';
import LenisProvider from '@/components/LenisProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import FloatingCTA from '@/components/FloatingCTA';
import PopupRenderer from '@/components/PopupRenderer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  adjustFontFallback: false,
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
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body suppressHydrationWarning>
        <BreadcrumbSchema />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${SITE.url}/#person`,
                "name": "Muhammed Mekky",
                "url": SITE.url,
                "image": `${SITE.url}${SEO.image}`,
                "description": "AI-driven marketing and business automation strategist building scalable systems using artificial intelligence, automation workflows, and performance marketing strategies.",
                "jobTitle": "AI Marketing & Business Automation Strategist",
                "hasOccupation": {
                  "@type": "Occupation",
                  "name": "AI Marketing Systems Architect",
                  "occupationLocation": {
                    "@type": "Country",
                    "name": "Egypt"
                  }
                },
                "sameAs": [
                  "https://www.linkedin.com/in/muhammedmekky",
                  "https://github.com/m2kky"
                ],
                "knowsAbout": [
                  "Artificial Intelligence", "Marketing Automation", "Business Systems Design",
                  "Performance Marketing", "Workflow Automation", "Lead Generation Systems", "Conversion Optimization", "AI Agents"
                ],
                "areaServed": [
                  { "@type": "Country", "name": "Egypt" },
                  { "@type": "Place", "name": "MENA Region" },
                  { "@type": "Place", "name": "Global" }
                ],
                "worksFor": {
                  "@type": "Organization",
                  "name": "Independent AI & Automation Consultant"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Muhammed Mekky - Consulting",
                "url": SITE.url,
                "logo": `${SITE.url}/images/og-preview.png`,
                "sameAs": [
                  "https://www.linkedin.com/in/muhammedmekky"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": SITE.url,
                "name": "Muhammed Mekky",
                "description": SEO.description,
                "dateModified": new Date().toISOString()
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What services do you offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "I offer AI & Automation, Digital Marketing, Web Design & Development, and Training & Workshops to help businesses build smarter systems."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How can marketing automation help my agency?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Automation can reduce administrative tasks by 40%. By integrating tools like n8n and ChatGPT, you can automate reporting, campaign analysis, and client management."
                    }
                  }
                ]
              }
            ])
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X6PE0BH0QF"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X6PE0BH0QF');
          `}
        </Script>
        <NoiseOverlay />
        <LenisProvider>{children}</LenisProvider>
        <FloatingCTA />
        <PopupRenderer />
        <Analytics />
      </body>
    </html>
  );
}
