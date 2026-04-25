import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Shopify Architect',
  description: 'Privacy policy for The Shopify Architect enrollment page.',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: 840, margin: '0 auto', padding: '3rem 1rem', lineHeight: 1.7 }}>
      <h1>Privacy Policy</h1>
      <p>We collect only the data required to process enrollment and communicate course updates.</p>
      <p>We do not store raw card data in plain text through this page.</p>
      <p>Your information is used for enrollment operations, support, and legal compliance.</p>
      <p>For privacy requests, contact: support@muhammedmekky.com</p>
    </main>
  );
}
