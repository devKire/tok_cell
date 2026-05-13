// app/admin/lines/page.tsx - Linhas
import { adminGetLines, adminGetBrands } from '@/app/actions/admin';
import { LineForm } from './line-form';
import { LineList } from './line-list';

export default async function AdminLinesPage() {
  const lines = await adminGetLines();
  const brands = await adminGetBrands();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Linhas</h1>
          <p className="text-sm text-gray-400">
            {lines.length} linhas cadastradas
          </p>
        </div>
      </div>

      <LineForm brands={brands} />
      <LineList lines={lines} />
    </div>
  );
}
