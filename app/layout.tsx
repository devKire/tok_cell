// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './hooks/use-cart';
import Footer from './components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Tok Cell | Assistência Técnica em Celulares em Joinville',
  description:
    'Assistência técnica em celulares e venda de acessórios em Joinville. Tok Cell atua desde 2016 com produtos de qualidade, bons fornecedores e atendimento especializado.',
  keywords:
    'assistência técnica celular Joinville, conserto de celular, acessórios para celular, troca de tela, reparo em placa, Tok Cell',
  openGraph: {
    title: 'Tok Cell | Assistência Técnica em Celulares em Joinville',
    description:
      'Assistência técnica em celulares e venda de acessórios em Joinville desde 2016.',
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
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
