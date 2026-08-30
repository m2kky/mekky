'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './EhsanExperience.module.css';

type WorkingSystemIntroProps = {
  onComplete: () => void;
};

const INTRO_SAFETY_MS = 9500;

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
        const words = gsap.utils.toArray<HTMLElement>('[data-intro-word]');
        gsap.set('[data-intro-words]', { yPercent: 34 });
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
          .fromTo('[data-intro-studio]', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.15)
          .fromTo(words[0], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 1.15)
          .to('[data-intro-studio]', { y: -72, duration: 1.15, ease: 'power3.inOut' }, 1.15)
          .fromTo(words[1], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 2.45)
          .to('[data-intro-words]', { yPercent: 0, duration: 1.2, ease: 'power3.inOut' }, 2.45)
          .fromTo(words[2], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 3.75)
          .to('[data-intro-words]', { yPercent: -34, duration: 1.2, ease: 'power3.inOut' }, 3.75)
          .to(['[data-intro-studio]', '[data-intro-words]'], { autoAlpha: 0, yPercent: -20, duration: 0.55 }, 5.05)
          .fromTo('[data-intro-thesis]', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 5.25)
          .fromTo('[data-intro-route]', { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, 5.65)
          .fromTo('[data-intro-curtain]', { scaleY: 0 }, { scaleY: 1, duration: 0.72, ease: 'expo.inOut' }, 6.25)
          .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.68, ease: 'expo.inOut', onComplete: finish }, 6.55);
      }, root);
    };

    const fontFallback = window.setTimeout(start, 350);
    document.fonts.ready.then(start).catch(start);
    const safety = window.setTimeout(finish, INTRO_SAFETY_MS);

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
      <p className={styles.introStudio} data-intro-studio>MUHAMMED MEKKY STUDIO PRESENTS</p>
      <div className={styles.introWords} data-intro-words aria-hidden="true">
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
