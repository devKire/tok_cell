'use client';

import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Instagram from './components/Instagram';
import SectionDivider from './components/SectionDivider';
import Services from './components/Services';
import SocialProof from './components/SocialProof';

export default function Home() {
  return (
    <>
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
