'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import CartDrawer from '../cart/CartDrawer';
import { useCart } from '@/app/hooks/use-cart';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-bold tracking-tight">
          Jc &amp; <span className="text-[#25D366]">Santana</span> Celulares
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/servicos" className="hover:text-black transition-colors">
            Serviços
          </Link>
          <Link
            href="/#beneficios"
            className="hover:text-black transition-colors"
          >
            Sobre
          </Link>
        </nav>

        <CartDrawer>
          <button
            className="flex items-center gap-2 bg-black text-white rounded-lg px-3.5 py-2 text-sm font-medium relative"
            aria-label={`Carrinho com ${itemCount} itens`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#25D366] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
                {itemCount}
              </span>
            )}
          </button>
        </CartDrawer>
      </div>
    </header>
  );
}
