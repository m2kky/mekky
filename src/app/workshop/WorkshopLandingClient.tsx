'use client';
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './WorkshopLanding.module.css';

const COURSE_TITLE = 'The Shopify Architect';
const HERO_HEADLINE = 'Build a high-end Shopify ecosystem that scales on data, not guesswork.';
const HERO_SUBHEAD =
    'This program takes you from store architecture and conversion systems to analytics clarity, AI strategy, and full automation.';
const PRIMARY_CTA = 'Enroll Now';

const VALUE_POINTS = [
    {
        title: 'Profit Clarity',
        description: 'Connect Shopify and ad data to measure real margin and make scaling decisions with confidence.',
    },
    {
        title: 'Conversion Systems',
        description: 'Design landing and funnel layers that improve conversion quality, not only traffic volume.',
    },
    {
        title: 'AI Strategic Layer',
        description: 'Use AI as an operator that analyzes data patterns and recommends practical growth actions.',
    },
    {
        title: 'Execution Speed',
        description: 'Automate operations with n8n so campaigns, fulfillment, and customer journeys move faster.',
    },
];

const PROGRAM_MODULES = [
    {
        number: 1,
        title: 'Elite Branding & Store Architecture',
        description:
            'Beyond templates: craft custom, high-converting store experiences that reflect your brand identity.',
    },
    {
        number: 2,
        title: 'High-Conversion Landing Pages',
        description: 'Build specialized landing pages designed specifically for performance and maximum conversion.',
    },
    {
        number: 3,
        title: 'Vibe Coding & AI Integration',
        description: 'Leverage AI to build custom apps and features for your store without manual coding.',
    },
    {
        number: 4,
        title: "The Architect's Dashboard (Data & Analytics)",
        description: 'Use Python and SQL to visualize true profit metrics and scale based on data.',
    },
    {
        number: 5,
        title: 'Meta App Development & Data Integration',
        description:
            'Build custom Meta apps that sync cleanly with Shopify to remove tracking noise and improve ad decisions.',
    },
    {
        number: 6,
        title: 'AI-Driven Strategic Layer',
        description: 'Integrate an AI layer that analyzes Meta and Shopify data in real time and guides growth.',
    },
    {
        number: 7,
        title: 'The Automation Engine',
        description: 'Use n8n to automate marketing, order fulfillment, and customer journeys end to end.',
    },
    {
        number: 8,
        title: 'Advanced Growth Hacks',
        description: 'Apply advanced ad scaling, precision tracking, and proprietary market-dominance strategies.',
    },
];

const TESTIMONIALS = [
    {
        quote:
            'The biggest shift for me was attribution clarity. I finally understood what was profitable and what to kill fast.',
        name: 'Ahmed N.',
        role: 'Performance Marketer',
    },
    {
        quote: 'The automation module saved us hours weekly. Team execution became cleaner and much faster.',
        name: 'Mariam S.',
        role: 'Ecommerce Manager',
    },
    {
        quote: 'After applying the architecture model, conversion quality improved and our scaling became safer.',
        name: 'Youssef K.',
        role: 'Media Buyer',
    },
];

const TRUST_BADGES = ['Trusted by 500+ Students', 'Used by DTC Teams', 'Data-First Framework', 'Live Practical Delivery'];

type EnrollmentForm = {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    company: string;
    headline: string;
};

const initialForm: EnrollmentForm = {
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    headline: 'I am joining',
};

function normalize(value: string) {
    return value.replace(/\s+/g, ' ').trim();
}

function normalizePhone(value: string) {
    return value.replace(/\D/g, '');
}

async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/workshop/upload-photo', {
        method: 'POST',
        body: formData,
    });

    const result = (await response.json()) as { publicUrl?: string; error?: string };

    if (!response.ok || !result.publicUrl) {
        throw new Error(result.error || 'Photo upload failed.');
    }

    return result.publicUrl;
}

