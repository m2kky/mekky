import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const service = SERVICES.items.find(s => s.slug === resolvedParams.slug);
    if (!service) return {};
    
    return {
        title: `${service.title} | Services | Muhammed Mekky`,
        description: service.description,
    };
}

export function generateStaticParams() {
    return SERVICES.items.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const service = SERVICES.items.find(s => s.slug === resolvedParams.slug) as any;

    if (!service) {
        notFound();
    }

    const SERVICE_TYPE_MAP: Record<string, string> = {
      'ai-solutions': 'AI Marketing Strategy & Systems',
      'business-automation': 'Business Process Automation',
      'digital-marketing': 'Paid Advertising & Growth Optimization',
      'web-design': 'Web Design & Development',
      'community-growth': 'Community Building & Management',
      'team-enablement': 'Operational Efficiency & Workflow Design',
      'corporate-training': 'Corporate Training & Education'
    };
    
    const serviceType = SERVICE_TYPE_MAP[service.slug] || service.title;
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://muhammedmekky.com/services/#${service.slug}`,
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Person",
            "@id": "https://muhammedmekky.com/#person",
            "name": "Muhammed Mekky"
        },
        "areaServed": {
            "@type": "Place",
            "name": "Global"
        },
        "serviceType": serviceType,
        "url": `https://muhammedmekky.com/services/${service.slug}`,
        "category": "Digital Marketing / AI / Automation"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, paddingTop: '15vh', backgroundColor: '#050505', color: '#fff' }}>
                <div style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {/* Header */}
                    <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link href="/services" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                            ← Back to Services
                        </Link>
                        <div 
                            style={{ width: '48px', height: '48px', color: '#fff', opacity: 0.8 }} 
                            dangerouslySetInnerHTML={{ __html: service.icon }} 
                        />
                        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', textTransform: 'uppercase', lineHeight: 1, margin: 0, letterSpacing: '-1.5px', fontWeight: 800 }}>
                            {service.title}
                        </h1>
                        <p style={{ fontSize: '1.5rem', opacity: 0.6, maxWidth: '800px', lineHeight: 1.4, fontWeight: 300 }}>
                            {service.description}
                        </p>
                    </div>

                    {/* Image Banner */}
                    <div style={{ width: '100%', height: '50vh', position: 'relative', overflow: 'hidden', borderRadius: '4px', marginBottom: '6rem' }}>
                        <img 
                            src={service.image} 
                            alt={service.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
                        />
                    </div>

                    {/* Content Architecture */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        
                        {/* Executive Summary / Long Description */}
                        <section style={{ maxWidth: '800px' }}>
                            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Executive Summary</span>
                            <p style={{ fontSize: '1.5rem', lineHeight: 1.6, fontWeight: 400 }}>
                                {service.longDescription}
                            </p>
                        </section>

                        {/* Two Column Grid for Features and Process */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                            
                            {/* Core Capabilities */}
                            {service.features && (
                                <div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>Core Capabilities</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {service.features.map((feature: string, idx: number) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', opacity: 0.8 }}>
                                                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-color, #fff)', borderRadius: '50%' }}></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Engagement Process */}
                            {service.process && (
                                <div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>Our Process</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {service.process.map((step: string, idx: number) => (
                                            <div key={idx} style={{ display: 'flex', gap: '1.5rem' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 800, opacity: 0.3, fontFamily: 'monospace' }}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div style={{ fontSize: '1.2rem', paddingTop: '0.2rem', opacity: 0.9 }}>
                                                    {step}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Corporate CTA */}
                    <div style={{ marginTop: '8rem', marginBottom: '4rem', padding: '5rem 3rem', background: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Ready to Scale?</h2>
                        <p style={{ opacity: 0.7, fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            As an AI Marketing & Business Automation Systems Architect, I partner with organizations to build scalable ecosystems, not just isolated campaigns. Secure a strategic consultation today, or explore our <Link href="/case-studies" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 'bold' }}>Case Studies</Link> to see the systems in action.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link href="/book" style={{ display: 'inline-block', padding: '1.2rem 3.5rem', background: '#fff', color: '#000', textDecoration: 'none', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1rem', transition: 'all 0.3s ease' }}>
                                Initiate Engagement
                            </Link>
                            <Link href="/case-studies" style={{ display: 'inline-block', padding: '1.2rem 3.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1rem', transition: 'all 0.3s ease' }}>
                                View Case Studies
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <FooterSection />
        </>
    );
}
