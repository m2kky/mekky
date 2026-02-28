import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import TestimonialsHero from '@/components/testimonials/TestimonialsHero';
import TestimonialsGrid from '@/components/testimonials/TestimonialsGrid';
import TestimonialsStatement from '@/components/testimonials/TestimonialsStatement';

export default function TestimonialsPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <TestimonialsHero />
                <TestimonialsGrid />
                <TestimonialsStatement />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
