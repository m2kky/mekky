import type { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Muhammed Mekky',
  description: 'Evaluate your team\'s AI readiness, learning speed, and problem-solving capabilities. A comprehensive assessment for marketing agencies and corporate teams.',
  keywords: ['AI Assessment', 'AI Readiness', 'Team Evaluation', 'Corporate Training', 'Marketing AI'],
  robots: 'index, follow',
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}
