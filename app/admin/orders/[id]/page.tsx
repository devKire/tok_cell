/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/orders/[id]/page.tsx
import { adminGetOrderById } from '@/app/actions/admin';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { OrderStatusSelect } from '../order-status-select';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

const STATUS_LABELS: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: {
    label: 'Pendente',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
  },
  CONFIRMED: {
    label: 'Confirmado',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
  },
  IN_PROGRESS: {
    label: 'Em Progresso',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100',
  },
  COMPLETED: {
    label: 'Concluído',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
  },
  CANCELED: {
    label: 'Cancelado',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
  },
};

// CORREÇÃO: params agora é uma Promise no Next.js 15
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Aguarda a resolução da Promise
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  console.log('Order ID:', orderId); // Debug

  if (!orderId) {
    notFound();
  }

  const order = await adminGetOrderById(orderId);

  if (!order) {
    notFound();
  }

  const status = STATUS_LABELS[order.status];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Voltar para pedidos
          </Link>
          <h1 className="text-2xl font-bold text-black">
            Pedido #{order.id.slice(-8)}
          </h1>
          <p className="text-sm text-gray-500">
            Criado{' '}
            {format(
              new Date(order.createdAt),
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              { locale: ptBR }
            )}{' '}
            (
            {formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
              locale: ptBR,
            })}
            )
          </p>
        </div>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Status do Pedido
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${status.bgColor} ${status.color}`}
              >
                {status.label}
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    order.status === 'CANCELED'
                      ? 'bg-red-500'
                      : order.status === 'COMPLETED'
                        ? 'bg-green-500'
                        : order.status === 'IN_PROGRESS'
                          ? 'bg-purple-500'
                          : order.status === 'CONFIRMED'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                  }`}
                  style={{
                    width:
                      order.status === 'PENDING'
                        ? '20%'
                        : order.status === 'CONFIRMED'
                          ? '40%'
                          : order.status === 'IN_PROGRESS'
                            ? '70%'
                            : order.status === 'COMPLETED'
                              ? '100%'
                              : '100%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Serviços Solicitados
            </h2>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.serviceName}
                      </p>
                      <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                        {item.variantName && (
                          <p>📌 Variante: {item.variantName}</p>
                        )}
                        {item.componentName && (
                          <p>🔧 Componente: {item.componentName}</p>
                        )}
                        {item.installTime && (
                          <p>⏱️ Tempo estimado: {item.installTime}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {fmtBRL(Number(item.price))}
                  </span>
                </div>
              ))}
            </div>

            {/* Resumo Financeiro */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{fmtBRL(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto multi-serviço (5%)</span>
                  <span>-{fmtBRL(Number(order.discount))}</span>
                </div>
              )}
              {Number(order.locationFee) > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxa de deslocamento (7%)</span>
                  <span>+{fmtBRL(Number(order.locationFee))}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t text-black border-gray-200">
                <span>Total</span>
                <span className="text-green-500">
                  {fmtBRL(Number(order.total))}
                </span>
              </div>
            </div>
          </div>

          {/* Observações */}
          {order.observation && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-black">
                📝 Observações do Cliente
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {order.observation}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informações do Cliente */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              👤 Cliente
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium  text-gray-400 uppercase">
                  Nome
                </label>
                <p className="text-sm font-medium text-black">
                  {order.customerName}
                </p>
              </div>
              {order.customerCpf && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    CPF
                  </label>
                  <p className="text-sm font-mono text-black">
                    {order.customerCpf}
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase">
                  WhatsApp
                </label>
                <a
                  href={`https://wa.me/55${order.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  {order.customerPhone}
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Informações do Aparelho */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              📱 Aparelho
            </h2>
            <div className="space-y-3">
              {order.brandName && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    Marca
                  </label>
                  <p className="text-sm font-medium text-black">
                    {order.brandName}
                  </p>
                </div>
              )}
              {order.deviceModelName && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    Modelo
                  </label>
                  <p className="text-sm font-medium text-black">
                    {order.deviceModelName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Informações de Atendimento */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              📍 Atendimento
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase">
                  Tipo
                </label>
                <p className="text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                      order.atendimento === 'LOCAL'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {order.atendimento === 'LOCAL'
                      ? '🏠 No Local'
                      : '🏪 Na Loja'}
                  </span>
                </p>
              </div>
              {order.address && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    Endereço
                  </label>
                  <p className="text-sm text-black">{order.address}</p>
                </div>
              )}
              {order.preferredTime && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    Horário Preferido
                  </label>
                  <p className="text-sm text-black">🕐 {order.preferredTime}</p>
                </div>
              )}
              {order.gift && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase">
                    Brinde
                  </label>
                  <p className="text-sm text-black">🎁 Película ou Capinha</p>
                </div>
              )}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">
              ⚡ Ações Rápidas
            </h2>
            <div className="space-y-2">
              {order.customerPhone && (
                <a
                  href={`https://wa.me/55${order.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chamar no WhatsApp
                </a>
              )}
              {order.address && (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(order.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Ver no Mapa
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
