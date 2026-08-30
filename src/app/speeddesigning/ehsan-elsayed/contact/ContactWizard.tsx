'use client';

import { useReducer, useRef, useState, type FormEvent } from 'react';
import EhsanTransitionLink from '../EhsanTransitionLink';
import {
  INITIAL_CONTACT_STATE,
  contactReducer,
  validateContactStep,
  type ContactContext,
  type ContactErrors,
  type ContactProblem,
  type ContactTiming,
} from './contactModel';
import styles from './Contact.module.css';

const contexts: Array<[ContactContext, string, string]> = [
  ['team', 'A TEAM', 'A working group that needs a shared way forward.'],
  ['program', 'A PROGRAM', 'A learning or enablement initiative with a real outcome.'],
  ['individual', 'AN INDIVIDUAL', 'A specific operator building practical capability.'],
];

const problems: Array<[ContactProblem, string]> = [
  ['ai-adoption', 'AI ADOPTION'],
  ['revenue-clarity', 'REVENUE CLARITY'],
  ['team-capability', 'TEAM CAPABILITY'],
  ['other', 'SOMETHING ELSE'],
];

const timings: Array<[ContactTiming, string]> = [
  ['exploring', 'EXPLORING NOW'],
  ['quarter', 'THIS QUARTER'],
  ['later', 'LATER / NOT FIXED'],
];

const contextLabels = Object.fromEntries(contexts.map(([value, label]) => [value, label]));
const problemLabels = Object.fromEntries(problems.map(([value, label]) => [value, label]));

