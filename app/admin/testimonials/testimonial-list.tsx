/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/testimonials/testimonial-list.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, X, Check, Star } from 'lucide-react';
import Image from 'next/image';
import {
  adminUpdateTestimonial,
  adminDeleteTestimonial,
} from '@/app/actions/admin';

export function TestimonialList({ testimonials }: { testimonials: any[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editContent, setEditContent] = useState('');
  const [editDevice, setEditDevice] = useState('');
  const [editActive, setEditActive] = useState(true);

  function startEdit(t: any) {
    setEditingId(t.id);
    setEditName(t.name);
    setEditAvatar(t.avatar || '');
    setEditRating(t.rating);
    setEditContent(t.content);
    setEditDevice(t.device || '');
    setEditActive(t.active);
  }

  async function saveEdit(id: string) {
    await adminUpdateTestimonial(id, {
      name: editName,
      avatar: editAvatar || null,
      rating: editRating,
      content: editContent,
      device: editDevice || null,
      active: editActive,
    });
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      await adminDeleteTestimonial(id);
      router.refresh();
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Cliente
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Depoimento
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Nota
            </th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
              Aparelho
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
          {testimonials.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
              {editingId === t.id ? (
                <>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
                      rows={2}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-16"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editDevice}
                      onChange={(e) => setEditDevice(e.target.value)}
                      className="px-2 py-1 border text-gray-400 border-gray-200 rounded text-sm w-full"
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
                        onClick={() => saveEdit(t.id)}
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
                      {t.avatar && (
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-400">
                        {t.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs">
                    <p className="line-clamp-2">{t.content}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{t.device || '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${t.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {t.active ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(t)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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
