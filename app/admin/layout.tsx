// app/admin/layout.tsx
import Link from 'next/link';
import {
  LayoutDashboard,
  Smartphone,
  Layers,
  Settings,
  Package,
  ShoppingBag,
  Star,
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
  return (
    <div className="admin-panel flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">Jc &amp; Santana</p>
          <p className="text-xs text-gray-400">Painel Admin</p>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-3 border-t border-gray-100">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            ← Ver site
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-56 min-h-screen">
        <div className="admin-animate-fade-in">{children}</div>
      </main>
    </div>
  );
}
