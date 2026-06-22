import { ObjectiveOption } from '../hooks/use-profile';

export type SubstituteFoodItem = {
  id: string;
  name: string;
  portion: string;
  calories: number;
};

export type FoodItem = SubstituteFoodItem & {
  substitutes: SubstituteFoodItem[];
};

export type Meal = {
  id: string;
  label: string;
  emoji: string;
  foods: FoodItem[];
};

export type DietPlan = {
  objective: ObjectiveOption;
  name: string;
  description: string;
  totalCalories: number;
  meals: Meal[];
};

const weightLossPlan: DietPlan = {
  objective: 'weight-loss',
  name: 'Plano Emagrecimento',
  description: 'Déficit calórico moderado para perda de peso saudável e sustentável',
  totalCalories: 1450,
  meals: [
    {
      id: 'breakfast',
      label: 'Café da Manhã',
      emoji: '☀️',
      foods: [
        {
          id: 'wl-b-1',
          name: 'Iogurte grego natural',
          portion: '150g',
          calories: 100,
          substitutes: [
            { id: 'wl-b-1-s1', name: 'Cottage cheese', portion: '150g', calories: 120 },
            { id: 'wl-b-1-s2', name: 'Kefir natural', portion: '150ml', calories: 90 },
          ],
        },
        {
          id: 'wl-b-2',
          name: 'Banana',
          portion: '1 unidade',
          calories: 90,
          substitutes: [
            { id: 'wl-b-2-s1', name: 'Maçã', portion: '1 unidade', calories: 80 },
            { id: 'wl-b-2-s2', name: 'Pera', portion: '1 unidade', calories: 85 },
          ],
        },
        {
          id: 'wl-b-3',
          name: 'Granola sem açúcar',
          portion: '30g',
          calories: 130,
          substitutes: [
            { id: 'wl-b-3-s1', name: 'Aveia em flocos', portion: '30g', calories: 110 },
            { id: 'wl-b-3-s2', name: 'Müsli natural', portion: '30g', calories: 115 },
          ],
        },
      ],
    },
    {
      id: 'morning-snack',
      label: 'Lanche da Manhã',
      emoji: '🍎',
      foods: [
        {
          id: 'wl-ms-1',
          name: 'Maçã',
          portion: '1 unidade',
          calories: 80,
          substitutes: [
            { id: 'wl-ms-1-s1', name: 'Laranja', portion: '1 unidade', calories: 60 },
            { id: 'wl-ms-1-s2', name: 'Pêssego', portion: '1 unidade', calories: 55 },
          ],
        },
        {
          id: 'wl-ms-2',
          name: 'Amêndoas',
          portion: '20g',
          calories: 120,
          substitutes: [
            { id: 'wl-ms-2-s1', name: 'Castanha de caju', portion: '20g', calories: 110 },
            { id: 'wl-ms-2-s2', name: 'Nozes', portion: '15g', calories: 105 },
          ],
        },
      ],
    },
    {
      id: 'lunch',
      label: 'Almoço',
      emoji: '🍽️',
      foods: [
        {
          id: 'wl-l-1',
          name: 'Frango grelhado',
          portion: '150g',
          calories: 165,
          substitutes: [
            { id: 'wl-l-1-s1', name: 'Tilápia grelhada', portion: '150g', calories: 155 },
            { id: 'wl-l-1-s2', name: 'Peru grelhado', portion: '150g', calories: 160 },
          ],
        },
        {
          id: 'wl-l-2',
          name: 'Arroz integral',
          portion: '100g cozido',
          calories: 130,
          substitutes: [
            { id: 'wl-l-2-s1', name: 'Quinoa cozida', portion: '80g', calories: 110 },
            { id: 'wl-l-2-s2', name: 'Batata doce cozida', portion: '150g', calories: 130 },
          ],
        },
        {
          id: 'wl-l-3',
          name: 'Brócolis no vapor',
          portion: '150g',
          calories: 55,
          substitutes: [
            { id: 'wl-l-3-s1', name: 'Couve-flor cozida', portion: '150g', calories: 45 },
            { id: 'wl-l-3-s2', name: 'Aspargos', portion: '150g', calories: 45 },
          ],
        },
        {
          id: 'wl-l-4',
          name: 'Salada verde',
          portion: '80g',
          calories: 20,
          substitutes: [
            { id: 'wl-l-4-s1', name: 'Rúcula', portion: '80g', calories: 20 },
            { id: 'wl-l-4-s2', name: 'Espinafre cru', portion: '80g', calories: 20 },
          ],
        },
      ],
    },
    {
      id: 'afternoon-snack',
      label: 'Lanche da Tarde',
      emoji: '🥕',
      foods: [
        {
          id: 'wl-as-1',
          name: 'Cenoura baby',
          portion: '100g',
          calories: 40,
          substitutes: [
            { id: 'wl-as-1-s1', name: 'Pepino fatiado', portion: '100g', calories: 15 },
            { id: 'wl-as-1-s2', name: 'Aipo', portion: '100g', calories: 15 },
          ],
        },
        {
          id: 'wl-as-2',
          name: 'Homus',
          portion: '30g',
          calories: 70,
          substitutes: [
            { id: 'wl-as-2-s1', name: 'Guacamole', portion: '30g', calories: 60 },
            { id: 'wl-as-2-s2', name: 'Pasta de grão-de-bico', portion: '30g', calories: 65 },
          ],
        },
      ],
    },
    {
      id: 'dinner',
      label: 'Jantar',
      emoji: '🌙',
      foods: [
        {
          id: 'wl-d-1',
          name: 'Atum em lata',
          portion: '120g',
          calories: 140,
          substitutes: [
            { id: 'wl-d-1-s1', name: 'Sardinha ao natural', portion: '100g', calories: 135 },
            { id: 'wl-d-1-s2', name: 'Frango desfiado', portion: '120g', calories: 150 },
          ],
        },
        {
          id: 'wl-d-2',
          name: 'Batata doce assada',
          portion: '150g',
          calories: 130,
          substitutes: [
            { id: 'wl-d-2-s1', name: 'Aipim cozido', portion: '100g', calories: 125 },
            { id: 'wl-d-2-s2', name: 'Inhame cozido', portion: '150g', calories: 115 },
          ],
        },
        {
          id: 'wl-d-3',
          name: 'Espinafre refogado',
          portion: '100g',
          calories: 35,
          substitutes: [
            { id: 'wl-d-3-s1', name: 'Couve refogada', portion: '100g', calories: 30 },
            { id: 'wl-d-3-s2', name: 'Acelga refogada', portion: '100g', calories: 25 },
          ],
        },
      ],
    },
  ],
};

