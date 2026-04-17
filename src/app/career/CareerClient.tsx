'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { submitCareerApplication } from '../api/career/actions';
import styles from './CareerPage.module.css';
import gsap from 'gsap';

/* ── Inline SVG Illustrations ────────────────────── */
const IconAI = () => (
    <svg className={styles.trackIconSvg} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="40" height="32" rx="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M18 30c0-2 2.7-4 6-4s6 2 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 4v4M16 4l1 4M32 4l-1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconAutomation = () => (
    <svg className={styles.trackIconSvg} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M15 22l18-6M15 26l18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 24l-2-2 2-2 2 2-2 2z" fill="currentColor" />
    </svg>
);

const IconVibeCoding = () => (
    <svg className={styles.trackIconSvg} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 14h36" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        <circle cx="17" cy="10" r="1.5" fill="currentColor" />
        <circle cx="22" cy="10" r="1.5" fill="currentColor" />
        <path d="M14 22l-4 4 4 4M26 22l4 4-4 4M21 20l-2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 38h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 34v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconCheck = () => (
    <svg className={styles.perkIconSvg} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconUpload = () => (
    <svg className={styles.uploadIconSvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconFile = () => (
    <svg className={styles.uploadIconSvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function CareerClient() {
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvUploading, setCvUploading] = useState(false);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            if (badgeRef.current) {
                tl.from(badgeRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }

            const chars = headlineRef.current?.querySelectorAll(`.${styles.char}`);
            if (chars) {
                tl.from(chars, {
                    y: 100,
                    opacity: 0,
                    rotateX: -45,
                    duration: 1,
                    stagger: 0.02,
                    ease: "power4.out"
                }, "-=0.4");
            }

            tl.from([infoRef.current, formRef.current], {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.5");
        });

        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className={styles.char}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    async function uploadCV(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/career/upload-cv', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(err.error || 'CV upload failed');
        }

        const data = await res.json();
        return data.publicUrl;
    }

    function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Max 10MB
        if (file.size > 10 * 1024 * 1024) {
            setErrorMsg('CV file must be smaller than 10 MB.');
            setStatus('error');
            return;
        }

        // Only accept PDF, DOC, DOCX
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) {
            setErrorMsg('Please upload a PDF or Word document.');
            setStatus('error');
            return;
        }

        setCvFile(file);
        setErrorMsg('');
        setStatus('idle');
    }

    async function clientAction(formData: FormData) {
        setStatus("loading");
        setErrorMsg("");

        if (!cvFile) {
            setStatus("error");
            setErrorMsg("Please upload your CV.");
            return;
        }

        try {
            // Step 1: Upload CV
            setCvUploading(true);
            let cvUrl: string;
            try {
                cvUrl = await uploadCV(cvFile);
            } catch {
                setStatus("error");
                setErrorMsg("Failed to upload CV. Please try again.");
                setCvUploading(false);
                return;
            }
            setCvUploading(false);

            // Step 2: Submit form with CV URL
            formData.append('cv_url', cvUrl);
            const res = await submitCareerApplication(formData);
            if (res?.error) {
                setStatus("error");
                setErrorMsg(res.error);
                return;
            }

            // Step 3: Store name for the thank-you page
            const name = formData.get('name') as string;
            if (typeof window !== 'undefined') {
                localStorage.setItem('career_applicant_name', name || 'there');
            }

            // Redirect to thank-you page
            router.push('/career/thank-you');
        } catch {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    }

    const tracks = [
        {
            icon: <IconAI />,
            title: 'AI & Prompt Engineering',
            desc: 'Master ChatGPT, build AI agents, create intelligent workflows, and learn prompt engineering from scratch to production.',
        },
        {
            icon: <IconAutomation />,
            title: 'Automation & No-Code',
            desc: 'Build real automation systems using n8n, Zapier, and custom integrations that run businesses on autopilot.',
        },
        {
            icon: <IconVibeCoding />,
            title: 'Vibe Coding',
            desc: 'Ship full-stack web apps using AI-assisted coding. Think less syntax, more shipping — Next.js, APIs, and deployment.',
        },
    ];

    const perks = [
        'Real-world projects, not tutorials',
        'Certificate of completion',
        '1-on-1 mentorship with Mekky',
        'Portfolio-ready work',
        'Fully remote — work from anywhere',
    ];

    return (
        <main className={styles.page}>
            <section className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.headerArea}>
                        <div ref={badgeRef} className={styles.badge}>
                            <span className={styles.badgeDot} />
                            Applications Open
                        </div>
                        <h1 ref={headlineRef} className={styles.headline}>
                            <span className={styles.lineWrapper}>
                                {splitText("TRAIN WITH")}
                            </span>
                            <span className={`${styles.lineWrapper} ${styles.highlight}`}>
                                {splitText("MEKKY")}
                            </span>
                        </h1>
                        <p className={styles.subtitle}>
                            Apply for an internship in AI, Automation, and Vibe Coding.
                            Real projects. Real mentorship. Real results.
                        </p>
                    </div>

                    <div className={styles.contentWrapper}>
                        {/* Track Cards */}
                        <div ref={infoRef} className={styles.infoSide}>
                            <span className={styles.sectionLabel}>Training Tracks</span>
                            {tracks.map((t) => (
                                <div key={t.title} className={styles.trackCard}>
                                    <span className={styles.trackIcon}>{t.icon}</span>
                                    <h3 className={styles.trackTitle}>{t.title}</h3>
                                    <p className={styles.trackDesc}>{t.desc}</p>
                                </div>
                            ))}

                            <div className={styles.perksSection}>
                                <span className={styles.sectionLabel}>What You Get</span>
                                <div className={styles.perksList}>
                                    {perks.map((p) => (
                                        <div key={p} className={styles.perkItem}>
                                            <IconCheck />
                                            <span>{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* About the Mentor */}
                            <div className={styles.mentorSection}>
                                <span className={styles.sectionLabel}>Your Mentor</span>
                                <div className={styles.mentorCard}>
                                    <div className={styles.mentorHeader}>
                                        <Image
                                            src="/images/mekky.png"
                                            alt="Muhammed Mekky"
                                            width={64}
                                            height={64}
                                            className={styles.mentorAvatar}
                                        />
                                        <div className={styles.mentorHeaderText}>
                                            <span className={styles.mentorName}>Muhammed Mekky</span>
                                            <span className={styles.mentorRole}>Marketing Automation Strategist</span>
                                        </div>
                                    </div>
                                    <p className={styles.mentorBio}>
                                        A marketing automation strategist and performance trainer with 7+ years of experience helping businesses scale with AI, automation, and modern web systems. Based in Egypt, working globally — I train ambitious teams and individuals to build systems that actually work.
                                    </p>
                                    <div className={styles.mentorStats}>
                                        <div className={styles.mentorStat}>
                                            <span className={styles.mentorStatNumber}>7+</span>
                                            <span className={styles.mentorStatLabel}>Years Exp.</span>
                                        </div>
                                        <div className={styles.mentorStat}>
                                            <span className={styles.mentorStatNumber}>50+</span>
                                            <span className={styles.mentorStatLabel}>Workshops</span>
                                        </div>
                                        <div className={styles.mentorStat}>
                                            <span className={styles.mentorStatNumber}>2000+</span>
                                            <span className={styles.mentorStatLabel}>Trained</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div ref={formRef} className={styles.formSide}>
                            <h2 className={styles.formTitle}>Apply Now</h2>
                            <p className={styles.formSubtitle}>Fill in your details and upload your CV to apply.</p>
                            <form action={clientAction} className={styles.form}>
                                {/* ── Basic Info ── */}
                                <div className={styles.formSectionHeader}>Personal Information</div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Ahmed Mohamed"
                                            required
                                            className={styles.input}
                                            id="career-name"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            required
                                            className={styles.input}
                                            id="career-email"
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Phone / WhatsApp *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+20 xxx xxx xxxx"
                                            required
                                            className={styles.input}
                                            id="career-phone"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Age *</label>
                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="e.g. 22"
                                            required
                                            min={16}
                                            max={60}
                                            className={styles.input}
                                            id="career-age"
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="e.g. Cairo"
                                            required
                                            className={styles.input}
                                            id="career-city"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>University / Current Role *</label>
                                        <input
                                            type="text"
                                            name="university"
                                            placeholder="e.g. Cairo University / Freelancer"
                                            required
                                            className={styles.input}
                                            id="career-university"
                                        />
                                    </div>
                                </div>

                                {/* ── Track & Experience ── */}
                                <div className={styles.formSectionHeader}>Experience & Track</div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Track *</label>
                                        <select
                                            name="track"
                                            required
                                            className={styles.select}
                                            defaultValue=""
                                            id="career-track"
                                        >
                                            <option value="" disabled>Select a track</option>
                                            <option value="ai">AI & Prompt Engineering</option>
                                            <option value="automation">Automation & No-Code</option>
                                            <option value="vibe_coding">Vibe Coding</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Experience Level *</label>
                                        <select
                                            name="experience_level"
                                            required
                                            className={styles.select}
                                            defaultValue=""
                                            id="career-experience"
                                        >
                                            <option value="" disabled>Select level</option>
                                            <option value="beginner">Beginner — Just starting out</option>
                                            <option value="intermediate">Intermediate — Some experience</option>
                                            <option value="advanced">Advanced — Confident & building</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>Hours per week you can commit *</label>
                                    <select
                                        name="weekly_hours"
                                        required
                                        className={styles.select}
                                        defaultValue=""
                                        id="career-hours"
                                    >
                                        <option value="" disabled>Select availability</option>
                                        <option value="10-15">10–15 hours/week</option>
                                        <option value="15-25">15–25 hours/week</option>
                                        <option value="25-40">25–40 hours/week (Full-time)</option>
                                    </select>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>LinkedIn / Portfolio (optional)</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        placeholder="https://..."
                                        className={styles.input}
                                        id="career-portfolio"
                                    />
                                </div>

                                {/* ── CV Upload ── */}
                                <div className={styles.formSectionHeader}>Resume / CV</div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>Upload your CV * (PDF or Word, max 10MB)</label>
                                    <label htmlFor="career-cv" className={styles.uploadArea}>
                                        {cvFile ? (
                                            <div className={styles.uploadFileInfo}>
                                                <IconFile />
                                                <div>
                                                    <span className={styles.uploadFileName}>{cvFile.name}</span>
                                                    <span className={styles.uploadFileSize}>
                                                        {(cvFile.size / (1024 * 1024)).toFixed(1)} MB
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.uploadPlaceholder}>
                                                <IconUpload />
                                                <span>Click to upload or drag & drop</span>
                                                <span className={styles.uploadHint}>PDF, DOC, DOCX — Max 10MB</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="career-cv"
                                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={handleCvChange}
                                            className={styles.fileInput}
                                        />
                                    </label>
                                </div>

                                {/* ── Motivation ── */}
                                <div className={styles.formSectionHeader}>Tell Us About Yourself</div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>Why do you want to join this internship? *</label>
                                    <textarea
                                        name="motivation"
                                        placeholder="What excites you about this opportunity? What do you hope to learn?"
                                        rows={3}
                                        required
                                        className={styles.textarea}
                                        id="career-motivation"
                                    ></textarea>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>What tools or technologies have you used before? *</label>
                                    <textarea
                                        name="tools_used"
                                        placeholder="e.g. ChatGPT, Python, Notion, Zapier, Figma, React..."
                                        rows={2}
                                        required
                                        className={styles.textarea}
                                        id="career-tools"
                                    ></textarea>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>Share a link to something you built or worked on (optional)</label>
                                    <input
                                        type="url"
                                        name="project_link"
                                        placeholder="https://..."
                                        className={styles.input}
                                        id="career-project"
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>How did you hear about us? *</label>
                                    <select
                                        name="referral_source"
                                        required
                                        className={styles.select}
                                        defaultValue=""
                                        id="career-referral"
                                    >
                                        <option value="" disabled>Select one</option>
                                        <option value="social_media">Social Media</option>
                                        <option value="friend">Friend / Colleague</option>
                                        <option value="website">Mekky&apos;s Website</option>
                                        <option value="workshop">Attended a Workshop</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={styles.submitBtn}
                                    id="career-submit"
                                >
                                    {cvUploading
                                        ? "UPLOADING CV..."
                                        : status === "loading"
                                            ? "SUBMITTING..."
                                            : "SUBMIT APPLICATION"
                                    }
                                </button>

                                {status === "error" && <p className={styles.errorText}>{errorMsg}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
