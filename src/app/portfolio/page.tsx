import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioBentoGrid from '@/components/portfolio/PortfolioBentoGrid';
import PortfolioCaseStudies from '@/components/portfolio/PortfolioCaseStudies';
import PortfolioStatement from '@/components/portfolio/PortfolioStatement';
import PortfolioProcess from '@/components/portfolio/PortfolioProcess';
import LecturesCTA from '@/components/lectures/LecturesCTA';
import { PROJECTS, CASE_STUDIES } from '@/lib/constants';

export const metadata = { title: "Portfolio | Muhammed Mekky", description: "Explore the marketing automation, web design, and AI-driven projects built by Muhammed Mekky." };

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <PortfolioHero />
                <PortfolioBentoGrid items={PROJECTS.items} />
                <PortfolioStatement />
                <PortfolioCaseStudies items={CASE_STUDIES.items} />
                <PortfolioProcess />
                <LecturesCTA />
                <FooterSection />
            </div>
        </>
    );
}
