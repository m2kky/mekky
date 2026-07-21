'use client';

import { useRef, useState } from 'react';
import CourseLanding from './CourseLanding';
import WaitlistWizard from './WaitlistWizard';
import styles from './PromptToProduct.module.css';

export default function PromptToProductClient() {
  const [started, setStarted] = useState(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const startWaitlist = () => {
    setStarted(true);
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      waitlistRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  };

  return (
    <main className={styles.page} dir="rtl">
      <CourseLanding onJoinWaitlist={startWaitlist} />
      <div className={styles.waitlistAnchor} id="waitlist" ref={waitlistRef}>
        <WaitlistWizard active={started} onActivate={startWaitlist} />
      </div>
    </main>
  );
}
