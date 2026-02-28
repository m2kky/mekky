'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LecturesImpact.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LecturesImpact() {
    const sectionRef = useRef<HTMLElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const elementsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Reveal animation
            gsap.from(elementsRef.current, {
                y: 40, opacity: 0, duration: 1,
                stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            });

            // Counter animation
            if (numberRef.current) {
                const counter = { value: 0 };
                gsap.to(counter, {
                    value: 2400,
                    duration: 2.5,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    onUpdate: () => {
                        if (numberRef.current) {
                            numberRef.current.textContent = Math.round(counter.value).toLocaleString();
                        }
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <span ref={(el) => { elementsRef.current[0] = el; }} className={styles.label}>
                    And counting
                </span>
                <div ref={(el) => { elementsRef.current[1] = el; }}>
                    <span ref={numberRef} className={styles.number}>0</span>
                    <span className={styles.suffix}>+</span>
                </div>
                <p ref={(el) => { elementsRef.current[2] = el; }} className={styles.description}>
                    People impacted through workshops, sessions, and mentorship programs.
                </p>
            </div>
        </section>
    );
}
