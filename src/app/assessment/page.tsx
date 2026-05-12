import type { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export const metadata: Metadata = {
  title: 'AI Assessment',
  description: 'Role-based AI assessment.',
  robots: 'noindex, nofollow',
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}
