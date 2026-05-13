// app/admin/testimonials/testimonial-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { adminCreateTestimonial } from '@/app/actions/admin';

export function TestimonialForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [device, setDevice] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    await adminCreateTestimonial({
      name: name.trim(),
      avatar: avatar.trim() || null,
      rating,
      content: content.trim(),
      device: device.trim() || null,
    });
    setName('');
    setAvatar('');
    setRating(5);
    setContent('');
    setDevice('');
    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <h3 className="font-semibold mb-3 text-gray-400">Novo Depoimento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Nome do cliente *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
          required
        />
        <input
          type="text"
          placeholder="URL do avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        />
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Nota: {rating}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Aparelho"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm"
        />
        <textarea
          placeholder="Depoimento *"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="px-3 py-2 border text-gray-400 border-gray-200 rounded-lg text-sm md:col-span-2"
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || !name.trim() || !content.trim()}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 mt-3"
      >
        <Plus className="h-4 w-4" />
        Adicionar Depoimento
      </button>
    </form>
  );
}
