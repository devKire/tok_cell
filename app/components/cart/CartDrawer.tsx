//app\components\cart\CartDrawer.tsx

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';
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
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-100">
          <SheetTitle className="flex items-center gap-2 text-[15px]">
            <ShoppingCart className="h-4 w-4" /> Carrinho
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <p className="text-4xl">🛒</p>
            <p className="font-semibold text-gray-700">Carrinho vazio</p>
            <p className="text-sm text-gray-400">
              Adicione serviços para continuar
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      {item.service.name}
                      {item.selectedVariant &&
                        ` — ${item.selectedVariant.name}`}
                      {item.selectedComponent &&
                        ` — ${item.selectedComponent.name}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.brandName} {item.modelName} · ⏱{' '}
                      {item.service.installTime}
                    </p>
                  </div>
                  <span className="text-sm font-bold whitespace-nowrap">
                    {fmtBRL(item.price)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Remover item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-6 py-4 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{fmtBRL(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto multi-serviço (5%)</span>
                    <span>-{fmtBRL(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100">
                  <span>Total estimado</span>
                  <span>{fmtBRL(total)}</span>
                </div>
              </div>
              {discount > 0 && (
                <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  🎉 Você ganhou 5% de desconto por adicionar mais de um
                  serviço!
                </p>
              )}
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-gray-800 h-11"
              >
                <Link href="/checkout">Finalizar pedido →</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
