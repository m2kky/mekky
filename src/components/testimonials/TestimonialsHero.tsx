'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './TestimonialsHero.module.css';

export default function TestimonialsHero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRefs.current, {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'expo.out',
                delay: 0.3,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={styles.hero}>
            <span ref={(el) => { textRefs.current[0] = el; }} className={styles.label}>
                The Voices
            </span>
            <h1 ref={(el) => { textRefs.current[1] = el; }} className={styles.title}>
                WHAT THEY<br />SAY.
            </h1>
            <p ref={(el) => { textRefs.current[2] = el; }} className={styles.subtitle}>
                Real words from real people who trusted the process.
            </p>
        </section>
    );
}
