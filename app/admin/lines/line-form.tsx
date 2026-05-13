/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/lines/line-form.tsx
'use client';

import { useState } from 'react';
import { adminCreateLine } from '@/app/actions/admin';
import { Plus } from 'lucide-react';

export function LineForm({ brands }: { brands: any[] }) {
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !brandId) return;

    setLoading(true);
    await adminCreateLine({ name: name.trim(), brandId });
    setName('');
    setBrandId('');
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <h3 className="font-semibold text-gray-400 mb-3">Nova Linha</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400"
          required
        >
          <option value="">Selecione a marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nome da linha *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400"
          required
        />
        <button
          type="submit"
          disabled={loading || !name.trim() || !brandId}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>
    </form>
  );
}
