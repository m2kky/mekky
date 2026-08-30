'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkingSystemIntro from './WorkingSystemIntro';
import styles from './EhsanExperience.module.css';

const INTRO_KEY = 'speed-designing-ehsan-intro-seen-v1';

const fieldNotes = [
  {
    id: '01',
    videoId: 'ehn2Ox8YA7U',
    category: 'Revenue & Commercial Thinking',
    question: 'How does a real B2B lead become worth pursuing?',
    title: 'What is Lead Generation in B2B Sales and Business Development?',
    runtime: '21:09',
    arabic: false,
  },
  {
    id: '02',
    videoId: 'cngUW3Vv28k',
    category: 'AI & Building Systems',
    question: 'Where should automation begin inside real work?',
    title: 'ازاي ابدأ اتعلم اوتوميشن في شغلي؟',
    runtime: '17:47',
    arabic: true,
  },
  {
    id: '03',
    videoId: 'BPppanxswGY',
    category: 'Life, Work & Growth',
    question: 'What changes when growth leaves the workplace?',
    title: 'نعمل ايه غير الشغل يغير من شخصيتنا و يزود تجاربنا في الحياة؟',
    runtime: '14:38',
    arabic: true,
  },
] as const;

const proofPoints = [
  ['TECHNICAL FOUNDATION', 'A Computer Engineering foundation supports technical fluency.'],
  ['COMMERCIAL PRACTICE', 'Business Development experience grounds the work in opportunity, value, and outcomes.'],
  ['APPLIED EDUCATION', 'Complex subjects become questions, frameworks, and work people can actually try.'],
  ['SYSTEM BUILDING', 'Tools are connected to workflows instead of treated as the answer by themselves.'],
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function FieldNote({ note }: { note: (typeof fieldNotes)[number] }) {
  const [failed, setFailed] = useState(false);
  const href = `https://www.youtube.com/watch?v=${note.videoId}`;

  return (
    <article className={styles.noteCard} data-note={note.id}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles.noteLink}
        aria-label={`${note.question} — watch on YouTube (opens in a new tab)`}
      >
        <div className={styles.noteMedia}>
          {failed ? (
            <p className={styles.imageFallback}>Thumbnail unavailable. The full field note is still available on YouTube.</p>
          ) : (
            <Image
              src={`https://i.ytimg.com/vi/${note.videoId}/maxresdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 767px) 94vw, (max-width: 1099px) 76vw, 68vw"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
          <span className={styles.noteWash} aria-hidden="true" />
          <span className={styles.playMark} aria-hidden="true">PLAY</span>
          <p className={styles.noteQuestion}>{note.question}</p>
        </div>
        <div className={styles.noteMeta}>
          <span>FIELD NOTE / {note.id}</span>
          <span>{note.category}</span>
          <span>{note.runtime}</span>
        </div>
        {note.arabic ? (
          <h3 className={styles.arabicTitle} dir="rtl" lang="ar">{note.title}</h3>
        ) : (
          <h3 dir="ltr" lang="en">{note.title}</h3>
        )}
        <span className={styles.watchAction}>Watch the field note <Arrow diagonal /></span>
      </a>
    </article>
  );
}

export default function EhsanExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const finishIntro = useCallback(() => setIntroVisible(false), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      if (reducedMotion || window.sessionStorage.getItem(INTRO_KEY)) return;
      window.sessionStorage.setItem(INTRO_KEY, 'true');
    } catch {
      if (reducedMotion) return;
    }

    const open = window.setTimeout(() => setIntroVisible(true), 0);
    return () => {
      window.clearTimeout(open);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: '(min-width: 1100px)',
        motion: '(prefers-reduced-motion: no-preference)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        if (reduceMotion) {
          gsap.set('[data-reveal], [data-parallax], .equation, .notesTrack, .mapProgress', { clearProps: 'all' });
          return;
        }

        gsap.fromTo(
          '.equation',
          { scale: 1.12, transformOrigin: 'left 48%' },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
          },
        );

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 86%', once: true },
            },
          );
        });

        if (!reduceMotion) {
          const notesTrack = root.querySelector<HTMLElement>('.notesTrack');
          if (notesTrack) {
            gsap.to(notesTrack, {
              x: () => -Math.max(0, notesTrack.scrollWidth - window.innerWidth),
              ease: 'none',
              scrollTrigger: {
                trigger: '.fieldNotes',
                start: 'top top',
                end: () => `+=${Math.max(notesTrack.scrollWidth - window.innerWidth, window.innerWidth * 1.5)}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          }
        }

        if (desktop) {
          gsap.fromTo(
            '.mapProgress',
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.method',
                start: 'top top',
                end: '+=125%',
                pin: true,
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap.to('[data-parallax="circle"]', {
            y: -90,
            rotation: 24,
            ease: 'none',
            scrollTrigger: { trigger: '.proof', start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
          gsap.to('[data-parallax="square"]', {
            y: 70,
            rotation: -14,
            ease: 'none',
            scrollTrigger: { trigger: '.proof', start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
        }
      },
      root,
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh).catch(() => undefined);
    return () => media.revert();
  }, []);

  return (
    <main ref={rootRef} className={styles.page}>
      <a href="#method" className={styles.skipLink}>Skip to the working system</a>

      {introVisible ? <WorkingSystemIntro onComplete={finishIntro} /> : null}

      <header className={styles.navbar}>
        <Link href="/speeddesigning" className={styles.seriesLink} aria-label="Speed Designing — Episode 01" data-entry-brand>
          <span className={styles.brandTile} aria-hidden="true">
            <Image src="/speeddesigning/brand/monogram.webp" alt="" fill sizes="44px" priority />
          </span>
          <span className={styles.brandLabel}>SD / <b>01</b></span>
        </Link>
        <nav aria-label="Ehsan concept navigation">
          <a href="#method">Method</a>
          <a href="#field-notes">Field Notes</a>
          <a href="#paths">Choose a path</a>
          <Link href="/speeddesigning/ehsan-elsayed/blueprint">Blueprint</Link>
        </nav>
      </header>

      <section className={`${styles.hero} hero`} aria-labelledby="ehsan-title">
        <div className={`${styles.heroCore} heroCore`}>
          <div className={styles.heroTopline}>
            <span>THE GAP ISN&apos;T KNOWLEDGE.</span>
            <span>CAIRO / 2026</span>
          </div>
          <h1 id="ehsan-title" className={`${styles.equation} equation`}>
            <span>KNOWING</span>
            <b>≠</b>
            <span className={styles.using}>USING</span>
          </h1>
          <div className={styles.heroRoute} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.heroIdentity}>
            <div>
              <p>The difference is a working system.</p>
              <h2>EHSAN<br />EL SAYED</h2>
            </div>
            <div className={styles.heroStatement}>
              <p>Sales. Business Development. Practical AI. Applied until it works.</p>
              <small>An operator-teacher connecting commercial judgment, technical fluency, and real-world learning.</small>
              <div className={styles.heroActions}>
                <a href="#method" className={styles.primaryAction}>See how I work <Arrow /></a>
                <a href="#field-notes" className={styles.textAction}>Start with a field note ↓</a>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.heroCircle} ${styles.parallaxShape}`} data-parallax="circle" aria-hidden="true" />
      </section>

      <section id="method" className={`${styles.method} method`} aria-labelledby="method-title">
        <div className={`${styles.methodInner} methodInner`}>
          <div className={styles.sectionLead} data-reveal>
            <p>01 / THE METHOD</p>
            <h2 id="method-title">Turn the tool into<br />a way of working.</h2>
            <span>Information only becomes valuable when it survives contact with a real problem.</span>
          </div>
          <div className={styles.systemMap}>
            <div className={styles.mapRail} aria-hidden="true"><span className={`${styles.mapProgress} mapProgress`} /></div>
            {[
              ['01', 'KNOW THE TOOL', 'Understand what it can—and cannot—do.'],
              ['02', 'READ THE PROBLEM', 'Start with the workflow, buyer, team, or decision.'],
              ['03', 'BUILD THE SYSTEM', 'Connect judgment, process, and technology.'],
              ['04', 'USE IT AT WORK', 'Test it in the room where outcomes matter.'],
            ].map(([number, title, copy]) => (
              <article key={number} className={styles.mapNode} data-reveal>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={styles.handNote}>Learn → apply → build → repeat.</p>
        </div>
      </section>

      <section id="field-notes" className={`${styles.fieldNotes} fieldNotes`} aria-labelledby="notes-title">
        <div className={styles.notesTrack + ' notesTrack'}>
          <header className={styles.notesIntro}>
            <p>02 / IN PUBLIC</p>
            <h2 id="notes-title">Three problems.<br />One instinct:<br /><em>make it usable.</em></h2>
            <span>Public teaching is where the method becomes visible.</span>
          </header>
          {fieldNotes.map((note) => <FieldNote key={note.id} note={note} />)}
        </div>
      </section>

      <section className={`${styles.proof} proof`} aria-labelledby="proof-title">
        <div className={styles.proofHeader} data-reveal>
          <p>03 / THE CONNECTIONS</p>
          <h2 id="proof-title">Not separate interests.<br />A connected operating edge.</h2>
        </div>
        <div className={styles.proofNetwork}>
          <div className={styles.proofLine} aria-hidden="true" />
          <div className={styles.proofCenter} data-reveal><span>OPERATOR</span><b>↔</b><span>TEACHER</span></div>
          {proofPoints.map(([label, copy], index) => (
            <article key={label} className={styles.proofPoint} data-index={index + 1} data-reveal>
              <span>0{index + 1}</span><h3>{label}</h3><p>{copy}</p>
            </article>
          ))}
          <div className={`${styles.proofCircle} ${styles.parallaxShape}`} data-parallax="circle" aria-hidden="true" />
          <div className={`${styles.proofSquare} ${styles.parallaxShape}`} data-parallax="square" aria-hidden="true" />
        </div>
        <p className={styles.qualification}>Based on reviewed public and user-supplied materials. Current role details are intentionally omitted pending live verification.</p>
      </section>

      <section id="paths" className={styles.paths} aria-labelledby="paths-title">
        <header data-reveal>
          <p>04 / CHOOSE THE PROBLEM</p>
          <h2 id="paths-title">Same method.<br />Different starting point.</h2>
        </header>
        <div className={styles.pathGrid}>
          <article className={styles.teamPath} data-reveal>
            <span>FOR REVENUE LEADERS &amp; TEAMS / PRIMARY</span>
            <h3>Make AI useful where revenue work actually happens.</h3>
            <p>Start with the workflow, the commercial problem, and the behavior that needs to change—then build the system around them.</p>
            <a href="#method">Trace the team method <Arrow /></a>
          </article>
          <article className={styles.capabilityPath} data-reveal>
            <span>FOR REVENUE PROFESSIONALS</span>
            <h3>Build proof, not just familiarity.</h3>
            <p>Choose one useful problem, apply a practical framework, and let real work become the evidence.</p>
            <a href="#field-notes">Start with a practical framework <Arrow /></a>
          </article>
        </div>
      </section>

      <section className={styles.salesTechies} aria-labelledby="sales-techies-title">
        <div className={styles.salesMark} aria-hidden="true">ST</div>
        <div data-reveal>
          <p>05 / BUILT FROM THE METHOD</p>
          <h2 id="sales-techies-title">Sales Techies is one expression of the system.</h2>
          <p>It brings Sales, Business Development, AI, and applied education into the same practical conversation. Here, it appears as evidence of Ehsan&apos;s build-and-teach method—not as a replacement for her personal identity.</p>
          <small>This concept intentionally excludes unverified registration, traction, client, participant, and future-service claims.</small>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.loop} aria-hidden="true">KNOW → UNDERSTAND → BUILD → USE</p>
        <div data-reveal>
          <span>THE WORK BEGINS WHEN THE INFORMATION STARTS MOVING.</span>
          <h2 id="closing-title"><span>EHSAN</span>{' '}<span>EL SAYED</span></h2>
        </div>
        <div className={styles.closingLinks}>
          <a href="https://www.youtube.com/@ehsan__sayed" target="_blank" rel="noreferrer">Follow Life, Work &amp; Growth <Arrow diagonal /></a>
          <Link href="/speeddesigning/ehsan-elsayed/blueprint">Open the Blueprint <Arrow /></Link>
        </div>
        <footer>
          <div className={styles.footerMeta}>
            <p>This website is an independent speculative concept created by Muhammed Mekky Studio as part of the Speed Designing series. It is not affiliated with, endorsed by, or officially connected to Ehsan El Sayed or her representatives.</p>
            <span>EPISODE 01 / 2026</span>
          </div>
          <div className={styles.footerSignature}>
            <span>FROM EVIDENCE TO EXPERIENCE.</span>
            <Link href="/">An independent speculative experience by Muhammed Mekky. <Arrow diagonal /></Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
