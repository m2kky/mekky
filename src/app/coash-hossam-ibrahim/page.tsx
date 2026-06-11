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

const statusDate = 'June 11, 2026';

const overview = [
  { label: 'Current stage', value: 'Planning and architecture' },
  { label: 'Completed foundation', value: 'Project scope & architecture' },
  { label: 'Main blocker', value: 'None' },
  { label: 'Launch target', value: 'TBD' },
];

const timeline = [
  {
    phase: 'Phase 0',
    title: 'Planning and Architecture',
    status: 'Done',
    intent: 'Product scope, requirements, architecture, and team workflow are documented. Implementation has not started yet.',
    done: [
      'Stack confirmed',
      'System architecture defined',
      'Database model defined',
      'API structure defined',
      'Repo and environments ready'
    ],
    next: 'Start wireframing and establish UX/UI foundation.',
  },
  {
    phase: 'Phase 1',
    title: 'UX/UI Foundation Approved',
    status: 'Next',
    intent: 'Design the interface and establish the user experience foundation.',
    done: [
      'Scope defined',
      'Brand palette and fonts available'
    ],
    next: 'Complete wireframes, define RTL/LTR behavior, align design system with brand colors, and approve navigation.',
  },
  {
    phase: 'Phase 2',
    title: 'Core Backend Ready',
    status: 'Pending',
    intent: 'Establish the core API, database, and backend infrastructure.',
    done: [
      'Backend project scaffold scoped'
    ],
    next: 'Build admin auth, content entities, booking entities, and product/media entities.',
  },
  {
    phase: 'Phase 3',
    title: 'Public Website Ready',
    status: 'Pending',
    intent: 'Develop the public-facing pages for the coaching platform.',
    done: [
      'Public page scope and bilingual requirements defined'
    ],
    next: 'Create all public pages, implement bilingual routing, and integrate placeholder content.',
  },
  {
    phase: 'Phase 4',
    title: 'Dashboard Ready',
    status: 'Pending',
    intent: 'Create the administrative dashboard for content and user management.',
    done: [
      'Dashboard structure approved'
    ],
    next: 'Implement content management, booking management, analytics widgets, and newsletter/contact modules.',
  },
  {
    phase: 'Phase 5',
    title: 'Booking Ready',
    status: 'Pending',
    intent: 'Implement the booking engine and scheduling workflows.',
    done: [
      'Booking rules, buffers, and offline locations scoped'
    ],
    next: 'Set up session types, availability rules, global blocking, buffers, daily limits, and Google Calendar busy-block sync.',
  },
  {
    phase: 'Phase 6',
    title: 'Payments and Shop Ready',
    status: 'Pending',
    intent: 'Integrate the payment provider and setup product checkout.',
    done: [
      'Payment provider selected (Paymob)'
    ],
    next: 'Integrate Paymob, set up payment success flows, thank-you pages, and digital product delivery.',
  },
  {
    phase: 'Phase 7',
    title: 'QA and Launch Ready',
    status: 'Pending',
    intent: 'Test all flows, perform final QA, and prepare for production deployment.',
    done: [
      'Deployment strategy on Hostinger VPS prepared'
    ],
    next: 'Test critical flows, complete responsive checks, apply bug fixes, and execute deployment.',
  }
];

const nextSprint = [
  'Approve homepage wireframe',
  'Confirm Arabic and English content priority',
  'Prepare Paymob sandbox credentials',
  'Prepare Google account/calendar access',
  'Start frontend scaffold',
  'Start backend scaffold',
];

const decisions = [
  'Final Arabic homepage copy',
  'Paymob sandbox credentials',
  'Google Calendar access',
];

const launchAcceptance = [
  'Public pages approved',
  'Arabic copy approved',
  'English copy approved',
  'Booking tested',
  'Payment tested',
  'Product purchase tested',
  'Email notifications tested',
  'Mobile responsive review complete',
  'Production deployment approved',
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
                Product scope, requirements, architecture, and team workflow are documented. Implementation has not started yet.
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
                Product scope, requirements, architecture, API design, data model, security, deployment, testing, team workflow, and AI workflow docs.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>02</span>
              <h3>Not built yet</h3>
              <p>
                Design handoff, app scaffold, frontend/backend foundations, booking engine, payment integrations, and admin dashboard.
              </p>
            </div>
            <div className={styles.snapshotBlock}>
              <span className={styles.blockNumber}>03</span>
              <h3>Critical path</h3>
              <p>
                UX/UI Foundation, Backend foundation, Public Website, Dashboard, Booking, Payments, and then QA & Launch.
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
              The timeline keeps the client focused on sequence: planning and design first, then backend, public website, dashboard, booking, and launch.
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
