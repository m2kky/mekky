# Prompt to Product Waitlist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium Arabic `/prompt-to-product` campaign page and seven-question waitlist assessment that stores qualified submissions in Supabase.

**Architecture:** A server-rendered route owns metadata while focused client components render the editorial campaign and wizard. A shared, browser-safe domain module defines questions and validates/normalizes submissions; the API route reuses `assessment_submissions` under a new assessment identifier and the existing unique email/phone constraints.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Framer Motion, Next Image, Lucide React, Supabase, Node 24 built-in test runner.

## Global Constraints

- Public route is `/prompt-to-product`; submission endpoint is `/api/prompt-to-product`.
- Course format is five weeks, 10 teaching sessions at 2.5 hours, three one-hour build clinics, and approximately 28 live hours.
- Standard price is 6,500 EGP; the page mentions private founding-cohort access without publishing the discounted price.
- Verified minimum proof only: 7+ years, 284+ projects, 87 projects in 2026, 263+ clients, 15+ countries, and 2,400+ people impacted.
- The core promise is `مش هتتعلم أداة. هتتعلم تحوّل الفكرة لمنتج حقيقي.`
- Do not claim that Replit or Lovable only supports Vite or lacks backend/database features.
- Media buyers and performance marketers are a primary audience, but the page must not imply that the camp teaches media buying.
- Required identity fields are full name, email address, and Egyptian WhatsApp number.
- The seven assessment topics are role, coding experience, tools used, first build, biggest blocker, weekly commitment, and suitable budget.
- Reuse `assessment_submissions` with assessment ID `prompt-to-product-2026`; do not add a new admin dashboard or database table.
- Preserve progress locally, clear it only after success, and keep answers after recoverable errors.
- Hide global floating CTA, current-project widget, and popups on the campaign route.
- Respect reduced motion, keyboard navigation, 320 px minimum width, and server-side validation.

---

## File Structure

- Create `src/app/prompt-to-product/page.tsx`: metadata and server route entry.
- Create `src/app/prompt-to-product/promptToProductData.ts`: course content, proof, project media, assessment types/options, normalization, and validation.
- Create `src/app/prompt-to-product/PromptToProductClient.tsx`: campaign/wizard state and landing composition.
- Create `src/app/prompt-to-product/CourseLanding.tsx`: focused editorial landing sections and CTA callbacks.
- Create `src/app/prompt-to-product/WaitlistWizard.tsx`: identity, one-question flow, persistence, submission, and completion.
- Create `src/app/prompt-to-product/PromptToProduct.module.css`: route-scoped visual system, layout, motion, wizard, responsiveness, and reduced-motion behavior.
- Create `src/app/api/prompt-to-product/route.ts`: validate, normalize, insert, and return duplicate/error states.
- Create `tests/prompt-to-product-domain.test.mjs`: Node tests for the shared validation contract.
- Modify `package.json`: add the `test:waitlist` script.
- Modify `src/components/FloatingCTA.tsx`: suppress on `/prompt-to-product`.
- Modify `src/components/CurrentProjectsWidget.tsx`: suppress on `/prompt-to-product`.
- Modify `src/components/PopupRenderer.tsx`: suppress on `/prompt-to-product`.

---

### Task 1: Lock the waitlist domain contract with tests

**Files:**
- Create: `src/app/prompt-to-product/promptToProductData.ts`
- Create: `tests/prompt-to-product-domain.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: Raw JSON-compatible request payloads.
- Produces: `WAITLIST_ID`, `WaitlistPayload`, `NormalizedWaitlistSubmission`, `waitlistQuestions`, `normalizeWaitlistSubmission(payload)`, `courseStats`, `courseSessions`, and `projectProof`.

- [ ] **Step 1: Add the Node test command**

Add this script to `package.json`:

```json
"test:waitlist": "node --test tests/prompt-to-product-domain.test.mjs"
```

- [ ] **Step 2: Write validation tests before the domain module exists**

Create `tests/prompt-to-product-domain.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WAITLIST_ID,
  normalizeWaitlistSubmission,
  waitlistQuestions,
} from '../src/app/prompt-to-product/promptToProductData.ts';

const validAnswers = Object.fromEntries(
  waitlistQuestions.map((question) => [
    question.id,
    question.type === 'multi-select'
      ? [question.options[0].value]
      : question.options[0].value,
  ])
);

const validPayload = {
  fullName: 'Ahmed Mohamed',
  email: ' Ahmed@Example.com ',
  phone: '+20 10 1234 5678',
  answers: validAnswers,
};

