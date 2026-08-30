import type { Metadata } from 'next';
import { Alexandria, Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import EhsanRouteFrame from './EhsanRouteFrame';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--ehsan-display',
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ehsan-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ehsan-mono',
  display: 'swap',
});

const arabic = Alexandria({
  subsets: ['arabic'],
  variable: '--ehsan-arabic',
  display: 'swap',
});

const title = 'Ehsan El Sayed — The Working System | Speed Designing';
const description = 'A speculative Speed Designing concept exploring how Ehsan El Sayed connects Sales, Business Development, practical AI, and applied learning.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/speeddesigning/ehsan-elsayed' },
  openGraph: {
    type: 'website',
    url: '/speeddesigning/ehsan-elsayed',
    title: 'Ehsan El Sayed — The Working System',
    description: 'From knowing the tool to making it work: a speculative interactive portrait of an operator-teacher.',
    images: [{
      url: '/speeddesigning/ehsan-elsayed/og.svg',
      width: 1200,
      height: 630,
      alt: 'Ehsan El Sayed — The Working System',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ehsan El Sayed — The Working System',
    description,
    images: ['/speeddesigning/ehsan-elsayed/og.svg'],
  },
  robots: { index: true, follow: true },
};

export default function EhsanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}>
      <EhsanRouteFrame>{children}</EhsanRouteFrame>
    </div>
  );
}
