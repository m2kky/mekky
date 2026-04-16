import type { Metadata } from 'next';
import WorkshopLandingClient from './WorkshopLandingClient';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Shopify Kick Start | Free 4-Hour Live Workshop',
    description:
        'Reserve your free seat in Shopify Kick Start, a live 4-hour online workshop. Learn step-by-step how to build high-converting Shopify stores.',
    openGraph: {
        title: 'Shopify Kick Start | Free 4-Hour Live Workshop',
        description:
            'Reserve your free seat in Shopify Kick Start, a live 4-hour online workshop. Learn step-by-step how to build high-converting Shopify stores.',
        url: `${SITE.url}/workshop`,
        images: [{ url: '/hero_poster.png', width: 1200, height: 630, alt: 'Shopify Kick Start Workshop' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Shopify Kick Start | Free 4-Hour Live Workshop',
        description:
            'Reserve your free seat in Shopify Kick Start, a live 4-hour online workshop. Learn step-by-step how to build high-converting Shopify stores.',
        images: ['/hero_poster.png'],
    },
};

export default function WorkshopPage() {
    return <WorkshopLandingClient />;
}
