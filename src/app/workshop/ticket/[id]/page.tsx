import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import TicketClientPage from './TicketClientPage';
import { headers } from 'next/headers';

type Props = {
    params: { id: string };
};

export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const supabase = await createClient();
    const { data } = await supabase
        .from('workshop_registrations')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!data) return {};

    const title = `${data.full_name}'s VIP Ticket - Shopify kick start`;
    const description = `Join me at the Shopify kick start workshop to master Shopify building.`;
    
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
    let host = headersList.get('host') || 'muhammedmekky.com';
    // Remove port for dev environment if needed, but keeping it is fine for absolute URL
    let protocol = 'https://';
    if (host.includes('localhost')) {
        protocol = 'http://';
    }
    
    // The specific page URL that will be shared (e.g. muhammedmekky.com/workshop/ticket/XYZ)
    const pageUrl = `${protocol}${host}/workshop/ticket/${params.id}`;

    return <TicketClientPage data={data} pageUrl={pageUrl} />;
}
