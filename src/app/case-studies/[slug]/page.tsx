import CaseStudyClient from './CaseStudyClient';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { CASE_STUDIES } from '@/lib/constants';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const study = CASE_STUDIES.items.find((s: any) => s.slug === resolvedParams.slug);

    if (!study) {
        return {
            title: 'Case Study Not Found | Muhammed Mekky'
        };
    }

    return {
        title: `${study.title} | Case Study`,
        description: study.description || 'View this case study by Muhammed Mekky.',
    };
}

export async function generateStaticParams() {
    return CASE_STUDIES.items.map((study) => ({
        slug: study.slug,
    }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const study = CASE_STUDIES.items.find((s: any) => s.slug === resolvedParams.slug);

    if (!study) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>
                        Case Study Not Found
                    </h1>
                </div>
                <FooterSection />
            </>
        );
    }

    return <CaseStudyClient study={study as any} />;
}
