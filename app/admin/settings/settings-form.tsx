/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/settings/settings-form.tsx
'use client';

import { useState } from 'react';
import { adminUpdateSettings } from '@/app/actions/admin';
import { Save } from 'lucide-react';

export function SettingsForm({ settings }: { settings: any }) {
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '');
  const [address, setAddress] = useState(settings?.address || '');
  const [city, setCity] = useState(settings?.city || '');
  const [state, setState] = useState(settings?.state || '');
  const [multiDiscount, setMultiDiscount] = useState(
    settings?.multiDiscount || 5
  );
  const [locationFee, setLocationFee] = useState(settings?.locationFee || 7);
  const [minServicesDiscount, setMinServicesDiscount] = useState(
    settings?.minServicesDiscount || 2
  );
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await adminUpdateSettings({
      whatsapp,
      address,
      city,
      state,
      multiDiscount: Number(multiDiscount),
      locationFee: Number(locationFee),
      minServicesDiscount: Number(minServicesDiscount),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            WhatsApp
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Endereço
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Cidade
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Estado
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
            placeholder="SP"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Desconto Múltiplo (%)
          </label>
          <input
            type="number"
            value={multiDiscount}
            onChange={(e) => setMultiDiscount(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Taxa de Local (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={locationFee}
            onChange={(e) => setLocationFee(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Mínimo para Desconto
          </label>
          <input
            type="number"
            value={minServicesDiscount}
            onChange={(e) => setMinServicesDiscount(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
      >
        <Save className="h-4 w-4" />
        {saved ? 'Salvo!' : 'Salvar Configurações'}
      </button>
    </form>
  );
}
