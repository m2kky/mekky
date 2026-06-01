'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import styles from './BlogPost.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface BlogData {
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    content: string[];
    publish_date: string;
}

function ShareRow({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const copy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share</span>
            <button onClick={copy} className={styles.shareBtn}>{copied ? '✓ Copied' : '🔗 Link'}</button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url ? encodeURIComponent(url) : ''}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>𝕏 Twitter</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url ? encodeURIComponent(url) : ''}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>in LinkedIn</a>
        </div>
    );
}

export default function BlogClient({ post, related }: { post: BlogData, related: BlogData[] }) {
    const heroRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    // Arabic detection
    const isArabic = /[\u0600-\u06FF]/.test(post.title + post.content.join(' '));
    const dir = isArabic ? 'rtl' : 'ltr';
    const textAlign = isArabic ? 'right' : 'left';

    // Reading progress bar + word count
    const wordCount = post.content.join(' ').split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    const displayDate = new Date(post.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(heroRef.current!.querySelectorAll('[data-reveal]'), {
                y: 60, opacity: 0, duration: 1.2,
                stagger: 0.12, ease: 'expo.out', delay: 0.1,
            });
            if (bodyRef.current) {
                gsap.from(bodyRef.current.children, {
                    y: 40, opacity: 0, duration: 1,
                    stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
                });
            }
        }, heroRef);

        // Reading progress
        const onScroll = () => {
            if (!progressRef.current) return;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / total) * 100;
            progressRef.current.style.width = `${progress}%`;
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            ctx.revert();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <>
            {/* Reading progress bar */}
            <div className={styles.progressBar} ref={progressRef} />
            <Navbar />

            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header (Title, Meta) */}
                <header ref={heroRef} className={styles.articleHeader} dir={dir}>
                    <a href="/blog" className={styles.backLink} data-reveal>← Back to Blog</a>
                    <div className={styles.heroMeta} data-reveal>
                        <span className={styles.date}>{displayDate}</span>
                        <span className={styles.readTime}>· {readTime} {isArabic ? 'دقائق قراءة' : 'min read'}</span>
                    </div>
                    <h1 className={styles.title} data-reveal style={{ textAlign }}>{post.title}</h1>
                    <div data-reveal>
                        <ShareRow title={post.title} />
                    </div>
                </header>

                {/* Cover Image */}
                <div className={styles.coverImageWrapper} style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto 3rem', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden' }}>
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 1200px) 100vw, 1200px" style={{ objectFit: 'cover' }} priority />
                </div>

                {/* Article body */}
                <div className={styles.articleLayout} dir={dir}>
                    <div className={styles.articleBody} ref={bodyRef}>
                        {post.content.map((paragraph, i) => {
                            // Simple heuristic to style "Conclusion:" or "الخلاصة:" differently
                            const isHeadingLike = paragraph.startsWith('الخلاصة:') || paragraph.split(' ').length < 10;
                            return (
                                <p 
                                    key={i} 
                                    id={`section-${i}`}
                                    className={styles.paragraph} 
                                    style={{ 
                                        textAlign, 
                                        color: isHeadingLike ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        fontWeight: isHeadingLike ? '600' : '400',
                                        fontSize: isHeadingLike ? '1.35rem' : undefined
                                    }}
                                >
                                    {paragraph}
                                </p>
                            );
                        })}

                        {/* Bottom share */}
                        <div className={styles.bottomShare} style={{ textAlign }}>
                            <p className={styles.bottomShareText}>{isArabic ? 'هل وجدت هذا مفيداً؟ شاركه.' : 'Found this useful? Share it.'}</p>
                            <ShareRow title={post.title} />
                        </div>
                    </div>

                    {/* Sidebar TOC */}
                    <aside className={styles.tocSidebar} style={{ textAlign }}>
                        <div className={styles.tocCard}>
                            <span className={styles.tocLabel}>{isArabic ? 'في هذا المقال' : 'In This Article'}</span>
                            <ul className={styles.tocList}>
                                {post.content.map((p, i) => {
                                    // Extract first 3-4 words for TOC
                                    const words = p.split(' ');
                                    const tocLabel = words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
                                    return (
                                        <li key={i} className={styles.tocItem}>
                                            <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                                            <a href={`#section-${i}`} className={styles.tocText} style={{ textDecoration: 'none' }}>
                                                {tocLabel}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={styles.readTimeBadge}>
                                🕐 {readTime} {isArabic ? 'دقيقة قراءة' : 'min read'}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                    <section className={styles.relatedSection} dir={dir}>
                        <span className={styles.relatedLabel} style={{ textAlign }}>{isArabic ? '● مقالات أخرى' : '● More Articles'}</span>
                        <h2 className={styles.relatedHeading} style={{ textAlign }}>{isArabic ? 'تابع القراءة.' : 'KEEP READING.'}</h2>
                        <div className={styles.relatedGrid}>
                            {related.map((r) => {
                                const rDate = new Date(r.publish_date).toLocaleDateString();
                                const rIsArabic = /[\u0600-\u06FF]/.test(r.title + r.excerpt);
                                return (
                                    <a key={r.slug} href={`/blog/${r.slug}`} className={styles.relatedCard} dir={rIsArabic ? 'rtl' : 'ltr'}>
                                        <div className={styles.relatedImg}>
                                            <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                                        </div>
                                        <div className={styles.relatedInfo}>
                                            <span className={styles.relatedDate}>{rDate}</span>
                                            <h3 className={styles.relatedTitle} style={{ textAlign: rIsArabic ? 'right' : 'left' }}>{r.title}</h3>
                                            <p className={styles.relatedExcerpt} style={{ textAlign: rIsArabic ? 'right' : 'left' }}>{r.excerpt}</p>
                                            <span className={styles.relatedLink} style={{ textAlign: rIsArabic ? 'right' : 'left' }}>
                                                {rIsArabic ? 'اقرأ المقال ←' : 'Read Article →'}
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                )}

                <BlogNewsletter />
                <FooterSection />
            </div>
        </>
    );
}
