'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { allPlans, translatePlan } from '../../../lib/available-plans';
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

export default function PlanPage() {
  const router = useRouter();

  const { plan, setPlan } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/onboarding/success');
  };

  function handlePrev() {
    router.push('/onboarding/review');
  }

  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-white px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="mb-8 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Escolha o plano ideal para você
      </motion.h2>

      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        {allPlans.map((p) => (
          <Button
            key={p.value}
            variant="outline"
            className={cn(
              'mb-8 flex h-32 w-full max-w-sm flex-col items-start rounded-lg border-2 border-gray-200 bg-gray-50 p-6',
              plan === p.value && 'border-primary text-primary border-2'
            )}
            onClick={() => setPlan(p.value)}
          >
            <div className="mb-2 flex w-full items-center justify-between gap-2">
              <h3 className="text-primary mb-4 text-lg font-semibold">{translatePlan(p.value)}</h3>
              <h3 className="text-secondary mb-4 text-lg font-bold">
                {p.monthlyPrice.toFixed(2)} R$/mês
              </h3>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              - {p.description}
            </motion.div>
          </Button>
        ))}
      </div>

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
          {isLoading ? 'Processando...' : 'Confirmar e Iniciar'}
        </Button>
      </motion.div>

      <Button
        className="sm:rounded-4 absolute bottom-8 left-8 flex h-8 w-fit items-center gap-2 rounded-full sm:pr-6 sm:pl-4"
        onClick={handlePrev}
      >
        <ChevronLeft size={12} />
        <p className="hidden sm:block">Voltar</p>
      </Button>
    </motion.div>
  );
}
