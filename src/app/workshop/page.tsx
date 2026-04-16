import type { Metadata } from 'next';
import WorkshopLandingClient from './WorkshopLandingClient';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Beyond The Click: Mastering Shopify Analytics & Clarity | Free Workshop',
    description:
        'Reserve your free seat in Beyond The Click, a live online workshop for media buyers on Shopify Analytics, Clarity, attribution, CRO, and automation alerts.',
    openGraph: {
        title: 'Beyond The Click: Mastering Shopify Analytics & Clarity | Free Workshop',
        description:
            'Reserve your free seat in Beyond The Click, a live online workshop for media buyers on Shopify Analytics, Clarity, attribution, CRO, and automation alerts.',
        url: `${SITE.url}/workshop`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Beyond The Click Workshop' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Beyond The Click: Mastering Shopify Analytics & Clarity | Free Workshop',
        description:
            'Reserve your free seat in Beyond The Click, a live online workshop for media buyers on Shopify Analytics, Clarity, attribution, CRO, and automation alerts.',
        images: ['/og-image.png'],
    },
};

export default function WorkshopPage() {
    return <WorkshopLandingClient />;
}
