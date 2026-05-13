/* eslint-disable @typescript-eslint/no-explicit-any */
// app/servicos/[brand]/[line]/[model]/page.tsx
import { notFound } from 'next/navigation';
import { getModelBySlug } from '@/app/actions';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import SectionTitle from '@/app/components/SectionTitle';
import ServiceSelector from '@/app/components/services/ServiceSelector';

type Props = {
  params: Promise<{
    // ← params agora é Promise!
    brand: string;
    line: string;
    model: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, line, model } = await params; // ← await!
  const data = await getModelBySlug(brand, line, model);
  return { title: `Serviços — ${data?.name ?? 'Modelo'}` };
}

export default async function ModelServicesPage({ params }: Props) {
  const { brand, line, model } = await params; // ← await!

  console.log('ModelServicesPage - Params:', { brand, line, model });

  const data = await getModelBySlug(brand, line, model);

  console.log(
    'ModelServicesPage - Data:',
    data ? `Found: ${data.name}` : 'Not found'
  );
  console.log(
    'ModelServicesPage - Services count:',
    data?.services?.length ?? 0
  );

  if (!data) notFound();

  const brandData = data.line.brand;
  const lineData = data.line;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 mt-20">
      <Breadcrumb
        items={[
          { label: 'Marcas', href: '/servicos' },
          { label: brandData.name, href: `/servicos/${brand}` },
          { label: lineData.name },
          { label: data.name },
        ]}
      />
      <SectionTitle
        title={data.name}
        subtitle="Selecione os serviços que precisa e adicione ao carrinho"
      />

      {!data.services || data.services.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔧</p>
          <p className="font-medium text-gray-400">
            Nenhum serviço cadastrado para este modelo
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Entre em contato pelo WhatsApp para consultar disponibilidade
          </p>
        </div>
      ) : (
        <ServiceSelector
          services={data.services as any}
          modelId={data.id}
          modelName={`${brandData.name} ${data.name}`}
          brandName={brandData.name}
          brandSlug={brand}
          lineSlug={line}
        />
      )}
    </div>
  );
}