const muscleGainPlan: DietPlan = {
  objective: 'muscle-gain',
  name: 'Plano Ganho de Massa',
  description: 'Superávit calórico com foco em proteínas para construção muscular',
  totalCalories: 2800,
  meals: [
    {
      id: 'breakfast',
      label: 'Café da Manhã',
      emoji: '☀️',
      foods: [
        {
          id: 'mg-b-1',
          name: 'Ovos mexidos',
          portion: '3 ovos',
          calories: 210,
          substitutes: [
            { id: 'mg-b-1-s1', name: 'Omelete de claras', portion: '4 claras', calories: 140 },
            { id: 'mg-b-1-s2', name: 'Ovos cozidos', portion: '3 ovos', calories: 210 },
          ],
        },
        {
          id: 'mg-b-2',
          name: 'Pão integral',
          portion: '2 fatias',
          calories: 160,
          substitutes: [
            { id: 'mg-b-2-s1', name: 'Tapioca', portion: '2 unidades', calories: 140 },
            { id: 'mg-b-2-s2', name: 'Aveia em flocos', portion: '60g', calories: 220 },
          ],
        },
        {
          id: 'mg-b-3',
          name: 'Abacate',
          portion: '50g',
          calories: 80,
          substitutes: [
            { id: 'mg-b-3-s1', name: 'Pasta de amendoim', portion: '30g', calories: 185 },
            { id: 'mg-b-3-s2', name: 'Azeite extra virgem', portion: '10ml', calories: 90 },
          ],
        },
      ],
    },
    {
      id: 'morning-snack',
      label: 'Lanche da Manhã',
      emoji: '💪',
      foods: [
        {
          id: 'mg-ms-1',
          name: 'Whey protein',
          portion: '30g (1 scoop)',
          calories: 120,
          substitutes: [
            { id: 'mg-ms-1-s1', name: 'Proteína vegetal (pea)', portion: '30g', calories: 110 },
            { id: 'mg-ms-1-s2', name: 'Iogurte grego', portion: '200g', calories: 130 },
          ],
        },
        {
          id: 'mg-ms-2',
          name: 'Banana',
          portion: '1 unidade',
          calories: 90,
          substitutes: [
            { id: 'mg-ms-2-s1', name: 'Manga', portion: '100g', calories: 65 },
            { id: 'mg-ms-2-s2', name: 'Tâmara', portion: '30g', calories: 85 },
          ],
        },
        {
          id: 'mg-ms-3',
          name: 'Amendoim torrado',
          portion: '30g',
          calories: 175,
          substitutes: [
            { id: 'mg-ms-3-s1', name: 'Mix de castanhas', portion: '30g', calories: 185 },
            { id: 'mg-ms-3-s2', name: 'Amêndoas', portion: '30g', calories: 175 },
          ],
        },
      ],
    },
    {
      id: 'lunch',
      label: 'Almoço',
      emoji: '🍽️',
      foods: [
        {
          id: 'mg-l-1',
          name: 'Carne bovina magra',
          portion: '200g',
          calories: 290,
          substitutes: [
            { id: 'mg-l-1-s1', name: 'Frango grelhado', portion: '200g', calories: 220 },
            { id: 'mg-l-1-s2', name: 'Salmão grelhado', portion: '200g', calories: 280 },
          ],
        },
        {
          id: 'mg-l-2',
          name: 'Arroz branco',
          portion: '150g cozido',
          calories: 195,
          substitutes: [
            { id: 'mg-l-2-s1', name: 'Macarrão integral', portion: '100g cozido', calories: 150 },
            { id: 'mg-l-2-s2', name: 'Arroz integral', portion: '150g cozido', calories: 195 },
          ],
        },
        {
          id: 'mg-l-3',
          name: 'Feijão carioca',
          portion: '100g cozido',
          calories: 130,
          substitutes: [
            { id: 'mg-l-3-s1', name: 'Lentilha cozida', portion: '100g', calories: 115 },
            { id: 'mg-l-3-s2', name: 'Grão-de-bico', portion: '100g', calories: 165 },
          ],
        },
        {
          id: 'mg-l-4',
          name: 'Azeite extra virgem',
          portion: '10ml',
          calories: 90,
          substitutes: [
            { id: 'mg-l-4-s1', name: 'Óleo de coco', portion: '10ml', calories: 90 },
            { id: 'mg-l-4-s2', name: 'Manteiga clarificada', portion: '10g', calories: 90 },
          ],
        },
      ],
    },
    {
      id: 'afternoon-snack',
      label: 'Lanche da Tarde',
      emoji: '🥪',
      foods: [
        {
          id: 'mg-as-1',
          name: 'Sanduíche de frango',
          portion: '1 unidade',
          calories: 280,
          substitutes: [
            { id: 'mg-as-1-s1', name: 'Wrap de atum', portion: '1 unidade', calories: 260 },
            { id: 'mg-as-1-s2', name: 'Pão com ovo', portion: '1 unidade', calories: 270 },
          ],
        },
        {
          id: 'mg-as-2',
          name: 'Iogurte grego',
          portion: '150g',
          calories: 100,
          substitutes: [
            { id: 'mg-as-2-s1', name: 'Queijo cottage', portion: '150g', calories: 120 },
            { id: 'mg-as-2-s2', name: 'Leite desnatado', portion: '250ml', calories: 90 },
          ],
        },
      ],
    },
    {
      id: 'dinner',
      label: 'Jantar',
      emoji: '🌙',
      foods: [
        {
          id: 'mg-d-1',
          name: 'Salmão grelhado',
          portion: '200g',
          calories: 280,
          substitutes: [
            { id: 'mg-d-1-s1', name: 'Atum fresco', portion: '200g', calories: 265 },
            { id: 'mg-d-1-s2', name: 'Tilápia grelhada', portion: '200g', calories: 200 },
          ],
        },
        {
          id: 'mg-d-2',
          name: 'Macarrão integral',
          portion: '100g cozido',
          calories: 150,
          substitutes: [
            { id: 'mg-d-2-s1', name: 'Arroz integral', portion: '100g cozido', calories: 130 },
            { id: 'mg-d-2-s2', name: 'Batata doce', portion: '200g', calories: 170 },
          ],
        },
        {
          id: 'mg-d-3',
          name: 'Legumes salteados',
          portion: '150g',
          calories: 80,
          substitutes: [
            { id: 'mg-d-3-s1', name: 'Brócolis refogado', portion: '150g', calories: 55 },
            { id: 'mg-d-3-s2', name: 'Abobrinha grelhada', portion: '150g', calories: 30 },
          ],
        },
      ],
    },
  ],
};

