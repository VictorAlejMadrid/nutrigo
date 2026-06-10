'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProfileStore } from '../../../hooks/use-profile';
import { Button } from '../../../components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { name, age, weight, objective } = useProfileStore();

  const [fakeInitialLoading, setFakeInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setFakeInitialLoading(false), 3000);
  }, []);

  function onClick() {
    setIsLoading(true);

    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  return (
    <motion.div
      className="bg-primary flex h-screen w-full flex-col items-center justify-center px-6"
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
      <motion.h2
        className="mb-4 text-center text-4xl font-bold text-white"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Perfeito, {name}!
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        className="mb-2 text-center text-xl text-white opacity-90"
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Seu perfil foi salvo com sucesso!
      </motion.p>

      {/* Descrição */}
      <motion.p
        className="mb-12 max-w-md text-center text-lg text-white opacity-75"
        custom={3}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Estamos gerando um plano alimentar personalizado especialmente para você...
      </motion.p>

      {/* Loading animation */}
      <motion.div
        className="mb-12 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex space-x-2">
          {fakeInitialLoading ? (
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-3 w-3 rounded-full bg-[#D57A4E]"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))
          ) : (
            <Check
              size={64}
              className="text-secondary border-secondary rounded-full border-4 p-2"
            />
          )}
        </div>
      </motion.div>

      {/* Informações do perfil (opcional) */}
      <motion.div
        className="mt-8 text-center text-sm text-white opacity-75"
        custom={4}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="mb-1">Seu perfil:</p>
        <p className="font-medium">
          {age + ' anos'} • {weight} kg • {objective}
        </p>
      </motion.div>

      {/* Botão (será habilitado quando o plano estiver pronto) */}
      <motion.div
        className="mt-12 w-full max-w-sm"
        custom={5}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          type="button"
          variant="outline"
          className="border-primary h-14 w-full border-2 text-lg hover:scale-105"
          onClick={onClick}
          disabled={isLoading || fakeInitialLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />} Próximo: Seu Plano Alimentar!
        </Button>
      </motion.div>
    </motion.div>
  );
}
