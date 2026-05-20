'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Atendimento excelente e super rápido! Meu celular ficou pronto no mesmo dia e o serviço ficou perfeito. Recomendo demais.',
    name: 'Roselie Silva',
    title: 'Cliente verificada',
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocKI-dgfok1UF7cLejuFbc6fgByBtOyvsh32nsP0CYzXNJYWZA=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Orçamento muito rápido e atendimento impecável. Tiraram todas as minhas dúvidas e resolveram meu problema sem enrolação.',
    name: 'Ana Clara Sant Ana',
    title: 'Cliente satisfeita',
    image:
      'https://lh3.googleusercontent.com/a-/ALV-UjU51n4ug7TE3ZbgGx1A_0MialpdBYzdBUCJKEkNmTmWW7MZ4zPa=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Ótimo atendimento e preço justo. Fui muito bem recebido e meu aparelho ficou novo novamente.',
    name: 'Bruno Henrique',
    title: 'Cliente recente',
    image:
      'https://lh3.googleusercontent.com/a-/ALV-UjUqm03tkipzV0yB1L_VA21UnOGpAD7oH5kZ2zK4b8u-ui5gd9ua=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Muitas opções de capinhas e acessórios, além de um atendimento excelente pelo WhatsApp. Loja top demais!',
    name: 'Ana Paula Franco',
    title: 'Cliente fiel',
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocKcO66nro5R9ARrbvMay75TnUozGILYtVn3dT35eV_wZJfy-Q=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Serviço rápido, atendimento atencioso e resultado perfeito. Super recomendo para quem precisa de assistência.',
    name: 'Vinicios Santos',
    title: 'Cliente verificado',
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocKwrs60vqysBtyefdLkUl5qhOnkfZC9VHfFH8-Zt0B1CV8zBg=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Excelente atendimento e serviços de qualidade. Dá pra perceber o cuidado e profissionalismo em cada detalhe.',
    name: "Suzane Sant'Ana",
    title: 'Cliente há 1 ano',
    image:
      'https://lh3.googleusercontent.com/a-/ALV-UjUODs6LGz51kTTE8KOjS4lVXYisStZ_soqkCqqZrkftejygiuFD=w72-h72-p-rp-mo-br100',
  },
  {
    quote:
      'Consertaram meu celular muito rápido e ainda explicaram tudo certinho sobre a manutenção. Atendimento diferenciado.',
    name: 'Joseane Machado',
    title: 'Cliente satisfeita',
    image:
      'https://lh3.googleusercontent.com/a-/ALV-UjV08TAD3anz8p5F5eTROkaYJDWkxNiElfN1-O1L0oIOucSKAdiVVg=w72-h72-p-rp-mo-br100',
  },
];
export default function SocialProof() {
  return (
    <section id="social-proof" className="py-20 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Google Rating Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-gray-400">no Google</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Centenas de clientes{' '}
            <span className="text-blue-500">satisfeitos</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Veja o que nossos clientes dizem sobre nós
          </p>
        </motion.div>

        {/* Infinite Moving Cards com Avaliações */}
        <div className="mt-8">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
