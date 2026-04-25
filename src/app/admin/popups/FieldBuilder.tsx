'use client';

import { useState } from 'react';
import styles from './FieldBuilder.module.css';

export interface FieldItem {
    id: string;
    field_type: string;
    label: string;
    placeholder: string;
    is_required: boolean;
    options: string[];
    sort_order: number;
}

interface FieldBuilderProps {
    fields: FieldItem[];
    onChange: (fields: FieldItem[]) => void;
}

const FIELD_TYPES = [
    { value: 'text', label: 'Text', icon: '✏️' },
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'phone', label: 'Phone', icon: '📱' },
    { value: 'number', label: 'Number', icon: '🔢' },
    { value: 'textarea', label: 'Text Area', icon: '📝' },
    { value: 'select', label: 'Dropdown', icon: '📋' },
    { value: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { value: 'date', label: 'Date', icon: '📅' },
    { value: 'url', label: 'URL', icon: '🔗' },
];

// ─── Quick-add presets with sensible defaults ───
const QUICK_PRESETS = [
    { label: '👤 Full Name', field_type: 'text', placeholder: 'Enter your full name', is_required: true },
    { label: '📧 Email Address', field_type: 'email', placeholder: 'you@example.com', is_required: true },
    { label: '📱 Phone Number', field_type: 'phone', placeholder: '+20 1XX XXX XXXX', is_required: false },
    { label: '💬 Message', field_type: 'textarea', placeholder: 'Tell us more...', is_required: false },
    { label: '🏢 Company', field_type: 'text', placeholder: 'Company name', is_required: false },
    { label: '🌐 Website', field_type: 'url', placeholder: 'https://yoursite.com', is_required: false },
];

