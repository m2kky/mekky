import test from 'node:test';
import assert from 'node:assert/strict';
import { waitlistQuestions } from '../src/app/prompt-to-product/promptToProductData.ts';
import {
  chooseWizardAnswer,
  clearStoredProgress,
  createProgressSnapshot,
  getGreetingName,
  nextWizardStep,
  parseStoredProgress,
  previousWizardStep,
  readStoredProgress,
  writeStoredProgress,
} from '../src/app/prompt-to-product/waitlistWizardState.ts';

const validProgress = {
  identity: {
    fullName: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    phone: '01012345678',
  },
  answers: {
    role: 'founder',
    tools: ['chatgpt', 'claude'],
  },
  step: 2,
};

test('exposes pure waitlist wizard state operations', async () => {
  const state = await import(
    '../src/app/prompt-to-product/waitlistWizardState.ts'
  );

  for (const operation of [
    'parseStoredProgress',
    'readStoredProgress',
    'writeStoredProgress',
    'clearStoredProgress',
    'createProgressSnapshot',
    'nextWizardStep',
    'previousWizardStep',
    'chooseWizardAnswer',
    'getGreetingName',
  ]) {
    assert.equal(typeof state[operation], 'function', `expected ${operation} to be exported`);
  }
});

test('hydrates a valid partial draft into a detached snapshot', () => {
  const parsed = parseStoredProgress(JSON.stringify(validProgress), waitlistQuestions);

  assert.deepEqual(parsed, validProgress);
  assert.notEqual(parsed, validProgress);
  assert.notEqual(parsed.answers.tools, validProgress.answers.tools);
});

test('normalizes duplicate multi-select values while hydrating', () => {
  const serialized = JSON.stringify({
    ...validProgress,
    answers: { tools: ['chatgpt', 'chatgpt', 'claude'] },
  });

  const parsed = parseStoredProgress(serialized, waitlistQuestions);
  assert.deepEqual(parsed.answers.tools, ['chatgpt', 'claude']);
});

test('rejects malformed, unknown, or incorrectly typed draft values', () => {
  const invalidDrafts = [
    null,
    { ...validProgress, identity: { ...validProgress.identity, fullName: 42 } },
    { ...validProgress, answers: { invented: 'value' } },
    { ...validProgress, answers: { role: ['founder'] } },
    { ...validProgress, answers: { tools: 'chatgpt' } },
    { ...validProgress, answers: { role: 'invented-role' } },
    { ...validProgress, answers: { tools: ['none', 'chatgpt'] } },
  ];

  for (const draft of invalidDrafts) {
    assert.equal(
      parseStoredProgress(JSON.stringify(draft), waitlistQuestions),
      null
    );
  }
  assert.equal(parseStoredProgress('{not-json', waitlistQuestions), null);
});

test('rejects non-integer and out-of-range saved steps', () => {
  for (const step of [-2, 1.5, waitlistQuestions.length]) {
    assert.equal(
      parseStoredProgress(JSON.stringify({ ...validProgress, step }), waitlistQuestions),
      null
    );
  }
});

test('reads valid storage and discards an invalid draft without throwing', () => {
  let removed = 0;
  const validStorage = {
    getItem: () => JSON.stringify(validProgress),
    setItem: () => {},
    removeItem: () => { removed += 1; },
  };
  assert.deepEqual(
    readStoredProgress(validStorage, 'draft', waitlistQuestions),
    validProgress
  );
  assert.equal(removed, 0);

  const invalidStorage = {
    ...validStorage,
    getItem: () => JSON.stringify({ ...validProgress, step: 99 }),
  };
  assert.equal(readStoredProgress(invalidStorage, 'draft', waitlistQuestions), null);
  assert.equal(removed, 1);
});

test('contains storage read, write, and remove failures', () => {
  const throwingStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('quota'); },
    removeItem: () => { throw new Error('blocked'); },
  };

  assert.equal(readStoredProgress(throwingStorage, 'draft', waitlistQuestions), null);
  assert.equal(writeStoredProgress(throwingStorage, 'draft', validProgress), false);
  assert.equal(clearStoredProgress(throwingStorage, 'draft'), false);
});

test('writes and clears progress when storage is available', () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };

  assert.equal(writeStoredProgress(storage, 'draft', validProgress), true);
  assert.deepEqual(JSON.parse(values.get('draft')), validProgress);
  assert.equal(clearStoredProgress(storage, 'draft'), true);
  assert.equal(values.has('draft'), false);
});

test('keeps next and back navigation inside identity and question bounds', () => {
  const lastStep = waitlistQuestions.length - 1;

  assert.equal(nextWizardStep(-1, lastStep), 0);
  assert.equal(nextWizardStep(lastStep, lastStep), lastStep);
  assert.equal(previousWizardStep(0), -1);
  assert.equal(previousWizardStep(-1), -1);
});

test('replaces a single-choice answer', () => {
  const role = waitlistQuestions.find((question) => question.id === 'role');
  assert.equal(chooseWizardAnswer(role, 'founder', 'developer'), 'developer');
  assert.equal(chooseWizardAnswer(role, 'founder', 'invalid'), 'founder');
});

test('toggles multi-select answers and keeps none exclusive', () => {
  const tools = waitlistQuestions.find((question) => question.id === 'tools');

  assert.deepEqual(chooseWizardAnswer(tools, undefined, 'chatgpt'), ['chatgpt']);
  assert.deepEqual(chooseWizardAnswer(tools, ['chatgpt'], 'claude'), ['chatgpt', 'claude']);
  assert.deepEqual(chooseWizardAnswer(tools, ['chatgpt'], 'chatgpt'), []);
  assert.deepEqual(chooseWizardAnswer(tools, ['chatgpt'], 'none'), ['none']);
  assert.deepEqual(chooseWizardAnswer(tools, ['none'], 'claude'), ['claude']);
  assert.deepEqual(chooseWizardAnswer(tools, ['none'], 'none'), []);
});

test('creates an immutable progress snapshot and trims the greeting name', () => {
  const identity = { ...validProgress.identity };
  const answers = { tools: ['chatgpt'] };
  const snapshot = createProgressSnapshot(identity, answers, 2);

  identity.fullName = 'Changed';
  answers.tools.push('claude');

  assert.equal(snapshot.identity.fullName, 'Ahmed Mohamed');
  assert.deepEqual(snapshot.answers.tools, ['chatgpt']);
  assert.equal(getGreetingName('   Ahmed   Mohamed   '), 'Ahmed');
  assert.equal(getGreetingName('     '), '');
});
