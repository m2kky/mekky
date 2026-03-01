import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import CaseStudiesNewsletter from '@/components/case-studies/CaseStudiesNewsletter';
import { createClient } from '@/utils/supabase/server';

export default async function CaseStudiesPage() {
    const supabase = await createClient();
    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <CaseStudiesHero />
                <CaseStudiesList items={caseStudies || []} />
                <CaseStudiesNewsletter />
                <FooterSection />
            </div>

        </>
    );
}
