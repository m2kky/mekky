import Link from 'next/link';
import EhsanTransitionLink from './EhsanTransitionLink';
import styles from './EhsanShell.module.css';

export default function EhsanSubpageFooter() {
  return (
    <footer className={styles.subpageFooter}>
      <div>
        <p>
          This website is an independent speculative concept created by Muhammed Mekky Studio as part of the Speed Designing series. It is not affiliated with, endorsed by, or officially connected to Ehsan El Sayed or her representatives.
        </p>
        <span>EPISODE 01 / 2026</span>
      </div>
      <nav aria-label="Ehsan microsite pages">
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed" label="HOME">Home</EhsanTransitionLink>
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/about" label="ABOUT">About</EhsanTransitionLink>
        <EhsanTransitionLink href="/speeddesigning/ehsan-elsayed/contact" label="CONTACT">Contact demo</EhsanTransitionLink>
        <Link href="/speeddesigning/ehsan-elsayed/blueprint">Blueprint</Link>
        <a href="https://www.youtube.com/@ehsan__sayed" target="_blank" rel="noreferrer">Official YouTube ↗</a>
        <Link href="/">Designed and built by Muhammed Mekky Studio ↗</Link>
      </nav>
    </footer>
  );
}
