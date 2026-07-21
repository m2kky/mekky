import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WAITLIST_ID,
  normalizeWaitlistSubmission,
  validateWaitlistIdentity,
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

test('shares normalized identity validation with the client flow', () => {
  assert.deepEqual(
    validateWaitlistIdentity(validPayload),
    {
      ok: true,
      value: {
        fullName: 'Ahmed Mohamed',
        email: 'ahmed@example.com',
        phone: '01012345678',
      },
    }
  );
});

test('returns field-level Arabic identity errors', () => {
  assert.deepEqual(
    validateWaitlistIdentity({ fullName: '', email: 'wrong', phone: '1234' }),
    {
      ok: false,
      errors: {
        fullName: 'اكتب اسمك الأول.',
        email: 'اكتب إيميل صحيح.',
        phone: 'اكتب رقم واتساب مصري صحيح.',
      },
    }
  );
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
