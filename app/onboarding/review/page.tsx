'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { translateUserObjective } from '../../../lib/user-objective';
import { translateUserRestriction } from '../../../lib/user-restrictions';
import { ChevronLeft } from 'lucide-react';

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
      <motion.div
        className="flex justify-between border-b border-gray-200 py-3 last:border-b-0"
        variants={cardVariants}
      >
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold text-[#0C3527]">{valor}</span>
      </motion.div>
    );
  };

  const translatedRestrictions = restrictions.map((r) => translateUserRestriction(r));

  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center overflow-y-auto bg-white px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute top-8 text-center text-sm text-gray-500"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Passo 5 de 5
      </motion.div>

      <motion.h2
        className="mb-8 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Revisão
      </motion.h2>

      <motion.div
        className="mb-8 w-full max-w-sm rounded-lg border-2 border-gray-200 bg-gray-50 p-6"
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="mb-4 text-lg font-semibold text-[#0C3527]">Seus dados</h3>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {formatarCampo('Nome', name)}
          {formatarCampo('Idade', `${age} anos`)}
          {formatarCampo('Peso', `${weight} kg`)}
          {formatarCampo('Objetivo', translateUserObjective(objective))}
          {formatarCampo('Restrições', translatedRestrictions.join(', '))}
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full max-w-sm space-y-3"
        custom={4}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          type="submit"
          className="h-14 w-full text-lg"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Processando...' : 'Confirmar e Gerar Plano'}
        </Button>
      </motion.div>

      <Button
        className="absolute bottom-8 left-8 flex h-8 w-fit items-center gap-2 pr-6 pl-4"
        onClick={handlePrev}
      >
        <ChevronLeft size={12} />
        <p className="hidden sm:block">Voltar</p>
      </Button>
    </motion.div>
  );
}
