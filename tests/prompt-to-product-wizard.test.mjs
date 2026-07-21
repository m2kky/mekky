import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const wizardSource = readFileSync('src/app/prompt-to-product/WaitlistWizard.tsx', 'utf8');
const styleSource = readFileSync('src/app/prompt-to-product/PromptToProduct.module.css', 'utf8');
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

test('models identity, seven answers, navigation, and request status', () => {
  assert.match(wizardSource, /useState\(emptyIdentity\)/);
  assert.match(wizardSource, /useState<WaitlistAnswers>\(\{\}\)/);
  assert.match(wizardSource, /useState\(-1\)/);
  assert.match(wizardSource, /'idle' \| 'submitting' \| 'success'/);
  assert.match(wizardSource, /waitlistQuestions\[step\]/);
  assert.match(wizardSource, /String\(step \+ 1\)\.padStart\(2, '0'\)/);
});

test('hydrates saved progress before writing it back', () => {
  assert.match(wizardSource, /readStoredProgress/);
  assert.match(wizardSource, /createProgressSnapshot/);
  assert.match(wizardSource, /writeStoredProgress/);
  assert.match(wizardSource, /clearStoredProgress/);
  assert.match(wizardSource, /if \(!hydrated \|\| status === 'success'\) return/);
});

test('validates complete identity fields and Egyptian contact details', () => {
  assert.match(wizardSource, /validateWaitlistIdentity\(identity\)/);
  assert.match(wizardSource, /if \(step === -1\) return identityValidation\.ok/);
  assert.match(wizardSource, /aria-invalid=/);
  assert.match(wizardSource, /aria-describedby=/);
  assert.match(wizardSource, /styles\.fieldError/);
});

test('supports exclusive single choice and none-aware multi-select answers', () => {
  assert.match(wizardSource, /chooseWizardAnswer/);
  assert.match(wizardSource, /aria-pressed=\{selected\}/);
});

test('moves backward and forward without leaving the assessment bounds', () => {
  assert.match(wizardSource, /nextWizardStep/);
  assert.match(wizardSource, /previousWizardStep/);
  assert.match(wizardSource, /step === waitlistQuestions\.length - 1/);
});

test('submits the complete payload and leaves saved answers available for retry', () => {
  assert.match(wizardSource, /fetch\('\/api\/prompt-to-product'/);
  assert.match(wizardSource, /method: 'POST'/);
  assert.match(wizardSource, /JSON\.stringify\(\{ \.\.\.identity, answers, website \}\)/);
  assert.match(wizardSource, /if \(!response\.ok \|\| !result\.success\)/);
  assert.match(wizardSource, /setStatus\('idle'\)/);
  assert.match(wizardSource, /إجاباتك محفوظة، جرّب تاني/);
  assert.match(wizardSource, /setStatus\('success'\)/);
});

test('focuses each keyed panel when it mounts and handles success separately', () => {
  assert.match(wizardSource, /useCallback/);
  assert.match(wizardSource, /focusPanelOnMount/);
  assert.match(wizardSource, /focusSuccessOnMount/);
  assert.match(wizardSource, /requestAnimationFrame/);
  assert.match(wizardSource, /cancelAnimationFrame/);
  assert.match(
    wizardSource,
    /<motion\.div[\s\S]*?ref=\{focusPanelOnMount\}[\s\S]*?tabIndex=\{-1\}/
  );
  assert.match(
    wizardSource,
    /className=\{styles\.successState\}[\s\S]*?ref=\{focusSuccessOnMount\}[\s\S]*?tabIndex=\{-1\}/
  );
  assert.doesNotMatch(wizardSource, /focusTargetRef|focusKey/);
});

test('runs all waitlist checks through the canonical package script', () => {
  const command = packageJson.scripts['test:waitlist'];
  for (const testFile of [
    'prompt-to-product-domain.test.mjs',
    'prompt-to-product-api-contract.test.mjs',
    'prompt-to-product-rate-limit.test.mjs',
    'prompt-to-product-wizard-state.test.mjs',
    'prompt-to-product-wizard.test.mjs',
    'prompt-to-product-campaign.test.mjs',
  ]) {
    assert.match(command, new RegExp(testFile.replaceAll('.', '\\.')));
  }
});

test('freezes every mutation path while a request is submitting', () => {
  assert.match(wizardSource, /submissionLockedRef/);
  assert.ok(
    (wizardSource.match(/if \(submitting\) return/g)?.length ?? 0) >= 4,
    'expected identity, answer, next, and back handlers to be guarded'
  );
  assert.ok(
    (wizardSource.match(/disabled=\{submitting\}/g)?.length ?? 0) >= 5,
    'expected identity inputs, options, and back navigation to freeze'
  );
  assert.match(wizardSource, /disabled=\{!canContinue \|\| submitting\}/);
  assert.match(wizardSource, /getGreetingName/);
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
