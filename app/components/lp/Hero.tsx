'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Gerar partículas FORA do componente (executa apenas uma vez no módulo)
const generateParticles = () => {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));
};

// Criar as partículas uma única vez quando o módulo carrega
const particlesData = generateParticles();

export default function Hero() {
  const [particles] = useState(particlesData);

  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-black to-black" />

      {/* Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-3xl"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 section-container text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 mt-20"
        >
          <div className="relative inline-block">
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full scale-150" />

            <Image
              src="/logo.png"
              alt="Jc & Santana Celulares"
              width={200}
              height={200}
              className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6"
        >
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-red-500 font-semibold text-sm">
            Conserto em até 1 hora*
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Seu celular{' '}
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            novo de novo
          </span>
          <br />
          em poucas horas
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Conserto rápido, peças de qualidade e garantia em Joinville
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Botão Fazer Orçamento - direciona para /servicos */}
          <Link href="/servicos">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors glow-red cursor-pointer"
            >
              <span>💰 Fazer Orçamento Agora</span>
              <Zap className="w-4 h-4 ml-2 animate-pulse" />
            </motion.div>
          </Link>

          {/* Botão Ver Serviços - scroll suave */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll('#services')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-white/20 transition-colors"
          >
            <span>Ver serviços</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Asterisk Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-xs text-gray-500"
        >
          *Consulte condições e disponibilidade. Prazo varia conforme o serviço.
        </motion.p>
      </div>
    </section>
  );
}
