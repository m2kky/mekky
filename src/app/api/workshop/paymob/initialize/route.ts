import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
    getPaymobConfig,
    paymobBuildIframeUrl,
    paymobCreateOrder,
    paymobCreatePaymentKey,
    paymobGetAuthToken,
} from '@/lib/paymob';

type InitializePayload = {
    fullName?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    company?: string;
    headline?: string;
    painPoint?: string;
    photoUrl?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(input: unknown) {
    return typeof input === 'string' ? input.trim() : '';
}

function normalizePhone(input: string) {
    return input.replace(/\D/g, '');
}

function splitName(fullName: string) {
    const parts = fullName.split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return { firstName: 'Guest', lastName: 'User' };
    }
    if (parts.length === 1) {
        return { firstName: parts[0], lastName: 'User' };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(' '),
    };
}

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as InitializePayload;

        const fullName = cleanValue(payload.fullName);
        const email = cleanValue(payload.email);
        const phone = cleanValue(payload.phone);
        const phoneDigits = normalizePhone(phone);
        const jobTitle = cleanValue(payload.jobTitle);
        const company = cleanValue(payload.company);
        const headline = cleanValue(payload.headline) || 'I am joining';
        const painPoint = cleanValue(payload.painPoint);
        const photoUrl = cleanValue(payload.photoUrl);

        if (!fullName || !email || !phoneDigits || !jobTitle || !company) {
            return NextResponse.json(
                { error: 'Full name, email, phone, job title, and company are required.' },
                { status: 400 }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
        }

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            return NextResponse.json({ error: 'Please provide a valid phone number.' }, { status: 400 });
        }

        const config = getPaymobConfig();
        if (!config.enabled) {
            return NextResponse.json({ error: 'Paymob is currently disabled.' }, { status: 503 });
        }

        if (!config.apiKey || !config.integrationId || !config.iframeId) {
            return NextResponse.json({ error: 'Paymob credentials are incomplete on the server.' }, { status: 500 });
        }

        if (!Number.isFinite(config.amountCents) || config.amountCents <= 0) {
            return NextResponse.json(
                { error: 'PAYMOB_COURSE_AMOUNT_CENTS is missing or invalid on the server.' },
                { status: 500 }
            );
        }

        const supabase = createAdminClient();

        const { data: insertedRow, error: insertError } = await supabase
            .from('workshop_registrations')
            .insert([
                {
                    full_name: fullName,
                    email,
                    phone: phoneDigits,
                    job_title: jobTitle,
                    company,
                    headline,
                    pain_point: painPoint,
                    photo_url: photoUrl || '',
                    poster_url: '',
                    caption: '',
                    source: 'paymob_pending',
                },
            ])
            .select('id')
            .single();

        if (insertError) {
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 });
            }

            console.error('Failed to create pending registration:', insertError);
            return NextResponse.json({ error: 'Unable to create registration.' }, { status: 500 });
        }

        const registrationId = String(insertedRow.id);

        try {
            const authToken = await paymobGetAuthToken(config.apiKey);
            const order = await paymobCreateOrder({
                authToken,
                amountCents: config.amountCents,
                currency: config.currency,
                merchantOrderId: registrationId,
            });

            const { firstName, lastName } = splitName(fullName);

            const paymentToken = await paymobCreatePaymentKey({
                authToken,
                amountCents: config.amountCents,
                currency: config.currency,
                orderId: order.id,
                integrationId: config.integrationId,
                billingData: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber: phoneDigits,
                },
            });

            await supabase
                .from('workshop_registrations')
                .update({ source: `paymob_pending:${order.id}` })
                .eq('id', registrationId);

            const paymentUrl = paymobBuildIframeUrl(config.iframeId, paymentToken);

            return NextResponse.json({
                success: true,
                registrationId,
                paymentUrl,
            });
        } catch (paymobError) {
            console.error('Paymob initialization failed:', paymobError);

            await supabase
                .from('workshop_registrations')
                .update({ source: 'paymob_init_failed' })
                .eq('id', registrationId);

            const message = paymobError instanceof Error ? paymobError.message : 'Unable to initialize payment.';
            return NextResponse.json({ error: message }, { status: 502 });
        }
    } catch (error) {
        console.error('Paymob initialize route error:', error);
        return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
    }
}
