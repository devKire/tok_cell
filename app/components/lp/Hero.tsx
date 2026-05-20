'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
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
      {/* Background Gradient - estático */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-black to-black" />

      {/* Animated Background Glow - otimizado */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6, // Mais lento = menos cálculos
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl will-change-transform"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* CSS Particles - muito mais leve que Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
        <div className="particle particle-7" />
        <div className="particle particle-8" />
      </div>

      {/* CSS para partículas - adicione no seu globals.css */}
      <style jsx>{`
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
        }

        .particle-1 {
          left: 10%;
          top: 20%;
          animation-delay: 0s;
        }
        .particle-2 {
          left: 25%;
          top: 60%;
          animation-delay: 0.5s;
        }
        .particle-3 {
          left: 40%;
          top: 30%;
          animation-delay: 1s;
        }
        .particle-4 {
          left: 55%;
          top: 70%;
          animation-delay: 1.5s;
        }
        .particle-5 {
          left: 70%;
          top: 40%;
          animation-delay: 2s;
        }
        .particle-6 {
          left: 85%;
          top: 50%;
          animation-delay: 2.5s;
        }
        .particle-7 {
          left: 15%;
          top: 80%;
          animation-delay: 3s;
        }
        .particle-8 {
          left: 90%;
          top: 15%;
          animation-delay: 3.5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="relative z-10 section-container text-center px-4">
        {/* Logo - sem blur animation pesado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 mt-20"
        >
          <div className="relative inline-block">
            {/* Logo Glow Effect - estático com CSS */}
            <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full scale-150" />

            <Image
              src="/logo.png"
              alt="Tok Cell"
              width={200}
              height={200}
              className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto"
              priority
              loading="eager"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
            />
          </div>
        </motion.div>

        {/* Badge - animação mais simples */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-6"
        >
          <Zap className="w-4 h-4 text-blue-500" />
          <span className="text-blue-500 font-semibold text-sm">
            Conserto em até 1 hora*
          </span>
        </motion.div>

        {/* Main Headline - animação reduzida */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Seu celular{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            novo de novo
          </span>
          <br />
          em poucas horas
        </motion.h1>

        {/* Subheadline - animação reduzida */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Conserto rápido, peças de qualidade e garantia em Joinville
        </motion.p>

        {/* CTA Buttons - animação reduzida */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/servicos">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors glow-blue cursor-pointer"
            >
              <span>💰 Fazer Orçamento Agora</span>
              <Zap className="w-4 h-4 ml-2" />
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScroll('#services')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-white/20 transition-colors"
          >
            <span>Ver serviços</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Asterisk Note - sem animação */}
        <p className="mt-8 text-xs text-gray-500">
          *Consulte condições e disponibilidade. Prazo varia conforme o serviço.
        </p>
      </div>
    </section>
  );
}
