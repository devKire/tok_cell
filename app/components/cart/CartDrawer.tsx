// app/components/cart/CartDrawer.tsx

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart, Sparkles, Tag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/hooks/use-cart';

function fmtBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v);
}

export default function CartDrawer({ children }: { children: ReactNode }) {
  const { items, removeItem, subtotal, discount } = useCart();
  const total = subtotal - discount;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 border-0"
      >
        {/* Fundo gradiente escuro translúcido - mesmo estilo dos cards */}
        <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-[#0a0a0a] to-[#111]">
          {/* Overlay glass sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

          {/* Header com efeito glass */}
          <SheetHeader className="relative px-6 py-4 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <SheetTitle className="flex items-center gap-2.5 text-[15px] text-white/90">
              <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center border border-white/[0.10]">
                <ShoppingCart className="h-4 w-4 text-white/70" />
              </div>
              Carrinho
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
              <div className="w-20 h-20 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.08] mb-2">
                <span className="text-4xl opacity-50">🛒</span>
              </div>
              <p className="font-semibold text-white/80">Carrinho vazio</p>
              <p className="text-sm text-white/40">
                Adicione serviços para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Lista de itens */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex items-start gap-3 p-3 rounded-xl 
                      bg-white/[0.04] border border-white/[0.06]
                      hover:bg-white/[0.07] hover:border-white/[0.10]
                      transition-all duration-200"
                  >
                    {/* Glow sutil no hover */}
                    <div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r 
  from-white/[0.02] to-transparent opacity-0 
  group-hover:opacity-100 transition-opacity duration-300
  pointer-events-none"
                    />
                    <div className="flex-1 min-w-0 relative">
                      <p className="text-sm font-medium text-white/90 leading-snug">
                        {item.service.name}
                        {item.selectedVariant && (
                          <span className="text-white/50">
                            {' '}
                            — {item.selectedVariant.name}
                          </span>
                        )}
                        {item.selectedComponent && (
                          <span className="text-white/50">
                            {' '}
                            — {item.selectedComponent.name}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-white/35">
                          {item.brandName} {item.modelName}
                        </p>
                        <span className="text-[10px] text-white/20">·</span>
                        <span className="text-[11px] text-white/35 flex items-center gap-1">
                          ⏱ {item.service.installTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-emerald-400 whitespace-nowrap">
                        {fmtBRL(item.price)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded-md text-white/25 hover:text-blue-400 
                          hover:bg-blue-500/10 transition-all duration-200"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer com resumo */}
              <div className="relative border-t border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-4 py-4 space-y-4">
                {/* Resumo de valores */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span>
                    <span>{fmtBRL(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400/80 flex items-center gap-1.5">
                        <Tag className="h-3 w-3" />
                        Desconto multi-serviço
                      </span>
                      <span className="text-emerald-400 font-medium">
                        -{fmtBRL(discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-base pt-2 border-t border-white/[0.08]">
                    <span className="text-white/90">Total estimado</span>
                    <span className="text-white">{fmtBRL(total)}</span>
                  </div>
                </div>

                {/* Badge de desconto */}
                {discount > 0 && (
                  <div
                    className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5
                      bg-emerald-500/[0.08] border border-emerald-500/[0.15]"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-emerald-400/80 leading-relaxed">
                      Você ganhou{' '}
                      <span className="font-semibold text-emerald-400">
                        5% de desconto
                      </span>{' '}
                      por adicionar mais de um serviço!
                    </p>
                  </div>
                )}

                {/* Botão de checkout */}
                <Button
                  asChild
                  className={[
                    'w-full h-11 rounded-xl',
                    'bg-white/[0.10] border border-white/[0.14]',
                    'text-white font-semibold',
                    'hover:bg-white/[0.15] hover:border-white/[0.20]',
                    'transition-all duration-200',
                    'relative overflow-hidden',
                  ].join(' ')}
                >
                  <Link href="/checkout">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    Finalizar pedido →
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
