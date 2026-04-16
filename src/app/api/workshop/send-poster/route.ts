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

        // 1. Try to send the poster image with caption
        let imageSent = false;

        if (posterUrl && posterUrl.startsWith('http')) {
            try {
                console.log('Fetching poster image from:', posterUrl);
                const imgRes = await fetch(posterUrl, {
                    signal: AbortSignal.timeout(8000),
                });

                if (imgRes.ok) {
                    const imgBuffer = await imgRes.arrayBuffer();
                    const b64 = Buffer.from(imgBuffer).toString('base64');
                    const contentType = imgRes.headers.get('content-type') || 'image/png';
                    const base64Media = `data:${contentType};base64,${b64}`;

                    const imageCaption = `Hello ${name} 👋

🎉 You're officially registered for *${WORKSHOP_TITLE}*!

📅 ${WORKSHOP_DATE}
🕖 ${WORKSHOP_TIME}
💻 ${WORKSHOP_MODE}

Share this poster on your social media and let everyone know you're attending! 🚀

Register here: https://muhammedmekky.com/workshop

#Shopify #Ecommerce #WebDesign`;

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
                    console.log('Evolution Media delivery result:', JSON.stringify(mediaResult).slice(0, 300));
                    imageSent = mediaRes.ok;
                }
            } catch (fetchErr) {
                console.error('Failed to fetch/send poster image:', fetchErr);
            }
        }

        // 2. If image failed, send text-only fallback
        if (!imageSent) {
            console.log('Image send failed or skipped, sending text-only fallback');
            const textEndpoint = `${evoUrl}/message/sendText/${evoInstance}`;
            const fallbackText = `Hello ${name} 👋

🎉 You're officially registered for *${WORKSHOP_TITLE}*!

📅 ${WORKSHOP_DATE}
🕖 ${WORKSHOP_TIME}
💻 ${WORKSHOP_MODE}

Share this with your friends and let everyone know you're attending! 🚀

Register here: https://muhammedmekky.com/workshop

#Shopify #Ecommerce #WebDesign`;

            const textRes = await fetch(textEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    number: formattedPhone,
                    text: fallbackText,
                }),
            });

            const textResult = await textRes.json();
            console.log('Evolution Text delivery result:', JSON.stringify(textResult).slice(0, 300));

            return NextResponse.json({
                success: textRes.ok,
                method: 'text_fallback',
                data: textResult,
            });
        }

        return NextResponse.json({
            success: true,
            method: 'image_with_caption',
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('WhatsApp poster send failed:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