export default function ContactWizard() {
  const [state, dispatch] = useReducer(contactReducer, INITIAL_CONTACT_STATE);
  const [errors, setErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.step === 'complete') return;
    const nextErrors = validateContactStep(state, state.step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    dispatch({ type: state.step === 3 ? 'complete' : 'next' });
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const goBack = () => {
    dispatch({ type: 'back' });
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const reset = () => {
    dispatch({ type: 'reset' });
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  if (state.step === 'complete') {
    return (
      <section className={styles.complete} aria-live="polite">
        <p>04 / DEMO COMPLETE</p>
        <h2>DEMO COMPLETE.</h2>
        <strong>Nothing was sent.</strong>
        <button type="button" onClick={reset}>RESET THE DEMO</button>
        <a href="https://www.youtube.com/@ehsan__sayed" target="_blank" rel="noreferrer">Visit Ehsan&apos;s official YouTube ↗</a>
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/about" label="ABOUT">Open About →</EhsanTransitionLink>
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed#method" label="HOME">Return to the method →</EhsanTransitionLink>
      </section>
    );
  }

  const progress = state.step / 3;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className={styles.stepMeta}>
        <span>STEP {state.step} OF 3</span>
        <span>{state.step === 1 ? 'CONTEXT' : state.step === 2 ? 'PROBLEM' : 'DETAILS'}</span>
      </div>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Demo inquiry progress"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={state.step}
      >
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      {state.step === 1 ? (
        <fieldset>
          <legend>
            <span>01 / CONTEXT</span>
            <h2 ref={headingRef} tabIndex={-1}>Who is this for?</h2>
          </legend>
          <p className={styles.prompt}>Choose the closest starting point. This can be changed later.</p>
          <div
            className={styles.choices}
            role="radiogroup"
            aria-invalid={Boolean(errors.context)}
            aria-describedby={errors.context ? 'context-error' : undefined}
            tabIndex={errors.context ? -1 : undefined}
          >
            {contexts.map(([value, label, copy]) => (
              <label key={value} className={styles.choice}>
                <input
                  type="radio"
                  name="context"
                  value={value}
                  checked={state.context === value}
                  aria-label={value === 'team' ? 'Team or organization' : value === 'program' ? 'Learning program' : 'Individual'}
                  onChange={() => dispatch({ type: 'set-context', value })}
                />
                <strong>{label}</strong>
                <span>{copy}</span>
              </label>
            ))}
          </div>
          {errors.context ? <p id="context-error" className={styles.error}>{errors.context}</p> : null}
        </fieldset>
      ) : null}

      {state.step === 2 ? (
        <fieldset>
          <legend>
            <span>02 / PROBLEM</span>
            <h2 ref={headingRef} tabIndex={-1}>What needs to work?</h2>
          </legend>
          <p className={styles.prompt}>Pick the problem that is closest to the real constraint.</p>
          <div
            className={styles.choices}
            role="radiogroup"
            aria-invalid={Boolean(errors.problem)}
            aria-describedby={errors.problem ? 'problem-error' : undefined}
            tabIndex={errors.problem ? -1 : undefined}
          >
            {problems.map(([value, label]) => (
              <label key={value} className={styles.choice}>
                <input
                  type="radio"
                  name="problem"
                  value={value}
                  checked={state.problem === value}
                  aria-label={value === 'ai-adoption' ? 'AI adoption in real work' : value === 'revenue-clarity' ? 'Revenue clarity' : value === 'team-capability' ? 'Team capability' : 'Something else'}
                  onChange={() => dispatch({ type: 'set-problem', value })}
                />
                <strong>{label}</strong>
              </label>
            ))}
          </div>
          {errors.problem ? <p id="problem-error" className={styles.error}>{errors.problem}</p> : null}
          <label className={styles.field}>
            <span>{state.problem === 'other' ? 'DESCRIBE THE WORKING PROBLEM' : 'OPTIONAL CONTEXT'}</span>
            <textarea
              value={state.note}
              maxLength={600}
              aria-label="Short note"
              aria-invalid={Boolean(errors.note)}
              aria-describedby={errors.note ? 'note-error note-count' : 'note-count'}
              onChange={(event) => dispatch({ type: 'set-note', value: event.target.value })}
              placeholder="What is happening now—and what needs to become possible?"
            />
            <small id="note-count">{600 - state.note.length} characters remaining</small>
          </label>
          {errors.note ? <p id="note-error" className={styles.error}>{errors.note}</p> : null}
        </fieldset>
      ) : null}

      {state.step === 3 ? (
        <fieldset>
          <legend>
            <span>03 / DETAILS</span>
            <h2 ref={headingRef} tabIndex={-1}>Complete the picture.</h2>
          </legend>
          <div className={styles.summary}>
            <p><span>CONTEXT</span><strong>{contextLabels[state.context]}</strong></p>
            <p><span>PROBLEM</span><strong>{problemLabels[state.problem]}</strong></p>
          </div>
          <label className={styles.field}>
            <span>NAME</span>
            <input
              type="text"
              autoComplete="name"
              value={state.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              onChange={(event) => dispatch({ type: 'set-details', field: 'name', value: event.target.value })}
            />
          </label>
          {errors.name ? <p id="name-error" className={styles.error}>{errors.name}</p> : null}
          <label className={styles.field}>
            <span>WORK EMAIL</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={state.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(event) => dispatch({ type: 'set-details', field: 'email', value: event.target.value })}
            />
          </label>
          {errors.email ? <p id="email-error" className={styles.error}>{errors.email}</p> : null}
          <label className={styles.field}>
            <span>ORGANIZATION (OPTIONAL)</span>
            <input
              type="text"
              autoComplete="organization"
              value={state.organization}
              onChange={(event) => dispatch({ type: 'set-details', field: 'organization', value: event.target.value })}
            />
          </label>
          <fieldset className={styles.timing}>
            <legend>TIMING</legend>
            <div
              className={styles.choices}
              role="radiogroup"
              aria-invalid={Boolean(errors.timing)}
              aria-describedby={errors.timing ? 'timing-error' : undefined}
              tabIndex={errors.timing ? -1 : undefined}
            >
              {timings.map(([value, label]) => (
                <label key={value} className={styles.choice}>
                  <input
                    type="radio"
                    name="timing"
                    value={value}
                    checked={state.timing === value}
                    aria-label={value === 'exploring' ? 'Exploring' : value === 'quarter' ? 'This quarter' : 'Later'}
                    onChange={() => dispatch({ type: 'set-timing', value })}
                  />
                  <strong>{label}</strong>
                </label>
              ))}
            </div>
          </fieldset>
          {errors.timing ? <p id="timing-error" className={styles.error}>{errors.timing}</p> : null}
        </fieldset>
      ) : null}

      <div className={styles.actions}>
        {state.step > 1 ? <button type="button" className={styles.back} onClick={goBack}>← BACK</button> : <span />}
        <button type="submit">{state.step === 3 ? 'COMPLETE THE DEMO' : 'CONTINUE →'}</button>
      </div>
      <p className={styles.privacy}>Local demo state only. No submission or storage.</p>
    </form>
  );
}
