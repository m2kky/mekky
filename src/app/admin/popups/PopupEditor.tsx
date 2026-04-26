'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FieldBuilder, { type FieldItem } from './FieldBuilder';
import { savePopup, type PopupData } from './actions';
import styles from './PopupEditor.module.css';

// ─── Style Options ──────────────────────────────

const STYLE_OPTIONS = [
    { value: 'modal', label: 'Modal', desc: 'Centered overlay', icon: '🖥️' },
    { value: 'slide_in', label: 'Slide-in', desc: 'From the right', icon: '➡️' },
    { value: 'bottom_bar', label: 'Bottom Bar', desc: 'Fixed at bottom', icon: '⬇️' },
    { value: 'fullscreen', label: 'Fullscreen', desc: 'Full takeover', icon: '📺' },
    { value: 'corner_card', label: 'Corner Card', desc: 'Bottom-right', icon: '💬' },
];

const TRIGGER_OPTIONS = [
    { value: 'page_load', label: 'Page Load', desc: 'After delay (seconds)' },
    { value: 'scroll', label: 'On Scroll', desc: 'After scroll % of page' },
    { value: 'exit_intent', label: 'Exit Intent', desc: 'Mouse leaves viewport' },
    { value: 'manual', label: 'Manual', desc: 'Triggered by code' },
];

// ─── Color Presets ──────────────────────────────

const COLOR_PRESETS = [
    { name: 'Dark Luxury', bg: '#0a0a0a', text: '#ffffff', accent: '#EB5E28', border: '#ffffff15', overlay: '#00000099', btnText: '#ffffff' },
    { name: 'Clean White', bg: '#ffffff', text: '#1a1a1a', accent: '#EB5E28', border: '#0000001a', overlay: '#00000066', btnText: '#ffffff' },
    { name: 'Midnight Blue', bg: '#0f172a', text: '#e2e8f0', accent: '#3b82f6', border: '#3b82f633', overlay: '#00000080', btnText: '#ffffff' },
    { name: 'Forest Green', bg: '#0c1f0c', text: '#e0f2e0', accent: '#22c55e', border: '#22c55e33', overlay: '#00000080', btnText: '#ffffff' },
    { name: 'Royal Purple', bg: '#1a0533', text: '#e8d5f5', accent: '#a855f7', border: '#a855f733', overlay: '#00000088', btnText: '#ffffff' },
    { name: 'Warm Cream', bg: '#fef7ed', text: '#2d1810', accent: '#ea580c', border: '#ea580c22', overlay: '#00000055', btnText: '#ffffff' },
];

// ─── Props ──────────────────────────────────────

interface PopupEditorProps {
    initialData?: {
        id: string;
        title: string;
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
        is_active: boolean;
        show_once: boolean;
        button_action_type: string;
        button_action_url: string;
        popup_fields?: FieldItem[];
    };
}

// ─── Component ──────────────────────────────────

