import Link from 'next/link';

import { getLabel } from '../_lib/labels';

type PaginationNavProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function PaginationNav({ currentPage, totalPages, buildHref }: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | '...')[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-6" aria-label={getLabel('pagination.ariaLabel')}>
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-2 text-sm rounded hover:bg-secondary"
        >
          {getLabel('pagination.previous')}
        </Link>
      )}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-3 py-2 text-sm text-muted-foreground">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={`px-3 py-2 text-sm rounded ${
              page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            {page}
          </Link>
        ),
      )}
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-2 text-sm rounded hover:bg-secondary"
        >
          {getLabel('pagination.next')}
        </Link>
      )}
    </nav>
  );
}
