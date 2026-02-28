import { ReactNode } from 'react';
import Link from 'next/link';
import { logout } from '@/app/api/auth/actions';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.topSection}>
                    <h2 className={styles.logo}>MEKKY. ADMIN</h2>
                </div>
                <nav className={styles.nav}>
                    <p className={styles.navGroupTitle}>General</p>
                    <Link href="/admin" className={styles.navLink}>
                        Submissions & Contacts
                    </Link>

                    <p className={styles.navGroupTitle}>Content</p>
                    <Link href="/admin/projects" className={styles.navLink}>
                        Projects
                    </Link>
                    <Link href="/admin/case-studies" className={styles.navLink}>
                        Case Studies
                    </Link>
                    <Link href="/admin/blogs" className={styles.navLink}>
                        Blogs
                    </Link>

                    <p className={styles.navGroupTitle}>System</p>
                    <Link href="/admin/seed" className={styles.navLink}>
                        Migrate Content
                    </Link>
                    <Link href="/" className={styles.navLink}>
                        View Live Site ↗
                    </Link>
                </nav>
                <div className={styles.bottomSection}>
                    <form action={logout}>
                        <button type="submit" className={styles.logoutButton}>
                            Log Out
                        </button>
                    </form>
                </div>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
