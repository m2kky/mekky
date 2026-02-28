import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MotivationSection from '@/components/MotivationSection';
import FooterSection from '@/components/FooterSection';
import PortfolioCaseStudies from '@/components/portfolio/PortfolioCaseStudies';
import ImpactTransitionSection from '@/components/ui/ImpactTransitionSection';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <Preloader />
      <Navbar />
      <div className="page-wrapper">
        <HeroSection />
        <AboutSection />
        <MotivationSection />
        <ServicesSection />

        <ProjectsSection items={projects || []} />

        <ImpactTransitionSection
          id="overwhelmed"
          blurredPart="OVERW"
          sharpPart="HELM"
          questions={[
            "ARE YOUR MARKETING TOOLS TALKING TO EACH OTHER?",
            "DO YOU FEEL THERE'S A CEILING TO YOUR GROWTH?",
            "ARE YOU RELYING ON SHEER HUMAN EFFORT?",
            "WHAT HAPPENS IF YOU STEP AWAY FOR A WEEK?",
            "ARE YOU READY TO TAKE TRUE CONTROL?"
          ]}
        />

        <PortfolioCaseStudies items={caseStudies || []} />

        <TestimonialsSection />
        <StatsSection />

        <FooterSection />
      </div>
    </>
  );
}
