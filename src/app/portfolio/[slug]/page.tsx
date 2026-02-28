import { createClient } from '@/utils/supabase/server';
import ProjectClient from './ProjectClient';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .eq('published', true)
        .single();

    if (!project) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>
                        Project Not Found
                    </h1>
                </div>
                <FooterSection />
            </>
        );
    }

    return <ProjectClient project={project} />;
}
