// app/components/device/BrandCard.tsx
import { Brand } from '@/app/types';
import Link from 'next/link';

const BRAND_ICONS: Record<string, string> = {
  apple: '🍎',
  samsung: '🌀',
  motorola: '〽️',
  xiaomi: 'MI',
};

export function BrandCard({ brand }: { brand: Brand }) {
  const icon = BRAND_ICONS[brand.slug] ?? '📱';
  const isText = icon === 'MI';

  // DEBUG: Verifique se o slug está vindo corretamente
  console.log('BrandCard brand:', brand);

  return (
    <Link
      href={`/servicos/${brand.slug}`} // Isso deve funcionar se brand.slug existir
      className="border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3 hover:border-gray-400 hover:shadow-sm transition-all group text-center bg-white"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 ${isText ? 'text-sm font-black text-orange-500' : 'text-2xl'}`}
      >
        {icon}
      </div>
      <span className="text-sm font-semibold group-hover:text-gray-900">
        {brand.name}
      </span>
    </Link>
  );
}
