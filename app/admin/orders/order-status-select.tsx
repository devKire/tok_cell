// app/admin/orders/order-status-select.tsx
'use client';

import { adminUpdateOrderStatus } from '@/app/actions/admin';

const STATUS_OPTIONS = [
  {
    value: 'PENDING',
    label: 'Pendente',
    class: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'CONFIRMED',
    label: 'Confirmado',
    class: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'IN_PROGRESS',
    label: 'Em progresso',
    class: 'bg-purple-100 text-purple-800',
  },
  {
    value: 'COMPLETED',
    label: 'Concluído',
    class: 'bg-green-100 text-green-800',
  },
  { value: 'CANCELED', label: 'Cancelado', class: 'bg-blue-100 text-blue-800' },
];

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const current = STATUS_OPTIONS.find((o) => o.value === currentStatus);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await adminUpdateOrderStatus(orderId, e.target.value);
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer ${current?.class}`}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
