'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownLeft, ArrowLeft, Check, Globe2 } from 'lucide-react';
import { courseSessions, courseStats, projectProof } from './promptToProductData';
import styles from './PromptToProduct.module.css';

type Props = { onJoinWaitlist: () => void };

const audienceUseCases = [
  { label: 'مبتدئين', text: 'معندكش خلفية برمجية، بس عايز تفهم اللي بيحصل بدل ما تجرّب أدوات وخلاص.' },
  { label: 'صاحب فكرة', text: 'عندك مشكلة عايز تحلها، ومحتاج تعرف تبني أول نسخة من غير ما تضيع في التفاصيل.' },
  { label: 'Freelancer', text: 'عايز تحوّل الطلبات المتكررة عند عملائك لأدوات أو Automations تقدر تبيعها.' },
  { label: 'Team Lead', text: 'عايز تعرف تطلب وتراجع وتسلم شغل فريق مبرمجين أو AI agents بثقة.' },
];

const deliverables = [
  { number: '01', title: 'AI Tool', text: 'أداة صغيرة تحل مشكلة فعلية، مش مجرد Prompt في شات.' },
  { number: '02', title: 'Basic SaaS', text: 'منتج فيه Users وData وDashboard ومشكلة عميل واضحة.' },
  { number: '03', title: 'Automation', text: 'Workflow يربط أدواتك ويحوّل البيانات لفعل تلقائي مفيد.' },
];

const documentationPacks = [
  { title: 'قبل ما تبني', text: 'Problem, customer journey, BRS وPRD عشان نعرف بنحل إيه ولمين.' },
  { title: 'قبل ما تصمّم', text: 'User flows, wireframes وFigma handoff عشان كل شاشة لها سبب واضح.' },
  { title: 'قبل ما تسلّم', text: 'FRS, NFRS, stack decisions وsystem design عشان التنفيذ يتراجع ويتكرر.' },
];

