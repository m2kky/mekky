'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (!name || !email || !message) {
        return { error: 'All fields are required.' }
    }

    const supabase = await createClient()

    const { error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }])

    if (error) {
        console.error('Contact submission error:', error)
        return { error: 'Failed to submit form. Please try again.' }
    }

    return { success: true }
}

export async function submitNewsletter(formData: FormData) {
    const email = formData.get('email')

    if (!email) {
        return { error: 'Email is required.' }
    }

    const supabase = await createClient()

    // Assuming overlapping emails just log gracefully or unique constraint in DB
    const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }])

    if (error) {
        // Code 23505 is unique violation in Postgres
        if (error.code === '23505') {
            return { success: true } // Silently succeed if already subscribed
        }
        console.error('Newsletter submission error:', error)
        return { error: 'Failed to subscribe. Please try again.' }
    }

    return { success: true }
}
