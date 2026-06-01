import { createClient } from '@/utils/supabase/server';
import AdminForm, { FieldConfig } from '@/components/admin/AdminForm';
import { saveGuide } from '../../actions';
import { notFound } from 'next/navigation';

const guideFields: FieldConfig[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug (URL friendly)', type: 'text', required: true },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
    { name: 'image', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'content', label: 'Guide Content', type: 'textarea', helperText: 'Enter Markdown or text content for the guide.', required: true },
    { name: 'publish_date', label: 'Publish Date', type: 'date' },
    { name: 'published', label: 'Published Status', type: 'checkbox' },
];

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    
    let guide = null;

    if (resolvedParams.id !== 'new') {
        const supabase = await createClient();
        const { data } = await supabase.from('guides').select('*').eq('id', resolvedParams.id).single();
        guide = data;
        
        if (!guide) notFound();
    }

    return (
        <AdminForm
            title={guide ? "Edit Guide" : "Create New Guide"}
            action={saveGuide}
            fields={guideFields}
            initialData={guide || {}}
            backLink="/admin/guides"
        />
    );
}
