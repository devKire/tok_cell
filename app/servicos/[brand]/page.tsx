// app/servicos/[brand]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLinesByBrand } from '@/app/actions';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import SectionTitle from '@/app/components/SectionTitle';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';

type Props = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const lines = await getLinesByBrand(brand);
  const brandName = lines[0]?.brand?.name ?? brand;
  return { title: `Modelos — ${brandName}` };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;

  const lines = await getLinesByBrand(brand);

  if (!lines || lines.length === 0) {
    notFound();
  }

  const brandName = lines[0]?.brand?.name ?? brand;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-28 pb-16">
        <Breadcrumb
          items={[{ label: 'Marcas', href: '/servicos' }, { label: brandName }]}
        />

        <div className="mt-6 mb-10">
          <SectionTitle
            title={`Modelos ${brandName}`}
            subtitle="Selecione o modelo do seu aparelho"
          />
        </div>

        <div className="space-y-10">
          {lines.map((line) => (
            <section key={line.id}>
              {/* Line label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                  {line.name}
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Model grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {line.models.map((model) => (
                  <ModelCard
                    key={model.id}
                    brand={brand}
                    lineSlug={line.slug}
                    model={model}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ModelCard ────────────────────────────────────────────────────────────────

type Model = {
  id: string | number;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

function ModelCard({
  brand,
  lineSlug,
  model,
}: {
  brand: string;
  lineSlug: string;
  model: Model;
}) {
  return (
    <Link
      href={`/servicos/${brand}/${lineSlug}/${model.slug}`}
      className={[
        // Base
        'group relative flex flex-col items-center gap-4 rounded-2xl p-5',
        'bg-white/[0.06] border border-white/[0.08]',
        // Hover
        'hover:bg-white/[0.10] hover:border-white/[0.18]',
        'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30',
        // Transition — one place, one duration, no chaos
        'transition-all duration-200 ease-out',
        // Cursor / tap affordance
        'cursor-pointer select-none',
      ].join(' ')}
    >
      {/* ── Image container ── */}
      <div
        className={[
          'relative flex items-center justify-center',
          // maior
          'w-28 h-28 rounded-2xl',

          // fundo glass
          'bg-gradient-to-b from-white/[0.10] to-white/[0.04]',
          'border border-white/[0.08]',

          // destaque
          'shadow-lg shadow-black/25',
          'group-hover:shadow-xl group-hover:shadow-black/35',

          'transition-all duration-300',
        ].join(' ')}
      >
        {model.imageUrl ? (
          <Image
            src={model.imageUrl}
            alt={model.name}
            width={140}
            height={140}
            className={[
              // imagem ocupa quase tudo
              'w-[92%] h-[92%] object-contain',

              // hover suave
              'group-hover:scale-110 group-hover:-translate-y-1',

              'transition-all duration-300 ease-out',

              // sombra mais forte pro PNG destacar
              'drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]',
            ].join(' ')}
          />
        ) : (
          <span
            className="text-6xl group-hover:scale-110 group-hover:-translate-y-1
        transition-transform duration-300 ease-out"
            role="img"
            aria-label={model.name}
          >
            📱
          </span>
        )}
      </div>

      {/* ── Model name ── */}
      <span
        className={[
          'text-[13px] font-medium leading-snug text-center',
          'text-white/70 group-hover:text-white/95',
          'transition-colors duration-200',
        ].join(' ')}
      >
        {model.name}
      </span>

      {/* ── Active-state ring (purely accessible) ── */}
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
