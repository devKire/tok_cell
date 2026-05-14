'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/hooks/use-cart';
import { openWhatsApp } from '@/app/lib/whatsapp';
import { toast } from 'sonner';
import SectionTitle from '../components/SectionTitle';
import Header from '../components/layout/Header';
import { createOrder } from '../actions';
import {
  Store,
  Home,
  User,
  Phone,
  CreditCard,
  MapPin,
  Clock,
  MessageSquare,
  Gift,
  ShoppingCart,
  Sparkles,
  Tag,
  Send,
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.08]">
            <ShoppingCart className="h-10 w-10 text-white/30" />
          </div>
          <h2 className="text-xl font-bold text-white/90 mb-2">
            Carrinho vazio
          </h2>
          <p className="text-white/40 mb-8 text-sm">
            Adicione serviços antes de finalizar
          </p>
          <button
            onClick={() => router.push('/servicos')}
            className="relative px-6 py-3 rounded-xl bg-white/[0.10] border border-white/[0.14] 
              text-white font-medium text-sm hover:bg-white/[0.15] hover:border-white/[0.20] 
              transition-all duration-200 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            Ver serviços
          </button>
        </div>
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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#111]">
      {/* Overlay sutil */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 py-10 mt-20">
        <Header />
        <SectionTitle
          title="Finalizar Pedido"
          subtitle="Preencha seus dados e receba a confirmação pelo WhatsApp"
        />

        {/* Tipo de atendimento */}
        <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
            Tipo de atendimento
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(['LOJA', 'LOCAL'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setAtend(opt)}
                className={`relative border rounded-xl p-4 text-left transition-all duration-200 overflow-hidden group
                  ${
                    atend === opt
                      ? 'border-red-500/30 bg-red-500/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.12]'
                  }`}
              >
                {/* Glow atrás do ícone */}
                {atend === opt && (
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/10 rounded-full blur-xl" />
                )}

                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-200
                    ${
                      atend === opt
                        ? 'bg-red-500/15 text-red-400'
                        : 'bg-white/[0.06] text-white/40 group-hover:text-white/60'
                    }`}
                  >
                    {opt === 'LOJA' ? (
                      <Store className="h-5 w-5" />
                    ) : (
                      <Home className="h-5 w-5" />
                    )}
                  </div>
                  <div
                    className={`font-bold text-sm transition-colors
                    ${atend === opt ? 'text-white' : 'text-white/60'}`}
                  >
                    {opt === 'LOJA' ? 'Na Loja' : 'No Local'}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">
                    {opt === 'LOJA'
                      ? 'Adhemar Garcia · Sem taxa'
                      : 'Vamos até você · +7%'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-5 mb-6 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
            Seus dados
          </p>

          {[
            {
              label: 'Nome completo',
              id: 'name',
              value: name,
              setter: setName,
              required: true,
              placeholder: 'Seu nome completo',
              icon: User,
            },
            {
              label: 'WhatsApp',
              id: 'phone',
              value: phone,
              setter: setPhone,
              required: true,
              placeholder: '(47) 99999-9999',
              type: 'tel',
              icon: Phone,
            },
            {
              label: 'CPF',
              id: 'cpf',
              value: cpf,
              setter: setCpf,
              required: false,
              placeholder: '000.000.000-00',
              icon: CreditCard,
            },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-sm font-medium text-white/60 mb-2">
                {f.label}{' '}
                {!f.required && (
                  <span className="font-normal text-white/30">(opcional)</span>
                )}
              </label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type={f.type ?? 'text'}
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                    bg-white/[0.05] border border-white/[0.08]
                    text-white placeholder:text-white/20
                    focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.07]
                    transition-all duration-200"
                />
              </div>
            </div>
          ))}

          {atend === 'LOCAL' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Endereço completo
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, número, bairro, complemento"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                      bg-white/[0.05] border border-white/[0.08]
                      text-white placeholder:text-white/20
                      focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.07]
                      transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Horário preferido
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm appearance-none
                      bg-white/[0.05] border border-white/[0.08]
                      text-white
                      focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.07]
                      transition-all duration-200"
                  >
                    <option value="" className="bg-[#111] text-white/40">
                      Selecione um horário
                    </option>
                    <option className="bg-[#111] text-white">
                      Manhã (9h às 12h)
                    </option>
                    <option className="bg-[#111] text-white">
                      Tarde 1 (13h30 às 15h)
                    </option>
                    <option className="bg-[#111] text-white">
                      Tarde 2 (15h às 17h)
                    </option>
                    <option className="bg-[#111] text-white">
                      Fim de tarde (17h às 19h)
                    </option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Observação{' '}
              <span className="font-normal text-white/30">(opcional)</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/20" />
              <textarea
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                placeholder="Descreva o problema ou algum detalhe importante"
                rows={3}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm resize-none
                  bg-white/[0.05] border border-white/[0.08]
                  text-white placeholder:text-white/20
                  focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.07]
                  transition-all duration-200"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={gift}
                onChange={(e) => setGift(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-5 h-5 rounded-md border border-white/[0.12] bg-white/[0.05] 
                peer-checked:bg-red-500/20 peer-checked:border-red-500/40
                flex items-center justify-center transition-all duration-200"
              >
                {gift && (
                  <svg
                    className="w-3 h-3 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-white/60 group-hover:text-white/80 transition-colors flex items-center gap-2">
              <Gift className="h-4 w-4 text-red-400/60" />
              Quero película brinde ou capinha
            </span>
          </label>
        </div>

        {/* Resumo do pedido */}
        <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
            Resumo do pedido
          </p>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-white/50 group hover:text-white/70 transition-colors"
              >
                <span className="truncate mr-4">
                  {item.service.name}
                  {item.selectedVariant && (
                    <span className="text-white/30">
                      {' '}
                      — {item.selectedVariant.name}
                    </span>
                  )}
                  {item.selectedComponent && (
                    <span className="text-white/30">
                      {' '}
                      — {item.selectedComponent.name}
                    </span>
                  )}
                </span>
                <span className="shrink-0">{fmtBRL(item.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-white/40 pt-2 border-t border-white/[0.08] mt-2">
              <span>Subtotal</span>
              <span>{fmtBRL(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400/80 items-center">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3 w-3" />
                  Desconto multi-serviço
                </span>
                <span className="font-medium">-{fmtBRL(discount)}</span>
              </div>
            )}
            {atend === 'LOCAL' && (
              <div className="flex justify-between text-white/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  Taxa de deslocamento
                </span>
                <span>+{fmtBRL(locationFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-white/[0.08] mt-2">
              <span className="text-white/80">Total</span>
              <span className="text-white">{fmtBRL(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Botão de finalizar */}
        <button
          onClick={handleFinalize}
          disabled={isSubmitting}
          className="relative w-full py-4 rounded-xl font-bold text-base
            bg-white/[0.10] border border-white/[0.14]
            text-white
            hover:bg-white/[0.15] hover:border-white/[0.20]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2
            overflow-hidden group"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          {isSubmitting ? (
            <>
              <span className="animate-spin">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </span>
              <span className="text-white/70">Salvando pedido...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Finalizar pelo WhatsApp</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-white/20 mt-3">
          Você será redirecionado para o WhatsApp com o pedido formatado
        </p>
      </div>
    </div>
  );
}
