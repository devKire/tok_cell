/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/services/service-list.tsx
'use client';

import { useState } from 'react';
import { adminUpdateService, adminDeleteService } from '@/app/actions/admin';
import { Pencil, Trash2, X, Check } from 'lucide-react';

const TYPE_LABEL: Record<string, string> = {
  TROCA_TELA: 'Troca de Tela',
  TROCA_VIDRO: 'Troca de Vidro',
  BATERIA: 'Bateria',
  COMPONENTE: 'Componente',
  CAMERA: 'Câmera',
  TAMPA: 'Tampa',
  LENTE: 'Lente',
  LIMPEZA: 'Limpeza',
  FACE_ID: 'Face ID',
  OUTRO: 'Outro',
};

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

export function ServiceList({ services }: { services: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState<
    number | undefined
  >(undefined);
  const [editInstallTime, setEditInstallTime] = useState('');
  const [editAtendimento, setEditAtendimento] = useState('LOJA_E_LOCAL');
  const [editType, setEditType] = useState('OUTRO');
  const [editIsAttempt, setEditIsAttempt] = useState(false);
  const [editPromotionBadge, setEditPromotionBadge] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editOrder, setEditOrder] = useState(0);

  function startEdit(service: any) {
    setEditingId(service.id);
    setEditName(service.name);
    setEditDescription(service.description);
    setEditPrice(Number(service.price));
    setEditOriginalPrice(
      service.originalPrice ? Number(service.originalPrice) : undefined
    );
    setEditInstallTime(service.installTime);
    setEditAtendimento(service.atendimento);
    setEditType(service.type);
    setEditIsAttempt(service.isAttempt);
    setEditPromotionBadge(service.promotionBadge || '');
    setEditActive(service.active);
    setEditOrder(service.order);
  }

  async function saveEdit(id: string) {
    await adminUpdateService(id, {
      name: editName,
      description: editDescription,
      price: editPrice,
      originalPrice: editOriginalPrice,
      installTime: editInstallTime,
      atendimento: editAtendimento,
      type: editType,
      isAttempt: editIsAttempt,
      promotionBadge: editPromotionBadge || undefined,
      active: editActive,
      order: editOrder,
    });
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      await adminDeleteService(id);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Serviço
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Modelo
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Tipo
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Preço
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Tempo
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
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
              {editingId === service.id ? (
                <>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full mt-1"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {service.model.line.brand.name} {service.model.name}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm"
                    >
                      {Object.entries(TYPE_LABEL).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-24"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editInstallTime}
                      onChange={(e) => setEditInstallTime(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-20"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditActive(!editActive)}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${editActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {editActive ? 'Sim' : 'Não'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(service.id)}
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
                    <div className="font-medium text-gray-500">
                      {service.name}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-1">
                      {service.description}
                    </div>
                    {service.promotionBadge && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {service.promotionBadge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {service.model.line.brand.name} {service.model.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {TYPE_LABEL[service.type] || service.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-400">
                      {fmtBRL(Number(service.price))}
                    </div>
                    {service.originalPrice &&
                      Number(service.originalPrice) > Number(service.price) && (
                        <div className="text-xs text-gray-400 line-through">
                          {fmtBRL(Number(service.originalPrice))}
                        </div>
                      )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {service.installTime}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${service.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {service.active ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(service)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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
