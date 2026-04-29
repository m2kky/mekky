import { google } from 'googleapis';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';

// Use service role client for settings table to bypass RLS
function getAdminSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
        throw new Error('Missing Supabase URL or Service Role Key for admin client');
    }
    return createClient(url, serviceKey);
}

const getOAuth2Client = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    const redirectUri = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
        : 'http://localhost:3000/api/auth/google/callback';

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
};

export async function getGoogleTokens() {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase.from('settings').select('value').eq('key', 'google_calendar_tokens').single();
    if (error) {
        console.error('Failed to fetch Google tokens from settings:', error);
        return null;
    }
    return data?.value || null;
}

export async function setGoogleTokens(tokens: any) {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from('settings').upsert({ key: 'google_calendar_tokens', value: tokens });
    if (error) {
        console.error('Failed to save Google tokens:', error);
    }
}

export async function getAuthenticatedCalendar() {
    const tokens = await getGoogleTokens();
    if (!tokens) {
        console.error('No Google Calendar tokens found in settings table.');
        return null;
    }

    const oAuth2Client = getOAuth2Client();
    oAuth2Client.setCredentials(tokens);

    // Listen for token refresh events and persist new tokens
    oAuth2Client.on('tokens', async (newTokens) => {
        console.log('Google OAuth tokens refreshed, saving...');
        const merged = { ...tokens, ...newTokens };
        // Keep existing refresh_token if not returned
        if (!merged.refresh_token && tokens.refresh_token) {
            merged.refresh_token = tokens.refresh_token;
        }
        await setGoogleTokens(merged);
    });

    // Proactively refresh if token is expired or about to expire
    try {
        const tokenInfo = oAuth2Client.credentials;
        const now = Date.now();
        const expiryDate = tokenInfo.expiry_date || 0;

        if (expiryDate && expiryDate < now + 60000) {
            // Token expired or expiring in < 1 minute — force refresh
            console.log('Access token expired, refreshing...');
            const { credentials } = await oAuth2Client.refreshAccessToken();
            const merged = { ...tokens, ...credentials };
            if (!merged.refresh_token && tokens.refresh_token) {
                merged.refresh_token = tokens.refresh_token;
            }
            oAuth2Client.setCredentials(merged);
            await setGoogleTokens(merged);
        }
    } catch (refreshError: any) {
        console.error('Failed to refresh Google token:', refreshError?.message || refreshError);
        if (refreshError?.message?.includes('invalid_grant')) {
            console.error('⚠️ CRITICAL: Google refresh token is revoked/expired. User needs to re-authorize via /admin/integrations');
        }
        return null;
    }

    return google.calendar({ version: 'v3', auth: oAuth2Client });
}

export function getAuthUrl() {
    const oAuth2Client = getOAuth2Client();
    return oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Required to get a refresh token
        prompt: 'consent', // Force consent screen to guarantee getting a refresh token
        scope: [
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar.readonly'
        ]
    });
}

export async function authorizeWithCode(code: string) {
    const oAuth2Client = getOAuth2Client();
    const { tokens } = await oAuth2Client.getToken(code);

    // If we don't get a refresh token, but we already have one saved, keep the old refresh token
    const existingTokens = await getGoogleTokens();
    if (!tokens.refresh_token && existingTokens?.refresh_token) {
        tokens.refresh_token = existingTokens.refresh_token;
    }

    console.log('Google Calendar authorized successfully. Refresh token present:', !!tokens.refresh_token);
    await setGoogleTokens(tokens);
    return tokens;
}

/**
 * Get the current UTC offset for Cairo (handles DST automatically)
 */
export function getCairoOffset(date: Date = new Date()): string {
    try {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Africa/Cairo',
            timeZoneName: 'shortOffset'
        }).formatToParts(date);
        const offsetName = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+2';
        let offset = offsetName.replace('GMT', '');
        
        // Ensure format is +HH:MM or -HH:MM
        const match = offset.match(/([+-])(\d+)(?::(\d+))?/);
        if (match) {
            const sign = match[1];
            const hours = match[2].padStart(2, '0');
            const minutes = (match[3] || '0').padStart(2, '0');
            return `${sign}${hours}:${minutes}`;
        }
        return "+02:00"; 
    } catch (e) {
        return "+02:00";
    }
}

export async function checkCalendarConflicts(dateStr: string, timeSlots: string[], durationMinutes: number): Promise<string[]> {
    const calendar = await getAuthenticatedCalendar();
    if (!calendar) {
        console.warn('Google Calendar not connected — skipping conflict check.');
        return timeSlots;
    }

    const freeSlots = [...timeSlots];

    try {
        // Query a window based on Cairo local time boundaries
        const offset = getCairoOffset(new Date(dateStr));
        const timeMin = new Date(`${dateStr}T00:00:00${offset}`); 
        const timeMax = new Date(`${dateStr}T23:59:59${offset}`); 

        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                items: [{ id: 'primary' }],
            }
        });

        const busyIntervals = response.data.calendars?.['primary']?.busy || [];
        console.log(`Google Calendar: Found ${busyIntervals.length} busy intervals for ${dateStr} (Offset: ${offset})`);

        // Check each slot against busy intervals.
        for (const slot of timeSlots) {
            const slotStart = new Date(`${dateStr}T${slot}:00${offset}`); 
            const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);

            for (const busy of busyIntervals) {
                const busyStart = new Date(busy.start!); 
                const busyEnd = new Date(busy.end!);     

                // Conflict exists if: slot starts before busy ends AND slot ends after busy starts
                if (slotStart < busyEnd && slotEnd > busyStart) {
                    const index = freeSlots.indexOf(slot);
                    if (index > -1) {
                        freeSlots.splice(index, 1);
                        console.log(`Slot ${slot} conflicts with busy period ${busy.start} - ${busy.end}`);
                    }
                }
            }
        }
    } catch (e: any) {
        console.error('Failed to query Google Calendar freebusy:', e?.message || e);
    }

    return freeSlots;
}

export async function createGoogleCalendarEvent(eventDetails: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    clientEmail: string;
}) {
    const calendar = await getAuthenticatedCalendar();
    if (!calendar) {
        console.error('Cannot create event: Google Calendar not authenticated.');
        return null;
    }

    try {
        const event = await calendar.events.insert({
            calendarId: 'primary',
            conferenceDataVersion: 1, // Required to create Google Meet link
            sendUpdates: 'all', // Send email invites to attendees
            requestBody: {
                summary: eventDetails.title,
                description: eventDetails.description,
                start: {
                    dateTime: eventDetails.startTime.toISOString(),
                    timeZone: 'Africa/Cairo',
                },
                end: {
                    dateTime: eventDetails.endTime.toISOString(),
                    timeZone: 'Africa/Cairo',
                },
                attendees: [
                    { email: eventDetails.clientEmail }
                ],
                conferenceData: {
                    createRequest: {
                        requestId: `booking-${Date.now()}`, // Unique ID for the meeting
                        conferenceSolutionKey: {
                            type: 'hangoutsMeet'
                        }
                    }
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 60 },
                        { method: 'popup', minutes: 15 },
                    ]
                }
            }
        });

        console.log('Google Calendar event created successfully:', event.data.id);
        console.log('Meet link:', event.data.hangoutLink);
        console.log('Calendar link:', event.data.htmlLink);

        return event.data;
    } catch (e: any) {
        console.error('Failed to create Google Calendar event:', e?.message || e);
        throw e;
    }
}
