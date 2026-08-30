import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';

const modelPath = pathToFileURL(`${process.cwd()}/src/app/speeddesigning/ehsan-elsayed/contact/contactModel.ts`).href;
const model = await import(`${modelPath}?test=${Date.now()}`);

test('requires a context before leaving Contact step one', () => {
  assert.deepEqual(model.validateContactStep(model.INITIAL_CONTACT_STATE, 1), { context: 'Choose who this is for.' });
});

test('requires a note only when the Contact problem is something else', () => {
  const state = { ...model.INITIAL_CONTACT_STATE, problem: 'other' };
  assert.deepEqual(model.validateContactStep(state, 2), { note: 'Describe the working problem.' });
  assert.deepEqual(model.validateContactStep({ ...state, note: 'A specific constraint' }, 2), {});
});

test('validates Contact details and work email', () => {
  const invalid = { ...model.INITIAL_CONTACT_STATE, name: '', email: 'wrong', timing: '' };
  assert.deepEqual(model.validateContactStep(invalid, 3), {
    name: 'Enter your name.',
    email: 'Enter a valid work email.',
    timing: 'Choose a timing.',
  });
});

test('moves backward without clearing values and reset clears everything', () => {
  const filled = { ...model.INITIAL_CONTACT_STATE, step: 3, context: 'team', name: 'Sam' };
  const back = model.contactReducer(filled, { type: 'back' });
  assert.equal(back.step, 2);
  assert.equal(back.name, 'Sam');
  assert.deepEqual(model.contactReducer(back, { type: 'reset' }), model.INITIAL_CONTACT_STATE);
});

test('completion changes local wizard state only', () => {
  const state = {
    ...model.INITIAL_CONTACT_STATE,
    step: 3,
    context: 'team',
    problem: 'ai-adoption',
    name: 'Sam',
    email: 'sam@example.com',
    timing: 'exploring',
  };
  assert.equal(model.contactReducer(state, { type: 'complete' }).step, 'complete');
});
