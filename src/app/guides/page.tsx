import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import GuidesGrid from '@/components/guides/GuidesGrid';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = { 
    title: "Technical Guides | Muhammed Mekky", 
    description: "Deep dive technical documentation, automation blueprints, and step-by-step scaling guides.",
};

export default async function GuidesPage() {
    const supabase = await createClient();
    const { data: guides } = await supabase
        .from('guides')
        .select('*')
        .eq('published', true)
        .order('publish_date', { ascending: false });

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, backgroundColor: '#050505' }}>
                <div style={{ paddingTop: '18vh', paddingBottom: '8vh', textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%' }}>
                    <h1 style={{ color: '#fff', fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1rem 0', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1 }}>
                        System Docs &amp; Blueprints
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', marginTop: '1rem', lineHeight: 1.6 }}>
                        Explore technical architectures, workflow automation blueprints, and step-by-step guides to scale your business operations.
                    </p>
                </div>
                <GuidesGrid items={guides || []} />
            </div>
            <FooterSection />
        </>
    );
}
