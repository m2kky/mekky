'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../CareerPage.module.css';

const IconCheckCircle = () => (
    <svg className={styles.thankYouIconSvg} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 24l7 7 13-15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function CareerThankYouPage() {
    const [name, setName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setName(localStorage.getItem('career_applicant_name') || '');
        }
    }, []);

    return (
        <main className={styles.thankYouPage}>
            <div className={styles.thankYouCard}>
                <div className={styles.thankYouIconWrap}>
                    <IconCheckCircle />
                </div>

                <h1 className={styles.thankYouTitle}>APPLICATION RECEIVED</h1>

                <p className={styles.thankYouText}>
                    {name ? (
                        <>Thanks <span className={styles.thankYouName}>{name}</span>! </>
                    ) : (
                        <>Thanks for applying! </>
                    )}
                    Your application has been submitted successfully. We review every application personally and will reach out to you soon.
                </p>

                <div className={styles.thankYouSteps}>
                    <span className={styles.thankYouStepsTitle}>What happens next?</span>
                    <div className={styles.thankYouStep}>
                        <span className={styles.stepNumber}>1</span>
                        <span>Check your email for a confirmation message from us.</span>
                    </div>
                    <div className={styles.thankYouStep}>
                        <span className={styles.stepNumber}>2</span>
                        <span>We will review your application and CV within 48 hours.</span>
                    </div>
                    <div className={styles.thankYouStep}>
                        <span className={styles.stepNumber}>3</span>
                        <span>If shortlisted, we will contact you via WhatsApp or email to schedule a quick call.</span>
                    </div>
                </div>

                <Link href="/" className={styles.thankYouBackLink}>
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}
