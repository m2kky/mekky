import type { Metadata } from 'next';
import CareerClient from './CareerClient';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Career — Internship Program | AI, Automation & Vibe Coding',
    description:
        'Apply for an internship with Muhammed Mekky. Get hands-on training in AI, Automation, and Vibe Coding. Build real projects and grow your career.',
    openGraph: {
        title: 'Career — Internship Program | AI, Automation & Vibe Coding',
        description:
            'Apply for an internship with Muhammed Mekky. Get hands-on training in AI, Automation, and Vibe Coding.',
        url: `${SITE.url}/career`,
        images: [{ url: '/images/og-preview.png', width: 1200, height: 630, alt: 'Mekky Internship Program' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Career — Internship Program | AI, Automation & Vibe Coding',
        description:
            'Apply for an internship with Muhammed Mekky. Get hands-on training in AI, Automation, and Vibe Coding.',
        images: ['/images/og-preview.png'],
    },
};

export default function CareerPage() {
    return <CareerClient />;
}
