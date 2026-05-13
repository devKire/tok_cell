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
      href={`/servicos/${brand.slug}`}
      className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4 hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center group cursor-pointer"
    >
      {/* Efeito de brilho */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-50 blur transition duration-300" />

      {/* Ícone com animação pulsante */}
      <div
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:animate-pulse ${
          isText
            ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg text-xl font-black'
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-3xl group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white'
        }`}
      >
        {icon}
      </div>

      {/* Nome com underline animado */}
      <div className="relative">
        <span className="relative text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
          {brand.name}
        </span>
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
      </div>

      {/* Setinha indicadora */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
