import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeWaitlistSubmission,
  waitlistQuestions,
} from '../src/app/prompt-to-product/promptToProductData.ts';
import {
  buildWaitlistSubmissionRow,
  hasFilledHoneypot,
  isWaitlistRequestBody,
} from '../src/app/api/prompt-to-product/waitlistSubmission.ts';

const answers = Object.fromEntries(
  waitlistQuestions.map((question) => [
    question.id,
    question.type === 'multi-select'
      ? [question.options[0].value]
      : question.options[0].value,
  ])
);

test('maps a normalized lead to the fixed Supabase row contract', () => {
  const normalized = normalizeWaitlistSubmission({
    fullName: 'Test Lead',
    email: 'test@example.com',
    phone: '01012345678',
    answers,
  });
  assert.equal(normalized.ok, true);

  const row = buildWaitlistSubmissionRow(normalized.value, 'test-agent');
  assert.deepEqual(
    {
      assessment_id: row.assessment_id,
      company: row.company,
      full_name: row.full_name,
      email: row.email,
      phone: row.phone,
      position: row.position,
      position_label: row.position_label,
      answerCount: row.answers.length,
      user_agent: row.user_agent,
    },
    {
      assessment_id: 'prompt-to-product-2026',
      company: 'Prompt to Product',
      full_name: 'Test Lead',
      email: 'test@example.com',
      phone: '01012345678',
      position: 'waitlist',
      position_label: 'Prompt to Product Waitlist',
      answerCount: 7,
      user_agent: 'test-agent',
    }
  );
});

test('rejects non-object JSON bodies before reading the honeypot', () => {
  assert.equal(isWaitlistRequestBody(null), false);
  assert.equal(isWaitlistRequestBody([]), false);
  assert.equal(isWaitlistRequestBody('body'), false);
  assert.equal(isWaitlistRequestBody({ website: '' }), true);
  assert.equal(hasFilledHoneypot({ website: 'bot-filled' }), true);
  assert.equal(hasFilledHoneypot({ website: '' }), false);
});
