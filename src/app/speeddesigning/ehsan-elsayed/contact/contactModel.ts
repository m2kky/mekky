export type ContactStep = 1 | 2 | 3 | 'complete';
export type ContactContext = '' | 'team' | 'program' | 'individual';
export type ContactProblem = '' | 'ai-adoption' | 'revenue-clarity' | 'team-capability' | 'other';
export type ContactTiming = '' | 'exploring' | 'quarter' | 'later';

export type ContactWizardState = {
  step: ContactStep;
  context: ContactContext;
  problem: ContactProblem;
  note: string;
  name: string;
  email: string;
  organization: string;
  timing: ContactTiming;
};

export type ContactErrors = Partial<Record<'context' | 'problem' | 'note' | 'name' | 'email' | 'timing', string>>;

export type ContactAction =
  | { type: 'set-context'; value: ContactContext }
  | { type: 'set-problem'; value: ContactProblem }
  | { type: 'set-note'; value: string }
  | { type: 'set-details'; field: 'name' | 'email' | 'organization'; value: string }
  | { type: 'set-timing'; value: ContactTiming }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'complete' }
  | { type: 'reset' };

export const INITIAL_CONTACT_STATE: ContactWizardState = {
  step: 1,
  context: '',
  problem: '',
  note: '',
  name: '',
  email: '',
  organization: '',
  timing: '',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactStep(state: ContactWizardState, step: 1 | 2 | 3): ContactErrors {
  const errors: ContactErrors = {};
  if (step === 1 && !state.context) errors.context = 'Choose who this is for.';
  if (step === 2) {
    if (!state.problem) errors.problem = 'Choose the closest working problem.';
    if (state.problem === 'other' && !state.note.trim()) errors.note = 'Describe the working problem.';
  }
  if (step === 3) {
    if (!state.name.trim()) errors.name = 'Enter your name.';
    if (!EMAIL.test(state.email.trim())) errors.email = 'Enter a valid work email.';
    if (!state.timing) errors.timing = 'Choose a timing.';
  }
  return errors;
}

export function contactReducer(state: ContactWizardState, action: ContactAction): ContactWizardState {
  switch (action.type) {
    case 'set-context': return { ...state, context: action.value };
    case 'set-problem': return { ...state, problem: action.value };
    case 'set-note': return { ...state, note: action.value.slice(0, 600) };
    case 'set-details': return { ...state, [action.field]: action.value };
    case 'set-timing': return { ...state, timing: action.value };
    case 'next': return { ...state, step: state.step === 1 ? 2 : state.step === 2 ? 3 : state.step };
    case 'back': return { ...state, step: state.step === 3 ? 2 : state.step === 2 ? 1 : state.step };
    case 'complete': return { ...state, step: 'complete' };
    case 'reset': return INITIAL_CONTACT_STATE;
  }
  return state;
}
