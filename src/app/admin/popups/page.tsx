import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { deletePopup, togglePopupActive } from './actions';
import DeleteActionForm from '@/components/admin/DeleteActionForm';
import PopupToggleForm from './PopupToggleForm';
import styles from './PopupList.module.css';

export const revalidate = 0;

export default async function AdminPopupsPage() {
    const supabase = await createClient();

    const { data: popups, error } = await supabase
        .from('popups')
        .select(`
            *,
            popup_fields (id),
            popup_submissions (id)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching popups:', error);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Popups</h1>
                    <p className={styles.description}>
                        Create and manage marketing popups with custom forms and styles.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/admin/popups/submissions" className={styles.submissionsBtn}>
                        📊 Submissions
                    </Link>
                    <Link href="/admin/popups/new" className={styles.newButton}>
                        + Create Popup
                    </Link>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Style</th>
                            <th>Fields</th>
                            <th>Submissions</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!popups || popups.length === 0) ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>
                                    No popups found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            popups.map((popup) => {
                                const fieldCount = popup.popup_fields?.length || 0;
                                const submissionCount = popup.popup_submissions?.length || 0;

                                return (
                                    <tr key={popup.id}>
                                        <td className={styles.primaryCell}>
                                            {popup.title}
                                            <span className={styles.headingPreview}>{popup.heading}</span>
                                        </td>
                                        <td>
                                            <span className={styles.styleBadge}>
                                                {popup.style.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className={styles.countCell}>{fieldCount}</td>
                                        <td className={styles.countCell}>{submissionCount}</td>
                                        <td>
                                            <PopupToggleForm
                                                id={popup.id}
                                                isActive={popup.is_active}
                                                action={togglePopupActive}
                                            />
                                        </td>
                                        <td className={styles.actionsCell}>
                                            <Link href={`/admin/popups/${popup.id}`} className={styles.editBtn}>
                                                Edit
                                            </Link>
                                            <DeleteActionForm
                                                action={deletePopup}
                                                id={popup.id}
                                                className={styles.deleteBtn}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
