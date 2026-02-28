'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '@/lib/constants';
import styles from './PortfolioCaseStudies.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioCaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // Number slides in from left
                const number = card.querySelector(`.${styles.cardNumber}`);
                if (number) {
                    gsap.from(number, {
                        x: -80,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        },
                    });
                }

                // Content rises up
                const content = card.querySelector(`.${styles.cardContent}`);
                if (content) {
                    gsap.from(content, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        delay: 0.15,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>Case Studies</h2>
                <span className={styles.sectionLabel}>Deep Dives</span>
            </div>

            <div className={styles.cardsContainer}>
                {CASE_STUDIES.items.map((study, i) => (
                    <div
                        key={i}
                        ref={(el) => { cardsRef.current[i] = el; }}
                        className={styles.card}
                    >
                        <span className={styles.cardNumber}>
                            {String(i + 1).padStart(2, '0')}
                        </span>

                        <div className={styles.cardContent}>
                            <span className={styles.cardCategory}>
                                {study.category}
                            </span>
                            <h3 className={styles.cardTitle}>{study.title}</h3>
                            <p className={styles.cardDescription}>
                                {study.description}
                            </p>
                            <a
                                href={`/case-studies/${study.slug}`}
                                className={styles.cardLink}
                            >
                                Read Full Case Study{' '}
                                <span className={styles.cardLinkArrow}>→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
