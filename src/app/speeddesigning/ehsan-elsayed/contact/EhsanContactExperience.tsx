'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import EhsanNav from '../EhsanNav';
import EhsanSubpageFooter from '../EhsanSubpageFooter';
import ContactWizard from './ContactWizard';
import styles from './Contact.module.css';

export default function EhsanContactExperience() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    const select = gsap.utils.selector(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(select('[data-contact-entry]'), {
        autoAlpha: 0,
        y: 42,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      });
    });
    return () => media.revert();
  }, []);

  return (
    <main ref={rootRef} className={styles.page}>
      <EhsanNav active="contact" />
      <div className={styles.main}>
        <section className={styles.thesis} aria-labelledby="contact-title">
          <div data-contact-entry>
            <p>03 / START A CONVERSATION</p>
            <h1 id="contact-title">START WITH<span>THE PROBLEM.</span></h1>
            <p>A useful conversation begins with context—not a generic brief. Build the picture in three deliberate steps.</p>
          </div>
          <p className={styles.notice} data-contact-entry>
            <strong>CONCEPT DEMO</strong><br />
            This form is interactive, but nothing is sent to Ehsan El Sayed.
          </p>
        </section>
        <section className={styles.wizard} aria-label="Demo inquiry builder" data-contact-entry>
          <ContactWizard />
        </section>
      </div>
      <EhsanSubpageFooter />
    </main>
  );
}
