// app/admin/settings/page.tsx - Configurações
import { adminGetSettings } from '@/app/actions/admin';
import { SettingsForm } from './settings-form';

export default async function AdminSettingsPage() {
  const settings = await adminGetSettings();

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl text-gray-500 font-bold">Configurações</h1>
        <p className="text-sm text-gray-400">
          Gerencie as configurações do sistema
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
