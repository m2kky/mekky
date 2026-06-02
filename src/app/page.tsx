import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MotivationSection from '@/components/MotivationSection';
import BlueprintSection from '@/components/BlueprintSection';
import CaseStudyTeaser from '@/components/CaseStudyTeaser';
import FooterSection from '@/components/FooterSection';
import StickyCTA from '@/components/StickyCTA';
import ImpactTransitionSection from '@/components/ui/ImpactTransitionSection';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://muhammedmekky.com/#person",
              "name": "Muhammed Mekky",
              "url": "https://muhammedmekky.com",
              "image": "https://muhammedmekky.com/images/og-preview.png",
              "description": "AI-driven marketing and business automation strategist building scalable systems using artificial intelligence, automation workflows, and performance marketing strategies.",
              "jobTitle": "AI Marketing & Business Automation Strategist",
              "hasOccupation": {
                "@type": "Occupation",
                "name": "AI Marketing Systems Architect",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "Egypt"
                }
              },
              "sameAs": [
                "https://www.linkedin.com/in/muhammedmekky",
                "https://github.com/m2kky"
              ],
              "knowsAbout": [
                "Artificial Intelligence", "Marketing Automation", "Business Systems Design",
                "Performance Marketing", "Workflow Automation", "Lead Generation Systems", "Conversion Optimization", "AI Agents"
              ],
              "areaServed": [
                { "@type": "Country", "name": "Egypt" },
                { "@type": "Place", "name": "MENA Region" },
                { "@type": "Place", "name": "Global" }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Independent AI & Automation Consultant"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Muhammed Mekky - Consulting",
              "url": "https://muhammedmekky.com",
              "logo": "https://muhammedmekky.com/images/og-preview.png",
              "sameAs": [
                "https://www.linkedin.com/in/muhammedmekky"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://muhammedmekky.com",
              "name": "Muhammed Mekky",
              "description": "AI-driven marketing and business automation strategist building scalable systems.",
              "dateModified": new Date().toISOString()
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I offer AI & Automation, Digital Marketing, Web Design & Development, and Training & Workshops to help businesses build smarter systems."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can marketing automation help my agency?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Automation can reduce administrative tasks by 40%. By integrating tools like n8n and ChatGPT, you can automate reporting, campaign analysis, and client management."
                  }
                }
              ]
            }
          ])
        }}
      />
      <Preloader />
      <Navbar />
      <div className="page-wrapper">
        <HeroSection />
        <AboutSection />
        <MotivationSection />
        <ServicesSection />
        <BlueprintSection />
        <StatsSection />
        <CaseStudyTeaser />

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

        <TestimonialsSection />
        <FooterSection />
      </div>
      <StickyCTA />
    </>
  );
}
