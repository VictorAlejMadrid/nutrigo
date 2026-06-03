'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '@/context/OnboardingContext';
import Button from './Button';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

export default function SuccessScreen() {
  const { profile } = useOnboarding();

  useEffect(() => {
    // Aqui você pode adicionar lógica para redirecionar ou disparar eventos
    // Por enquanto, apenas mostramos a tela de sucesso
  }, []);

  const nomeUsuario = profile.nome || 'Usuário';

  return (
    <motion.div
      className="w-full h-screen  from-[#0C3527] via-[#0C3527] to-[#1a4d39] flex flex-col items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Checkmark animado */}
      <motion.div className="mb-8" variants={itemVariants} initial="hidden" animate="visible">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <motion.circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 25 40 L 35 50 L 55 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkmarkVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </motion.div>

      {/* Título */}
      <motion.h2 className="text-4xl font-bold text-white text-center mb-4" custom={1} variants={itemVariants} initial="hidden" animate="visible">
        Perfeito!
      </motion.h2>

      {/* Subtítulo */}
      <motion.p className="text-xl text-white text-center mb-2 opacity-90" custom={2} variants={itemVariants} initial="hidden" animate="visible">
        Seu perfil foi salvo com sucesso, {nomeUsuario}!
      </motion.p>

      {/* Descrição */}
      <motion.p
        className="text-lg text-white text-center mb-12 opacity-75 max-w-md"
        custom={3}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Estamos gerando um plano alimentar personalizado especialmente para você...
      </motion.p>

      {/* Loading animation */}
      <motion.div className="flex justify-center items-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#D57A4E] rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Informações do perfil (opcional) */}
      <motion.div className="text-center text-white opacity-75 text-sm mt-8" custom={4} variants={itemVariants} initial="hidden" animate="visible">
        <p className="mb-1">Dados coletados:</p>
        <p>
          {profile.idade}
          {profile.idade && ' anos'} • {profile.pesoKg} kg • {profile.objetivo}
        </p>
      </motion.div>

      {/* Botão (será habilitado quando o plano estiver pronto) */}
      <motion.div className="mt-12 w-full max-w-sm" custom={5} variants={itemVariants} initial="hidden" animate="visible">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => {
            // Redirecionar ou disparar ação para próximo fluxo
            console.log('Ver plano alimentar');
          }}
        >
          Próximo: Seu Plano Alimentar
        </Button>
      </motion.div>
    </motion.div>
  );
}
