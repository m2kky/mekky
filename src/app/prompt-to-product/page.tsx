import type { Metadata } from 'next';
import PromptToProductClient from './PromptToProductClient';

export const metadata: Metadata = {
  title: 'AI Product Engineer — ابنِ وقُد منتجات بالـAI | Muhammed Mekky',
  description: 'برنامج عملي للمبتدئين يفهمك الويب والبيانات والـUX والتصميم الهندسي، ثم يخليك تقود الـAI لبناء أدوات وSaaS وأتمتة حقيقية.',
  alternates: { canonical: '/prompt-to-product' },
  openGraph: {
    title: 'AI Product Engineer — من فكرة لمنتج تقدر تقوده وتبيعه',
    description: 'مش مطلوب تكتب الكود بنفسك. مطلوب تفهم المنتج والنظام كويس كفاية عشان تقود التنفيذ وتراجع النتيجة.',
    images: ['/images/og-preview.png'],
  },
};

export default function PromptToProductPage() {
  return <PromptToProductClient />;
}
