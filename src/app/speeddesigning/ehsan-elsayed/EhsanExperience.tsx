'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkingSystemIntro, { type IntroCompletionReason } from './WorkingSystemIntro';
import EhsanNav from './EhsanNav';
import EhsanTransitionLink from './EhsanTransitionLink';
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

type HeroEntryMode = 'full' | 'surroundings';

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
        <div className={styles.noteMedia} data-note-part>
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
        <div className={styles.noteMeta} data-note-part>
          <span>FIELD NOTE / {note.id}</span>
          <span>{note.category}</span>
          <span>{note.runtime}</span>
        </div>
        {note.arabic ? (
          <h3 className={styles.arabicTitle} dir="rtl" lang="ar" data-note-part>{note.title}</h3>
        ) : (
          <h3 dir="ltr" lang="en" data-note-part>{note.title}</h3>
        )}
        <span className={styles.watchAction} data-note-part>Watch the field note <Arrow diagonal /></span>
      </a>
    </article>
  );
}

export default function EhsanExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const equationRef = useRef<HTMLHeadingElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [heroEntryMode, setHeroEntryMode] = useState<HeroEntryMode>('full');
  const finishIntro = useCallback((reason: IntroCompletionReason) => {
    setHeroEntryMode(reason === 'handoff' ? 'surroundings' : 'full');
    setIntroVisible(false);
    setPageReady(true);
  }, []);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let shouldShowIntro = !reducedMotion;
    if (shouldShowIntro) {
      try {
        if (window.sessionStorage.getItem(INTRO_KEY)) shouldShowIntro = false;
        else window.sessionStorage.setItem(INTRO_KEY, 'true');
      } catch {
        shouldShowIntro = true;
      }
    }
    if (!shouldShowIntro) {
      queueMicrotask(() => {
        setIntroVisible(false);
        setPageReady(true);
      });
    }
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .fromTo('[data-entry-brand]', { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.38 }, 0)
        .fromTo('[data-entry-eyebrow]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.08);

      if (heroEntryMode === 'full') {
        timeline
          .fromTo('[data-entry-word]', { autoAlpha: 0, yPercent: 115 }, { autoAlpha: 1, yPercent: 0, duration: 0.72, stagger: 0.1, ease: 'expo.out' }, 0.2)
          .fromTo('[data-entry-symbol]', { autoAlpha: 0, scale: 0.45 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.52)
          .fromTo('[data-entry-route]', { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.58);
      }

      timeline.fromTo(
        '[data-entry-identity]',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.09 },
        heroEntryMode === 'full' ? 0.7 : 0.12,
      );
    }, root);
    return () => context.revert();
  }, [heroEntryMode, pageReady]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: '(min-width: 1100px)',
        wideMotion: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        motion: '(prefers-reduced-motion: no-preference)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, wideMotion, reduceMotion } = context.conditions as {
          desktop: boolean;
          wideMotion: boolean;
          reduceMotion: boolean;
        };
        if (reduceMotion) {
          gsap.set('[data-reveal], [data-parallax], .equation, .notesTrack, .mapProgress', { clearProps: 'all' });
          return;
        }

        if (wideMotion) {
          gsap.fromTo('.equation', { scale: 1, transformOrigin: 'left 48%' }, {
            scale: 1.06,
            immediateRender: false,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top-=1', end: 'bottom top', scrub: 0.8 },
          });
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
        }

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          const kind = element.dataset.reveal;
          if (kind === 'mark') {
            gsap.fromTo(
              element,
              { rotation: -10, scale: 0.92, autoAlpha: 0 },
              {
                rotation: -4,
                scale: 1,
                autoAlpha: 1,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'transform,visibility,opacity',
                scrollTrigger: { trigger: element, start: 'top 84%', once: true },
              },
            );
            return;
          }

          const isCard = kind === 'card';
          const targets = kind === 'section' || kind === 'group' ? Array.from(element.children) : [element];
          gsap.fromTo(
            targets,
            { y: isCard ? 28 : 36, scale: isCard ? 0.985 : 1, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: isCard ? 0.82 : 0.72,
              stagger: kind === 'section' ? 0.09 : kind === 'group' ? 0.07 : 0,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 84%', once: true },
            },
          );
        });

        if (!reduceMotion) {
          const notesTrack = root.querySelector<HTMLElement>('.notesTrack');
          if (notesTrack) {
            const getNotesTravel = () => Math.max(0, notesTrack.scrollWidth - window.innerWidth);
            const notesTween = gsap.to(notesTrack, {
              x: () => -getNotesTravel(),
              ease: 'none',
              scrollTrigger: {
                trigger: '.fieldNotes',
                start: 'top top',
                end: () => `+=${getNotesTravel()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            gsap.utils.toArray<HTMLElement>('[data-note]').forEach((card) => {
              const parts = card.querySelectorAll<HTMLElement>('[data-note-part]');
              gsap.fromTo(
                parts,
                { y: 30, scale: 0.985, autoAlpha: 0 },
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.72,
                  stagger: 0.08,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: notesTween,
                    start: 'left 84%',
                    once: true,
                  },
                },
              );
            });
          }
        }

        const loopTween = gsap.to('[data-loop-track]', {
          xPercent: -50,
          duration: 18,
          repeat: -1,
          ease: 'none',
          paused: true,
        });
        ScrollTrigger.create({
          trigger: '.closing',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => loopTween.play(),
          onEnterBack: () => loopTween.play(),
          onLeave: () => loopTween.pause(),
          onLeaveBack: () => loopTween.pause(),
        });

        if (desktop) {
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
    <main
      ref={rootRef}
      className={styles.page}
      data-intro-active={introVisible ? 'true' : 'false'}
    >
      <a href="#method" className={styles.skipLink}>Skip to the working system</a>

      {introVisible ? <WorkingSystemIntro equationRef={equationRef} routeRef={routeRef} onComplete={finishIntro} /> : null}

      <EhsanNav active="home" animateEntry />

      <section className={`${styles.hero} hero`} aria-labelledby="ehsan-title">
        <div className={`${styles.heroCore} heroCore`}>
          <div className={styles.heroTopline} data-entry-eyebrow>
            <span>THE GAP ISN&apos;T KNOWLEDGE.</span>
            <span>CAIRO / 2026</span>
          </div>
          <h1 ref={equationRef} id="ehsan-title" className={`${styles.equation} equation`}>
            <span data-entry-word>KNOWING</span>
            <b data-entry-symbol>≠</b>
            <span className={styles.using} data-entry-word>USING</span>
          </h1>
          <div ref={routeRef} className={styles.heroRoute} data-entry-route aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.heroIdentity}>
            <div data-entry-identity>
              <p>The difference is a working system.</p>
              <h2>EHSAN<br />EL SAYED</h2>
            </div>
            <div className={styles.heroStatement} data-entry-identity>
              <p>Sales. Business Development. Practical AI. Applied until it works.</p>
              <small>An operator-teacher connecting commercial judgment, technical fluency, and real-world learning.</small>
              <div className={styles.heroActions}>
                <a href="#method" className={styles.primaryAction}>See how I work <Arrow /></a>
                <a href="#field-notes" className={styles.textAction}>Start with a field note ↓</a>
                <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/about" label="ABOUT" className={styles.textAction}>About Ehsan <Arrow /></EhsanTransitionLink>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.heroCircle} ${styles.parallaxShape}`} data-parallax="circle" aria-hidden="true" />
      </section>

      <section id="method" className={`${styles.method} method`} aria-labelledby="method-title">
        <div className={`${styles.methodInner} methodInner`}>
          <div className={styles.sectionLead} data-reveal="section">
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
              <article key={number} className={styles.mapNode} data-reveal="card">
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={styles.handNote}>Learn → apply → build → repeat.</p>
        </div>
      </section>

      <section id="field-notes" className={`${styles.fieldNotes} fieldNotes`} aria-labelledby="notes-title">
        <div className={styles.notesTrack + ' notesTrack'}>
          <header className={styles.notesIntro} data-reveal="section">
            <p>02 / IN PUBLIC</p>
            <h2 id="notes-title">Three problems.<br />One instinct:<br /><em>make it usable.</em></h2>
            <span>Public teaching is where the method becomes visible.</span>
          </header>
          {fieldNotes.map((note) => <FieldNote key={note.id} note={note} />)}
        </div>
      </section>

      <section className={`${styles.proof} proof`} aria-labelledby="proof-title">
        <div className={styles.proofHeader} data-reveal="section">
          <p>03 / THE CONNECTIONS</p>
          <h2 id="proof-title">Not separate interests.<br />A connected operating edge.</h2>
        </div>
        <div className={styles.proofNetwork}>
          <div className={styles.proofLine} aria-hidden="true" />
          <div className={styles.proofCenter} data-reveal="card"><span>OPERATOR</span><b>↔</b><span>TEACHER</span></div>
          {proofPoints.map(([label, copy], index) => (
            <article key={label} className={styles.proofPoint} data-index={index + 1} data-reveal="card">
              <span>0{index + 1}</span><h3>{label}</h3><p>{copy}</p>
            </article>
          ))}
          <div className={`${styles.proofCircle} ${styles.parallaxShape}`} data-parallax="circle" aria-hidden="true" />
          <div className={`${styles.proofSquare} ${styles.parallaxShape}`} data-parallax="square" aria-hidden="true" />
        </div>
        <p className={styles.qualification}>Based on reviewed public and user-supplied materials. Current role details are intentionally omitted pending live verification.</p>
      </section>

      <section id="paths" className={styles.paths} aria-labelledby="paths-title">
        <header data-reveal="section">
          <p>04 / CHOOSE THE PROBLEM</p>
          <h2 id="paths-title">Same method.<br />Different starting point.</h2>
        </header>
        <div className={styles.pathGrid}>
          <article className={styles.teamPath} data-reveal="card">
            <span>FOR REVENUE LEADERS &amp; TEAMS / PRIMARY</span>
            <h3>Make AI useful where revenue work actually happens.</h3>
            <p>Start with the workflow, the commercial problem, and the behavior that needs to change—then build the system around them.</p>
            <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/contact" label="CONTACT">Start a demo inquiry <Arrow /></EhsanTransitionLink>
          </article>
          <article className={styles.capabilityPath} data-reveal="card">
            <span>FOR REVENUE PROFESSIONALS</span>
            <h3>Build proof, not just familiarity.</h3>
            <p>Choose one useful problem, apply a practical framework, and let real work become the evidence.</p>
            <a href="#field-notes">Start with a practical framework <Arrow /></a>
          </article>
        </div>
      </section>

      <section className={styles.salesTechies} aria-labelledby="sales-techies-title">
        <div className={styles.salesMark} aria-hidden="true" data-reveal="mark">ST</div>
        <div data-reveal="section">
          <p>05 / BUILT FROM THE METHOD</p>
          <h2 id="sales-techies-title">Sales Techies is one expression of the system.</h2>
          <p>It brings Sales, Business Development, AI, and applied education into the same practical conversation. Here, it appears as evidence of Ehsan&apos;s build-and-teach method—not as a replacement for her personal identity.</p>
          <small>This concept intentionally excludes unverified registration, traction, client, participant, and future-service claims.</small>
        </div>
      </section>

      <section className={`${styles.closing} closing`} aria-labelledby="closing-title">
        <div className={styles.loop} aria-hidden="true">
          <div className={styles.loopTrack} data-loop-track>
            <span>KNOW → UNDERSTAND → BUILD → USE</span>
            <span>KNOW → UNDERSTAND → BUILD → USE</span>
          </div>
        </div>
        <div data-reveal="section">
          <span>THE WORK BEGINS WHEN THE INFORMATION STARTS MOVING.</span>
          <h2 id="closing-title"><span>EHSAN</span>{' '}<span>EL SAYED</span></h2>
        </div>
        <div className={styles.closingLinks} data-reveal="group">
          <a className={styles.closingYouTube} href="https://www.youtube.com/@ehsan__sayed" target="_blank" rel="noreferrer">Follow Life, Work &amp; Growth <Arrow diagonal /></a>
          <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/contact" label="CONTACT" className={styles.closingContact}>Start a conversation <Arrow /></EhsanTransitionLink>
          <Link className={styles.closingBlueprint} href="/speeddesigning/ehsan-elsayed/blueprint">Open the Blueprint <Arrow /></Link>
        </div>
        <footer data-reveal="group">
          <div className={styles.footerMeta}>
            <p>This website is an independent speculative concept created by Muhammed Mekky Studio as part of the Speed Designing series. It is not affiliated with, endorsed by, or officially connected to Ehsan El Sayed or her representatives.</p>
            <span>EPISODE 01 / 2026</span>
          </div>
          <div className={styles.footerSignature}>
            <span>FROM EVIDENCE TO EXPERIENCE.</span>
            <div>
              <Link href="/">An independent speculative experience by Muhammed Mekky. <Arrow diagonal /></Link>
              <nav className={styles.footerRoutes} aria-label="Ehsan microsite pages">
                <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/about" label="ABOUT">About</EhsanTransitionLink>
                <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/contact" label="CONTACT">Contact demo</EhsanTransitionLink>
                <Link href="/speeddesigning/ehsan-elsayed/blueprint">Blueprint</Link>
              </nav>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
