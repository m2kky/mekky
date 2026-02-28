import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LecturesSection from '@/components/LecturesSection';
import MotivationSection from '@/components/MotivationSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <div className="page-wrapper">
        <HeroSection />
        <AboutSection />
        <MotivationSection />
        <ServicesSection />
        <StatsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <LecturesSection />
        <FooterSection />
      </div>
    </>
  );
}
