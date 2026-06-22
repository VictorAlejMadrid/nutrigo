'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Store } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useCartStore } from '../../../hooks/use-cart';
import { categoryEmoji } from '../../../lib/shopping-items';
import { cn } from '../../../lib/utils';
import { translatePlan } from '../../../lib/available-plans';

const SERVICE_FEE_RATE = 0.08;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { plan } = useProfileStore();
  const { items, days } = useCartStore();

  const isFree = plan === 'free';
  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);
  const serviceFee = isFree ? subtotal * SERVICE_FEE_RATE : 0;
  const total = subtotal + serviceFee;

  const fmt = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-primary px-6 pb-6 pt-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-white">Carrinho</h1>
          <p className="mt-0.5 text-sm text-white/70">
            {items.length} itens • {days} dias
          </p>
        </div>
      </motion.div>

      {/* Item list */}
      <motion.div
        className="mx-auto w-full max-w-2xl flex-1 px-4 pb-72 pt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {items.map((item, idx) => (
            <motion.div
              key={item.foodId}
              variants={itemVariants}
              className={cn(
                'flex items-center gap-3 px-4 py-3',
                idx !== 0 && 'border-t border-gray-50'
              )}
            >
              <span className="text-base">
                {categoryEmoji[item.category]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">{days}× {item.portion}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[#0C3527]">
                {fmt(item.totalPrice)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing summary + CTA — fixed bottom */}
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white px-4 pt-4 pb-5 shadow-xl">
        <div className="mx-auto max-w-2xl">
          {/* Breakdown */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal dos produtos</span>
              <span className="font-medium">{fmt(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              {isFree ? (
                <>
                  <span className="text-gray-600">
                    Taxa de serviço NutriGO{' '}
                    <span className="text-xs text-gray-400">({(SERVICE_FEE_RATE * 100).toFixed(0)}%)</span>
                  </span>
                  <span className="font-medium text-gray-700">{fmt(serviceFee)}</span>
                </>
              ) : (
                <>
                  <span className="text-gray-600">
                    Taxa de serviço NutriGO
                  </span>
                  <span className="font-semibold text-green-600">
                    Isento — {translatePlan(plan)}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <span className="text-base font-bold text-[#0C3527]">Total</span>
              <span className="text-lg font-bold text-[#0C3527]">{fmt(total)}</span>
            </div>
          </div>

          <Button
            className="flex h-13 w-full items-center gap-2 bg-[#0C3527] text-white"
            onClick={() => router.push('/shopping/market')}
          >
            <Store size={16} />
            Escolher Supermercado
          </Button>
        </div>
      </div>

      {/* Back button */}
      <Button
        className="absolute top-4 left-4 flex h-9 w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 text-white hover:bg-white/30"
        onClick={() => router.push('/shopping/plan')}
      >
        <ChevronLeft size={14} />
      </Button>
    </div>
  );
}
