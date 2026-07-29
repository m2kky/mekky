'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownLeft, ArrowLeft, Check, ChevronDown, Globe2 } from 'lucide-react';
import { courseSessions, courseStats, detailedSessions, projectProof } from './promptToProductData';
import styles from './PromptToProduct.module.css';

type Props = { onJoinWaitlist: () => void };

const audienceUseCases = [
  { label: 'مبتدئين', text: 'معندكش خلفية برمجية، بس عايز تفهم اللي بيحصل بدل ما تجرّب أدوات وخلاص.' },
  { label: 'صاحب فكرة', text: 'عندك مشكلة عايز تحلها، ومحتاج تعرف تبني أول نسخة من غير ما تضيع في التفاصيل.' },
  { label: 'Freelancer', text: 'عايز تحوّل الطلبات المتكررة عند عملائك لأدوات أو Automations تقدر تبيعها.' },
  { label: 'Team Lead', text: 'عايز تعرف تطلب وتراجع وتسلم شغل فريق مبرمجين أو AI agents بثقة.' },
];

const deliverables = [
  { number: '01', title: 'AI Tool', path: 'AI → Web → APIs → Build', text: 'أداة صغيرة تفهمك رحلة الـinput والـAI response والبيانات، مش مجرد Prompt في شات.' },
  { number: '02', title: 'Basic SaaS', path: 'Problem → Docs → UI → Architecture → Deploy', text: 'المشروع الرئيسي: Users وData وDashboard ومشكلة عميل واضحة، من الفكرة لمنتج منشور.' },
  { number: '03', title: 'Automation', path: 'Trigger → API → AI → Action → Monitoring', text: 'Workflow تربط أنظمة حقيقية، تتعامل مع الأخطاء، وتقدر تستخدمها أو تبيعها.' },
];

const documentationPacks = [
  { title: 'Business', text: 'Business Case, BRS, Stakeholder Map, Scope وRisk Register.' },
  { title: 'Product', text: 'PRD, Personas, User Stories, Use Cases وAcceptance Criteria.' },
  { title: 'UX', text: 'Customer Journey, User Flow, Sitemap, Wireframes وFigma Handoff.' },
  { title: 'Technical', text: 'FRS, NFRS, ERD, API Specification, Stack Decisions وSystem Design.' },
  { title: 'Delivery', text: 'Backlog, Definition of Done, Test Plan وRelease Checklist.' },
  { title: 'Operations', text: 'Monitoring, Incident Response, Backup وRollback Plan.' },
];

const programFacts = [
  { value: '10', label: 'أسابيع' },
  { value: '8', label: 'وحدات هندسية' },
  { value: '20', label: 'سيشن Live' },
  { value: '3', label: 'منتجات حقيقية' },
];

const comparisonRows = [
  ['اكتب Prompt', 'اكتب Requirements'],
  ['طلّع Screens', 'صمّم Customer Journey'],
  ['استخدم Tool ترند', 'اختار Stack حسب الهدف'],
  ['خلي الـAI يكتب الكود', 'قسّم ووجّه وراجع التنفيذ'],
  ['طالما اشتغل يبقى تمام', 'اختبر وأمّن وانشر وراقب'],
  ['اعمل Demo', 'ابنِ Product تقدر تشغله وتبيعه'],
];

const weeklyRhythm = [
  { value: '2', title: 'سيشن Live أسبوعيًا', text: 'ساعتان ونصف للسيشن: فهم، تطبيق، ومراجعة.' },
  { value: '3–5', title: 'ساعات بناء', text: 'تكمل الجزء المطلوب من منتجك بين السيشنز.' },
  { value: '1', title: 'Project Checkpoint', text: 'Feedback على قراراتك وتسليمك قبل ما تكمل.' },
  { value: '50', title: 'ساعة Live إجمالًا', text: 'مع Recordings وProject Files وDemo Day.' },
];

const relatedLectures = [
  {
    title: 'Automate Your Life',
    href: '/lectures/automate-your-life',
    videoId: '1SWrZsQLnVmMJAMziddPzlNlTBXXLIAsw',
    description: 'ابدأ تفكر في الشغل كنظام، وابنِ أول workflow يوفّر عليك المهام المتكررة.',
  },
  {
    title: 'From Prompt to Profit',
    href: '/lectures/power-of-prompts',
    videoId: '1uh5T8nWn0cXjheG1q7AayGoiyStdxSjx',
    description: 'شوف إزاي الـprompt يتحول من إجابة حلوة لخدمة أو منتج له قيمة تجارية.',
  },
];

