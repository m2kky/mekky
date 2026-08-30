'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EhsanNav from '../EhsanNav';
import EhsanSubpageFooter from '../EhsanSubpageFooter';
import EhsanTransitionLink from '../EhsanTransitionLink';
import styles from './About.module.css';

const chapters = [
  ['01', 'OBSERVE', 'Start with the commercial reality, not the fashionable answer.'],
  ['02', 'TRANSLATE', 'Make technical complexity useful to the people doing the work.'],
  ['03', 'APPLY', 'Test ideas inside real decisions, systems, and constraints.'],
  ['04', 'BUILD', 'Turn individual learning into repeatable team capability.'],
] as const;

const principles = [
  'Make knowledge usable.',
  'Keep people inside the system.',
  'Build capability that transfers.',
] as const;

export default function EhsanAboutExperience() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const select = gsap.utils.selector(root);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(select('[data-about-hero]'), {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.fromTo(
        select('[data-about-line]'),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          ease: 'none',
          scrollTrigger: {
            trigger: select('[data-about-chapters]')[0],
            start: 'top 78%',
            end: 'bottom 60%',
            scrub: 0.7,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(select('[data-about-chapter], [data-about-principle]')).forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 38,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        });
      });
    });

    return () => media.revert();
  }, []);

  return (
    <main ref={rootRef} className={styles.page}>
      <EhsanNav active="about" />

      <section className={styles.hero} aria-labelledby="about-title">
        <div data-about-hero>
          <p>01 / THE OPERATING VIEW</p>
          <h1 id="about-title">NOT A BIO.<span>A WORKING MODEL.</span></h1>
        </div>
        <p data-about-hero>Commercial judgment, technical fluency, and applied learning—connected through real work.</p>
      </section>

      <section className={styles.chapters} data-about-chapters aria-labelledby="chapters-title">
        <h2 id="chapters-title" className={styles.visuallyHidden}>Four operating chapters</h2>
        <span className={styles.chapterLine} data-about-line aria-hidden="true" />
        {chapters.map(([number, title, copy]) => (
          <article key={number} data-about-chapter>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <header>
          <p>02 / PRINCIPLES IN PRACTICE</p>
          <h2 id="principles-title">THE METHOD HAS A POINT OF VIEW.</h2>
        </header>
        <div>
          {principles.map((principle, index) => (
            <p key={principle} data-about-principle>
              <span>{principle}</span><b>0{index + 1}</b>
            </p>
          ))}
        </div>
        <nav aria-label="Explore the method">
          <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed#method" label="HOME">Open the method →</EhsanTransitionLink>
          <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed#field-notes" label="HOME">Read the field notes →</EhsanTransitionLink>
        </nav>
      </section>

      <section className={styles.handoff}>
        <h2>Understanding the method is useful. Testing it against a real problem is better.</h2>
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/contact" label="CONTACT">START A DEMO INQUIRY →</EhsanTransitionLink>
      </section>

      <EhsanSubpageFooter />
    </main>
  );
}
