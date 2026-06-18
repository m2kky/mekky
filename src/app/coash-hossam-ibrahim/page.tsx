import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import styles from './CoashHossamIbrahim.module.css';

export const metadata: Metadata = {
  title: 'Hossam Ibrahim Project | Muhammed Mekky',
  description:
    'A client-facing delivery timeline for the Hossam Ibrahim Life Coach platform project.',
  robots: {
    index: false,
    follow: false,
  },
};

const statusDate = 'June 18, 2026';

const overview = [
  { label: 'Current stage', value: 'Phase 8 / Web UI' },
  { label: 'Completed foundation', value: 'Backend Phases 0-7' },
  { label: 'Main blocker', value: 'Backend QA gates' },
  { label: 'Local API', value: 'Running on :4000' },
];

const timeline = [
  {
    phase: 'Phase 0',
    title: 'Documentation and Scope Lock',
    status: 'Done',
    intent: 'Product scope, requirements, architecture, UX flows, delivery plan, and team workflow were documented before implementation.',
    done: [
      'PRD, FRS, NFR, UX, architecture, deployment, and testing docs',
      'Phase-one constraints locked: no accounts, single product checkout, Paymob only',
      'AI/team routing documented for Mekky frontend and Omar backend'
    ],
    next: 'Keep the docs as the operating reference while frontend implementation starts.',
  },
  {
    phase: 'Phase 1',
    title: 'Backend Scaffold and Database',
    status: 'Done',
    intent: 'Create the monorepo backend foundation, shared packages, database migrations, seeds, and runtime structure.',
    done: [
      'API, worker, shared, config, and database workspaces',
      '13 migrations with booking, CMS, commerce, payments, calendar, analytics, and jobs schema',
      'Seed data and local Docker Postgres workflow'
    ],
    next: 'Use the local API and seeded data path for frontend integration checks.',
  },
  {
    phase: 'Phase 2',
    title: 'API Foundation and Admin Sessions',
    status: 'Done',
    intent: 'Establish Fastify app structure, health routes, RFC 9457 errors, admin session auth, logout, and current-session routes.',
    done: [
      'POST /api/v1/admin/sessions',
      'GET /api/v1/admin/sessions/current',
      'DELETE /api/v1/admin/sessions/current',
      'Shared error catalog aligned with backend docs'
    ],
    next: 'Frontend admin screens must use session cookies and confirm the CSRF-token handoff before write forms.',
  },
  {
    phase: 'Phase 3',
    title: 'CMS, Content, and Engagement',
    status: 'Done',
    intent: 'Expose public content endpoints plus admin CRUD for settings, pages, articles, videos, programs, legal pages, subscribers, and contact inquiries.',
    done: [
      'Public CMS endpoints return published content only',
      'Newsletter subscribers and contact inquiries implemented',
      'Admin content management routes are available'
    ],
    next: 'Build public pages against CMS endpoints and keep empty states ready while content is seeded.',
  },
  {
    phase: 'Phase 4',
    title: 'Booking Engine',
    status: 'Done',
    intent: 'Implement session types, availability rules, overrides, booking questions, free bookings, holds, conflict prevention, and admin booking management.',
    done: [
      'GET /api/v1/session-types',
      'GET /api/v1/booking-slots',
      'POST /api/v1/bookings for free bookings',
      'Admin booking configuration and booking inbox routes'
    ],
    next: 'Frontend booking UI can now consume session types, questions, slot search, free booking, and paid hold flows.',
  },
  {
    phase: 'Phase 5',
    title: 'Paymob Payments and Webhooks',
    status: 'Done',
    intent: 'Add Paymob payment initiation, paid booking holds, verified webhook processing, idempotency, and payment admin APIs.',
    done: [
      'POST /api/v1/booking-holds returns a Paymob redirect URL',
      'POST /api/v1/webhooks/paymob verifies and stores provider events',
      'Payment list/detail routes are available for admin review'
    ],
    next: 'Frontend paid booking should redirect to Paymob and poll booking/payment status after return.',
  },
  {
    phase: 'Phase 6',
    title: 'Products, Orders, and Downloads',
    status: 'Done',
    intent: 'Build single-product checkout, order creation, private S3 download links, fulfillment, and admin product/order management.',
    done: [
      'GET /api/v1/products and product detail',
      'POST /api/v1/orders with Paymob redirect',
      'GET /api/v1/orders/:reference/status',
      'GET /api/v1/downloads/:token with private signed delivery'
    ],
    next: 'Frontend shop needs one-product checkout, status pages, and private download result states.',
  },
  {
    phase: 'Phase 7',
    title: 'Worker, Calendar, Meet, and Email',
    status: 'Done',
    intent: 'Finish background jobs for Resend email, Google Calendar/Meet creation, external busy sync, hold expiry, and payment reconciliation.',
    done: [
      'Booking confirmation can enqueue calendar/Meet work',
      'External Google Calendar busy sync implemented',
      'Order fulfillment email path implemented',
      'Local API server started and health/ready checks passed'
    ],
    next: 'Surface calendar, Meet, email, and payment states clearly in public and admin frontend screens.',
  },
  {
    phase: 'Phase 8',
    title: 'Web UI and Admin Dashboard',
    status: 'Next',
    intent: 'Start the frontend implementation against the running local API: bilingual public website, booking, product checkout, and Arabic-first admin dashboard.',
    done: [
      'Backend endpoint map is ready for integration',
      'Local API base URL verified: http://localhost:4000/api/v1',
      'Mekky frontend ownership confirmed by project folder'
    ],
    next: 'Build the public website shell, API client, booking journey, product checkout, admin login, and dashboard navigation.',
  },
  {
    phase: 'Phase 9',
    title: 'QA, Hardening, and Launch',
    status: 'Pending',
    intent: 'Close backend quality gates, complete frontend browser QA, test critical flows, and prepare production deployment.',
    done: [
      'Backend audit report exists',
      'Critical flows are known: booking, Paymob, downloads, admin auth, calendar, email'
    ],
    next: 'Omar fixes lint/shared-test/script blockers while Mekky validates frontend flows against the local API.',
  }
];

