'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './InteractiveServicesList.module.css';

interface Service {
    title: string;
    slug: string;
    icon: string;
    image: string;
    description: string;
}

export default function InteractiveServicesList({ services }: { services: Service[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);
    const [activeSlug, setActiveSlug] = useState<string | null>(null);

    // Mouse tracking for floating image
    useEffect(() => {
        const container = containerRef.current;
        const float = floatRef.current;
        if (!container || !float) return;

        // GSAP QuickTo for high performance mouse tracking
        const xTo = gsap.quickTo(float, "left", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(float, "top", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animate visibility of floating container
    useEffect(() => {
        const float = floatRef.current;
        if (!float) return;

        if (activeSlug) {
            gsap.to(float, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(float, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "power2.in"
            });
        }
    }, [activeSlug]);

    return (
        <div className={styles.listContainer} ref={containerRef}>
            {/* The list of services */}
            {services.map((service) => (
                <Link 
                    href={`/services/${service.slug}`} 
                    key={service.slug}
                    className={styles.serviceRow}
                    onMouseEnter={() => setActiveSlug(service.slug)}
                    onMouseLeave={() => setActiveSlug(null)}
                >
                    <h2 className={styles.serviceTitle}>
                        <span 
                            className={styles.serviceIcon} 
                            dangerouslySetInnerHTML={{ __html: service.icon }} 
                        />
                        {service.title}
                    </h2>
                    <div className={styles.serviceArrow}>↗</div>
                </Link>
            ))}

            {/* The floating image container */}
            <div className={styles.floatingImageContainer} ref={floatRef}>
                {services.map((service) => (
                    <img 
                        key={`img-${service.slug}`}
                        src={service.image} 
                        alt={service.title}
                        className={`${styles.floatingImage} ${activeSlug === service.slug ? styles.active : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
