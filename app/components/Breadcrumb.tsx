//app\components\Breadcrumb.tsx

import Link from 'next/link';

type Item = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav
      className="flex items-center gap-1.5 text-sm text-gray-400 mb-5 flex-wrap"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>›</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-black font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
