'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { useEhsanTransition } from './EhsanRouteFrame';

type Props = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function EhsanTransitionLink({ href, label, children, className, onClick }: Props) {
  const pathname = usePathname();
  const { transitionTo } = useEhsanTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin || (url.pathname === pathname && url.hash)) return;

    event.preventDefault();
    transitionTo(`${url.pathname}${url.hash}`, label);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
