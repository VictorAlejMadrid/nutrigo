'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import { RestrictionOption, useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { cn } from '../../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.05, duration: 0.3 },
  }),
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

const RESTRICOES_OPTIONS = [
  { value: 'gluten', label: 'Glúten' },
  { value: 'lactose', label: 'Lactose' },
  { value: 'vegetarian', label: 'Vegetariano' },
  { value: 'vegan', label: 'Vegano' },
  { value: 'none', label: 'Nenhuma' },
] as { value: RestrictionOption; label: string }[];

export default function ProfileStep4() {
  const router = useRouter();

  const { restrictions, setRestrictions } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);

  const toggleRestricao = (valor: RestrictionOption) => {
    // Se selecionou "Nenhuma", limpa outras seleções
    if (valor === 'none') {
      if (restrictions.includes('none')) {
        setRestrictions([]);
      } else {
        setRestrictions(['none']);
      }
    } else {
      // Remove "Nenhuma" se estava selecionada
      const updated = restrictions.filter((r) => r !== 'none');

      if (updated.includes(valor)) {
        setRestrictions(updated.filter((r) => r !== valor));
      } else {
        setRestrictions([...updated, valor]);
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/onboarding/step-5');
  };

  function handlePrev() {
    router.push('/onboarding/step-3');
  }

  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center bg-white px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Indicador de progresso */}
      <motion.div
        className="absolute top-8 text-center text-sm text-gray-500"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Passo 4 de 5
      </motion.div>

      {/* Título */}
      <motion.h2
        className="mt-8 mb-12 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Restrições alimentares
      </motion.h2>

      {/* Chips de seleção */}
      <motion.div className="mb-8 w-full max-w-sm" initial="hidden" animate="visible">
        <div className="mb-4 flex w-sm flex-wrap justify-center gap-4">
          {RESTRICOES_OPTIONS.map((opcao, idx) => (
            <motion.button
              key={opcao.value}
              custom={idx}
              variants={chipVariants}
              initial="hidden"
              animate="visible"
              onClick={() => toggleRestricao(opcao.value)}
              className={cn(
                'w-[45%] rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 hover:cursor-pointer focus:ring-2 focus:ring-[#D57A4E] focus:ring-offset-2 focus:outline-none',
                restrictions.includes(opcao.value)
                  ? 'bg-[#D57A4E] text-white shadow-lg'
                  : 'border-2 border-transparent bg-gray-100 text-[#0C3527] hover:border-[#D57A4E]'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {opcao.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Botão de continuar */}
      <motion.div
        className="w-full max-w-sm"
        custom={6}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Continuar'}
        </Button>
      </motion.div>

      {/* Botão de voltar */}
      <IconButton
        onClick={handlePrev}
        icon="arrow-left"
        position="bottom-left"
        variant="default"
        size="md"
        ariaLabel="Voltar para tela anterior"
      />
    </motion.div>
  );
}
