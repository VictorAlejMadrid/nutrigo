'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, X, Loader2, Sparkles } from 'lucide-react';
import { allPlans, translatePlan } from '../../../lib/available-plans';
import { cn } from '../../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function ShoppingPlanPage() {
  const router = useRouter();
  const { plan, setPlan } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);

  const isFree = plan === 'free';

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    router.push(isFree ? '/shopping/list' : '/shopping/checkout');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-[#0C3527] px-6 pb-10 pt-14 text-center">
        <motion.p
          className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Antes de finalizar
        </motion.p>
        <motion.h1
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          Escolha seu plano
        </motion.h1>
        <motion.p
          className="mt-2 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          Seu plano define a taxa de serviço no pedido.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 pb-36 pt-6 md:flex-row md:items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {allPlans.map((p) => {
          const isSelected = plan === p.value;
          const isFeatured = !!p.badge;

          return (
            <motion.button
              key={p.value}
              variants={cardVariants}
              onClick={() => setPlan(p.value)}
              className={cn(
                'relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 p-6 text-left shadow-sm transition-all duration-200',
                isFeatured && isSelected
                  ? 'border-[#0C3527] bg-[#0C3527] shadow-xl'
                  : isFeatured
                  ? 'border-[#0C3527]/30 bg-[#0C3527]/5 hover:border-[#0C3527]/60 hover:shadow-md'
                  : isSelected
                  ? 'border-[#0C3527] bg-white shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
              )}
            >
              {p.badge && (
                <div
                  className={cn(
                    'mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                    isFeatured && isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#D57A4E]/15 text-[#D57A4E]'
                  )}
                >
                  <Sparkles size={11} />
                  {p.badge}
                </div>
              )}

              <h3
                className={cn(
                  'text-xl font-bold',
                  isFeatured && isSelected ? 'text-white' : 'text-[#0C3527]'
                )}
              >
                {translatePlan(p.value)}
              </h3>
              <p
                className={cn(
                  'mt-0.5 text-xs',
                  isFeatured && isSelected ? 'text-white/60' : 'text-gray-400'
                )}
              >
                {p.description}
              </p>

              <div className="mt-4 flex items-end gap-1">
                {p.monthlyPrice === 0 ? (
                  <span
                    className={cn(
                      'text-3xl font-extrabold',
                      isFeatured && isSelected ? 'text-white' : 'text-[#0C3527]'
                    )}
                  >
                    Grátis
                  </span>
                ) : (
                  <>
                    <span
                      className={cn(
                        'mb-1.5 text-xs font-medium',
                        isFeatured && isSelected ? 'text-white/70' : 'text-gray-400'
                      )}
                    >
                      R$
                    </span>
                    <span
                      className={cn(
                        'text-3xl font-extrabold leading-none',
                        isFeatured && isSelected ? 'text-white' : 'text-[#0C3527]'
                      )}
                    >
                      {p.monthlyPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span
                      className={cn(
                        'mb-1.5 text-xs',
                        isFeatured && isSelected ? 'text-white/60' : 'text-gray-400'
                      )}
                    >
                      /mês
                    </span>
                    {p.originalMonthlyPrice && (
                      <span
                        className={cn(
                          'mb-1.5 ml-1.5 text-xs line-through',
                          isFeatured && isSelected ? 'text-white/35' : 'text-gray-300'
                        )}
                      >
                        R$ {p.originalMonthlyPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </>
                )}
              </div>

              {p.yearlyTotal && (
                <p
                  className={cn(
                    'mt-1 text-xs',
                    isFeatured && isSelected ? 'text-white/55' : 'text-gray-400'
                  )}
                >
                  R$ {p.yearlyTotal.toFixed(2).replace('.', ',')} cobrado anualmente
                </p>
              )}

              <div
                className={cn(
                  'my-4 border-t',
                  isFeatured && isSelected ? 'border-white/15' : 'border-gray-100'
                )}
              />

              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5">
                    {f.included ? (
                      <Check
                        size={14}
                        className={cn(
                          'mt-0.5 shrink-0',
                          isFeatured && isSelected ? 'text-white' : 'text-[#0C3527]'
                        )}
                      />
                    ) : (
                      <X size={14} className="mt-0.5 shrink-0 text-gray-300" />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        f.included
                          ? isFeatured && isSelected
                            ? 'text-white/90'
                            : 'text-gray-700'
                          : 'text-gray-300'
                      )}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {p.value === 'free' && (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  No plano Grátis você pode ver sua lista de compras, mas o checkout completo requer um plano pago.
                </p>
              )}

              {isSelected && (
                <motion.div
                  className={cn(
                    'absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full',
                    isFeatured ? 'bg-white/25' : 'bg-[#0C3527]'
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Fixed bottom CTA */}
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white px-4 py-4 shadow-xl">
        <div className="mx-auto max-w-sm">
          {plan && (
            <p className="mb-2 text-center text-xs text-gray-400">
              Plano selecionado:{' '}
              <span className="font-semibold text-[#0C3527]">{translatePlan(plan)}</span>
            </p>
          )}
          <Button
            className="h-14 w-full bg-[#0C3527] text-base font-semibold text-white hover:bg-[#0C3527]/90 disabled:opacity-40"
            onClick={handleSubmit}
            disabled={isLoading || !plan}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                {isFree ? 'Abrindo lista...' : 'Carregando carrinho...'}
              </>
            ) : isFree ? (
              'Ver minha Lista de Compras'
            ) : (
              'Continuar para o Carrinho'
            )}
          </Button>
        </div>
      </div>

      {/* Back button */}
      <button
        className="absolute top-4 left-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
        onClick={() => router.push('/shopping/list')}
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}