export default function PopupEditor({ initialData }: PopupEditorProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ─── Preview Mode ───────────────────────────
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

    // ─── Form State ─────────────────────────────
    const [title, setTitle] = useState(initialData?.title || '');
    const [style, setStyle] = useState(initialData?.style || 'modal');
    const [heading, setHeading] = useState(initialData?.heading || 'Join Our Community');
    const [description, setDescription] = useState(initialData?.description || 'Get exclusive insights and updates delivered to your inbox.');
    const [buttonText, setButtonText] = useState(initialData?.button_text || 'Submit');
    const [successMessage, setSuccessMessage] = useState(initialData?.success_message || 'Thank you! We\'ll be in touch.');
    const [bgColor, setBgColor] = useState(initialData?.bg_color || '#0a0a0a');
    const [textColor, setTextColor] = useState(initialData?.text_color || '#ffffff');
    const [accentColor, setAccentColor] = useState(initialData?.accent_color || '#EB5E28');
    const [borderColor, setBorderColor] = useState(initialData?.border_color || '#ffffff15');
    const [overlayColor, setOverlayColor] = useState(initialData?.overlay_color || '#00000099');
    const [btnTextColor, setBtnTextColor] = useState(initialData?.btn_text_color || '#ffffff');
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [triggerType, setTriggerType] = useState(initialData?.trigger_type || 'page_load');
    const [triggerValue, setTriggerValue] = useState(initialData?.trigger_value || '3');
    const [buttonActionType, setButtonActionType] = useState(initialData?.button_action_type || 'submit');
    const [buttonActionUrl, setButtonActionUrl] = useState(initialData?.button_action_url || '');
    const [showOnPages, setShowOnPages] = useState(initialData?.show_on_pages?.join(', ') || '*');
    const [isActive, setIsActive] = useState(initialData?.is_active || false);
    const [showOnce, setShowOnce] = useState(initialData?.show_once ?? true);
    const [fields, setFields] = useState<FieldItem[]>(
        initialData?.popup_fields?.map((f, i) => ({
            ...f,
            id: f.id || `field_${i}_${Date.now()}`,
        })) || []
    );

    // ─── Image Upload ───────────────────────────
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image must be less than 5MB');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/popups/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setUploadError(data.error || 'Upload failed');
                return;
            }

            setImageUrl(data.publicUrl);
        } catch {
            setUploadError('Upload failed. Try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // ─── Save Handler ───────────────────────────
    const handleSave = () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        setError('');
        setSaved(false);

        const data: PopupData = {
            id: initialData?.id,
            title: title.trim(),
            style,
            heading,
            description,
            button_text: buttonText,
            success_message: successMessage,
            bg_color: bgColor,
            text_color: textColor,
            accent_color: accentColor,
            border_color: borderColor,
            overlay_color: overlayColor,
            btn_text_color: btnTextColor,
            image_url: imageUrl,
            trigger_type: triggerType,
            trigger_value: triggerValue,
            button_action_type: buttonActionType,
            button_action_url: buttonActionUrl,
            show_on_pages: showOnPages.split(',').map(s => s.trim()).filter(Boolean),
            is_active: isActive,
            show_once: showOnce,
            fields: fields.map(f => ({
                field_type: f.field_type,
                label: f.label,
                placeholder: f.placeholder,
                is_required: f.is_required,
                options: f.options,
                sort_order: f.sort_order,
            })),
        };

        startTransition(async () => {
            const result = await savePopup(data);
            if (result.error) {
                setError(result.error);
            } else {
                setSaved(true);
                if (!initialData?.id) {
                    router.push('/admin/popups');
                }
            }
        });
    };

    // ─── Preview Field Renderer ─────────────────
    const renderPreviewField = (field: FieldItem) => {
        const fieldStyle = {
            borderColor: borderColor,
            color: textColor,
            backgroundColor: `${textColor}08`,
        };

        if (field.field_type === 'checkbox') {
            return (
                <label className={styles.popupCheckbox} style={{ color: `${textColor}cc` }}>
                    <input type="checkbox" disabled style={{ accentColor: accentColor }} />
                    {field.label}
                    {field.is_required && <span style={{ color: accentColor }}> *</span>}
                </label>
            );
        }

        return (
            <>
                <label className={styles.popupFieldLabel} style={{ color: `${textColor}99` }}>
                    {field.label}
                    {field.is_required && <span style={{ color: accentColor }}> *</span>}
                </label>
                {field.field_type === 'textarea' ? (
                    <textarea
                        className={styles.popupInput}
                        placeholder={field.placeholder}
                        rows={2}
                        disabled
                        style={fieldStyle}
                    />
                ) : field.field_type === 'select' ? (
                    <select className={styles.popupInput} disabled style={fieldStyle}>
                        <option>{field.placeholder || 'Select...'}</option>
                        {field.options.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                ) : (
                    <input
                        className={styles.popupInput}
                        type={field.field_type}
                        placeholder={field.placeholder}
                        disabled
                        style={fieldStyle}
                    />
                )}
            </>
        );
    };

    // ─── Render ─────────────────────────────────
    return (
        <div className={styles.editor}>
            {/* ═══ TOOLBAR ═══ */}
            <div className={styles.toolbar}>
                <button
                    type="button"
                    className={styles.backBtn}
                    onClick={() => router.push('/admin/popups')}
                >
                    ← Back
                </button>
                <h1 className={styles.pageTitle}>
                    {initialData?.id ? 'Edit Popup' : 'Create New Popup'}
                </h1>
                <div className={styles.toolbarActions}>
                    {error && <span className={styles.errorMsg}>{error}</span>}
                    {saved && <span className={styles.savedMsg}>✓ Saved</span>}
                    <button
                        type="button"
                        className={styles.saveBtn}
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save Popup'}
                    </button>
                </div>
            </div>

            <div className={styles.editorLayout}>
                {/* ═══ LEFT: SETTINGS ═══ */}
                <div className={styles.settingsPanel}>

                    {/* ── Basic Info ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Basic Info</h2>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Internal Title</label>
                            <input
                                className={styles.input}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Newsletter Signup Q2"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Popup Heading</label>
                            <input
                                className={styles.input}
                                value={heading}
                                onChange={e => setHeading(e.target.value)}
                                placeholder="Join Our Community"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.textarea}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={3}
                                placeholder="Optional body text..."
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Button Text</label>
                                <input
                                    className={styles.input}
                                    value={buttonText}
                                    onChange={e => setButtonText(e.target.value)}
                                    placeholder="Submit"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Success Message</label>
                                <input
                                    className={styles.input}
                                    value={successMessage}
                                    onChange={e => setSuccessMessage(e.target.value)}
                                    placeholder="Thank you!"
                                />
                            </div>
                        </div>

                        <div className={styles.row} style={{ marginTop: '0.75rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Button Action</label>
                                <select
                                    className={styles.input}
                                    value={buttonActionType}
                                    onChange={e => setButtonActionType(e.target.value)}
                                >
                                    <option value="submit">Submit Form</option>
                                    <option value="link">Go to Link</option>
                                </select>
                            </div>
                            {buttonActionType === 'link' && (
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Action URL</label>
                                    <input
                                        className={styles.input}
                                        value={buttonActionUrl}
                                        onChange={e => setButtonActionUrl(e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* ── Image Upload ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Image</h2>
                        <div className={styles.imageUploadArea}>
                            {imageUrl ? (
                                <div className={styles.imagePreviewWrap}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imageUrl} alt="Popup image" className={styles.imagePreviewThumb} />
                                    <div className={styles.imageOverlayActions}>
                                        <button
                                            type="button"
                                            className={styles.imageReplaceBtn}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Replace
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.imageRemoveBtn}
                                            onClick={() => setImageUrl('')}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={styles.imageDropZone}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {isUploading ? (
                                        <div className={styles.uploadingState}>
                                            <span className={styles.uploadSpinner} />
                                            <span>Uploading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                                <polyline points="21 15 16 10 5 21"/>
                                            </svg>
                                            <span className={styles.dropZoneText}>Click to upload image</span>
                                            <span className={styles.dropZoneHint}>JPG, PNG, WebP, GIF — Max 5MB</span>
                                        </>
                                    )}
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            {uploadError && <p className={styles.uploadErrorText}>{uploadError}</p>}
                        </div>
                        <div className={styles.formGroup} style={{ marginTop: '0.75rem' }}>
                            <label className={styles.label}>Or paste image URL</label>
                            <input
                                className={styles.input}
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                    </section>

                    {/* ── Style Selector ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Popup Style</h2>
                        <div className={styles.styleGrid}>
                            {STYLE_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`${styles.styleCard} ${style === opt.value ? styles.styleCardActive : ''}`}
                                    onClick={() => setStyle(opt.value)}
                                >
                                    <span className={styles.styleIcon}>{opt.icon}</span>
                                    <span className={styles.styleName}>{opt.label}</span>
                                    <span className={styles.styleDesc}>{opt.desc}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ── Colors ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Colors</h2>

                        {/* Color Presets */}
                        <div className={styles.presetRow}>
                            <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>Quick Presets</label>
                            <div className={styles.presetGrid}>
                                {COLOR_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        className={styles.presetBtn}
                                        onClick={() => {
                                            setBgColor(preset.bg);
                                            setTextColor(preset.text);
                                            setAccentColor(preset.accent);
                                            setBorderColor(preset.border);
                                            setOverlayColor(preset.overlay);
                                            setBtnTextColor(preset.btnText);
                                        }}
                                        title={preset.name}
                                    >
                                        <span className={styles.presetDot} style={{ background: preset.bg, border: `2px solid ${preset.accent}` }} />
                                        <span className={styles.presetDot} style={{ background: preset.accent }} />
                                        <span className={styles.presetName}>{preset.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Primary Colors */}
                        <div className={styles.colorRow}>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Background</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Text</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Accent / Button</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                        </div>

                        {/* Secondary Colors */}
                        <div className={styles.colorRow} style={{ marginTop: '0.75rem' }}>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Border</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={borderColor.slice(0, 7)} onChange={e => setBorderColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Overlay</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={overlayColor.slice(0, 7)} onChange={e => setOverlayColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={overlayColor} onChange={e => setOverlayColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                            <div className={styles.colorGroup}>
                                <label className={styles.label}>Button Text</label>
                                <div className={styles.colorPicker}>
                                    <input type="color" value={btnTextColor} onChange={e => setBtnTextColor(e.target.value)} className={styles.colorInput} />
                                    <input type="text" value={btnTextColor} onChange={e => setBtnTextColor(e.target.value)} className={styles.colorText} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Trigger ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Trigger</h2>
                        <div className={styles.triggerGrid}>
                            {TRIGGER_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`${styles.triggerCard} ${triggerType === opt.value ? styles.triggerCardActive : ''}`}
                                    onClick={() => setTriggerType(opt.value)}
                                >
                                    <span className={styles.triggerName}>{opt.label}</span>
                                    <span className={styles.triggerDesc}>{opt.desc}</span>
                                </button>
                            ))}
                        </div>
                        {triggerType !== 'exit_intent' && triggerType !== 'manual' && (
                            <div className={styles.formGroup} style={{ marginTop: '0.75rem' }}>
                                <label className={styles.label}>
                                    {triggerType === 'page_load' ? 'Delay (seconds)' : 'Scroll (%)'}
                                </label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    value={triggerValue}
                                    onChange={e => setTriggerValue(e.target.value)}
                                    min="0"
                                    max={triggerType === 'scroll' ? '100' : undefined}
                                />
                            </div>
                        )}
                    </section>

                    {/* ── Targeting & Options ── */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Targeting</h2>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Show on pages (comma separated, * = all)</label>
                            <input
                                className={styles.input}
                                value={showOnPages}
                                onChange={e => setShowOnPages(e.target.value)}
                                placeholder="*, /blog, /contact"
                            />
                        </div>
                        <div className={styles.toggleRow}>
                            <label className={styles.toggleLabel}>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={e => setIsActive(e.target.checked)}
                                    className={styles.toggleCheckbox}
                                />
                                <span className={`${styles.toggleSwitch} ${isActive ? styles.toggleActive : ''}`} />
                                Active (visible to visitors)
                            </label>
                        </div>
                        <div className={styles.toggleRow}>
                            <label className={styles.toggleLabel}>
                                <input
                                    type="checkbox"
                                    checked={showOnce}
                                    onChange={e => setShowOnce(e.target.checked)}
                                    className={styles.toggleCheckbox}
                                />
                                <span className={`${styles.toggleSwitch} ${showOnce ? styles.toggleActive : ''}`} />
                                Show once per visitor
                            </label>
                        </div>
                    </section>

                    {/* ── Fields ── */}
                    <section className={styles.section}>
                        <FieldBuilder fields={fields} onChange={setFields} />
                    </section>
                </div>

                {/* ═══ RIGHT: LIVE PREVIEW ═══ */}
                <div className={styles.previewPanel}>
                    <div className={styles.previewHeader}>
                        <h2 className={styles.previewTitle}>Live Preview</h2>
                        <span className={styles.previewBadge}>Real-time</span>
                        <div className={styles.previewToggle}>
                            <button
                                type="button"
                                className={`${styles.previewToggleBtn} ${previewMode === 'desktop' ? styles.previewToggleActive : ''}`}
                                onClick={() => setPreviewMode('desktop')}
                                title="Desktop preview"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className={`${styles.previewToggleBtn} ${previewMode === 'mobile' ? styles.previewToggleActive : ''}`}
                                onClick={() => setPreviewMode('mobile')}
                                title="Mobile preview"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.previewContainer}>
                        <div className={`${styles.previewViewport} ${styles[`previewViewport_${previewMode}`]}`}>
                            {/* Preview Backdrop */}
                            <div className={styles.previewBackdrop}>
                                <div className={styles.previewFakeSite}>
                                    <div className={styles.fakeNav} />
                                    <div className={styles.fakeHero} />
                                    <div className={styles.fakeContent}>
                                        <div className={styles.fakeLine} />
                                        <div className={styles.fakeLineShort} />
                                        <div className={styles.fakeLine} />
                                    </div>
                                </div>

                                {/* The actual popup preview */}
                                <div
                                    className={`${styles.popupPreview} ${styles[`preview_${style}`]}`}
                                    style={{
                                        background: (style === 'modal' || style === 'slide_in' || style === 'fullscreen') ? overlayColor : 'transparent',
                                    }}
                                >
                                    <div
                                        className={styles.popupCard}
                                        style={{
                                            backgroundColor: bgColor,
                                            color: textColor,
                                            borderColor: borderColor,
                                        }}
                                    >
                                        {/* Close button */}
                                        <button className={styles.popupClose} style={{ color: textColor }}>×</button>

                                        {/* Image */}
                                        {imageUrl && (
                                            <div className={styles.popupImage}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={imageUrl} alt="" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className={styles.popupContent}>
                                            {heading && (
                                                <h3 className={styles.popupHeading} style={{ color: textColor }}>
                                                    {heading}
                                                </h3>
                                            )}
                                            {description && (
                                                <p className={styles.popupDesc} style={{ color: `${textColor}cc` }}>
                                                    {description}
                                                </p>
                                            )}

                                            {/* Preview Fields */}
                                            <div className={styles.popupFields}>
                                                {fields.map((field) => (
                                                    <div key={field.id} className={styles.popupFieldGroup}>
                                                        {renderPreviewField(field)}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                className={styles.popupButton}
                                                style={{
                                                    backgroundColor: accentColor,
                                                    color: btnTextColor,
                                                }}
                                                disabled
                                            >
                                                {buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
