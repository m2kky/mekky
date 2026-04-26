'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Reusable auth check (same pattern as existing admin actions)
async function requireAuth() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    return supabase;
}

// ─── Types ───────────────────────────────────────

export interface PopupField {
    id?: string;
    field_type: string;
    label: string;
    placeholder: string;
    is_required: boolean;
    options: string[];
    sort_order: number;
}

export interface PopupData {
    id?: string;
    title: string;
    style: string;
    heading: string;
    description: string;
    button_text: string;
    success_message: string;
    bg_color: string;
    text_color: string;
    accent_color: string;
    border_color: string;
    overlay_color: string;
    btn_text_color: string;
    image_url: string;
    trigger_type: string;
    trigger_value: string;
    button_action_type: string;
    button_action_url: string;
    show_on_pages: string[];
    is_active: boolean;
    show_once: boolean;
    fields: PopupField[];
}

// ─── Save Popup (Create or Update) ──────────────

export async function savePopup(data: PopupData) {
    const supabase = await requireAuth();

    const { fields, id, ...popupPayload } = data;

    let popupId = id;

    if (id) {
        // Update existing popup
        const { error } = await supabase
            .from('popups')
            .update(popupPayload)
            .eq('id', id);
        if (error) return { error: error.message };
    } else {
        // Create new popup
        const { data: newPopup, error } = await supabase
            .from('popups')
            .insert([popupPayload])
            .select('id')
            .single();
        if (error) return { error: error.message };
        popupId = newPopup.id;
    }

    // ─── Sync fields ────────────────────────────
    // Delete existing fields and re-insert (simpler than diffing)
    if (id) {
        await supabase.from('popup_fields').delete().eq('popup_id', id);
    }

    if (fields.length > 0) {
        const fieldPayloads = fields.map((f, idx) => ({
            popup_id: popupId,
            field_type: f.field_type,
            label: f.label,
            placeholder: f.placeholder,
            is_required: f.is_required,
            options: f.options,
            sort_order: idx,
        }));

        const { error: fieldsError } = await supabase
            .from('popup_fields')
            .insert(fieldPayloads);
        if (fieldsError) return { error: fieldsError.message };
    }

    revalidatePath('/admin/popups');
    revalidatePath('/');
    return { success: true, id: popupId };
}

// ─── Delete Popup ───────────────────────────────

export async function deletePopup(id: string) {
    const supabase = await requireAuth();
    // CASCADE will handle popup_fields and popup_submissions
    const { error } = await supabase.from('popups').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/popups');
    revalidatePath('/');
    return { success: true };
}

// ─── Toggle Active ──────────────────────────────

export async function togglePopupActive(id: string, is_active: boolean) {
    const supabase = await requireAuth();
    const { error } = await supabase
        .from('popups')
        .update({ is_active })
        .eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/popups');
    revalidatePath('/');
    return { success: true };
}
