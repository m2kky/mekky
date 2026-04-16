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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d()\-\s]{7,20}$/;

function cleanValue(input: unknown) {
    return typeof input === 'string' ? input.trim() : '';
}

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as RegistrationPayload;
        const name = cleanValue(payload.name);
        const email = cleanValue(payload.email);
        const phone = cleanValue(payload.phone);
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

        if (!PHONE_REGEX.test(phone)) {
            return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
        }

        const supabase = createAdminClient();

        // 1. Build Poster URL
        const origin = new URL(request.url).origin;
        const posterUrl = new URL(`${origin}/api/og/workshop-share`);
        posterUrl.searchParams.set('name', name);
        posterUrl.searchParams.set('title', jobTitle);
        if (company) {
            posterUrl.searchParams.set('company', company);
        }
        if (photoUrl) {
            posterUrl.searchParams.set('photo', photoUrl);
        }

        const finalPosterUrl = posterUrl.toString();

        // 2. Insert into DB (admin client bypasses RLS)
        const { data: insertedData, error: insertError } = await supabase.from('workshop_registrations').insert([
            {
                full_name: name,
                email,
                phone,
                job_title: jobTitle,
                company,
                headline: headline || 'I am attending',
                pain_point: painPoint,
                photo_url: photoUrl,
                poster_url: finalPosterUrl,
                caption,
                source: 'workshop_landing',
            },
        ]).select('id').single();

        if (insertError) {
            console.error('Workshop registration insert failed:', insertError);
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 });
            }
            return NextResponse.json(
                { error: 'Unable to save your registration right now. Please try again.' },
                { status: 500 }
            );
        }

        // 3. Send Confirmation Email via Resend
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            try {
                await resend.emails.send({
                    from: 'Muhammed Mekky <workshop@muhammedmekky.com>',
                    to: email,
                    subject: "You're Registered: Shopify Analytics Workshop",
                    react: WorkshopConfirmation({
                        name,
                        posterUrl: finalPosterUrl,
                    }),
                });
                
                // Update email_sent status
                await supabase.from('workshop_registrations')
                    .update({ email_sent: true })
                    .eq('email', email);
            } catch (emailError) {
                console.error('Failed to send workshop confirmation email:', emailError);
            }
        }

        // 4. Trigger WhatsApp Delivery via internal API
        try {
            const whatsappUrl = new URL(`${origin}/api/workshop/send-poster`);
            whatsappUrl.searchParams.set('name', name);
            whatsappUrl.searchParams.set('phone', phone);
            whatsappUrl.searchParams.set('posterUrl', finalPosterUrl);

            // Await the fetch so it finishes before request context dies
            const waRes = await fetch(whatsappUrl.toString(), { method: 'GET' });
            
            if (waRes.ok) {
                 await supabase.from('workshop_registrations')
                    .update({ whatsapp_sent: true })
                    .eq('email', email);
            }
        } catch (waError) {
            console.error('Failed to trigger WhatsApp send:', waError);
        }

        return NextResponse.json({ success: true, posterUrl: finalPosterUrl, id: insertedData?.id });
    } catch (error) {
        console.error('Workshop registration error:', error);
        return NextResponse.json({ error: 'Unexpected server error. Please try again.' }, { status: 500 });
    }
}
