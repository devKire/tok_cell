// app/admin/brands/brand-list.tsx
'use client';

import { useState } from 'react';
import { adminUpdateBrand, adminDeleteBrand } from '@/app/actions/admin';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import Image from 'next/image';

interface Brand {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  active: boolean;
  order: number;
  _count: { lines: number };
}

export function BrandList({ brands }: { brands: Brand[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editOrder, setEditOrder] = useState(0);

  function startEdit(brand: Brand) {
    setEditingId(brand.id);
    setEditName(brand.name);
    setEditImageUrl(brand.imageUrl || '');
    setEditActive(brand.active);
    setEditOrder(brand.order);
  }

  async function saveEdit(id: string) {
    await adminUpdateBrand(id, {
      name: editName,
      imageUrl: editImageUrl || undefined,
      active: editActive,
      order: editOrder,
    });
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta marca?')) {
      await adminDeleteBrand(id);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Marca
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Slug
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Linhas
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Ordem
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Ativo
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
              {editingId === brand.id ? (
                <>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3 text-gray-500">
                    {brand._count.lines}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(Number(e.target.value))}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-20"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditActive(!editActive)}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        editActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {editActive ? 'Sim' : 'Não'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(brand.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {brand.imageUrl && (
                        <Image
                          src={brand.imageUrl}
                          alt={brand.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-400">
                        {brand.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {brand.slug}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {brand._count.lines}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{brand.order}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        brand.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {brand.active ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(brand)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
