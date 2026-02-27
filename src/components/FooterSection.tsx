'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE, SOCIAL_LINKS } from '@/lib/constants'; 
import styles from './FooterSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FooterSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const bottomBarRef = useRef<HTMLDivElement>(null);

    const words = ["LET'S", "PLAY", "SMART."];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%', 
                }
            });

            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            })
            // السر الرابع: دخول الكلمات من الفراغ (Z-Axis)
            .from(wordsRef.current, {
                z: 400, // بتنزل من فوق الكاميرا
                opacity: 0,
                duration: 1.2,
                stagger: 0.2, // بينزلوا واحدة ورا التانية
                ease: 'expo.out',
            }, "-=0.5")
            .to(bottomBarRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
            }, "-=0.3");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={sectionRef} id="contact" className={styles.footer}>
            <div className={styles.scene}>
                
                <h3 ref={subtitleRef} className={styles.subtitle}>
                    Ready to scale?
                </h3>

                <a href={`mailto:${SITE.email}`} className={styles.staircaseLink}>
                    {words.map((word, index) => (
                        <span 
                            key={index}
                            ref={(el) => { wordsRef.current[index] = el; }}
                            className={styles.word}
                            // لو حابب تزيح الكلمات يمين أكتر زي الريفرنس
                            style={{ marginLeft: `${index * 5}vw` }}
                        >
                            {word}
                        </span>
                    ))}
                </a>

            </div>

            <div ref={bottomBarRef} className={styles.bottomBar}>
                <div className={styles.emailWrapper}>
                    <a href={`mailto:${SITE.email}`} className={styles.email}>
                        {SITE.email}
                    </a>
                </div>

                <ul className={styles.socialList}>
                    {SOCIAL_LINKS.map(link => (
                        <li key={link.label}>
                            <a href={link.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <p className={styles.copyright}>
                    © {new Date().getFullYear()} MUHAMMED MEKKY
                </p>
            </div>
        </footer>
    );
}
