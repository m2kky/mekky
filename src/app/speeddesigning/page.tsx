import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import SeriesIntro from '@/components/speeddesigning/SeriesIntro';
import { getPublicSpeedDesigningProjects } from '@/data/speedDesigningProjects';
import { SITE } from '@/lib/constants';
import styles from './SpeedDesigning.module.css';

const title = "SPEED DESIGNING — Public Figures' Websites";
const description = 'An independent speculative design series by Muhammed Mekky Studio: personal websites built from the person outward.';

export const metadata: Metadata = {
  title: `${title} | Muhammed Mekky`,
  description,
  alternates: { canonical: '/speeddesigning' },
  openGraph: {
    type: 'website',
    url: '/speeddesigning',
    title,
    description,
    images: [{ url: '/images/og-preview.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/og-preview.png'],
  },
  robots: { index: true, follow: true },
};

const manifesto = [
  ['01', 'Start with the person', 'No template comes first. We begin with the human being, their work, voice, contradictions, and public presence.'],
  ['02', 'Decode the context', 'Audience, career, culture, and ambition define what the website needs to say—and what it should never pretend to be.'],
  ['03', 'Build the position', 'Research becomes a clear point of view, then a visual system designed specifically to carry it.'],
  ['04', 'Make it real', 'The direction becomes a responsive live website, with every major decision documented and explained.'],
] as const;

const process = ['Research', 'Personality', 'Audience', 'Positioning', 'Creative direction', 'Design', 'Build', 'Blueprint', 'Launch'];

export default function SpeedDesigningPage() {
  const projects = getPublicSpeedDesigningProjects();
  const publishedCount = projects.filter((project) => project.status === 'published').length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: title,
    url: `${SITE.url}/speeddesigning`,
    description,
    creator: { '@type': 'Person', name: 'Muhammed Mekky', url: SITE.url },
    isPartOf: { '@type': 'WebSite', name: 'Muhammed Mekky', url: SITE.url },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SeriesIntro />

      <aside className={styles.rail} aria-hidden="true">
        <span>MM / SD</span>
        <span>Research · Position · Design · Build · Blueprint</span>
        <span>2026—</span>
      </aside>

      <header className={styles.header}>
        <Link href="/" className={styles.brandLink} aria-label="Muhammed Mekky home">
          <Image src="/speeddesigning/brand/monogram.webp" alt="" width={554} height={572} priority />
          <span>Muhammed Mekky Studio</span>
        </Link>
        <nav aria-label="Speed Designing navigation">
          <a href="#archive">Projects</a>
          <a href="#process">Process</a>
          <Link href="/">Main site ↗</Link>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="speed-designing-title">
        <div className={styles.heroMeta}>
          <span>Independent series / 01</span>
          <span>{String(publishedCount).padStart(2, '0')} published experiments</span>
        </div>

        <h1 id="speed-designing-title" className={styles.heroTitle}>
          <span>SPEED</span>
          <span>DESIGNING</span>
        </h1>

        <div className={styles.scanLine} aria-hidden="true" />

        <div className={styles.heroBottom}>
          <p className={styles.heroStatement}>Personal websites for people who should already have one.</p>
          <p className={styles.heroExplanation}>We study the person, decode the brand, and turn the result into a live digital experience.</p>
          <a href="#archive" className={styles.roundLink}>Explore the archive <span>↓</span></a>
        </div>

        <p className={styles.disclaimer}>An independent speculative design series. Projects are unofficial unless explicitly stated otherwise.</p>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionIndex}><span>01</span><span>Series manifesto</span></div>
        <div className={styles.manifestoIntro}>
          <h2 id="manifesto-title">The person is the brief.</h2>
          <p>A public presence is not a design style. The job is to discover the system already hiding inside the person—and give it a digital form.</p>
        </div>
        <ol className={styles.manifestoList}>
          {manifesto.map(([number, heading, copy]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="archive" className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.sectionIndex}><span>02</span><span>Project archive</span></div>
        <div className={styles.archiveHeader}>
          <h2 id="archive-title">Experiments,<br />not templates.</h2>
          <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>public entries</span></div>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyEpisode}>EP. —</span>
            <div>
              <p className={styles.emptyLabel}>Archive status / Preparing the first release</p>
              <h3>The first public experiment is being prepared.</h3>
              <p>No placeholders. No invented names. The archive opens when the work is ready.</p>
            </div>
            <Image src="/speeddesigning/brand/monogram.webp" alt="" width={554} height={572} />
          </div>
        ) : (
          <ol className={styles.projectList}>
            {projects.map((project) => {
              const cover = (
                <>
                  <div className={styles.projectMedia} style={{ '--project-accent': project.accentColor } as CSSProperties}>
                    <Image src={project.coverImage} alt="" fill sizes="(max-width: 700px) 100vw, 70vw" />
                  </div>
                  <div className={styles.projectMeta}>
                    <span>EP. {String(project.episodeNumber).padStart(2, '0')}</span>
                    <p dir={project.language === 'ar' ? 'rtl' : 'ltr'}>
                      <strong>{project.personName}</strong>
                      {project.personNameArabic ? <small lang="ar" dir="rtl">{project.personNameArabic}</small> : null}
                    </p>
                    <span>{project.profession}</span>
                    <time dateTime={project.publishDate}>{project.publishDate}</time>
                  </div>
                  <p className={styles.projectPosition}>{project.positioning}</p>
                </>
              );

              return (
                <li key={project.slug}>
                  {project.status === 'published' ? (
                    <Link href={project.websitePath} className={styles.projectCover}>{cover}</Link>
                  ) : (
                    <article className={styles.projectCover} aria-label={`${project.personName}, coming soon`}>{cover}</article>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section id="process" className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.sectionIndex}><span>03</span><span>Episode anatomy</span></div>
        <div className={styles.processIntro}>
          <h2 id="process-title">Nine moves.<br />One point of view.</h2>
          <p>Each episode shows the thinking as well as the outcome. Speed means momentum, not shortcuts.</p>
        </div>
        <ol className={styles.processList}>
          {process.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>
          ))}
        </ol>
      </section>

      <section className={styles.blueprint} aria-labelledby="blueprint-title">
        <div className={styles.blueprintMark}>B/P</div>
        <div>
          <p className={styles.kicker}>Every outcome leaves a trail</p>
          <h2 id="blueprint-title">The Blueprint explains why.</h2>
        </div>
        <p>Each published website will include a public decision record: positioning, audience, visual direction, style mixture, color, typography, layout logic, interaction principles, and the reason behind every major choice.</p>
        <span className={styles.blueprintNote}>Strategy → system → evidence</span>
      </section>

      <section className={styles.author} aria-labelledby="author-title">
        <div className={styles.sectionIndex}><span>04</span><span>Authorship</span></div>
        <div className={styles.authorGrid}>
          <div>
            <p className={styles.kicker}>Created and built by</p>
            <h2 id="author-title">Muhammed<br />Mekky.</h2>
          </div>
          <div className={styles.authorCopy}>
            <p>A designer and systems builder turning research, positioning, and creative direction into live digital experiences.</p>
            <Link href="/" className={styles.textLink}>Visit the main studio site <span>↗</span></Link>
          </div>
          <Image src="/speeddesigning/brand/signature.webp" alt="Muhammed Mekky signature" width={1200} height={599} />
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.kicker}>Next subject / Open call</p>
        <h2 id="closing-title">Who should we<br />design for next?</h2>
        <div className={styles.closingActions}>
          <a href={`mailto:${SITE.email}?subject=Speed%20Designing%20Suggestion`} className={styles.primaryLink}>Suggest a person <span>↗</span></a>
          <Link href="/" className={styles.secondaryLink}>muhammedmekky.com</Link>
        </div>
        <footer>
          <span>Speed Designing © {new Date().getFullYear()}</span>
          <span>Independent / Speculative / Built live</span>
          <span>Cairo, Egypt</span>
        </footer>
      </section>
    </main>
  );
}
