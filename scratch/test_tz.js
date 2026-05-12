
function getCairoOffset(date) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        timeZoneName: 'shortOffset'
    }).formatToParts(date);
    const offsetName = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+2';
    let offset = offsetName.replace('GMT', '');
    
    // Parse the offset to ensure HH:MM format with padding
    const match = offset.match(/([+-])(\d+)(?::(\d+))?/);
    if (match) {
        const sign = match[1];
        const hours = match[2].padStart(2, '0');
        const minutes = (match[3] || '0').padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
    }
    return "+02:00"; // Fallback
}

const date1 = new Date('2026-03-20T10:00:00Z');
const date2 = new Date('2026-05-20T10:00:00Z');

console.log('Cairo Offset March 2026:', getCairoOffset(date1));
console.log('Cairo Offset May 2026:', getCairoOffset(date2));
console.log('Date object test:', new Date('2026-05-20T20:29:00' + getCairoOffset(date2)).toISOString());
