'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { Resend } from 'resend'
import { CareerApplicationReply } from '@/emails/CareerApplicationReply'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitCareerApplication(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const age = formData.get('age') as string
    const city = formData.get('city') as string
    const university = formData.get('university') as string
    const track = formData.get('track') as string
    const experienceLevel = formData.get('experience_level') as string
    const weeklyHours = formData.get('weekly_hours') as string
    const portfolio = (formData.get('portfolio') as string) || null
    const cvUrl = formData.get('cv_url') as string
    const motivation = formData.get('motivation') as string
    const toolsUsed = formData.get('tools_used') as string
    const projectLink = (formData.get('project_link') as string) || null
    const referralSource = formData.get('referral_source') as string

    if (!name || !email || !phone || !age || !city || !university || !track || !experienceLevel || !weeklyHours || !motivation || !toolsUsed || !referralSource || !cvUrl) {
        return { error: 'All required fields must be filled.' }
    }

    const supabase = createAdminClient()

    const { error } = await supabase
        .from('career_applications')
        .insert([{
            name,
            email,
            phone,
            age: parseInt(age, 10),
            city,
            university,
            track,
            experience_level: experienceLevel,
            weekly_hours: weeklyHours,
            portfolio_url: portfolio,
            cv_url: cvUrl,
            motivation,
            tools_used: toolsUsed,
            project_link: projectLink,
            referral_source: referralSource,
            status: 'pending'
        }])

    if (error) {
        console.error('Career application submission error:', error)
        return { error: 'Failed to submit application. Please try again.' }
    }

    // Send confirmation email to applicant
    const { data: setting } = await supabase
        .from('email_settings')
        .select('*')
        .eq('source', 'career_application')
        .single()

    try {
        const trackLabels: Record<string, string> = {
            ai: 'AI & Prompt Engineering',
            automation: 'Automation & No-Code',
            vibe_coding: 'Vibe Coding',
        }

        const mailOptions: any = {
            from: setting?.sender_email || 'Muhammed Mekky <career@muhammedmekky.com>',
            to: email,
            subject: setting?.subject || 'Application Received — Mekky Internship Program',
        }

        if (setting?.body_text?.trim()) {
            let htmlContent = setting.body_text
            htmlContent = htmlContent.replace(/\{\{\s*name\s*\}\}/gi, name)
            htmlContent = htmlContent.replace(/\{\{\s*email\s*\}\}/gi, email)
            htmlContent = htmlContent.replace(/\{\{\s*track\s*\}\}/gi, trackLabels[track] || track)
            mailOptions.html = htmlContent
        } else {
            mailOptions.react = CareerApplicationReply({
                name,
                track: trackLabels[track] || track
            })
        }

        await resend.emails.send(mailOptions)
    } catch (emailError) {
        console.error('Failed to send career application reply email:', emailError)
    }

    return { success: true }
}
