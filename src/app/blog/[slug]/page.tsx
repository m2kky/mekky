import { createClient } from '@/utils/supabase/server';
import { BLOGS } from '@/lib/constants';
import BlogClient from './BlogClient';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Metadata } from 'next';

const STATIC_ARTICLES = [
    {
        title: 'الجانب المظلم للـ AI: هجمات Prompt Injection',
        slug: 'prompt-injection',
        excerpt: 'مع هوجة تحديثات الـ AI اللي مفيش استفادة حقيقية منها غير للي فاهم... تعالى نتكلم عن الجانب المظلم. Prompt Injection Attacks.',
        image: '/images/blog/prompt-injection-hero.png',
        publish_date: '2026-04-17',
    },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const supabase = await createClient();

    let post = STATIC_ARTICLES.find(a => a.slug === resolvedParams.slug) || 
               BLOGS.items.find(b => b.slug === resolvedParams.slug);

    if (!post) {
        const { data } = await supabase
            .from('blogs')
            .select('title, excerpt, image')
            .eq('slug', resolvedParams.slug)
            .eq('published', true)
            .single();
        post = data as any;
    }

    if (!post) {
        return { title: 'Post Not Found | Muhammed Mekky' };
    }

    // Construct full URL for the image
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammedmekky.com';
    const imageUrl = post.image?.startsWith('http') ? post.image : `${baseUrl}${post.image}`;

    return {
        title: `${post.title} | Muhammed Mekky Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${baseUrl}/blog/${resolvedParams.slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();

    // First, check if it's a static blog from constants.ts or static articles
    const staticPost = STATIC_ARTICLES.find((a: any) => a.slug === resolvedParams.slug) || 
                       BLOGS.items.find((b: any) => b.slug === resolvedParams.slug);
    
    let post = null;

    if (staticPost) {
        post = {
            ...staticPost,
            publish_date: (staticPost as any).publish_date || (staticPost as any).date,
            content: (staticPost as any).content || []
        };
    } else {
        // Fetch the post from Supabase
        const { data } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', resolvedParams.slug)
            .eq('published', true)
            .single();
        post = data;
        
        if (post && typeof post.content === 'string') {
            try {
                post.content = JSON.parse(post.content);
            } catch (e) {
                post.content = post.content.split('\n').filter(Boolean);
            }
        }
        if (post && !Array.isArray(post.content)) {
            post.content = [];
        }
    }

    if (!post) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>Post Not Found</h1>
                </div>
                <FooterSection />
            </>
        );
    }

    // Fetch related posts (latest 3 excluding current from Supabase)
    const { data: supabaseRelated } = await supabase
        .from('blogs')
        .select('*')
        .neq('slug', resolvedParams.slug)
        .eq('published', true)
        .order('publish_date', { ascending: false })
        .limit(3);

    // Merge static related posts
    const staticRelated = BLOGS.items
        .filter((b: any) => b.slug !== resolvedParams.slug)
        .map((b: any) => ({
            ...b,
            publish_date: b.date,
            content: b.content || []
        }));

    const allRelatedRaw = [...staticRelated, ...(supabaseRelated || [])];
    const uniqueRelated = Array.from(new Map(allRelatedRaw.map((item: any) => [item.slug, item])).values());

    const related = uniqueRelated
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
        .slice(0, 3);

    return <BlogClient post={post as any} related={related as any[]} />;
}
