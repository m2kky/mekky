import { createClient } from '@/utils/supabase/server';
import styles from './Submissions.module.css';

export const revalidate = 0;

export default async function PopupSubmissionsPage() {
    const supabase = await createClient();

    // Fetch all submissions with popup title
    const { data: submissions, error } = await supabase
        .from('popup_submissions')
        .select(`
            *,
            popups (title, heading)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching submissions:', error);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Popup Submissions</h1>
                    <p className={styles.description}>
                        All form submissions from your active popups.
                    </p>
                </div>
                <span className={styles.count}>
                    {submissions?.length || 0} total submissions
                </span>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Popup</th>
                            <th>Submitted Data</th>
                            <th>Page</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!submissions || submissions.length === 0) ? (
                            <tr>
                                <td colSpan={4} className={styles.empty}>
                                    No submissions yet. Submissions will appear here when visitors fill out your popups.
                                </td>
                            </tr>
                        ) : (
                            submissions.map((sub) => {
                                const popupInfo = sub.popups as { title: string; heading: string } | null;
                                const dataEntries = Object.entries(sub.data || {});

                                return (
                                    <tr key={sub.id}>
                                        <td className={styles.popupCell}>
                                            <span className={styles.popupName}>
                                                {popupInfo?.title || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className={styles.dataCell}>
                                            <div className={styles.dataGrid}>
                                                {dataEntries.map(([key, value]) => (
                                                    <div key={key} className={styles.dataItem}>
                                                        <span className={styles.dataKey}>{key}:</span>
                                                        <span className={styles.dataValue}>
                                                            {String(value)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className={styles.pageCell}>
                                            {sub.page_url || '—'}
                                        </td>
                                        <td className={styles.dateCell}>
                                            {new Date(sub.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
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
