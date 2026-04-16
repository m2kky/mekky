'use client';
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient as createSupabaseClient } from '@/utils/supabase/client';
import styles from './WorkshopLanding.module.css';

const WORKSHOP_TITLE = 'Shopify kick start: How to build Shopify stores';
const WORKSHOP_SHORT_TITLE = 'Shopify kick start';
const WORKSHOP_SUBTITLE = 'How to build Shopify stores';
const DEFAULT_POSTER_HEADLINE = 'I am attending';
const WORKSHOP_DATE = 'Tuesday, April 21, 2026';
const WORKSHOP_TIME = '09:00 PM Cairo Time';
const WORKSHOP_MODE = 'Live Online on Google Meet';
const WORKSHOP_PRICE = '100% FREE';
const POSTER_TEMPLATE_ID = 'workshop-square-v1';
const PHOTO_BUCKET_CANDIDATES = ['event-uploads', 'workshop-uploads', 'uploads'];

type WorkshopFormState = {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    company: string;
};

type PosterPayload = {
    fullName: string;
    jobTitle: string;
    company: string;
    headline: string;
};

type FocusTopic = {
    emoji: string;
    title: string;
    pain: string;
    takeaway: string;
    automation: string;
};

const FOCUS_TOPICS: FocusTopic[] = [
    {
        emoji: '🔍',
        title: 'Core Fundamentals',
        pain: 'Not knowing where to start with your first online store.',
        takeaway: 'How to search for profitable references and build a solid foundation.',
        automation: 'Extracting winning patterns from competitor stores.',
    },
    {
        emoji: '🎨',
        title: 'Store Building',
        pain: 'Wasting hours on theme tweaks without making sales.',
        takeaway: 'Make the theme and components, setup collections, pages, products & variants.',
        automation: 'Design high-converting landing pages effortlessly.',
    },
    {
        emoji: '📊',
        title: 'Data & Optimization',
        pain: 'Flying blind without knowing who is visiting or why they leave.',
        takeaway: 'Setup pixel, CAPI, GA4, along with advanced reporting & auditing.',
        automation: 'Automate tracking setup to capture every single event from day one.',
    },
];

const WHO_SHOULD_ATTEND = [
    'Entrepreneurs launching their first e-commerce brand.',
    'Media buyers wanting to build and optimize their own high-converting funnels.',
    'Dropshippers seeking a reliable, professional store setup method.',
];

const WORKSHOP_OUTCOMES = [
    'A fully structured Shopify store blueprint ready for launch.',
    'Properly integrated tracking (Pixel, CAPI, GA4) to guarantee zero data loss.',
    'Over 4 hours of intensive, step-by-step practical implementation.',
];

const initialFormState: WorkshopFormState = {
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
};

const WORKSHOP_DATE_OBJ = new Date('2026-04-21T21:00:00+02:00');

function normalizeSpaces(value: string) {
    return value.replace(/\s+/g, ' ').trim();
}

function drawWrappedText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number
) {
    const words = text.split(' ').filter(Boolean);
    if (!words.length) return y;

    const lines: string[] = [];
    let line = words[0];

    for (let i = 1; i < words.length; i += 1) {
        const candidate = `${line} ${words[i]}`;
        if (context.measureText(candidate).width <= maxWidth) {
            line = candidate;
        } else {
            lines.push(line);
            line = words[i];
        }
    }
    lines.push(line);

    const limitedLines = lines.slice(0, maxLines);
    if (lines.length > maxLines) {
        limitedLines[maxLines - 1] = `${limitedLines[maxLines - 1].replace(/\.*$/, '')}...`;
    }

    limitedLines.forEach((currentLine, index) => {
        context.fillText(currentLine, x, y + index * lineHeight);
    });

    return y + (limitedLines.length - 1) * lineHeight;
}

function readFileAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
                return;
            }
            reject(new Error('Unable to read image file.'));
        };
        reader.onerror = () => reject(new Error('Unable to read image file.'));
        reader.readAsDataURL(file);
    });
}

