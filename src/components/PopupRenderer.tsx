'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PopupStyles.module.css';

// ─── Types ──────────────────────────────────────

interface PopupField {
    id: string;
    field_type: string;
    label: string;
    placeholder: string;
    is_required: boolean;
    options: string[];
    sort_order: number;
}

interface Popup {
    id: string;
    style: string;
    heading: string;
    description: string;
    button_text: string;
    success_message: string;
    bg_color: string;
    text_color: string;
    accent_color: string;
    border_color: string;
    overlay_color: string;
    btn_text_color: string;
    image_url: string;
    trigger_type: string;
    trigger_value: string;
    show_on_pages: string[];
    show_once: boolean;
    popup_fields: PopupField[];
}

// ─── Animation Variants ─────────────────────────

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const getPopupVariants = (style: string) => {
    switch (style) {
        case 'slide_in':
            return {
                hidden: { x: '100%' },
                visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
                exit: { x: '100%', transition: { duration: 0.3 } },
            };
        case 'bottom_bar':
            return {
                hidden: { y: '100%' },
                visible: { y: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
                exit: { y: '100%', transition: { duration: 0.25 } },
            };
        case 'fullscreen':
            return {
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
            };
        case 'corner_card':
            return {
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } },
                exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } },
            };
        default: // modal
            return {
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
                exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
            };
    }
};

// ─── Component ──────────────────────────────────

