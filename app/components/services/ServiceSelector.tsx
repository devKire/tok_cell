'use client';

import { useState } from 'react';
import {
  Plus,
  Clock,
  Store,
  MapPin,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Service } from '@/app/types';
import { useCart } from '@/app/hooks/use-cart';
import CartDrawer from '../cart/CartDrawer';

type Props = {
  services: Service[];
  modelId: string;
  modelName: string;
  brandName: string;
  brandSlug: string;
  lineSlug: string;
};

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function AtendimentoBadge({ atend }: { atend: string }) {
  const isLocal = atend === 'LOJA_E_LOCAL';
  return (
    <span
      className={[
        'inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border',
        isLocal
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      ].join(' ')}
    >
      {isLocal ? <MapPin className="h-3 w-3" /> : <Store className="h-3 w-3" />}
      {isLocal ? 'Loja e Local' : 'Somente na loja'}
    </span>
  );
}

function TimeBadge({ time }: { time: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-white/40 bg-white/[0.05] border border-white/[0.07] rounded-md px-2 py-0.5">
      <Clock className="h-3 w-3" />
      {time}
    </span>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  modelName,
  brandName,
  brandSlug,
  lineSlug,
  featured,
}: {
  service: Service;
  modelName: string;
  brandName: string;
  brandSlug: string;
  lineSlug: string;
  featured: boolean;
}) {
  const { addItem } = useCart();
  const hasVariants = service.variants.length > 0;
  const hasComponents = service.components.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? service.variants[0] : undefined
  );
  const [selectedComponent, setSelectedComponent] = useState(
    hasComponents ? service.components[0] : undefined
  );
  const [accepted, setAccepted] = useState(false);

  const currentPrice =
    selectedVariant?.price ?? selectedComponent?.price ?? service.price;

  function handleAdd() {
    try {
      addItem({
        id: `${Date.now()}_${service.id}`,
        service,
        selectedVariant,
        selectedComponent,
        price: Number(currentPrice),
        modelName,
        brandName,
        lineSlug,
        brandSlug,
      });
      toast.success(`${service.name} adicionado ao carrinho`);
    } catch (error) {
      console.error('❌ Erro ao adicionar item:', error);
      toast.error('Erro ao adicionar serviço');
    }
  }

  const isDisabled = service.isAttempt && !accepted;

  return (
    <div
      className={[
        // Base — mesmo padrão do ModelCard / BrandCard
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'bg-white/[0.06] border border-white/[0.08]',
        'transition-all duration-200 ease-out',
        'hover:bg-white/[0.09] hover:border-white/[0.15] hover:shadow-lg hover:shadow-black/30',
        // Bento: cards destaque ocupam largura toda
        featured ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      {/* ── Topo: nome, descrição, badges ── */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Cabeçalho: badge de promoção + preço */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            {service.promotionBadge && (
              <span className="self-start text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/25">
                {service.promotionBadge}
              </span>
            )}
            <h3 className="text-[15px] font-semibold text-white/90 leading-snug">
              {service.name}
            </h3>
          </div>

          {/* Bloco de preço */}
          <div className="shrink-0 text-right">
            {service.originalPrice && (
              <p className="text-[11px] text-white/30 line-through leading-none mb-0.5">
                {fmtBRL(Number(service.originalPrice))}
              </p>
            )}
            <p className="text-lg font-bold text-emerald-400 leading-none">
              {fmtBRL(Number(currentPrice))}
            </p>
          </div>
        </div>

        {/* Descrição */}
        {service.description && (
          <p className="text-[13px] text-white/45 leading-relaxed">
            {service.description}
          </p>
        )}

        {/* Badges informativos */}
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          <TimeBadge time={service.installTime} />
          <AtendimentoBadge atend={service.atendimento} />
        </div>
      </div>

      {/* ── Rodapé: controles + botão ── */}
      <div
        className={[
          'px-5 py-3.5 border-t border-white/[0.07]',
          'bg-white/[0.03]',
          'flex flex-wrap items-center gap-2',
        ].join(' ')}
      >
        {/* Tentativa de reparo */}
        {service.isAttempt && (
          <label className="flex items-center gap-2 text-[11px] text-white/45 cursor-pointer mr-auto">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-3.5 h-3.5 rounded accent-orange-500"
            />
            <AlertTriangle className="h-3 w-3 text-amber-400/70 shrink-0" />
            <span>Tentativa de reparo —</span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="underline underline-offset-2 text-white/60 hover:text-white/90 transition-colors duration-150">
                  ver termo
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#111] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Termo de Tentativa de Reparo
                  </DialogTitle>
                  <DialogDescription className="text-white/55 leading-relaxed mt-2">
                    A troca de vidro é um procedimento de alto risco que envolve
                    aquecimento e separação do vidro do display original. Existe
                    possibilidade de dano ao display durante o processo. Ao
                    aceitar, você concorda que a Tok Cell não se responsabiliza
                    por danos ocorridos durante a tentativa de reparo, e que o
                    valor do serviço será cobrado independente do resultado.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </label>
        )}

        {/* Select de variante */}
        {hasVariants && (
          <Select
            value={selectedVariant?.id}
            onValueChange={(val) =>
              setSelectedVariant(service.variants.find((x) => x.id === val))
            }
          >
            <SelectTrigger
              className={[
                'h-7 text-[11px] w-[170px] rounded-lg',
                'bg-white/[0.06] border-white/[0.10] text-white/70',
                'hover:bg-white/[0.10] focus:ring-0 focus:ring-offset-0',
                'transition-colors duration-150',
              ].join(' ')}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10 text-white text-xs">
              {service.variants.map((v) => (
                <SelectItem
                  key={v.id}
                  value={v.id}
                  className="text-white/70 focus:text-white focus:bg-white/10"
                >
                  {v.name} — {fmtBRL(Number(v.price))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Select de componente */}
        {hasComponents && (
          <Select
            value={selectedComponent?.id}
            onValueChange={(val) =>
              setSelectedComponent(service.components.find((x) => x.id === val))
            }
          >
            <SelectTrigger
              className={[
                'h-7 text-[11px] w-[190px] rounded-lg',
                'bg-white/[0.06] border-white/[0.10] text-white/70',
                'hover:bg-white/[0.10] focus:ring-0 focus:ring-offset-0',
                'transition-colors duration-150',
              ].join(' ')}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10 text-white text-xs">
              {service.components.map((c) => (
                <SelectItem
                  key={c.id}
                  value={c.id}
                  className="text-white/70 focus:text-white focus:bg-white/10"
                >
                  {c.name} — {fmtBRL(Number(c.price))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Botão de adicionar */}
        <button
          onClick={handleAdd}
          disabled={isDisabled}
          className={[
            'ml-auto inline-flex items-center gap-1.5 h-7 px-3.5 rounded-lg',
            'text-[11px] font-semibold',
            'transition-all duration-150',
            isDisabled
              ? 'bg-white/[0.05] text-white/25 cursor-not-allowed border border-white/[0.06]'
              : [
                  'bg-white/[0.10] text-white/90 border border-white/[0.14]',
                  'hover:bg-white/[0.18] hover:border-white/[0.25] hover:text-white',
                  'active:scale-[0.97]',
                ].join(' '),
          ].join(' ')}
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar
        </button>
      </div>

      {/* Focus ring para acessibilidade */}
      <span
        className="absolute inset-0 rounded-2xl ring-2 ring-orange-400/0 group-focus-within:ring-orange-400/40 transition-all duration-150 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── FloatingCartButton ───────────────────────────────────────────────────────

function FloatingCartButton() {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto animate-in slide-in-from-bottom-4 duration-300">
        <CartDrawer>
          <button
            aria-label={`Carrinho com ${itemCount} itens`}
            className={[
              'relative inline-flex items-center gap-3 rounded-full px-5 py-3',
              'bg-white/[0.10] backdrop-blur-xl border border-white/[0.15]',
              'text-white/90 font-semibold text-sm',
              'shadow-xl shadow-black/40',
              'hover:bg-white/[0.16] hover:border-white/[0.25]',
              'transition-all duration-200',
            ].join(' ')}
          >
            <ShoppingCart className="h-4 w-4 text-white/70" />
            <span>Ver Carrinho</span>

            {/* Contador de itens */}
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-white/[0.12] border border-white/[0.15] text-[11px] font-bold text-white">
              {itemCount}
            </span>

            {/* Dot de notificação */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black/60" />
          </button>
        </CartDrawer>
      </div>
    </div>
  );
}

// ─── ServiceSelector (root) ───────────────────────────────────────────────────

export default function ServiceSelector({
  services,
  modelName,
  brandName,
  brandSlug,
  lineSlug,
}: Props) {
  return (
    <>
      {/*
        Layout bento responsivo:
        - mobile:  1 coluna
        - sm+:     2 colunas
        Serviços com promotionBadge ou múltiplos controles (variants + components)
        recebem `featured=true` e ocupam col-span-2.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-24">
        {services.map((service) => {
          const featured =
            !!service.promotionBadge ||
            (service.variants.length > 0 && service.components.length > 0);

          return (
            <ServiceCard
              key={service.id}
              service={service}
              modelName={modelName}
              brandName={brandName}
              brandSlug={brandSlug}
              lineSlug={lineSlug}
              featured={featured}
            />
          );
        })}
      </div>

      <FloatingCartButton />
    </>
  );
}
