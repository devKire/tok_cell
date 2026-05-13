'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Wrench, Award } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Atendimento Rápido',
    description:
      'Diagnóstico ágil e reparos em tempo recorde. Seu tempo é valioso e nós respeitamos isso.',
  },
  {
    icon: Shield,
    title: 'Peças de Qualidade',
    description:
      'Utilizamos apenas componentes de alta qualidade e originais para garantir a durabilidade do reparo.',
  },
  {
    icon: Award,
    title: 'Garantia no Serviço',
    description:
      'Todos os nossos serviços possuem garantia. Você fica tranquilo sabendo que seu aparelho está protegido.',
  },
  {
    icon: Wrench,
    title: 'Técnicos Especializados',
    description:
      'Profissionais capacitados e em constante atualização para lidar com as mais recentes tecnologias.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Por que escolher a{' '}
            <span className="text-red-500">Jc & Santana?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Diferenciais que fazem a diferença no atendimento ao seu smartphone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className="relative inline-block mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-900/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10"
                >
                  <feature.icon className="w-10 h-10 text-red-500" />
                </motion.div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
