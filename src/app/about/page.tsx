import Navbar from '@/components/Navbar';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutManifestoSection from '@/components/about/AboutManifestoSection';
import AboutStorySection from '@/components/about/AboutStorySection';
import AboutPhilosophySection from '@/components/about/AboutPhilosophySection';
import AboutTimelineSection from '@/components/about/AboutTimelineSection';
import AboutCorneredSection from '@/components/about/AboutCorneredSection';
import AboutKeywordsSection from '@/components/about/AboutKeywordsSection';
import AboutOnePercentSection from '@/components/about/AboutOnePercentSection';
import AboutContactSection from '@/components/about/AboutContactSection';
import FooterSection from '@/components/FooterSection';

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <div className="page-wrapper">
                <AboutHeroSection />
                <AboutManifestoSection />
                <AboutStorySection />
                <AboutPhilosophySection />
                <AboutTimelineSection />
                <AboutCorneredSection />
                <AboutKeywordsSection />
                <AboutOnePercentSection />
                <AboutContactSection />
            </div>
            <FooterSection />
        </main>
    );
}
