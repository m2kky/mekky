import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogNewsletter from '@/components/blog/BlogNewsletter';

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                <BlogHero />
                <BlogGrid />
                <BlogNewsletter />
                <FooterSection />
            </div>
            <StickyCTA />
        </>
    );
}
