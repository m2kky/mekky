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
    eyebrow: 'الميزانية',
    prompt: 'إيه الميزانية المناسبة لكامب Live عملي بالشكل ده؟',
    options: [
      { value: 'under-4000', label: 'أقل من 4,000 جنيه' },
      { value: '4000-6000', label: 'من 4,000 لـ6,000 جنيه' },
      { value: '6000-8000', label: 'من 6,000 لـ8,000 جنيه' },
      { value: 'value-first', label: 'السعر مش العامل الأساسي لو القيمة مناسبة' },
    ],
  },
];

export const courseStats = [
  { value: '7+', label: 'سنين خبرة' },
  { value: '284+', label: 'مشروع مكتمل' },
  { value: '263+', label: 'عميل' },
  { value: '15+', label: 'دولة' },
  { value: '2,400+', label: 'شخص اتأثر' },
  { value: '87', label: 'مشروع في 2026' },
];

export const courseSessions = [
  'BRS & Business Thinking',
  'PRD, FRS, NFRs & Acceptance Criteria',
  'AI Build Workflow, Stack & Architecture',
  'UI/UX & Design Systems',
  'Portfolio Project',
  'Conversion Landing Page',
  'Backend, Database & Auth',
  'Micro Tool — Build 01',
  'Micro Tool — Build 02',
  'Production Review & Demo Day',
];

export const projectProof = [
  {
    title: 'Mo7a Art',
    kind: 'Portfolio',
    image: '/images/projects/mo7a-art.webp',
    description: 'Personal brand translated into a focused portfolio experience.',
  },
  {
    title: 'Forbed Online',
    kind: 'Conversion Experience',
    image: '/images/projects/forbed-online.webp',
    description: 'A conversion-first journey that turns attention into a measurable action.',
  },
  {
    title: 'Automated Marketing Audit',
    kind: 'Performance Tool',
    image: '/images/projects/dietty-store.webp',
    description: 'Shopify + ad-platform data turned into acquisition cost, break-even ROAS, and a prioritized audit.',
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
