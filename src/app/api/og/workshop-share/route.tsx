import { ImageResponse } from '@vercel/og';
/* eslint-disable @next/next/no-img-element */

export const runtime = 'edge';

const FALLBACK_NAME = 'Workshop Guest';
const FALLBACK_TITLE = 'Media Buyer';

function cleanText(input: string | null, fallback: string, maxLength = 80) {
    if (!input) return fallback;
    const value = input.trim();
    if (!value) return fallback;
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 3)}...`;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const fullName = cleanText(searchParams.get('name'), FALLBACK_NAME, 36);
        const title = cleanText(searchParams.get('title'), FALLBACK_TITLE, 42);
        const company = cleanText(searchParams.get('company'), '', 42);
        const photoUrl = searchParams.get('photo')?.trim() || '';

        // Fetch background image over HTTP (using the request origin)
        const origin = new URL(request.url).origin;
        const posterUrl = `${origin}/poster.png`;
        const posterRes = await fetch(posterUrl);
        const posterContentType = posterRes.headers.get('content-type') || '';
        
        if (!posterRes.ok || !posterContentType.includes('image/')) {
            throw new Error(`Failed to load valid poster image from ${posterUrl}, got content-type: ${posterContentType}`);
        }
        
        const posterBuffer = await posterRes.arrayBuffer();
        const base64Poster = Buffer.from(posterBuffer).toString('base64');
        const backgroundSrc = `data:${posterContentType || 'image/png'};base64,${base64Poster}`;

        // Fetch user photo and convert to base64 to avoid @vercel/og remote fetching issues
        let photoSrc = '';
        if (photoUrl && photoUrl.startsWith('http')) {
            try {
                const pRes = await fetch(photoUrl);
                if (pRes.ok) {
                    const contentType = pRes.headers.get('content-type') || '';
                    // Satori (used by next/og) only supports PNG/JPEG/SVG. WEBP/AVIF will crash it with "Offset is outside the bounds of the DataView".
                    if (contentType.includes('webp') || contentType.includes('avif')) {
                        console.warn('Unsupported image format for OG (Satori):', contentType);
                        photoSrc = ''; // Fallback to placeholder
                    } else {
                        const pBuf = await pRes.arrayBuffer();
                        const b64Photo = Buffer.from(pBuf).toString('base64');
                        photoSrc = `data:${contentType || 'image/png'};base64,${b64Photo}`;
                    }
                }
            } catch (err) {
                console.error('Failed to fetch user photo for OG', err);
            }
        }

        // Circle positioning — matches the poster template design
        // Circle center is approximately at x=780, y=440 with radius ~226px (453px diameter)
        const circleX = 780;
        const circleY = 440;
        const circleSize = 453;

        const nameY = circleY + circleSize / 2 + 30; // ~696
        const titleY = nameY + 50;
        const companyY = titleY + 40;

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '1080px',
                        height: '1080px',
                        display: 'flex',
                        position: 'relative',
                        overflow: 'hidden',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    {/* Background poster template */}
                    <img
                        src={backgroundSrc}
                        alt="Background"
                        width={1080}
                        height={1080}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '1080px',
                            height: '1080px',
                            objectFit: 'cover',
                        }}
                    />

                    {/* User photo — clipped to circle, overlaying the dark navy circle */}
                    <div
                        style={{
                            position: 'absolute',
                            left: `${circleX - circleSize / 2}px`,
                            top: `${circleY - circleSize / 2}px`,
                            width: `${circleSize}px`,
                            height: `${circleSize}px`,
                            borderRadius: '999px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#1e3a5f',
                        }}
                    >
                        {photoSrc ? (
                            <img
                                src={photoSrc}
                                alt="Attendee"
                                width={453}
                                height={453}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <svg 
                                width="180" 
                                height="180" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#94a3b8" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                style={{ display: 'flex' }}
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        )}
                    </div>

                    {/* Attendee name — below the circle */}
                    <div
                        style={{
                            position: 'absolute',
                            left: `${circleX - circleSize / 2 - 20}px`,
                            top: `${nameY}px`,
                            width: `${circleSize + 40}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: '#1e293b',
                            fontSize: '36px',
                            fontWeight: 800,
                            lineHeight: 1.1,
                        }}
                    >
                        {fullName}
                    </div>

                    {/* Job title — below name */}
                    <div
                        style={{
                            position: 'absolute',
                            left: `${circleX - circleSize / 2 - 20}px`,
                            top: `${titleY}px`,
                            width: `${circleSize + 40}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: '#ea580c',
                            fontSize: '26px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </div>

                    {/* Company — below title */}
                    {company && (
                        <div
                            style={{
                                position: 'absolute',
                                left: `${circleX - circleSize / 2 - 20}px`,
                                top: `${companyY}px`,
                                width: `${circleSize + 40}px`,
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: '#64748b',
                                fontSize: '20px',
                                fontWeight: 500,
                                lineHeight: 1.2,
                            }}
                        >
                            {company}
                        </div>
                    )}
                </div>
            ),
            {
                width: 1080,
                height: 1080,
            }
        );
    } catch (error) {
        console.error('Failed to render workshop share poster:', error);
        return new Response('Poster generation failed', { status: 500 });
    }
}
