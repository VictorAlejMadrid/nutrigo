import { PlanOption } from '../hooks/use-profile';

export const allPlans = [
  { value: 'free', description: 'Acesso limitado a recursos básicos', monthlyPrice: 0 },
  { value: 'monthly', description: 'Acesso completo por um mês', monthlyPrice: 79.9 },
  { value: 'yearly', description: 'Acesso completo por um ano com desconto', monthlyPrice: 49.9 },
] as { value: PlanOption; label: string; description: string; monthlyPrice: number }[];

export function translatePlan(plan: PlanOption) {
  switch (plan) {
    case 'free':
      return 'Grátis';
    case 'monthly':
      return 'Mensal';
    case 'yearly':
      return 'Anual';
    default:
      return 'Grátis';
  }
}
