'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle } from 'lucide-react';
import {
  WAITLIST_STORAGE_KEY,
  waitlistQuestions,
  type WaitlistAnswers,
} from './promptToProductData';
import {
  chooseWizardAnswer,
  clearStoredProgress,
  createProgressSnapshot,
  getGreetingName,
  nextWizardStep,
  previousWizardStep,
  readStoredProgress,
  writeStoredProgress,
  type Identity,
} from './waitlistWizardState';
import styles from './PromptToProduct.module.css';

type Props = { active: boolean; onActivate: () => void };

const emptyIdentity: Identity = { fullName: '', email: '', phone: '' };

export default function WaitlistWizard({ active, onActivate }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const focusTargetRef = useRef<HTMLElement>(null);
  const submissionLockedRef = useRef(false);
  const [identity, setIdentity] = useState(emptyIdentity);
  const [answers, setAnswers] = useState<WaitlistAnswers>({});
  const [step, setStep] = useState(-1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const submitting = status === 'submitting';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const progress = readStoredProgress(
        window.localStorage,
        WAITLIST_STORAGE_KEY,
        waitlistQuestions
      );

      if (progress) {
        setIdentity(progress.identity);
        setAnswers(progress.answers);
        setStep(progress.step);
      } else {
        setIdentity(emptyIdentity);
        setAnswers({});
        setStep(-1);
      }
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated || status === 'success') return;
    writeStoredProgress(
      window.localStorage,
      WAITLIST_STORAGE_KEY,
      createProgressSnapshot(identity, answers, step)
    );
  }, [answers, hydrated, identity, status, step]);

  const focusKey = status === 'success' ? 'success' : step;
  useEffect(() => {
    if (!active || !hydrated) return;

    const frame = window.requestAnimationFrame(() => focusTargetRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [active, focusKey, hydrated]);

  const currentQuestion = step >= 0 ? waitlistQuestions[step] : null;
  const progress = step < 0
    ? 0
    : Math.round(((step + 1) / waitlistQuestions.length) * 100);
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canContinue = useMemo(() => {
    if (step === -1) {
      return Boolean(
        identity.fullName.trim()
        && identity.email.trim()
        && identity.phone.trim()
      );
    }
    return Array.isArray(currentAnswer) ? currentAnswer.length > 0 : Boolean(currentAnswer);
  }, [currentAnswer, identity, step]);

  const updateIdentity = (field: keyof Identity) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (submitting) return;
      setIdentity((current) => ({ ...current, [field]: event.target.value }));
      setError('');
    };

  const chooseAnswer = (value: string) => {
    if (submitting) return;
    if (!currentQuestion) return;
    const next = chooseWizardAnswer(currentQuestion, currentAnswer, value);
    if (next === undefined) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: next }));
  };

  const goNext = () => {
    if (submitting) return;
    if (!canContinue) return;
    setError('');

    if (step === -1) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email.trim());
      const phone = identity.phone.replace(/\D/g, '').replace(/^20(?=1)/, '0');
      if (!emailValid) return setError('اكتب إيميل صحيح.');
      if (!/^01[0125]\d{8}$/.test(phone)) {
        return setError('اكتب رقم واتساب مصري صحيح.');
      }
    }

    setStep((current) => nextWizardStep(current, waitlistQuestions.length - 1));
  };

  const goBack = () => {
    if (submitting) return;
    setError('');
    setStep((current) => previousWizardStep(current));
  };

  const submit = async () => {
    if (submissionLockedRef.current || submitting || !canContinue) return;
    submissionLockedRef.current = true;
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
        submissionLockedRef.current = false;
        setStatus('idle');
        return;
      }

      clearStoredProgress(window.localStorage, WAITLIST_STORAGE_KEY);
      setStatus('success');
    } catch {
      setError('حصلت مشكلة في الاتصال. إجاباتك محفوظة، جرّب تاني.');
      submissionLockedRef.current = false;
      setStatus('idle');
    }
  };

  if (!active) {
    return (
      <section className={styles.waitlistPrelude} aria-labelledby="waitlist-prelude-title">
        <p lang="en">FOUNDING COHORT WAITLIST</p>
        <h2 id="waitlist-prelude-title">جاهز تنقل فكرتك<br />من Prompt لـProduct؟</h2>
        <button className={styles.primaryCta} type="button" onClick={onActivate}>
          ابدأ في دقيقتين <ArrowLeft size={20} aria-hidden="true" />
        </button>
      </section>
    );
  }

  if (status === 'success') {
    return (
      <section
        ref={focusTargetRef}
        className={styles.wizardShell}
        aria-labelledby="waitlist-success-title"
        tabIndex={-1}
      >
        <div className={styles.successState} role="status">
          <CheckCircle2 size={64} aria-hidden="true" />
          <span lang="en">YOU&apos;RE ON THE LIST</span>
          <h2 id="waitlist-success-title">تمام يا {getGreetingName(identity.fullName)}.</h2>
          <p>
            سجلنا اهتمامك. هيوصلك قبل أي حد موعد الدفعة التأسيسية والسعر الخاص
            بقائمة الانتظار.
          </p>
        </div>
      </section>
    );
  }

  const isLast = step === waitlistQuestions.length - 1;

  return (
    <section
      ref={focusTargetRef}
      className={styles.wizardShell}
      aria-labelledby="wizard-title"
      tabIndex={-1}
    >
      <div className={styles.wizardTop}>
        <span lang="en">Prompt to Product</span>
        <strong>
          {step < 0 ? 'بياناتك' : `${String(step + 1).padStart(2, '0')} / 07`}
        </strong>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.wizardPanel}
          key={step}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18 }}
        >
          {step === -1 ? (
            <>
              <p className={styles.questionEyebrow}>خلينا نتعرف</p>
              <h2 id="wizard-title">بيانات بسيطة الأول.</h2>
              <div className={styles.identityFields}>
                <label>
                  الاسم
                  <input
                    autoComplete="name"
                    disabled={submitting}
                    value={identity.fullName}
                    onChange={updateIdentity('fullName')}
                  />
                </label>
                <label>
                  الإيميل
                  <input
                    dir="ltr"
                    type="email"
                    autoComplete="email"
                    disabled={submitting}
                    value={identity.email}
                    onChange={updateIdentity('email')}
                  />
                </label>
                <label>
                  رقم واتساب
                  <input
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={submitting}
                    value={identity.phone}
                    onChange={updateIdentity('phone')}
                    placeholder="01xxxxxxxxx"
                  />
                </label>
              </div>
            </>
          ) : currentQuestion ? (
            <>
              <p className={styles.questionEyebrow}>{currentQuestion.eyebrow}</p>
              <h2 id="wizard-title">{currentQuestion.prompt}</h2>
              {currentQuestion.helper ? (
                <p className={styles.questionHelper}>{currentQuestion.helper}</p>
              ) : null}
              <div className={styles.optionList}>
                {currentQuestion.options.map((option) => {
                  const selected = Array.isArray(currentAnswer)
                    ? currentAnswer.includes(option.value)
                    : currentAnswer === option.value;

                  return (
                    <button
                      type="button"
                      className={selected ? styles.optionSelected : ''}
                      aria-pressed={selected}
                      disabled={submitting}
                      key={option.value}
                      onClick={() => chooseAnswer(option.value)}
                    >
                      <span aria-hidden="true">{selected ? <Check size={16} /> : null}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}

          {error ? <p className={styles.formError} role="alert">{error}</p> : null}

          <div className={styles.wizardActions}>
            {step >= 0 ? (
              <button
                type="button"
                className={styles.backButton}
                disabled={submitting}
                onClick={goBack}
              >
                <ArrowRight size={18} aria-hidden="true" /> رجوع
              </button>
            ) : <span />}
            {isLast ? (
              <button
                type="button"
                className={styles.submitButton}
                disabled={!canContinue || submitting}
                onClick={submit}
              >
                {status === 'submitting' ? (
                  <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />
                ) : null}
                انضم لقائمة الانتظار
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                disabled={!canContinue || submitting}
                onClick={goNext}
              >
                التالي <ArrowLeft size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
