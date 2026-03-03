'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './TechStackSection.module.css';

const TOOLS = [
    { name: 'Notion', logo: '/images/logos/notion.svg' },
    { name: 'Supabase', logo: '/images/logos/supabase.svg' },
    { name: 'HubSpot', logo: '/images/logos/hubspot.svg' },
    { name: 'Zapier', logo: '/images/logos/zapier.svg' },
    { name: 'n8n', logo: '/images/logos/n8n.svg' },
    { name: 'Hostinger', logo: '/images/logos/hostinger.svg' },
    { name: 'WhatsApp', logo: '/images/logos/whatsapp.svg' },
    { name: 'Meta', logo: '/images/logos/meta.svg' },
    { name: 'Shopify', logo: '/images/logos/shopify.svg' },
    { name: 'Cloudflare', logo: '/images/logos/cloudflare.svg' },
    { name: 'GitHub', logo: '/images/logos/github.svg' },
    { name: 'Vercel', logo: '/images/logos/vercel.svg' },
    { name: 'ClickUp', logo: '/images/logos/clickup.svg' },
    { name: 'Slack', logo: '/images/logos/slack.svg' },
    { name: 'Calendar', logo: '/images/logos/calendar.svg' },
];

export default function TechStackSection() {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // First row moves left
            if (row1Ref.current) {
                gsap.to(row1Ref.current, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 30, // Adjust speed
                    repeat: -1,
                });
            }

            // Second row moves right
            if (row2Ref.current) {
                // To make it move right smoothly, we start it at -50% and move it to 0%
                gsap.set(row2Ref.current, { xPercent: -50 });
                gsap.to(row2Ref.current, {
                    xPercent: 0,
                    ease: 'none',
                    duration: 35, // Slightly different speed for variation
                    repeat: -1,
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Split tools into two rows for visual balance
    const row1Tools = TOOLS.slice(0, 8);
    const row2Tools = TOOLS.slice(8);

    return (
        <section className={styles.section} id="tech-stack">
            <div className={styles.container}>
                <h2 className={styles.headline}>I make these tools talk to each other finally.</h2>

                <div className={styles.marqueeContainer}>
                    <div className={styles.glow} />

                    {/* Row 1 */}
                    <div className={styles.rowWrapper}>
                        <div ref={row1Ref} className={styles.rowContent}>
                            {[...row1Tools, ...row1Tools, ...row1Tools].map((tool, index) => (
                                <div key={`row1-${tool.name}-${index}`} className={styles.logoWrapper}>
                                    <div className={styles.logoBox}>
                                        <Image
                                            src={tool.logo}
                                            alt={tool.name}
                                            width={100}
                                            height={40}
                                            className={styles.logoImage}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className={styles.rowWrapper}>
                        <div ref={row2Ref} className={styles.rowContent}>
                            {[...row2Tools, ...row2Tools, ...row2Tools].map((tool, index) => (
                                <div key={`row2-${tool.name}-${index}`} className={styles.logoWrapper}>
                                    <div className={styles.logoBox}>
                                        <Image
                                            src={tool.logo}
                                            alt={tool.name}
                                            width={100}
                                            height={40}
                                            className={styles.logoImage}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