export default function WorkshopLandingClient() {
    const searchParams = useSearchParams();

    const [form, setForm] = useState<EnrollmentForm>(initialForm);
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'failed') {
            setError('Payment was not completed. Please try again.');
        }
    }, [searchParams]);

    useEffect(() => {
        return () => {
            if (photoPreviewUrl) {
                URL.revokeObjectURL(photoPreviewUrl);
            }
        };
    }, [photoPreviewUrl]);

    const canSubmit = useMemo(() => {
        const fullName = normalize(form.fullName);
        const email = normalize(form.email);
        const phone = normalizePhone(form.phone);
        const jobTitle = normalize(form.jobTitle);
        const company = normalize(form.company);

        return Boolean(fullName && email && phone && jobTitle && company && selectedPhoto);
    }, [form, selectedPhoto]);

    const handleChange = (field: keyof EnrollmentForm) => (event: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setError('');
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
            setPhotoPreviewUrl('');
        }

        if (!file) {
            setSelectedPhoto(null);
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            setError('Please upload an image smaller than 8 MB.');
            setSelectedPhoto(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('Only image files are supported.');
            setSelectedPhoto(null);
            return;
        }

        setSelectedPhoto(file);
        setPhotoPreviewUrl(URL.createObjectURL(file));
        setError('');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedPhoto) {
            setError('Please upload your photo.');
            return;
        }

        const fullName = normalize(form.fullName);
        const email = normalize(form.email);
        const phone = normalizePhone(form.phone);
        const jobTitle = normalize(form.jobTitle);
        const company = normalize(form.company);
        const headline = normalize(form.headline) || 'I am joining';

        if (!fullName || !email || !phone || !jobTitle || !company) {
            setError('Please complete all required fields.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const photoUrl = await uploadPhoto(selectedPhoto);

            const response = await fetch('/api/workshop/paymob/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    jobTitle,
                    company,
                    headline,
                    photoUrl,
                    painPoint: 'Enrollment from Shopify Architect landing page',
                }),
            });

            const result = (await response.json()) as {
                success?: boolean;
                paymentUrl?: string;
                error?: string;
            };

            if (!response.ok || !result.paymentUrl) {
                throw new Error(result.error || 'Unable to initialize payment.');
            }

            window.location.href = result.paymentUrl;
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : 'Unable to continue to payment.';
            setError(message);
            setIsSubmitting(false);
        }
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoWrap}>
                    <span className={styles.logoMark}>MM</span>
                    <span className={styles.logoText}>{COURSE_TITLE}</span>
                </div>
            </header>

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <p className={styles.heroKicker}>Flagship Program</p>
                    <h1 className={styles.heroHeadline}>{HERO_HEADLINE}</h1>
                    <h2 className={styles.heroSubhead}>{HERO_SUBHEAD}</h2>
                    <a href="#enroll" className={styles.primaryCta}>
                        {PRIMARY_CTA}
                    </a>
                </div>

                <div className={styles.heroMedia}>
                    <div className={styles.videoFrame}>
                        <div className={styles.videoLabel}>Course Intro Video</div>
                        <div className={styles.videoOverlay}>
                            <button type="button" className={styles.playButton}>
                                Play Preview
                            </button>
                        </div>
                    </div>
                    <p className={styles.videoHint}>Replace this block with your Vimeo or YouTube embed.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What You Get</h2>
                <p className={styles.sectionIntro}>Immediate outcomes focused on growth, margin, and execution speed.</p>
                <div className={styles.valueGrid}>
                    {VALUE_POINTS.map((point) => (
                        <article key={point.title} className={styles.valueItem}>
                            <h3>{point.title}</h3>
                            <p>{point.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Program Modules</h2>
                <p className={styles.sectionIntro}>The full 8-module roadmap inside The Shopify Architect.</p>
                <div className={styles.modulesGrid}>
                    {PROGRAM_MODULES.map((module) => (
                        <article key={module.number} className={styles.moduleCard}>
                            <span className={styles.moduleNumber}>{module.number}</span>
                            <h3 className={styles.moduleTitle}>{module.title}</h3>
                            <p className={styles.moduleDesc}>{module.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Social Proof</h2>
                <div className={styles.proofGrid}>
                    {TESTIMONIALS.map((item) => (
                        <article key={item.name} className={styles.testimonialCard}>
                            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
                            <div className={styles.author}>
                                <strong>{item.name}</strong>
                                <span>{item.role}</span>
                            </div>
                        </article>
                    ))}
                </div>
                <div className={styles.logosRow}>
                    {TRUST_BADGES.map((badge) => (
                        <span key={badge} className={styles.logoChip}>
                            {badge}
                        </span>
                    ))}
                </div>
            </section>

            <section className={styles.enrollSection} id="enroll">
                <div className={styles.enrollPanel}>
                    <div className={styles.enrollTop}>
                        <h2 className={styles.enrollTitle}>Enroll in {COURSE_TITLE}</h2>
                        <p className={styles.enrollSub}>Fill your basic info first, then continue to secure Paymob checkout.</p>
                    </div>

                    <form className={styles.enrollForm} onSubmit={handleSubmit}>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Name</span>
                            <input
                                className={styles.input}
                                value={form.fullName}
                                onChange={handleChange('fullName')}
                                placeholder="Your full name"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Email</span>
                            <input
                                className={styles.input}
                                type="email"
                                value={form.email}
                                onChange={handleChange('email')}
                                placeholder="you@company.com"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Phone</span>
                            <input
                                className={styles.input}
                                value={form.phone}
                                onChange={handleChange('phone')}
                                placeholder="+20 10 0000 0000"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Job Title</span>
                            <input
                                className={styles.input}
                                value={form.jobTitle}
                                onChange={handleChange('jobTitle')}
                                placeholder="Media Buyer"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Company</span>
                            <input
                                className={styles.input}
                                value={form.company}
                                onChange={handleChange('company')}
                                placeholder="Company name"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Poster Headline</span>
                            <input
                                className={styles.input}
                                value={form.headline}
                                onChange={handleChange('headline')}
                                placeholder="I am joining"
                            />
                        </label>

                        <label className={`${styles.field} ${styles.fieldWide}`}>
                            <span className={styles.fieldLabel}>Your Photo</span>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className={styles.fileInput}
                                onChange={handlePhotoChange}
                                required
                            />
                        </label>

                        {selectedPhoto && photoPreviewUrl ? (
                            <div className={styles.previewChip}>
                                <img src={photoPreviewUrl} alt="Selected" className={styles.previewThumb} />
                                <span>{selectedPhoto.name}</span>
                            </div>
                        ) : null}

                        <p className={styles.secureNote}>
                            After payment confirmation, your personalized design will be generated automatically.
                        </p>

                        {error ? <p className={styles.errorText}>{error}</p> : null}

                        <button className={styles.secondaryCta} type="submit" disabled={isSubmitting || !canSubmit}>
                            {isSubmitting ? 'Redirecting to payment...' : 'Continue to secure payment'}
                        </button>
                    </form>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.guaranteeBadge}>30-Day Money-Back Guarantee</div>
                <div className={styles.legalLinks}>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>
        </main>
    );
}