function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to load image.'));
        image.src = src;
    });
}

async function createPosterFallback(payload: PosterPayload, photoFile: File) {
    const canvasSize = 1080;
    const imageSource = await readFileAsDataUrl(photoFile);
    const profileImage = await loadImage(imageSource);

    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Canvas is not available in this browser.');
    }

    const gradient = context.createLinearGradient(0, 0, canvasSize, canvasSize);
    gradient.addColorStop(0, '#05070f');
    gradient.addColorStop(0.45, '#111827');
    gradient.addColorStop(1, '#1f2937');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasSize, canvasSize);

    context.fillStyle = 'rgba(249,115,22,0.16)';
    context.fillRect(70, 54, 192, 56);
    context.fillStyle = '#f97316';
    context.font = '700 28px Inter, sans-serif';
    context.fillText(WORKSHOP_PRICE, 84, 92);

    context.fillStyle = '#e5e7eb';
    context.font = '600 26px Inter, sans-serif';
    context.fillText('LIVE ONLINE WORKSHOP', 70, 145);

    context.fillStyle = '#ffffff';
    context.font = '800 76px Syne, Inter, sans-serif';
    drawWrappedText(context, WORKSHOP_SHORT_TITLE, 70, 228, 610, 82, 2);

    context.fillStyle = '#fb923c';
    context.font = '700 38px Inter, sans-serif';
    drawWrappedText(context, WORKSHOP_SUBTITLE, 70, 390, 610, 46, 2);

    const photoX = 84;
    const photoY = 460;
    const photoSize = 380;
    const photoCenter = photoX + photoSize / 2;

    context.save();
    context.beginPath();
    context.arc(photoCenter, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.clip();
    context.drawImage(profileImage, photoX, photoY, photoSize, photoSize);
    context.restore();

    context.lineWidth = 8;
    context.strokeStyle = 'rgba(249,115,22,0.95)';
    context.beginPath();
    context.arc(photoCenter, photoY + photoSize / 2, photoSize / 2 + 6, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = '#f97316';
    context.font = '700 42px Syne, Inter, sans-serif';
    drawWrappedText(context, payload.headline.toUpperCase(), 520, 500, 486, 54, 3);

    context.fillStyle = '#d1d5db';
    context.font = '600 28px Inter, sans-serif';
    drawWrappedText(context, WORKSHOP_DATE, 520, 650, 486, 42, 2);
    drawWrappedText(context, WORKSHOP_TIME, 520, 702, 486, 42, 2);
    drawWrappedText(context, WORKSHOP_MODE, 520, 754, 486, 42, 2);

    context.textAlign = 'center';
    context.fillStyle = '#ffffff';
    context.font = '800 52px Syne, Inter, sans-serif';
    drawWrappedText(context, payload.fullName, photoCenter, 920, 700, 60, 2);

    context.fillStyle = '#f97316';
    context.font = '700 30px Inter, sans-serif';
    drawWrappedText(context, payload.jobTitle, photoCenter, 1002, 700, 40, 2);

    context.fillStyle = '#d1d5db';
    context.font = '600 24px Inter, sans-serif';
    drawWrappedText(context, payload.company, photoCenter, 1055, 700, 36, 1);
    context.textAlign = 'start';

    context.fillStyle = '#9ca3af';
    context.font = '600 21px Inter, sans-serif';
    context.fillText('muhammedmekky.com/workshop', 70, 1048);

    return canvas.toDataURL('image/png');
}

function getFileExtension(file: File) {
    const inferredFromName = file.name.split('.').pop()?.toLowerCase();
    if (inferredFromName) return inferredFromName;
    const inferredFromType = file.type.split('/').pop()?.toLowerCase();
    return inferredFromType || 'jpg';
}

function toSafeFileName(name: string) {
    const cleaned = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return cleaned || 'attendee';
}

function buildFixedCaption(pageUrl: string) {
    return `I am attending ${WORKSHOP_TITLE} (${WORKSHOP_PRICE}) on ${WORKSHOP_DATE} at ${WORKSHOP_TIME}. If you want to learn how to build high converting Shopify stores step by step over 4 hours, join us: https://muhammedmekky.com/workshop #Shopify #Ecommerce #WebDesign`;
}

async function uploadPhotoToSupabase(file: File) {
    const supabase = createSupabaseClient();
    const fileExt = getFileExtension(file);
    let lastError = 'Unable to upload image.';

    for (const bucket of PHOTO_BUCKET_CANDIDATES) {
        const filePath = `workshop/profile-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const upload = await supabase.storage.from(bucket).upload(filePath, file, {
            upsert: false,
            cacheControl: '3600',
            contentType: file.type,
        });

        if (upload.error) {
            lastError = upload.error.message || lastError;
            continue;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        if (data?.publicUrl) {
            return data.publicUrl;
        }
    }

    throw new Error(lastError);
}

function buildServerPosterUrl(payload: PosterPayload, photoUrl: string) {
    const params = new URLSearchParams();
    params.set('template', POSTER_TEMPLATE_ID);
    params.set('name', payload.fullName);
    params.set('title', payload.jobTitle);
    params.set('company', payload.company);
    params.set('headline', payload.headline);
    params.set('date', WORKSHOP_DATE);
    params.set('time', WORKSHOP_TIME);
    params.set('mode', WORKSHOP_MODE);
    params.set('workshop', WORKSHOP_SHORT_TITLE);
    params.set('subtitle', WORKSHOP_SUBTITLE);
    params.set('price', WORKSHOP_PRICE);
    params.set('photo', photoUrl);
    return `/api/og/workshop-share?${params.toString()}`;
}

function openDeepLink(primaryUrl: string, fallbackUrl: string) {
    const now = Date.now();
    window.location.href = primaryUrl;
    window.setTimeout(() => {
        if (Date.now() - now < 1400) {
            window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
        }
    }, 700);
}

export default function WorkshopLandingClient() {
    const [pageUrl, setPageUrl] = useState('https://muhammedmekky.com/workshop');
    const [formState, setFormState] = useState<WorkshopFormState>(initialFormState);
    const [photo, setPhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRenderingPoster, setIsRenderingPoster] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [canvasGeneratedOnce, setCanvasGeneratedOnce] = useState(false);
    const supabase = createSupabaseClient();

    // Marketing additions states
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = WORKSHOP_DATE_OBJ.getTime() - now;
            
            if (distance < 0) {
                clearInterval(interval);
                return;
            }
            
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const hasRequiredValues = useMemo(
        () =>
            Boolean(
                normalizeSpaces(formState.fullName) &&
                normalizeSpaces(formState.email) &&
                normalizeSpaces(formState.phone) &&
                normalizeSpaces(formState.jobTitle) &&
                normalizeSpaces(formState.company) &&
                photo
            ),
        [formState, photo]
    );

    const handleInputChange =
        (field: keyof WorkshopFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormState((previous) => ({ ...previous, [field]: event.target.value }));
        };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setError('');

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
        }

        if (!file) {
            setPhoto(null);
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            setError('Please upload an image smaller than 8 MB.');
            setPhoto(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('Only image files are supported.');
            setPhoto(null);
            return;
        }

        setPhoto(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const getPosterPublicUrl = () => {
        if (!canvasUrl) return '';
        if (canvasUrl.startsWith('http')) return canvasUrl;
        if (canvasUrl.startsWith('/')) {
            try {
                return `${new URL(pageUrl).origin}${canvasUrl}`;
            } catch {
                return canvasUrl;
            }
        }
        return '';
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!photo) {
            setError('Please upload your photo before registering.');
            return;
        }

        const fullName = normalizeSpaces(formState.fullName);
        const email = normalizeSpaces(formState.email);
        const phone = normalizeSpaces(formState.phone);
        const jobTitle = normalizeSpaces(formState.jobTitle);
        const company = normalizeSpaces(formState.company);

        setIsSubmitting(true);
        setError('');

        try {
            let uploadedPhotoUrl = '';
            try {
                uploadedPhotoUrl = await uploadPhotoToSupabase(photo);
            } catch (uploadError) {
                console.warn('Photo upload failed. Fallback to local poster rendering.', uploadError);
            }

            const response = await fetch('/api/workshop/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    phone,
                    jobTitle,
                    company,
                    headline: DEFAULT_POSTER_HEADLINE,
                    photoUrl: uploadedPhotoUrl || undefined,
                }),
            });

            const data = (await response.json()) as { error?: string; id?: string };
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed. Please try again.');
            }

            localStorage.setItem('workshop_name', fullName);
            localStorage.setItem('workshop_title', jobTitle);
            localStorage.setItem('workshop_company', company);
            localStorage.setItem('workshop_photo', uploadedPhotoUrl || '');

            if (data.id) {
                window.location.href = `/workshop/ticket/${data.id}`;
            } else {
                window.location.href = '/workshop/success';
            }
        } catch (submitError) {
            const errorMessage = submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.';
            setError(errorMessage);
            setIsSubmitting(false);
        }
    };

    const handleCopyFixedCaption = async () => {
        const caption = buildFixedCaption(pageUrl);
        await navigator.clipboard.writeText(caption);
    };

    const handleDownloadPoster = () => {
        if (!canvasUrl) return;
        const anchor = document.createElement('a');
        anchor.href = canvasUrl;
        anchor.download = `workshop-${toSafeFileName(formState.fullName)}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    };

    const shareWithNative = async () => {
        if (!canvasUrl) return;

        const caption = buildFixedCaption(pageUrl);
        try {
            const response = await fetch(canvasUrl);
            const blob = await response.blob();
            const file = new File([blob], `workshop-${toSafeFileName(formState.fullName)}.png`, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: WORKSHOP_TITLE,
                    text: caption,
                    files: [file],
                });
                return;
            }

            if (navigator.share) {
                await navigator.share({
                    title: WORKSHOP_TITLE,
                    text: caption,
                    url: getPosterPublicUrl() || pageUrl,
                });
            }
        } catch (shareError) {
            console.error('Native share failed:', shareError);
        }
    };

    const handleSharePlatform = (platform: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter') => {
        const caption = buildFixedCaption(pageUrl);
        const posterUrl = getPosterPublicUrl() || pageUrl;
        const textPlusUrl = `${caption}\n${posterUrl}`;

        if (platform === 'whatsapp') {
            openDeepLink(
                `whatsapp://send?text=${encodeURIComponent(textPlusUrl)}`,
                `https://wa.me/?text=${encodeURIComponent(textPlusUrl)}`
            );
            return;
        }

        if (platform === 'facebook') {
            openDeepLink(
                `fb://facewebmodal/f?href=${encodeURIComponent(posterUrl)}`,
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(posterUrl)}&quote=${encodeURIComponent(caption)}`
            );
            return;
        }

        if (platform === 'linkedin') {
            openDeepLink(
                `linkedin://shareArticle?mini=true&url=${encodeURIComponent(posterUrl)}&title=${encodeURIComponent(WORKSHOP_TITLE)}&summary=${encodeURIComponent(caption)}`,
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(posterUrl)}`
            );
            return;
        }

        openDeepLink(
            `twitter://post?message=${encodeURIComponent(textPlusUrl)}`,
            `https://x.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(posterUrl)}`
        );
    };

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroContent}>
                        <Link href="/" className={styles.backLink}>
                            Back to main site
                        </Link>
                        
                        <div className={styles.socialProofBadge}>
                            <span>⭐️⭐️⭐️⭐️⭐️</span>
                            <span>Trusted by <strong>2,000+</strong> ambitious builders</span>
                        </div>

                        <span className={styles.freeBadge}>{WORKSHOP_PRICE}</span>
                        <p className={styles.heroKicker}>Live Online Workshop</p>
                        <h1 className={styles.heroTitle}>{WORKSHOP_TITLE}</h1>
                        <p className={styles.heroLead}>
                            Join this intense +4 hours workshop and learn everything from searching for references to building landing pages, components, setting up pixel/CAPI/GA4, and advanced reporting.
                        </p>
                        <div className={styles.heroMeta}>
                            <span className={styles.heroMetaItem}>{WORKSHOP_DATE}</span>
                            <span className={styles.heroMetaItem}>{WORKSHOP_TIME}</span>
                            <span className={styles.heroMetaItem}>{WORKSHOP_MODE}</span>
                        </div>
                        
                        {mounted && (
                            <div className={styles.countdownContainer}>
                                <div className={styles.countdownBox}>
                                    <span className={styles.countdownNum}>{timeLeft.days}</span>
                                    <span className={styles.countdownLabel}>Days</span>
                                </div>
                                <div className={styles.countdownBox}>
                                    <span className={styles.countdownNum}>{timeLeft.hours}</span>
                                    <span className={styles.countdownLabel}>Hours</span>
                                </div>
                                <div className={styles.countdownBox}>
                                    <span className={styles.countdownNum}>{timeLeft.minutes}</span>
                                    <span className={styles.countdownLabel}>Mins</span>
                                </div>
                                <div className={styles.countdownBox}>
                                    <span className={styles.countdownNum}>{timeLeft.seconds}</span>
                                    <span className={styles.countdownLabel}>Secs</span>
                                </div>
                            </div>
                        )}

                        <p className={styles.heroNote}>No payment. No upsell. Just a focused technical session.</p>
                        <a href="#registration" className={styles.heroCta}>
                            Reserve my free seat
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.layout}>
                <aside className={styles.storyPanel}>
                    <h2 className={styles.panelTitle}>What we will cover</h2>
                    <p className={styles.storyLead}>
                        A complete A-Z guide over 4 hours on building professional Shopify stores.
                    </p>
                    <ul className={styles.bulletList}>
                        <li className={styles.bulletItem}>1. How to search for references</li>
                        <li className={styles.bulletItem}>2. Make the theme and components</li>
                        <li className={styles.bulletItem}>3. Setup pixel, capi, ga4</li>
                        <li className={styles.bulletItem}>4. Collections and pages</li>
                        <li className={styles.bulletItem}>5. Products & variants</li>
                        <li className={styles.bulletItem}>6. Landing pages</li>
                        <li className={styles.bulletItem}>7. Reporting & auditing</li>
                    </ul>

                    {/* Instructor Section */}
                    <div className={styles.instructorPanel}>
                        <img src="/images/hero.png" alt="Muhammed Mekky" className={styles.instructorImage} />
                        <div className={styles.instructorInfo}>
                            <h3>Muhammed Mekky</h3>
                            <span className={styles.instructorTitle}>Instructor & Founder</span>
                            <p>
                                I'm dedicated to empowering ambitious builders to craft world-class e-commerce experiences.
                                In this workshop, I'll share practical, battle-tested strategies from over a decade of hands-on experience in web design and technical development.
                            </p>
                        </div>
                    </div>

                    {/* Bonus Section */}
                    <div className={styles.bonusSection}>
                        <div className={styles.bonusIcon}>🎁</div>
                        <div className={styles.bonusContent}>
                            <h3 className={styles.bonusTitle}>Exclusive Bonus Included</h3>
                            <p className={styles.bonusDescription}>
                                Every attendee who registers and shows up to the live workshop will be eligible to claim a <strong>Free 1:1 Consultation Session (1 Hour)</strong> with me to solve their specific e-commerce & technical challenges.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className={styles.faqSection}>
                        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
                        <div className={styles.faqList}>
                            <div className={styles.faqItem}>
                                <h4 className={styles.faqQuestion}>Is this workshop really free?</h4>
                                <p className={styles.faqAnswer}>Yes, absolutely. There are no hidden costs, upsells, or premium tiers. Just 4 hours of pure technical deep-dives.</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4 className={styles.faqQuestion}>Do I need previous experience with Shopify?</h4>
                                <p className={styles.faqAnswer}>Having a basic understanding of e-commerce concepts helps, but we will walk you through the A-Z steps of building a high-converting store.</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4 className={styles.faqQuestion}>Will a recording be available?</h4>
                                <p className={styles.faqAnswer}>We highly recommend attending live so you can ask questions directly. A recording may be provided later for registered attendees only.</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4 className={styles.faqQuestion}>How long is the workshop?</h4>
                                <p className={styles.faqAnswer}>It is an intensive session that will run for over 4 hours. Make sure to bring your coffee!</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <form id="registration" className={styles.formPanel} onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Free workshop registration</h2>
                        <p className={styles.formSub}>Fill your details and upload your photo to generate your share poster instantly.</p>
                        <span className={styles.formFreeTag}>{WORKSHOP_PRICE}</span>
                    </div>

                    <div className={styles.formGrid}>
                        <label className={styles.field}>
                            <span className={styles.label}>Full name</span>
                            <input
                                value={formState.fullName}
                                onChange={handleInputChange('fullName')}
                                className={styles.input}
                                placeholder="John Doe"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Email</span>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={handleInputChange('email')}
                                className={styles.input}
                                placeholder="john@company.com"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Phone</span>
                            <input
                                value={formState.phone}
                                onChange={handleInputChange('phone')}
                                className={styles.input}
                                placeholder="+20 10 0000 0000"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.label}>Job title</span>
                            <input
                                value={formState.jobTitle}
                                onChange={handleInputChange('jobTitle')}
                                className={styles.input}
                                placeholder="Media Buyer / Performance Marketer"
                                required
                            />
                        </label>

                        <label className={`${styles.field} ${styles.fieldWide}`}>
                            <span className={styles.label}>Company</span>
                            <input
                                value={formState.company}
                                onChange={handleInputChange('company')}
                                className={styles.input}
                                placeholder="Company name"
                                required
                            />
                        </label>

                        <label className={`${styles.field} ${styles.fieldWide}`}>
                            <span className={styles.label}>Photo</span>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handlePhotoChange}
                                className={styles.fileInput}
                                required
                            />
                            <span className={styles.fileHint}>PNG, JPG, or WEBP. Maximum size 8 MB.</span>
                        </label>
                    </div>

                    {photo && previewUrl && (
                        <div className={styles.previewChip}>
                            <img src={previewUrl} alt="Selected preview" className={styles.previewThumb} />
                            <span>{photo.name}</span>
                        </div>
                    )}

                    {error && <p className={styles.statusError}>{error}</p>}

                    <button type="submit" className={styles.submitButton} disabled={isSubmitting || !hasRequiredValues}>
                        {isSubmitting ? 'Confirming your free seat...' : 'Reserve my free seat'}
                    </button>
                </form>
            </section>

            <section className={styles.insightsSection}>
                <h2 className={styles.sectionTitle}>Over 4 Hours of Practical Implementation</h2>
                <div className={styles.agendaGrid}>
                    {FOCUS_TOPICS.map((topic) => (
                        <article key={topic.title} className={styles.agendaCard}>
                            <div className={styles.agendaTop}>
                                <span className={styles.agendaEmoji}>{topic.emoji}</span>
                                <h3 className={styles.agendaTitle}>{topic.title}</h3>
                            </div>
                            <p className={styles.agendaLine}><strong>Pain:</strong> {topic.pain}</p>
                            <p className={styles.agendaLine}><strong>What you learn:</strong> {topic.takeaway}</p>
                            <p className={styles.agendaLine}><strong>Automation play:</strong> {topic.automation}</p>
                        </article>
                    ))}
                </div>

                <div className={styles.splitInfo}>
                    <article className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>Who should attend</h3>
                        <ul className={styles.infoList}>
                            {WHO_SHOULD_ATTEND.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </article>

                    <article className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>What you leave with</h3>
                        <ul className={styles.infoList}>
                            {WORKSHOP_OUTCOMES.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            {/* Success panel redirect handled in submit */}
        </main>
    );
}