export default function CourseLanding({ onJoinWaitlist }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <header className={styles.campaignHeader}>
        <Link href="/" className={styles.mekkyMark} aria-label="Muhammed Mekky home" lang="en">M/M</Link>
        <span lang="en">AI Product Engineer</span>
        <button type="button" onClick={onJoinWaitlist} lang="en">Join the waitlist <ArrowLeft size={16} /></button>
      </header>

      <section className={styles.hero} aria-labelledby="course-title">
        <Image className={styles.heroImage} src="/hero_poster.webp" alt="Muhammed Mekky building with AI" fill priority sizes="100vw" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <motion.p className={styles.eyebrow} lang="en" initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>FOUNDATIONAL BUILDING PROGRAM</motion.p>
        <motion.h1 id="course-title" lang="en" initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <span>AI Product</span><span className={styles.productLine}><i>for</i><span>Engineers</span></span>
        </motion.h1>
        <motion.div className={styles.heroBottom} initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2>عندك فكرة، وبتعرف تطلب من الـAI.<br />بس مش عارف <em>هو بيبني صح ولا لأ.</em></h2>
          <div>
            <p>هتفهم المنتج والنظام الأول، وبعدها تقود الـAI أو فريق مبرمجين عشان تطلع بحاجة تشتغل، تتراجع، وتتبع.</p>
            <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>شوف لو المسار مناسب ليك <ArrowDownLeft size={20} /></button>
            <small>دقيقتين فقط · للدفعة التأسيسية</small>
          </div>
        </motion.div>
      </section>

      <section className={styles.gapSection} aria-labelledby="gap-heading">
        <h2 className={styles.sectionIndex} id="gap-heading" lang="en">01 / THE REAL GAP</h2>
        <div className={styles.gapHeadline} lang="en"><span>Demo</span><ArrowLeft aria-hidden="true" /><strong>Product</strong></div>
        <div className={styles.gapColumns}>
          <p>الـAI يقدر يطلعلك أول screen وhappy path وحاجة شكلها حلوة في الـpreview.</p>
          <p>بس العميل محتاج product: مشكلة واضحة، data حقيقية، validation، security، testing وقرار هندسي ورا كل خطوة.</p>
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-heading">
        <div className={styles.statsGrid}>{courseStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <h2 className={styles.proofLine} id="proof-heading">مش هنبني أمثلة مدرسية. <span lang="en">3</span> منتجات هتمشي فيها من المشكلة لحد النشر. <Globe2 size={20} /></h2>
        <div className={styles.projectRail}>{projectProof.map((project, index) => <figure key={project.title} className={styles.projectFigure}><Image src={project.image} alt={project.title} width={1200} height={800} sizes="(max-width: 800px) 88vw, 40vw" /><figcaption lang="en"><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.kind}</small><p>{project.description}</p></figcaption></figure>)}</div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="audience-heading">
        <p className={styles.sectionIndex} lang="en">02 / THIS IS FOR YOU IF</p>
        <h2 id="audience-heading">مش لازم تكون مبرمج.<br /><em>بس لازم تبقى فاهم.</em></h2>
        <div className={styles.audienceList}>{audienceUseCases.map((item, index) => <article key={item.label}><span>0{index + 1}</span><h3 lang="en">{item.label}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.outputsSection} aria-labelledby="outputs-heading">
        <h2 className={styles.sectionIndex} id="outputs-heading" lang="en">03 / YOU WILL BUILD</h2>
        <div className={styles.outputsList}>{deliverables.map((item) => <article key={item.number}><span>{item.number}</span><h3 lang="en">{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.methodSection} aria-labelledby="method-heading">
        <p className={styles.sectionIndex} lang="en">04 / THE MINDSET</p>
        <h2 id="method-heading" lang="en">Understand → Decide → Direct → Verify</h2>
        <p>المطلوب مش تحفظ أسماء tools. المطلوب تعرف تسأل السؤال الصح، تختار القرار المناسب، وتراجع اللي اتبنى باسمك.</p>
      </section>

      <section className={styles.pathSection} aria-labelledby="path-heading">
        <div className={styles.pathIntro}>
          <p className={styles.sectionIndex} lang="en">05 / THE LEARNING PATH</p>
          <h2 id="path-heading">مش هنرميك في tool ونقولك ابنِ.<br />هتمشي <em>بالترتيب اللي يخليك فاهم.</em></h2>
          <p>كل مرحلة بتبني على اللي قبلها: متختارش stack قبل ما تفهم الويب، ومتعملش UI قبل ما تفهم العميل، ومتطلبش كود قبل ما تحدد المطلوب.</p>
        </div>
        <div className={styles.pathList}>{courseSessions.map((session, index) => <article key={session}><span>{String(index + 1).padStart(2, '0')}</span><strong lang="en">{session}</strong></article>)}</div>
      </section>

      <section className={styles.docsSection} aria-labelledby="docs-heading">
        <div className={styles.docsIntro}>
          <p className={styles.sectionIndex} lang="en">06 / THE DOCUMENTATION SYSTEM</p>
          <h2 id="docs-heading">مش هنديّك 60 template عشان تملاهم.<br /><em>هتعرف إمتى كل وثيقة تنقذك.</em></h2>
        </div>
        <div className={styles.docsList}>{documentationPacks.map((pack, index) => <article key={pack.title}><span>0{index + 1}</span><h3>{pack.title}</h3><p>{pack.text}</p></article>)}</div>
        <p className={styles.docsNote}>هتشتغل على BRS وPRD وFRS وNFRS وUser Flows وFigma Handoff وTech Stack Decisions وSystem Design، حسب حجم المشروع والمشكلة اللي بتحلها.</p>
      </section>

      <section className={styles.offerSection} aria-labelledby="offer-heading">
        <div><p className={styles.sectionIndex} lang="en">FOUNDING COHORT</p><h2 id="offer-heading">من “مش فاهم الكود ده بيعمل إيه؟”<br />لـ <span lang="en">“I can lead this build.”</span></h2></div>
        <div className={styles.offerCopy}><strong>الدفعة التأسيسية</strong><p>هتخرج بـ3 منتجات، portfolio يشرح قراراتك، وطريقة شغل تمكّنك تبني أو تقود بناء منتجات حقيقية.</p>{['Live delivery', 'Recordings', 'Project files', 'Demo Day'].map((item) => <span key={item} lang="en"><Check size={16} /> {item}</span>)}<button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>ادخل قائمة الاهتمام <ArrowLeft size={20} /></button></div>
      </section>
    </>
  );
}