test('exports the fixed campaign assessment identifier', () => {
  assert.equal(WAITLIST_ID, 'prompt-to-product-2026');
});

test('normalizes a complete waitlist submission', () => {
  const result = normalizeWaitlistSubmission(validPayload);
  assert.equal(result.ok, true);
  assert.equal(result.value.email, 'ahmed@example.com');
  assert.equal(result.value.phone, '01012345678');
  assert.equal(result.value.answers.length, 7);
});

test('rejects an invalid Egyptian mobile number', () => {
  const result = normalizeWaitlistSubmission({ ...validPayload, phone: '1234' });
  assert.deepEqual(result, { ok: false, error: 'اكتب رقم واتساب مصري صحيح.' });
});

test('rejects a non-object request body', () => {
  const result = normalizeWaitlistSubmission(null);
  assert.deepEqual(result, { ok: false, error: 'بيانات التسجيل غير صالحة.' });
});

test('rejects missing assessment answers', () => {
  const result = normalizeWaitlistSubmission({
    ...validPayload,
    answers: { ...validAnswers, budget: '' },
  });
  assert.deepEqual(result, { ok: false, error: 'جاوب على كل الأسئلة قبل الإرسال.' });
});

test('rejects option values outside the published contract', () => {
  const result = normalizeWaitlistSubmission({
    ...validPayload,
    answers: { ...validAnswers, role: 'invented-role' },
  });
  assert.deepEqual(result, { ok: false, error: 'إجابة غير صالحة. راجع الاختيارات وحاول تاني.' });
});

