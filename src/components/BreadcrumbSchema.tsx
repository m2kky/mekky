'use client';

import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/constants';

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  
  if (!pathname) return null;

  // Don't render breadcrumbs on home page
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((p) => p !== '');

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE.url,
    },
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Capitalize and format name (e.g., 'case-studies' -> 'Case Studies')
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE.url}${currentPath}`,
    });
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