function generateId() {
    return `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function FieldBuilder({ fields, onChange }: FieldBuilderProps) {
    const [expandedField, setExpandedField] = useState<string | null>(null);
    const [showAllTypes, setShowAllTypes] = useState(false);

    // ─── Add field with preset defaults ──────────
    const addFieldFromPreset = (preset: typeof QUICK_PRESETS[0]) => {
        const cleanLabel = preset.label.replace(/^[^\w\s]+\s*/, ''); // Remove emoji prefix
        const newField: FieldItem = {
            id: generateId(),
            field_type: preset.field_type,
            label: cleanLabel,
            placeholder: preset.placeholder,
            is_required: preset.is_required,
            options: [],
            sort_order: fields.length,
        };
        onChange([...fields, newField]);
        setExpandedField(newField.id);
    };

    // ─── Add blank field by type ─────────────────
    const addField = (type: string) => {
        const typeInfo = FIELD_TYPES.find(t => t.value === type);
        const newField: FieldItem = {
            id: generateId(),
            field_type: type,
            label: typeInfo?.label || 'Field',
            placeholder: '',
            is_required: false,
            options: type === 'select' ? ['Option 1', 'Option 2'] : [],
            sort_order: fields.length,
        };
        onChange([...fields, newField]);
        setExpandedField(newField.id);
    };

    const updateField = (id: string, updates: Partial<FieldItem>) => {
        onChange(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const removeField = (id: string) => {
        onChange(fields.filter(f => f.id !== id));
        if (expandedField === id) setExpandedField(null);
    };

    const duplicateField = (field: FieldItem) => {
        const copy: FieldItem = {
            ...field,
            id: generateId(),
            label: `${field.label} (copy)`,
            sort_order: fields.length,
        };
        onChange([...fields, copy]);
        setExpandedField(copy.id);
    };

    const moveField = (index: number, direction: 'up' | 'down') => {
        const newFields = [...fields];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newFields.length) return;
        [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
        onChange(newFields.map((f, i) => ({ ...f, sort_order: i })));
    };

    return (
        <div className={styles.builder}>
            <div className={styles.header}>
                <h3 className={styles.sectionTitle}>Form Fields</h3>
                <span className={styles.fieldCount}>{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
            </div>

            {/* ─── Quick Presets ──────────────────── */}
            <div className={styles.presetsSection}>
                <p className={styles.presetsLabel}>Quick Add:</p>
                <div className={styles.presetsGrid}>
                    {QUICK_PRESETS.map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            className={styles.presetBtn}
                            onClick={() => addFieldFromPreset(preset)}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── All Field Types ────────────────── */}
            <div className={styles.moreTypes}>
                <button
                    type="button"
                    className={styles.toggleMoreBtn}
                    onClick={() => setShowAllTypes(!showAllTypes)}
                >
                    {showAllTypes ? '▾ Hide field types' : '▸ More field types'}
                </button>
                {showAllTypes && (
                    <div className={styles.addFieldGrid}>
                        {FIELD_TYPES.map(type => (
                            <button
                                key={type.value}
                                type="button"
                                className={styles.addFieldBtn}
                                onClick={() => addField(type.value)}
                            >
                                <span className={styles.addFieldIcon}>{type.icon}</span>
                                <span className={styles.addFieldLabel}>{type.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ─── Field List ──────────────────────── */}
            <div className={styles.fieldList}>
                {fields.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No fields yet. Use quick-add above or add custom field types.</p>
                    </div>
                )}

                {fields.map((field, index) => {
                    const isExpanded = expandedField === field.id;
                    const typeInfo = FIELD_TYPES.find(t => t.value === field.field_type);

                    return (
                        <div
                            key={field.id}
                            className={`${styles.fieldCard} ${isExpanded ? styles.fieldCardExpanded : ''}`}
                        >
                            {/* Field Header - always visible */}
                            <div
                                className={styles.fieldHeader}
                                onClick={() => setExpandedField(isExpanded ? null : field.id)}
                            >
                                <span className={styles.fieldIcon}>{typeInfo?.icon || '📋'}</span>
                                <div className={styles.fieldInfo}>
                                    <span className={styles.fieldLabel}>{field.label}</span>
                                    <span className={styles.fieldType}>{typeInfo?.label || field.field_type}</span>
                                </div>
                                {field.is_required && (
                                    <span className={styles.requiredBadge}>Required</span>
                                )}
                                <div className={styles.fieldActions}>
                                    <button
                                        type="button"
                                        className={styles.moveBtn}
                                        onClick={(e) => { e.stopPropagation(); moveField(index, 'up'); }}
                                        disabled={index === 0}
                                        title="Move up"
                                    >↑</button>
                                    <button
                                        type="button"
                                        className={styles.moveBtn}
                                        onClick={(e) => { e.stopPropagation(); moveField(index, 'down'); }}
                                        disabled={index === fields.length - 1}
                                        title="Move down"
                                    >↓</button>
                                    <button
                                        type="button"
                                        className={styles.duplicateBtn}
                                        onClick={(e) => { e.stopPropagation(); duplicateField(field); }}
                                        title="Duplicate"
                                    >⧉</button>
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                                        title="Remove field"
                                    >×</button>
                                </div>
                                <span className={styles.expandIcon}>{isExpanded ? '▾' : '▸'}</span>
                            </div>

                            {/* Field Editor - collapsible */}
                            {isExpanded && (
                                <div className={styles.fieldEditor}>
                                    {/* ── Field Type Changer ── */}
                                    <div className={styles.editorRow}>
                                        <label className={styles.editorLabel}>Field Type</label>
                                        <select
                                            className={styles.editorInput}
                                            value={field.field_type}
                                            onChange={(e) => updateField(field.id, { field_type: e.target.value })}
                                        >
                                            {FIELD_TYPES.map(t => (
                                                <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.editorRow}>
                                        <label className={styles.editorLabel}>Label</label>
                                        <input
                                            type="text"
                                            className={styles.editorInput}
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                                            placeholder="Field label"
                                        />
                                    </div>

                                    {field.field_type !== 'checkbox' && (
                                        <div className={styles.editorRow}>
                                            <label className={styles.editorLabel}>Placeholder</label>
                                            <input
                                                type="text"
                                                className={styles.editorInput}
                                                value={field.placeholder}
                                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                placeholder="Placeholder text"
                                            />
                                        </div>
                                    )}

                                    <div className={styles.editorRow}>
                                        <label className={styles.editorCheckboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={field.is_required}
                                                onChange={(e) => updateField(field.id, { is_required: e.target.checked })}
                                                className={styles.editorCheckbox}
                                            />
                                            Required field
                                        </label>
                                    </div>

                                    {field.field_type === 'select' && (
                                        <div className={styles.editorRow}>
                                            <label className={styles.editorLabel}>Options (one per line)</label>
                                            <textarea
                                                className={styles.editorTextarea}
                                                value={field.options.join('\n')}
                                                onChange={(e) =>
                                                    updateField(field.id, {
                                                        options: e.target.value.split('\n').filter(Boolean),
                                                    })
                                                }
                                                rows={4}
                                                placeholder={'Option 1\nOption 2\nOption 3'}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
