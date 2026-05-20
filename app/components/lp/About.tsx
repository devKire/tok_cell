'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target, MapPin, Star, Shield } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="section-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Sobre a{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Tok Cell
              </span>
            </h2>

            <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                A Tok Cell é uma empresa estabelecida desde 2016 atuando no
                mercado de assistência técnica em celulares e venda de
                acessórios.
              </p>
              <p>
                Temos parcerias com os maiores e melhores fornecedores e
                fabricantes do ramo, garantindo produtos de qualidade para os
                nossos clientes.
              </p>
              <p>
                Estamos localizados em Joinville - SC, com loja física na rua
                Engenheiro Eugênio Junqueira Neto, 95 - Adhemar Garcia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
              {[
                { icon: Heart, value: '1000+', label: 'Clientes' },
                { icon: Target, value: '2016', label: 'Desde' },
                { icon: Users, value: '100%', label: 'Satisfação' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center glass-card p-4 rounded-xl"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/servicos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit mx-auto items-center gap-2 bg-green-500 text-white px-7 py-3 rounded-full font-bold mt-8 hover:bg-green-600 transition-all shadow-xl shadow-green-500/30 border border-green-400"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <Heart className="w-5 h-5 fill-white" />

              <span className="flex items-center gap-2">
                Fazer Orçamento
                <span className="bg-white text-green-600 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  GRATUITO
                </span>
              </span>
            </motion.a>
          </motion.div>

          {/* Logo & Info - Direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex flex-col items-center"
          >
            {/* Logo Container */}
            <div className="relative mb-8">
              {/* Multiple Glow Layers */}
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <div className="absolute inset-0 bg-blue-600/10 blur-2xl rounded-full scale-125" />

              {/* Logo Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative glass-card p-8 sm:p-10 rounded-3xl"
              >
                {/* Decorative Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20" />

                <Image
                  src="/logo_tokcell.png"
                  alt="Tok Cell"
                  width={280}
                  height={280}
                  className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              {[
                { icon: MapPin, text: 'Adhemar Garcia, Joinville' },
                { icon: Star, text: '5.0 no Google' },
                { icon: Shield, text: 'Garantia em todos serviços' },
                { icon: Users, text: 'Técnicos certificados' },
              ].map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card px-4 py-3 rounded-xl flex items-center space-x-3"
                >
                  <info.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{info.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative Dots */}
            <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
              <div className="grid grid-cols-3 gap-2 opacity-20">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
