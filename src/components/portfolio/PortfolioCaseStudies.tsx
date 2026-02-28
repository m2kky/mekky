'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '@/lib/constants';
import Reveal from '@/components/ui/Reveal';
import styles from './PortfolioCaseStudies.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function PortfolioCaseStudies() {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listRef.current) return;
        const ctx = gsap.context(() => {
            const cards = listRef.current!.querySelectorAll(`.${styles.card}`);
            cards.forEach((card, i) => {
                const number = card.querySelector(`.${styles.num}`);
                const image = card.querySelector(`.${styles.imageWrapper}`);

                // Image parallax
                if (image) {
                    gsap.fromTo(image.querySelector('img'),
                        { scale: 1.2, yPercent: -10 },
                        {
                            scale: 1,
                            yPercent: 10,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: image,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            }
                        }
                    );
                }
            });
        }, listRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Reveal>
                        <span className={styles.sectionLabel}>● Proven Results</span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className={styles.sectionTitle}>CASE STUDIES.</h2>
                    </Reveal>
                </div>

                <div ref={listRef} className={styles.cardsContainer}>
                    {CASE_STUDIES.items.map((cs, i) => (
                        <Reveal key={cs.slug} delay={i * 0.1}>
                            <a href={`/case-studies/${cs.slug}`} className={styles.card}>
                                <span className={styles.cardNumber}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className={styles.cardContent}>
                                    <span className={styles.cardCategory}>● Case Study</span>
                                    <h3 className={styles.cardTitle}>{cs.title}</h3>
                                    <p className={styles.cardDescription}>{cs.description}</p>

                                    <span className={styles.cardLink}>
                                        View Full Breakdown
                                        <span className={styles.cardLinkArrow}> →</span>
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
