import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('guides')
        .select('title, excerpt, image')
        .eq('slug', resolvedParams.slug)
        .eq('published', true)
        .single();

    if (!post) {
        return { title: 'Guide Not Found' };
    }

    return {
        title: `${post.title} | Technical Guides`,
        description: post.excerpt,
    };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('guides')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .eq('published', true)
        .single();

    if (!post) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                    <h1 style={{ color: '#0f0', fontFamily: 'monospace', fontSize: '3rem' }}>&gt; ERROR: 404_NOT_FOUND</h1>
                </div>
                <FooterSection />
            </>
        );
    }

    // Parse content
    let contentArray: string[] = [];
    if (typeof post.content === 'string') {
        try {
            contentArray = JSON.parse(post.content);
        } catch {
            contentArray = post.content.split('\n').filter(Boolean);
        }
    } else if (Array.isArray(post.content)) {
        contentArray = post.content;
    }

    const displayDate = new Date(post.publish_date).toLocaleDateString();

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, backgroundColor: '#050505', color: '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '18vh', paddingBottom: '10vh', paddingLeft: '5%', paddingRight: '5%' }}>
                    
                    <Link href="/guides" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '3rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                        ← Back to Guides
                    </Link>

                    <header style={{ marginBottom: '4rem' }}>
                        <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Published {displayDate}</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.2, color: '#fff', margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
                            {post.title}
                        </h1>
                    </header>

                    {post.image && (
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', marginBottom: '5rem', borderRadius: '12px', overflow: 'hidden' }}>
                            <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover', filter: 'brightness(0.8)' }} />
                        </div>
                    )}

                    <article style={{ fontSize: '1.25rem', lineHeight: 1.8, opacity: 0.85, color: '#e0e0e0' }}>
                        {contentArray.map((p, i) => (
                            <p key={i} style={{ marginBottom: '2rem' }}>
                                {p}
                            </p>
                        ))}
                    </article>

                    <div style={{ marginTop: '8rem', padding: '4rem 3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Need assistance with implementation?</h3>
                        <p style={{ marginBottom: '3rem', fontSize: '1.1rem', opacity: 0.6, maxWidth: '500px', margin: '0 auto 3rem' }}>
                            Let our team help you deploy this architecture seamlessly into your own business infrastructure.
                        </p>
                        <Link href="/book" style={{ display: 'inline-block', padding: '1.2rem 3rem', backgroundColor: '#fff', color: '#000', textDecoration: 'none', fontWeight: 700, borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Book a Consultation
                        </Link>
                    </div>

                </div>
            </div>
            <FooterSection />
        </>
    );
}
