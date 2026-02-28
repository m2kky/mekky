'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/constants';
import styles from './BlogNewsletter.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function BlogNewsletter() {
    const sectionRef = useRef<HTMLElement>(null);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current!.querySelector(`.${styles.box}`), {
                y: 60, opacity: 0, duration: 1.4,
                ease: 'expo.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <h2 className={styles.title}>STAY UPDATED.</h2>
                    <p className={styles.desc}>
                        Weekly insights on systems, automation, and performance marketing.
                        Zero spam.
                    </p>
                </div>
                {sent ? (
                    <div className={styles.success}>✦ Welcome to the circle.</div>
                ) : (
                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                        <input type="email" placeholder="email@example.com" className={styles.input} required />
                        <button type="submit" className={styles.btn}>Join Now →</button>
                    </form>
                )}
            </div>
        </section>
    );
}