const nextSprint = [
  'Create the frontend API client for http://localhost:4000/api/v1',
  'Build the public website shell with Arabic-first content structure',
  'Wire session types, booking slots, free bookings, and paid booking holds',
  'Wire product list, product detail, order creation, order status, and download states',
  'Start the admin login and dashboard shell using session cookies',
  'Confirm the CSRF token handoff with Omar before admin write forms',
];

const decisions = [
  'Final Arabic and English content',
  'Brand photos and visual assets',
  'Production domain',
  'Paymob sandbox credentials',
  'Google Calendar account access',
  'Resend sender domain',
  'Admin CSRF token contract',
];

const launchAcceptance = [
  'Public bilingual pages integrated with CMS APIs',
  'Free and paid booking paths tested',
  'Paymob return/status flow tested',
  'Single-product checkout and private download tested',
  'Admin content, booking, payment, and order screens tested',
  'Calendar, Meet, and email states verified',
  'Backend lint, shared validation, and Windows test-script blockers resolved',
  'Mobile responsive review complete',
  'RTL/LTR QA complete',
  'Production deployment approved',
];

const handoffUpdate = [
  {
    label: 'Local API',
    value: 'Docker Postgres, migrations, and API service are running locally on port 4000.',
  },
  {
    label: 'Public integration',
    value: 'CMS, engagement, session types, booking slots, products, orders, and downloads have public endpoints ready.',
  },
  {
    label: 'Admin integration',
    value: 'Admin reads use session auth; admin writes need CSRF-token handoff confirmed before form work.',
  },
  {
    label: 'QA status',
    value: 'Typecheck and build pass, but lint, shared validation tests, and Windows unit-test scripts remain backend blockers.',
  },
];

function statusClass(status: string) {
  if (status === 'Done') return styles.statusDone;
  if (status === 'Mostly done' || status === 'Started' || status === 'Partially started') return styles.statusActive;
  if (status === 'Next') return styles.statusNext;
  return styles.statusPending;
}

export default function CoashHossamIbrahimPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Client delivery room</span>
              <h1 className={styles.title}>HOSSAM IBRAHIM PROJECT</h1>
              <p className={styles.subtitle}>
                A live-style project timeline for the Hossam Ibrahim Life Coach platform, built from the current delivery plan and implementation roadmap.
              </p>
            </div>

            <div className={styles.heroPanel} aria-label="Project status summary">
              <span className={styles.panelLabel}>Status date</span>
              <strong>{statusDate}</strong>
              <p>
                Backend Phases 0-7 are implemented and the local API is running. The current delivery step is Phase 8: frontend public website and admin dashboard integration.
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
                Backend APIs, database migrations, admin sessions, CMS, engagement, booking, Paymob payments, products, orders, downloads, worker jobs, Calendar/Meet, and email adapters.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>02</span>
              <h3>Current focus</h3>
              <p>
                Mekky frontend work: public bilingual pages, booking journey, product checkout, download states, admin login, and Arabic-first dashboard screens.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>03</span>
              <h3>Critical path</h3>
              <p>
                Frontend integration can start against the local API, while Omar closes backend lint, shared validation, and Windows test-script blockers before merge confidence.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.handoffSection}>
          <div className={styles.timelineHeader}>
            <div>
              <span className={styles.eyebrow}>Frontend handoff</span>
              <h2>Backend is usable locally, with quality gates still visible.</h2>
            </div>
            <p>
              The logs show enough backend surface for Mekky to begin UI integration now. Remaining backend blockers should stay visible in the page so the client sees what is ready and what still needs engineering cleanup.
            </p>
          </div>

          <div className={styles.handoffGrid}>
            {handoffUpdate.map((item) => (
              <div className={styles.handoffCard} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <div>
              <span className={styles.eyebrow}>Delivery timeline</span>
              <h2>Build order and current state.</h2>
            </div>
            <p>
              The timeline now reflects the log state: backend implementation is complete enough for local frontend work, but final QA and launch still depend on closing known backend quality gates.
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
                        {item.done.length === 0 && <li>-</li>}
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
            <span className={styles.eyebrow}>Open decisions & actions</span>
            <h2>Items needed before production confidence.</h2>
            <p>
              These actions are needed from the client to ensure progress continues without blockers.
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
