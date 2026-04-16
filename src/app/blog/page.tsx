import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { createClient } from '@/utils/supabase/server';

export const metadata = { title: "Insights & Blog | Muhammed Mekky", description: "Articles and insights on marketing automation, AI tools, web development, and digital scaling strategies." };

/* Static articles that live as standalone pages (not in Supabase) */
const STATIC_ARTICLES = [
    {
        title: 'الجانب المظلم للـ AI: هجمات Prompt Injection',
        slug: 'prompt-injection',
        excerpt: 'مع هوجة تحديثات الـ AI اللي مفيش استفادة حقيقية منها غير للي فاهم... تعالى نتكلم عن الجانب المظلم. Prompt Injection Attacks.',
        image: '/images/blog/prompt-injection-hero.png',
        publish_date: '2026-04-17',
    },
];

export default async function BlogPage() {
    const supabase = await createClient();
    const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('publish_date', { ascending: false });

    // Merge static articles with Supabase data, sorted by date (newest first)
    const allPosts = [...STATIC_ARTICLES, ...(blogs || [])]
        .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <BlogHero />
                <BlogGrid items={allPosts} />
                <BlogNewsletter />
                <FooterSection />
            </div>

        </>
    );
}
