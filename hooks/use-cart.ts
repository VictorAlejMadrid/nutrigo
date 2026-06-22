import { create } from 'zustand';
import { DietPlan, SubstituteFoodItem } from '../lib/diet-plans';
import { getCategoryForFood, getPriceForFood, ShoppingCategory } from '../lib/shopping-items';
import { Supermarket } from '../lib/supermarkets';

export type CartItem = {
  foodId: string;
  name: string;
  portion: string;
  category: ShoppingCategory;
  pricePerPortion: number;
  totalPrice: number;
};

type CartStore = {
  items: CartItem[];
  days: number;
  setDays: (days: number) => void;
  buildCart: (plan: DietPlan, substitutions: Record<string, SubstituteFoodItem>) => void;

  selectedMarket: Supermarket | null;
  selectMarket: (market: Supermarket) => void;

  orderId: string;
  orderPlaced: boolean;
  placeOrder: (id: string) => void;

  resetCart: () => void;
};

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  days: 7,

  setDays: (days) =>
    set((state) => ({
      days,
      items: state.items.map((item) => ({
        ...item,
        totalPrice: item.pricePerPortion * days,
      })),
    })),

  buildCart: (plan, substitutions) => {
    const { days } = get();
    const seen = new Set<string>();
    const items: CartItem[] = [];

    plan.meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const effective = substitutions[food.id] ?? food;
        if (seen.has(effective.id)) return;
        seen.add(effective.id);

        const pricePerPortion = getPriceForFood(effective.name);
        items.push({
          foodId: effective.id,
          name: effective.name,
          portion: effective.portion,
          category: getCategoryForFood(effective.name),
          pricePerPortion,
          totalPrice: pricePerPortion * days,
        });
      });
    });

    set({ items });
  },

  selectedMarket: null,
  selectMarket: (market) => set({ selectedMarket: market }),

  orderId: '',
  orderPlaced: false,
  placeOrder: (id) => set({ orderPlaced: true, orderId: id }),

  resetCart: () =>
    set({ items: [], days: 7, selectedMarket: null, orderPlaced: false, orderId: '' }),
}));
