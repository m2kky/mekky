'use client';

import { useState } from 'react';
import { submitContactForm } from '../api/contact/actions';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function clientAction(formData: FormData) {
        setStatus("loading");
        const res = await submitContactForm(formData);
        if (res?.error) {
            setStatus("error");
            setErrorMsg(res.error);
            return;
        }
        setStatus("success");
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Let's Build <span>Together</span></h1>
                    <p className={styles.subtitle}>
                        Have a project in mind, a question about my work, or just want to say hi?
                        Drop me a message and I'll get back to you inside 24 hours.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.formBlock}>
                        <h2 className={styles.blockTitle}>Send a Message</h2>
                        <form action={clientAction} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <input type="text" name="name" placeholder="Your Name" required className={styles.input} />
                            </div>

                            <div className={styles.inputGroup}>
                                <input type="email" name="email" placeholder="Your Email" required className={styles.input} />
                            </div>

                            <div className={styles.inputGroup}>
                                <textarea name="message" placeholder="How can I help you?" rows={4} required className={styles.textarea}></textarea>
                            </div>

                            <button type="submit" disabled={status === 'loading' || status === 'success'} className={styles.submitButton}>
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Message'}
                            </button>
                            {status === 'error' && <p className={styles.errorText}>{errorMsg}</p>}
                        </form>
                    </div>

                    <div className={styles.infoBlock}>
                        <h2 className={styles.blockTitle}>Direct Contact</h2>
                        <div className={styles.contactItem}>
                            <h3>Email</h3>
                            <p><a href="mailto:hello@muhammedmekky.com">hello@muhammedmekky.com</a></p>
                        </div>
                        <div className={styles.contactItem}>
                            <h3>Network</h3>
                            <div className={styles.socialFlow}>
                                <a href="https://x.com/m2kky" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                                <a href="https://linkedin.com/in/m2kky" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/m2kky" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
