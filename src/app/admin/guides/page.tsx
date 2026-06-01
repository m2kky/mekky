import { createClient } from '@/utils/supabase/server';
import AdminTable from '@/components/admin/AdminTable';
import { deleteGuide } from '../actions';

export const revalidate = 0; // Ensure fresh data on every load

export default async function AdminGuidesPage() {
    const supabase = await createClient();

    const { data: guides, error } = await supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching guides:", error);
    }

    return (
        <AdminTable
            title="Guides"
            description="Manage your technical guides."
            items={guides || []}
            baseRoute="/admin/guides"
            onDelete={deleteGuide}
        />
    );
}
