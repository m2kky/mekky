'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './PortfolioHero.module.css';

export default function PortfolioHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);
    const tapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text entrance
            gsap.from(textRefs.current, {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'expo.out',
                delay: 0.3,
            });

            // Tapes fade in
            if (tapesRef.current) {
                gsap.from(tapesRef.current, {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: 0.8,
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const tools = [
        'Shopify', 'Zapier', 'n8n', 'Meta', 'OpenAI',
        'React', 'Next.js', 'Supabase',
    ];

    const repeatedTools = [...tools, ...tools, ...tools, ...tools];

    return (
        <div ref={containerRef}>
            {/* ── Hero Text Section ── */}
            <section className={styles.hero}>
                <div className={styles.textContainer}>
                    <span
                        ref={(el) => { textRefs.current[0] = el; }}
                        className={styles.label}
                    >
                        The Archives
                    </span>

                    <h1
                        ref={(el) => { textRefs.current[1] = el; }}
                        className={styles.title}
                    >
                        PROOF OF<br />CONCEPT.
                    </h1>

                    <p
                        ref={(el) => { textRefs.current[2] = el; }}
                        className={styles.subtitle}
                    >
                        A curated selection of systems built, brands scaled, and workflows automated.
                    </p>
                </div>
            </section>

            {/* ── Intersecting Tapes Band — Below Hero ── */}
            <section ref={tapesRef} className={styles.tapesSection}>
                <div className={styles.tapesContainer}>
                    {/* Tape 1 — scrolls left */}
                    <div className={`${styles.tape} ${styles.tape1}`}>
                        <div className={styles.trackLeft}>
                            {repeatedTools.map((tool, i) => (
                                <span key={`t1-${i}`}>
                                    <span className={styles.logoItem}>{tool}</span>
                                    <span className={styles.separator}> ✦ </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tape 2 — scrolls right */}
                    <div className={`${styles.tape} ${styles.tape2}`}>
                        <div className={styles.trackRight}>
                            {repeatedTools.map((tool, i) => (
                                <span key={`t2-${i}`}>
                                    <span className={styles.logoItem}>{tool}</span>
                                    <span className={styles.separator}> ✦ </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
