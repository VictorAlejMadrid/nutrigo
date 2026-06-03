'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '@/context/OnboardingContext';
import Button from './Button';
import Input from './Input';
import IconButton from './IconButton';

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
  { value: 'Glúten', label: 'Glúten' },
  { value: 'Lactose', label: 'Lactose' },
  { value: 'Vegetariano', label: 'Vegetariano' },
  { value: 'Vegano', label: 'Vegano' },
  { value: 'Nenhuma', label: 'Nenhuma' },
];

export function ProfileStep4() {
  const { profile, nextStep, prevStep, updateProfile } = useOnboarding();
  const [restricoes, setRestricoes] = useState<string[]>(profile.restricoes || []);
  const [isLoading, setIsLoading] = useState(false);

  const toggleRestricao = (valor: string) => {
    // Se selecionou "Nenhuma", limpa outras seleções
    if (valor === 'Nenhuma') {
      if (restricoes.includes('Nenhuma')) {
        setRestricoes([]);
      } else {
        setRestricoes(['Nenhuma']);
      }
    } else {
      // Remove "Nenhuma" se estava selecionada
      const updated = restricoes.filter((r) => r !== 'Nenhuma');

      if (updated.includes(valor)) {
        setRestricoes(updated.filter((r) => r !== valor));
      } else {
        setRestricoes([...updated, valor]);
      }
    }
  };

  const handleSubmit = async () => {
    const final_restricoes = restricoes.length === 0 ? ['Nenhuma'] : restricoes;

    setIsLoading(true);
    updateProfile({
      restricoes: final_restricoes,
    });

    // Simula delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    nextStep();
  };

  return (
    <motion.div
      className="w-full h-screen bg-white flex flex-col items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Indicador de progresso */}
      <motion.div className="absolute top-8 text-center text-gray-500 text-sm" custom={0} variants={itemVariants} initial="hidden" animate="visible">
        Passo 4 de 5
      </motion.div>

      {/* Título */}
      <motion.h2
        className="text-3xl font-bold text-center mb-12 mt-8 text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Restrições alimentares
      </motion.h2>

      {/* Chips de seleção */}
      <motion.div className="w-full max-w-sm mb-8" initial="hidden" animate="visible">
        <div className="flex flex-wrap w-sm justify-center gap-4 mb-4">
          {RESTRICOES_OPTIONS.map((opcao, idx) => (
            <motion.button
              key={opcao.value}
              custom={idx}
              variants={chipVariants}
              initial="hidden"
              animate="visible"
              onClick={() => toggleRestricao(opcao.value)}
              className={`py-3 px-4 w-[45%] rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D57A4E] ${
                restricoes.includes(opcao.value)
                  ? 'bg-[#D57A4E] text-white shadow-lg'
                  : 'bg-gray-100 text-[#0C3527] border-2 border-transparent hover:border-[#D57A4E]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {opcao.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Botão de continuar */}
      <motion.div className="w-full max-w-sm" custom={6} variants={itemVariants} initial="hidden" animate="visible">
        <Button type="submit" variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Continuar'}
        </Button>
      </motion.div>

      {/* Botão de voltar */}
      <IconButton onClick={prevStep} icon="arrow-left" position="bottom-left" variant="default" size="md" ariaLabel="Voltar para tela anterior" />
    </motion.div>
  );
}
