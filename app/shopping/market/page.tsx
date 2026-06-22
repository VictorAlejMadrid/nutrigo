'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, MapPin, Clock, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useCartStore } from '../../../hooks/use-cart';
import { allSupermarkets, Supermarket } from '../../../lib/supermarkets';
import { cn } from '../../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function MarketPage() {
  const router = useRouter();
  const { selectedMarket, selectMarket, placeOrder, items, days } = useCartStore();

  const [isConfirming, setIsConfirming] = useState(false);

  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);

  async function handleConfirm() {
    if (!selectedMarket) return;
    setIsConfirming(true);
    await new Promise((r) => setTimeout(r, 1200));
    const id = 'NTG-' + String(Math.floor(1000 + Math.random() * 9000));
    placeOrder(id);
    router.push('/shopping/confirmed');
  }

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
          <h1 className="text-2xl font-bold text-white">Escolha o Supermercado</h1>
          <p className="mt-0.5 text-sm text-white/70">Parceiros disponíveis na sua região</p>
        </div>
      </motion.div>

      {/* Market cards */}
      <motion.div
        className="mx-auto w-full max-w-2xl flex-1 px-4 pb-32 pt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-3">
          {allSupermarkets.map((market) => {
            const isSelected = selectedMarket?.id === market.id;
            return (
              <motion.button
                key={market.id}
                variants={cardVariants}
                onClick={() => selectMarket(market)}
                className={cn(
                  'w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-4 text-left shadow-sm transition-all',
                  isSelected
                    ? 'border-[#0C3527] shadow-md'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Emoji avatar */}
                  <div
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl',
                      isSelected ? 'bg-[#0C3527]/10' : 'bg-gray-50'
                    )}
                  >
                    {market.emoji}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          'font-semibold',
                          isSelected ? 'text-[#0C3527]' : 'text-gray-800'
                        )}
                      >
                        {market.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-600">{market.rating}</span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={11} />
                        {market.neighborhood} • {market.distance}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={11} />
                        {market.deliveryTime}
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      Pedido mínimo: R$ {market.minOrder.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  <div
                    className={cn(
                      'mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-all',
                      isSelected
                        ? 'border-[#0C3527] bg-[#0C3527]'
                        : 'border-gray-200'
                    )}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 20 20" className="h-full w-full text-white">
                        <path
                          d="M5 10l3.5 3.5L15 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
        <div className="mx-auto max-w-2xl">
          {selectedMarket && (
            <p className="mb-2 text-center text-xs text-gray-400">
              Entrega via {selectedMarket.name} • {selectedMarket.deliveryTime}
            </p>
          )}
          <Button
            className="flex h-13 w-full items-center justify-center gap-2 bg-[#0C3527] text-white disabled:opacity-40"
            onClick={handleConfirm}
            disabled={!selectedMarket || isConfirming}
          >
            {isConfirming ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Confirmando pedido...
              </>
            ) : (
              'Confirmar Pedido'
            )}
          </Button>
        </div>
      </div>

      {/* Back button */}
      <Button
        className="absolute top-4 left-4 flex h-9 w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 text-white hover:bg-white/30"
        onClick={() => router.push('/shopping/checkout')}
      >
        <ChevronLeft size={14} />
      </Button>
    </div>
  );
}
