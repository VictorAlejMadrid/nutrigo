'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useDietStore } from '../../../hooks/use-diet';
import { getDietPlanByObjective, FoodItem, SubstituteFoodItem } from '../../../lib/diet-plans';
import { cn } from '../../../lib/utils';

export default function SubstitutePage() {
  const router = useRouter();
  const { objective } = useProfileStore();
  const { substitutions, substituteFood } = useDietStore();

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const plan = getDietPlanByObjective(objective);

  function handleSelectFood(food: FoodItem) {
    setSelectedFood(food);
  }

  function handlePickSubstitute(original: FoodItem, replacement: SubstituteFoodItem) {
    substituteFood(original.id, replacement);
    setSelectedFood(null);
  }

  function getEffectiveName(food: FoodItem) {
    return substitutions[food.id]?.name ?? food.name;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header — full-width bg, constrained content */}
      <motion.div
        className="bg-primary px-6 pb-6 pt-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-bold text-white">Substituir Alimentos</h1>
          <p className="mt-1 text-sm text-white/70">
            Toque em um alimento para ver as opções de substituição
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedFood === null ? (
            /* Step A: food list */
            <motion.div
              key="food-list"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-4xl px-4 pt-6 pb-6"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {plan.meals.map((meal) => (
                  <div key={meal.id}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-base">{meal.emoji}</span>
                      <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        {meal.label}
                      </h2>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                      {meal.foods.map((food, idx) => {
                        const isSubstituted = !!substitutions[food.id];
                        const effectiveName = getEffectiveName(food);

                        return (
                          <button
                            key={food.id}
                            className={cn(
                              'flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 active:bg-gray-100',
                              idx !== 0 && 'border-t border-gray-50'
                            )}
                            onClick={() => handleSelectFood(food)}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-medium text-gray-800">
                                  {effectiveName}
                                </span>
                                {isSubstituted && (
                                  <span className="rounded-full bg-[#D57A4E]/15 px-2 py-0.5 text-xs font-medium text-[#D57A4E]">
                                    Substituído
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">
                                {substitutions[food.id]?.portion ?? food.portion} •{' '}
                                {substitutions[food.id]?.calories ?? food.calories} kcal
                              </span>
                            </div>

                            {isSubstituted ? (
                              <Check size={16} className="shrink-0 text-[#D57A4E]" />
                            ) : (
                              <ChevronRight size={16} className="shrink-0 text-gray-300" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Step B: substitute picker */
            <motion.div
              key="substitute-picker"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-lg px-4 pt-6 pb-6"
            >
              {/* Current food card */}
              <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-1 text-xs font-medium tracking-wide text-gray-400 uppercase">
                  Alimento atual
                </p>
                <p className="text-base font-semibold text-[#0C3527]">
                  {substitutions[selectedFood.id]?.name ?? selectedFood.name}
                </p>
                <p className="text-sm text-gray-500">
                  {substitutions[selectedFood.id]?.portion ?? selectedFood.portion} •{' '}
                  {substitutions[selectedFood.id]?.calories ?? selectedFood.calories} kcal
                </p>
              </div>

              <h2 className="mb-3 text-base font-semibold text-[#0C3527]">
                Escolha uma substituição
              </h2>

              <div className="flex flex-col gap-3">
                {/* Restore original */}
                {substitutions[selectedFood.id] && (
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50"
                    onClick={() => handlePickSubstitute(selectedFood, selectedFood)}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">
                        Restaurar original: {selectedFood.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedFood.portion} • {selectedFood.calories} kcal
                      </p>
                    </div>
                  </button>
                )}

                {selectedFood.substitutes.map((sub) => {
                  const isCurrentSub = substitutions[selectedFood.id]?.id === sub.id;

                  return (
                    <button
                      key={sub.id}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 py-4 text-left transition-colors',
                        isCurrentSub
                          ? 'border-[#0C3527] bg-[#0C3527]/5'
                          : 'border-gray-100 bg-white hover:border-[#0C3527]/30 hover:bg-gray-50'
                      )}
                      onClick={() => handlePickSubstitute(selectedFood, sub)}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0C3527]">{sub.name}</p>
                        <p className="text-xs text-gray-500">
                          {sub.portion} • {sub.calories} kcal
                        </p>
                      </div>
                      {isCurrentSub && <Check size={18} className="shrink-0 text-[#0C3527]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-gray-100 px-4 py-4">
        <div className="mx-auto max-w-4xl">
          {selectedFood ? (
            <Button
              variant="outline"
              className="flex w-full items-center gap-2 border-gray-200 text-gray-600 md:max-w-xs"
              onClick={() => setSelectedFood(null)}
            >
              <ChevronLeft size={16} />
              Voltar para a lista
            </Button>
          ) : (
            <Button
              className="flex w-full items-center gap-2 bg-[#0C3527] text-white md:ml-auto md:max-w-xs"
              onClick={() => router.push('/diet/plan')}
            >
              <Check size={16} />
              Concluir substituições
            </Button>
          )}
        </div>
      </div>

      {/* Top back button */}
      <Button
        className="absolute top-4 left-4 flex h-9 w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 text-white hover:bg-white/30"
        onClick={() => {
          if (selectedFood) {
            setSelectedFood(null);
          } else {
            router.push('/diet/plan');
          }
        }}
      >
        <ChevronLeft size={14} />
      </Button>
    </div>
  );
}
