import { NextResponse } from 'next/server';

const EVOLUTION_API_URL =
    process.env.EVOLUTION_API_URL || 'http://evo-sgwcco4kw80sckwg4c08sgk4.72.62.50.238.sslip.io';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || 'mekky2';

const COURSE_TITLE = 'The Shopify Architect';
const COURSE_SUBTITLE = 'Data-Driven Ecommerce Ecosystem';
const COURSE_DATE = 'Limited seats available now';
const COURSE_TIME = 'Live online sessions + practical implementation';
const COURSE_MODE = '100% Free Enrollment';

function formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = `20${cleaned.substring(1)}`;
    }
    if (!cleaned.startsWith('20') && cleaned.length === 10) {
        cleaned = `20${cleaned}`;
    }
    return cleaned;
}

async function fetchImageAsBase64(url: string, includePrefix = false): Promise<string | null> {
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (!res.ok) return null;
        const buf = await res.arrayBuffer();
        const b64 = Buffer.from(buf).toString('base64');
        if (includePrefix) {
            const ct = res.headers.get('content-type') || 'image/png';
            return `data:${ct};base64,${b64}`;
        }
        return b64;
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

        if (!name || !phone) {
            return NextResponse.json({ error: 'Missing required parameters: name, phone' }, { status: 400 });
        }

        const formattedPhone = formatPhoneNumber(phone);

        const headers = {
            'Content-Type': 'application/json',
            apikey: EVOLUTION_API_KEY,
        };

        const caption = `Hello ${name} 👋\n\nYou are successfully registered for ${COURSE_TITLE}.\n\nProgram: ${COURSE_SUBTITLE}\nStatus: ${COURSE_MODE}\nStart: ${COURSE_DATE}\nFormat: ${COURSE_TIME}\n\nShare your personalized poster and announce your enrollment.\n\nApply link: https://muhammedmekky.com/workshop\n\n#Shopify #Ecommerce #Analytics #AI #Automation`;

        let base64Media: string | null = null;
        let imageSource = '';

        if (posterUrl && posterUrl.startsWith('http')) {
            base64Media = await fetchImageAsBase64(posterUrl, true);
            if (base64Media) imageSource = 'og_poster';
        }

        if (base64Media) {
            const mediaEndpoint = `${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE_NAME}`;
            const mediaPayload = {
                number: formattedPhone,
                mediatype: 'image',
                mimetype: 'image/png',
                fileName: 'shopify-architect-ticket.png',
                caption,
                media: base64Media,
            };

            const mediaRes = await fetch(mediaEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify(mediaPayload),
            });

            const mediaResultText = await mediaRes.text();
            let mediaResult;
            try {
                mediaResult = JSON.parse(mediaResultText);
            } catch {
                mediaResult = mediaResultText;
            }

            if (mediaRes.ok) {
                return NextResponse.json({
                    success: true,
                    method: `image_${imageSource}`,
                    data: mediaResult,
                });
            }
        }

        const textEndpoint = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`;
        const textRes = await fetch(textEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                number: formattedPhone,
                text: caption,
            }),
        });

        const textResult = await textRes.json();

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
