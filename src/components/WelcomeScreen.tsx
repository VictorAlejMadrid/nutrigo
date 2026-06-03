'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo - Aumentada */}
      <motion.div
        className="mb-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/logo.png"
          alt="NutriGO Logo"
          width={220}
          height={220}
          priority
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div>

      {/* Proposta de Valor */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-2xl font-semibold text-[#0C3527] mb-3">Da dieta ao mercado em um clique</p>
        <p className="text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
          Crie dietas personalizadas e transforme-as em listas de compras práticas. Organize sua alimentação saudável sem complicações.
        </p>
      </motion.div>

      {/* Botão Começar */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
        <Button onClick={onStart} size="lg" variant="primary">
          Começar
        </Button>
      </motion.div>

      {/* Decoração de fundo (opcional) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D57A4E] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0C3527] opacity-5 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
