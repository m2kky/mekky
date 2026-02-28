'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import styles from '@/app/DetailPage.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectData {
    title: string;
    slug: string;
    category: string;
    description: string;
    long_description: string;
    image: string;
    color: string;
    tools: string[];
    results: string[];
}

export default function ProjectClient({ project }: { project: ProjectData }) {
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

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {/* Hero */}
                <section ref={heroRef} className={`${styles.hero} ${styles.heroDark}`}>
                    <div className={styles.heroImageWrapper}>
                        <img src={project.image} alt={project.title} className={styles.heroImage} />
                        <div className={styles.heroOverlay} />
                    </div>
                    <div className={styles.heroContent}>
                        <a href="/portfolio" className={styles.backLink} data-reveal>← Back to Portfolio</a>
                        <span className={styles.category} data-reveal>{project.category}</span>
                        <h1 className={styles.title} data-reveal>{project.title}</h1>
                        <div className={styles.meta} data-reveal>
                            {project.tools.map((tool, i) => (
                                <span key={i} className={styles.metaItem}>{tool}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Body */}
                <div className={styles.body}>
                    <div className={styles.bodyInner} ref={bodyRef}>
                        <p className={styles.bodyText}>{project.long_description}</p>

                        {/* Tools */}
                        <div className={styles.sectionBlock}>
                            <span className={styles.sectionLabel}>Tech Stack</span>
                            <div className={styles.tagsRow}>
                                {project.tools.map((tool, i) => (
                                    <span key={i} className={styles.tag}>{tool}</span>
                                ))}
                            </div>
                        </div>

                        {/* Results */}
                        <div className={styles.sectionBlock}>
                            <span className={styles.sectionLabel}>Results</span>
                            <ul className={styles.resultsList}>
                                {project.results.map((result, i) => (
                                    <li key={i} className={styles.resultItem}>
                                        <span className={styles.resultBullet}>✦</span>
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={styles.bottomCta}>
                    <p className={styles.ctaText}>Interested in working together?</p>
                    <a href={`mailto:${SITE.email}`} className={styles.ctaLink}>
                        Start a Conversation →
                    </a>
                </div>

                <FooterSection />
            </div>
        </>
    );
}
