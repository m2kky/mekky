'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LecturesHero.module.css';

export default function LecturesHero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRefs.current, {
                y: 80, opacity: 0, duration: 1.2,
                stagger: 0.15, ease: 'expo.out', delay: 0.3,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={styles.hero}>
            <span ref={(el) => { textRefs.current[0] = el; }} className={styles.label}>
                The Stage
            </span>
            <h1 ref={(el) => { textRefs.current[1] = el; }} className={styles.title}>
                KNOWLEDGE<br />TRANSFER.
            </h1>
            <p ref={(el) => { textRefs.current[2] = el; }} className={styles.subtitle}>
                Workshops, sessions, and talks that turn complexity into clarity.
            </p>
        </section>
    );
}
