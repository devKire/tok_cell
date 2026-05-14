/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/models/model-list.tsx
'use client';

import { useState } from 'react';
import { adminUpdateModel, adminDeleteModel } from '@/app/actions/admin';
import { Pencil, Trash2, X, Check, ImageIcon } from 'lucide-react';
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
              Imagem
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
                      className="px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Nome do modelo"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{model.line.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {model.line.brand.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        className="px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="URL da imagem (opcional)"
                      />
                      {editImageUrl && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={editImageUrl}
                            alt="Preview"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded object-cover border border-gray-200"
                            onError={(e) => {
                              // Se a imagem não carregar, mostra placeholder
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `<div class="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center"><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>`;
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {model._count.services}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(Number(e.target.value))}
                      className="px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm w-20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditActive(!editActive)}
                      className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                        editActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {editActive ? 'Sim' : 'Não'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(model.id)}
                        className="p-1 rounded hover:bg-green-50 text-green-600 hover:text-green-700 transition-colors"
                        title="Salvar"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Cancelar"
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
                      {model.imageUrl ? (
                        <Image
                          src={model.imageUrl}
                          alt={model.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <ImageIcon className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span className="font-medium text-gray-700">
                        {model.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{model.line.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {model.line.brand.name}
                  </td>
                  <td className="px-4 py-3">
                    {model.imageUrl ? (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Configurada
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
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
                        className="p-1 rounded hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="p-1 rounded hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                        title="Excluir"
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
