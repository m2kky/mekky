import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
    try {
        const supabase = await createClient();

        // Fetch active popups with their fields
        const { data: popups, error } = await supabase
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
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching popups:', error);
            return NextResponse.json({ popups: [] }, { status: 200 });
        }

        // Sort fields by sort_order within each popup
        const sortedPopups = (popups || []).map(popup => ({
            ...popup,
            popup_fields: (popup.popup_fields || []).sort(
                (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
            ),
        }));

        return NextResponse.json({ popups: sortedPopups });
    } catch {
        return NextResponse.json({ popups: [] }, { status: 200 });
    }
}
