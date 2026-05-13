'use client';

import { motion } from 'framer-motion';
import { Camera, ExternalLink, MessageCircle } from 'lucide-react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';

// Dados dos posts do Instagram (substituir com dados reais da API)
const posts = [
  {
    id: 1,
    image: '/1.png',
    caption:
      'iPhone 14 Pro com carcaça nova e acabamento impecável ✨ Mais um aparelho recuperado e cliente satisfeito!',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 2,
    image: '/2.png',
    caption:
      'Tela do A30s trocada com sucesso ✅ E ainda saiu com película 3D para garantir mais proteção no dia a dia 🛡️',
    aspectRatio: 'aspect-square',
  },
  {
    id: 3,
    image: '/3.png',
    caption:
      'iPhone 13 Pro Max recuperado após a troca de tela 📱 Resultado de qualidade e aparelho novinho novamente 😎',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 4,
    image: '/4.png',
    caption:
      'Troca completa de carcaça no iPhone 11 🔥 Visual renovado e aparelho com cara de novo outra vez!',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 5,
    image: '/5.png',
    caption:
      'Moto G24 com tela nova e funcionando perfeitamente ✅ Serviço rápido, seguro e cliente satisfeito 😁',
    aspectRatio: 'aspect-square',
  },
  {
    id: 6,
    image: '/6.png',
    caption:
      'iPhone 11 recuperado após uma pancada forte 💥 Troca de tela realizada com qualidade e rapidez 🚀',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 7,
    image: '/7.png',
    caption:
      'iPhone X com tela nova e visual impecável ✨ Mais um reparo concluído com sucesso!',
    aspectRatio: 'aspect-[4/5]',
  },
];

// Breakpoints responsivos para o Masonry
const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 3,
  768: 2,
  640: 1,
};

export default function Instagram() {
  return (
    <section id="galery" className="py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Instagram Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full mb-6 shadow-lg shadow-purple-600/25"
          >
            <Camera className="w-5 h-5" />
            <span className="font-semibold">@jcsantanacelulares</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Acompanhe nosso{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Instagram
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Veja nossos trabalhos e resultados reais. Postamos dicas, antes e
            depois e novidades do mundo tech!
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding space-y-4"
          >
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href="https://www.instagram.com/jcsantanacelulares"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group relative block overflow-hidden rounded-2xl glass-card cursor-pointer"
              >
                {/* Image Container */}
                <div className={`relative ${post.aspectRatio} overflow-hidden`}>
                  {/* Placeholder com gradiente (substituir por Image quando tiver as fotos reais) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-red-900/30 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-white/30 mx-auto mb-2" />
                      <span className="text-white/50 text-sm">
                        Post {post.id}
                      </span>
                    </div>
                  </div>

                  <Image
                    src={post.image}
                    alt={post.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Caption */}
                      <p className="text-white text-sm leading-relaxed line-clamp-3">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  {/* Instagram Icon Badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.a>
            ))}
          </Masonry>
        </motion.div>

        {/* CTA WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-col items-center text-center"
        >
          <motion.a
            href="https://wa.me/5547997513609"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-green-500/40 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

            {/* Button */}
            <div className="relative flex items-center gap-3 rounded-full border border-green-400/20 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white shadow-2xl">
              <MessageCircle className="h-5 w-5" />

              <span>Agendar conserto pelo WhatsApp</span>

              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400">
            Gostou do que viu? Entre em contato com a gente e agende agora o
            conserto do seu celular com atendimento rápido e de confiança 📱✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
