// app/admin/brands/brand-form.tsx
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { adminCreateBrand } from '@/app/actions/admin';

export function BrandForm() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await adminCreateBrand({
      name: name.trim(),
      imageUrl: imageUrl.trim() || undefined,
    });
    setName('');
    setImageUrl('');
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <h3 className="font-semibold mb-3 text-gray-400">Nova Marca</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Nome da marca *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border border-gray-200 text-gray-400 rounded-lg text-sm"
          required
        />
        <input
          type="text"
          placeholder="URL da imagem (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="px-3 py-2 border border-gray-200 text-gray-400 rounded-lg text-sm"
        />
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>
    </form>
  );
}
