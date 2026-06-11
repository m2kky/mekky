import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import styles from './RammahProject.module.css';

export const metadata: Metadata = {
  title: 'Rammah Project | Muhammed Mekky',
  description:
    'A client-facing delivery timeline for the Ahmed Ramah coaching platform project.',
};

const statusDate = 'June 11, 2026';

const overview = [
  { label: 'Current stage', value: 'Offerings Management' },
  { label: 'Completed foundation', value: 'Admin shell & API' },
  { label: 'Main blocker', value: 'Provider decisions' },
  { label: 'Launch target', value: 'MVP ready' },
];

const timeline = [
  {
    phase: 'Phase 0',
    title: 'Documentation and Scope Lock',
    status: 'Done',
    intent: 'MVP scope, product docs, architecture, requirements, and delivery boundaries are now structured.',
    done: ['PRD, BRS, FRS, NFR', 'Architecture and UX flow docs', 'Backend stack and hosting direction confirmed'],
    next: 'Use the documentation pack as the operating reference for implementation.',
  },
  {
    phase: 'Phase 1',
    title: 'Backend Foundation',
    status: 'Mostly done',
    intent: 'The API service, database foundation, schema, health routes, auth, and offerings endpoints are in place.',
    done: ['Express, TypeScript, Drizzle, PostgreSQL', 'Migrations, seed data, and Docker database', 'Admin session auth and offerings APIs'],
    next: 'Add audit logs, rate limiting, production logging, permissions, and executable API docs.',
  },
  {
    phase: 'Phase 2',
    title: 'Admin Frontend Shell',
    status: 'Mostly done',
    intent: 'Create the protected operational area that the admin will use to manage the platform.',
    done: ['Auth endpoints are available', 'Cookie-based session flow', 'Login, layout, API client'],
    next: 'Navigation, session check refinement, and logout.',
  },
  {
    phase: 'Phase 3',
    title: 'Offerings Management',
    status: 'Started',
    intent: 'Make programs and services editable from admin and use them as booking source of truth.',
    done: ['Public & Admin offerings APIs', 'Offerings list screen'],
    next: 'Build create/edit form, category selector, pricing controls, and publish workflow.',
  },
  {
    phase: 'Phase 4',
    title: 'CMS Core',
    status: 'Pending',
    intent: 'Give admin control over site settings, navigation, pages, sections, legal pages, SEO, blog, and media.',
    done: ['Content scope identified', 'Public/frontend wiring approach defined'],
    next: 'Create CMS APIs and dense admin screens for content operations.',
  },
  {
    phase: 'Phase 5',
    title: 'Booking Core',
    status: 'Pending',
    intent: 'Build availability, slots, dynamic forms, free booking submission, and admin booking review.',
    done: ['Booking model documented', 'Free booking path acceptance criteria defined'],
    next: 'Implement availability rules, slot calculation, slot holds, forms, submission endpoint, and booking inbox.',
  },
  {
    phase: 'Phase 6',
    title: 'Pricing and Paid Booking',
    status: 'Pending',
    intent: 'Add country-aware pricing, coupons, tax hooks, checkout sessions, webhooks, and payment confirmation.',
    done: ['Payment adapter strategy is planned', 'Country pricing and fallback behavior are scoped'],
    next: 'Select provider, implement provider adapter, payment webhook idempotency, and admin pricing UI.',
  },
  {
    phase: 'Phase 7',
    title: 'Google Calendar and Meet',
    status: 'Pending',
    intent: 'Create calendar events, generate Meet links, sync busy blocks, and expose failures to admin.',
    done: ['Calendar requirements are documented', 'Online booking confirmation behavior is defined'],
    next: 'Finalize Google ownership model, implement event creation, cancellation, retry, and failure visibility.',
  },
  {
    phase: 'Phase 8',
    title: 'Email Notifications',
    status: 'Pending',
    intent: 'Send booking, payment, admin, cancellation, and reschedule notifications with delivery records.',
    done: ['Email workflow scope is listed', 'Template management need is confirmed'],
    next: 'Select provider, create email adapter, templates API, delivery logs, and retry handling.',
  },
  {
    phase: 'Phase 9',
    title: 'Public Frontend Completion',
    status: 'Partially started',
    intent: 'Keep the existing premium frontend while wiring offerings, booking, legal, loading, and error states.',
    done: ['Hero and premium sections exist', 'Landing page interactions and assets updated', 'Services can read public offerings'],
    next: 'Add offering detail, booking, quote request, payment return, legal pages, and responsive browser QA.',
  },
  {
    phase: 'Phase 10',
    title: 'QA and Hardening',
    status: 'Pending',
    intent: 'Reduce launch risk across auth, booking, pricing, payment, admin, and public UX.',
    done: ['Critical test areas are identified', 'Security review areas are documented'],
    next: 'Add backend tests, frontend browser smoke tests, booking happy path tests, and payment return tests.',
  },
  {
    phase: 'Phase 11',
    title: 'Deployment and Operations',
    status: 'Pending',
    intent: 'Prepare a reproducible production-like deployment with HTTPS, envs, backups, logs, and monitoring.',
    done: ['Hostinger VPS direction is documented', 'Deployment checklist exists'],
    next: 'Finalize compose/proxy setup, configure backups, monitoring, migrations, and rollback notes.',
  },
  {
    phase: 'Phase 12',
    title: 'Launch Readiness',
    status: 'Pending',
    intent: 'Complete final content, production keys, legal pages, SEO, mobile QA, and launch sign-off.',
    done: ['Definition of MVP done is clear', 'Launch acceptance is documented'],
    next: 'Run final production checks after booking, payment, calendar, email, and admin workflows are complete.',
  },
];

