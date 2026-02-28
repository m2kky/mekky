import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioBentoGrid from '@/components/portfolio/PortfolioBentoGrid';
import PortfolioCaseStudies from '@/components/portfolio/PortfolioCaseStudies';
import PortfolioStatement from '@/components/portfolio/PortfolioStatement';
import PortfolioProcess from '@/components/portfolio/PortfolioProcess';
import LecturesCTA from '@/components/lectures/LecturesCTA';
import { createClient } from '@/utils/supabase/server';

export default async function PortfolioPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <PortfolioHero />
                <PortfolioBentoGrid items={projects || []} />
                <PortfolioCaseStudies items={caseStudies || []} />
                <PortfolioStatement />
                <PortfolioProcess />
                <LecturesCTA />
                <FooterSection />
            </div>

        </>
    );
}