const maintenancePlan: DietPlan = {
  objective: 'maintenance',
  name: 'Plano Manutenção',
  description: 'Equilíbrio calórico para manter o peso com nutrição variada e completa',
  totalCalories: 2000,
  meals: [
    {
      id: 'breakfast',
      label: 'Café da Manhã',
      emoji: '☀️',
      foods: [
        {
          id: 'mt-b-1',
          name: 'Aveia em flocos',
          portion: '40g',
          calories: 150,
          substitutes: [
            { id: 'mt-b-1-s1', name: 'Granola integral', portion: '40g', calories: 170 },
            { id: 'mt-b-1-s2', name: 'Müsli sem açúcar', portion: '40g', calories: 155 },
          ],
        },
        {
          id: 'mt-b-2',
          name: 'Leite desnatado',
          portion: '200ml',
          calories: 70,
          substitutes: [
            { id: 'mt-b-2-s1', name: 'Bebida vegetal de aveia', portion: '200ml', calories: 80 },
            { id: 'mt-b-2-s2', name: 'Iogurte natural', portion: '170g', calories: 95 },
          ],
        },
        {
          id: 'mt-b-3',
          name: 'Mel',
          portion: '15g',
          calories: 45,
          substitutes: [
            { id: 'mt-b-3-s1', name: 'Geleia sem açúcar', portion: '20g', calories: 30 },
            { id: 'mt-b-3-s2', name: 'Banana amassada', portion: '50g', calories: 45 },
          ],
        },
        {
          id: 'mt-b-4',
          name: 'Morango',
          portion: '100g',
          calories: 30,
          substitutes: [
            { id: 'mt-b-4-s1', name: 'Mirtilo', portion: '80g', calories: 45 },
            { id: 'mt-b-4-s2', name: 'Framboesa', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      id: 'morning-snack',
      label: 'Lanche da Manhã',
      emoji: '🌰',
      foods: [
        {
          id: 'mt-ms-1',
          name: 'Mix de castanhas',
          portion: '30g',
          calories: 185,
          substitutes: [
            { id: 'mt-ms-1-s1', name: 'Amendoim torrado', portion: '30g', calories: 175 },
            { id: 'mt-ms-1-s2', name: 'Amêndoas', portion: '30g', calories: 175 },
          ],
        },
      ],
    },
    {
      id: 'lunch',
      label: 'Almoço',
      emoji: '🍽️',
      foods: [
        {
          id: 'mt-l-1',
          name: 'Frango assado',
          portion: '180g',
          calories: 200,
          substitutes: [
            { id: 'mt-l-1-s1', name: 'Carne suína magra', portion: '180g', calories: 240 },
            { id: 'mt-l-1-s2', name: 'Peixe assado', portion: '200g', calories: 190 },
          ],
        },
        {
          id: 'mt-l-2',
          name: 'Arroz integral',
          portion: '100g cozido',
          calories: 130,
          substitutes: [
            { id: 'mt-l-2-s1', name: 'Arroz branco', portion: '100g cozido', calories: 130 },
            { id: 'mt-l-2-s2', name: 'Quinoa', portion: '80g cozida', calories: 110 },
          ],
        },
        {
          id: 'mt-l-3',
          name: 'Lentilha cozida',
          portion: '80g',
          calories: 95,
          substitutes: [
            { id: 'mt-l-3-s1', name: 'Feijão carioca', portion: '100g', calories: 130 },
            { id: 'mt-l-3-s2', name: 'Ervilha', portion: '80g', calories: 65 },
          ],
        },
        {
          id: 'mt-l-4',
          name: 'Cenoura cozida',
          portion: '100g',
          calories: 45,
          substitutes: [
            { id: 'mt-l-4-s1', name: 'Beterraba cozida', portion: '100g', calories: 45 },
            { id: 'mt-l-4-s2', name: 'Abóbora cozida', portion: '100g', calories: 30 },
          ],
        },
      ],
    },
    {
      id: 'afternoon-snack',
      label: 'Lanche da Tarde',
      emoji: '🍞',
      foods: [
        {
          id: 'mt-as-1',
          name: 'Pão de forma integral',
          portion: '2 fatias',
          calories: 140,
          substitutes: [
            { id: 'mt-as-1-s1', name: 'Torrada integral', portion: '4 unidades', calories: 120 },
            { id: 'mt-as-1-s2', name: 'Biscoito de arroz', portion: '4 unidades', calories: 100 },
          ],
        },
        {
          id: 'mt-as-2',
          name: 'Pasta de amendoim',
          portion: '20g',
          calories: 120,
          substitutes: [
            { id: 'mt-as-2-s1', name: 'Requeijão light', portion: '30g', calories: 55 },
            { id: 'mt-as-2-s2', name: 'Pasta de amêndoa', portion: '20g', calories: 125 },
          ],
        },
      ],
    },
    {
      id: 'dinner',
      label: 'Jantar',
      emoji: '🌙',
      foods: [
        {
          id: 'mt-d-1',
          name: 'Omelete',
          portion: '2 ovos',
          calories: 140,
          substitutes: [
            { id: 'mt-d-1-s1', name: 'Ovos mexidos', portion: '2 ovos', calories: 140 },
            { id: 'mt-d-1-s2', name: 'Frango desfiado', portion: '120g', calories: 150 },
          ],
        },
        {
          id: 'mt-d-2',
          name: 'Salada caprese',
          portion: '150g',
          calories: 130,
          substitutes: [
            { id: 'mt-d-2-s1', name: 'Salada mista', portion: '150g', calories: 40 },
            { id: 'mt-d-2-s2', name: 'Tomate com queijo cottage', portion: '150g', calories: 90 },
          ],
        },
        {
          id: 'mt-d-3',
          name: 'Torrada integral',
          portion: '2 unidades',
          calories: 70,
          substitutes: [
            { id: 'mt-d-3-s1', name: 'Biscoito de arroz', portion: '3 unidades', calories: 75 },
            { id: 'mt-d-3-s2', name: 'Pão sírio integral', portion: '1 unidade', calories: 80 },
          ],
        },
      ],
    },
  ],
};

const healthOrganizationPlan: DietPlan = {
  objective: 'health-and-organization',
  name: 'Plano Saúde e Organização',
  description: 'Alimentação equilibrada e anti-inflamatória para saúde plena e bem-estar',
  totalCalories: 1700,
  meals: [
    {
      id: 'breakfast',
      label: 'Café da Manhã',
      emoji: '☀️',
      foods: [
        {
          id: 'ho-b-1',
          name: 'Smoothie verde',
          portion: '300ml',
          calories: 120,
          substitutes: [
            { id: 'ho-b-1-s1', name: 'Suco de laranja natural', portion: '250ml', calories: 110 },
            { id: 'ho-b-1-s2', name: 'Vitamina de frutas', portion: '250ml', calories: 130 },
          ],
        },
        {
          id: 'ho-b-2',
          name: 'Granola integral',
          portion: '30g',
          calories: 130,
          substitutes: [
            { id: 'ho-b-2-s1', name: 'Aveia em flocos', portion: '40g', calories: 150 },
            { id: 'ho-b-2-s2', name: 'Müsli natural', portion: '30g', calories: 115 },
          ],
        },
      ],
    },
    {
      id: 'morning-snack',
      label: 'Lanche da Manhã',
      emoji: '🥝',
      foods: [
        {
          id: 'ho-ms-1',
          name: 'Kiwi',
          portion: '2 unidades',
          calories: 90,
          substitutes: [
            { id: 'ho-ms-1-s1', name: 'Maracujá', portion: '2 unidades', calories: 55 },
            { id: 'ho-ms-1-s2', name: 'Frutas vermelhas', portion: '100g', calories: 50 },
          ],
        },
        {
          id: 'ho-ms-2',
          name: 'Iogurte natural',
          portion: '100g',
          calories: 60,
          substitutes: [
            { id: 'ho-ms-2-s1', name: 'Iogurte grego', portion: '100g', calories: 70 },
            { id: 'ho-ms-2-s2', name: 'Kefir natural', portion: '100ml', calories: 60 },
          ],
        },
      ],
    },
    {
      id: 'lunch',
      label: 'Almoço',
      emoji: '🍽️',
      foods: [
        {
          id: 'ho-l-1',
          name: 'Quinoa cozida',
          portion: '80g',
          calories: 110,
          substitutes: [
            { id: 'ho-l-1-s1', name: 'Arroz integral', portion: '100g cozido', calories: 130 },
            { id: 'ho-l-1-s2', name: 'Arroz de couve-flor', portion: '150g', calories: 55 },
          ],
        },
        {
          id: 'ho-l-2',
          name: 'Frango desfiado',
          portion: '150g',
          calories: 165,
          substitutes: [
            { id: 'ho-l-2-s1', name: 'Atum ao natural', portion: '120g', calories: 140 },
            { id: 'ho-l-2-s2', name: 'Grão-de-bico', portion: '150g', calories: 245 },
          ],
        },
        {
          id: 'ho-l-3',
          name: 'Mix de vegetais coloridos',
          portion: '200g',
          calories: 80,
          substitutes: [
            { id: 'ho-l-3-s1', name: 'Ratatouille de legumes', portion: '200g', calories: 90 },
            { id: 'ho-l-3-s2', name: 'Salada de folhas variadas', portion: '150g', calories: 30 },
          ],
        },
      ],
    },
    {
      id: 'afternoon-snack',
      label: 'Lanche da Tarde',
      emoji: '🍵',
      foods: [
        {
          id: 'ho-as-1',
          name: 'Barra de cereal integral',
          portion: '1 unidade',
          calories: 90,
          substitutes: [
            { id: 'ho-as-1-s1', name: 'Biscoito de arroz integral', portion: '3 unidades', calories: 75 },
            { id: 'ho-as-1-s2', name: 'Castanhas variadas', portion: '20g', calories: 125 },
          ],
        },
        {
          id: 'ho-as-2',
          name: 'Chá verde',
          portion: '300ml',
          calories: 2,
          substitutes: [
            { id: 'ho-as-2-s1', name: 'Chá de camomila', portion: '300ml', calories: 2 },
            { id: 'ho-as-2-s2', name: 'Água com limão', portion: '300ml', calories: 5 },
          ],
        },
      ],
    },
    {
      id: 'dinner',
      label: 'Jantar',
      emoji: '🌙',
      foods: [
        {
          id: 'ho-d-1',
          name: 'Sopa de legumes',
          portion: '300ml',
          calories: 110,
          substitutes: [
            { id: 'ho-d-1-s1', name: 'Caldo de frango com legumes', portion: '300ml', calories: 130 },
            { id: 'ho-d-1-s2', name: 'Sopa de lentilha', portion: '300ml', calories: 150 },
          ],
        },
        {
          id: 'ho-d-2',
          name: 'Pão integral',
          portion: '2 fatias',
          calories: 140,
          substitutes: [
            { id: 'ho-d-2-s1', name: 'Torrada integral', portion: '3 unidades', calories: 105 },
            { id: 'ho-d-2-s2', name: 'Pão de centeio', portion: '2 fatias', calories: 150 },
          ],
        },
      ],
    },
  ],
};

const allDietPlans: DietPlan[] = [
  weightLossPlan,
  muscleGainPlan,
  maintenancePlan,
  healthOrganizationPlan,
];

export function getDietPlanByObjective(objective: ObjectiveOption): DietPlan {
  return allDietPlans.find((p) => p.objective === objective) ?? weightLossPlan;
}