const nextSprint = [
  'Build offering create/edit form',
  'Add admin offering categories API',
  'Add offering category selector',
  'Add price management API and UI',
  'Wire offering CTA behavior on public frontend',
  'Update API contract docs with implemented endpoints',
];

const decisions = [
  'Payment provider for MVP',
  'Production domain',
  'Email provider and sender domain',
  'Google Calendar account ownership model',
  'Supported countries and currencies',
  'Blog timing for first launch',
  'Arabic content timing for MVP admin',
];

const launchAcceptance = [
  'Public site complete',
  'Admin dashboard complete for MVP',
  'Free and paid booking paths tested',
  'Payment provider integrated or mock replaced',
  'Calendar and Meet tested',
  'Emails tested',
  'Backups and monitoring configured',
  'Privacy and terms published',
];

function statusClass(status: string) {
  if (status === 'Done') return styles.statusDone;
  if (status === 'Mostly done' || status === 'Started' || status === 'Partially started') return styles.statusActive;
  if (status === 'Next') return styles.statusNext;
  return styles.statusPending;
}

export default function RammahProjectPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Client delivery room</span>
              <h1 className={styles.title}>RAMMAH PROJECT</h1>
              <p className={styles.subtitle}>
                A live-style project timeline for the Ahmed Ramah coaching platform, built from the current delivery plan and implementation roadmap.
              </p>
            </div>

            <div className={styles.heroPanel} aria-label="Project status summary">
              <span className={styles.panelLabel}>Status date</span>
              <strong>{statusDate}</strong>
              <p>
                Backend foundation is mostly complete. The practical next move is the protected admin shell, then offerings management.
              </p>
            </div>
          </div>

          <div className={styles.overviewStrip}>
            {overview.map((item) => (
              <div className={styles.overviewItem} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.snapshot}>
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>Current snapshot</span>
            <h2>Where the project stands now.</h2>
          </div>

          <div className={styles.snapshotGrid}>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>01</span>
              <h3>Already available</h3>
              <p>
                Premium public frontend, standalone backend, PostgreSQL database, migrations, seed data, public offerings API, and admin auth primitives.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>02</span>
              <h3>Not built yet</h3>
              <p>
                Admin screens, CMS UI, booking engine, pricing UI, payment webhooks, Google Calendar/Meet, email provider, deployment pipeline, and E2E QA.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>03</span>
              <h3>Critical path</h3>
              <p>
                Backend foundation, admin authentication, admin shell, offerings, booking, pricing, calendar, email, public wiring, then launch hardening.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <div>
              <span className={styles.eyebrow}>Delivery timeline</span>
              <h2>Build order and current state.</h2>
            </div>
            <p>
              The timeline keeps the client focused on sequence: admin and offerings first, then booking, payment, integrations, QA, and deployment.
            </p>
          </div>

          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <article className={styles.timelineItem} key={item.phase}>
                <div className={styles.timelineIndex}>
                  <span>{String(index).padStart(2, '0')}</span>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTop}>
                    <div>
                      <span className={styles.phase}>{item.phase}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <span className={`${styles.status} ${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <p className={styles.intent}>{item.intent}</p>
                  <div className={styles.timelineDetails}>
                    <div>
                      <span className={styles.detailLabel}>Delivered / scoped</span>
                      <ul>
                        {item.done.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className={styles.detailLabel}>Next action</span>
                      <p>{item.next}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.nextSection}>
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}>Immediate sprint</span>
            <h2>The fastest route to visible product progress.</h2>
          </div>

          <ol className={styles.sprintList}>
            {nextSprint.map((task, index) => (
              <li key={task}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {task}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.decisionSection}>
          <div className={styles.decisionCopy}>
            <span className={styles.eyebrow}>Open decisions</span>
            <h2>Items needed before production confidence.</h2>
            <p>
              These decisions can move in parallel with admin and offerings work, but they must be closed before paid booking, emails, calendar, and launch.
            </p>
          </div>

          <div className={styles.decisionList}>
            {decisions.map((decision) => (
              <span key={decision}>{decision}</span>
            ))}
          </div>
        </section>

        <section className={styles.launchSection}>
          <div>
            <span className={styles.eyebrow}>Launch acceptance</span>
            <h2>MVP is done when these are true.</h2>
          </div>
          <ul className={styles.launchList}>
            {launchAcceptance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="/contact" className={styles.ctaLink}>
            Discuss next move
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
