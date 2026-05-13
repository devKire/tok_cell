/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/orders/page.tsx - Pedidos (atualizado)
import { adminGetOrders } from '@/app/actions/admin';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { OrderStatusSelect } from './order-status-select';

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

export default async function AdminOrdersPage() {
  const { orders, total } = await adminGetOrders({});

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Pedidos</h1>
          <p className="text-sm text-gray-400">{total} pedidos no total</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Cliente
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Aparelho
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Atendimento
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Total
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  Nenhum pedido ainda
                </td>
              </tr>
            )}
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-xs text-gray-400">
                    {order.customerPhone}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {order.brandName} {order.deviceModelName}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                      order.atendimento === 'LOCAL'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {order.atendimento === 'LOCAL' ? 'No Local' : 'Na Loja'}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">
                  {fmtBRL(Number(order.total))}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
