import type { Metadata } from 'next';
import PromptToProductClient from './PromptToProductClient';

export const metadata: Metadata = {
  title: 'Prompt to Product — Live Vibe Coding Camp | Muhammed Mekky',
  description: 'كامب Live عملي يحول فكرتك إلى Portfolio وLanding Page وMicro Tool حقيقيين، من الـrequirements والـUI/UX لحد الـbackend والـdeployment.',
  alternates: { canonical: '/prompt-to-product' },
  openGraph: {
    title: 'Prompt to Product — Live Online Camp',
    description: 'مش هتتعلم أداة. هتتعلم تحوّل الفكرة لمنتج حقيقي.',
    images: ['/images/og-preview.png'],
  },
};

export default function PromptToProductPage() {
  return <PromptToProductClient />;
}
