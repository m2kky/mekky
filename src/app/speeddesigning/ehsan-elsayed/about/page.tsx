import type { Metadata } from 'next';
import EhsanAboutExperience from './EhsanAboutExperience';

export const metadata: Metadata = {
  title: 'About Ehsan El Sayed — A Working Model | Speed Designing',
  description: 'An independent speculative portrait of how Ehsan El Sayed connects commercial judgment, technical fluency, and applied learning.',
  alternates: { canonical: '/speeddesigning/ehsan-elsayed/about' },
  openGraph: {
    type: 'website',
    url: '/speeddesigning/ehsan-elsayed/about',
    title: 'About Ehsan El Sayed — A Working Model',
    description: 'A Method and Worldview chapter from the independent Speed Designing concept.',
    images: [{
      url: '/speeddesigning/ehsan-elsayed/og.svg',
      width: 1200,
      height: 630,
      alt: 'Ehsan El Sayed — A Working Model',
    }],
  },
};

export default function EhsanAboutPage() {
  return <EhsanAboutExperience />;
}
