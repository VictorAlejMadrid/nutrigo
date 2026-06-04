'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../../context/OnboardingContext';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import { ObjectiveOption, useProfileStore } from '../../../hooks/use-profile';
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

const optionVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.05, duration: 0.3 },
  }),
};

const OPTIONS = [
  { value: 'weight-loss', label: 'Emagrecimento' },
  { value: 'muscle-gain', label: 'Ganho de Massa' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'health-and-organization', label: 'Saúde e Organização' },
] as { value: ObjectiveOption; label: string }[];

export default function ProfileStep3() {
  const router = useRouter();

  const { objective, setObjective } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectObjetivo = (value: string) => {
    setObjective(value as ObjectiveOption);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/onboarding/step-4');
  };

  function handlePrev() {
    router.push('/onboarding/step-2');
  }

  return (
    <motion.div
      className="w-full h-screen bg-white flex flex-col items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="absolute top-8 text-center text-gray-500 text-sm" custom={0} variants={itemVariants} initial="hidden" animate="visible">
        Passo 3 de 5
      </motion.div>

      <motion.h2
        className="text-3xl font-bold text-center mb-12 mt-8 text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Qual é seu objetivo?
      </motion.h2>

      <motion.div className="w-full max-w-sm grid grid-cols-1 gap-4 mb-8" initial="hidden" animate="visible">
        {OPTIONS.map((option, idx) => (
          <motion.button
            key={option.value}
            custom={idx}
            variants={optionVariants}
            initial="hidden"
            animate="visible"
            onClick={() => handleSelectObjetivo(option.value)}
            className={cn(
              'py-4 px-4 rounded-lg hover:cursor-pointer font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D57A4E]',
              objective === option.value
                ? 'bg-[#D57A4E] text-white shadow-lg'
                : 'bg-gray-100 text-[#0C3527] border-2 border-transparent hover:border-[#D57A4E]',
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="w-full max-w-sm" custom={5} variants={itemVariants} initial="hidden" animate="visible">
        <Button type="submit" variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={!objective || isLoading}>
          {isLoading ? 'Carregando...' : 'Continuar'}
        </Button>
      </motion.div>

      <IconButton onClick={handlePrev} icon="arrow-left" position="bottom-left" variant="default" size="md" ariaLabel="Voltar para tela anterior" />
    </motion.div>
  );
}
