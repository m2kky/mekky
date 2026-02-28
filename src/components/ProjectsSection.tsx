'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';
import styles from './ProjectsSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Parallax on images
            gsap.utils.toArray(`.${styles.imageWrapper}`).forEach((img: any) => {
                gsap.to(img.querySelector('img'), {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className={styles.projects}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>SELECTED<br />WORK</h2>
                    <span className={styles.sectionNumber}>({PROJECTS.sectionNumber})</span>
                </div>

                <div className={styles.list}>
                    {PROJECTS.items.map((project, i) => (
                        <Link href={`/portfolio/${project.slug}`} key={i} className={styles.projectRow}>
                            <div className={styles.projectInfo}>
                                <span className={styles.projectIndex}>0{i + 1}</span>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <span className={styles.projectCategory}>{project.category}</span>
                                <p className={styles.projectDesc}>{project.description}</p>
                                <div className={styles.viewBtn}>View Project —</div>
                            </div>

                            <div className={styles.imageWrapper}>
                                <div className={styles.imageBlocker} style={{ backgroundColor: project.color }}></div>
                                <img src={project.image} alt={project.title} className={styles.image} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
