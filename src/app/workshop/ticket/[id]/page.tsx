import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import TicketClientPage from './TicketClientPage';
import { headers } from 'next/headers';

type Props = {
    params: { id: string };
};

const COURSE_TITLE = 'The Shopify Architect';
const COURSE_DESC = 'Data-Driven Ecommerce Ecosystem';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const supabase = await createClient();
    const { data } = await supabase
        .from('workshop_registrations')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!data) return {};

    const title = `${data.full_name}'s Enrollment Card | ${COURSE_TITLE}`;
    const description = `Join me in ${COURSE_TITLE} - ${COURSE_DESC}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            images: data.poster_url ? [data.poster_url] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: data.poster_url ? [data.poster_url] : [],
        },
    };
}

export default async function TicketPage(props: Props) {
    const params = await props.params;
    const supabase = await createClient();
    const { data } = await supabase
        .from('workshop_registrations')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!data) {
        notFound();
    }

    const headersList = await headers();
    const host = headersList.get('host') || 'muhammedmekky.com';
    const protocol = host.includes('localhost') ? 'http://' : 'https://';

    const pageUrl = `${protocol}${host}/workshop/ticket/${params.id}`;

    return <TicketClientPage data={data} pageUrl={pageUrl} />;
}
