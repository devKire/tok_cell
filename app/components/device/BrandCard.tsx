// app/components/device/BrandCard.tsx
import { Brand } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';

const BRAND_LOGOS: Record<string, string> = {
  apple:
    'https://cdn.brandfetch.io/idnrCPuv87/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  samsung:
    'https://cdn.brandfetch.io/iduaw_nOnR/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  motorola:
    'https://cdn.brandfetch.io/idei-0N6bA/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  xiaomi:
    'https://cdn.brandfetch.io/id3IaEYtG_/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  asus: 'https://cdn.brandfetch.io/idGnlhbTXH/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  oneplus:
    'https://cdn.brandfetch.io/idi46coDvW/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  google:
    'https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  huawei:
    'https://cdn.brandfetch.io/idLAJ42baU/theme/dark/idKq57-iaT.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  oppo: 'https://cdn.brandfetch.io/id64aeE2b-/theme/dark/idF9iGuWuM.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  realme:
    'https://cdn.brandfetch.io/idYXSDVD9U/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
  zte: 'https://cdn.brandfetch.io/idhNwH_cCA/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
};

export function BrandCard({ brand }: { brand: Brand }) {
  const logoSrc = BRAND_LOGOS[brand.slug] ?? '/images/brands/default.svg';

  return (
    <Link
      href={`/servicos/${brand.slug}`}
      className={[
        // Base surface — mesmo padrão do ModelCard
        'group relative flex flex-col items-center gap-4 rounded-2xl p-5',
        'bg-white/[0.06] border border-white/[0.08]',
        // Hover
        'hover:bg-white/[0.10] hover:border-white/[0.18]',
        'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30',
        // Transição única e coerente
        'transition-all duration-200 ease-out',
        'cursor-pointer select-none',
      ].join(' ')}
    >
      {/* ── Logo container ── */}
      <div
        className={[
          'relative flex items-center justify-center',
          'w-20 h-20 rounded-xl',
          // Mesma superfície fosca do ModelCard
          'bg-gradient-to-b from-white/[0.08] to-white/[0.03]',
          'border border-white/[0.07]',
          'shadow-sm shadow-black/20',
          'group-hover:shadow-md group-hover:shadow-black/30',
          'transition-shadow duration-200',
        ].join(' ')}
      >
        <Image
          src={logoSrc}
          alt={brand.name}
          width={48}
          height={48}
          className={[
            'w-12 h-12 object-contain',
            // SVGs brancos ficam ótimos com opacity — sem inversão abrupta
            'opacity-70 group-hover:opacity-100',
            // Leve lift, sem scale dramático
            'group-hover:scale-105 group-hover:-translate-y-0.5',
            'transition-all duration-200 ease-out',
          ].join(' ')}
        />
      </div>

      {/* ── Brand name ── */}
      <span
        className={[
          'text-[13px] font-medium leading-snug text-center',
          'text-white/70 group-hover:text-white/95',
          'transition-colors duration-200',
        ].join(' ')}
      >
        {brand.name}
      </span>

      {/* ── Focus-visible ring (acessibilidade) ── */}
      <span
        className={[
          'absolute inset-0 rounded-2xl ring-2 ring-orange-400/0',
          'group-focus-visible:ring-orange-400/70',
          'transition-all duration-150',
        ].join(' ')}
        aria-hidden="true"
      />
    </Link>
  );
}
