// app/servicos/[brand]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLinesByBrand } from '@/app/actions';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import SectionTitle from '@/app/components/SectionTitle';
import Image from 'next/image';

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
    <div className="max-w-3xl mx-auto px-6 py-10">
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
            <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
              {line.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {line.models.map((model) => (
                <Link
                  key={model.id}
                  href={`/servicos/${brand}/${line.slug}/${model.slug}`}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium
                           hover:border-gray-900 hover:bg-gray-50 transition-all
                           flex items-center gap-2"
                >
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
                  {model.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
