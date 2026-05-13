'use client';

import { useState } from 'react';
import { Plus, Clock, Store, MapPin, ShoppingCart } from 'lucide-react';
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

function AtendimentoBadge({ atend }: { atend: string }) {
  const isLocal = atend === 'LOJA_E_LOCAL';
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${isLocal ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}
    >
      {isLocal ? <MapPin className="h-3 w-3" /> : <Store className="h-3 w-3" />}
      {isLocal ? 'Loja e Local' : 'Somente na loja'}
    </span>
  );
}

function ServiceCard({
  service,
  modelName,
  brandName,
  brandSlug,
  lineSlug,
}: {
  service: Service;
  modelName: string;
  brandName: string;
  brandSlug: string;
  lineSlug: string;
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
    const newItem = {
      id: `${Date.now()}_${service.id}`,
      service,
      selectedVariant,
      selectedComponent,
      price: Number(currentPrice),
      modelName,
      brandName,
      lineSlug,
      brandSlug,
    };

    console.log('🔍 Adicionando item ao carrinho:', newItem);

    try {
      addItem(newItem);
      toast.success(`${service.name} adicionado ao carrinho`);
    } catch (error) {
      console.error('❌ Erro ao adicionar item:', error);
      toast.error('Erro ao adicionar serviço');
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-start gap-4 p-5">
        <div className="flex-1 min-w-0">
          {service.promotionBadge && (
            <span className="inline-block text-xs font-bold bg-black text-white rounded-md px-2 py-0.5 mb-2">
              {service.promotionBadge}
            </span>
          )}
          <h3 className="font-bold text-[20px] text-black mb-1">
            {service.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5">
              <Clock className="h-3 w-3" /> {service.installTime}
            </span>
            <AtendimentoBadge atend={service.atendimento} />
          </div>
        </div>
        <div className="text-right shrink-0 text-green-500">
          {service.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {fmtBRL(Number(service.originalPrice))}
            </p>
          )}
          <p className="text-xl font-bold">{fmtBRL(Number(currentPrice))}</p>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 flex items-center gap-3 flex-wrap">
        {service.isAttempt && (
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer mr-auto">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-3.5 h-3.5 accent-black"
            />
            Tentativa de reparo —{' '}
            <Dialog>
              <DialogTrigger asChild>
                <button className="underline hover:text-black">
                  Ler termo
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Termo de Tentativa de Reparo</DialogTitle>
                  <DialogDescription>
                    A troca de vidro é um procedimento de alto risco que envolve
                    aquecimento e separação do vidro do display original. Existe
                    possibilidade de dano ao display durante o processo. Ao
                    aceitar, você concorda que a Jc &amp; Santana Celulares não
                    se responsabiliza por danos ocorridos durante a tentativa de
                    reparo, e que o valor do serviço será cobrado independente
                    do resultado.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </label>
        )}

        {hasVariants && (
          <Select
            value={selectedVariant?.id}
            onValueChange={(val) => {
              const v = service.variants.find((x) => x.id === val);
              setSelectedVariant(v);
            }}
          >
            <SelectTrigger className="h-8 text-xs text-black w-[180px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {service.variants.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name} — {fmtBRL(Number(v.price))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {hasComponents && (
          <Select
            value={selectedComponent?.id}
            onValueChange={(val) => {
              const c = service.components.find((x) => x.id === val);
              setSelectedComponent(c);
            }}
          >
            <SelectTrigger className="h-8 text-xs text-black w-[200px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {service.components.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} — {fmtBRL(Number(c.price))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          size="sm"
          className="ml-auto bg-black text-white hover:bg-gray-800 h-8 text-xs"
          onClick={handleAdd}
          disabled={service.isAttempt && !accepted}
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar
        </Button>
      </div>
    </div>
  );
}

// Componente do botão flutuante do carrinho
function FloatingCartButton() {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto animate-in slide-in-from-bottom-4 duration-300">
        <CartDrawer>
          <Button
            className="relative bg-black hover:bg-gray-900 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label={`Carrinho com ${itemCount} itens`}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="font-semibold">Ver Carrinho</span>
            <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-sm">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'}
            </span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </Button>
        </CartDrawer>
      </div>
    </div>
  );
}

export default function ServiceSelector({
  services,
  modelName,
  brandName,
  brandSlug,
  lineSlug,
}: Props) {
  return (
    <>
      <div className="space-y-3 pb-20">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            modelName={modelName}
            brandName={brandName}
            brandSlug={brandSlug}
            lineSlug={lineSlug}
          />
        ))}
      </div>
      <FloatingCartButton />
    </>
  );
}
