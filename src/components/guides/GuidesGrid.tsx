'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import styles from './GuidesGrid.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface GuideData {
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    publish_date: string;
}

export default function GuidesGrid({ items = [] }: { items?: GuideData[] }) {
    const gridRef = useRef<HTMLDivElement>(null);

    if (items.length === 0) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', textAlign: 'center' }}>No guides available at the moment. Please check back later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.topRow}>
                    <span className={styles.label}>Technical Resource Center</span>
                    <p className={styles.meta}>{items.length} Documents</p>
                </div>

                <div ref={gridRef} className={styles.grid}>
                    {items.map((post, i) => {
                        const displayDate = new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                        return (
                            <Reveal key={post.slug} delay={i * 0.1}>
                                <a href={`/guides/${post.slug}`} className={styles.card}>
                                    <div className={styles.imageBox}>
                                        <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                                        <span className={styles.dateBadge}>{displayDate}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.cardTitle}>{post.title}</h3>
                                        <p className={styles.excerpt}>{post.excerpt}</p>
                                        <span className={styles.cardLink}>Read Guide</span>
                                    </div>
                                </a>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
