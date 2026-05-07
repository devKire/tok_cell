'use client';

import { motion, useInView } from 'framer-motion';
import {
  Smartphone,
  Battery,
  Cpu,
  Unlock,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CardData, SwipeCards } from '../../components/ui/swipe-cards';
import { CometCard } from '../../components/ui/comet-card';

const services = [
  {
    icon: Smartphone,
    title: 'Troca de Tela',
    description: 'Substituição de telas quebradas ou danificadas.',
    color: 'from-blue-500 to-blue-600',
    bgGlow: 'bg-blue-500/20',
  },
  {
    icon: Battery,
    title: 'Troca de Bateria',
    description: 'Baterias novas e originais.',
    color: 'from-green-500 to-green-600',
    bgGlow: 'bg-green-500/20',
  },
  {
    icon: Cpu,
    title: 'Reparo em Placa',
    description: 'Diagnóstico e reparo avançado.',
    color: 'from-purple-500 to-purple-600',
    bgGlow: 'bg-purple-500/20',
  },
  {
    icon: Unlock,
    title: 'Desbloqueio',
    description: 'Desbloqueio seguro e rápido.',
    color: 'from-orange-500 to-orange-600',
    bgGlow: 'bg-orange-500/20',
  },
  {
    icon: Wrench,
    title: 'Manutenção Geral',
    description: 'Limpeza e reparos completos.',
    color: 'from-red-500 to-red-600',
    bgGlow: 'bg-red-500/20',
  },
];

interface CustomSwipeCardsProps {
  data: CardData[];
  cardsKey: number;
  onAllSwiped: () => void;
}

function CustomSwipeCards({ data, onAllSwiped }: CustomSwipeCardsProps) {
  const [remainingCards, setRemainingCards] = useState(() => data.length);
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (remainingCards <= 0 && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;

      setTimeout(() => {
        onAllSwiped();
      }, 0);
    }
  }, [remainingCards, onAllSwiped]);

  const handleCardSwipe = () => {
    setRemainingCards((prev) => prev - 1);
  };

  return (
    <SwipeCards data={data} onSwipe={handleCardSwipe} className="h-[500px]" />
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [cardsKey, setCardsKey] = useState(0);
  const [showResetMessage, setShowResetMessage] = useState(false);

  const swipeCardsData: CardData[] = services
    .slice()
    .reverse()
    .map((service, index) => ({
      id: index,
      url: '/default-service-image.webp',
      name: service.title,
      bio: service.description,
      location: 'Serviço Especializado',
      interests: ['Garantia', 'Qualidade', 'Rápido'],
    }));

  const handleAllCardsSwiped = () => {
    setShowResetMessage(true);

    setTimeout(() => {
      setCardsKey((prev) => prev + 1);
      setShowResetMessage(false);
    }, 2000);
  };

  return (
    <section id="services" className="relative py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Nossos <span className="text-red-500">Serviços</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Soluções completas para seu smartphone
          </p>
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="block w-full md:hidden"
        >
          <CustomSwipeCards
            key={cardsKey}
            data={swipeCardsData}
            cardsKey={cardsKey}
            onAllSwiped={handleAllCardsSwiped}
          />

          {showResetMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-red-500"
            >
              Todos os serviços foram visualizados!
            </motion.p>
          )}
        </motion.div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="h-full"
            >
              <CometCard
                rotateDepth={8}
                translateDepth={10}
                glareOpacity={0.06}
              >
                <a
                  href="https://wa.me/5547997513609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05]"
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.bgGlow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/10" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon */}
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg shadow-black/20`}
                    >
                      <service.icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
                        {service.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-neutral-400">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-red-400 transition-all duration-300 group-hover:gap-3 group-hover:text-red-300">
                      <span>Saiba mais</span>

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
