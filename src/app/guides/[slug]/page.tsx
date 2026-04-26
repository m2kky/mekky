import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import GuideContent from './GuideContent';

export async function generateStaticParams() {
    const guidesDirectory = path.join(process.cwd(), 'src/content/guides');
    
    try {
        const filenames = fs.readdirSync(guidesDirectory);
        return filenames
            .filter((filename) => filename.endsWith('.md'))
            .map((filename) => ({
                slug: filename.replace('.md', ''),
            }));
    } catch (error) {
        return [];
    }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Validate slug to prevent path traversal
    if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
        notFound();
    }

    const fullPath = path.join(process.cwd(), 'src/content/guides', `${slug}.md`);

    let fileContents;
    try {
        fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
        notFound();
    }

    // A simple parser to extract the title from the first H1 if available
    const firstLineMatch = fileContents.match(/^#\s+(.*)/m);
    const title = firstLineMatch ? firstLineMatch[1] : 'Technical Guide';

    // Remove the title from the content so we can render it beautifully outside the raw markdown if needed
    // However, keeping it in the markdown is usually fine, or we can handle it inside GuideContent.
    return (
        <>
            <Navbar />
            <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '100px' }}>
                <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <a href="/case-studies/automated-marketing-audit" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 0.8 }}>
                            ← Back to Case Study
                        </a>
                    </div>
                    <GuideContent content={fileContents} />
                </main>
                <FooterSection />
            </div>
        </>
    );
}
