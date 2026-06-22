'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useCartStore } from '../../../hooks/use-cart';
import { useDietStore } from '../../../hooks/use-diet';

const SERVICE_FEE_RATE = 0.08;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
};

export default function ConfirmedPage() {
  const router = useRouter();
  const { name, plan } = useProfileStore();
  const { items, days, selectedMarket, orderId, resetCart } = useCartStore();
  const { resetDiet } = useDietStore();

  const isFree = plan === 'free';
  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);
  const serviceFee = isFree ? subtotal * SERVICE_FEE_RATE : 0;
  const total = subtotal + serviceFee;

  const fmt = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

  function handleRestart() {
    resetCart();
    resetDiet();
    router.push('/onboarding/welcome');
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
        className="mb-1 text-center text-4xl font-bold text-white"
        variants={itemVariants}
      >
        Pedido Confirmado!
      </motion.h1>

      <motion.p className="mb-2 text-center text-white/80" variants={itemVariants}>
        Obrigado, {name}! Seu pedido foi enviado.
      </motion.p>

      {orderId && (
        <motion.p
          className="mb-8 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white"
          variants={itemVariants}
        >
          #{orderId}
        </motion.p>
      )}

      {/* Order summary card */}
      <motion.div
        className="mb-8 w-full max-w-sm overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm"
        variants={itemVariants}
      >
        {selectedMarket && (
          <div className="border-b border-white/10 px-5 py-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/50">
              Supermercado
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedMarket.emoji}</span>
              <div>
                <p className="font-semibold text-white">{selectedMarket.name}</p>
                <div className="flex gap-3 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} /> {selectedMarket.neighborhood}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {selectedMarket.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-b border-white/10 px-5 py-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/50">
            Resumo do pedido
          </p>
          <div className="flex justify-between text-sm text-white/80">
            <span>{items.length} itens • {days} dias</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {isFree && (
            <div className="flex justify-between text-sm text-white/60">
              <span>Taxa NutriGO (8%)</span>
              <span>{fmt(serviceFee)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-semibold text-white">Total pago</span>
          <span className="text-lg font-bold text-white">{fmt(total)}</span>
        </div>
      </motion.div>

      {/* Simulated logistics note */}
      <motion.div
        className="mb-8 flex items-center gap-2 text-center text-sm text-white/60"
        variants={itemVariants}
      >
        <ShoppingBag size={15} />
        <span>
          {selectedMarket
            ? `${selectedMarket.name} receberá sua lista e iniciará a separação`
            : 'O supermercado iniciará a separação dos itens'}
        </span>
      </motion.div>

      {/* CTA */}
      <motion.div className="w-full max-w-sm" variants={itemVariants}>
        <Button
          className="h-14 w-full border-2 border-white/30 bg-white text-[#0C3527] text-base font-semibold hover:bg-white/90"
          onClick={handleRestart}
        >
          Voltar ao início
        </Button>
      </motion.div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-[#D57A4E] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white opacity-5 blur-3xl" />
    </motion.div>
  );
}
