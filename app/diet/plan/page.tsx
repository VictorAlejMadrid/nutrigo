'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Flame, RefreshCw, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useProfileStore } from '../../../hooks/use-profile';
import { useDietStore } from '../../../hooks/use-diet';
import { getDietPlanByObjective, FoodItem, SubstituteFoodItem } from '../../../lib/diet-plans';
import { translateUserObjective } from '../../../lib/user-objective';
import { cn } from '../../../lib/utils';

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 420, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir: number) => ({
    x: dir * -420,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
};

const panelVariants = {
  enter: (dir: number) => ({ x: dir * 200, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: (dir: number) => ({
    x: dir * -200,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

type CardMode = 'view' | 'sub-list' | 'sub-pick';

export default function DietPlanPage() {
  const router = useRouter();
  const { objective, name } = useProfileStore();
  const { substitutions, substituteFood, approveDiet } = useDietStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isApproving, setIsApproving] = useState(false);
  const [cardMode, setCardMode] = useState<CardMode>('view');
  const [pickingFood, setPickingFood] = useState<FoodItem | null>(null);
  const [panelDir, setPanelDir] = useState(1);

  const plan = getDietPlanByObjective(objective);
  const meal = plan.meals[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === plan.meals.length - 1;
  const isInSubMode = cardMode !== 'view';
  const substitutionCount = Object.keys(substitutions).length;

  function goTo(index: number) {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setCardMode('view');
    setPickingFood(null);
  }

  function goNext() {
    if (!isLast) goTo(currentIndex + 1);
  }

  function goPrev() {
    if (!isFirst) goTo(currentIndex - 1);
  }

  useEffect(() => {
    if (isInSubMode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFirst, isLast, currentIndex, isInSubMode]);

  async function handleApprove() {
    setIsApproving(true);
    await new Promise((r) => setTimeout(r, 1000));
    approveDiet();
    router.push('/diet/approved');
  }

  function getEffectiveFood(food: FoodItem) {
    return substitutions[food.id] ?? food;
  }

  function openSubList() {
    setPanelDir(1);
    setCardMode('sub-list');
    setPickingFood(null);
  }

  function openFoodPick(food: FoodItem) {
    setPanelDir(1);
    setPickingFood(food);
    setCardMode('sub-pick');
  }

  function backToSubList() {
    setPanelDir(-1);
    setCardMode('sub-list');
    setPickingFood(null);
  }

  function handlePickSubstitute(original: FoodItem, replacement: SubstituteFoodItem) {
    substituteFood(original.id, replacement);
    setPanelDir(-1);
    setCardMode('sub-list');
    setPickingFood(null);
  }

  const mealCalories = meal.foods.reduce((acc, f) => acc + getEffectiveFood(f).calories, 0);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-primary px-6 pb-5 pt-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-white/70">Olá, {name}!</p>
          <h1 className="text-xl font-bold text-white">{plan.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
              <Flame size={12} className="text-secondary" />
              <span className="text-xs font-semibold text-white">{plan.totalCalories} kcal/dia</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
              <span className="text-xs text-white">{translateUserObjective(objective)}</span>
            </div>
            {substitutionCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
                <span className="text-xs text-white">
                  {substitutionCount} substituição{substitutionCount > 1 ? 'ões' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="border-b border-gray-100 bg-white py-3 shadow-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-2">
          {plan.meals.map((m, i) => (
            <button
              key={m.id}
              onClick={() => goTo(i)}
              aria-label={m.label}
              className={cn(
                'cursor-pointer rounded-full transition-all duration-300',
                i === currentIndex
                  ? 'h-2.5 w-8 bg-[#0C3527]'
                  : 'h-2 w-2 bg-gray-200 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      </div>

      {/* Slide area */}
      <div
        className={cn(
          'relative flex flex-1 items-center justify-center overflow-hidden py-6',
          isInSubMode ? 'px-4' : 'px-12 md:px-16'
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-lg"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">

              {/* Card header */}
              <div className="border-b border-gray-100 bg-[#0C3527]/5 px-6 py-5">
                <AnimatePresence mode="wait">
                  {cardMode === 'view' && (
                    <motion.div
                      key="header-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-center"
                    >
                      <span className="text-6xl leading-none">{meal.emoji}</span>
                      <h2 className="mt-3 text-2xl font-bold text-[#0C3527]">{meal.label}</h2>
                      <p className="mt-1 text-sm font-semibold text-gray-500">{mealCalories} kcal</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Refeição {currentIndex + 1} de {plan.meals.length}
                      </p>
                    </motion.div>
                  )}

                  {cardMode === 'sub-list' && (
                    <motion.div
                      key="header-sub-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        {meal.emoji} {meal.label}
                      </p>
                      <p className="mt-0.5 text-base font-bold text-[#0C3527]">
                        Qual alimento deseja trocar?
                      </p>
                    </motion.div>
                  )}

                  {cardMode === 'sub-pick' && pickingFood && (
                    <motion.div
                      key="header-sub-pick"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <button
                        onClick={backToSubList}
                        className="mb-2 flex cursor-pointer items-center gap-1 text-xs font-medium text-[#0C3527]/60 hover:text-[#0C3527]"
                      >
                        <ChevronLeft size={13} /> Voltar
                      </button>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Substituir alimento
                      </p>
                      <p className="mt-0.5 text-base font-bold text-[#0C3527]">
                        {substitutions[pickingFood.id]?.name ?? pickingFood.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {substitutions[pickingFood.id]?.portion ?? pickingFood.portion}
                        {' '}•{' '}
                        {substitutions[pickingFood.id]?.calories ?? pickingFood.calories} kcal
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card body */}
              <AnimatePresence mode="wait" custom={panelDir}>
                {cardMode === 'view' && (
                  <motion.div
                    key="body-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="divide-y divide-gray-50 px-6"
                  >
                    {meal.foods.map((food) => {
                      const effective = getEffectiveFood(food);
                      const isSubstituted = !!substitutions[food.id];
                      return (
                        <div key={food.id} className="flex items-center gap-3 py-3.5">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium text-gray-800">
                                {effective.name}
                              </span>
                              {isSubstituted && (
                                <span className="rounded-full bg-[#D57A4E]/15 px-2 py-0.5 text-xs font-medium text-[#D57A4E]">
                                  Substituído
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{effective.portion}</span>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-[#0C3527]">
                            {effective.calories} kcal
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {cardMode === 'sub-list' && (
                  <motion.div
                    key="body-sub-list"
                    custom={panelDir}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="divide-y divide-gray-50 px-6"
                  >
                    {meal.foods.map((food) => {
                      const effective = getEffectiveFood(food);
                      const isSubstituted = !!substitutions[food.id];
                      return (
                        <button
                          key={food.id}
                          onClick={() => openFoodPick(food)}
                          className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium text-gray-800">
                                {effective.name}
                              </span>
                              {isSubstituted && (
                                <span className="rounded-full bg-[#D57A4E]/15 px-2 py-0.5 text-xs font-medium text-[#D57A4E]">
                                  Substituído
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{effective.portion}</span>
                          </div>
                          <ChevronRight
                            size={15}
                            className={cn(
                              'shrink-0',
                              isSubstituted ? 'text-[#D57A4E]' : 'text-gray-300'
                            )}
                          />
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {cardMode === 'sub-pick' && pickingFood && (
                  <motion.div
                    key="body-sub-pick"
                    custom={panelDir}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-2.5 p-4"
                  >
                    {substitutions[pickingFood.id] && (
                      <button
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white p-3.5 text-left transition-colors hover:bg-gray-50"
                        onClick={() => handlePickSubstitute(pickingFood, pickingFood)}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500">
                            Restaurar: {pickingFood.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {pickingFood.portion} • {pickingFood.calories} kcal
                          </p>
                        </div>
                      </button>
                    )}

                    {pickingFood.substitutes.map((sub) => {
                      const isCurrentSub = substitutions[pickingFood.id]?.id === sub.id;
                      return (
                        <button
                          key={sub.id}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-colors',
                            isCurrentSub
                              ? 'cursor-pointer border-[#0C3527] bg-[#0C3527]/5'
                              : 'cursor-pointer border-gray-100 bg-white hover:border-[#0C3527]/30 hover:bg-gray-50'
                          )}
                          onClick={() => handlePickSubstitute(pickingFood, sub)}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#0C3527]">{sub.name}</p>
                            <p className="text-xs text-gray-500">
                              {sub.portion} • {sub.calories} kcal
                            </p>
                          </div>
                          {isCurrentSub && (
                            <Check size={17} className="shrink-0 text-[#0C3527]" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next arrows — hidden while substituting */}
        {!isInSubMode && (
          <>
            <button
              onClick={goPrev}
              disabled={isFirst}
              className={cn(
                'absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-all md:left-4',
                isFirst
                  ? 'cursor-not-allowed opacity-25'
                  : 'cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95'
              )}
            >
              <ChevronLeft size={20} className="text-[#0C3527]" />
            </button>
            <button
              onClick={goNext}
              disabled={isLast}
              className={cn(
                'absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-all md:right-4',
                isLast
                  ? 'cursor-not-allowed opacity-25'
                  : 'cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95'
              )}
            >
              <ChevronRight size={20} className="text-[#0C3527]" />
            </button>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
        <div className="mx-auto flex max-w-2xl gap-3">
          <AnimatePresence mode="wait">
            {isInSubMode ? (
              <motion.div
                key="cta-sub"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="flex w-full gap-3"
              >
                <Button
                  variant="outline"
                  className="flex h-12 flex-1 items-center gap-2 border-gray-200 text-gray-600"
                  onClick={() => { setCardMode('view'); setPickingFood(null); }}
                >
                  Concluir substituições
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="cta-main"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="flex w-full gap-3"
              >
                <Button
                  variant="outline"
                  className="flex h-12 flex-1 items-center gap-2 border-[#0C3527] text-[#0C3527]"
                  onClick={openSubList}
                >
                  <RefreshCw size={15} />
                  Substituir Alimentos
                </Button>
                <AnimatePresence>
                  {isLast && (
                    <motion.div
                      key="approve-btn"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto', transition: { duration: 0.3, ease: 'easeOut' } }}
                      exit={{ opacity: 0, width: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                      className="flex-1 overflow-hidden"
                    >
                      <Button
                        className="flex h-12 w-full items-center gap-2 bg-[#0C3527] text-white"
                        onClick={handleApprove}
                        disabled={isApproving}
                      >
                        {isApproving ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Aprovando...
                          </>
                        ) : (
                          <>
                            <Check size={15} />
                            Aprovar Dieta
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
