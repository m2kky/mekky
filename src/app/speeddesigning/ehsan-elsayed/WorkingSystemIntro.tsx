'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import styles from './EhsanExperience.module.css';

export type IntroCompletionReason = 'handoff' | 'skip' | 'reduced-motion' | 'safety';

type WorkingSystemIntroProps = {
  equationRef: RefObject<HTMLHeadingElement | null>;
  routeRef: RefObject<HTMLDivElement | null>;
  onComplete: (reason: IntroCompletionReason) => void;
};

const INTRO_SAFETY_MS = 9500;

export default function WorkingSystemIntro({ equationRef, routeRef, onComplete }: WorkingSystemIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finish = useCallback((reason: IntroCompletionReason) => {
    if (completeRef.current) return;
    completeRef.current = true;
    if (reason !== 'handoff') timelineRef.current?.kill();

    const equation = equationRef.current;
    const route = routeRef.current;
    if (equation) gsap.set(equation, { clearProps: 'transform,opacity,visibility,willChange,color' });
    if (equation) gsap.set(equation.querySelector('[data-entry-symbol]'), { clearProps: 'color' });
    if (route) gsap.set(route, { clearProps: 'transform,opacity,visibility,willChange' });
    document.documentElement.classList.remove('ehsan-intro-locked');
    onComplete(reason);
  }, [equationRef, onComplete, routeRef]);

  useEffect(() => {
    const root = rootRef.current;
    const equation = equationRef.current;
    const route = routeRef.current;
    if (!root || !equation || !route) return;

    completeRef.current = false;
    document.documentElement.classList.add('ehsan-intro-locked');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish('reduced-motion');
      return;
    }

    let cancelled = false;
    let started = false;
    let context: gsap.Context | undefined;

    const start = () => {
      if (cancelled || started) return;
      started = true;

      const rect = equation.getBoundingClientRect();
      const mobile = window.innerWidth < 768;
      const availableWidth = window.innerWidth - (mobile ? 32 : 96);
      const scaleCap = window.innerWidth < 768 ? 0.92 : 0.68;
      const scale = Math.min(availableWidth / rect.width, scaleCap);
      const opticalY = window.innerHeight * (mobile ? -0.04 : -0.02);
      const introTransform = {
        x: window.innerWidth / 2 - (rect.left + rect.width / 2),
        y: window.innerHeight / 2 + opticalY - (rect.top + rect.height / 2),
        scale,
      };
      const symbol = equation.querySelector('[data-entry-symbol]');

      context = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLElement>('[data-intro-word]');
        gsap.set('[data-intro-words]', { yPercent: 34 });
        gsap.set(equation, {
          ...introTransform,
          autoAlpha: 0,
          transformOrigin: 'center center',
          willChange: 'transform,opacity',
        });
        gsap.set(route, {
          autoAlpha: 0,
          scale: 0.86,
          transformOrigin: 'center center',
          willChange: 'transform,opacity',
        });

        timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } });
        timelineRef.current
          .fromTo('[data-intro-brand]', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.15)
          .fromTo('[data-intro-accent]', { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: 'power3.inOut' }, 0.45)
          .fromTo(words[0], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 1.15)
          .to('[data-intro-brand]', { y: () => -window.innerHeight * 0.41, duration: 1.15, ease: 'power3.inOut' }, 1.15)
          .fromTo(words[1], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 2.45)
          .to('[data-intro-words]', { yPercent: 0, duration: 1.2, ease: 'power3.inOut' }, 2.45)
          .fromTo(words[2], { autoAlpha: 0, yPercent: 125, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.65, ease: 'expo.out' }, 3.75)
          .to('[data-intro-words]', { yPercent: -34, duration: 1.2, ease: 'power3.inOut' }, 3.75)
          .to('[data-intro-brand]', { autoAlpha: 0, duration: 0.45 }, 5.05)
          .to('[data-intro-words]', { autoAlpha: 0, yPercent: -50, duration: 0.55 }, 5.05)
          .fromTo(
            equation,
            { autoAlpha: 0, y: introTransform.y + 34 },
            { autoAlpha: 1, y: introTransform.y, duration: 0.75 },
            5.25,
          )
          .fromTo('[data-intro-route]', { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, 5.65)
          .fromTo('[data-intro-curtain]', { scaleY: 0 }, { scaleY: 1, duration: 0.48, ease: 'power3.inOut' }, 6.25)
          .to(symbol, { color: 'var(--ink)', duration: 0.25, ease: 'power2.out' }, 6.25)
          .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1.28, ease: 'expo.inOut' }, 6.48)
          .to(
            equation,
            { x: 0, y: 0, scale: 1, color: 'var(--ink)', duration: 1.3, ease: 'expo.inOut' },
            6.42,
          )
          .fromTo(
            route,
            { autoAlpha: 0, scale: 0.86 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
            7.12,
          )
          .to(symbol, { color: 'var(--coral)', duration: 0.45, ease: 'power2.out' }, 7.25)
          .call(() => finish('handoff'), [], 7.8);
      }, root);
    };

    const finishForResize = () => finish('safety');
    const fontFallback = window.setTimeout(start, 350);
    document.fonts.ready.then(start).catch(start);
    const safety = window.setTimeout(() => finish('safety'), INTRO_SAFETY_MS);
    window.addEventListener('resize', finishForResize, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(fontFallback);
      window.clearTimeout(safety);
      window.removeEventListener('resize', finishForResize);
      timelineRef.current?.kill();
      timelineRef.current = null;
      context?.revert();
      gsap.set(equation, { clearProps: 'transform,opacity,visibility,willChange,color' });
      gsap.set(equation.querySelector('[data-entry-symbol]'), { clearProps: 'color' });
      gsap.set(route, { clearProps: 'transform,opacity,visibility,willChange' });
      document.documentElement.classList.remove('ehsan-intro-locked');
    };
  }, [equationRef, finish, routeRef]);

  return (
    <div ref={rootRef} className={styles.intro} aria-label="Muhammed Mekky Studio intro">
      <div className={styles.introBrand} data-intro-brand>
        <Image
          src="/speeddesigning/brand/compact.webp"
          alt="Muhammed Mekky Studio"
          width={900}
          height={261}
          sizes="(max-width: 480px) 72vw, 34rem"
          priority
        />
        <span data-intro-accent aria-hidden="true" />
        <p data-intro-studio>STUDIO PRESENTS</p>
      </div>
      <div className={styles.introWords} data-intro-words aria-hidden="true">
        <strong data-intro-word>KNOW</strong>
        <strong data-intro-word>APPLY</strong>
        <strong data-intro-word>BUILD</strong>
      </div>
      <span className={styles.introRoute} data-intro-route aria-hidden="true" />
      <span className={styles.introCurtain} data-intro-curtain aria-hidden="true" />
      <button type="button" onClick={() => finish('skip')}>Skip intro</button>
    </div>
  );
}
