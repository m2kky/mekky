import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  normalizeWaitlistSubmission,
  type WaitlistPayload,
} from '@/app/prompt-to-product/promptToProductData';
import {
  consumeWaitlistAttempt,
  type WaitlistRateLimitStore,
} from './waitlistRateLimit';
import { buildWaitlistSubmissionRow } from './waitlistSubmission';

const globalRateLimit = globalThis as typeof globalThis & {
  promptToProductWaitlistAttempts?: WaitlistRateLimitStore;
};
const waitlistAttempts = globalRateLimit.promptToProductWaitlistAttempts
  || new Map<string, number[]>();
globalRateLimit.promptToProductWaitlistAttempts = waitlistAttempts;

function getClientKey(request: Request) {
  const forwardedIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedIp || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.slice(0, 120)}`;
}

export async function POST(request: Request) {
  try {
    let payload: WaitlistPayload;
    try {
      payload = (await request.json()) as WaitlistPayload;
    } catch {
      return NextResponse.json({ error: 'بيانات التسجيل غير صالحة.' }, { status: 400 });
    }

    if (typeof payload.website === 'string' && payload.website.trim()) {
      return NextResponse.json({ success: true, id: null });
    }

    const normalized = normalizeWaitlistSubmission(payload);

    if (!normalized.ok) {
      return NextResponse.json({ error: normalized.error }, { status: 400 });
    }

    const rateLimit = consumeWaitlistAttempt(waitlistAttempts, getClientKey(request));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'محاولات كتير في وقت قصير. جرّب تاني بعد شوية.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const { fullName, email, phone, answers } = normalized.value;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert([buildWaitlistSubmissionRow(
        { fullName, email, phone, answers },
        request.headers.get('user-agent') || ''
      )])
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
