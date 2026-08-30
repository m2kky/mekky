'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './EhsanExperience.module.css';

type WorkingSystemIntroProps = {
  onComplete: () => void;
};

export default function WorkingSystemIntro({ onComplete }: WorkingSystemIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(false);

  const finish = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    document.documentElement.classList.remove('ehsan-intro-locked');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    completeRef.current = false;
    document.documentElement.classList.add('ehsan-intro-locked');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    let cancelled = false;
    let started = false;
    let context: gsap.Context | undefined;

    const start = () => {
      if (cancelled || started) return;
      started = true;
      context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
          .from('[data-intro-studio]', { autoAlpha: 0, y: 10, duration: 0.32 })
          .from('[data-intro-word]', { autoAlpha: 0, yPercent: 115, duration: 0.38, stagger: 0.13 }, 0.16)
          .to('[data-intro-word]', { autoAlpha: 0, yPercent: -75, duration: 0.28, stagger: 0.05 }, 1.18)
          .fromTo('[data-intro-thesis]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 1.38)
          .fromTo('[data-intro-route]', { scaleX: 0 }, { scaleX: 1, duration: 0.46 }, 1.52)
          .fromTo('[data-intro-curtain]', { scaleY: 0 }, { scaleY: 1, duration: 0.54, ease: 'power4.inOut' }, 2.08)
          .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.58, ease: 'power4.inOut', onComplete: finish }, 2.55);
      }, root);
    };

    const fontFallback = window.setTimeout(start, 350);
    document.fonts.ready.then(start).catch(start);
    const safety = window.setTimeout(finish, 4200);

    return () => {
      cancelled = true;
      window.clearTimeout(fontFallback);
      window.clearTimeout(safety);
      context?.revert();
      document.documentElement.classList.remove('ehsan-intro-locked');
    };
  }, [finish]);

  return (
    <div ref={rootRef} className={styles.intro} aria-label="Muhammed Mekky Studio intro">
      <p className={styles.introStudio} data-intro-studio>MUHAMMED MEKKY STUDIO / SPEED DESIGNING 01</p>
      <div className={styles.introWords} aria-hidden="true">
        <strong data-intro-word>KNOW</strong>
        <strong data-intro-word>APPLY</strong>
        <strong data-intro-word>BUILD</strong>
      </div>
      <p className={styles.introThesis} data-intro-thesis>
        <strong>KNOWING</strong><b>≠</b><strong>USING</strong>
      </p>
      <span className={styles.introRoute} data-intro-route aria-hidden="true" />
      <span className={styles.introCurtain} data-intro-curtain aria-hidden="true" />
      <button type="button" onClick={finish}>Skip intro</button>
    </div>
  );
}
