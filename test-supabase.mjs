import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
});

const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { data, error } = await s.from('workshop_registrations').insert({
    full_name: 'Test',
    email: `test${Date.now()}@test.com`,
    phone: '123456789',
    job_title: 'Test',
    company: 'Test Company',
    headline: 'test',
    pain_point: '',
    photo_url: '',
    poster_url: '',
    caption: '',
    source: 'workshop_landing'
}).select('id');
console.log(JSON.stringify({ error }));
