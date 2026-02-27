'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import styles from './Navbar.module.css';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Refs للـ GSAP
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuTitleRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. إعدادات البداية:
            // هنستخدم clip-path عشان نقفل الشاشة من تحت لفوق كأنها ستارة
            gsap.set(overlayRef.current, {
                clipPath: 'inset(0% 0% 100% 0%)',
                visibility: 'hidden'
            });

            // النصوص هتبدأ من تحت ومائلة شوية (skew) لزيادة الانسيابية
            gsap.set(menuTitleRef.current, { yPercent: 120, skewY: 5, opacity: 0 });
            gsap.set(linksRef.current, { yPercent: 120, skewY: 5, opacity: 0 });

            timeline.current = gsap.timeline({ paused: true })
                // 2. فتح الـ Overlay
                .to(overlayRef.current, {
                    clipPath: 'inset(0% 0% 0% 0%)', // يكشف الشاشة كلها
                    visibility: 'visible',
                    duration: 1.2, // مدة أطول شوية لنعومة أكتر
                    ease: 'expo.inOut', // easing قوي جداً ومميز
                })
                // 3. ظهور كلمة MENU
                .to(menuTitleRef.current, {
                    yPercent: 0,
                    skewY: 0, // تتعدل وهي طالعة
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                }, "-=0.6") // بتبدأ قبل ما الـ overlay يخلص بنص ثانية
                // 4. ظهور اللينكات
                .to(linksRef.current, {
                    yPercent: 0,
                    skewY: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                    stagger: 0.1, // التتابع بين اللينكات
                }, "-=0.7");
        });

        return () => ctx.revert();
    }, []);

    // تشغيل أو عكس الأنيميشن لما الحالة تتغير
    useEffect(() => {
        if (isMenuOpen) {
            timeline.current?.play();
        } else {
            timeline.current?.reverse();
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* ── Navbar ── */}
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <span className={styles.label}>
                        Marketing Automation Strategist<br />FOR AMBITIOUS TEAMS
                    </span>
                </div>

                <div className={styles.center}>
                    <span className={styles.logo}>MUHAMMED MEKKY</span>
                </div>

                <div className={styles.right}>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/projects" className={styles.link}>Projects</Link>

                    {/* زرار الـ Menu */}
                    <button
                        className={`${styles.menuBtn} ${isMenuOpen ? styles.menuOpen : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <div className={styles.linesContainer}>
                            <div className={styles.line1}></div>
                            <div className={styles.line2}></div>
                        </div>
                    </button>
                </div>
            </nav>

            {/* ── Fullscreen Menu Overlay ── */}
            <div
                ref={overlayRef}
                className={`${styles.overlay} ${isMenuOpen ? styles.isOpen : ''}`}
            >
                <div className={styles.overlayContent}>
                    {/* العمود الأيسر: كلمة MENU */}
                    <div>
                        <div className={styles.linkItem}>
                            <h2 ref={menuTitleRef} className={styles.menuTitle}>MENU</h2>
                        </div>
                    </div>

                    {/* العمود الأيمن: اللينكات */}
                    <div className={styles.menuLinks}>
                        {NAV_LINKS.map((item, index) => (
                            <div key={item.label} className={styles.linkItem}>
                                <Link
                                    href={item.href}
                                    className={styles.hugeLink}
                                    // تسجيل الـ ref لكل لينك عشان الـ GSAP Stagger
                                    ref={(el) => {
                                        linksRef.current[index] = el;
                                    }}
                                    onClick={() => setIsMenuOpen(false)} // يقفل المنيو لما تدوس على لينك
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
