import type { Metadata } from 'next';
import EhsanContactExperience from './EhsanContactExperience';

export const metadata: Metadata = {
  title: 'Contact Demo — Ehsan El Sayed | Speed Designing',
  description: 'A non-sending interactive inquiry demo inside an independent speculative Speed Designing concept. This is not an official contact channel.',
  alternates: { canonical: '/speeddesigning/ehsan-elsayed/contact' },
  openGraph: {
    type: 'website',
    url: '/speeddesigning/ehsan-elsayed/contact',
    title: 'Contact Demo — Ehsan El Sayed',
    description: 'An interactive concept demo. Nothing entered here is sent to Ehsan El Sayed.',
    images: [{
      url: '/speeddesigning/ehsan-elsayed/og.svg',
      width: 1200,
      height: 630,
      alt: 'Ehsan El Sayed — Contact Demo',
    }],
  },
};

export default function EhsanContactPage() {
  return <EhsanContactExperience />;
}
