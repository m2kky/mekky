'use client';

import { useTransition } from 'react';
import styles from './PopupList.module.css';

interface PopupToggleFormProps {
    id: string;
    isActive: boolean;
    action: (id: string, is_active: boolean) => Promise<{ error?: string; success?: boolean }>;
}

export default function PopupToggleForm({ id, isActive, action }: PopupToggleFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            await action(id, !isActive);
        });
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isPending}
            className={`${styles.statusToggle} ${isActive ? styles.statusActive : styles.statusInactive}`}
        >
            {isPending ? '...' : isActive ? '● Live' : '○ Draft'}
        </button>
    );
}
