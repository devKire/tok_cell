// app/servicos/page.tsx - Esta não usa params, não precisa mudar
import { getBrands } from '@/app/actions';
import type { Metadata } from 'next';
import SectionTitle from '../components/SectionTitle';
import { BrandCard } from '../components/device/BrandCard';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Selecione a marca do seu celular para ver serviços disponíveis.',
};

export default async function ServicosPage() {
  const brands = await getBrands();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <SectionTitle
        title="Qual a marca do seu celular?"
        subtitle="Selecione para ver modelos e serviços disponíveis"
      />
      {brands.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📱</p>
          <p className="font-medium text-gray-400">Nenhuma marca cadastrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
}
