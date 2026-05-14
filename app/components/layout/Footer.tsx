'use client';

import { motion } from 'framer-motion';
import {
  Smartphone,
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-black">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand / Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/logo.png"
                  alt="Jc & Santana Celulares"
                  width={42}
                  height={42}
                  className="relative rounded-full ring-1 ring-white/10 group-hover:ring-red-500/30 transition-all duration-300"
                />
              </div>

              <div className="overflow-hidden whitespace-nowrap">
                <p className="text-[14px] sm:text-[16px] font-semibold tracking-tight text-white leading-none group-hover:text-red-400 transition-colors duration-300">
                  Jc & Santana
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-[3px] tracking-wide uppercase font-medium">
                  Celulares
                </p>
              </div>
            </Link>

            <p className="text-gray-600 text-xs mt-3 text-center md:text-left">
              Especialistas em conserto desde 2018
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center justify-center">
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2.5 text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                  <MapPin className="w-3.5 h-3.5 text-red-500/70" />
                </div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                  Av. Alwino Hansen, 9 - Adhemar Garcia
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                  <Clock className="w-3.5 h-3.5 text-red-500/70" />
                </div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                  Seg-Sex 9h-19h | Sáb 9h-19h
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-red-500/70" />
                </div>
                <a
                  href="tel:+5547997513609"
                  className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                >
                  (47) 99751-3609
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center md:items-end justify-center space-y-4">
            <motion.a
              href="https://wa.me/5547997513609"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-2.5 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-500/30"
            >
              <Smartphone className="w-4 h-4" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <p className="text-gray-600 text-xs">Respondemos em minutos</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-gray-600 text-xs">
              © {currentYear} Jc & Santana Celulares. Todos os direitos
              reservados.
            </p>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-xs">Joinville/SC</span>
              <span className="text-gray-800">•</span>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 text-xs transition-colors group"
              >
                <span>Voltar ao topo</span>
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
