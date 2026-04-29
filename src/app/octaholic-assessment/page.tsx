import type { Metadata } from 'next';
import OctaholicAssessmentClient from './OctaholicAssessmentClient';

export const metadata: Metadata = {
  title: 'Octaholic AI Workshop Assessment',
  description: 'Role-based AI workshop assessment for the Octaholic team.',
  robots: 'noindex, nofollow',
};

export default function OctaholicAssessmentPage() {
  return <OctaholicAssessmentClient />;
}
