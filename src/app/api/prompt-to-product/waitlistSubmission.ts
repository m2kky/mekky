type WaitlistSubmissionInput = {
  fullName: string;
  email: string;
  phone: string;
  answers: Array<{
    questionId: string;
    type: 'choice' | 'multi-select';
    prompt: string;
    answer: string[];
  }>;
};

export function buildWaitlistSubmissionRow(
  submission: WaitlistSubmissionInput,
  userAgent: string
) {
  return {
    assessment_id: 'prompt-to-product-2026',
    company: 'Prompt to Product',
    full_name: submission.fullName,
    email: submission.email,
    phone: submission.phone,
    position: 'waitlist',
    position_label: 'Prompt to Product Waitlist',
    answers: submission.answers,
    user_agent: userAgent,
  };
}
