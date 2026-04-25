const PAYMOB_BASE_URL = 'https://accept.paymob.com/api';

export type PaymobBillingData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

export type PaymobConfig = {
    enabled: boolean;
    apiKey: string;
    integrationId: number;
    iframeId: string;
    hmacSecret: string;
    amountCents: number;
    currency: string;
};

export function getPaymobConfig(): PaymobConfig {
    const enabled = (process.env.ENABLE_PAYMOB || '').toLowerCase() === 'true';
    const apiKey = process.env.PAYMOB_API_KEY || '';
    const integrationIdRaw = process.env.PAYMOB_INTEGRATION_ID || '';
    const iframeId = process.env.PAYMOB_IFRAME_ID || '';
    const hmacSecret = process.env.PAYMOB_HMAC_SECRET || '';
    const amountRaw = process.env.PAYMOB_COURSE_AMOUNT_CENTS || '';

    const integrationId = Number(integrationIdRaw);
    const amountCents = Number(amountRaw);

    return {
        enabled,
        apiKey,
        integrationId,
        iframeId,
        hmacSecret,
        amountCents,
        currency: 'EGP',
    };
}

async function parseJsonSafe(response: Response) {
    const text = await response.text();
    if (!text) return {};
    try {
        return JSON.parse(text) as Record<string, unknown>;
    } catch {
        return { raw: text };
    }
}

async function paymobRequest(path: string, init: RequestInit) {
    const response = await fetch(`${PAYMOB_BASE_URL}${path}`, init);
    const body = await parseJsonSafe(response);

    if (!response.ok) {
        const errorMessage = typeof body?.message === 'string'
            ? body.message
            : typeof body?.detail === 'string'
              ? body.detail
              : `Paymob request failed (${response.status})`;
        throw new Error(errorMessage);
    }

    return body;
}

export async function paymobGetAuthToken(apiKey: string) {
    const data = await paymobRequest('/auth/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey }),
    });

    const token = typeof data.token === 'string' ? data.token : '';
    if (!token) throw new Error('Paymob auth token was not returned.');

    return token;
}

export async function paymobCreateOrder(params: {
    authToken: string;
    amountCents: number;
    currency: string;
    merchantOrderId: string;
}) {
    const data = await paymobRequest('/ecommerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            auth_token: params.authToken,
            delivery_needed: false,
            amount_cents: params.amountCents,
            currency: params.currency,
            items: [],
            merchant_order_id: params.merchantOrderId,
        }),
    });

    const id = Number(data.id);
    if (!Number.isFinite(id)) throw new Error('Paymob order ID was not returned.');

    return {
        id,
        merchantOrderId: typeof data.merchant_order_id === 'string' ? data.merchant_order_id : params.merchantOrderId,
    };
}

export async function paymobCreatePaymentKey(params: {
    authToken: string;
    amountCents: number;
    currency: string;
    orderId: number;
    integrationId: number;
    billingData: PaymobBillingData;
}) {
    const data = await paymobRequest('/acceptance/payment_keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            auth_token: params.authToken,
            amount_cents: params.amountCents,
            expiration: 3600,
            order_id: params.orderId,
            currency: params.currency,
            integration_id: params.integrationId,
            billing_data: {
                first_name: params.billingData.firstName,
                last_name: params.billingData.lastName,
                email: params.billingData.email,
                phone_number: params.billingData.phoneNumber,
                apartment: 'NA',
                floor: 'NA',
                street: 'NA',
                building: 'NA',
                shipping_method: 'PKG',
                postal_code: 'NA',
                city: 'NA',
                state: 'NA',
                country: 'NA',
            },
        }),
    });

    const token = typeof data.token === 'string' ? data.token : '';
    if (!token) throw new Error('Paymob payment token was not returned.');
    return token;
}

export function paymobBuildIframeUrl(iframeId: string, paymentToken: string) {
    return `${PAYMOB_BASE_URL}/acceptance/iframes/${iframeId}?payment_token=${encodeURIComponent(paymentToken)}`;
}

export async function paymobRetrieveTransaction(transactionId: string, authToken: string) {
    const data = await paymobRequest(`/acceptance/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    return data;
}

const FILTERED_TRANSACTION_KEYS = [
    'amount_cents',
    'created_at',
    'currency',
    'error_occured',
    'has_parent_transaction',
    'id',
    'integration_id',
    'is_3d_secure',
    'is_auth',
    'is_capture',
    'is_refunded',
    'is_standalone_payment',
    'is_voided',
    'order.id',
    'owner',
    'pending',
    'source_data.pan',
    'source_data.sub_type',
    'source_data.type',
    'success',
] as const;

function readNested(record: Record<string, unknown>, path: string) {
    return path.split('.').reduce<unknown>((current, part) => {
        if (current && typeof current === 'object') {
            return (current as Record<string, unknown>)[part];
        }
        return undefined;
    }, record);
}

export async function verifyPaymobTransactionHmac(payload: { obj: Record<string, unknown>; hmac: string }, secret: string) {
    const concatenated = FILTERED_TRANSACTION_KEYS.map((key) => {
        const value = readNested(payload.obj, key);
        if (value === null || value === undefined) return '';
        return String(value);
    }).join('');

    const crypto = await import('node:crypto');
    const computed = crypto.createHmac('sha512', secret).update(concatenated).digest('hex');
    return computed === payload.hmac;
}
