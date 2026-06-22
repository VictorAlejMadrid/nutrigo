import { create } from 'zustand';
import { SubstituteFoodItem } from '../lib/diet-plans';

type DietStore = {
  substitutions: Record<string, SubstituteFoodItem>;
  substituteFood: (originalId: string, replacement: SubstituteFoodItem) => void;

  approved: boolean;
  approveDiet: () => void;

  resetDiet: () => void;
};

export const useDietStore = create<DietStore>()((set) => ({
  substitutions: {},
  substituteFood: (originalId, replacement) =>
    set((state) => ({
      substitutions: { ...state.substitutions, [originalId]: replacement },
    })),

  approved: false,
  approveDiet: () => set({ approved: true }),

  resetDiet: () => set({ substitutions: {}, approved: false }),
}));
