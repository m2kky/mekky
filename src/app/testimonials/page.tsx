import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import TestimonialsHero from '@/components/testimonials/TestimonialsHero';
import TestimonialsMarquee from '@/components/testimonials/TestimonialsMarquee';
import TestimonialsStatement from '@/components/testimonials/TestimonialsStatement';
import TestimonialsStats from '@/components/testimonials/TestimonialsStats';
import TestimonialsLogos from '@/components/testimonials/TestimonialsLogos';

export default function TestimonialsPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <TestimonialsHero />
                <TestimonialsMarquee />
                <TestimonialsStats />
                <TestimonialsStatement />
                <TestimonialsLogos />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
