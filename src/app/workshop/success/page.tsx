'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

// Workshop constants (should match what's in WorkshopLandingClient.tsx)
const WORKSHOP_TITLE = 'Shopify kick start: How to build Shopify stores';
const WORKSHOP_SHORT_TITLE = 'Shopify kick start';
const WORKSHOP_SUBTITLE = 'How to build Shopify stores';
const WORKSHOP_DATE = 'Tuesday, April 21, 2026';
const WORKSHOP_TIME = '09:00 PM Cairo Time';
const WORKSHOP_MODE = 'Live Online on Google Meet';
const POSTER_TEMPLATE_ID = 'workshop-square-v1';

interface BookingData {
    name: string;
    title: string;
    company: string;
    photo: string;
}

export default function WorkshopSuccessPage() {
    const [bookingData, setBookingData] = useState<BookingData>({
        name: 'Guest',
        title: 'Media Buyer',
        company: '',
        photo: '',
    });

    const [copied, setCopied] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [pageUrl, setPageUrl] = useState('https://muhammedmekky.com/workshop');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.origin + '/workshop');
        }

        const data: BookingData = {
            name: (localStorage.getItem('workshop_name') || 'Guest').trim(),
            title: (localStorage.getItem('workshop_title') || 'Media Buyer').trim(),
            company: (localStorage.getItem('workshop_company') || '').trim(),
            photo: (localStorage.getItem('workshop_photo') || '').trim(),
        };
        setBookingData(data);
    }, []);

    const posterUrl = useMemo(() => {
        const params = new URLSearchParams();
        params.set('template', POSTER_TEMPLATE_ID);
        params.set('name', bookingData.name);
        params.set('title', bookingData.title);
        params.set('company', bookingData.company);
        params.set('headline', 'I am attending'); // Hardcoded as per updated logic
        params.set('date', WORKSHOP_DATE);
        params.set('time', WORKSHOP_TIME);
        params.set('mode', WORKSHOP_MODE);
        params.set('workshop', WORKSHOP_SHORT_TITLE);
        params.set('subtitle', WORKSHOP_SUBTITLE);
        if (bookingData.photo) {
            params.set('photo', bookingData.photo);
        }
        return `/api/og/workshop-share?${params.toString()}`;
    }, [bookingData]);

    const shareText = `I am attending ${WORKSHOP_TITLE} (100% FREE) on ${WORKSHOP_DATE} at ${WORKSHOP_TIME}. If you want to learn how to build high converting Shopify stores step by step over 4 hours, join us: ${pageUrl} #Shopify #Ecommerce #WebDesign`;

    const handleCopyText = () => {
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
    };

    const handleShareLinkedIn = () => {
        const shareUrl = pageUrl;
        openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
    };

    const handleShareFacebook = () => {
        const shareUrl = pageUrl;
        openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`);
    };

    const handleShareTwitter = () => {
        const tweetText = `${shareText}\n\n`;
        openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`);
    };

    const handleShareWhatsApp = () => {
        openShare(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + pageUrl)}`);
    };

    const handleDownloadPoster = async () => {
        setDownloading(true);
        try {
            const response = await fetch(posterUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const safeName = bookingData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'attendee';
            a.download = `workshop-${safeName}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fb923c' }}>
                        Booking Confirmed!
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                        We can&apos;t wait to see you inside. Check your email for details.
                    </p>
                </div>

                <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '2rem', border: '1px solid #334155', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>📢</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Share Your Attendance</h2>
                    </div>

                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '0.75rem', overflow: 'hidden', border: '2px solid #334155', marginBottom: '1.5rem', position: 'relative', background: '#0f172a' }}>
                        {imageLoading && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', border: '3px solid #334155', borderTopColor: '#fb923c', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                <p style={{ color: '#94a3b8' }}>Generating your personalized poster...</p>
                            </div>
                        )}
                        <img
                            src={posterUrl}
                            alt="Share Poster"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imageLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
                            onLoad={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>Caption Text</label>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                readOnly
                                value={shareText}
                                style={{ width: '100%', height: '120px', background: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', padding: '1rem', color: '#cbd5e1', fontSize: '0.875rem', resize: 'none' }}
                            />
                            <button
                                onClick={handleCopyText}
                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#3b82f6', color: '#fff', border: 'none', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                                {copied ? 'Copied!' : 'Copy Text'}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleDownloadPoster}
                        disabled={downloading || imageLoading}
                        style={{ width: '100%', padding: '1rem', background: '#fb923c', color: '#fff', fontWeight: 700, borderRadius: '0.5rem', border: 'none', cursor: (downloading || imageLoading) ? 'not-allowed' : 'pointer', opacity: (downloading || imageLoading) ? 0.7 : 1, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <span>📥</span> {downloading ? 'Downloading...' : 'Download Poster Image'}
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                        <button onClick={handleShareLinkedIn} style={{ background: '#0077b5', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            LinkedIn
                        </button>
                        <button onClick={handleShareFacebook} style={{ background: '#1877f2', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            Facebook
                        </button>
                        <button onClick={handleShareTwitter} style={{ background: '#000', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            Twitter (X)
                        </button>
                        <button onClick={handleShareWhatsApp} style={{ background: '#25d366', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            WhatsApp
                        </button>
                    </div>
                </div>

                <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '2rem', border: '1px solid #334155', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📅</span> Your Booking Details
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Name</p>
                            <p style={{ fontWeight: 600 }}>{bookingData.name}</p>
                            {bookingData.title && <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{bookingData.title}</p>}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Date & Time</p>
                            <p style={{ fontWeight: 600 }}>{WORKSHOP_DATE}</p>
                            <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{WORKSHOP_TIME}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Location</p>
                            <p style={{ fontWeight: 600 }}>{WORKSHOP_MODE}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.2)', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <p style={{ color: '#fb923c', fontWeight: 600, marginBottom: '0.25rem' }}>📧 Confirmation Sent!</p>
                        <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>Please check your inbox (and spam folder) for the event link.</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link href="/workshop" style={{ color: '#fb923c', textDecoration: 'none', fontWeight: 600 }}>
                        ← Back to Workshop Details
                    </Link>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}} />
            </div>
        </main>
    );
}
