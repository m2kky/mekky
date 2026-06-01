import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import InteractiveServicesList from '@/components/services/InteractiveServicesList';
import { SERVICES } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { 
    title: "Services | Muhammed Mekky", 
    description: "I help teams design scalable systems and growth engines through AI, Automation, and Digital Strategy.",
};

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, paddingTop: '15vh' }}>
                <div style={{ padding: '0 5%', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
                        {SERVICES.title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, marginTop: '1rem', maxWidth: '600px' }}>
                        {SERVICES.subtitle}
                    </p>
                </div>

                <InteractiveServicesList services={SERVICES.items} />

                <div style={{ padding: '5%', textAlign: 'center', margin: '4rem 0' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready to scale your systems?</h2>
                    <Link href="/book" className="primary-btn" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: 'var(--primary-color, #fff)', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Book a Consultation
                    </Link>
                </div>
            </div>
            <FooterSection />
        </>
    );
}
