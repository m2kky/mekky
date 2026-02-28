import { createClient } from '@/utils/supabase/server';
import CaseStudyClient from './CaseStudyClient';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { notFound } from 'next/navigation';

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();
    const { data: study } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .eq('published', true)
        .single();

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

    return <CaseStudyClient study={study} />;
}
