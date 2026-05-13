/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/models/model-form.tsx
'use client';

import { useState } from 'react';
import { adminCreateModel } from '@/app/actions/admin';
import { Plus } from 'lucide-react';

export function ModelForm({ lines }: { lines: any[] }) {
  const [name, setName] = useState('');
  const [lineId, setLineId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !lineId) return;

    setLoading(true);
    await adminCreateModel({
      name: name.trim(),
      lineId,
      imageUrl: imageUrl.trim() || undefined,
    });
    setName('');
    setLineId('');
    setImageUrl('');
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <h3 className="font-semibold mb-3">Novo Modelo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={lineId}
          onChange={(e) => setLineId(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        >
          <option value="">Selecione a linha</option>
          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.brand.name} - {line.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nome do modelo *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading || !name.trim() || !lineId}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="URL da imagem (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm w-full"
        />
      </div>
    </form>
  );
}
