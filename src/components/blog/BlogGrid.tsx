'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOGS } from '@/lib/constants';
import Reveal from '@/components/ui/Reveal';
import styles from './BlogGrid.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function BlogGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        const ctx = gsap.context(() => {
            const cards = gridRef.current!.querySelectorAll(`.${styles.card}`);

            cards.forEach((card) => {
                const img = card.querySelector(`.${styles.imageBox} img`);
                if (img) {
                    gsap.to(img, {
                        yPercent: 10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    });
                }
            });
        }, gridRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.topRow}>
                    <span className={styles.label}>● Recent Insights</span>
                    <p className={styles.meta}>Total {BLOGS.items.length} articles</p>
                </div>

                {/* Featured Post - First Item */}
                <div className={styles.featured}>
                    <Reveal delay={0.2}>
                        <a href={`/blog/${BLOGS.items[0].slug}`} className={styles.featuredCard}>
                            <div className={styles.featuredImgWrapper}>
                                <img src={BLOGS.items[0].image} alt={BLOGS.items[0].title} />
                            </div>
                            <div className={styles.featuredContent}>
                                <span className={styles.fLabel}>⭐ Featured Post</span>
                                <h2 className={styles.fTitle}>{BLOGS.items[0].title}</h2>
                                <p className={styles.fExcerpt}>{BLOGS.items[0].excerpt}</p>
                                <span className={styles.fLink}>Read Article →</span>
                            </div>
                        </a>
                    </Reveal>
                </div>

                {/* Grid - Rest of Items */}
                <div ref={gridRef} className={styles.grid}>
                    {BLOGS.items.slice(1).map((post, i) => (
                        <Reveal key={post.slug} delay={i * 0.1}>
                            <a href={`/blog/${post.slug}`} className={styles.card}>
                                <div className={styles.imageBox}>
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                    <span className={styles.dateBadge}>{post.date}</span>
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.excerpt}>{post.excerpt}</p>
                                    <span className={styles.cardLink}>Read More +</span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
