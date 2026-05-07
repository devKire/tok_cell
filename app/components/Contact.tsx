'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ArrowRight, Zap, Pin } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Fale <span className="text-red-500">Conosco</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Estamos prontos para atender você
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Endereço</h3>
                  <a
                    href="https://maps.google.com/?q=Av.+Alwino+Hansen,+9+-+Adhemar+Garcia,+Joinville/SC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Av. Alwino Hansen, 9<br />
                    Adhemar Garcia, Joinville/SC
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Horários</h3>
                  <div className="text-gray-400 space-y-1">
                    <p>Seg a Sex: 9h às 19h</p>
                    <p>Sáb: 9h às 19h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Telefone</h3>
                  <a
                    href="tel:+5547997513609"
                    className="text-gray-400 hover:text-red-500 transition-colors text-lg font-semibold"
                  >
                    (47) 99751-3609
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Right Column - Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Map Container */}
            <motion.a
              href="https://maps.google.com/?q=Av.+Alwino+Hansen,+9+-+Adhemar+Garcia,+Joinville/SC"
              target="_blank"
              rel="noopener noreferrer"
              className="block group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.08] group-hover:border-red-500/40 transition-all duration-700">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
                  {/* Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Map Image*/}
                  <Image
                    src="/map.png"
                    alt="Mapa de localização"
                    width={200}
                    height={200}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    priority
                  />
                </div>

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/[0.02]" />

                {/* Red Glow Effects */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 rounded-full blur-3xl"
                />

                {/* Radar Effect */}
                <motion.div
                  animate={{
                    scale: [0, 2],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-500/30 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [0, 2],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 0.7,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-500/20 rounded-full"
                />

                {/* Location Pin */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                >
                  {/* Pin Shadow */}
                  <div className="w-4 h-2 bg-black/40 rounded-full blur-sm -mb-1" />

                  {/* Pin */}
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-600" />
                  </div>
                </motion.div>

                {/* Floating Icons */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Pin className="w-4 h-4 text-red-500/60" />
                  <span className="text-xs text-gray-500 font-medium">
                    Localização física
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
                  >
                    <span className="text-xs text-gray-400">
                      Toque para abrir no Maps
                    </span>
                  </motion.div>
                </div>

                {/* Distance Indicator */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center space-x-1.5">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-gray-400">
                      Adhemar Garcia
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg shadow-red-600/30"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Abrir no Google Maps</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Edge Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-red-500/20 rounded-3xl" />
                </div>
              </div>
            </motion.a>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/5547997513609"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group block relative w-full"
            >
              <div className="relative bg-gradient-to-r from-green-600 to-green-500 p-[1px] rounded-2xl overflow-hidden">
                {/* Animated gradient border */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-300 to-green-400"
                  style={{ backgroundSize: '200% 200%' }}
                />

                <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-6 flex items-center justify-between group-hover:bg-black/70 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="green"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">
                        Precisa de ajuda?
                      </div>
                      <div className="text-xl font-bold text-white">
                        Chamar no WhatsApp
                      </div>
                      <div className="text-xs text-green-500 mt-1 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Respondemos em menos de 5 min</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
