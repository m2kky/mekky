import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { Resend } from 'resend';
import WorkshopConfirmation from '@/emails/WorkshopConfirmation';

type RegistrationPayload = {
    name?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    company?: string;
    headline?: string;
    caption?: string;
    photoUrl?: string;
    painPoint?: string;
};

const COURSE_TITLE = 'The Shopify Architect';
const COURSE_SUBTITLE = 'Data-Driven Ecommerce Ecosystem';
const COURSE_LABEL = '100% Free Enrollment';
const COURSE_DATE = 'Limited seats available now';
const COURSE_TIME = 'Live online sessions + practical implementation';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(input: unknown) {
    return typeof input === 'string' ? input.trim() : '';
}

function normalizePhone(input: string) {
    return input.replace(/\D/g, '');
}

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as RegistrationPayload;
        const name = cleanValue(payload.name);
        const email = cleanValue(payload.email);
        const phone = cleanValue(payload.phone);
        const phoneDigits = normalizePhone(phone);
        const jobTitle = cleanValue(payload.jobTitle);
        const company = cleanValue(payload.company);
        const headline = cleanValue(payload.headline);
        const caption = cleanValue(payload.caption);
        const photoUrl = cleanValue(payload.photoUrl);
        const painPoint = cleanValue(payload.painPoint);

        if (!name || !email || !phone || !jobTitle || !company) {
            return NextResponse.json(
                { error: 'Name, email, phone, job title, and company are required.' },
                { status: 400 }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        }

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
        }

        const supabase = createAdminClient();

        const origin = new URL(request.url).origin;
        const posterUrl = new URL(`${origin}/api/og/workshop-share`);
        posterUrl.searchParams.set('name', name);
        posterUrl.searchParams.set('title', jobTitle);
        posterUrl.searchParams.set('headline', headline || 'I am joining');
        posterUrl.searchParams.set('workshop', COURSE_TITLE);
        posterUrl.searchParams.set('subtitle', COURSE_SUBTITLE);
        posterUrl.searchParams.set('price', COURSE_LABEL);
        posterUrl.searchParams.set('date', COURSE_DATE);
        posterUrl.searchParams.set('time', COURSE_TIME);

        if (company) {
            posterUrl.searchParams.set('company', company);
        }
        if (photoUrl) {
            posterUrl.searchParams.set('photo', photoUrl);
        }

        const finalPosterUrl = posterUrl.toString();

        const { data: insertedData, error: insertError } = await supabase
            .from('workshop_registrations')
            .insert([
                {
                    full_name: name,
                    email,
                    phone: phoneDigits,
                    job_title: jobTitle,
                    company,
                    headline: headline || 'I am joining',
                    pain_point: painPoint,
                    photo_url: photoUrl,
                    poster_url: finalPosterUrl,
                    caption,
                    source: 'shopify_architect_landing',
                },
            ])
            .select('id')
            .single();

        if (insertError) {
            console.error('Registration insert failed:', insertError);
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 });
            }
            return NextResponse.json(
                { error: 'Unable to save your registration right now. Please try again.' },
                { status: 500 }
            );
        }

        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            try {
                await resend.emails.send({
                    from: 'Muhammed Mekky <workshop@muhammedmekky.com>',
                    to: email,
                    subject: `You are in: ${COURSE_TITLE}`,
                    react: WorkshopConfirmation({
                        name,
                        workshopTitle: COURSE_TITLE,
                        subtitle: COURSE_SUBTITLE,
                        date: COURSE_DATE,
                        time: COURSE_TIME,
                        mode: COURSE_LABEL,
                        posterUrl: finalPosterUrl,
                    }),
                });

                await supabase.from('workshop_registrations').update({ email_sent: true }).eq('email', email);
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError);
            }
        }

        try {
            const whatsappUrl = new URL(`${origin}/api/workshop/send-poster`);
            whatsappUrl.searchParams.set('name', name);
            whatsappUrl.searchParams.set('phone', phoneDigits);
            whatsappUrl.searchParams.set('posterUrl', finalPosterUrl);
            if (photoUrl) {
                whatsappUrl.searchParams.set('photoUrl', photoUrl);
            }

            const waRes = await fetch(whatsappUrl.toString(), { method: 'GET' });

            if (waRes.ok) {
                await supabase.from('workshop_registrations').update({ whatsapp_sent: true }).eq('email', email);
            }
        } catch (waError) {
            console.error('Failed to trigger WhatsApp send:', waError);
        }

        return NextResponse.json({ success: true, posterUrl: finalPosterUrl, id: insertedData?.id });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Unexpected server error. Please try again.' }, { status: 500 });
    }
}
