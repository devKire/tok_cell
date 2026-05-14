// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './hooks/use-cart';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title:
    'Jc & Santana Celulares | Assistência Técnica Especializada em Joinville',
  description:
    'Conserto rápido de celulares em Joinville. Troca de tela, bateria, reparo em placa e desbloqueio com garantia. Atendimento em até 1 hora.',
  keywords:
    'assistência técnica celular Joinville, conserto de celular, troca de tela, reparo em placa, desbloqueio, Jc Santana Celulares',
  openGraph: {
    title: 'Jc & Santana Celulares | Assistência Técnica em Joinville',
    description:
      'Seu celular novo de novo em poucas horas. Conserto rápido com garantia.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <main className="min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
