'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.08, duration: 0.4 },
  }),
};

export default function ProfileStep5() {
  const router = useRouter();

  const { weight, age, name, objective, restrictions } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/onboarding/success');
  };

  function handlePrev() {
    router.push('/onboarding/step-4');
  }

  const formatarCampo = (label: string, valor: string) => {
    return (
      <motion.div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0" variants={cardVariants}>
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold text-[#0C3527]">{valor}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="w-full h-screen bg-white flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full text-center text-gray-500 text-sm mb-6" custom={0} variants={itemVariants} initial="hidden" animate="visible">
        Passo 5 de 5
      </motion.div>

      <motion.h2 className="text-3xl font-bold text-center mb-8 text-[#0C3527]" custom={1} variants={itemVariants} initial="hidden" animate="visible">
        Revisão
      </motion.h2>

      <motion.div
        className="w-full max-w-sm bg-gray-50 rounded-lg p-6 mb-8 border-2 border-gray-200"
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-[#0C3527] mb-4">Seus dados</h3>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
          {formatarCampo('Nome', name)}
          {formatarCampo('Idade', `${age} anos`)}
          {formatarCampo('Peso', `${weight} kg`)}
          {formatarCampo('Objetivo', objective)}
          {formatarCampo('Restrições', restrictions.join(', '))}
        </motion.div>
      </motion.div>

      <motion.div className="w-full max-w-sm space-y-3" custom={4} variants={itemVariants} initial="hidden" animate="visible">
        <Button type="submit" variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processando...' : 'Confirmar e Gerar Plano'}
        </Button>
      </motion.div>

      <IconButton onClick={handlePrev} icon="arrow-left" position="bottom-left" variant="default" size="md" ariaLabel="Voltar para tela anterior" />
    </motion.div>
  );
}
