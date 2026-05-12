import { createClient } from '@/utils/supabase/server';
import { BLOGS } from '@/lib/constants';
import BlogClient from './BlogClient';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();

    // First, check if it's a static blog from constants.ts
    const staticPost = BLOGS.items.find(b => b.slug === resolvedParams.slug);
    
    let post = null;

    if (staticPost) {
        post = {
            ...staticPost,
            publish_date: staticPost.date,
            content: staticPost.content || []
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
        .filter(b => b.slug !== resolvedParams.slug)
        .map(b => ({
            ...b,
            publish_date: b.date,
            content: b.content || []
        }));

    const allRelatedRaw = [...staticRelated, ...(supabaseRelated || [])];
    const uniqueRelated = Array.from(new Map(allRelatedRaw.map(item => [item.slug, item])).values());

    const related = uniqueRelated
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
        .slice(0, 3);

    return <BlogClient post={post as any} related={related as any[]} />;
}
