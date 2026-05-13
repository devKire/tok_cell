// app/admin/brands/page.tsx - Marcas
import { adminGetBrands } from '@/app/actions/admin';
import { BrandForm } from './brand-form';
import { BrandList } from './brand-list';

export default async function AdminBrandsPage() {
  const brands = await adminGetBrands();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Marcas</h1>
          <p className="text-sm text-gray-400">
            {brands.length} marcas cadastradas
          </p>
        </div>
      </div>

      <BrandForm />
      <BrandList brands={brands} />
    </div>
  );
}
