'use client';

import Link from 'next/link';
import About from './components/lp/About';
import Contact from './components/lp/Contact';
import Features from './components/lp/Features';
import Footer from './components/lp/Footer';
import Hero from './components/lp/Hero';
import Instagram from './components/lp/Instagram';
import SectionDivider from './components/lp/SectionDivider';
import Services from './components/lp/Services';
import SocialProof from './components/lp/SocialProof';
import WhatsAppButton from './components/lp/WhatsAppButton';
import Header from './components/layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      {/* ATENÇÃO - Capturar a atenção do visitante */}
      <Hero />
      <SectionDivider />

      {/* INTERESSE - Gerar interesse e credibilidade */}
      <SocialProof />
      <SectionDivider />
      <Services />
      <SectionDivider />

      {/* DESEJO - Criar desejo e conexão emocional */}
      <Features />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Instagram />
      <SectionDivider />

      {/* AÇÃO - Levar à conversão/contato */}
      <Contact />
      <Footer />
    </>
  );
}
