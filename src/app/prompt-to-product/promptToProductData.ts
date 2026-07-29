export const WAITLIST_ID = 'prompt-to-product-2026';
export const WAITLIST_STORAGE_KEY = 'prompt-to-product-waitlist-progress-v1';

export type WaitlistQuestionType = 'choice' | 'multi-select';
export type WaitlistOption = { value: string; label: string };
export type WaitlistQuestion = {
  id: 'role' | 'experience' | 'tools' | 'firstBuild' | 'blocker' | 'commitment' | 'budget';
  type: WaitlistQuestionType;
  eyebrow: string;
  prompt: string;
  helper?: string;
  options: WaitlistOption[];
};

export type WaitlistAnswers = Record<string, string | string[]>;
export type WaitlistPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  answers?: unknown;
  website?: unknown;
};

export type WaitlistIdentity = {
  fullName: string;
  email: string;
  phone: string;
};

export type WaitlistIdentityErrors = Partial<Record<keyof WaitlistIdentity, string>>;

export type StoredWaitlistAnswer = {
  questionId: string;
  type: WaitlistQuestionType;
  prompt: string;
  answer: string[];
};

export type NormalizedWaitlistSubmission = {
  fullName: string;
  email: string;
  phone: string;
  answers: StoredWaitlistAnswer[];
};

export const waitlistQuestions: WaitlistQuestion[] = [
  {
    id: 'role',
    type: 'choice',
    eyebrow: 'عن شغلك',
    prompt: 'إيه أقرب وصف ليك دلوقتي؟',
    options: [
      { value: 'founder', label: 'Founder / Business Owner' },
      { value: 'media-buyer', label: 'Media Buyer / Performance Marketer' },
      { value: 'marketer', label: 'Marketer / Content Creator' },
      { value: 'designer', label: 'Designer' },
      { value: 'developer', label: 'Developer' },
      { value: 'freelancer', label: 'Freelancer' },
      { value: 'student', label: 'Student / Career Switcher' },
      { value: 'other', label: 'حاجة تانية' },
    ],
  },
  {
    id: 'experience',
    type: 'choice',
    eyebrow: 'مستواك الحالي',
    prompt: 'خبرتك مع البرمجة عاملة إزاي؟',
    options: [
      { value: 'none', label: 'معنديش خبرة برمجية' },
      { value: 'basics', label: 'عارف أساسيات HTML/CSS أو مفاهيم تقنية' },
      { value: 'ai-builder', label: 'بنيت حاجات بأدوات AI' },
      { value: 'debugger', label: 'بعرف أعدّل وأعمل Debug للكود' },
      { value: 'professional', label: 'بشتغل Development بشكل احترافي' },
    ],
  },
  {
    id: 'tools',
    type: 'multi-select',
    eyebrow: 'أدواتك',
    prompt: 'جربت تستخدم إيه قبل كده؟',
    helper: 'ممكن تختار أكتر من إجابة.',
    options: [
      { value: 'chatgpt', label: 'ChatGPT' },
      { value: 'claude', label: 'Claude' },
      { value: 'coding-agents', label: 'Codex / Claude Code / Cursor' },
      { value: 'lovable', label: 'Lovable' },
      { value: 'replit', label: 'Replit' },
      { value: 'v0-bolt', label: 'v0 / Bolt' },
      { value: 'none', label: 'لسه مجربتش' },
    ],
  },
  {
    id: 'firstBuild',
    type: 'choice',
    eyebrow: 'الهدف',
    prompt: 'إيه أول حاجة نفسك تبنيها؟',
    options: [
      { value: 'portfolio', label: 'Personal Portfolio' },
      { value: 'landing', label: 'Landing Page' },
      { value: 'micro-tool', label: 'Micro Tool' },
      { value: 'marketing-tool', label: 'Marketing Calculator / Dashboard / Audit Tool' },
      { value: 'saas', label: 'SaaS / Customer-facing Product' },
      { value: 'internal-tool', label: 'Internal Business Tool' },
      { value: 'undecided', label: 'لسه محددتش' },
    ],
  },
  {
    id: 'blocker',
    type: 'choice',
    eyebrow: 'العائق',
    prompt: 'إيه أكتر حاجة بتعطلك؟',
    options: [
      { value: 'spec', label: 'تحويل الفكرة لـSpec واضحة' },
      { value: 'design', label: 'UI/UX وجودة الشكل' },
      { value: 'stack', label: 'اختيار الـStack الصح' },
      { value: 'backend', label: 'Backend / Database / Authentication' },
      { value: 'debugging', label: 'Debugging للشغل المولّد بالـAI' },
      { value: 'production', label: 'Testing / Security / Deployment' },
    ],
  },
  {
    id: 'commitment',
    type: 'choice',
    eyebrow: 'الالتزام',
    prompt: 'تقدر تخصص كام ساعة أسبوعيًا غير السيشنز؟',
    options: [
      { value: 'under-3', label: 'أقل من 3 ساعات' },
      { value: '3-5', label: 'من 3 لـ5 ساعات' },
      { value: '5-8', label: 'من 5 لـ8 ساعات' },
      { value: 'over-8', label: 'أكتر من 8 ساعات' },
    ],
  },
  {
    id: 'budget',
    type: 'choice',
    eyebrow: 'الاستثمار',
    prompt: 'لو تم قبولك في الدفعة التأسيسية، إيه نظام الاستثمار الأنسب ليك؟',
    options: [
      { value: 'pay-full', label: '10,500 جنيه دفعة واحدة' },
      { value: 'pay-three', label: '3 دفعات × 3,500 جنيه' },
      { value: 'longer-plan', label: 'أحتاج خطة تقسيط أطول' },
      { value: 'over-budget', label: 'السعر أعلى من ميزانيتي الحالية' },
      { value: 'value-supported', label: 'السعر مناسب لو مستوى المتابعة زي الموضح' },
    ],
  },
];

