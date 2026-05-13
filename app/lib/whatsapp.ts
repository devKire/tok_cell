import { OrderPayload } from '../types';

const WHATSAPP = '5547997513609';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function buildWhatsAppMessage(payload: OrderPayload): string {
  const {
    form,
    items,
    subtotal,
    discount,
    locationFee,
    total,
    deviceModelName,
    brandName,
  } = payload;

  const lines: string[] = [
    '📱 *Novo Pedido — Jc & Santana Celulares*',
    '─────────────────────────',
    '',
    `👤 *Cliente:* ${form.name}`,
    form.cpf ? `🪪 *CPF:* ${form.cpf}` : '',
    `📞 *WhatsApp:* ${form.phone}`,
    '',
    `📱 *Aparelho:* ${brandName} ${deviceModelName}`,
    '',
    `📍 *Atendimento:* ${form.atendimento === 'LOCAL' ? 'No Local' : 'Na Loja'}`,
    form.atendimento === 'LOCAL' && form.address
      ? `🏠 *Endereço:* ${form.address}`
      : '',
    form.atendimento === 'LOCAL' && form.preferredTime
      ? `🕐 *Horário preferido:* ${form.preferredTime}`
      : '',
    '',
    '🔧 *Serviços Solicitados:*',
    ...items.map((item, i) => {
      const label = [
        item.service.name,
        item.selectedVariant?.name,
        item.selectedComponent?.name,
      ]
        .filter(Boolean)
        .join(' — ');
      return `  ${i + 1}. ${label} → ${formatCurrency(item.price)}`;
    }),
    '',
    '─────────────────────────',
    `💰 *Subtotal:* ${formatCurrency(subtotal)}`,
    discount > 0
      ? `🎉 *Desconto multi-serviço (5%):* -${formatCurrency(discount)}`
      : '',
    form.atendimento === 'LOCAL'
      ? `🚗 *Taxa de deslocamento (7%):* +${formatCurrency(locationFee)}`
      : '',
    `✅ *Total: ${formatCurrency(total)}*`,
    '',
    form.gift ? '🎁 *Brinde:* Película ou capinha' : '',
    form.observation ? `📝 *Observação:* ${form.observation}` : '',
  ];

  return lines.filter((l) => l !== '').join('\n');
}

export function openWhatsApp(payload: OrderPayload): void {
  const message = buildWhatsAppMessage(payload);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP}?text=${encoded}`, '_blank');
}
