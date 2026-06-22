import { PlanOption } from '../hooks/use-profile';

export type PlanFeature = { text: string; included: boolean };

export type Plan = {
  value: PlanOption;
  description: string;
  monthlyPrice: number;
  originalMonthlyPrice?: number;
  yearlyTotal?: number;
  badge?: string;
  features: PlanFeature[];
};

export const allPlans: Plan[] = [
  {
    value: 'free',
    description: 'Para quem quer conhecer o NutriGO',
    monthlyPrice: 0,
    features: [
      { text: 'Perfil nutricional personalizado', included: true },
      { text: '1 plano de dieta gerado', included: true },
      { text: 'Substituições limitadas (3/semana)', included: true },
      { text: 'Lista de compras automática', included: false },
      { text: 'Checkout sem taxa de serviço', included: false },
      { text: 'Suporte prioritário', included: false },
    ],
  },
  {
    value: 'monthly',
    description: 'Acesso completo, mês a mês',
    monthlyPrice: 79.9,
    features: [
      { text: 'Perfil nutricional personalizado', included: true },
      { text: 'Planos de dieta ilimitados', included: true },
      { text: 'Substituições ilimitadas', included: true },
      { text: 'Lista de compras automática', included: true },
      { text: 'Checkout sem taxa de serviço', included: true },
      { text: 'Suporte prioritário 24h', included: false },
    ],
  },
  {
    value: 'yearly',
    description: 'O melhor custo-benefício do NutriGO',
    monthlyPrice: 49.9,
    originalMonthlyPrice: 79.9,
    yearlyTotal: 598.8,
    badge: 'Recomendado',
    features: [
      { text: 'Perfil nutricional personalizado', included: true },
      { text: 'Planos de dieta ilimitados', included: true },
      { text: 'Substituições ilimitadas', included: true },
      { text: 'Lista de compras automática', included: true },
      { text: 'Checkout sem taxa de serviço', included: true },
      { text: 'Suporte prioritário 24h', included: true },
    ],
  },
];

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
