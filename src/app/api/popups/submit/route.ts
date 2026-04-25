import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { popup_id, data, page_url } = body;

        if (!popup_id || !data) {
            return NextResponse.json(
                { error: 'Missing popup_id or data' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('popup_submissions')
            .insert([{ popup_id, data, page_url: page_url || '' }]);

        if (error) {
            console.error('Error saving popup submission:', error);
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}
