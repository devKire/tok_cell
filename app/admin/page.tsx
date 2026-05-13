/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/page.tsx - Dashboard
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { adminGetStats } from '../actions/admin';

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

export default async function AdminDashboardPage() {
  const stats = await adminGetStats();

  const cards = [
    {
      label: 'Pedidos Hoje',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      label: 'Pendentes',
      value: stats.pendingOrders,
      icon: Package,
      color: 'bg-yellow-500',
    },
    {
      label: 'Concluídos',
      value: stats.completedOrders,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Faturamento',
      value: fmtBRL(stats.revenue),
      icon: LayoutDashboard,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl text-gray-500 font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`${card.color} p-2 rounded-lg`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
            <p className="text-2xl  text-gray-400 font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-400 mb-4">Pedidos Recentes</h2>
        <div className="space-y-3">
          {stats.recentOrders.map((order: any) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-400 text-sm">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-400">
                  {order.brandName} {order.deviceModelName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold  text-gray-400 text-sm">
                  {fmtBRL(Number(order.total))}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
