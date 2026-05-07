'use client';

import { cn } from '@/app/lib/utils';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as React from 'react';

export interface CardData {
  id: number;
  url: string;
  name?: string;
  age?: number;
  location?: string;
  bio?: string;
  interests?: string[];
}

export interface SwipeCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CardData[];
  onSwipe?: (id: number, direction: 'left' | 'right') => void;
  className?: string;
}

export interface CardProps extends CardData {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  onSwipe?: (id: number, direction: 'left' | 'right') => void;
  className?: string;
}

export function SwipeCards({
  data,
  onSwipe,
  className,
  ...props
}: SwipeCardsProps) {
  const [cards, setCards] = React.useState<CardData[]>(data);

  return (
    <div
      className={cn(
        'relative grid h-full w-full place-items-center',
        className
      )}
      {...props}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          cards={cards}
          setCards={setCards}
          onSwipe={onSwipe}
          {...card}
        />
      ))}
      {cards.length === 0 && (
        <div className="text-gray-400 text-center">
          <p className="text-lg">Todos os serviços visualizados!</p>
          <p className="text-sm mt-2">Reiniciando cards...</p>
        </div>
      )}
    </div>
  );
}

function Card({
  id,
  name,
  location,
  bio,
  interests,
  setCards,
  cards,
  onSwipe,
  className,
}: CardProps) {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-12, 12]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 4 : -4;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    const xVal = x.get();
    if (Math.abs(xVal) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      onSwipe?.(id, xVal > 0 ? 'right' : 'left');
    }
  };

  // Determinar ícone baseado no nome do serviço
  const getServiceEmoji = (serviceName?: string) => {
    if (!serviceName) return '📱';
    const name = serviceName.toLowerCase();
    if (name.includes('tela')) return '📱';
    if (name.includes('bateria')) return '🔋';
    if (name.includes('placa')) return '🔧';
    if (name.includes('desbloqueio')) return '🔓';
    if (name.includes('manutenção')) return '⚙️';
    return '📱';
  };

  // Determinar cor baseada no serviço
  const getServiceColor = (serviceName?: string) => {
    if (!serviceName) return 'from-red-600 to-red-800';
    const name = serviceName.toLowerCase();
    if (name.includes('tela')) return 'from-blue-600 to-blue-800';
    if (name.includes('bateria')) return 'from-green-600 to-green-800';
    if (name.includes('placa')) return 'from-purple-600 to-purple-800';
    if (name.includes('desbloqueio')) return 'from-orange-600 to-orange-800';
    if (name.includes('manutenção')) return 'from-red-600 to-red-800';
    return 'from-red-600 to-red-800';
  };

  return (
    <motion.div
      className={cn(
        'relative h-[420px] w-80 origin-bottom rounded-2xl shadow-2xl select-none',
        isFront && 'cursor-grab active:cursor-grabbing',
        className
      )}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: '0.1s transform',
        touchAction: 'none',
        boxShadow: isFront
          ? '0 20px 40px -10px rgba(220, 38, 38, 0.3), 0 0 20px rgba(220, 38, 38, 0.1)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.97,
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: -1000, right: 1000 }}
      dragElastic={0.1}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.02 }}
    >
      {/* Card Content - Estilo Glassmorphism */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm">
        {/* Header com gradiente */}
        <div className={`h-2 bg-gradient-to-r ${getServiceColor(name)}`} />

        {/* Emoji/Icon do Serviço */}
        <div className="absolute top-6 right-6 text-5xl opacity-20">
          {getServiceEmoji(name)}
        </div>

        {/* Conteúdo Principal */}
        <div className="p-6 flex flex-col h-full">
          {/* Ícone do Serviço */}
          <div className="mb-4">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getServiceColor(name)} p-3 shadow-lg`}
            >
              <span className="text-2xl flex items-center justify-center h-full">
                {getServiceEmoji(name)}
              </span>
            </div>
          </div>

          {/* Nome do Serviço */}
          {name && (
            <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          )}

          {/* Localização */}
          {location && (
            <p className="text-sm text-red-400 font-medium mb-3">{location}</p>
          )}

          {/* Descrição */}
          {bio && (
            <p className="text-gray-300 text-sm leading-relaxed flex-grow">
              {bio}
            </p>
          )}

          {/* Tags de Interesse */}
          {interests && interests.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-red-600/20 border border-red-500/30 px-3 py-1 text-xs text-red-400 backdrop-blur-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Indicador de Arrastar */}
          {isFront && (
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
              <span>⬅️</span>
              <span>Arraste para navegar</span>
              <span>➡️</span>
            </div>
          )}
        </div>

        {/* Glow Effect no Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-red-600/10 blur-xl rounded-2xl" />
        </div>
      </div>
    </motion.div>
  );
}
