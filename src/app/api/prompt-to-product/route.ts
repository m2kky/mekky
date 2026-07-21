import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  WAITLIST_ID,
  normalizeWaitlistSubmission,
  type WaitlistPayload,
} from '@/app/prompt-to-product/promptToProductData';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const normalized = normalizeWaitlistSubmission(payload);

    if (!normalized.ok) {
      return NextResponse.json({ error: normalized.error }, { status: 400 });
    }

    const { fullName, email, phone, answers } = normalized.value;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert([
        {
          assessment_id: WAITLIST_ID,
          company: 'Prompt to Product',
          full_name: fullName,
          email,
          phone,
          position: 'waitlist',
          position_label: 'Prompt to Product Waitlist',
          answers,
          user_agent: request.headers.get('user-agent') || '',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Prompt to Product waitlist insert failed:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'إنت موجود بالفعل في قائمة الانتظار بنفس الإيميل أو رقم الواتساب.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'مقدرناش نسجل بياناتك دلوقتي. جرّب تاني كمان شوية.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Prompt to Product waitlist error:', error);
    return NextResponse.json({ error: 'حصل خطأ غير متوقع. جرّب تاني.' }, { status: 500 });
  }
}
