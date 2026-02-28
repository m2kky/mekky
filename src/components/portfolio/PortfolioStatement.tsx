'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PortfolioStatement.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioStatement() {
    const sectionRef = useRef<HTMLElement>(null);
    const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(linesRef.current, {
                yPercent: 120,
                skewY: 4,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Section number */}
            <span className={styles.sectionNumber}>(05)</span>

            {/* Side annotation */}
            <span className={styles.sideNote}>
                <span className={styles.dot} />
                I architect from lived experience
            </span>

            {/* Giant statement */}
            <div className={styles.textWrapper}>
                <div className={styles.lineWrapper}>
                    <p
                        ref={(el) => { linesRef.current[0] = el; }}
                        className={styles.statementLine}
                    >
                        I DON&apos;T
                    </p>
                </div>
                <div className={styles.lineWrapper}>
                    <p
                        ref={(el) => { linesRef.current[1] = el; }}
                        className={styles.statementLine}
                    >
                        THEORIZE.
                    </p>
                </div>
                <div className={styles.lineWrapper}>
                    <p
                        ref={(el) => { linesRef.current[2] = el; }}
                        className={`${styles.statementLine} ${styles.bold}`}
                    >
                        I BUILD.
                    </p>
                </div>
            </div>
        </section>
    );
}
