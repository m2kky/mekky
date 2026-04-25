import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkshopLandingClient from './WorkshopLandingClient';
import { SITE } from '@/lib/constants';

const COURSE_TITLE = 'The Shopify Architect';
const META_TITLE = `${COURSE_TITLE} | Enrollment Program`;
const META_DESCRIPTION =
    'Apply now to The Shopify Architect and learn store architecture, high-conversion landing pages, AI integration, analytics clarity, Meta data sync, and automation engines.';

export const metadata: Metadata = {
    title: META_TITLE,
    description: META_DESCRIPTION,
    openGraph: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        url: `${SITE.url}/workshop`,
        images: [{ url: '/hero_poster.png', width: 1200, height: 630, alt: `${COURSE_TITLE} program` }],
    },
    twitter: {
        card: 'summary_large_image',
        title: META_TITLE,
        description: META_DESCRIPTION,
        images: ['/hero_poster.png'],
    },
};

export default function WorkshopPage() {
    return (
        <Suspense fallback={null}>
            <WorkshopLandingClient />
        </Suspense>
    );
}
