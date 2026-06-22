'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useDietStore } from '../../../hooks/use-diet';
import { getDietPlanByObjective } from '../../../lib/diet-plans';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

export default function ApprovedPage() {
  const router = useRouter();
  const { name, objective } = useProfileStore();
  const { substitutions } = useDietStore();

  const [isNavigating, setIsNavigating] = useState(false);
  const [celebrating, setCelebrating] = useState(true);

  const plan = getDietPlanByObjective(objective);
  const substitutionCount = Object.keys(substitutions).length;

  useEffect(() => {
    const timer = setTimeout(() => setCelebrating(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  function handleGenerateList() {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/shopping/list');
    }, 1000);
  }

  return (
    <motion.div
      className="bg-primary flex min-h-screen flex-col items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated checkmark */}
      <motion.div className="mb-8" variants={itemVariants}>
        <svg width="88" height="88" viewBox="0 0 88 88" className="text-white">
          <motion.circle
            cx="44"
            cy="44"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 27 44 L 38 55 L 61 32"
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

      {/* Title */}
      <motion.h1
        className="mb-3 text-center text-4xl font-bold text-white"
        variants={itemVariants}
      >
        Dieta Aprovada!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mb-2 text-center text-lg text-white/85"
        variants={itemVariants}
      >
        {plan.name} confirmado para {name}
      </motion.p>

      {/* Stats */}
      <motion.div
        className="mb-10 mt-6 flex flex-wrap justify-center gap-3"
        variants={itemVariants}
      >
        <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
          {plan.totalCalories} kcal/dia
        </div>
        <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
          {plan.meals.length} refeições
        </div>
        {substitutionCount > 0 && (
          <div className="rounded-full bg-[#D57A4E]/30 px-4 py-2 text-sm font-medium text-white">
            {substitutionCount} substituição{substitutionCount > 1 ? 'ões' : ''}
          </div>
        )}
      </motion.div>

      {/* Loading dots while celebrating */}
      <motion.div
        className="mb-10 flex min-h-10 items-center justify-center"
        variants={itemVariants}
      >
        {celebrating ? (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="bg-secondary h-2.5 w-2.5 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-white/70">
            Sua dieta está pronta. Agora é hora de montar sua lista de compras!
          </p>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div className="w-full max-w-sm" variants={itemVariants}>
        <Button
          className="h-14 w-full border-2 border-white/40 bg-white text-[#0C3527] text-lg font-semibold hover:bg-white/90"
          onClick={handleGenerateList}
          disabled={isNavigating}
        >
          {isNavigating ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Gerando lista...
            </>
          ) : (
            <>
              <ShoppingCart size={18} className="mr-2" />
              Gerar Lista de Compras
            </>
          )}
        </Button>

        <p className="mt-3 text-center text-xs text-white/50">
          Próximo passo: Flow 3 — Automação da Lista
        </p>
      </motion.div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-[#D57A4E] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white opacity-5 blur-3xl" />
    </motion.div>
  );
}
