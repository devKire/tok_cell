'use client';

import { motion, useInView } from 'framer-motion';
import {
  Smartphone,
  Battery,
  Cpu,
  Unlock,
  Wrench,
  ArrowRight,
  Search,
  Heart,
} from 'lucide-react';
import { useCallback, useMemo, useRef, useState, memo } from 'react';
import { CardData, SwipeCards } from '../../../components/ui/swipe-cards';
import { CometCard } from '../../../components/ui/comet-card';

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
    color: 'from-blue-500 to-blue-600',
    bgGlow: 'bg-blue-500/20',
  },
  {
    icon: Search,
    title: 'Outros Serviços',
    description: 'Consulte-nos para outras necessidades.',
    color: 'from-blue-500 to-blue-600',
    bgGlow: 'bg-blue-500/20',
  },
] as const;

// Componente memoizado para evitar re-renders desnecessários
const ServiceCard = memo(function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: 'easeOut',
      }}
      className="h-full"
      // Removido layout animations que causam reflows
      layout={false}
    >
      <CometCard rotateDepth={8} translateDepth={10} glareOpacity={0.06}>
        <a
          href="/servicos"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          // Removido transition-all para evitar animações CSS pesadas
        >
          {/* Glow - removido animação de opacidade que causa repaint */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${service.bgGlow} opacity-0 blur-2xl group-hover:opacity-20`}
            style={{ willChange: 'opacity' }}
          />

          <div className="relative z-10 flex h-full flex-col">
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg shadow-black/20`}
            >
              <service.icon className="h-7 w-7 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {service.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-400">
              <span>
                Clique para fazer Orçamento
                <span className="text-green-500"> Gratuito</span>
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </a>
      </CometCard>
    </motion.div>
  );
});

function CustomSwipeCards({
  data,
  onAllSwiped,
}: {
  data: CardData[];
  onAllSwiped: () => void;
}) {
  const [remainingCards, setRemainingCards] = useState(data.length);
  const hasNotifiedRef = useRef(false);

  const handleCardSwipe = useCallback(() => {
    setRemainingCards((prev) => {
      const newValue = prev - 1;
      if (newValue <= 0 && !hasNotifiedRef.current) {
        hasNotifiedRef.current = true;
        // Usar requestAnimationFrame para evitar múltiplas chamadas
        requestAnimationFrame(() => {
          onAllSwiped();
        });
      }
      return newValue;
    });
  }, [onAllSwiped]);

  return (
    <SwipeCards data={data} onSwipe={handleCardSwipe} className="h-[500px]" />
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [cardsKey, setCardsKey] = useState(0);
  const [showResetMessage, setShowResetMessage] = useState(false);

  // Memoizar dados do swipe para evitar recriação
  const swipeCardsData = useMemo(
    () =>
      services
        .slice()
        .reverse()
        .map((service, index) => ({
          id: index,
          url: '/default-service-image.webp',
          name: service.title,
          bio: service.description,
          location: 'Serviço Especializado',
          interests: ['Garantia', 'Qualidade', 'Rápido'],
        })),
    [] // Array vazio pois services é constante
  );

  const handleAllCardsSwiped = useCallback(() => {
    setShowResetMessage(true);

    const timeoutId = setTimeout(() => {
      setCardsKey((prev) => prev + 1);
      setShowResetMessage(false);
    }, 2000);

    // Cleanup não necessário aqui, mas boa prática
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="services" className="relative py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Nossos <span className="text-blue-500">Serviços</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Soluções completas para seu smartphone
          </p>
        </motion.div>

        {/* Mobile */}
        <div className="block w-full md:hidden">
          <CustomSwipeCards
            key={cardsKey}
            data={swipeCardsData}
            onAllSwiped={handleAllCardsSwiped}
          />

          {showResetMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-center text-sm text-blue-500"
            >
              Todos os serviços foram visualizados!
            </motion.p>
          )}

          <motion.a
            href="/servicos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit mx-auto items-center gap-2 bg-green-500 text-white px-7 py-3 rounded-full font-bold mt-8 hover:bg-green-600 shadow-xl shadow-green-500/30 border border-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Heart className="w-5 h-5 fill-white" />
            <span className="flex items-center gap-2">
              Fazer Orçamento
              <span className="bg-white text-green-600 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                GRATUITO
              </span>
            </span>
          </motion.a>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
