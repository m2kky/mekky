import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | The Shopify Architect',
  description: 'Terms of service for The Shopify Architect enrollment page.',
};

export default function TermsOfServicePage() {
  return (
    <main style={{ maxWidth: 840, margin: '0 auto', padding: '3rem 1rem', lineHeight: 1.7 }}>
      <h1>Terms of Service</h1>
      <p>Enrollment is subject to seat availability and program schedule updates.</p>
      <p>By enrolling, you agree to receive course-related communication and onboarding instructions.</p>
      <p>Any refund or guarantee terms are applied according to the active offer at enrollment time.</p>
      <p>For legal inquiries, contact: support@muhammedmekky.com</p>
    </main>
  );
}
