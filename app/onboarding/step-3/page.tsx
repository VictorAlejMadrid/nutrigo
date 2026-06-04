'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ObjectiveOption, useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { allObjectives, translateUserObjective } from '../../../lib/user-objective';
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
      className="flex h-screen w-full flex-col items-center justify-center bg-white px-6"
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
        Passo 3 de 5
      </motion.div>

      <motion.h2
        className="mt-8 mb-12 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Qual é seu objetivo?
      </motion.h2>

      <motion.div
        className="mb-8 grid w-full max-w-sm grid-cols-1 gap-4"
        initial="hidden"
        animate="visible"
      >
        {allObjectives.map((option) => (
          <Button
            key={option}
            onClick={() => handleSelectObjetivo(option)}
            variant={objective === option ? 'secondary' : 'outline'}
            className="h-14 w-full text-lg"
          >
            {translateUserObjective(option)}
          </Button>
        ))}
      </motion.div>

      <motion.div
        className="w-full max-w-sm"
        custom={5}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          type="submit"
          className="h-12 w-full text-base"
          onClick={handleSubmit}
          disabled={!objective || isLoading}
        >
          {isLoading ? 'Carregando...' : 'Continuar'}
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
