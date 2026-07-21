'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  return (
    <>
      <header className={styles.campaignHeader}>
        <Link href="/" className={styles.mekkyMark} aria-label="Muhammed Mekky home">M/M</Link>
        <span>Prompt to Product</span>
        <button type="button" onClick={onJoinWaitlist}>Join the waitlist <ArrowLeft size={16} /></button>
      </header>

      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/hero_poster.webp" alt="Muhammed Mekky building with AI" fill priority sizes="100vw" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <motion.p className={styles.eyebrow} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>Live Online Camp · 5 Weeks</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <span>Prompt</span><i>to</i><span>Product</span>
        </motion.h1>
        <motion.div className={styles.heroBottom} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2>مش هتتعلم أداة.<br />هتتعلم تحوّل الفكرة <em>لمنتج حقيقي.</em></h2>
          <div>
            <p>من الـrequirements والـUI/UX لحد الـbackend، الـdatabase، الاختبار والـdeployment.</p>
            <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>سجّل اهتمامك <ArrowDownLeft size={20} /></button>
            <small>دقيقتين فقط · أولوية للدفعة التأسيسية</small>
          </div>
        </motion.div>
      </section>

      <section className={styles.gapSection}>
        <p className={styles.sectionIndex}>01 / THE GAP</p>
        <div className={styles.gapHeadline}><span>Demo</span><ArrowLeft aria-hidden="true" /><strong>Product</strong></div>
        <div className={styles.gapColumns}>
          <p>أول Screen، happy path، placeholder content، وكل حاجة شغالة في الـpreview.</p>
          <p>Requirements، UX، real data، validation، security، testing، analytics وdeployment.</p>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.statsGrid}>{courseStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <p className={styles.proofLine}>284+ products shipped. 263+ clients. <Globe2 size={20} /> 15+ countries.</p>
        <div className={styles.projectRail}>{projectProof.map((project, index) => <figure key={project.title} className={styles.projectFigure}><Image src={project.image} alt={project.title} width={1200} height={800} sizes="(max-width: 800px) 88vw, 40vw" /><figcaption><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.kind}</small></figcaption></figure>)}</div>
      </section>

      <section className={styles.audienceSection}>
        <p className={styles.sectionIndex}>02 / BUILT FOR BUILDERS</p>
        <h2>المجال مختلف.<br /><em>عقلية البناء واحدة.</em></h2>
        <div className={styles.audienceList}>{audienceUseCases.map((item, index) => <article key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.outputsSection}>
        <p className={styles.sectionIndex}>03 / YOU WILL SHIP</p>
        <div className={styles.outputsList}>{deliverables.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.methodSection}>
        <p className={styles.sectionIndex}>04 / THE METHOD</p>
        <h2>Business → Product → Functional → Quality → Build → Verify</h2>
        <p>هتكتب BRS وPRD وFRS وNFRs عشان الـAI يبني على قرار واضح، مش على تخمين.</p>
      </section>

      <section className={styles.curriculumSection}>
        <p className={styles.sectionIndex}>05 / 10 LIVE SESSIONS</p>
        <div className={styles.sessionList}>{courseSessions.map((session, index) => <div key={session}><span>{String(index + 1).padStart(2, '0')}</span><strong>{session}</strong></div>)}</div>
      </section>

      <section className={styles.offerSection}>
        <div><p className={styles.sectionIndex}>FOUNDING COHORT</p><h2>5 أسابيع.<br />10 سيشنز.<br />3 Build Clinics.</h2></div>
        <div className={styles.offerCopy}><strong>6,500 EGP</strong><p>أعضاء قائمة الانتظار لهم أولوية وسعر تأسيسي خاص قبل فتح التسجيل العام.</p>{['Live delivery', 'Recordings', 'Project files', 'Demo Day'].map((item) => <span key={item}><Check size={16} /> {item}</span>)}<button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>ادخل قائمة الانتظار <ArrowLeft size={20} /></button></div>
      </section>
    </>
  );
}
