import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import LecturesHero from '@/components/lectures/LecturesHero';
import LecturesList from '@/components/lectures/LecturesList';
import LecturesImpact from '@/components/lectures/LecturesImpact';

export default function LecturesPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <LecturesHero />
                <LecturesList />
                <LecturesImpact />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