export default function PopupRenderer() {
    const pathname = usePathname();
    const [popups, setPopups] = useState<Popup[]>([]);
    const [activePopup, setActivePopup] = useState<Popup | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const exitIntentRef = useRef(false);

    // Skip on admin pages
    const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    // ─── Fetch Popups ───────────────────────────
    useEffect(() => {
        if (isAdmin) return;

        const fetchPopups = async () => {
            try {
                const res = await fetch('/api/popups');
                const data = await res.json();
                setPopups(data.popups || []);
            } catch {
                // Silently fail — popups are non-critical
            }
        };

        fetchPopups();
    }, [isAdmin]);

    // ─── Check Page Match ───────────────────────
    const matchesPage = useCallback((popup: Popup) => {
        if (!popup.show_on_pages || popup.show_on_pages.length === 0) return true;
        if (popup.show_on_pages.includes('*')) return true;
        return popup.show_on_pages.some(page =>
            pathname === page || pathname?.startsWith(page + '/')
        );
    }, [pathname]);

    // ─── Check localStorage ─────────────────────
    const wasDismissed = useCallback((popupId: string) => {
        try {
            const dismissed = localStorage.getItem(`popup_dismissed_${popupId}`);
            return !!dismissed;
        } catch {
            return false;
        }
    }, []);

    const markDismissed = useCallback((popupId: string) => {
        try {
            localStorage.setItem(`popup_dismissed_${popupId}`, 'true');
        } catch {
            // localStorage not available
        }
    }, []);

    // ─── Trigger Logic ──────────────────────────
    useEffect(() => {
        if (isAdmin || popups.length === 0 || activePopup) return;

        const eligiblePopups = popups.filter(p =>
            matchesPage(p) && (!p.show_once || !wasDismissed(p.id))
        );

        if (eligiblePopups.length === 0) return;

        const popup = eligiblePopups[0]; // Show first eligible popup

        // Page Load trigger
        if (popup.trigger_type === 'page_load') {
            const delay = parseInt(popup.trigger_value) || 3;
            const timer = setTimeout(() => {
                setActivePopup(popup);
                setFormData({});
                setIsSubmitted(false);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }

        // Scroll trigger
        if (popup.trigger_type === 'scroll') {
            const percentage = parseInt(popup.trigger_value) || 50;
            const handleScroll = () => {
                const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                if (scrollPercent >= percentage) {
                    setActivePopup(popup);
                    setFormData({});
                    setIsSubmitted(false);
                    window.removeEventListener('scroll', handleScroll);
                }
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }

        // Exit Intent trigger
        if (popup.trigger_type === 'exit_intent') {
            const handleMouseLeave = (e: MouseEvent) => {
                if (e.clientY <= 0 && !exitIntentRef.current) {
                    exitIntentRef.current = true;
                    setActivePopup(popup);
                    setFormData({});
                    setIsSubmitted(false);
                }
            };
            document.addEventListener('mouseleave', handleMouseLeave);
            return () => document.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [isAdmin, popups, activePopup, matchesPage, wasDismissed]);

    // ─── Close Handler ──────────────────────────
    const handleClose = () => {
        if (activePopup?.show_once) {
            markDismissed(activePopup.id);
        }
        setActivePopup(null);
        setFormData({});
        setIsSubmitted(false);
        exitIntentRef.current = false;
    };

    // ─── Submit Handler ─────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePopup || isSubmitting) return;

        // Validate required fields
        for (const field of activePopup.popup_fields) {
            if (field.is_required && !formData[field.label]?.trim()) {
                return; // HTML5 validation should catch this, but just in case
            }
        }

        setIsSubmitting(true);
        try {
            await fetch('/api/popups/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    popup_id: activePopup.id,
                    data: formData,
                    page_url: pathname,
                }),
            });
            setIsSubmitted(true);
            if (activePopup.show_once) {
                markDismissed(activePopup.id);
            }
            // Auto-close after success
            setTimeout(() => handleClose(), 3000);
        } catch {
            // Fail silently
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Field Change Handler ───────────────────
    const handleFieldChange = (label: string, value: string) => {
        setFormData(prev => ({ ...prev, [label]: value }));
    };

    // ─── Don't render on admin ──────────────────
    if (isAdmin) return null;

    // ─── Render ─────────────────────────────────
    const popup = activePopup;
    const hasOverlay = popup?.style === 'modal' || popup?.style === 'slide_in' || popup?.style === 'fullscreen';

    return (
        <AnimatePresence>
            {popup && (
                <div className={`${styles.popupWrapper} ${styles[`wrapper_${popup.style}`]}`}>
                    {/* Backdrop overlay */}
                    {hasOverlay && (
                        <motion.div
                            className={styles.overlay}
                            style={{ background: popup.overlay_color || 'rgba(0,0,0,0.6)' }}
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={handleClose}
                        />
                    )}

                    {/* Popup Card */}
                    <motion.div
                        className={`${styles.popup} ${styles[`popup_${popup.style}`]}`}
                        style={{
                            backgroundColor: popup.bg_color,
                            color: popup.text_color,
                            borderColor: popup.border_color || `${popup.accent_color}33`,
                        }}
                        variants={getPopupVariants(popup.style)}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Close button */}
                        <button
                            className={styles.closeBtn}
                            onClick={handleClose}
                            style={{ color: popup.text_color }}
                            aria-label="Close popup"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Image */}
                        {popup.image_url && (
                            <div className={styles.imageWrapper}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={popup.image_url} alt="" className={styles.image} />
                            </div>
                        )}

                        {/* Content */}
                        <div className={styles.content}>
                            {isSubmitted ? (
                                /* ── Success State ── */
                                <div className={styles.successState}>
                                    <div className={styles.successIcon} style={{ color: popup.accent_color }}>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </div>
                                    <p className={styles.successMsg} style={{ color: popup.text_color }}>
                                        {popup.success_message}
                                    </p>
                                </div>
                            ) : (
                                /* ── Form State ── */
                                <>
                                    {popup.heading && (
                                        <h2 className={styles.heading} style={{ color: popup.text_color }}>
                                            {popup.heading}
                                        </h2>
                                    )}
                                    {popup.description && (
                                        <p className={styles.description} style={{ color: `${popup.text_color}bb` }}>
                                            {popup.description}
                                        </p>
                                    )}

                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        {popup.popup_fields.map((field) => (
                                            <div key={field.id} className={styles.fieldGroup}>
                                                {field.field_type === 'checkbox' ? (
                                                    <label className={styles.checkboxLabel} style={{ color: `${popup.text_color}cc` }}>
                                                        <input
                                                            type="checkbox"
                                                            required={field.is_required}
                                                            onChange={(e) => handleFieldChange(field.label, e.target.checked ? 'Yes' : 'No')}
                                                            className={styles.checkbox}
                                                            style={{ accentColor: popup.accent_color }}
                                                        />
                                                        {field.label}
                                                        {field.is_required && <span style={{ color: popup.accent_color }}> *</span>}
                                                    </label>
                                                ) : (
                                                    <>
                                                        <label className={styles.fieldLabel} style={{ color: `${popup.text_color}99` }}>
                                                            {field.label}
                                                            {field.is_required && <span style={{ color: popup.accent_color }}> *</span>}
                                                        </label>
                                                        {field.field_type === 'textarea' ? (
                                                            <textarea
                                                                className={styles.fieldInput}
                                                                placeholder={field.placeholder}
                                                                required={field.is_required}
                                                                rows={3}
                                                                value={formData[field.label] || ''}
                                                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                                                style={{
                                                                    borderColor: popup.border_color || `${popup.text_color}22`,
                                                                    color: popup.text_color,
                                                                    backgroundColor: `${popup.text_color}08`,
                                                                }}
                                                            />
                                                        ) : field.field_type === 'select' ? (
                                                            <select
                                                                className={styles.fieldInput}
                                                                required={field.is_required}
                                                                value={formData[field.label] || ''}
                                                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                                                style={{
                                                                    borderColor: `${popup.text_color}22`,
                                                                    color: popup.text_color,
                                                                    backgroundColor: `${popup.text_color}08`,
                                                                }}
                                                            >
                                                                <option value="">{field.placeholder || 'Select...'}</option>
                                                                {field.options.map((opt, i) => (
                                                                    <option key={i} value={opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <input
                                                                className={styles.fieldInput}
                                                                type={field.field_type}
                                                                placeholder={field.placeholder}
                                                                required={field.is_required}
                                                                value={formData[field.label] || ''}
                                                                onChange={(e) => handleFieldChange(field.label, e.target.value)}
                                                                style={{
                                                                    borderColor: `${popup.text_color}22`,
                                                                    color: popup.text_color,
                                                                    backgroundColor: `${popup.text_color}08`,
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="submit"
                                            className={styles.submitBtn}
                                            disabled={isSubmitting}
                                            style={{
                                                backgroundColor: popup.accent_color,
                                                color: popup.btn_text_color || '#ffffff',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span className={styles.spinner} />
                                            ) : (
                                                popup.button_text
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
