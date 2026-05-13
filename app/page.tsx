'use client';

import Link from 'next/link';
// import About from './components/lp/About';
import Contact from './components/lp/Contact';
// import Features from './components/lp/Features';
import Footer from './components/lp/Footer';
// import Hero from './components/lp/Hero';
// import Instagram from './components/lp/Instagram';
// import SectionDivider from './components/lp/SectionDivider';
// import Services from './components/lp/Services';
// import SocialProof from './components/lp/SocialProof';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import WhatsAppButton from './components/lp/WhatsAppButton';

export default function Home() {
  return (
    <>
      {/* <WhatsAppButton /> */}
      <section className="px-6 py-20 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-6">
            ✦ Adhemar Garcia — Joinville/SC
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            Seu celular novo de novo <br className="hidden md:block" />
            em poucas horas
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            Conserto rápido, peças de qualidade e garantia em Joinville.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-gray-800 h-12 px-8 text-base rounded-xl"
            >
              <Link href="/servicos">
                Ver serviços <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            *Prazo estimado varia conforme o serviço selecionado.
          </p>
        </div>
      </section>
      {/* ATENÇÃO - Capturar a atenção do visitante */}
      {/* <Hero />
      <SectionDivider /> */}

      {/* INTERESSE - Gerar interesse e credibilidade */}
      {/* <SocialProof />
      <SectionDivider />
      <Services />
      <SectionDivider /> */}

      {/* DESEJO - Criar desejo e conexão emocional */}
      {/* <Features />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Instagram />
      <SectionDivider /> */}

      {/* AÇÃO - Levar à conversão/contato */}
      <Contact />
      <Footer />
    </>
  );
}
