'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LECTURES, SITE } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import styles from './LectureDetail.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LectureDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const lecture = LECTURES.find((l) => l.slug === slug);
    const contentRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const topicsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;
        const ctx = gsap.context(() => {
            // Main content reveal
            gsap.from(contentRef.current!.querySelectorAll('[data-reveal]'), {
                y: 40, opacity: 0, duration: 1,
                stagger: 0.1, ease: 'power3.out', delay: 0.3,
            });

            // Sidebar reveal
            if (sidebarRef.current) {
                gsap.from(sidebarRef.current, {
                    y: 30, opacity: 0, duration: 1,
                    ease: 'power3.out', delay: 0.5,
                });
            }

            // Topics stagger
            if (topicsRef.current) {
                gsap.from(topicsRef.current.children, {
                    x: -30, opacity: 0, duration: 0.8,
                    stagger: 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: topicsRef.current, start: 'top 85%' },
                });
            }
        }, contentRef);
        return () => ctx.revert();
    }, []);

    if (!lecture) {
        return (
            <>
                <Navbar />
                <div className={styles.notFound}>
                    <h1 className={styles.notFoundTitle}>Lecture Not Found</h1>
                </div>
                <FooterSection />
            </>
        );
    }

    const driveEmbedUrl = `https://drive.google.com/file/d/${lecture.videoId}/preview`;

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {/* Video Hero — Full-width Google Drive embed */}
                <div className={styles.videoHero}>
                    <div className={styles.videoWrapper}>
                        <iframe
                            src={driveEmbedUrl}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={lecture.title}
                        />
                    </div>
                </div>

                {/* Content Layout — 2 columns (Coursera-style) */}
                <div className={styles.contentLayout} ref={contentRef}>
                    {/* Main Column */}
                    <div className={styles.mainColumn}>
                        <a href="/lectures" className={styles.backLink} data-reveal>
                            ← Back to Lectures
                        </a>

                        <div className={styles.headerBlock} data-reveal>
                            <span className={styles.workshopBadge}>
                                🎓 Workshop · {lecture.duration}
                            </span>
                            <h1 className={styles.title}>{lecture.title}</h1>
                        </div>

                        {/* Description */}
                        <div className={styles.descriptionBlock} data-reveal>
                            <span className={styles.sectionLabel}>About This Workshop</span>
                            <p className={styles.descriptionText}>{lecture.longDescription}</p>
                        </div>

                        {/* Curriculum / Topics */}
                        <div className={styles.curriculumBlock} data-reveal>
                            <span className={styles.sectionLabel}>
                                What You&apos;ll Learn · {lecture.topics.length} Topics
                            </span>
                            <div className={styles.topicsList} ref={topicsRef}>
                                {lecture.topics.map((topic, i) => (
                                    <div key={i} className={styles.topicItem}>
                                        <span className={styles.topicNumber}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className={styles.topicIcon}>📋</span>
                                        <span className={styles.topicName}>{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar} ref={sidebarRef}>
                        <div className={styles.sidebarCard}>
                            <h3 className={styles.sidebarTitle}>Workshop Details</h3>

                            <div className={styles.metaList}>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaIcon}>⏱️</span>
                                    <span className={styles.metaLabel}>Duration</span>
                                    <span className={styles.metaValue}>{lecture.duration}</span>
                                </div>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaIcon}>📚</span>
                                    <span className={styles.metaLabel}>Topics</span>
                                    <span className={styles.metaValue}>{lecture.topics.length} Modules</span>
                                </div>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaIcon}>🎯</span>
                                    <span className={styles.metaLabel}>Level</span>
                                    <span className={styles.metaValue}>All Levels</span>
                                </div>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaIcon}>🌐</span>
                                    <span className={styles.metaLabel}>Language</span>
                                    <span className={styles.metaValue}>Arabic</span>
                                </div>
                            </div>

                            <a href={`mailto:${SITE.email}`} className={styles.ctaButton}>
                                Book This Workshop →
                            </a>

                            <a
                                href={`https://drive.google.com/file/d/${lecture.videoId}/view`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaButtonOutline}
                            >
                                Watch Full Recording
                            </a>

                            {/* Instructor */}
                            <div className={styles.instructorCard}>
                                <img
                                    src="/images/avatar.png"
                                    alt="Muhammed Mekky"
                                    className={styles.instructorAvatar}
                                />
                                <div className={styles.instructorInfo}>
                                    <span className={styles.instructorName}>Muhammed Mekky</span>
                                    <span className={styles.instructorRole}>
                                        Automation Strategist & Trainer
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterSection />
            </div>
        </>
    );
}
