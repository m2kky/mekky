'use client';

import { CSSProperties, ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Send,
  Sparkles,
} from 'lucide-react';
import styles from './OctaholicAssessment.module.css';
import {
  ASSESSMENT_COMPANY,
  ASSESSMENT_ID,
  AssessmentQuestion,
  assessmentPositions,
  getAssessmentPosition,
} from './assessmentData';

type Applicant = {
  fullName: string;
  email: string;
  phone: string;
};

type Answers = Record<string, string | number>;
type FlowStep = 'intro' | 'identity' | 'position' | 'question' | 'success';

const emptyApplicant: Applicant = {
  fullName: '',
  email: '',
  phone: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EGYPT_MOBILE_REGEX = /^01[0125]\d{8}$/;
const scaleValues = [1, 2, 3, 4, 5];
const signalRows = ['Brief Intake', 'Workflow Map', 'Tool Stack', 'Friction Points', 'AI Fit', 'Next KPIs'];

function clean(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

function validateApplicant(applicant: Applicant) {
  const fullName = clean(applicant.fullName);
  const email = clean(applicant.email).toLowerCase();
  const phone = normalizePhone(applicant.phone);

  if (!fullName) return 'اكتب اسمك قبل ما تكمل.';
  if (!EMAIL_REGEX.test(email)) return 'اكتب إيميل صحيح، مثال: name@company.com';
  if (!EGYPT_MOBILE_REGEX.test(phone)) return 'اكتب رقم موبايل مصري صحيح من 11 رقم ويبدأ بـ 01.';

  return '';
}

function questionLabel(question: AssessmentQuestion) {
  if (question.mode === 'scenario') {
    return question.type === 'text' ? 'سيناريو / إجابة مفتوحة' : 'سيناريو';
  }

  if (question.type === 'choice') return 'اختيار من متعدد';
  if (question.type === 'scale') return 'مقياس 1-5';
  return 'إجابة مفتوحة';
}

function localizeError(message: string) {
  if (message.includes('already submitted')) {
    return 'تم تسجيل إجابة قبل كده بنفس الإيميل أو رقم الموبايل. كل فرد له محاولة واحدة فقط.';
  }

  if (message.includes('answer every question')) {
    return 'جاوب على كل الأسئلة قبل الإرسال.';
  }

  if (message.includes('valid email')) {
    return 'اكتب إيميل صحيح.';
  }

  if (message.includes('valid phone')) {
    return 'اكتب رقم موبايل صحيح.';
  }

  return message || 'حصل خطأ أثناء الإرسال. جرّب تاني.';
}

export default function OctaholicAssessmentClient() {
  const [step, setStep] = useState<FlowStep>('intro');
  const [positionId, setPositionId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [applicant, setApplicant] = useState<Applicant>(emptyApplicant);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedPosition = useMemo(() => getAssessmentPosition(positionId), [positionId]);
  const totalQuestions = selectedPosition?.questions.length || 0;
  const currentQuestion = selectedPosition?.questions[currentQuestionIndex];

  const answeredCount = useMemo(() => {
    if (!selectedPosition) return 0;

    return selectedPosition.questions.filter((question) => isAnswered(answers[question.id])).length;
  }, [answers, selectedPosition]);

  const completion = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const applicantReady = !validateApplicant(applicant);
  const currentQuestionAnswered = currentQuestion ? isAnswered(answers[currentQuestion.id]) : false;
  const canSubmit = Boolean(selectedPosition && applicantReady && answeredCount === totalQuestions && !isSubmitting);

  const updateApplicant = (field: keyof Applicant) => (event: ChangeEvent<HTMLInputElement>) => {
    setApplicant((current) => ({ ...current, [field]: event.target.value }));
    setError('');
  };

  const startAssessment = () => {
    setStep('identity');
    setError('');
  };

  const goToPositions = () => {
    const applicantError = validateApplicant(applicant);

    if (applicantError) {
      setError(applicantError);
      return;
    }

    setStep('position');
    setError('');
  };

  const updateSelectedPosition = (nextPositionId: string) => {
    if (nextPositionId !== positionId) {
      setAnswers({});
    }

    setPositionId(nextPositionId);
    setCurrentQuestionIndex(0);
    setError('');
  };

  const startPositionQuestions = () => {
    if (!getAssessmentPosition(positionId)) {
      setError('اختار البوزيشن بتاعك قبل ما تكمل.');
      return;
    }

    setStep('question');
    setError('');
  };

  const setAnswer = (questionId: string, answer: string | number) => {
    setAnswers((current) => ({ ...current, [questionId]: answer }));
    setError('');
  };

  const goToNextQuestion = () => {
    if (!currentQuestionAnswered) {
      setError('جاوب على السؤال الحالي قبل ما تكمل.');
      return;
    }

    setCurrentQuestionIndex((current) => Math.min(current + 1, Math.max(totalQuestions - 1, 0)));
    setError('');
  };

  const goBackFromQuestion = () => {
    if (currentQuestionIndex === 0) {
      setStep('position');
      return;
    }

    setCurrentQuestionIndex((current) => Math.max(current - 1, 0));
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPosition || !canSubmit) {
      setError('كمل البيانات وكل الأسئلة قبل الإرسال.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/octaholic-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: ASSESSMENT_ID,
          company: ASSESSMENT_COMPANY,
          fullName: applicant.fullName,
          email: applicant.email,
          phone: applicant.phone,
          position: selectedPosition.id,
          answers,
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        setError(localizeError(result.error || 'Submission failed.'));
        return;
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(`octaholic-assessment:${clean(applicant.email).toLowerCase()}`, 'submitted');
      }

      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('حصل خطأ في الاتصال. اتأكد من الإنترنت وجرّب تاني.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.gridPlane} />
        <div className={styles.scanLine} />
      </div>

      {step === 'intro' ? (
        <IntroScreen completion={completion} onStart={startAssessment} />
      ) : (
        <form className={styles.flowShell} onSubmit={handleSubmit}>
          <div className={styles.flowHeader}>
            <span>Muhammed Mekky x Octaholic</span>
            <strong>AI Workshop Assessment</strong>
          </div>

          {step === 'identity' ? (
            <IdentityStep applicant={applicant} error={error} onChange={updateApplicant} onNext={goToPositions} />
          ) : null}

          {step === 'position' ? (
            <PositionStep
              error={error}
              onBack={() => setStep('identity')}
              onNext={startPositionQuestions}
              onSelect={updateSelectedPosition}
              selectedPositionId={positionId}
            />
          ) : null}

          {step === 'question' && selectedPosition && currentQuestion ? (
            <QuestionStep
              answer={answers[currentQuestion.id]}
              answeredCount={answeredCount}
              canSubmit={canSubmit}
              completion={completion}
              currentIndex={currentQuestionIndex}
              error={error}
              isSubmitting={isSubmitting}
              onAnswer={setAnswer}
              onBack={goBackFromQuestion}
              onNext={goToNextQuestion}
              positionLabel={selectedPosition.label}
              question={currentQuestion}
              questionAnswered={currentQuestionAnswered}
              totalQuestions={totalQuestions}
            />
          ) : null}

          {step === 'success' ? <SuccessStep fullName={applicant.fullName} /> : null}
        </form>
      )}
    </main>
  );
}

function isAnswered(answer: string | number | undefined) {
  return typeof answer === 'number' || clean(String(answer || '')).length > 0;
}

function IntroScreen({ completion, onStart }: { completion: number; onStart: () => void }) {
  return (
    <section className={styles.intro}>
      <div className={styles.introCopy}>
        <p className={styles.kicker}>Muhammed Mekky x Octaholic</p>
        <h1>AI Workshop Assessment</h1>
        <p>
          اختبار قصير قبل الورشة عشان نعرف كل رول محتاج إيه بالظبط، ونبني السيشن على مشاكل الفريق الحقيقية.
        </p>
        <div className={styles.introActions}>
          <button className={styles.primaryButton} type="button" onClick={onStart}>
            بدأ الاختبار
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <span>
            <LockKeyhole size={16} aria-hidden="true" />
            محاولة واحدة لكل فرد
          </span>
        </div>
      </div>

      <div className={styles.signalPanel} aria-hidden="true">
        <div className={styles.signalTop}>
          <span>Workshop Readiness</span>
          <span>{completion}%</span>
        </div>
        <div className={styles.signalCore}>
          <span>AI</span>
          <span>OPS</span>
          <span>TEAM</span>
        </div>
        <div className={styles.signalRows}>
          {signalRows.map((row, index) => (
            <span key={row} style={{ '--delay': `${index * 90}ms` } as CSSProperties}>
              {row}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function IdentityStep({
  applicant,
  error,
  onChange,
  onNext,
}: {
  applicant: Applicant;
  error: string;
  onChange: (field: keyof Applicant) => (event: ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}) {
  return (
    <section className={styles.flowPanel}>
      <StepLabel step="01" title="بياناتك الأول" />
      <h2>قبل الأسئلة، اكتب بياناتك.</h2>
      <p>هنستخدم الإيميل ورقم الموبايل لمنع تكرار الإجابة، مش لعرضهم في الصفحة.</p>

      <div className={styles.identityGrid}>
        <label>
          الاسم
          <input value={applicant.fullName} onChange={onChange('fullName')} placeholder="اكتب اسمك" />
        </label>
        <label>
          الإيميل
          <input
            dir="ltr"
            type="email"
            value={applicant.email}
            onChange={onChange('email')}
            placeholder="name@company.com"
          />
        </label>
        <label>
          رقم الموبايل
          <input
            dir="ltr"
            inputMode="tel"
            value={applicant.phone}
            onChange={onChange('phone')}
            placeholder="01xxxxxxxxx"
          />
        </label>
      </div>

      {error ? <p className={styles.errorMessage}>{error}</p> : null}

      <div className={styles.panelActions}>
        <button className={styles.primaryButton} type="button" onClick={onNext}>
          Next
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function PositionStep({
  error,
  onBack,
  onNext,
  onSelect,
  selectedPositionId,
}: {
  error: string;
  onBack: () => void;
  onNext: () => void;
  onSelect: (positionId: string) => void;
  selectedPositionId: string;
}) {
  const selectedPosition = getAssessmentPosition(selectedPositionId);

  return (
    <section className={styles.flowPanel}>
      <StepLabel step="02" title="اختيار البوزيشن" />
      <h2>اختار الرول بتاعك.</h2>
      <p>بمجرد اختيار البوزيشن، هتدخل على الأسئلة الخاصة بيه سؤال بسؤال.</p>

      <label className={styles.roleSelectWrap}>
        البوزيشن
        <select value={selectedPositionId} onChange={(event) => onSelect(event.target.value)}>
          <option value="">اختار البوزيشن بتاعك</option>
          {assessmentPositions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.label}
            </option>
          ))}
        </select>
      </label>

      {selectedPosition ? (
        <div className={styles.selectedRolePreview}>
          <span>{selectedPosition.shortLabel}</span>
          <strong>{selectedPosition.label}</strong>
          <p>{selectedPosition.description}</p>
        </div>
      ) : null}

      {error ? <p className={styles.errorMessage}>{error}</p> : null}

      <div className={styles.panelActions}>
        <button className={styles.secondaryButton} type="button" onClick={onBack}>
          <ArrowRight size={18} aria-hidden="true" />
          رجوع
        </button>
        <button className={styles.primaryButton} disabled={!selectedPositionId} type="button" onClick={onNext}>
          Next
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function QuestionStep({
  answer,
  answeredCount,
  canSubmit,
  completion,
  currentIndex,
  error,
  isSubmitting,
  onAnswer,
  onBack,
  onNext,
  positionLabel,
  question,
  questionAnswered,
  totalQuestions,
}: {
  answer: string | number | undefined;
  answeredCount: number;
  canSubmit: boolean;
  completion: number;
  currentIndex: number;
  error: string;
  isSubmitting: boolean;
  onAnswer: (questionId: string, answer: string | number) => void;
  onBack: () => void;
  onNext: () => void;
  positionLabel: string;
  question: AssessmentQuestion;
  questionAnswered: boolean;
  totalQuestions: number;
}) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <section className={`${styles.flowPanel} ${styles.questionPanel}`}>
      <div className={styles.progressBar} aria-hidden="true">
        <span style={{ width: `${completion}%` }} />
      </div>

      <div className={styles.questionHeader}>
        <div>
          <StepLabel step="03" title={positionLabel} />
          <h2>
            سؤال {currentIndex + 1} من {totalQuestions}
          </h2>
        </div>
        <div className={styles.progressCopy}>
          <strong>
            {answeredCount}/{totalQuestions}
          </strong>
          <span>مكتمل</span>
        </div>
      </div>

      <QuestionInput answer={answer} index={currentIndex} onAnswer={onAnswer} question={question} />

      {error ? <p className={styles.errorMessage}>{error}</p> : null}

      <div className={styles.wizardFooter}>
        <button className={styles.secondaryButton} type="button" onClick={onBack}>
          <ArrowRight size={18} aria-hidden="true" />
          رجوع
        </button>

        {isLastQuestion ? (
          <button className={styles.primaryButton} disabled={!canSubmit} type="submit">
            {isSubmitting ? 'جار الإرسال...' : 'إرسال الإجابات'}
            <Send size={18} aria-hidden="true" />
          </button>
        ) : (
          <button className={styles.primaryButton} disabled={!questionAnswered} type="button" onClick={onNext}>
            Next
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

function QuestionInput({
  answer,
  index,
  onAnswer,
  question,
}: {
  answer: string | number | undefined;
  index: number;
  onAnswer: (questionId: string, answer: string | number) => void;
  question: AssessmentQuestion;
}) {
  return (
    <article className={styles.singleQuestion}>
      <div className={styles.questionTop}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <small>{questionLabel(question)}</small>
      </div>

      <h3>{question.prompt}</h3>
      {question.helper ? <p className={styles.helper}>{question.helper}</p> : null}

      {question.type === 'choice' && question.options ? (
        <div className={styles.optionGrid}>
          {question.options.map((option) => {
            const isSelected = answer === option;

            return (
              <button
                className={`${styles.optionButton} ${isSelected ? styles.selectedOption : ''}`}
                key={option}
                type="button"
                onClick={() => onAnswer(question.id, option)}
                aria-pressed={isSelected}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {question.type === 'scale' ? (
        <div className={styles.scaleGroup} role="radiogroup" aria-label={question.prompt}>
          {scaleValues.map((value) => {
            const isSelected = Number(answer) === value;

            return (
              <button
                className={`${styles.scaleButton} ${isSelected ? styles.selectedScale : ''}`}
                key={value}
                type="button"
                onClick={() => onAnswer(question.id, value)}
                aria-checked={isSelected}
                role="radio"
              >
                {value}
              </button>
            );
          })}
        </div>
      ) : null}

      {question.type === 'text' ? (
        <textarea
          value={String(answer || '')}
          onChange={(event) => onAnswer(question.id, event.target.value)}
          placeholder="اكتب إجابتك هنا..."
          rows={5}
        />
      ) : null}
    </article>
  );
}

function SuccessStep({ fullName }: { fullName: string }) {
  return (
    <section className={styles.flowPanel}>
      <div className={styles.successState}>
        <CheckCircle2 size={54} aria-hidden="true" />
        <span>تم استلام الإجابات</span>
        <h2>شكراً يا {clean(fullName) || 'فنان'}.</h2>
        <p>إجاباتك اتسجلت. كل فرد له محاولة واحدة، فمش محتاج تبعت الفورم مرة تانية.</p>
      </div>
    </section>
  );
}

function StepLabel({ step, title }: { step: string; title: string }) {
  return (
    <div className={styles.stepLabel}>
      <Sparkles size={16} aria-hidden="true" />
      <span>{step}</span>
      <strong>{title}</strong>
    </div>
  );
}
