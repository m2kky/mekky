'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownLeft, ArrowLeft, Check, Globe2 } from 'lucide-react';
import { courseSessions, courseStats, projectProof } from './promptToProductData';
import styles from './PromptToProduct.module.css';

type Props = { onJoinWaitlist: () => void };

const audienceUseCases = [
  { label: 'Founders', text: 'اختبر الفكرة، ابنِ الـwaitlist، واطلع بأداة تخدم البزنس.' },
  { label: 'Media Buyers', text: 'اعمل ROAS calculators، dashboards، audits وlanding pages للحملات.' },
  { label: 'Designers & Creators', text: 'حوّل شغلك لـportfolio وتجارب تفاعلية تبيع القيمة.' },
  { label: 'Developers', text: 'خطط أسرع، راجع قرارات الـAI، واطلع Production بثقة.' },
];

const deliverables = [
  { number: '01', title: 'Portfolio', text: 'يعرض شغلك ويحوّل الزيارة لفرصة.' },
  { number: '02', title: 'Landing Page', text: 'تنقل الانتباه لفعل قابل للقياس.' },
  { number: '03', title: 'Micro Tool', text: 'واجهة وBackend وDatabase لمشكلة حقيقية.' },
];

export default function CourseLanding({ onJoinWaitlist }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <header className={styles.campaignHeader}>
        <Link href="/" className={styles.mekkyMark} aria-label="Muhammed Mekky home" lang="en">M/M</Link>
        <span lang="en">Prompt to Product</span>
        <button type="button" onClick={onJoinWaitlist} lang="en">Join the waitlist <ArrowLeft size={16} /></button>
      </header>

      <section className={styles.hero} aria-labelledby="course-title">
        <Image className={styles.heroImage} src="/hero_poster.webp" alt="Muhammed Mekky building with AI" fill priority sizes="100vw" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <motion.p className={styles.eyebrow} lang="en" initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>Live Online Camp · 5 Weeks</motion.p>
        <motion.h1 id="course-title" lang="en" initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <span>Prompt</span><i>to</i><span>Product</span>
        </motion.h1>
        <motion.div className={styles.heroBottom} initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2>مش هتتعلم أداة.<br />هتتعلم تحوّل الفكرة <em>لمنتج حقيقي.</em></h2>
          <div>
            <p>من الـrequirements والـUI/UX لحد الـbackend، الـdatabase، الاختبار والـdeployment.</p>
            <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>سجّل اهتمامك <ArrowDownLeft size={20} /></button>
            <small>دقيقتين فقط · أولوية للدفعة التأسيسية</small>
          </div>
        </motion.div>
      </section>

      <section className={styles.gapSection} aria-labelledby="gap-heading">
        <h2 className={styles.sectionIndex} id="gap-heading" lang="en">01 / THE GAP</h2>
        <div className={styles.gapHeadline} lang="en"><span>Demo</span><ArrowLeft aria-hidden="true" /><strong>Product</strong></div>
        <div className={styles.gapColumns}>
          <p>أول Screen، happy path، placeholder content، وكل حاجة شغالة في الـpreview.</p>
          <p>Requirements، UX، real data، validation، security، testing، analytics وdeployment.</p>
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-heading">
        <div className={styles.statsGrid}>{courseStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <h2 className={styles.proofLine} id="proof-heading" lang="en">284+ products shipped. 263+ clients. <Globe2 size={20} /> 15+ countries.</h2>
        <div className={styles.projectRail}>{projectProof.map((project, index) => <figure key={project.title} className={styles.projectFigure}><Image src={project.image} alt={project.title} width={1200} height={800} sizes="(max-width: 800px) 88vw, 40vw" /><figcaption lang="en"><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.kind}</small></figcaption></figure>)}</div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="audience-heading">
        <p className={styles.sectionIndex} lang="en">02 / BUILT FOR BUILDERS</p>
        <h2 id="audience-heading">المجال مختلف.<br /><em>عقلية البناء واحدة.</em></h2>
        <div className={styles.audienceList}>{audienceUseCases.map((item, index) => <article key={item.label}><span>0{index + 1}</span><h3 lang="en">{item.label}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.outputsSection} aria-labelledby="outputs-heading">
        <h2 className={styles.sectionIndex} id="outputs-heading" lang="en">03 / YOU WILL SHIP</h2>
        <div className={styles.outputsList}>{deliverables.map((item) => <article key={item.number}><span>{item.number}</span><h3 lang="en">{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.methodSection} aria-labelledby="method-heading">
        <p className={styles.sectionIndex} lang="en">04 / THE METHOD</p>
        <h2 id="method-heading" lang="en">Business → Product → Functional → Quality → Build → Verify</h2>
        <p>هتكتب BRS وPRD وFRS وNFRs عشان الـAI يبني على قرار واضح، مش على تخمين.</p>
      </section>

      <section className={styles.curriculumSection} aria-labelledby="curriculum-heading">
        <h2 className={styles.sectionIndex} id="curriculum-heading" lang="en">05 / 10 LIVE SESSIONS</h2>
        <div className={styles.sessionList}>{courseSessions.map((session, index) => <div key={session}><span>{String(index + 1).padStart(2, '0')}</span><strong lang="en">{session}</strong></div>)}</div>
      </section>

      <section className={styles.offerSection} aria-labelledby="offer-heading">
        <div><p className={styles.sectionIndex} lang="en">FOUNDING COHORT</p><h2 id="offer-heading">5 أسابيع.<br />10 سيشنز.<br />3 <span lang="en">Build Clinics.</span></h2></div>
        <div className={styles.offerCopy}><strong lang="en">6,500 EGP</strong><p>أعضاء قائمة الانتظار لهم أولوية وسعر تأسيسي خاص قبل فتح التسجيل العام.</p>{['Live delivery', 'Recordings', 'Project files', 'Demo Day'].map((item) => <span key={item} lang="en"><Check size={16} /> {item}</span>)}<button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>ادخل قائمة الانتظار <ArrowLeft size={20} /></button></div>
      </section>
    </>
  );
}
