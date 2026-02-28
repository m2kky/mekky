'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOGS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import styles from '@/app/DetailPage.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = BLOGS.items.find((p) => p.slug === slug);
    const heroRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(heroRef.current!.querySelectorAll('[data-reveal]'), {
                y: 60, opacity: 0, duration: 1.2,
                stagger: 0.12, ease: 'expo.out', delay: 0.2,
            });
            if (bodyRef.current) {
                gsap.from(bodyRef.current.children, {
                    y: 40, opacity: 0, duration: 1,
                    stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
                });
            }
        }, heroRef);
        return () => ctx.revert();
    }, []);

    if (!post) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>
                        Post Not Found
                    </h1>
                </div>
                <FooterSection />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {/* Hero */}
                <section ref={heroRef} className={`${styles.hero} ${styles.heroDark}`}>
                    <div className={styles.heroImageWrapper}>
                        <img src={post.image} alt={post.title} className={styles.heroImage} />
                        <div className={styles.heroOverlay} />
                    </div>
                    <div className={styles.heroContent}>
                        <a href="/blog" className={styles.backLink} data-reveal>← Back to Blog</a>
                        <span className={styles.category} data-reveal>{post.date}</span>
                        <h1 className={styles.title} data-reveal>{post.title}</h1>
                    </div>
                </section>

                {/* Article Body */}
                <div className={styles.body}>
                    <div className={styles.bodyInner} ref={bodyRef}>
                        {post.content.map((paragraph, i) => (
                            <p key={i} className={styles.bodyText}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={styles.bottomCta}>
                    <p className={styles.ctaText}>Found this useful? More insights coming soon.</p>
                    <a href="/blog" className={styles.ctaLink}>
                        Read More Articles →
                    </a>
                </div>

                <FooterSection />
            </div>
        </>
    );
}
