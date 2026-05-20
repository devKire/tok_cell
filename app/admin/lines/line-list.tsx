/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/lines/line-list.tsx
'use client';

import { useState } from 'react';
import { adminUpdateLine, adminDeleteLine } from '@/app/actions/admin';
import { Pencil, Trash2, X, Check } from 'lucide-react';

export function LineList({ lines }: { lines: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editOrder, setEditOrder] = useState(0);

  function startEdit(line: any) {
    setEditingId(line.id);
    setEditName(line.name);
    setEditActive(line.active);
    setEditOrder(line.order);
  }

  async function saveEdit(id: string) {
    await adminUpdateLine(id, {
      name: editName,
      active: editActive,
      order: editOrder,
    });
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta linha?')) {
      await adminDeleteLine(id);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Linha
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Marca
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Modelos
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
          {lines.map((line) => (
            <tr key={line.id} className="hover:bg-gray-50 transition-colors">
              {editingId === line.id ? (
                <>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{line.brand.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {line._count.models}
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
                        onClick={() => saveEdit(line.id)}
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
                  <td className="px-4 py-3 font-medium text-gray-400">
                    {line.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{line.brand.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {line._count.models}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{line.order}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        line.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {line.active ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(line)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(line.id)}
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