export const courseStats = [
  { value: '25', label: 'شخص حضروا الكامب السابق' },
  { value: '2', label: 'مجموعتين اتعلموا وطبقوا معانا' },
  { value: '213+', label: 'شخص حضروا محاضرة الـVibe Coding Live' },
];

export const courseSessions = [
  {
    stage: 'AI Foundation',
    sessions: 2,
    title: 'افهم الـAI وقُد شغله',
    summary: 'هتعرف إمتى تعتمد عليه، إمتى تراجعه، وإزاي تديله سياق ومعايير تمنعه من التخمين.',
    topics: ['AI vs Agent', 'Hallucinations', 'Prompting', 'Context Engineering'],
    output: 'AI Working Manual وChecklist لمراجعة النتائج.',
  },
  {
    stage: 'Web Foundation',
    sessions: 2,
    title: 'افهم الويب اللي منتجك هيعيش عليه',
    summary: 'من أول المتصفح والسيرفر لحد أنواع المواقع والفرق بين CSR وSSR وSSG وISR.',
    topics: ['Frontend & Backend', 'Domains & Hosting', 'Rendering', 'Website Types'],
    output: 'Web Architecture Map لنظام حقيقي.',
  },
  {
    stage: 'Data & APIs',
    sessions: 3,
    title: 'البيانات والـAPIs والأمان',
    summary: 'هتفهم قواعد البيانات وأنواعها، التطبيقات بتكلم بعضها إزاي، والمفاتيح والصلاحيات بتتحمى إزاي.',
    topics: ['SQL & NoSQL', 'Vector DB', 'APIs & Webhooks', 'Auth & Secrets'],
    output: 'ERD وAPI Flow وأول AI Tool شغالة.',
    milestone: 'PROJECT 01 / AI TOOL',
  },
  {
    stage: 'Product Discovery',
    sessions: 2,
    title: 'ابدأ من مشكلة العميل',
    summary: 'هتحدد العميل والمشكلة والقيمة، وترسم Customer Journey وUser Flow قبل ما ترسم شاشة واحدة.',
    topics: ['Niche', 'JTBD', 'Customer Journey', 'User Flows'],
    output: 'مشكلة متحققة، رحلة عميل، وMVP Scope.',
    milestone: 'PROJECT 02 / SAAS START',
  },
  {
    stage: 'Documentation',
    sessions: 3,
    title: 'حوّل الفكرة لمتطلبات واضحة',
    summary: 'هتكتب الوثائق اللي تمنع الفريق أو الـAI من التخمين، وتحدد النجاح وحالات الخطأ من البداية.',
    topics: ['BRS & PRD', 'FRS & NFRS', 'User Stories', 'Acceptance Criteria'],
    output: 'Documentation Pack مناسب لمشروعك، مش ملفات تتملأ وخلاص.',
  },
  {
    stage: 'UX & UI',
    sessions: 2,
    title: 'صمّم التجربة قبل الكود',
    summary: 'هتحوّل الرحلة لـwireframes، تستكشف الواجهة في Stitch، وتبني prototype وdesign system في Figma.',
    topics: ['UX', 'Stitch', 'Figma', 'Design Systems'],
    output: 'Sitemap وWireframes وFigma Prototype وUI Handoff.',
  },
  {
    stage: 'Architecture & Execution',
    sessions: 3,
    title: 'اختار الـStack وصمّم النظام',
    summary: 'هتختار التكنولوجيا حسب الهدف، تصمّم النظام، وتجهز الـrepo والمهام عشان تقود فريق AI أو مبرمجين.',
    topics: ['Stack Matrix', 'System Design', 'Git & AGENTS.md', 'AI Team Management'],
    output: 'Stack Decision وSystem Design وRepo وBacklog وأول Vertical Slice.',
  },
  {
    stage: 'Production & GTM',
    sessions: 3,
    title: 'انشر، سعّر، ووصل لأول عميل',
    summary: 'هتختبر وتأمّن وتنشر، تبني Automation، وتحط Pricing Strategy وعرض وخطة إطلاق قابلة للتنفيذ.',
    topics: ['Testing & Security', 'Deployment', 'Automation', 'Pricing & GTM'],
    output: 'SaaS منشورة، Automation شغالة، Pricing Strategy وLaunch Kit.',
    milestone: 'PROJECTS 02 + 03 / SHIPPED',
  },
];

