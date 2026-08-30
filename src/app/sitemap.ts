import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE.url,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${SITE.url}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE.url}/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/speeddesigning`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/speeddesigning/ehsan-elsayed`,
            lastModified: new Date('2026-08-30'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/speeddesigning/ehsan-elsayed/blueprint`,
            lastModified: new Date('2026-08-30'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE.url}/rammah-project`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${SITE.url}/lectures`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/case-studies`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE.url}/testimonials`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE.url}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
