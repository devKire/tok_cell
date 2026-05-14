// app/admin/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Smartphone,
  Layers,
  Settings,
  Package,
  ShoppingBag,
  Star,
  LogOut,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Marcas', href: '/admin/brands', icon: Smartphone },
  { label: 'Linhas', href: '/admin/lines', icon: Layers },
  { label: 'Modelos', href: '/admin/models', icon: Smartphone },
  { label: 'Serviços', href: '/admin/services', icon: Package },
  { label: 'Depoimentos', href: '/admin/testimonials', icon: Star },
  { label: 'Configurações', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Se for página de login, já inicia como autenticado (não precisa verificar)
  // Se não for, inicia como null (loading)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    isLoginPage ? true : null
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Se for página de login, não precisa fazer nada
    if (isLoginPage) {
      return;
    }

    // Só verifica autenticação se não estiver na página de login
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/verify');
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/admin/login');
        }
      } catch {
        setIsAuthenticated(false);
        router.replace('/admin/login');
      }
    }

    checkAuth();
  }, [isLoginPage, router]); // Removeu pathname da dependência

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsLoggingOut(false);
    }
  }

  // Na página de login, renderiza apenas o conteúdo
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state enquanto verifica autenticação
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-3" />
          <p className="text-sm text-gray-500">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-panel flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">Jc & Santana</p>
          <p className="text-xs text-gray-400">Painel Admin</p>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-3 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors block"
          >
            ← Ver site
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-600 transition-colors w-full disabled:opacity-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-56 min-h-screen p-6">{children}</main>
    </div>
  );
}
