'use client';

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-slate-400" aria-hidden>
                /
              </span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-slate-900' : 'text-slate-600'}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
