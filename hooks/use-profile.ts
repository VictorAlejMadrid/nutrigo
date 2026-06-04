import { create } from 'zustand';

export type ObjectiveOption =
  | 'weight-loss'
  | 'muscle-gain'
  | 'maintenance'
  | 'health-and-organization';
export type RestrictionOption = 'gluten' | 'lactose' | 'vegan' | 'vegetarian' | 'none';
export type PlanOption = 'yearly' | 'monthly' | 'free';

type ProfileStore = {
  name: string;
  setName: (name: string) => void;

  age: number;
  setAge: (age: number) => void;

  weight: string;
  setWeight: (weight: string) => void;

  objective: ObjectiveOption;
  setObjective: (objective: ObjectiveOption) => void;

  restrictions: RestrictionOption[];
  setRestrictions: (restrictions: RestrictionOption[]) => void;

  plan: PlanOption;
  setPlan: (plan: PlanOption) => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  name: '',
  setName: (name: string) => set({ name }),

  age: 0,
  setAge: (age: number) => set({ age }),

  weight: '',
  setWeight: (weight: string) => set({ weight }),

  objective: 'weight-loss',
  setObjective: (objective: ObjectiveOption) => set({ objective }),

  restrictions: [],
  setRestrictions: (restrictions: RestrictionOption[]) => set({ restrictions }),

  plan: 'yearly',
  setPlan: (plan: PlanOption) => set({ plan }),
}));
