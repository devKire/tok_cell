'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/hooks/use-cart';
import { openWhatsApp } from '@/app/lib/whatsapp';
import { toast } from 'sonner';
import SectionTitle from '../components/SectionTitle';
import Header from '../components/layout/Header';
import { createOrder } from '../actions';

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

export default function CheckoutPage() {
  const { items, subtotal, discount, locationFee, total, clearCart } =
    useCart();
  const router = useRouter();

  const [atend, setAtend] = useState<'LOJA' | 'LOCAL'>('LOJA');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [obs, setObs] = useState('');
  const [gift, setGift] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-bold mb-2">Carrinho vazio</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Adicione serviços antes de finalizar
        </p>
        <button
          onClick={() => router.push('/servicos')}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Ver serviços
        </button>
      </div>
    );
  }

  const finalTotal = total(atend);

  async function handleFinalize() {
    if (!name.trim() || !phone.trim()) {
      toast.error('Preencha nome e WhatsApp para continuar');
      return;
    }
    if (atend === 'LOCAL' && !address.trim()) {
      toast.error('Informe o endereço para atendimento no local');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Primeiro salva no banco
      const orderData = {
        atendimento: atend,
        customerName: name,
        customerCpf: cpf || undefined,
        customerPhone: phone,
        address: atend === 'LOCAL' ? address : undefined,
        preferredTime: time || undefined,
        observation: obs || undefined,
        gift,
        subtotal,
        discount,
        locationFee,
        total: finalTotal,
        deviceModelName: items[0]?.modelName,
        brandName: items[0]?.brandName,
        items: items.map((item) => ({
          serviceId: item.service.id,
          serviceName: item.service.name,
          variantName: item.selectedVariant?.name,
          componentName: item.selectedComponent?.name,
          price: item.price,
          installTime: item.service.installTime,
        })),
      };

      const result = await createOrder(orderData);

      if (!result.success) {
        toast.error('Erro ao salvar pedido. Tente novamente.');
        return;
      }

      // 2. Depois abre o WhatsApp
      openWhatsApp({
        form: {
          atendimento: atend,
          name,
          phone,
          cpf,
          address,
          preferredTime: time,
          observation: obs,
          gift,
        },
        items,
        subtotal,
        discount,
        locationFee,
        total: finalTotal,
        deviceModelName: items[0]?.modelName ?? '',
        brandName: items[0]?.brandName ?? '',
      });

      // 3. Limpa o carrinho
      clearCart();
      toast.success('Pedido enviado com sucesso!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao processar pedido');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 mt-20">
      <Header />
      <SectionTitle
        title="Finalizar Pedido"
        subtitle="Preencha seus dados e receba a confirmação pelo WhatsApp"
      />

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-black mb-3 text-[15px]">
          Tipo de atendimento
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(['LOJA', 'LOCAL'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setAtend(opt)}
              className={`border-2 rounded-xl p-4 text-left transition-all ${atend === opt ? 'border-black bg-white' : 'border-gray-200 bg-white'}`}
            >
              <div className="text-xl  mb-1.5">
                {opt === 'LOJA' ? '🏪' : '🏠'}
              </div>
              <div className="font-bold text-black text-sm">
                {opt === 'LOJA' ? 'Na Loja' : 'No Local'}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {opt === 'LOJA'
                  ? 'Adhemar Garcia · Sem taxa'
                  : 'Vamos até você · +7%'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {[
          {
            label: 'Nome completo',
            id: 'name',
            value: name,
            setter: setName,
            required: true,
            placeholder: 'Seu nome completo',
          },
          {
            label: 'WhatsApp',
            id: 'phone',
            value: phone,
            setter: setPhone,
            required: true,
            placeholder: '(47) 99999-9999',
            type: 'tel',
          },
          {
            label: 'CPF',
            id: 'cpf',
            value: cpf,
            setter: setCpf,
            required: false,
            placeholder: '000.000.000-00',
          },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-sm font-semibold mb-1.5">
              {f.label}{' '}
              {!f.required && (
                <span className="font-normal text-gray-400">(opcional)</span>
              )}
            </label>
            <input
              type={f.type ?? 'text'}
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        ))}

        {atend === 'LOCAL' && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Endereço completo
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro, complemento"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Horário preferido
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border text-black border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black bg-white transition-colors"
              >
                <option value="">Selecione um horário</option>
                <option>Manhã (9h às 12h)</option>
                <option>Tarde 1 (13h30 às 15h)</option>
                <option>Tarde 2 (15h às 17h)</option>
                <option>Fim de tarde (17h às 19h)</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Observação{' '}
            <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Descreva o problema ou algum detalhe importante"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={gift}
            onChange={(e) => setGift(e.target.checked)}
            className="w-4 h-4 accent-black"
          />
          🎁 Quero película brinde ou capinha
        </label>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Resumo do pedido
        </p>
        <div className="space-y-1.5 text-sm">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-600">
              <span>
                {item.service.name}
                {item.selectedVariant && ` (${item.selectedVariant.name})`}
                {item.selectedComponent && ` (${item.selectedComponent.name})`}
              </span>
              <span>{fmtBRL(item.price)}</span>
            </div>
          ))}
          <div className="flex justify-between text-gray-500 pt-1 border-t border-gray-200 mt-1">
            <span>Subtotal</span>
            <span>{fmtBRL(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto multi-serviço (5%)</span>
              <span>-{fmtBRL(discount)}</span>
            </div>
          )}
          {atend === 'LOCAL' && (
            <div className="flex justify-between text-gray-600">
              <span>Taxa de deslocamento (7%)</span>
              <span>+{fmtBRL(locationFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base pt-2 border-t text-black border-gray-200 mt-1">
            <span>Total</span>
            <span>{fmtBRL(finalTotal)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinalize}
        disabled={isSubmitting}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Salvando pedido...</span>
          </>
        ) : (
          <>
            <span>Finalizar pelo WhatsApp</span>
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-400 mt-3">
        Você será redirecionado para o WhatsApp com o pedido formatado
      </p>
    </div>
  );
}
