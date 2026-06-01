import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The 3-Layer System Methodology | AI & Automation Architecture',
    description: 'Discover the proprietary 3-Layer Systems Architecture (Intelligence, Execution, Growth) used by Muhammed Mekky to build scalable, AI-driven business ecosystems.',
};

export default function MethodologyPage() {
    return (
        <main>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, paddingTop: '15vh', backgroundColor: '#050505', color: '#fff' }}>
                <div style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {/* Header */}
                    <div style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, color: '#FF3C00' }}>
                            THE SYSTEMS ARCHITECTURE
                        </span>
                        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', textTransform: 'uppercase', lineHeight: 1.1, margin: 0, letterSpacing: '-1.5px', fontWeight: 800 }}>
                            How I Build Ecosystems<br/>That Scale.
                        </h1>
                        <p style={{ fontSize: '1.5rem', opacity: 0.7, maxWidth: '800px', margin: '0 auto', lineHeight: 1.5, fontWeight: 300 }}>
                            Traditional marketing focuses on isolated campaigns. I operate as an AI Marketing & Business Automation Systems Architect, building self-sustaining ecosystems based on three core layers.
                        </p>
                    </div>

                    {/* The 3 Layers */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '8rem' }}>
                        
                        {/* Layer 1: Intelligence */}
                        <div style={{ background: '#111', padding: '4rem', borderRadius: '8px', borderLeft: '4px solid #FF3C00' }}>
                            <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', opacity: 0.5, marginBottom: '1rem', display: 'block' }}>01. THE FOUNDATION</span>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Intelligence Layer (AI & Data)</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                                Before we automate or market, we must understand. The Intelligence Layer integrates custom AI models, LLMs, and predictive analytics to turn raw data into strategic insights. It enables businesses to make proactive decisions rather than reactive guesses.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Custom LLM Integration</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Predictive Analytics</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Autonomous Data Agents</li>
                            </ul>
                        </div>

                        {/* Layer 2: Execution */}
                        <div style={{ background: '#111', padding: '4rem', borderRadius: '8px', borderLeft: '4px solid #FF3C00' }}>
                            <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', opacity: 0.5, marginBottom: '1rem', display: 'block' }}>02. THE ENGINE</span>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Execution Layer (Automation)</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                                Manual processes are the bottleneck of scaling. In the Execution Layer, we build robust API pipelines using tools like n8n and Make. This layer ensures leads are processed, emails are sent, and data is synced across your entire SaaS stack automatically.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> n8n & Make Workflows</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> CRM Auto-Sync</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Lead Qualification Pipelines</li>
                            </ul>
                        </div>

                        {/* Layer 3: Growth */}
                        <div style={{ background: '#111', padding: '4rem', borderRadius: '8px', borderLeft: '4px solid #FF3C00' }}>
                            <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', opacity: 0.5, marginBottom: '1rem', display: 'block' }}>03. THE ACCELERATOR</span>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Growth Layer (Performance)</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                                With intelligence and automation in place, we scale. The Growth Layer focuses on driving high-intent traffic and maximizing conversion rates through performance marketing, A/B tested landing pages, and automated community building.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Conversion Rate Optimization</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Performance Marketing Scaling</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: '#FF3C00' }}>✓</span> Automated Retargeting</li>
                            </ul>
                        </div>

                    </div>

                    {/* Proof & Action CTA */}
                    <div style={{ marginBottom: '6rem', padding: '5rem 3rem', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', fontWeight: 700 }}>See The System In Action</h2>
                        <p style={{ opacity: 0.7, fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            Explore how this exact 3-Layer Architecture has transformed businesses, or secure a consultation to build your own ecosystem.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link href="/case-studies" style={{ display: 'inline-block', padding: '1.2rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease' }}>
                                Explore Case Studies
                            </Link>
                            <Link href="/book" style={{ display: 'inline-block', padding: '1.2rem 3rem', background: '#fff', color: '#000', textDecoration: 'none', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease' }}>
                                Book Consultation
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <FooterSection />
        </main>
    );
}
