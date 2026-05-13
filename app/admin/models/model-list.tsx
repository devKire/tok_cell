/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/models/model-list.tsx
'use client';

import { useState } from 'react';
import { adminUpdateModel, adminDeleteModel } from '@/app/actions/admin';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import Image from 'next/image';

export function ModelList({ models }: { models: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editOrder, setEditOrder] = useState(0);

  function startEdit(model: any) {
    setEditingId(model.id);
    setEditName(model.name);
    setEditImageUrl(model.imageUrl || '');
    setEditActive(model.active);
    setEditOrder(model.order);
  }

  async function saveEdit(id: string) {
    await adminUpdateModel(id, {
      name: editName,
      imageUrl: editImageUrl || undefined,
      active: editActive,
      order: editOrder,
    });
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este modelo?')) {
      await adminDeleteModel(id);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Modelo
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Linha
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Marca
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Serviços
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
          {models.map((model) => (
            <tr key={model.id} className="hover:bg-gray-50 transition-colors">
              {editingId === model.id ? (
                <>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{model.line.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {model.line.brand.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {model._count.services}
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
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {editActive ? 'Sim' : 'Não'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(model.id)}
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
                      {model.imageUrl && (
                        <Image
                          src={model.imageUrl}
                          alt={model.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-400">
                        {model.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{model.line.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {model.line.brand.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {model._count.services}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{model.order}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        model.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {model.active ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(model)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="text-red-600 hover:text-red-700"
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
