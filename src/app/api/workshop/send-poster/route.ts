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

export async function GET(request: Request) {
    try {
        if (!EVOLUTION_API_KEY) {
            return NextResponse.json({ error: 'WhatsApp API key not configured' }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name')?.trim();
        const phone = searchParams.get('phone')?.trim();
        const posterUrl = searchParams.get('posterUrl')?.trim();

        if (!name || !phone || !posterUrl) {
            return NextResponse.json(
                { error: 'Missing required parameters: name, phone, posterUrl' },
                { status: 400 }
            );
        }

        const formattedPhone = formatPhoneNumber(phone);

        const caption = `Hello ${name} 👋

🎉 You're officially registered for *${WORKSHOP_TITLE}*!

📅 ${WORKSHOP_DATE}
🕖 ${WORKSHOP_TIME}
💻 ${WORKSHOP_MODE}

Share this poster on your social media and let everyone know you're attending! 🚀`;

        const headers = {
            'Content-Type': 'application/json',
            apikey: EVOLUTION_API_KEY,
        };
        const evoUrl = EVOLUTION_API_URL;
        const evoInstance = EVOLUTION_INSTANCE_NAME;

        // 1. Send the image/poster as a base64 string to avoid localhost resolution issues by external Evolution API
        let base64Media = posterUrl;
        if (posterUrl.startsWith('http')) {
            try {
                // Fetch the image from our internal route (or production URL) and convert to base64
                const imgRes = await fetch(posterUrl);
                if (imgRes.ok) {
                    const imgBuffer = await imgRes.arrayBuffer();
                    const b64 = Buffer.from(imgBuffer).toString('base64');
                    // Evolution accepts base64 format for the media field natively
                    base64Media = `data:${imgRes.headers.get('content-type') || 'image/png'};base64,${b64}`;
                }
            } catch (fetchErr) {
                console.error('Failed to pre-fetch poster image, sending raw URL fallback', fetchErr);
            }
        }

        const mediaEndpoint = `${evoUrl}/message/sendMedia/${evoInstance}`;
        const mediaPayload = {
            number: formattedPhone,
            mediaMessage: {
                mediatype: 'image',
                fileName: 'workshop_ticket.png',
                media: base64Media,
            }
        };

        const mediaRes = await fetch(mediaEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(mediaPayload)
        });

        const mediaResult = await mediaRes.json();
        console.log('Evolution Media delivery result:', mediaResult);

        // 2. We wait 1 second to ensure image is delivered first
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Send Text Message (Caption)
        const textEndpoint = `${evoUrl}/message/sendText/${evoInstance}`;
        const finalUrl = 'https://muhammedmekky.com/workshop';
        const fallbackCaption = `I am attending Shopify kick start  on 21 april 2026 at 09:00 pm. If you want to learn how to build high converting Shopify stores step by step over 4 hours, join us: ${finalUrl} #Shopify #Ecommerce #WebDesign`;

        const payloadText = {
            number: formattedPhone,
            text: fallbackCaption,
        };

        const textRes = await fetch(textEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payloadText)
        });

        return NextResponse.json({
            success: mediaRes.ok && textRes.ok,
            data: await textRes.json(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('WhatsApp poster send failed:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
