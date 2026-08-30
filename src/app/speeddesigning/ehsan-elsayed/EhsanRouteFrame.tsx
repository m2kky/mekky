'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './EhsanShell.module.css';

const TRANSITION_SAFETY_MS = 1800;

type PendingRoute = { href: string; label: string; hash: string };
type TransitionValue = { transitionTo: (href: string, label: string) => void };

const TransitionContext = createContext<TransitionValue | null>(null);

export function useEhsanTransition() {
  const value = useContext(TransitionContext);
  if (!value) throw new Error('useEhsanTransition must be used inside EhsanRouteFrame');
  return value;
}

export default function EhsanRouteFrame({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<PendingRoute | null>(null);
  const safetyRef = useRef<number | null>(null);
  const [pending, setPending] = useState<PendingRoute | null>(null);

  const finish = useCallback(() => {
    const overlay = overlayRef.current;
    if (safetyRef.current) window.clearTimeout(safetyRef.current);
    safetyRef.current = null;
    pendingRef.current = null;
    setPending(null);
    document.documentElement.classList.remove('ehsan-route-locked');
    if (overlay) gsap.set(overlay, { clearProps: 'transform,visibility' });
  }, []);

  const transitionTo = useCallback(
    (href: string, label: string) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const url = new URL(href, window.location.origin);
      if (reduced) {
        router.push(`${url.pathname}${url.hash}`);
        return;
      }

      const next = { href: `${url.pathname}${url.hash}`, label, hash: url.hash };
      const overlay = overlayRef.current;
      if (!overlay || pendingRef.current) return;

      pendingRef.current = next;
      setPending(next);
      document.documentElement.classList.add('ehsan-route-locked');
      safetyRef.current = window.setTimeout(finish, TRANSITION_SAFETY_MS);
      gsap.set(overlay, { visibility: 'visible', yPercent: 100 });
      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        onComplete: () => router.push(next.href),
      });
    },
    [finish, router],
  );

  useEffect(() => {
    const next = pendingRef.current;
    const overlay = overlayRef.current;
    if (!next || !overlay || !next.href.startsWith(pathname)) return;

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.35,
          ease: 'power3.inOut',
          onComplete: () => {
            finish();
            if (next.hash) {
              window.requestAnimationFrame(() => {
                document.querySelector(next.hash)?.scrollIntoView({ behavior: 'auto' });
              });
            }
          },
        });
      });
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [finish, pathname]);

  useEffect(() => finish, [finish]);
  const value = useMemo(() => ({ transitionTo }), [transitionTo]);

  return (
    <TransitionContext.Provider value={value}>
      <div className={styles.frame}>{children}</div>
      <div
        ref={overlayRef}
        className={styles.routeOverlay}
        data-ehsan-route-overlay
        aria-hidden={!pending}
      >
        <span>{pending?.label ?? ''}</span>
      </div>
    </TransitionContext.Provider>
  );
}
