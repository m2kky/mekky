import { NextResponse } from 'next/server';

const EVOLUTION_API_URL =
    process.env.EVOLUTION_API_URL || 'http://evo-sgwcco4kw80sckwg4c08sgk4.72.62.50.238.sslip.io';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || 'mekky';

const WORKSHOP_TITLE = 'Shopify kick start: How to build Shopify stores';
const WORKSHOP_DATE = 'Tuesday, April 21, 2026';
const WORKSHOP_TIME = '09:00 PM Cairo Time';
const WORKSHOP_MODE = 'Live Online on Google Meet';

function formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '20' + cleaned.substring(1);
    }
    if (!cleaned.startsWith('20') && cleaned.length === 10) {
        cleaned = '20' + cleaned;
    }
    return cleaned;
}

async function fetchImageAsBase64(url: string): Promise<string | null> {
    try {
        console.log('Fetching image:', url.slice(0, 120));
        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
        if (!res.ok) {
            console.error('Image fetch failed:', res.status, res.statusText);
            return null;
        }
        const buf = await res.arrayBuffer();
        if (buf.byteLength < 100) {
            console.error('Image too small, likely invalid:', buf.byteLength);
            return null;
        }
        const b64 = Buffer.from(buf).toString('base64');
        const ct = res.headers.get('content-type') || 'image/png';
        console.log('Image fetched OK:', buf.byteLength, 'bytes, type:', ct);
        return `data:${ct};base64,${b64}`;
    } catch (err) {
        console.error('fetchImageAsBase64 error:', err);
        return null;
    }
}

// One combined message: confirmation + sharing CTA + registration link
function buildCaption(name: string): string {
    return `Hello ${name} 👋

🎉 You're officially registered for *${WORKSHOP_TITLE}*!

📅 ${WORKSHOP_DATE}
🕖 ${WORKSHOP_TIME}
💻 ${WORKSHOP_MODE}

Share this poster on your social media and let everyone know you're attending! 🚀

I am attending ${WORKSHOP_TITLE} (100% FREE) on 21 April 2026 at 09:00 PM. If you want to learn how to build high converting Shopify stores step by step over 4 hours, join us: https://muhammedmekky.com/workshop

#Shopify #Ecommerce #WebDesign`;
}

export async function GET(request: Request) {
    try {
        if (!EVOLUTION_API_KEY) {
            return NextResponse.json({ error: 'WhatsApp API key not configured' }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name')?.trim();
        const phone = searchParams.get('phone')?.trim();
        const posterUrl = searchParams.get('posterUrl')?.trim();
        const photoUrl = searchParams.get('photoUrl')?.trim();

        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Missing required parameters: name, phone' },
                { status: 400 }
            );
        }

        const formattedPhone = formatPhoneNumber(phone);
        const caption = buildCaption(name);

        const headers = {
            'Content-Type': 'application/json',
            apikey: EVOLUTION_API_KEY,
        };
        const evoUrl = EVOLUTION_API_URL;
        const evoInstance = EVOLUTION_INSTANCE_NAME;

        // Try to get an image to send with the message
        let base64Media: string | null = null;

        // 1. Try OG poster (the personalized poster with photo + template)
        if (!base64Media && posterUrl && posterUrl.startsWith('http')) {
            base64Media = await fetchImageAsBase64(posterUrl);
            if (base64Media) console.log('Using OG poster image');
        }

        // 2. Fallback: try direct photo from Supabase storage
        if (!base64Media && photoUrl && photoUrl.startsWith('http')) {
            base64Media = await fetchImageAsBase64(photoUrl);
            if (base64Media) console.log('Using direct photo from storage');
        }

        // Send ONE message: image with caption (or text-only fallback)
        if (base64Media) {
            const mediaEndpoint = `${evoUrl}/message/sendMedia/${evoInstance}`;
            const mediaPayload = {
                number: formattedPhone,
                mediaMessage: {
                    mediatype: 'image',
                    fileName: 'workshop_ticket.png',
                    caption: caption,
                    media: base64Media,
                },
            };

            const mediaRes = await fetch(mediaEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(mediaPayload),
            });

            const mediaResult = await mediaRes.json();
            console.log('Evolution Media result:', JSON.stringify(mediaResult).slice(0, 400));

            return NextResponse.json({
                success: mediaRes.ok,
                method: 'image_with_caption',
                data: mediaResult,
            });
        }

        // Text-only fallback (no image available)
        console.log('No image available, sending text-only');
        const textEndpoint = `${evoUrl}/message/sendText/${evoInstance}`;
        const textRes = await fetch(textEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                number: formattedPhone,
                text: caption,
            }),
        });

        const textResult = await textRes.json();
        console.log('Evolution Text result:', JSON.stringify(textResult).slice(0, 400));

        return NextResponse.json({
            success: textRes.ok,
            method: 'text_only',
            data: textResult,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('WhatsApp send failed:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