type CurriculumSession = (typeof courseSessions)[number];

function CurriculumCard({ session, index, reducedMotion }: { session: CurriculumSession; index: number; reducedMotion: boolean | null }) {
  const stepRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stepRef, offset: ['start 95%', 'start 45%'] });
  const direction = index % 3;
  const x = useTransform(scrollYProgress, [0, 1], [direction === 1 ? 180 : direction === 2 ? -180 : 0, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [direction === 0 ? 160 : 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [.35, 1]);

  return (
    <div className={styles.curriculumStep} ref={stepRef}>
      <motion.article
        className={styles.curriculumCard}
        style={reducedMotion ? { zIndex: index + 1 } : { x, y, opacity, zIndex: index + 1 }}
      >
        <div className={styles.curriculumMeta}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <small lang="en">{session.stage}</small>
            <b>{session.sessions} سيشن</b>
          </div>
        </div>
        <div className={styles.curriculumContent}>
          <h3>{session.title}</h3>
          <p>{session.summary}</p>
          <ul>{session.topics.map((topic) => <li key={topic} lang="en">{topic}</li>)}</ul>
          <div className={styles.curriculumOutput}>
            <small>هتخرج بإيه؟</small>
            <strong>{session.output}</strong>
            {session.milestone ? <span lang="en">{session.milestone}</span> : null}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function CourseLanding({ onJoinWaitlist }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <header className={styles.campaignHeader}>
        <Link href="/" className={styles.mekkyMark} aria-label="Muhammed Mekky home" lang="en">M/M</Link>
        <span lang="en">AI Product Engineer</span>
        <button type="button" onClick={onJoinWaitlist}>قدّم للدفعة التأسيسية <ArrowLeft size={16} /></button>
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
            <p>خلال 10 أسابيع هتفهم المنتج والنظام، تكتب المطلوب، تختار التكنولوجيا، وتقود فريق AI أو مبرمجين لحد النشر.</p>
            <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>قدّم للدفعة التأسيسية <ArrowDownLeft size={20} /></button>
            <small>دقيقتين فقط · للدفعة التأسيسية</small>
          </div>
        </motion.div>
        <div className={styles.programFacts} aria-label="Program facts">
          {programFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </div>
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
        <div className={styles.liveProof}>
          <div className={styles.liveProofCopy}>
            <p className={styles.sectionIndex} lang="en">BUILT FROM REAL CLASSROOMS</p>
            <h2 id="proof-heading">الكورس ده اتبنى وسط ناس حقيقية.<br /><em>واتطوّر من أسئلتهم وتجاربهم.</em></h2>
            <p>بدأنا بمجموعتين في كامب سابق، وبعدها أكتر من 213 شخص حضروا معانا اللايف. كل سؤال ومشكلة ظهرت هناك دخلت في تصميم المنهج الجديد.</p>
            <a className={styles.primaryCta} href="https://www.youtube.com/live/yZ9zv3C85Hg?si=QS5UodfllIomXCfl" target="_blank" rel="noreferrer">شوف اللايف على يوتيوب <ArrowLeft size={20} /></a>
          </div>
          <div className={styles.videoFrame}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/yZ9zv3C85Hg?rel=0"
              title="Vibe Coding live lecture"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="audience-heading">
        <p className={styles.sectionIndex} lang="en">02 / THIS IS FOR YOU IF</p>
        <h2 id="audience-heading">مش لازم تكون مبرمج.<br /><em>بس لازم تبقى فاهم.</em></h2>
        <div className={styles.audienceList}>{audienceUseCases.map((item, index) => <article key={item.label}><span>0{index + 1}</span><h3 lang="en">{item.label}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.outputsSection} aria-labelledby="outputs-heading">
        <h2 className={styles.sectionIndex} id="outputs-heading" lang="en">03 / YOU WILL BUILD</h2>
        <div className={styles.outputsIntro}>
          <h3>مش هنبني أمثلة مدرسية.<br /><em>3 منتجات تقدر تعرضها، تطورها، أو تبيعها.</em></h3>
        </div>
        <div className={styles.outputsList}>{deliverables.map((item) => <article key={item.number}><span>{item.number}</span><div><h3 lang="en">{item.title}</h3><small lang="en">{item.path}</small></div><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.comparisonSection} aria-labelledby="comparison-heading">
        <p className={styles.sectionIndex} lang="en">04 / VIBE CODING VS PRODUCT ENGINEERING</p>
        <div className={styles.comparisonIntro}>
          <h2 id="comparison-heading">الفرق بين إن الـAI يبني لك حاجة،<br /><em>وإنك تعرف تقود بناء منتج.</em></h2>
          <p>مش بنهاجم الأدوات. بنحطها في مكانها الصح: التنفيذ أسرع، لكن القرار والمراجعة مسؤوليتك.</p>
        </div>
        <div className={styles.comparisonTable}>
          <div className={styles.comparisonHead}><span lang="en">Vibe Coding</span><span lang="en">AI Product Engineering</span></div>
          {comparisonRows.map(([before, after]) => <div key={before}><span>{before}</span><strong>{after}</strong></div>)}
        </div>
      </section>

      <section className={styles.pathSection} aria-labelledby="path-heading">
        <div className={styles.pathIntro}>
          <p className={styles.sectionIndex} lang="en">05 / THE CURRICULUM</p>
          <h2 id="path-heading">من أول “الـAI بيعمل إيه؟”<br />لحد <em>منتج منشور وعميل بيدفع.</em></h2>
          <p>8 وحدات مترتبة. في كل واحدة هتفهم قرار هندسي، تطبقه، وتضيف أصل حقيقي للمشروع بدل ما تجمع معلومات وخلاص.</p>
        </div>
        <div className={styles.pathList}>{courseSessions.map((session, index) => <CurriculumCard key={session.stage} session={session} index={index} reducedMotion={shouldReduceMotion} />)}</div>
      </section>

      <section className={styles.syllabusSection} aria-labelledby="syllabus-heading">
        <div className={styles.syllabusIntro}>
          <p className={styles.sectionIndex} lang="en">06 / 20 LIVE SESSIONS</p>
          <h2 id="syllabus-heading">عايز تدخل في التفاصيل؟<br /><em>افتح أي سيشن وشوف هتطلع منها بإيه.</em></h2>
          <p>مش لازم تقرأهم كلهم دلوقتي. التفاصيل موجودة عشان تعرف إن كل ساعة في البرنامج لها هدف وتسليم واضح.</p>
        </div>
        <div className={styles.sessionAccordion}>
          {detailedSessions.map((session) => (
            <details key={session.number} name="course-session">
              <summary>
                <span>{String(session.number).padStart(2, '0')}</span>
                <div><small lang="en">{session.unit}</small><strong>{session.title}</strong></div>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className={styles.sessionDetails}>
                <div><small>هتفهم</small><p>{session.understand}</p></div>
                <div><small>هتطبق</small><p>{session.apply}</p></div>
                <div><small>هتخرج بـ</small><p>{session.output}</p></div>
              </div>
            </details>
          ))}
        </div>
        <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>قدّم للدفعة التأسيسية <ArrowLeft size={20} /></button>
      </section>

      <section className={styles.docsSection} aria-labelledby="docs-heading">
        <div className={styles.docsIntro}>
          <p className={styles.sectionIndex} lang="en">07 / 60+ DOCUMENTS</p>
          <h2 id="docs-heading">60+ وثيقة وقالب تحت إيدك.<br /><em>بس هتستخدم اللي مشروعك محتاجه.</em></h2>
        </div>
        <div className={styles.docsList}>{documentationPacks.map((pack, index) => <article key={pack.title}><span>0{index + 1}</span><h3>{pack.title}</h3><p>{pack.text}</p></article>)}</div>
        <p className={styles.docsNote}>هتاخد Document Decision Map تعرفك إمتى تستخدم BRS أوPRD أوFRS أوNFRS أوUser Flow أوSystem Design. مش هنقيس شغلك بعدد الملفات اللي مليتها.</p>
      </section>

      <section className={styles.weekSection} aria-labelledby="week-heading">
        <p className={styles.sectionIndex} lang="en">08 / YOUR WEEK</p>
        <div className={styles.weekIntro}>
          <h2 id="week-heading">مش هتتفرج وتقول فهمت.<br /><em>كل أسبوع فيه فهم، بناء، ومراجعة.</em></h2>
          <p>إيقاع ثابت يخليك تتحرك من غير ما الكورس يبلع حياتك أو تسيب المشروع يتراكم لآخر أسبوع.</p>
        </div>
        <div className={styles.weekGrid}>
          {weeklyRhythm.map((item) => <article key={item.title}><strong>{item.value}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>

      <section className={styles.freeLibrarySection} aria-labelledby="free-library-heading">
        <div className={styles.freeLibraryHeader}>
          <p className={styles.sectionIndex} lang="en">09 / FREE LEARNING LIBRARY</p>
          <h3 id="free-library-heading">عايز تجرّب طريقة الشرح الأول؟<br />ابدأ بالمحاضرتين دول مجانًا.</h3>
          <p>شغّل المحاضرة من هنا، أو افتح صفحتها لو عايز التفاصيل والموضوعات كاملة.</p>
        </div>
        <div className={styles.freeLecturesGrid}>
          {relatedLectures.map((lecture) => (
            <article className={styles.freeLectureCard} key={lecture.href}>
              <div className={styles.freeLectureVideo}>
                <iframe
                  src={`https://drive.google.com/file/d/${lecture.videoId}/preview`}
                  title={lecture.title}
                  loading="lazy"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
              <div className={styles.freeLectureBody}>
                <h4 lang="en">{lecture.title}</h4>
                <p>{lecture.description}</p>
                <Link href={lecture.href}>افتح المحاضرة كاملة <ArrowLeft size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.productProofSection} aria-labelledby="product-proof-heading">
        <div className={styles.productProofIntro}>
          <p className={styles.sectionIndex} lang="en">10 / BUILT BEFORE. YOUR TURN NEXT.</p>
          <h2 id="product-proof-heading">المنهج جاي من منتجات اتبنت فعلًا.<br /><em>وفي الـDemo Day هتقدم منتجك أنت.</em></h2>
          <p>دي أمثلة على نوع القرارات اللي هتتعلم تقودها، مش مشاريع هتنسخها خطوة بخطوة.</p>
        </div>
        <h3 className={styles.proofLine}>منتجات حقيقية اتبنت واتنشرت. <Globe2 size={20} /></h3>
        <div className={styles.projectRail}>{projectProof.map((project, index) => <figure key={project.title} className={styles.projectFigure}><Image src={project.image} alt={project.title} width={1200} height={800} sizes="(max-width: 800px) 88vw, 40vw" /><figcaption lang="en"><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.kind}</small><p>{project.description}</p></figcaption></figure>)}</div>
      </section>

      <section className={styles.offerSection} aria-labelledby="offer-heading">
        <div><p className={styles.sectionIndex} lang="en">FOUNDING COHORT</p><h2 id="offer-heading">من “الـAI طلعلي حاجة”<br />لـ <span lang="en">“I can lead this product.”</span></h2></div>
        <div className={styles.offerCopy}>
          <strong>قدّم للدفعة التأسيسية</strong>
          <p>10 أسابيع تنتهي بـ3 منتجات، Documentation وPortfolio يشرح قراراتك، وPricing Strategy وخطة لأول عميل.</p>
          {['20 Live sessions', 'Recordings & project files', 'Feedback & checkpoints', '60+ document library', 'Demo Day'].map((item) => <span key={item} lang="en"><Check size={16} /> {item}</span>)}
          <div className={styles.priceAnchor}>
            <small>سعر الدفعة التأسيسية</small>
            <b>10,500 جنيه</b>
            <p>دفعة واحدة أو 3 دفعات × 3,500 جنيه. السعر المستهدف بعد أول دفعة هو 14,900 جنيه.</p>
          </div>
          <button className={styles.primaryCta} type="button" onClick={onJoinWaitlist}>قدّم للدفعة التأسيسية <ArrowLeft size={20} /></button>
          <small>التقديم بياخد دقيقتين ومفيش دفع دلوقتي.</small>
        </div>
      </section>
    </>
  );
}
