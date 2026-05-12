
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const getVar = (name) => {
    const match = env.match(new RegExp(`${name}=(.*)`));
    return match ? match[1].trim() : null;
};

const supabaseUrl = getVar('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey = getVar('SUPABASE_SERVICE_ROLE_KEY');

async function checkTokens() {
    if (!supabaseUrl || !serviceKey) {
        console.log('Missing Supabase credentials');
        return;
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase.from('settings').select('*').eq('key', 'google_calendar_tokens').single();
    
    if (error) {
        console.log('Error or no tokens found:', error.message);
        return;
    }
    
    console.log('Tokens found in Supabase!');
    console.log('Keys present:', Object.keys(data.value));
    const expiry = data.value.expiry_date;
    if (expiry) {
        console.log('Expiry date:', new Date(expiry).toLocaleString());
        console.log('Is expired?', expiry < Date.now());
        console.log('Refresh token present:', !!data.value.refresh_token);
    }
}

checkTokens();
