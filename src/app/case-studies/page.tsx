import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';

export default function CaseStudiesPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <CaseStudiesHero />
                <CaseStudiesList />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
