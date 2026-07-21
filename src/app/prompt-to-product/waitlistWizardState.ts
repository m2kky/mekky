import type {
  WaitlistAnswers,
  WaitlistQuestion,
} from './promptToProductData';

export type Identity = { fullName: string; email: string; phone: string };
export type StoredProgress = {
  identity: Identity;
  answers: WaitlistAnswers;
  step: number;
};

type QuestionContract = Pick<WaitlistQuestion, 'id' | 'type' | 'options'>;
type StoragePort = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const isIdentity = (value: unknown): value is Identity =>
  isRecord(value)
  && typeof value.fullName === 'string'
  && typeof value.email === 'string'
  && typeof value.phone === 'string';

const hasOption = (question: QuestionContract, value: string) =>
  question.options.some((option) => option.value === value);

export function createProgressSnapshot(
  identity: Identity,
  answers: WaitlistAnswers,
  step: number
): StoredProgress {
  return {
    identity: { ...identity },
    answers: Object.fromEntries(
      Object.entries(answers).map(([questionId, answer]) => [
        questionId,
        Array.isArray(answer) ? [...answer] : answer,
      ])
    ),
    step,
  };
}

export function parseStoredProgress(
  serialized: string | null,
  questions: QuestionContract[]
): StoredProgress | null {
  if (typeof serialized !== 'string') return null;

  try {
    const raw = JSON.parse(serialized) as unknown;
    if (!isRecord(raw) || !isIdentity(raw.identity) || !isRecord(raw.answers)) {
      return null;
    }
    if (
      !Number.isInteger(raw.step)
      || (raw.step as number) < -1
      || (raw.step as number) >= questions.length
    ) {
      return null;
    }

    const questionById = new Map<string, QuestionContract>(
      questions.map((question) => [question.id, question])
    );
    const answers: WaitlistAnswers = {};

    for (const [questionId, answer] of Object.entries(raw.answers)) {
      const question = questionById.get(questionId);
      if (!question) return null;

      if (question.type === 'choice') {
        if (typeof answer !== 'string' || !hasOption(question, answer)) return null;
        answers[questionId] = answer;
        continue;
      }

      if (
        !Array.isArray(answer)
        || answer.some((value) => typeof value !== 'string' || !hasOption(question, value))
      ) {
        return null;
      }

      const uniqueAnswers = [...new Set(answer)];
      if (uniqueAnswers.includes('none') && uniqueAnswers.length > 1) return null;
      answers[questionId] = uniqueAnswers;
    }

    return createProgressSnapshot(raw.identity, answers, raw.step as number);
  } catch {
    return null;
  }
}

export function readStoredProgress(
  storage: StoragePort,
  key: string,
  questions: QuestionContract[]
): StoredProgress | null {
  let serialized: string | null;

  try {
    serialized = storage.getItem(key);
  } catch {
    return null;
  }

  if (serialized === null) return null;
  const progress = parseStoredProgress(serialized, questions);
  if (!progress) clearStoredProgress(storage, key);
  return progress;
}

export function writeStoredProgress(
  storage: StoragePort,
  key: string,
  progress: StoredProgress
): boolean {
  try {
    storage.setItem(key, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function clearStoredProgress(storage: StoragePort, key: string): boolean {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function nextWizardStep(current: number, lastStep: number): number {
  return Math.min(current + 1, lastStep);
}

export function previousWizardStep(current: number): number {
  return Math.max(-1, current - 1);
}

export function chooseWizardAnswer(
  question: QuestionContract,
  currentAnswer: string | string[] | undefined,
  value: string
): string | string[] | undefined {
  if (!hasOption(question, value)) return currentAnswer;
  if (question.type === 'choice') return value;

  const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
  if (value === 'none') return selected.includes('none') ? [] : ['none'];
  if (selected.includes(value)) return selected.filter((item) => item !== value);
  return [...selected.filter((item) => item !== 'none'), value];
}

export function getGreetingName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || '';
}
