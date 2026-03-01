"use client";

import React, { useRef } from 'react';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import styles from './EcosystemSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const logos = [
    "/assets/logos/notion.svg",
    "/assets/logos/zapier.svg",
    "/assets/logos/openai.svg",
    "/assets/logos/whatsapp.svg",
    "/assets/logos/make.svg",
    "/assets/logos/stripe.svg",
    "/assets/logos/shopify.svg",
    "/assets/logos/meta.svg",
];

export default function EcosystemSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!sectionRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>

                <div ref={textRef} className={styles.textContent}>
                    <h2 className={styles.title}>
                        YOUR ENTIRE STACK.<br />
                        <span className={styles.accent}>UNIFIED.</span>
                    </h2>
                    <p className={styles.subtitle}>
                        We integrate with the platforms you already rely on. No rewriting your entire business.
                    </p>
                </div>

                <div className={styles.marqueeWrapper}>
                    <ThreeDMarquee images={logos} />
                </div>

            </div>
        </section>
    );
}
