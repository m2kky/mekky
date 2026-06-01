import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
    const aiBots = [
        'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
        'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
        'Google-Extended',
        'PerplexityBot', 'Perplexity-User',
        'Meta-ExternalAgent', 'CCBot', 'Bytespider'
    ];

    const rules = [
        {
            userAgent: '*',
            allow: [
                '/',
                '/services/',
                '/services/ai-solutions',
                '/services/business-automation',
                '/services/digital-marketing',
                '/services/web-design',
                '/services/community-growth',
                '/services/team-enablement',
                '/services/corporate-training',
                '/case-studies/',
                '/blog/',
                '/guides/',
                '/about',
                '/book'
            ],
            disallow: ['/admin/', '/api/'], // Protect admin and api routes
        },
        ...aiBots.map(bot => ({
            userAgent: bot,
            allow: [
                '/',
                '/services/',
                '/case-studies/',
                '/blog/',
                '/guides/',
                '/llms.txt',
                '/llms-ar.txt',
                '/llms-full.txt'
            ],
        }))
    ];

    return {
        rules,
        sitemap: `${SITE.url}/sitemap.xml`,
    };
}
