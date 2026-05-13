'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Início', href: '#hero' },
  { name: 'Serviços', href: '#services' },
  { name: 'Sobre', href: '#about' },
  { name: 'Galeria', href: '#galery' },
  { name: 'Contato', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 110, damping: 22, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4"
      style={{ paddingTop: isScrolled ? '10px' : '14px' }}
    >
      <motion.div
        animate={{
          maxWidth: isScrolled ? '640px' : '1280px',
        }}
        transition={{ type: 'spring', stiffness: 160, damping: 28, mass: 0.8 }}
        className="w-full"
      >
        {/* ── PILL CONTAINER ── */}
        <motion.div
          animate={{
            borderRadius: isScrolled ? '9999px' : '20px',
            boxShadow: isScrolled
              ? '0 0 0 1px rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.45), 0 0 60px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.2)',
            backgroundColor: isScrolled
              ? 'rgba(10,10,12,0.72)'
              : 'rgba(255,255,255,0.02)',
          }}
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 28,
            mass: 0.8,
          }}
          className="relative overflow-hidden"
          style={{
            WebkitBackdropFilter: isScrolled
              ? 'blur(28px) saturate(180%)'
              : 'blur(16px)',
            backdropFilter: isScrolled
              ? 'blur(28px) saturate(180%)'
              : 'blur(16px)',
          }}
        >
          {/* Top shine */}
          <motion.div
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none" />

          {/* Content row */}
          <motion.div
            animate={{
              height: isScrolled ? '52px' : '66px',
              paddingLeft: isScrolled ? '16px' : '20px',
              paddingRight: isScrolled ? '16px' : '20px',
            }}
            transition={{
              type: 'spring',
              stiffness: 160,
              damping: 28,
              mass: 0.8,
            }}
            className="relative flex items-center justify-between gap-3 sm:gap-4"
          >
            {/* ── LOGO ── */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 shrink-0"
            >
              <motion.div
                animate={{ scale: isScrolled ? 0.85 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 blur-md opacity-60" />
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={38}
                  height={38}
                  className="relative rounded-full ring-1 ring-white/10"
                />
              </motion.div>

              <motion.div
                animate={{
                  opacity: isScrolled ? 0 : 1,
                  maxWidth: isScrolled ? '0px' : '200px',
                }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-white leading-none">
                  Jc & Santana
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/40 mt-[3px] tracking-wide uppercase font-medium">
                  Celulares
                </p>
              </motion.div>
            </Link>

            {/* ── NAV (desktop only) ── */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  className="group relative text-[13px] xl:text-[13.5px] font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {item.name}
                  <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full rounded-full" />
                  <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 h-px w-0 bg-white blur-sm transition-all duration-300 group-hover:w-full rounded-full opacity-60" />
                </motion.a>
              ))}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center gap-2 shrink-0">
              {/* WhatsApp CTA — desktop */}
              <motion.a
                whileHover={{
                  scale: 1.04,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/5547997513609"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white/80 hover:text-white backdrop-blur-xl transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                <motion.span
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    maxWidth: isScrolled ? '0px' : '80px',
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  WhatsApp
                </motion.span>
              </motion.a>

              {/* WhatsApp icon — mobile */}
              <motion.a
                whileTap={{ scale: 0.93 }}
                href="https://wa.me/5547997513609"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </motion.a>

              {/* Hamburger — mobile */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 hover:text-white transition-colors duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-[15px] w-[15px]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-[15px] w-[15px]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── MOBILE DROPDOWN ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 26,
                mass: 0.7,
              }}
              className="relative mt-2 overflow-hidden rounded-3xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              style={{
                WebkitBackdropFilter: 'blur(32px)',
                backdropFilter: 'blur(32px)',
                backgroundColor: 'rgba(8,8,10,0.75)',
              }}
            >
              {/* Top shine */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="flex flex-col px-3 py-3 gap-1">
                {navigation.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.26 }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200 group"
                  >
                    <span>{item.name}</span>
                    <span className="text-white/20 group-hover:text-white/50 transition-colors duration-200 text-xs">
                      →
                    </span>
                  </motion.a>
                ))}

                <div className="my-1 h-px bg-white/[0.06] mx-1" />

                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: navigation.length * 0.05 + 0.03,
                    duration: 0.26,
                  }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/5547997513609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] font-medium text-white hover:bg-white/[0.09] active:bg-white/[0.12] transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  Chamar no WhatsApp
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
