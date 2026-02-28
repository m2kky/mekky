'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '@/lib/constants';
import styles from './StatsSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const textLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Text Reveal Animation (BUILD ENGINES)
            gsap.from(textLinesRef.current, {
                yPercent: 120, // بيطلع من تحت
                skewY: 5,      // ميلة خفيفة بتدي انسيابية
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            });

            // 2. Stats Reveal & Counter Animation
            statItemsRef.current.forEach((item, i) => {
                if (!item) return;
                const numberEl = numberRefs.current[i];
                const target = STATS[i].number;
                const counter = { value: 0 };

                // الأنيميشن بتاع العنصر نفسه (بيطلع لفوق)
                gsap.from(item, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: `.${styles.grid}`,
                        start: 'top 85%',
                    },
                    delay: i * 0.1 // عشان يظهروا ورا بعض (Stagger)
                });

                // الأنيميشن بتاع العداد نفسه
                if (numberEl) {
                    gsap.to(counter, {
                        value: target,
                        duration: 2.5,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: `.${styles.grid}`,
                            start: 'top 85%',
                        },
                        delay: i * 0.1,
                        onUpdate: () => {
                            numberEl.textContent = Math.round(counter.value).toString();
                        },
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.stats}>
            <div className={styles.container}>

                <div className={styles.statement}>
                    <div className={styles.lineWrapper}>
                        <p
                            ref={(el) => { textLinesRef.current[0] = el; }}
                            className="text-serif"
                        >
                            Don&apos;t just build things.
                        </p>
                    </div>
                    <div className={styles.lineWrapper}>
                        <p
                            ref={(el) => { textLinesRef.current[1] = el; }}
                            className={styles.boldText}
                        >
                            BUILD ENGINES.
                        </p>
                    </div>
                </div>

                <div className={styles.grid}>
                    {STATS.map((stat, i) => (
                        <div
                            key={i}
                            ref={(el) => { statItemsRef.current[i] = el; }}
                            className={styles.statItem}
                        >
                            <div className={styles.statNumberGroup}>
                                <span className={styles.prefix}>{('prefix' in stat ? (stat as any).prefix : '')}</span>
                                <span
                                    ref={(el) => { numberRefs.current[i] = el; }}
                                    className={styles.number}
                                >
                                    0
                                </span>
                                <span className={styles.suffix}>{stat.suffix}</span>
                            </div>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
