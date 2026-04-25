'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';

type Registration = {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    job_title: string;
    company: string;
    headline: string;
    photo_url: string | null;
    poster_url: string | null;
    caption: string | null;
    source: string;
    created_at: string;
};

interface TicketClientPageProps {
    data: Registration;
    pageUrl: string;
}

const COURSE_TITLE = 'The Shopify Architect';
const COURSE_MODE = 'Paid Enrollment';

export default function TicketClientPage({ data, pageUrl }: TicketClientPageProps) {
    const [copied, setCopied] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [sharingNative, setSharingNative] = useState(false);

    const posterUrl = data.poster_url || '';
    const workshopUrl = useMemo(() => {
        try {
            return new URL('/workshop', pageUrl).toString();
        } catch {
            return 'https://muhammedmekky.com/workshop';
        }
    }, [pageUrl]);

    const shareText =
        data.caption ||
        `I just enrolled in ${COURSE_TITLE}. Build a data-driven Shopify ecosystem with AI and automation: ${workshopUrl}`;

    const handleCopyText = () => {
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer,width=700,height=700');
    };

    const handleShareLinkedIn = () => {
        openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`);
    };

    const handleShareFacebook = () => {
        openShare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`
        );
    };

    const handleShareTwitter = () => {
        openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`);
    };

    const handleShareWhatsApp = () => {
        openShare(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${pageUrl}`)}`);
    };

    const handleNativeShare = async () => {
        if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
            alert('Native sharing is not supported on this device.');
            return;
        }

        setSharingNative(true);
        try {
            const sharePayload: ShareData = {
                title: COURSE_TITLE,
                text: shareText,
                url: pageUrl,
            };

            if (posterUrl && typeof navigator.canShare === 'function') {
                const posterResponse = await fetch(posterUrl);
                if (posterResponse.ok) {
                    const posterBlob = await posterResponse.blob();
                    const posterFile = new File([posterBlob], 'shopify-architect-card.png', { type: 'image/png' });
                    if (navigator.canShare({ files: [posterFile] })) {
                        sharePayload.files = [posterFile];
                    }
                }
            }

            await navigator.share(sharePayload);
        } catch (error) {
            // Ignore user-cancelled share sheets and log unexpected failures.
            if (error instanceof Error && error.name !== 'AbortError') {
                console.error('Native sharing failed:', error);
            }
        } finally {
            setSharingNative(false);
        }
    };

    const handleDownloadPoster = async () => {
        if (!posterUrl) return;

        setDownloading(true);
        try {
            const response = await fetch(posterUrl);
            if (!response.ok) throw new Error('Could not fetch poster image');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const safeName = data.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'student';
            a.download = `shopify-architect-${safeName}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Poster download failed:', error);
            alert('Could not download poster image. Please open it directly and save it.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <main
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(165deg, #050504 0%, #0e0c08 45%, #17120a 100%)',
                color: '#fff4d6',
                fontFamily: 'system-ui, sans-serif',
                padding: '2rem 1rem',
            }}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
                    <h1 style={{ fontSize: '2.2rem', margin: 0, color: '#ffd16a' }}>Payment Confirmed</h1>
                    <p style={{ color: '#d8c79f', marginTop: '0.7rem' }}>
                        Welcome to <strong>{COURSE_TITLE}</strong>. Your personalized share card is ready.
                    </p>
                </div>

                <section
                    style={{
                        background: 'rgba(23, 18, 10, 0.9)',
                        border: '1px solid rgba(255, 214, 120, 0.25)',
                        borderRadius: '14px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    <h2 style={{ marginTop: 0 }}>Your Enrollment Card</h2>

                    <div
                        style={{
                            width: '100%',
                            maxWidth: '520px',
                            margin: '0 auto 1rem',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 214, 120, 0.35)',
                            background: '#0b0905',
                            aspectRatio: '1',
                            position: 'relative',
                        }}
                    >
                        {imageLoading ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d9c49a',
                                    zIndex: 2,
                                }}
                            >
                                Loading poster...
                            </div>
                        ) : null}

                        {imageError ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffb9a0',
                                    zIndex: 2,
                                }}
                            >
                                Could not load poster image.
                            </div>
                        ) : null}

                        {posterUrl ? (
                            <img
                                src={posterUrl}
                                alt="Enrollment poster"
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageLoading(false);
                                    setImageError(true);
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: imageLoading || imageError ? 0 : 1,
                                }}
                            />
                        ) : null}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Caption</label>
                        <textarea
                            readOnly
                            value={shareText}
                            style={{
                                width: '100%',
                                minHeight: '110px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 214, 120, 0.24)',
                                background: 'rgba(0, 0, 0, 0.3)',
                                color: '#f4ead3',
                                padding: '0.7rem',
                                resize: 'none',
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: '0.65rem', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
                        <button
                            onClick={handleCopyText}
                            style={{
                                minHeight: '44px',
                                border: '1px solid rgba(255, 214, 120, 0.3)',
                                borderRadius: '8px',
                                background: 'rgba(255, 214, 120, 0.08)',
                                color: '#ffe6b2',
                                cursor: 'pointer',
                                fontWeight: 600,
                            }}
                        >
                            {copied ? 'Caption copied' : 'Copy caption'}
                        </button>

                        <button
                            onClick={handleDownloadPoster}
                            disabled={!posterUrl || downloading}
                            style={{
                                minHeight: '44px',
                                border: 'none',
                                borderRadius: '8px',
                                background: 'linear-gradient(90deg, #ffd056, #f2a80f)',
                                color: '#261700',
                                cursor: !posterUrl || downloading ? 'not-allowed' : 'pointer',
                                fontWeight: 700,
                                opacity: !posterUrl || downloading ? 0.6 : 1,
                            }}
                        >
                            {downloading ? 'Downloading...' : 'Download poster'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '0.65rem', marginTop: '0.8rem', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
                        <button onClick={handleShareLinkedIn} style={shareButtonStyle}>Share on LinkedIn</button>
                        <button onClick={handleShareFacebook} style={shareButtonStyle}>Share on Facebook</button>
                        <button onClick={handleShareTwitter} style={shareButtonStyle}>Share on X</button>
                        <button onClick={handleShareWhatsApp} style={shareButtonStyle}>Share on WhatsApp</button>
                        <button onClick={handleNativeShare} disabled={sharingNative} style={shareButtonStyle}>
                            {sharingNative ? 'Opening share sheet...' : 'Share via apps'}
                        </button>
                    </div>
                </section>

                <section
                    style={{
                        background: 'rgba(23, 18, 10, 0.9)',
                        border: '1px solid rgba(255, 214, 120, 0.25)',
                        borderRadius: '14px',
                        padding: '1.2rem',
                        marginBottom: '1.4rem',
                    }}
                >
                    <h2 style={{ marginTop: 0 }}>Enrollment Details</h2>
                    <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
                        <div>
                            <p style={labelStyle}>Name</p>
                            <p style={valueStyle}>{data.full_name}</p>
                        </div>
                        <div>
                            <p style={labelStyle}>Role</p>
                            <p style={valueStyle}>{data.job_title || 'Program Participant'}</p>
                        </div>
                        <div>
                            <p style={labelStyle}>Company</p>
                            <p style={valueStyle}>{data.company || 'N/A'}</p>
                        </div>
                        <div>
                            <p style={labelStyle}>Status</p>
                            <p style={valueStyle}>{COURSE_MODE}</p>
                        </div>
                    </div>
                </section>

                <div style={{ textAlign: 'center' }}>
                    <Link href="/workshop" style={{ color: '#ffd16a', textDecoration: 'none', fontWeight: 600 }}>
                        Back to course page
                    </Link>
                </div>
            </div>
        </main>
    );
}

const labelStyle: CSSProperties = {
    margin: 0,
    color: '#d3be8e',
    fontSize: '0.85rem',
};

const valueStyle: CSSProperties = {
    margin: '0.25rem 0 0',
    color: '#fff5de',
    fontWeight: 600,
};

const shareButtonStyle: CSSProperties = {
    minHeight: '42px',
    border: '1px solid rgba(255, 214, 120, 0.3)',
    borderRadius: '8px',
    background: 'rgba(255, 214, 120, 0.08)',
    color: '#ffe6b2',
    cursor: 'pointer',
    fontWeight: 600,
};
