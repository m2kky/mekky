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
        const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (!res.ok) return null;
        const buf = await res.arrayBuffer();
        const b64 = Buffer.from(buf).toString('base64');
        const ct = res.headers.get('content-type') || 'image/png';
        return `data:${ct};base64,${b64}`;
    } catch (err) {
        console.error('fetchImageAsBase64 failed:', err);
        return null;
    }
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

        const headers = {
            'Content-Type': 'application/json',
            apikey: EVOLUTION_API_KEY,
        };
        const evoUrl = EVOLUTION_API_URL;
        const evoInstance = EVOLUTION_INSTANCE_NAME;

        const imageCaption = `Hello ${name} 👋

🎉 You're officially registered for *${WORKSHOP_TITLE}*!

📅 ${WORKSHOP_DATE}
🕖 ${WORKSHOP_TIME}
💻 ${WORKSHOP_MODE}

Share this poster on your social media and let everyone know you're attending! 🚀

Register here: https://muhammedmekky.com/workshop

#Shopify #Ecommerce #WebDesign`;

        // Get the generated poster image as base64
        let base64Media: string | null = null;
        let imageSource = '';

        if (posterUrl && posterUrl.startsWith('http')) {
            console.log('Fetching generated OG poster URL:', posterUrl);
            base64Media = await fetchImageAsBase64(posterUrl);
            if (base64Media) imageSource = 'og_poster';
        }

        // 3. Send image if we have it
        if (base64Media) {
            const mediaEndpoint = `${evoUrl}/message/sendMedia/${evoInstance}`;
            const mediaPayload = {
                number: formattedPhone,
                mediaMessage: {
                    mediatype: 'image',
                    fileName: 'workshop_ticket.png',
                    caption: imageCaption,
                    media: base64Media,
                },
            };

            const mediaRes = await fetch(mediaEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(mediaPayload),
            });

            const mediaResult = await mediaRes.json();
            console.log(`Evolution Media delivery (${imageSource}):`, JSON.stringify(mediaResult).slice(0, 300));

            if (mediaRes.ok) {
                return NextResponse.json({
                    success: true,
                    method: `image_${imageSource}`,
                });
            }
            console.error('Media send failed, falling back to text');
        }

        // 4. Text-only fallback if all image attempts fail
        console.log('All image attempts failed, sending text-only fallback');
        const textEndpoint = `${evoUrl}/message/sendText/${evoInstance}`;

        const textRes = await fetch(textEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                number: formattedPhone,
                text: imageCaption,
            }),
        });

        const textResult = await textRes.json();
        console.log('Evolution Text delivery result:', JSON.stringify(textResult).slice(0, 300));

        return NextResponse.json({
            success: textRes.ok,
            method: 'text_fallback',
            data: textResult,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('WhatsApp poster send failed:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
