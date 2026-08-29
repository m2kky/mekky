'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/app/speeddesigning/SpeedDesigning.module.css';

const INTRO_KEY = 'speed-designing-intro-seen-v1';

export default function SeriesIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      if (reducedMotion || window.sessionStorage.getItem(INTRO_KEY)) return;
      window.sessionStorage.setItem(INTRO_KEY, 'true');
    } catch {
      if (reducedMotion) return;
    }

    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const hideTimer = window.setTimeout(() => setVisible(false), 1900);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.intro} aria-label="Muhammed Mekky Studio intro">
      <p>Muhammed Mekky Studio presents</p>
      <Image
        src="/speeddesigning/brand/compact.webp"
        alt="Muhammed Mekky"
        width={900}
        height={261}
        priority
      />
      <button type="button" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  );
}