test('does not allow none-used alongside named tools', () => {
  const result = normalizeWaitlistSubmission({
    ...validPayload,
    answers: { ...validAnswers, tools: ['none', 'lovable'] },
  });
  assert.deepEqual(result, { ok: false, error: 'اختار الأدوات اللي استخدمتها أو «لسه مجربتش» فقط.' });
});
```

- [ ] **Step 3: Run the domain test and verify the intended failure**

Run: `npm run test:waitlist`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `promptToProductData.ts`.

- [ ] **Step 4: Create the domain module and exact question contract**

Create `src/app/prompt-to-product/promptToProductData.ts` with:

```ts
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
};

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
  { title: 'Mo7a Art', kind: 'Portfolio', image: '/images/projects/mo7a-art.webp' },
  { title: 'Forbed Online', kind: 'Conversion Experience', image: '/images/projects/forbed-online.webp' },
  { title: 'Automated Marketing Audit', kind: 'Performance Tool', image: '/images/projects/dietty-store.webp' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EGYPT_MOBILE_REGEX = /^01[0125]\d{8}$/;
const clean = (value: unknown) => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
const optionLabel = (question: WaitlistQuestion, value: string) =>
  question.options.find((option) => option.value === value)?.label;

export function normalizeWaitlistSubmission(
  payload: unknown
): { ok: true; value: NormalizedWaitlistSubmission } | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'بيانات التسجيل غير صالحة.' };
  }
  const rawPayload = payload as WaitlistPayload;
  const fullName = clean(rawPayload.fullName);
  const email = clean(rawPayload.email).toLowerCase();
  let phone = clean(rawPayload.phone).replace(/\D/g, '');
  if (phone.startsWith('20') && phone.length === 12) phone = `0${phone.slice(2)}`;

  if (!fullName) return { ok: false, error: 'اكتب اسمك الأول.' };
  if (!EMAIL_REGEX.test(email)) return { ok: false, error: 'اكتب إيميل صحيح.' };
  if (!EGYPT_MOBILE_REGEX.test(phone)) return { ok: false, error: 'اكتب رقم واتساب مصري صحيح.' };
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
```

- [ ] **Step 5: Run the domain tests and TypeScript checks**

Run: `npm run test:waitlist`

Expected: 7 tests pass.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 6: Commit the domain contract**

```powershell
git add -- package.json tests/prompt-to-product-domain.test.mjs src/app/prompt-to-product/promptToProductData.ts
git commit -m "feat: define prompt to product waitlist contract"
```

---

### Task 2: Implement the Supabase submission endpoint

**Files:**
- Create: `src/app/api/prompt-to-product/route.ts`
- Reuse: `src/utils/supabase/admin.ts`

**Interfaces:**
- Consumes: `POST` JSON matching `WaitlistPayload` and `normalizeWaitlistSubmission()` from Task 1.
- Produces: `{ success: true, id }`, or `{ error }` with HTTP 400, 409, or 500.

- [ ] **Step 1: Create the route using the tested domain validator**

Create `src/app/api/prompt-to-product/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  WAITLIST_ID,
  normalizeWaitlistSubmission,
  type WaitlistPayload,
} from '@/app/prompt-to-product/promptToProductData';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const normalized = normalizeWaitlistSubmission(payload);

    if (!normalized.ok) {
      return NextResponse.json({ error: normalized.error }, { status: 400 });
    }

    const { fullName, email, phone, answers } = normalized.value;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert([{
        assessment_id: WAITLIST_ID,
        company: 'Prompt to Product',
        full_name: fullName,
        email,
        phone,
        position: 'waitlist',
        position_label: 'Prompt to Product Waitlist',
        answers,
        user_agent: request.headers.get('user-agent') || '',
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Prompt to Product waitlist insert failed:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'إنت موجود بالفعل في قائمة الانتظار بنفس الإيميل أو رقم الواتساب.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'مقدرناش نسجل بياناتك دلوقتي. جرّب تاني كمان شوية.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Prompt to Product waitlist error:', error);
    return NextResponse.json(
      { error: 'حصل خطأ غير متوقع. جرّب تاني.' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify contract tests, lint, and route compilation**

Run: `npm run test:waitlist`

Expected: 7 tests pass.

Run: `npx eslint src/app/api/prompt-to-product/route.ts src/app/prompt-to-product/promptToProductData.ts`

Expected: exit code 0.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 3: Commit the endpoint**

```powershell
git add -- src/app/api/prompt-to-product/route.ts
git commit -m "feat: add prompt to product waitlist endpoint"
```

---

### Task 3: Build the editorial campaign route

**Files:**
- Create: `src/app/prompt-to-product/page.tsx`
- Create: `src/app/prompt-to-product/CourseLanding.tsx`
- Create: `src/app/prompt-to-product/PromptToProductClient.tsx`
- Create: `src/app/prompt-to-product/PromptToProduct.module.css`

**Interfaces:**
- Consumes: `courseStats`, `courseSessions`, and `projectProof` from Task 1.
- Produces: an accessible full page and `onJoinWaitlist(): void` callback boundary for Task 4.

- [ ] **Step 1: Add server metadata and the campaign entry point**

Create `src/app/prompt-to-product/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PromptToProductClient from './PromptToProductClient';

export const metadata: Metadata = {
  title: 'Prompt to Product — Live Vibe Coding Camp | Muhammed Mekky',
  description: 'كامب Live عملي يحول فكرتك إلى Portfolio وLanding Page وMicro Tool حقيقيين، من الـrequirements والـUI/UX لحد الـbackend والـdeployment.',
  alternates: { canonical: '/prompt-to-product' },
  openGraph: {
    title: 'Prompt to Product — Live Online Camp',
    description: 'مش هتتعلم أداة. هتتعلم تحوّل الفكرة لمنتج حقيقي.',
    images: ['/images/og-preview.png'],
  },
};

export default function PromptToProductPage() {
  return <PromptToProductClient />;
}
```

- [ ] **Step 2: Add the client orchestrator with a stable wizard boundary**

Create `src/app/prompt-to-product/PromptToProductClient.tsx`:

```tsx
'use client';

import { useRef, useState } from 'react';
import CourseLanding from './CourseLanding';
import WaitlistWizard from './WaitlistWizard';
import styles from './PromptToProduct.module.css';

export default function PromptToProductClient() {
  const [started, setStarted] = useState(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const startWaitlist = () => {
    setStarted(true);
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      waitlistRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  };

  return (
    <main className={styles.page} dir="rtl">
      <CourseLanding onJoinWaitlist={startWaitlist} />
      <div className={styles.waitlistAnchor} id="waitlist" ref={waitlistRef}>
        <WaitlistWizard active={started} onActivate={startWaitlist} />
      </div>
    </main>
  );
}
```

Task 4 creates `WaitlistWizard.tsx`; create a temporary typed shell before the first compile:

```tsx
'use client';

export default function WaitlistWizard({ onActivate }: { active: boolean; onActivate: () => void }) {
  return <button type="button" onClick={onActivate}>سجّل اهتمامك</button>;
}
```

- [ ] **Step 3: Compose the complete landing content**

Create `src/app/prompt-to-product/CourseLanding.tsx` with these component boundaries and exact content sources:

```tsx
'use client';

import Image from 'next/image';
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
        <a href="/" className={styles.mekkyMark} aria-label="Muhammed Mekky home">M/M</a>
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
```

- [ ] **Step 4: Implement the route-scoped visual system**

Create `src/app/prompt-to-product/PromptToProduct.module.css` with these mandatory selector contracts:

```css
.page { --ink:#050505; --paper:#fffcf2; --orange:#eb5e28; position:relative; overflow:clip; color:var(--paper); background:var(--ink); font-family:var(--font-inter),"Cairo",sans-serif; }
.campaignHeader { position:absolute; inset:0 0 auto; z-index:20; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; padding:1.25rem var(--container-padding); color:var(--paper); font:700 .72rem/1 var(--font-syne); text-transform:uppercase; }
.campaignHeader button { justify-self:end; display:inline-flex; align-items:center; gap:.45rem; border:0; color:inherit; background:transparent; cursor:pointer; }
.mekkyMark { font-size:1rem; }
.hero { position:relative; min-height:100svh; display:flex; flex-direction:column; justify-content:space-between; padding:7rem var(--container-padding) 3rem; isolation:isolate; }
.heroImage { z-index:-2; object-fit:cover; object-position:center 35%; filter:grayscale(1) contrast(1.15); opacity:.34; }
.heroGrid { position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,rgba(5,5,5,.9),rgba(5,5,5,.2) 55%,rgba(5,5,5,.72)),linear-gradient(180deg,rgba(5,5,5,.2),#050505 96%),linear-gradient(90deg,transparent 49.9%,rgba(255,252,242,.09) 50%,transparent 50.1%),radial-gradient(circle at 78% 24%,rgba(235,94,40,.28),transparent 28%); }
.eyebrow,.sectionIndex { color:var(--orange); font:800 .74rem/1 var(--font-syne); letter-spacing:.08em; text-transform:uppercase; }
.hero h1 { display:flex; align-items:baseline; gap:clamp(.4rem,2vw,1.5rem); color:var(--paper); font:800 clamp(3.5rem,12vw,11rem)/.72 var(--font-syne); letter-spacing:-.075em; text-transform:uppercase; }
.hero h1 i { color:var(--orange); font:italic 400 clamp(2.2rem,6vw,6rem)/1 var(--font-serif); text-transform:lowercase; }
.heroBottom { display:grid; grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr); gap:clamp(2rem,8vw,8rem); align-items:end; }
.heroBottom h2,.audienceSection h2,.offerSection h2 { color:var(--paper); font-size:clamp(2rem,4.5vw,5rem); line-height:1.04; letter-spacing:-.05em; }
.heroBottom em,.audienceSection em { color:var(--orange); font-family:var(--font-serif); font-weight:400; }
.heroBottom p,.offerCopy p { max-width:48ch; line-height:1.8; }
.primaryCta { display:inline-flex; min-height:52px; align-items:center; justify-content:center; gap:.7rem; margin-top:1.4rem; border:0; padding:.9rem 1.15rem; color:var(--ink); background:var(--paper); font-weight:800; cursor:pointer; }
.heroBottom small { display:block; margin-top:.65rem; color:rgba(255,252,242,.58); }
.gapSection,.proofSection,.audienceSection,.outputsSection,.methodSection,.curriculumSection,.offerSection { position:relative; padding:clamp(5rem,12vw,10rem) var(--container-padding); }
.gapSection,.audienceSection,.offerSection { color:var(--ink); background:var(--paper); }
.gapHeadline { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:1rem; margin-top:3rem; font:800 clamp(3rem,11vw,10rem)/.8 var(--font-syne); text-transform:uppercase; }
.gapHeadline strong { color:var(--orange); text-align:left; }
.gapColumns { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,10vw,10rem); margin-top:4rem; font-size:clamp(1.05rem,1.6vw,1.4rem); line-height:1.7; }
.statsGrid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,252,242,.18); }
.statsGrid div { display:flex; flex-direction:column; gap:.7rem; border-bottom:1px solid rgba(255,252,242,.18); padding:2rem 0; }
.statsGrid strong { color:var(--paper); font:800 clamp(2.5rem,7vw,7rem)/.8 var(--font-syne); letter-spacing:-.06em; }
.proofLine { display:flex; align-items:center; gap:.7rem; margin:4rem 0 2rem; font-size:clamp(1.3rem,2.5vw,2.5rem); }
.projectRail { display:grid; grid-template-columns:1.1fr .9fr 1.1fr; gap:1rem; }
.projectFigure { overflow:hidden; }
.projectFigure img { width:100%; height:clamp(280px,42vw,620px); object-fit:cover; filter:grayscale(1); transition:filter .4s ease,transform .7s var(--ease-slow); }
.projectFigure:hover img { filter:grayscale(0); transform:scale(1.025); }
.projectFigure figcaption { display:grid; grid-template-columns:auto 1fr auto; gap:1rem; padding:1rem 0; border-bottom:1px solid rgba(255,252,242,.18); }
.audienceList,.outputsList,.sessionList { margin-top:4rem; }
.audienceList article,.outputsList article,.sessionList div { display:grid; grid-template-columns:64px minmax(180px,.8fr) minmax(0,1.2fr); gap:1rem; align-items:baseline; border-top:1px solid currentColor; padding:1.5rem 0; }
.outputsSection,.methodSection,.curriculumSection { background:var(--ink); }
.methodSection h2 { max-width:12ch; margin-top:3rem; color:var(--paper); font:800 clamp(2.4rem,7vw,7rem)/.88 var(--font-syne); letter-spacing:-.06em; }
.methodSection>p:last-child { max-width:54ch; margin:3rem 0 0 auto; color:rgba(255,252,242,.7); font-size:clamp(1.15rem,2vw,1.7rem); line-height:1.8; }
.sessionList div { grid-template-columns:64px 1fr; color:var(--paper); font-size:clamp(1rem,2vw,1.7rem); }
.offerSection { display:grid; grid-template-columns:1.2fr .8fr; gap:clamp(3rem,10vw,10rem); }
.offerCopy { display:flex; flex-direction:column; align-items:flex-start; }
.offerCopy>strong { color:var(--orange); font:800 clamp(2.5rem,5vw,5rem)/1 var(--font-syne); }
.offerCopy>span { display:flex; gap:.5rem; margin-top:.8rem; }
.waitlistAnchor { scroll-margin-top:0; }
.page :is(a,button,input):focus-visible { outline:3px solid var(--orange); outline-offset:4px; }

@media (max-width:800px) {
  .campaignHeader { grid-template-columns:1fr auto; }
  .campaignHeader>span { display:none; }
  .hero { min-height:auto; padding-top:8rem; gap:5rem; }
  .hero h1 { flex-wrap:wrap; }
  .heroBottom,.gapColumns,.offerSection { grid-template-columns:1fr; }
  .gapHeadline { grid-template-columns:1fr; }
  .gapHeadline svg { transform:rotate(-90deg); }
  .gapHeadline strong { text-align:right; }
  .statsGrid { grid-template-columns:repeat(2,1fr); }
  .projectRail { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; }
  .projectFigure { min-width:86vw; scroll-snap-align:center; }
  .audienceList article,.outputsList article { grid-template-columns:48px 1fr; }
  .audienceList article p,.outputsList article p { grid-column:2; }
}

@media (prefers-reduced-motion:reduce) {
  .page * { scroll-behavior:auto!important; animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
}
```

Extend the same file in Task 4 with the wizard selectors; do not introduce a second stylesheet.

- [ ] **Step 5: Verify the campaign compiles before adding form behavior**

Run: `npx eslint src/app/prompt-to-product/page.tsx src/app/prompt-to-product/PromptToProductClient.tsx src/app/prompt-to-product/CourseLanding.tsx`

Expected: exit code 0.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 6: Commit the campaign surface**

```powershell
git add -- src/app/prompt-to-product
git commit -m "feat: build prompt to product campaign page"
```

---

### Task 4: Replace the wizard shell with the complete waitlist flow

**Files:**
- Modify: `src/app/prompt-to-product/WaitlistWizard.tsx`
- Modify: `src/app/prompt-to-product/PromptToProduct.module.css`

**Interfaces:**
- Consumes: `active`, `onActivate`, `WAITLIST_STORAGE_KEY`, `waitlistQuestions`, and `/api/prompt-to-product`.
- Produces: persisted progress, validated identity, seven answers, submission, retry, duplicate handling, and success state.

- [ ] **Step 1: Implement the state machine and persistence**

Replace `WaitlistWizard.tsx` with a client component using these exact states and transitions:

```tsx
'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle } from 'lucide-react';
import { WAITLIST_STORAGE_KEY, waitlistQuestions, type WaitlistAnswers } from './promptToProductData';
import styles from './PromptToProduct.module.css';

type Identity = { fullName: string; email: string; phone: string };
type StoredProgress = { identity: Identity; answers: WaitlistAnswers; step: number };
type Props = { active: boolean; onActivate: () => void };

const emptyIdentity: Identity = { fullName: '', email: '', phone: '' };

export default function WaitlistWizard({ active, onActivate }: Props) {
  const [identity, setIdentity] = useState(emptyIdentity);
  const [answers, setAnswers] = useState<WaitlistAnswers>({});
  const [step, setStep] = useState(-1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
      if (saved) {
        const progress = JSON.parse(saved) as StoredProgress;
        setIdentity(progress.identity || emptyIdentity);
        setAnswers(progress.answers || {});
        setStep(Number.isInteger(progress.step) ? progress.step : -1);
      }
    } catch {
      window.localStorage.removeItem(WAITLIST_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || status === 'success') return;
    window.localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify({ identity, answers, step }));
  }, [answers, hydrated, identity, status, step]);

  const currentQuestion = step >= 0 ? waitlistQuestions[step] : null;
  const progress = step < 0 ? 0 : Math.round(((step + 1) / waitlistQuestions.length) * 100);
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canContinue = useMemo(() => {
    if (step === -1) return Boolean(identity.fullName.trim() && identity.email.trim() && identity.phone.trim());
    return Array.isArray(currentAnswer) ? currentAnswer.length > 0 : Boolean(currentAnswer);
  }, [currentAnswer, identity, step]);

  const updateIdentity = (field: keyof Identity) => (event: ChangeEvent<HTMLInputElement>) => {
    setIdentity((current) => ({ ...current, [field]: event.target.value }));
    setError('');
  };

  const chooseAnswer = (value: string) => {
    if (!currentQuestion) return;
    if (currentQuestion.type === 'choice') {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
      return;
    }
    const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
    const next = value === 'none'
      ? (selected.includes('none') ? [] : ['none'])
      : selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected.filter((item) => item !== 'none'), value];
    setAnswers((current) => ({ ...current, [currentQuestion.id]: next }));
  };

  const goNext = () => {
    if (!canContinue) return;
    setError('');
    if (step === -1) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email.trim());
      const phone = identity.phone.replace(/\D/g, '').replace(/^20(?=1)/, '0');
      if (!emailValid) return setError('اكتب إيميل صحيح.');
      if (!/^01[0125]\d{8}$/.test(phone)) return setError('اكتب رقم واتساب مصري صحيح.');
    }
    setStep((current) => Math.min(current + 1, waitlistQuestions.length - 1));
  };

  const goBack = () => {
    setError('');
    setStep((current) => Math.max(-1, current - 1));
  };

  const submit = async () => {
    setStatus('submitting');
    setError('');
    try {
      const response = await fetch('/api/prompt-to-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...identity, answers }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || 'مقدرناش نسجل بياناتك. جرّب تاني.');
        setStatus('idle');
        return;
      }
      window.localStorage.removeItem(WAITLIST_STORAGE_KEY);
      setStatus('success');
    } catch {
      setError('حصلت مشكلة في الاتصال. إجاباتك محفوظة، جرّب تاني.');
      setStatus('idle');
    }
  };

  if (!active) {
    return <section className={styles.waitlistPrelude}><p>FOUNDING COHORT WAITLIST</p><h2>جاهز تنقل فكرتك<br />من Prompt لـProduct؟</h2><button className={styles.primaryCta} type="button" onClick={onActivate}>ابدأ في دقيقتين <ArrowLeft size={20} /></button></section>;
  }

  if (status === 'success') {
    return <section className={styles.wizardShell}><div className={styles.successState}><CheckCircle2 size={64} /><span>YOU'RE ON THE LIST</span><h2>تمام يا {identity.fullName.split(' ')[0]}.</h2><p>سجلنا اهتمامك. هيوصلك قبل أي حد موعد الدفعة التأسيسية والسعر الخاص بقائمة الانتظار.</p></div></section>;
  }

  const isLast = step === waitlistQuestions.length - 1;

  return (
    <section className={styles.wizardShell} aria-labelledby="wizard-title">
      <div className={styles.wizardTop}><span>Prompt to Product</span><strong>{step < 0 ? 'بياناتك' : `${String(step + 1).padStart(2, '0')} / 07`}</strong></div>
      <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <AnimatePresence mode="wait">
        <motion.div className={styles.wizardPanel} key={step} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
          {step === -1 ? <><p className={styles.questionEyebrow}>خلينا نتعرف</p><h2 id="wizard-title">بيانات بسيطة الأول.</h2><div className={styles.identityFields}><label>الاسم<input autoComplete="name" value={identity.fullName} onChange={updateIdentity('fullName')} /></label><label>الإيميل<input dir="ltr" type="email" autoComplete="email" value={identity.email} onChange={updateIdentity('email')} /></label><label>رقم واتساب<input dir="ltr" inputMode="tel" autoComplete="tel" value={identity.phone} onChange={updateIdentity('phone')} placeholder="01xxxxxxxxx" /></label></div></> : currentQuestion ? <><p className={styles.questionEyebrow}>{currentQuestion.eyebrow}</p><h2 id="wizard-title">{currentQuestion.prompt}</h2>{currentQuestion.helper ? <p className={styles.questionHelper}>{currentQuestion.helper}</p> : null}<div className={styles.optionList}>{currentQuestion.options.map((option) => { const selected = Array.isArray(currentAnswer) ? currentAnswer.includes(option.value) : currentAnswer === option.value; return <button type="button" className={selected ? styles.optionSelected : ''} aria-pressed={selected} key={option.value} onClick={() => chooseAnswer(option.value)}><span>{selected ? <Check size={16} /> : null}</span>{option.label}</button>; })}</div></> : null}
          {error ? <p className={styles.formError} role="alert">{error}</p> : null}
          <div className={styles.wizardActions}>{step >= 0 ? <button type="button" className={styles.backButton} onClick={goBack}><ArrowRight size={18} /> رجوع</button> : <span />}{isLast ? <button type="button" className={styles.submitButton} disabled={!canContinue || status === 'submitting'} onClick={submit}>{status === 'submitting' ? <LoaderCircle className={styles.spinner} size={18} /> : null} انضم لقائمة الانتظار</button> : <button type="button" className={styles.nextButton} disabled={!canContinue} onClick={goNext}>التالي <ArrowLeft size={18} /></button>}</div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Add wizard styles to the existing CSS module**

Append these selectors to `PromptToProduct.module.css`:

```css
.waitlistPrelude,.wizardShell { min-height:100svh; padding:clamp(5rem,10vw,9rem) var(--container-padding); background:var(--orange); color:var(--ink); }
.waitlistPrelude { display:flex; flex-direction:column; align-items:flex-start; justify-content:center; }
.waitlistPrelude>p { font:800 .78rem/1 var(--font-syne); }
.waitlistPrelude h2 { margin-top:1.5rem; font-size:clamp(2.8rem,8vw,8rem); line-height:.9; letter-spacing:-.06em; }
.wizardShell { display:grid; grid-template-rows:auto auto 1fr; }
.wizardTop { display:flex; justify-content:space-between; font:800 .78rem/1 var(--font-syne); text-transform:uppercase; }
.progressTrack { height:2px; margin-top:1rem; overflow:hidden; background:rgba(5,5,5,.18); }
.progressTrack span { display:block; height:100%; background:var(--ink); transition:width .35s var(--ease-slow); }
.wizardPanel { width:min(920px,100%); margin:auto; padding:4rem 0; }
.questionEyebrow { font:800 .78rem/1 var(--font-syne); text-transform:uppercase; }
.wizardPanel h2 { max-width:18ch; margin-top:1.2rem; font-size:clamp(2rem,5vw,5rem); line-height:1; letter-spacing:-.05em; }
.questionHelper { margin-top:1rem; }
.identityFields,.optionList { display:grid; gap:.75rem; margin-top:2.5rem; }
.identityFields { grid-template-columns:repeat(3,1fr); }
.identityFields label { display:grid; gap:.55rem; font-weight:700; }
.identityFields input { min-height:54px; border:0; border-bottom:1px solid rgba(5,5,5,.45); border-radius:0; padding:.8rem 0; color:var(--ink); background:transparent; font:inherit; outline:none; }
.identityFields input:focus { border-bottom-color:var(--ink); }
.optionList { grid-template-columns:repeat(2,minmax(0,1fr)); }
.optionList button { display:grid; min-height:64px; grid-template-columns:28px 1fr; align-items:center; gap:.7rem; border:1px solid rgba(5,5,5,.25); padding:1rem; color:var(--ink); background:transparent; text-align:right; cursor:pointer; }
.optionList button>span { display:grid; width:22px; height:22px; place-items:center; border:1px solid currentColor; }
.optionList .optionSelected { color:var(--paper); background:var(--ink); }
.wizardActions { display:flex; justify-content:space-between; gap:1rem; margin-top:2rem; }
.wizardActions button { display:inline-flex; min-height:50px; align-items:center; justify-content:center; gap:.5rem; border:1px solid var(--ink); padding:.75rem 1rem; font-weight:800; cursor:pointer; }
.wizardActions button:disabled { cursor:not-allowed; opacity:.4; }
.backButton { color:var(--ink); background:transparent; }
.nextButton,.submitButton { color:var(--paper); background:var(--ink); }
.formError { margin-top:1rem; font-weight:800; }
.successState { display:grid; max-width:780px; align-content:center; justify-items:start; margin:auto; }
.successState span { margin-top:2rem; font:800 .78rem/1 var(--font-syne); }
.successState h2 { margin-top:1rem; font-size:clamp(3rem,8vw,8rem); line-height:.9; }
.successState p { max-width:48ch; margin-top:1.5rem; font-size:1.2rem; line-height:1.8; }
.spinner { animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

@media (max-width:800px) {
  .identityFields,.optionList { grid-template-columns:1fr; }
  .wizardPanel { padding:3rem 0; }
}
```

- [ ] **Step 3: Run automated checks after the complete wizard is connected**

Run: `npm run test:waitlist`

Expected: 7 tests pass.

Run: `npx eslint src/app/prompt-to-product src/app/api/prompt-to-product/route.ts`

Expected: exit code 0.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 4: Commit the complete wizard**

```powershell
git add -- src/app/prompt-to-product/WaitlistWizard.tsx src/app/prompt-to-product/PromptToProduct.module.css src/app/prompt-to-product/PromptToProductClient.tsx
git commit -m "feat: add prompt to product waitlist wizard"
```

---

### Task 5: Suppress global distractions and verify the finished experience

**Files:**
- Modify: `src/components/FloatingCTA.tsx`
- Modify: `src/components/CurrentProjectsWidget.tsx`
- Modify: `src/components/PopupRenderer.tsx`

**Interfaces:**
- Consumes: `usePathname()` result.
- Produces: no global CTA, project widget, or popup UI on `/prompt-to-product` and nested routes.

- [ ] **Step 1: Add the campaign route to every focused-flow guard**

In `FloatingCTA.tsx`, replace the focused-flow declaration with:

```ts
const isFocusedFlow =
  pathname?.startsWith('/assessment') ||
  pathname?.startsWith('/prompt-to-product');
```

In `CurrentProjectsWidget.tsx`, add this condition to `isHiddenRoute`:

```ts
pathname?.startsWith('/prompt-to-product') ||
```

In `PopupRenderer.tsx`, replace the focused-flow declaration with:

```ts
const isFocusedFlow =
  pathname?.startsWith('/assessment') ||
  pathname?.startsWith('/prompt-to-product') ||
  pathname?.startsWith('/rammah-project');
```

- [ ] **Step 2: Run the complete automated verification suite**

Run: `npm run test:waitlist`

Expected: 7 tests pass.

Run: `npm run lint`

Expected: exit code 0, or only pre-existing warnings documented separately.

Run: `npm run build`

Expected: production build succeeds and lists `/prompt-to-product` plus `/api/prompt-to-product`.

- [ ] **Step 3: Start the local site and verify responsive behavior**

Run: `npm run dev`

Verify at `http://localhost:3000/prompt-to-product`:

- 1440×900: hero content fits the first viewport, proof rail is readable, and campaign header remains minimal.
- 768×1024: sections stack cleanly and project media remains scrollable.
- 390×844 and 320×700: no horizontal overflow, options have at least 44 px tap height, and the hero CTA is visible.
- Keyboard: CTA, identity inputs, answer buttons, back/next, and submit are reachable in logical order with visible focus.
- Reduced motion: entrance and transition effects collapse without hiding content.
- Refresh halfway through: identity, answers, and current step restore.
- Simulated network failure: answers stay intact and retry remains available.
- Duplicate submission: the 409 message states the applicant is already on the waitlist.
- Successful submission: local progress clears and the confirmation state names the applicant.
- Global UI: floating CTA, popup renderer, and current-project widget do not appear.

- [ ] **Step 4: Verify the Supabase row**

Submit one test lead using a unique email and phone, then confirm the stored row contains:

```text
assessment_id = prompt-to-product-2026
company = Prompt to Product
position = waitlist
position_label = Prompt to Product Waitlist
answers = 7 normalized answer records
```

Remove only that exact test row from Supabase after confirming the fields.

- [ ] **Step 5: Commit the route guards and final fixes**

```powershell
git add -- src/components/FloatingCTA.tsx src/components/CurrentProjectsWidget.tsx src/components/PopupRenderer.tsx src/app/prompt-to-product src/app/api/prompt-to-product tests/prompt-to-product-domain.test.mjs package.json package-lock.json
git commit -m "feat: finish prompt to product waitlist experience"
```
