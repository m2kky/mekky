'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Layers3, X } from 'lucide-react';
import styles from './CurrentProjectsWidget.module.css';

const STORAGE_KEY = 'mekky_current_projects_widget_closed';

const phaseItems = [
    'Phase 0 / Scope locked',
    'Phase 1 / Backend foundation',
    'Phase 2 / Admin shell next',
    'Phase 3 / Offerings management',
    'Phase 4 / Booking engine',
    'Phase 5 / Payment + calendar',
];

export default function CurrentProjectsWidget() {
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);
    const [isClosed, setIsClosed] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const isHiddenRoute =
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/login') ||
        pathname?.startsWith('/assessment') ||
        pathname?.startsWith('/rammah-project');

    useEffect(() => {
        if (isHiddenRoute) return;

        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'true') {
            return;
        }

        const timer = window.setTimeout(() => {
            setIsClosed(false);
            setIsReady(true);
        }, 650);

        return () => window.clearTimeout(timer);
    }, [isHiddenRoute]);

    const handleClose = () => {
        setIsClosing(true);

        window.setTimeout(() => {
            window.localStorage.setItem(STORAGE_KEY, 'true');
            setIsClosed(true);
            setIsClosing(false);
        }, 320);
    };

    if (isHiddenRoute || isClosed) return null;

    return (
        <aside
            className={`${styles.widget} ${isReady ? styles.isReady : ''} ${isClosing ? styles.isClosing : ''}`}
            aria-label="Current projects"
        >
            <button className={styles.closeButton} type="button" onClick={handleClose} aria-label="Close current projects widget">
                <X size={14} aria-hidden="true" />
            </button>

            <div className={styles.card}>
                <div className={styles.topLine}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    <span>Live builds</span>
                </div>

                <div className={styles.preview}>
                    <div className={styles.previewHeader}>
                        <Layers3 size={16} aria-hidden="true" />
                        <strong>Current projects</strong>
                    </div>

                    <div className={styles.phaseWindow} aria-hidden="true">
                        <div className={styles.phaseTrack}>
                            {[...phaseItems, ...phaseItems].map((phase, index) => (
                                <span key={`${phase}-${index}`}>{phase}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <Link href="/rammah-project" className={styles.primaryLink}>
                    View projects
                    <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
            </div>

            <div className={styles.madeBadge}>
                <span className={styles.badgeAvatar} aria-hidden="true">
                    <Image src="/images/mekky.png" alt="" width={28} height={28} className={styles.badgeImage} />
                </span>
                <span>Built by Mekky Systems</span>
            </div>
        </aside>
    );
}
