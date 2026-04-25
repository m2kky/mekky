import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import PopupEditor from '../PopupEditor';

export const revalidate = 0;

export default async function EditPopupPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: popup, error } = await supabase
        .from('popups')
        .select(`
            *,
            popup_fields (
                id,
                field_type,
                label,
                placeholder,
                is_required,
                options,
                sort_order
            )
        `)
        .eq('id', id)
        .single();

    if (error || !popup) {
        notFound();
    }

    // Sort fields by sort_order
    const sortedFields = (popup.popup_fields || []).sort(
        (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    );

    return (
        <PopupEditor
            initialData={{
                ...popup,
                popup_fields: sortedFields,
            }}
        />
    );
}
