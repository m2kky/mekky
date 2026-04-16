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

        // Poster background — must be absolute URL for Edge runtime
        const origin = new URL(request.url).origin;
        const backgroundUrl = `${origin}/poster.png`;

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
                        src={backgroundUrl}
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
                        {photoUrl ? (
                            <img
                                src={photoUrl}
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
                            <div
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '80px',
                                    display: 'flex',
                                }}
                            >
                                👤
                            </div>
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