export const detailedSessions = [
  {
    number: 1,
    unit: 'AI Foundation',
    title: 'افهم الـAI قبل ما تعتمد عليه',
    understand: 'الفرق بين Model وChatbot وCopilot وAgent، وحدود الـAI والـHallucinations.',
    apply: 'تقارن نتائج أكتر من نموذج وتكتشف الأخطاء والافتراضات المخفية.',
    output: 'AI Evaluation Checklist.',
  },
  {
    number: 2,
    unit: 'AI Foundation',
    title: 'Prompting وContext Engineering',
    understand: 'إزاي تحدد الهدف والسياق والقيود والأمثلة ومعايير القبول وتقسم المشكلة.',
    apply: 'تحوّل فكرة غير واضحة لـBrief وتوجّه Agent ثم تراجع شغله.',
    output: 'AI Working Manual.',
  },
  {
    number: 3,
    unit: 'Web Foundation',
    title: 'من المتصفح للسيرفر',
    understand: 'Browser وHTTP وDNS وDomain وHosting والفرق بين Frontend وBackend.',
    apply: 'تتبع رحلة Request كاملة في موقع حقيقي.',
    output: 'Browser-to-server map.',
  },
  {
    number: 4,
    unit: 'Web Foundation',
    title: 'أنواع المواقع وقرارات الـRendering',
    understand: 'Static وDynamic وSPA وPWA والفرق بين CSR وSSR وSSG وISR.',
    apply: 'تحلل منتجات حقيقية وتختار النوع والـRendering المناسب.',
    output: 'Web Architecture Map.',
  },
  {
    number: 5,
    unit: 'Data & APIs',
    title: 'قواعد البيانات وتصميم البيانات',
    understand: 'SQL وNoSQL وVector DB وStorage والعلاقات بين البيانات.',
    apply: 'تصمم Users وSubscriptions وProjects وGenerated Content.',
    output: 'ERD لأول منتج.',
  },
  {
    number: 6,
    unit: 'Data & APIs',
    title: 'APIs وWebhooks والهوية',
    understand: 'Requests وJSON وStatus Codes وWebhooks وAuth وRoles وSecrets.',
    apply: 'تجرب API حقيقية وتتعامل مع النجاح والفشل وتحمي الـAPI Key.',
    output: 'API Flow وSecurity Checklist.',
  },
  {
    number: 7,
    unit: 'Data & APIs',
    title: 'ابنِ أول AI Tool',
    understand: 'إزاي تتجمع الواجهة والـAI API والـState والبيانات في منتج واحد.',
    apply: 'تبني Content Generator فيها Loading وErrors وحفظ للنتائج.',
    output: 'مشروع 01: AI Tool شغالة.',
  },
  {
    number: 8,
    unit: 'Product Discovery',
    title: 'اختار مشكلة تستحق البناء',
    understand: 'Niche وICP وJTBD وPain Points وValue Proposition والتحقق من الافتراضات.',
    apply: 'تكتب Problem Statement وتعمل بحثًا ومقابلات تحقق بسيطة.',
    output: 'Validated Product Opportunity.',
  },
  {
    number: 9,
    unit: 'Product Discovery',
    title: 'Customer Journey وMVP Scope',
    understand: 'Happy Path وEdge Cases وTouchpoints والأولويات ومقاييس النجاح.',
    apply: 'ترسم الرحلة من اكتشاف المنتج للقيمة والدفع وتحدد الـMVP.',
    output: 'Customer Journey وUser Flow وSaaS Scope.',
  },
  {
    number: 10,
    unit: 'Documentation',
    title: 'اختار الوثائق واكتب BRS',
    understand: 'Business Objectives وStakeholders وScope وConstraints ومتى تستخدم كل وثيقة.',
    apply: 'تختار Minimum Documentation Pack وتكتب BRS لمشروعك.',
    output: 'BRS وDocument Decision Map.',
  },
  {
    number: 11,
    unit: 'Documentation',
    title: 'اكتب PRD قابل للبناء',
    understand: 'Goals وPersonas وUse Cases وUser Stories وAcceptance Criteria والحالات المختلفة.',
    apply: 'تكتب PRD لأول Feature في مشروع الـSaaS.',
    output: 'PRD وAcceptance Criteria.',
  },
  {
    number: 12,
    unit: 'Documentation',
    title: 'FRS وNFRS وتتبع المتطلبات',
    understand: 'Business Rules وData/API Requirements والأداء والأمان والتوسع والـTraceability.',
    apply: 'تكمل حزمة المتطلبات وتجربها مع AI وتراجع افتراضاته.',
    output: 'FRS وNFRS وTraceability Matrix.',
  },
  {
    number: 13,
    unit: 'UX & UI',
    title: 'حوّل رحلة العميل لشاشات',
    understand: 'Information Architecture وSitemap وWireframes والـStates والـResponsive والـAccessibility.',
    apply: 'تحوّل أهم User Flow لشاشات وتختبر إن المستخدم يقدر يكملها.',
    output: 'Sitemap وWireframes.',
  },
  {
    number: 14,
    unit: 'UX & UI',
    title: 'Stitch وFigma وDesign Handoff',
    understand: 'Design Brief وHierarchy وTokens وComponents وPrototype وHandoff.',
    apply: 'تستكشف اتجاهات في Stitch وتبني Prototype قابل للنقر في Figma.',
    output: 'Figma Prototype وMini Design System.',
  },
  {
    number: 15,
    unit: 'Architecture & Execution',
    title: 'اختار الـStack بقرار',
    understand: 'No-code وLow-code وFull-code والتكلفة والمرونة والصيانة والتوسع والـLock-in.',
    apply: 'تقارن أكتر من Stack وتوثق سبب اختيار مشروعك.',
    output: 'Stack Decision Record.',
  },
  {
    number: 16,
    unit: 'Architecture & Execution',
    title: 'System Design للمبتدئين',
    understand: 'Components وData Flow وERD وAPI Contracts وSecurity Boundaries ونقاط الفشل.',
    apply: 'ترسم النظام كاملًا وتعمل Architecture Review مع المجموعة.',
    output: 'System Design وAPI Specification.',
  },
  {
    number: 17,
    unit: 'Architecture & Execution',
    title: 'جهّز الـRepo وقُد التنفيذ',
    understand: 'Git وBranches وEnvironments وAGENTS.md والـBacklog والمراجعة والـDebugging.',
    apply: 'تقسم Feature وتكلف Agent بالتنفيذ وتراجع الناتج والـLogs.',
    output: 'Repo وBacklog وأول SaaS Vertical Slice.',
  },
  {
    number: 18,
    unit: 'Production & GTM',
    title: 'اختبر، أمّن، وانشر الـSaaS',
    understand: 'Acceptance Testing وSecurity وPerformance وLogging وBackup وRollback وMonitoring.',
    apply: 'تعمل Production Review وتنشر على Vercel وتربط الـDomain.',
    output: 'مشروع 02: Basic SaaS منشورة.',
  },
  {
    number: 19,
    unit: 'Production & GTM',
    title: 'ابنِ Automation Tool',
    understand: 'Triggers وActions وConditions وWebhooks وRetries وLogs وHuman Approval.',
    apply: 'تربط Lead بـAI وقاعدة بيانات وتنبيه مع معالجة الأخطاء والتكرار.',
    output: 'مشروع 03: Automation Tool شغالة.',
  },
  {
    number: 20,
    unit: 'Production & GTM',
    title: 'سعّر، أطلق، ووصل لأول عميل',
    understand: 'تكلفة المنتج وSubscription وUsage-based والـPackaging والعرض والوصول للعملاء.',
    apply: 'تحط السعر والعرض والـLaunch Plan وتقدم المنتج في Demo Day.',
    output: 'Pricing Strategy وLaunch Kit وCase Study.',
  },
];

