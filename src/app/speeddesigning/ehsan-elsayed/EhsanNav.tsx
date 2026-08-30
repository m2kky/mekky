'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import EhsanTransitionLink from './EhsanTransitionLink';
import styles from './EhsanShell.module.css';

type EhsanRoute = 'home' | 'about' | 'contact';

const links = [
  { label: 'ABOUT', href: '/speeddesigning/ehsan-elsayed/about', routeLabel: 'ABOUT', active: 'about' },
  { label: 'METHOD', href: '/speeddesigning/ehsan-elsayed#method', routeLabel: 'HOME', active: 'home' },
  { label: 'FIELD NOTES', href: '/speeddesigning/ehsan-elsayed#field-notes', routeLabel: 'HOME', active: 'home' },
  { label: 'CONTACT', href: '/speeddesigning/ehsan-elsayed/contact', routeLabel: 'CONTACT', active: 'contact' },
  { label: 'BLUEPRINT', href: '/speeddesigning/ehsan-elsayed/blueprint', routeLabel: 'BLUEPRINT', active: undefined },
] as const;

export default function EhsanNav({
  active,
  animateEntry = false,
}: {
  active: EhsanRoute;
  animateEntry?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const panel = menuRef.current;
    const trigger = triggerRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a,button:not([disabled])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    document.documentElement.classList.add('ehsan-menu-locked');
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('ehsan-menu-locked');
      trigger?.focus();
    };
  }, [menuOpen]);

  const navLinks = links.map((link) => (
    <EhsanTransitionLink
      key={link.label}
      href={link.href}
      label={link.routeLabel}
      onClick={() => setMenuOpen(false)}
      className={styles.navLink}
    >
      <span aria-current={link.active === active ? 'page' : undefined}>{link.label}</span>
    </EhsanTransitionLink>
  ));

  return (
    <header className={styles.nav} data-entry-brand={animateEntry ? '' : undefined}>
      <div className={styles.identity}>
        <Link
          href="/speeddesigning"
          className={styles.signature}
          aria-label="Muhammed Mekky Studio — Speed Designing"
        >
          <Image
            src="/speeddesigning/brand/signature.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 120px, 96px"
            priority
          />
        </Link>
        <EhsanTransitionLink
          href="/speeddesigning/ehsan-elsayed"
          label="HOME"
          className={styles.episode}
        >
          SD / <b>01</b>
        </EhsanTransitionLink>
      </div>

      <nav className={styles.desktopNav} aria-label="Ehsan concept navigation">
        {navLinks}
      </nav>

      <button
        ref={triggerRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={menuOpen}
        aria-controls="ehsan-menu"
        onClick={() => setMenuOpen(true)}
      >
        MENU
      </button>

      <div
        ref={menuRef}
        id="ehsan-menu"
        className={styles.mobileMenu}
        data-open={menuOpen ? 'true' : 'false'}
        aria-hidden={!menuOpen}
      >
        <button type="button" onClick={() => setMenuOpen(false)}>CLOSE</button>
        <nav aria-label="Ehsan mobile navigation">{navLinks}</nav>
      </div>
    </header>
  );
}
