import { Metadata } from 'next';
import PromptInjectionArticle from './PromptInjectionArticle';

export const metadata: Metadata = {
    title: 'الجانب المظلم للـ AI: هجمات Prompt Injection | Muhammed Mekky',
    description:
        'مقال شامل عن هجمات Prompt Injection وكيف الهاكرز بيخدعوا الـ AI عشان يسرب بيانات حساسة. تعرف على أنواع الهجمات وإزاي تحمي نفسك.',
    openGraph: {
        title: 'الجانب المظلم للـ AI: هجمات Prompt Injection',
        description:
            'مع هوجة تحديثات الـ AI اللي مفيش استفادة حقيقية منها غير للي فاهم... تعالى نتكلم عن الجانب المظلم. Prompt Injection Attacks.',
        images: [{ url: '/images/blog/prompt-injection-hero.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'الجانب المظلم للـ AI: هجمات Prompt Injection',
        images: ['/images/blog/prompt-injection-hero.png'],
    },
};

export default function Page() {
    return <PromptInjectionArticle />;
}
