'use client';

import { cn } from '@/lib/utils';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  // ✅ MOVIDAS PARA CIMA
  function getDirection() {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  }

  function getSpeed() {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  }

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[380px] max-w-full shrink-0 rounded-2xl border border-zinc-800 bg-[linear-gradient(180deg,#1a1a1a,#0d0d0d)] px-8 py-6 md:w-[450px]"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-500/20" />

              <div className="mb-4 flex items-center space-x-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-red-500/30">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-2xl text-white">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-semibold leading-tight text-white">
                    {item.name}
                  </span>

                  <span className="text-sm leading-tight text-gray-400">
                    {item.title}
                  </span>

                  <div className="mt-1 flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-current text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="relative z-20 text-sm leading-[1.7] font-normal italic text-gray-300">
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
