'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { RestrictionOption, useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { allRestrictions, translateUserRestriction } from '../../../lib/user-restrictions';
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
    router.push('/onboarding/review');
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
      <motion.div
        className="absolute top-8 text-center text-sm text-gray-500"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Passo 4 de 5
      </motion.div>

      <motion.h2
        className="mt-8 mb-12 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Restrições alimentares
      </motion.h2>

      <motion.div className="mb-8 w-full max-w-sm" initial="hidden" animate="visible">
        <div className="mb-4 flex w-sm flex-wrap justify-center gap-2">
          {allRestrictions.map((opcao) => (
            <Button
              key={opcao}
              onClick={() => toggleRestricao(opcao)}
              variant={restrictions.includes(opcao) ? 'secondary' : 'outline'}
              className="h-14 w-[46%] text-base"
            >
              {translateUserRestriction(opcao)}
            </Button>
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
          className="h-12 w-full text-base"
          onClick={handleSubmit}
          disabled={isLoading}
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
