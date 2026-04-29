import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  ASSESSMENT_COMPANY,
  ASSESSMENT_ID,
  AssessmentQuestion,
  getAssessmentPosition,
} from '@/app/octaholic-assessment/assessmentData';

type RawAnswer = string | number | null | undefined;

type AssessmentPayload = {
  assessmentId?: string;
  company?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  answers?: Record<string, RawAnswer>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EGYPT_MOBILE_REGEX = /^01[0125]\d{8}$/;

function cleanValue(input: unknown) {
  return typeof input === 'string' ? input.replace(/\s+/g, ' ').trim() : '';
}

function normalizeEmail(input: string) {
  return cleanValue(input).toLowerCase();
}

function normalizePhone(input: string) {
  return input.replace(/\D/g, '');
}

function normalizeAnswer(question: AssessmentQuestion, answer: RawAnswer) {
  if (question.type === 'scale') {
    const numericAnswer = typeof answer === 'number' ? answer : Number(answer);
    if (!Number.isInteger(numericAnswer) || numericAnswer < 1 || numericAnswer > 5) {
      return null;
    }

    return numericAnswer;
  }

  const textAnswer = cleanValue(answer);
  if (!textAnswer) {
    return null;
  }

  if (question.type === 'choice' && question.options && !question.options.includes(textAnswer)) {
    return null;
  }

  return textAnswer;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AssessmentPayload;
    const assessmentId = cleanValue(payload.assessmentId) || ASSESSMENT_ID;
    const company = cleanValue(payload.company) || ASSESSMENT_COMPANY;
    const fullName = cleanValue(payload.fullName);
    const email = normalizeEmail(payload.email || '');
    const phone = normalizePhone(cleanValue(payload.phone));
    const positionId = cleanValue(payload.position);
    const position = getAssessmentPosition(positionId);
    const rawAnswers = payload.answers || {};

    if (assessmentId !== ASSESSMENT_ID) {
      return NextResponse.json({ error: 'Invalid assessment.' }, { status: 400 });
    }

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Full name, email, phone, and position are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!EGYPT_MOBILE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid Egyptian mobile number.' },
        { status: 400 }
      );
    }

    const answers = position.questions.map((question) => {
      const answer = normalizeAnswer(question, rawAnswers[question.id]);

      return {
        questionId: question.id,
        type: question.type,
        mode: question.mode || 'standard',
        prompt: question.prompt,
        answer,
      };
    });

    const missingAnswer = answers.find((answer) => answer.answer === null);
    if (missingAnswer) {
      return NextResponse.json(
        { error: 'Please answer every question before submitting.' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert([
        {
          assessment_id: assessmentId,
          company,
          full_name: fullName,
          email,
          phone,
          position: position.id,
          position_label: position.label,
          answers,
          user_agent: request.headers.get('user-agent') || '',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Octaholic assessment insert failed:', error);

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email or phone number has already submitted the assessment.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Unable to save your assessment right now. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Octaholic assessment error:', error);
    return NextResponse.json({ error: 'Unexpected server error. Please try again.' }, { status: 500 });
  }
}
