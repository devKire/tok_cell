/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/services/service-form.tsx
'use client';

import { useState } from 'react';
import { adminCreateService } from '@/app/actions/admin';
import { Plus } from 'lucide-react';

export function ServiceForm({ models }: { models: any[] }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [installTime, setInstallTime] = useState('');
  const [atendimento, setAtendimento] = useState('LOJA_E_LOCAL');
  const [type, setType] = useState('OUTRO');
  const [isAttempt, setIsAttempt] = useState(false);
  const [promotionBadge, setPromotionBadge] = useState('');
  const [modelId, setModelId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !modelId || !price) return;

    setLoading(true);
    await adminCreateService({
      name: name.trim(),
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      installTime,
      atendimento,
      type,
      isAttempt,
      promotionBadge: promotionBadge || undefined,
      modelId,
    });
    setName('');
    setDescription('');
    setPrice('');
    setOriginalPrice('');
    setInstallTime('');
    setPromotionBadge('');
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <h3 className="font-semibold mb-3">Novo Serviço</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        >
          <option value="">Selecione o modelo</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.line.brand.name} {model.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nome do serviço *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço original"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Tempo de instalação"
          value={installTime}
          onChange={(e) => setInstallTime(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        />
        <select
          value={atendimento}
          onChange={(e) => setAtendimento(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        >
          <option value="LOJA_E_LOCAL">Loja e Local</option>
          <option value="LOJA">Loja</option>
          <option value="LOCAL">Local</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        >
          <option value="OUTRO">Outro</option>
          <option value="TROCA_TELA">Troca de Tela</option>
          <option value="TROCA_VIDRO">Troca de Vidro</option>
          <option value="BATERIA">Bateria</option>
          <option value="COMPONENTE">Componente</option>
          <option value="CAMERA">Câmera</option>
          <option value="TAMPA">Tampa</option>
          <option value="LENTE">Lente</option>
          <option value="LIMPEZA">Limpeza</option>
          <option value="FACE_ID">Face ID</option>
        </select>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={isAttempt}
              onChange={(e) => setIsAttempt(e.target.checked)}
              className="rounded text-gray-400 border-gray-300"
            />
            É tentativa
          </label>
          <input
            type="text"
            placeholder="Badge promocional"
            value={promotionBadge}
            onChange={(e) => setPromotionBadge(e.target.value)}
            className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm flex-1"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !name.trim() || !modelId || !price}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 mt-3"
      >
        <Plus className="h-4 w-4" />
        Adicionar Serviço
      </button>
    </form>
  );
}
