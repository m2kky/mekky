import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Blueprint.module.css';

export const metadata: Metadata = {
  title: 'Ehsan El Sayed — The Working System Blueprint | Speed Designing',
  description: 'The evidence, positioning, visual system, motion rules, and rejected directions behind the speculative Ehsan El Sayed experience.',
  alternates: { canonical: '/speeddesigning/ehsan-elsayed/blueprint' },
  openGraph: {
    url: '/speeddesigning/ehsan-elsayed/blueprint',
    title: 'Ehsan El Sayed — The Working System Blueprint',
    description: 'See how research became positioning, structure, type, color, and motion in Speed Designing Episode 01.',
  },
};

const decisions = [
  ['PERSON FIRST', 'Ehsan is the center; Sales Techies is one expression of the method.', 'An unofficial company-first site.'],
  ['SYSTEM NARRATIVE', 'The method becomes visible as a connected visitor journey.', 'A generic hero/services/about/contact stack.'],
  ['ENGLISH + SOURCE ARABIC', 'Commercial clarity and original episode identity coexist.', 'Duplicated bilingual sections or translated-only titles.'],
  ['NO PORTRAIT', 'The concept stays truthful while publication rights remain unconfirmed.', 'An unapproved portrait, AI likeness, or generic stock image.'],
  ['INTERNAL METHOD CTA', 'No action pretends to be an official inquiry destination.', 'A fabricated contact form or unverified external link.'],
] as const;

export default function BlueprintPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/speeddesigning">MM / SPEED DESIGNING</Link>
        <Link href="/speeddesigning/ehsan-elsayed">Open the experience →</Link>
      </header>

      <section className={styles.hero} aria-labelledby="blueprint-title">
        <div className={styles.heroMeta}>
          <span>BLUEPRINT / EPISODE 01</span>
          <span>30.08.2026</span>
        </div>
        <h1 id="blueprint-title" aria-label="The Working System">THE WORKING<br /><em>SYSTEM</em></h1>
        <div className={styles.heroBottom}>
          <p>Ehsan El Sayed</p>
          <p>An evidence-led speculative website concept for an operator-teacher connecting commercial work, practical AI, and applied learning.</p>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.label}>01 / OPPORTUNITY</p>
        <h2>Her public work already forms a system. The website makes the connections visible.</h2>
        <div className={styles.twoCol}>
          <p>The reviewed material presents Ehsan as commercially grounded, technically fluent, and inclined to turn broad ideas into questions, frameworks, experiments, and repeatable actions.</p>
          <p>A conventional profile or media grid would leave visitors to connect Sales, Business Development, AI, teaching, and personal agency themselves. This concept gives those parts one working center.</p>
        </div>
      </section>

      <section className={styles.problem}>
        <p className={styles.label}>02 / THE PROBLEM</p>
        <blockquote>Information is abundant.<br /><strong>Application inside real work is harder.</strong></blockquote>
        <p>The experience is built around the system between knowing a tool and changing a workflow, decision, or outcome.</p>
      </section>

      <section className={styles.audience}>
        <p className={styles.label}>03 / AUDIENCE</p>
        <ol>
          <li><span>01 / PRIMARY</span><h2>Revenue Team Decision-Maker</h2><p>Wants practical AI adoption and commercial enablement.</p></li>
          <li><span>02 / SECONDARY</span><h2>Revenue Professional</h2><p>Needs applied capability, useful frameworks, and proof.</p></li>
          <li><span>03 / SUPPORTING</span><h2>Early-Career Builder</h2><p>Benefits from action-oriented teaching without controlling the proposition.</p></li>
        </ol>
      </section>

      <section className={styles.journey}>
        <p className={styles.label}>04 / JOURNEY</p>
        <h2>One loop, five moves.</h2>
        <ol>
          {[
            ['ENTRY', 'KNOWING ≠ USING names the tension.'],
            ['ORIENT', 'A four-node method assembles.'],
            ['VERIFY', 'Field Notes and proof connect public patterns.'],
            ['CHOOSE', 'Teams come first; professionals remain visible.'],
            ['RETURN', 'Sales Techies, YouTube, and the Blueprint close the loop.'],
          ].map(([title, copy], index) => <li key={title}><b>{String(index + 1).padStart(2, '0')}</b><h3>{title}</h3><p>{copy}</p></li>)}
        </ol>
      </section>

      <section className={styles.recipe}>
        <p className={styles.label}>05 / VISUAL RECIPE</p>
        <div className={styles.recipeGrid}>
          <article><b>60%</b><h2>EDITORIAL</h2><p>Large type, strict grid, controlled asymmetry, and feature-story pacing.</p></article>
          <article><b>30%</b><h2>BAUHAUS</h2><p>Functional circles, routes, lines, and squares—not historical costume.</p></article>
          <article><b>10%</b><h2>HAND-DRAWN</h2><p>Restrained teaching marks used only where the interface explains.</p></article>
        </div>
      </section>

      <section className={styles.system}>
        <div>
          <p className={styles.label}>06 / COLOR</p>
          <h2>Warm authority.<br />Clear action.</h2>
        </div>
        <div className={styles.swatches} aria-label="Color palette">
          <span style={{ background: '#F3EFE6', color: '#111318' }}>CANVAS<br />#F3EFE6</span>
          <span style={{ background: '#111318', color: '#F3EFE6' }}>INK<br />#111318</span>
          <span style={{ background: '#1D4ED8', color: '#FFFDF8' }}>SYSTEM<br />#1D4ED8</span>
          <span style={{ background: '#FF6245', color: '#111318' }}>ACTION<br />#FF6245</span>
        </div>
        <div className={styles.typeSpecimen}>
          <p className={styles.label}>07 / TYPE</p>
          <h2>Bricolage carries the questions.</h2>
          <p>IBM Plex Sans keeps the explanation commercially clear. Alexandria protects original Arabic titles. IBM Plex Mono labels the system.</p>
          <strong lang="ar" dir="rtl">ازاي ابدأ اتعلم اوتوميشن في شغلي؟</strong>
        </div>
      </section>

      <section className={styles.motion}>
        <p className={styles.label}>08 / MOTION</p>
        <h2>Motion explains the method.</h2>
        <div className={styles.motionGrid}>
          <p>Dynamic zoom opens the gap.</p><p>A route assembles the method.</p><p>Field Notes move horizontally on desktop.</p><p>Reduced motion returns everything to direct vertical reading.</p>
        </div>
      </section>

      <section className={styles.decisions}>
        <p className={styles.label}>09 / DECISIONS</p>
        <h2>What we chose—and what we refused.</h2>
        <div>
          {decisions.map(([decision, why, rejected]) => (
            <article key={decision}><h3>{decision}</h3><p>{why}</p><small>REJECTED / {rejected}</small></article>
          ))}
        </div>
      </section>

      <section className={styles.preview}>
        <div>
          <p className={styles.label}>10 / LIVE OUTCOME</p>
          <h2>From evidence<br />to experience.</h2>
          <Link href="/speeddesigning/ehsan-elsayed">Open the experience →</Link>
        </div>
        <Image src="/speeddesigning/ehsan-elsayed/cover.svg" alt="Ehsan El Sayed experience cover" width={1600} height={1000} />
      </section>

      <footer className={styles.footer}>
        <p>This website is an independent speculative concept created by Muhammed Mekky Studio as part of the Speed Designing series. It is not affiliated with, endorsed by, or officially connected to Ehsan El Sayed or her representatives.</p>
        <Link href="/">Designed and built by Muhammed Mekky Studio ↗</Link>
      </footer>
    </main>
  );
}
