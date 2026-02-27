'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { TESTIMONIALS } from '@/lib/constants';
import styles from './TestimonialsSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Just doing the first testimonial massively
        const ctx = gsap.context(() => {
            if (quoteRef.current) {
                const split = new SplitType(quoteRef.current, { types: 'words' });

                gsap.fromTo(
                    split.words,
                    { color: 'rgba(255, 252, 242, 0.05)', y: 20 },
                    {
                        color: 'rgba(255, 252, 242, 1)',
                        y: 0,
                        stagger: 0.05,
                        ease: 'power1.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 50%',
                            end: 'bottom 50%',
                            scrub: 1,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const featuredTestimonial = TESTIMONIALS[0];

    return (
        <section ref={sectionRef} className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.topMeta}>
                    <span className={styles.sectionLabel}>● Client Proof</span>
                </div>

                <p ref={quoteRef} className={`${styles.quote} text-serif`}>
                    "{featuredTestimonial.quote}"
                </p>

                <div className={styles.author}>
                    <p className={styles.name}>{featuredTestimonial.author}</p>
                    <p className={styles.role}>{featuredTestimonial.role}</p>
                </div>
            </div>
        </section>
    );
}