export const projectProof = [
  {
    title: 'Ninja GenZ',
    kind: 'Agency Platform',
    image: '/images/projects/ninja-genz.webp',
    description: 'منصة لإدارة وكالات الإبداع والتسويق: Workspaces، تعاون لحظي، وتتبع شغل منظم في واجهة واحدة.',
  },
  {
    title: 'Greenschat AI',
    kind: 'RAG Product',
    image: '/images/projects/greenschat.webp',
    description: 'منتج AI Support يستخدم RAG عشان يرد بإجابات دقيقة من Knowledge Base خاصة بالبراند.',
  },
  {
    title: 'Groovon',
    kind: 'Music Experience',
    image: '/images/projects/groovon.webp',
    description: 'تجربة Music Streaming مركزة على UX سريع وحالة تشغيل متماسكة بين playlists والفنانين.',
  },
  {
    title: 'Rammah',
    kind: 'Coaching Platform',
    image: '/images/projects/rammah.png',
    description: 'منصة Coach مبنية كمنتج كامل، من الهوية والتجربة لحد deployment والبنية القابلة للتطوير.',
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EGYPT_MOBILE_REGEX = /^01[0125]\d{8}$/;
const clean = (value: unknown) => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
const optionLabel = (question: WaitlistQuestion, value: string) =>
  question.options.find((option) => option.value === value)?.label;

export function validateWaitlistIdentity(
  value: unknown
): { ok: true; value: WaitlistIdentity } | { ok: false; errors: WaitlistIdentityErrors } {
  const raw = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const fullName = clean(raw.fullName);
  const email = clean(raw.email).toLowerCase();
  let phone = clean(raw.phone).replace(/\D/g, '');
  if (phone.startsWith('20') && phone.length === 12) phone = `0${phone.slice(2)}`;

  const errors: WaitlistIdentityErrors = {};
  if (!fullName) errors.fullName = 'اكتب اسمك الأول.';
  if (!EMAIL_REGEX.test(email)) errors.email = 'اكتب إيميل صحيح.';
  if (!EGYPT_MOBILE_REGEX.test(phone)) errors.phone = 'اكتب رقم واتساب مصري صحيح.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { fullName, email, phone } };
}

export function normalizeWaitlistSubmission(
  payload: unknown
): { ok: true; value: NormalizedWaitlistSubmission } | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'بيانات التسجيل غير صالحة.' };
  }
  const rawPayload = payload as WaitlistPayload;
  const identity = validateWaitlistIdentity(rawPayload);
  if (!identity.ok) {
    return {
      ok: false,
      error: identity.errors.fullName
        || identity.errors.email
        || identity.errors.phone
        || 'بيانات التسجيل غير صالحة.',
    };
  }
  const { fullName, email, phone } = identity.value;
  if (!rawPayload.answers || typeof rawPayload.answers !== 'object' || Array.isArray(rawPayload.answers)) {
    return { ok: false, error: 'جاوب على كل الأسئلة قبل الإرسال.' };
  }

  const rawAnswers = rawPayload.answers as WaitlistAnswers;
  const answers: StoredWaitlistAnswer[] = [];

  for (const question of waitlistQuestions) {
    const rawAnswer = rawAnswers[question.id];
    const values = Array.isArray(rawAnswer) ? rawAnswer : rawAnswer ? [rawAnswer] : [];
    if (values.length === 0) return { ok: false, error: 'جاوب على كل الأسئلة قبل الإرسال.' };
    if (values.some((value) => typeof value !== 'string' || !optionLabel(question, value))) {
      return { ok: false, error: 'إجابة غير صالحة. راجع الاختيارات وحاول تاني.' };
    }
    if (question.type === 'choice' && values.length !== 1) {
      return { ok: false, error: 'إجابة غير صالحة. راجع الاختيارات وحاول تاني.' };
    }
    if (question.id === 'tools' && values.includes('none') && values.length > 1) {
      return { ok: false, error: 'اختار الأدوات اللي استخدمتها أو «لسه مجربتش» فقط.' };
    }

    answers.push({
      questionId: question.id,
      type: question.type,
      prompt: question.prompt,
      answer: [...new Set(values)].map((value) => optionLabel(question, value) as string),
    });
  }

  return { ok: true, value: { fullName, email, phone, answers } };
}
