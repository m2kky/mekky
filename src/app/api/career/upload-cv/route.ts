import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

const BUCKET = 'event-uploads';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
        }

        // Only allow PDF and Word documents
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Only PDF and Word documents are allowed' }, { status: 400 });
        }

        const supabase = createAdminClient();

        const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
        const filePath = `career-cvs/cv-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, buffer, {
                upsert: false,
                cacheControl: '3600',
                contentType: file.type,
            });

        if (uploadError) {
            console.error('CV upload failed:', uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

        return NextResponse.json({ publicUrl: data.publicUrl });
    } catch (error) {
        console.error('CV upload route error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
