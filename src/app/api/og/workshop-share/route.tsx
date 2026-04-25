import { ImageResponse } from '@vercel/og';
/* eslint-disable @next/next/no-img-element */

export const runtime = 'edge';

const DEFAULT_WORKSHOP = 'The Shopify Architect';
const DEFAULT_SUBTITLE = 'Data-Driven Ecommerce Ecosystem';
const DEFAULT_LABEL = '100% Free Enrollment';
const DEFAULT_NAME = 'Program Applicant';
const DEFAULT_TITLE = 'Shopify Operator';
const DEFAULT_HEADLINE = 'I AM JOINING';
const DEFAULT_DATE = 'Limited seats available now';
const DEFAULT_TIME = 'Live online sessions + practical implementation';

function cleanText(input: string | null, fallback: string, maxLength = 90) {
  if (!input) return fallback;
  const value = input.trim().replace(/\s+/g, ' ');
  if (!value) return fallback;
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3)}...`;
}

function safePhoto(input: string | null) {
  const value = (input || '').trim();
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return '';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const workshop = cleanText(searchParams.get('workshop'), DEFAULT_WORKSHOP, 64);
  const subtitle = cleanText(searchParams.get('subtitle'), DEFAULT_SUBTITLE, 64);
  const label = cleanText(searchParams.get('price'), DEFAULT_LABEL, 42);
  const fullName = cleanText(searchParams.get('name'), DEFAULT_NAME, 34);
  const title = cleanText(searchParams.get('title'), DEFAULT_TITLE, 40);
  const company = cleanText(searchParams.get('company'), '', 38);
  const headline = cleanText(searchParams.get('headline'), DEFAULT_HEADLINE, 34).toUpperCase();
  const date = cleanText(searchParams.get('date'), DEFAULT_DATE, 46);
  const time = cleanText(searchParams.get('time'), DEFAULT_TIME, 56);
  const photo = safePhoto(searchParams.get('photo'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '1080px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(155deg, #070604 0%, #171109 52%, #22180b 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#fdf7e6',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 14% 0%, rgba(255,210,74,0.22), transparent 42%), radial-gradient(circle at 90% 12%, rgba(189,132,13,0.18), transparent 48%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 36,
            right: 36,
            border: '1px solid rgba(255,214,110,0.24)',
            borderRadius: 20,
            padding: '22px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.26)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,214,110,0.6)',
                background: 'rgba(255,214,110,0.1)',
                color: '#ffe7a8',
                fontSize: 20,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 10,
              }}
            >
              {label}
            </div>
            <div style={{ display: 'flex', fontSize: 58, fontWeight: 800, lineHeight: 1, maxWidth: 630 }}>{workshop}</div>
            <div
              style={{
                display: 'flex',
                marginTop: 10,
                fontSize: 24,
                color: '#ffe6ab',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                maxWidth: 650,
              }}
            >
              {subtitle}
            </div>
            <div style={{ display: 'flex', marginTop: 18, fontSize: 20, color: '#f7e7bf' }}>{date}</div>
            <div style={{ display: 'flex', marginTop: 8, fontSize: 19, color: '#e8dcb8' }}>{time}</div>
          </div>

          <div
            style={{
              display: 'flex',
              width: 340,
              height: 340,
              borderRadius: 999,
              border: '7px solid rgba(255,211,71,0.95)',
              overflow: 'hidden',
              background: '#1f1a11',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Attendee"
                width={340}
                height={340}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: 188,
                  height: 188,
                  borderRadius: 999,
                  border: '3px solid rgba(255,211,71,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: '#f5de9d',
                }}
              >
                YOUR PHOTO
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 36,
            right: 36,
            bottom: 36,
            borderRadius: 20,
            border: '1px solid rgba(255,208,95,0.26)',
            background: 'rgba(10,8,5,0.75)',
            display: 'flex',
            flexDirection: 'column',
            padding: '26px 26px 22px',
          }}
        >
          <div style={{ display: 'flex', color: '#ffd347', fontSize: 34, fontWeight: 800, textTransform: 'uppercase' }}>{headline}</div>
          <div style={{ display: 'flex', marginTop: 14, color: '#fffaf0', fontSize: 52, fontWeight: 800, lineHeight: 1.04 }}>{fullName}</div>
          <div style={{ display: 'flex', marginTop: 10, color: '#ffd347', fontSize: 30, fontWeight: 700 }}>{title}</div>
          {company ? (
            <div style={{ display: 'flex', marginTop: 8, color: '#ecddb8', fontSize: 24, fontWeight: 500 }}>{company}</div>
          ) : null}

          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 19,
              color: '#bca97a',
              borderTop: '1px solid rgba(255,208,95,0.18)',
              paddingTop: 12,
            }}
          >
            muhammedmekky.com/workshop
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}

