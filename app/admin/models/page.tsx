// app/admin/models/page.tsx - Modelos
import { adminGetModels, adminGetLines } from '@/app/actions/admin';
import { ModelForm } from './model-form';
import { ModelList } from './model-list';

export default async function AdminModelsPage() {
  const models = await adminGetModels();
  const lines = await adminGetLines();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Modelos</h1>
          <p className="text-sm text-gray-400">
            {models.length} modelos cadastrados
          </p>
        </div>
      </div>

      <ModelForm lines={lines} />
      <ModelList models={models} />
    </div>
  );
}
