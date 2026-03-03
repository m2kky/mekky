'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import styles from './CaseStudyTeaser.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudyTeaser() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={styles.section} id="featured-case-study">
            <div className={styles.backgroundGlow} />
            <div ref={contentRef} className={styles.container}>

                <div className={styles.tagLabel}>FEATURED CASE STUDY</div>

                <h2 className={styles.headline}>Scaling a D2C Leather Brand via Omni-channel Optimization</h2>

                <div className={styles.storyWrapper}>
                    <p className={styles.paragraph}>
                        A leading agency was losing 40% of their sales pipeline purely because their tracking systems were broken. Leads fell into a black hole, follow-ups were entirely manual, and the sales team was operating blind.
                    </p>
                    <p className={styles.paragraph}>
                        We stepped in. We audited the chaos, mapped the entire customer journey, and deployed an iron-clad automation architecture. <strong>The result? A 40% immediate jump in close rates</strong> without spending a single extra dollar on ads.
                    </p>
                </div>

                <Link href="/case-studies" className={styles.ctaButton}>
                    READ THE FULL BREAKDOWN
                </Link>

            </div>
        </section>
    );
}
