import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import PortfolioClient from './PortfolioClient';

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <PortfolioClient />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
