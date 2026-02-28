'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOGS } from '@/lib/constants';
import styles from './BlogGrid.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function BlogGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [featured, ...rest] = BLOGS.items;

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Featured card reveal
            if (featuredRef.current) {
                gsap.from(featuredRef.current, {
                    y: 60, opacity: 0, duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
                });

                // Parallax on featured image
                const img = featuredRef.current.querySelector(`.${styles.featuredImage}`);
                if (img) {
                    gsap.to(img, {
                        yPercent: 12, ease: 'none',
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: 'top bottom', end: 'bottom top', scrub: true,
                        },
                    });
                }
            }

            // Grid cards stagger
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    y: 50, opacity: 0, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%' },
                    delay: i * 0.08,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Featured Post */}
            <div ref={featuredRef} className={styles.featured}>
                <div className={styles.featuredImageWrapper}>
                    <img
                        src={featured.image}
                        alt={featured.title}
                        className={styles.featuredImage}
                    />
                </div>
                <div className={styles.featuredContent}>
                    <span className={styles.featuredDate}>{featured.date}</span>
                    <h2 className={styles.featuredTitle}>{featured.title}</h2>
                    <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                    <a href={`/blog/${featured.slug}`} className={styles.readLink}>
                        Read Article <span className={styles.arrow}>→</span>
                    </a>
                </div>
            </div>

            {/* Remaining Posts */}
            <div className={styles.grid}>
                {rest.map((post, i) => (
                    <a
                        key={i}
                        href={`/blog/${post.slug}`}
                        ref={(el) => { cardsRef.current[i] = el as HTMLDivElement | null; }}
                        className={styles.card}
                    >
                        <div className={styles.cardImageWrapper}>
                            <img
                                src={post.image}
                                alt={post.title}
                                className={styles.cardImage}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <span className={styles.cardDate}>{post.date}</span>
                            <h3 className={styles.cardTitle}>{post.title}</h3>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
