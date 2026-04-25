import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import {
    getPaymobConfig,
    paymobGetAuthToken,
    paymobRetrieveTransaction,
    verifyPaymobTransactionHmac,
} from '@/lib/paymob';

type TransactionRecord = {
    id?: number | string;
    success?: boolean;
    error_occured?: boolean;
    pending?: boolean;
    is_voided?: boolean;
    is_refunded?: boolean;
    order?:
        | number
        | string
        | {
              id?: number | string;
              merchant_order_id?: string;
          };
};

const COURSE_TITLE = 'The Shopify Architect';

function cleanText(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

function asString(value: unknown) {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number') return String(value);
    return '';
}

function toBoolean(value: unknown) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        const lowered = value.toLowerCase();
        if (lowered === 'true') return true;
        if (lowered === 'false') return false;
    }
    return false;
}

function extractTransactionIdFromQuery(searchParams: URLSearchParams) {
    return (
        searchParams.get('id') ||
        searchParams.get('transaction_id') ||
        searchParams.get('txn_id') ||
        searchParams.get('payment_id') ||
        ''
    ).trim();
}

function extractOrderId(transaction: TransactionRecord) {
    if (!transaction.order) return '';
    if (typeof transaction.order === 'number' || typeof transaction.order === 'string') {
        return String(transaction.order);
    }

    if (transaction.order.id !== undefined && transaction.order.id !== null) {
        return String(transaction.order.id);
    }

    return '';
}

function extractMerchantOrderId(transaction: TransactionRecord) {
    if (!transaction.order || typeof transaction.order !== 'object') return '';
    return cleanText(transaction.order.merchant_order_id);
}

function buildCaption(baseUrl: string) {
    return `I just enrolled in ${COURSE_TITLE}. If you want to build a data-driven Shopify ecosystem with AI and automation, check it out: ${baseUrl} #Shopify #Ecommerce #Analytics #AI #Automation`;
}

function buildPosterUrl(origin: string, row: {
    full_name: string;
    job_title: string;
    company: string;
    headline: string;
    photo_url: string | null;
}) {
    const posterUrl = new URL('/api/og/workshop-share', origin);
    posterUrl.searchParams.set('name', row.full_name || 'Program Applicant');
    posterUrl.searchParams.set('title', row.job_title || 'Shopify Operator');
    posterUrl.searchParams.set('headline', row.headline || 'I am joining');
    posterUrl.searchParams.set('workshop', COURSE_TITLE);
    posterUrl.searchParams.set('subtitle', 'Data-Driven Ecommerce Ecosystem');
    posterUrl.searchParams.set('price', 'Paid Enrollment');
    posterUrl.searchParams.set('date', 'Payment Confirmed');
    posterUrl.searchParams.set('time', 'Welcome to the program');

    if (row.company) {
        posterUrl.searchParams.set('company', row.company);
    }
    if (row.photo_url) {
        posterUrl.searchParams.set('photo', row.photo_url);
    }

    return posterUrl.toString();
}

function isPaidTransaction(transaction: TransactionRecord) {
    const success = toBoolean(transaction.success);
    const errored = toBoolean(transaction.error_occured);
    const pending = toBoolean(transaction.pending);
    const isVoided = toBoolean(transaction.is_voided);
    const isRefunded = toBoolean(transaction.is_refunded);

    return success && !errored && !pending && !isVoided && !isRefunded;
}

async function findRegistrationRecord(params: {
    merchantOrderId: string;
    paymobOrderId: string;
}) {
    const supabase = createAdminClient();

    if (params.merchantOrderId) {
        const byMerchantOrder = await supabase
            .from('workshop_registrations')
            .select('*')
            .eq('id', params.merchantOrderId)
            .single();

        if (byMerchantOrder.data) {
            return byMerchantOrder.data;
        }
    }

    if (params.paymobOrderId) {
        const bySource = await supabase
            .from('workshop_registrations')
            .select('*')
            .eq('source', `paymob_pending:${params.paymobOrderId}`)
            .single();

        if (bySource.data) {
            return bySource.data;
        }
    }

    return null;
}

async function finalizeRegistrationFromTransaction(transaction: TransactionRecord, origin: string) {
    const merchantOrderId = extractMerchantOrderId(transaction);
    const paymobOrderId = extractOrderId(transaction);
    const registration = await findRegistrationRecord({ merchantOrderId, paymobOrderId });

    if (!registration) {
        throw new Error('No matching registration was found for this Paymob transaction.');
    }

    const supabase = createAdminClient();
    const registrationId = String(registration.id);

    if (registration.source === 'shopify_architect_paid') {
        return { registrationId, status: 'already_paid' as const };
    }

    if (!isPaidTransaction(transaction)) {
        await supabase
            .from('workshop_registrations')
            .update({ source: `paymob_failed:${paymobOrderId || 'unknown'}` })
            .eq('id', registrationId);

        return { registrationId, status: 'failed' as const };
    }

    const posterUrl = buildPosterUrl(origin, {
        full_name: registration.full_name,
        job_title: registration.job_title,
        company: registration.company,
        headline: registration.headline,
        photo_url: registration.photo_url,
    });

    const caption = buildCaption(new URL('/workshop', origin).toString());

    await supabase
        .from('workshop_registrations')
        .update({
            source: 'shopify_architect_paid',
            poster_url: posterUrl,
            caption,
        })
        .eq('id', registrationId);

    return { registrationId, status: 'paid' as const };
}

async function processByTransactionId(transactionId: string, origin: string) {
    const config = getPaymobConfig();
    if (!config.apiKey) throw new Error('PAYMOB_API_KEY is missing.');

    const authToken = await paymobGetAuthToken(config.apiKey);
    const transaction = (await paymobRetrieveTransaction(transactionId, authToken)) as TransactionRecord;

    return finalizeRegistrationFromTransaction(transaction, origin);
}

export async function GET(request: Request) {
    const origin = new URL(request.url).origin;
    const redirectFailed = new URL('/workshop?payment=failed', origin);

    try {
        const transactionId = extractTransactionIdFromQuery(new URL(request.url).searchParams);

        if (!transactionId) {
            return NextResponse.redirect(redirectFailed);
        }

        const result = await processByTransactionId(transactionId, origin);

        if (result.status === 'paid' || result.status === 'already_paid') {
            const redirectSuccess = new URL(`/workshop/ticket/${result.registrationId}`, origin);
            return NextResponse.redirect(redirectSuccess);
        }

        return NextResponse.redirect(redirectFailed);
    } catch (error) {
        console.error('Paymob callback GET error:', error);
        return NextResponse.redirect(redirectFailed);
    }
}

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as {
            obj?: Record<string, unknown>;
            hmac?: string;
        };

        const config = getPaymobConfig();

        if (!payload?.obj || !payload.hmac) {
            return NextResponse.json({ ok: false, error: 'Invalid callback payload.' }, { status: 400 });
        }

        if (config.hmacSecret) {
            const isValidHmac = await verifyPaymobTransactionHmac(
                { obj: payload.obj, hmac: payload.hmac },
                config.hmacSecret
            );

            if (!isValidHmac) {
                return NextResponse.json({ ok: false, error: 'Invalid HMAC signature.' }, { status: 401 });
            }
        }

        const origin = new URL(request.url).origin;
        const transactionId = asString(payload.obj.id);

        if (transactionId) {
            await processByTransactionId(transactionId, origin);
        } else {
            await finalizeRegistrationFromTransaction(payload.obj as TransactionRecord, origin);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Paymob callback POST error:', error);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
