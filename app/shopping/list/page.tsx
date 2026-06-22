'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useDietStore } from '../../../hooks/use-diet';
import { useCartStore } from '../../../hooks/use-cart';
import { getDietPlanByObjective } from '../../../lib/diet-plans';
import { CATEGORY_ORDER, categoryEmoji } from '../../../lib/shopping-items';
import { cn } from '../../../lib/utils';

const DAYS_OPTIONS = [7, 14, 30] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function ShoppingListPage() {
  const router = useRouter();
  const { objective, name } = useProfileStore();
  const { substitutions } = useDietStore();
  const { items, days, setDays, buildCart } = useCartStore();

  const plan = getDietPlanByObjective(objective);

  useEffect(() => {
    buildCart(plan, substitutions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length > 0) acc[cat] = catItems;
      return acc;
    },
    {} as Record<string, typeof items>
  );

  const totalItems = items.length;
  const estimatedTotal = items.reduce((acc, i) => acc + i.totalPrice, 0);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-primary px-6 pb-6 pt-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-white/70">Olá, {name}!</p>
          <h1 className="text-2xl font-bold text-white">Lista de Compras</h1>
          <p className="mt-0.5 text-sm text-white/80">{plan.name}</p>

          {/* Period selector */}
          <div className="mt-4 flex items-center gap-2">
            <Calendar size={14} className="text-white/60" />
            <span className="text-xs text-white/70">Período:</span>
            <div className="flex gap-2">
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={cn(
                    'cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-all',
                    days === d
                      ? 'bg-white text-[#0C3527]'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  )}
                >
                  {d} dias
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grouped items */}
      <motion.div
        className="mx-auto w-full max-w-4xl flex-1 px-4 pb-32 pt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Object.entries(grouped).map(([category, catItems]) => (
            <motion.div key={category} variants={itemVariants}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{categoryEmoji[category as keyof typeof categoryEmoji]}</span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {category}
                </h2>
                <span className="ml-auto text-xs text-gray-400">{catItems.length} itens</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {catItems.map((item, idx) => (
                  <div
                    key={item.foodId}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3',
                      idx !== 0 && 'border-t border-gray-50'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {days}× {item.portion}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-[#0C3527]">
                      R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-400">{totalItems} itens • {days} dias</p>
            <p className="text-lg font-bold text-[#0C3527]">
              ≈ R$ {estimatedTotal.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <Button
            className="flex h-12 items-center gap-2 bg-[#0C3527] px-6 text-white"
            onClick={() => router.push('/shopping/plan')}
          >
            <ShoppingCart size={16} />
            Ver Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}
