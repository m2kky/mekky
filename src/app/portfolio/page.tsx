import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioBentoGrid from '@/components/portfolio/PortfolioBentoGrid';
import PortfolioCaseStudies from '@/components/portfolio/PortfolioCaseStudies';
import PortfolioStatement from '@/components/portfolio/PortfolioStatement';
import PortfolioProcess from '@/components/portfolio/PortfolioProcess';
import LecturesCTA from '@/components/lectures/LecturesCTA';

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <PortfolioHero />
                <PortfolioBentoGrid />
                <PortfolioCaseStudies />
                <PortfolioStatement />
                <PortfolioProcess />
                <LecturesCTA />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
