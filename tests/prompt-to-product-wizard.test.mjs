import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const wizardSource = readFileSync('src/app/prompt-to-product/WaitlistWizard.tsx', 'utf8');
const styleSource = readFileSync('src/app/prompt-to-product/PromptToProduct.module.css', 'utf8');

test('models identity, seven answers, navigation, and request status', () => {
  assert.match(wizardSource, /useState\(emptyIdentity\)/);
  assert.match(wizardSource, /useState<WaitlistAnswers>\(\{\}\)/);
  assert.match(wizardSource, /useState\(-1\)/);
  assert.match(wizardSource, /'idle' \| 'submitting' \| 'success'/);
  assert.match(wizardSource, /waitlistQuestions\[step\]/);
  assert.match(wizardSource, /String\(step \+ 1\)\.padStart\(2, '0'\)/);
});

test('hydrates saved progress before writing it back', () => {
  assert.match(wizardSource, /localStorage\.getItem\(WAITLIST_STORAGE_KEY\)/);
  assert.match(wizardSource, /setIdentity\(progress\.identity \|\| emptyIdentity\)/);
  assert.match(wizardSource, /setAnswers\(progress\.answers \|\| \{\}\)/);
  assert.match(wizardSource, /Number\.isInteger\(progress\.step\)/);
  assert.match(wizardSource, /if \(!hydrated \|\| status === 'success'\) return/);
  assert.match(wizardSource, /localStorage\.setItem\(\s*WAITLIST_STORAGE_KEY/);
  assert.match(wizardSource, /localStorage\.removeItem\(WAITLIST_STORAGE_KEY\)/);
});

test('validates complete identity fields and Egyptian contact details', () => {
  assert.match(wizardSource, /identity\.fullName\.trim\(\)/);
  assert.match(wizardSource, /identity\.email\.trim\(\)/);
  assert.match(wizardSource, /identity\.phone\.trim\(\)/);
  assert.match(wizardSource, /\^\[\^\\s@\]\+@\[\^\\s@\]\+\\\.\[\^\\s@\]\+\$/);
  assert.match(wizardSource, /\^01\[0125\]\\d\{8\}\$/);
  assert.match(wizardSource, /اكتب إيميل صحيح/);
  assert.match(wizardSource, /اكتب رقم واتساب مصري صحيح/);
});

test('supports exclusive single choice and none-aware multi-select answers', () => {
  assert.match(wizardSource, /currentQuestion\.type === 'choice'/);
  assert.match(wizardSource, /\[currentQuestion\.id\]: value/);
  assert.match(wizardSource, /value === 'none'/);
  assert.match(wizardSource, /selected\.filter\(\(item\) => item !== 'none'\)/);
  assert.match(wizardSource, /aria-pressed=\{selected\}/);
});

test('moves backward and forward without leaving the assessment bounds', () => {
  assert.match(wizardSource, /Math\.min\(current \+ 1, waitlistQuestions\.length - 1\)/);
  assert.match(wizardSource, /Math\.max\(-1, current - 1\)/);
  assert.match(wizardSource, /disabled=\{!canContinue\}/);
  assert.match(wizardSource, /step === waitlistQuestions\.length - 1/);
});

test('submits the complete payload and leaves saved answers available for retry', () => {
  assert.match(wizardSource, /fetch\('\/api\/prompt-to-product'/);
  assert.match(wizardSource, /method: 'POST'/);
  assert.match(wizardSource, /JSON\.stringify\(\{ \.\.\.identity, answers \}\)/);
  assert.match(wizardSource, /if \(!response\.ok \|\| !result\.success\)/);
  assert.match(wizardSource, /setStatus\('idle'\)/);
  assert.match(wizardSource, /إجاباتك محفوظة، جرّب تاني/);
  assert.match(wizardSource, /setStatus\('success'\)/);
});

test('renders accessible identity, error, progress, loading, and success states in the campaign system', () => {
  assert.match(wizardSource, /useReducedMotion/);
  assert.match(wizardSource, /initial=\{shouldReduceMotion \? false/);
  assert.match(wizardSource, /aria-labelledby="wizard-title"/);
  assert.match(wizardSource, /autoComplete="name"/);
  assert.match(wizardSource, /autoComplete="email"/);
  assert.match(wizardSource, /autoComplete="tel"/);
  assert.match(wizardSource, /role="alert"/);
  assert.match(wizardSource, /LoaderCircle/);
  assert.match(wizardSource, /CheckCircle2/);
  assert.match(styleSource, /\.waitlistPrelude\s*,\s*\.wizardShell/);
  assert.match(styleSource, /\.optionList \.optionSelected/);
  assert.match(styleSource, /@keyframes spin/);
  assert.match(styleSource, /@media \(prefers-reduced-motion:reduce\)/);
});
