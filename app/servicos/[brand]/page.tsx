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
  params: Promise<{ brand: string }>; // ← params agora é Promise!
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params; // ← await!
  const lines = await getLinesByBrand(brand);
  const brandName = lines[0]?.brand?.name ?? brand;
  return { title: `Modelos — ${brandName}` };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params; // ← await!

  console.log('BrandPage - brand:', brand);

  const lines = await getLinesByBrand(brand);

  console.log('BrandPage - lines count:', lines.length);

  if (!lines || lines.length === 0) {
    notFound();
  }

  const brandName = lines[0]?.brand?.name ?? brand;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 mt-20">
      <Header />
      <Breadcrumb
        items={[{ label: 'Marcas', href: '/servicos' }, { label: brandName }]}
      />
      <SectionTitle
        title={`Modelos ${brandName}`}
        subtitle="Selecione o modelo do seu aparelho"
      />

      <div className="space-y-8">
        {lines.map((line) => (
          <div key={line.id}>
            <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-gray-100">
              {line.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {line.models.map((model) => (
                <Link
                  key={model.id}
                  href={`/servicos/${brand}/${line.slug}/${model.slug}`}
                  className="relative group bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-sm font-medium
                     hover:bg-white/70 hover:shadow-sm
                     transition-all duration-300 flex items-center gap-2
                     border border-transparent hover:border-gray-200"
                >
                  {/* Efeito glassmorphism base */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Borda sutil no hover */}
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/50 group-hover:ring-gray-200 transition-all duration-300" />

                  {model.imageUrl ? (
                    <Image
                      src={model.imageUrl}
                      alt={model.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded object-cover"
                    />
                  ) : (
                    <span className="text-lg">📱</span>
                  )}
                  <span className="text-white group-hover:text-gray-900 transition-colors">
                    {model.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
