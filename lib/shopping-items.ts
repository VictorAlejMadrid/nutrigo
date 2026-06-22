export type ShoppingCategory =
  | 'Hortifruti'
  | 'Proteínas'
  | 'Laticínios'
  | 'Carboidratos'
  | 'Oleaginosas'
  | 'Temperos & Outros';

export const CATEGORY_ORDER: ShoppingCategory[] = [
  'Hortifruti',
  'Proteínas',
  'Laticínios',
  'Carboidratos',
  'Oleaginosas',
  'Temperos & Outros',
];

export const categoryEmoji: Record<ShoppingCategory, string> = {
  'Hortifruti': '🥦',
  'Proteínas': '🥩',
  'Laticínios': '🥛',
  'Carboidratos': '🌾',
  'Oleaginosas': '🌰',
  'Temperos & Outros': '🫙',
};

const categoryRules: { keywords: string[]; category: ShoppingCategory }[] = [
  {
    keywords: [
      'frango', 'carne', 'salmão', 'atum', 'sardinha', 'peru', 'tilápia', 'peixe',
      'ovo', 'ovos', 'omelete', 'claras', 'whey', 'proteína vegetal', 'grão-de-bico',
      'lentilha', 'feijão', 'ervilha', 'caldo de frango',
    ],
    category: 'Proteínas',
  },
  {
    keywords: ['iogurte', 'leite', 'queijo', 'cottage', 'kefir', 'requeijão', 'bebida vegetal'],
    category: 'Laticínios',
  },
  {
    keywords: [
      'maçã', 'banana', 'brócolis', 'cenoura', 'espinafre', 'couve', 'rúcula',
      'salada', 'tomate', 'pepino', 'aipo', 'acelga', 'abóbora', 'beterraba',
      'laranja', 'pêssego', 'pera', 'kiwi', 'morango', 'mirtilo', 'framboesa',
      'maracujá', 'manga', 'frutas vermelhas', 'batata doce', 'aipim', 'inhame',
      'abacate', 'abobrinha', 'aspargos', 'legumes', 'vegetais', 'ratatouille',
      'smoothie verde', 'sopa', 'mix de vegetais',
    ],
    category: 'Hortifruti',
  },
  {
    keywords: [
      'arroz', 'macarrão', 'pão', 'aveia', 'granola', 'müsli', 'torrada',
      'biscoito', 'tapioca', 'quinoa', 'barra de cereal', 'wrap',
    ],
    category: 'Carboidratos',
  },
  {
    keywords: [
      'amêndoa', 'castanha', 'nozes', 'amendoim', 'pasta de amendoim',
      'pasta de amêndoa', 'tâmara',
    ],
    category: 'Oleaginosas',
  },
];

const priceRules: { keywords: string[]; price: number }[] = [
  { keywords: ['salmão', 'atum fresco'], price: 9.50 },
  { keywords: ['atum em lata', 'atum ao natural'], price: 5.50 },
  { keywords: ['sardinha'], price: 4.20 },
  { keywords: ['frango grelhado', 'frango assado', 'frango desfiado', 'frango'], price: 3.20 },
  { keywords: ['carne bovina', 'carne suína'], price: 6.50 },
  { keywords: ['tilápia'], price: 4.80 },
  { keywords: ['peru grelhado', 'peru'], price: 3.50 },
  { keywords: ['peixe assado', 'peixe'], price: 5.00 },
  { keywords: ['ovos mexidos', 'ovos cozidos', 'omelete', 'ovo', 'ovos', 'claras'], price: 2.10 },
  { keywords: ['whey protein'], price: 4.50 },
  { keywords: ['proteína vegetal'], price: 4.00 },
  { keywords: ['iogurte grego'], price: 4.80 },
  { keywords: ['iogurte natural', 'iogurte'], price: 3.20 },
  { keywords: ['kefir'], price: 5.20 },
  { keywords: ['cottage', 'queijo cottage'], price: 4.50 },
  { keywords: ['leite desnatado', 'leite'], price: 2.80 },
  { keywords: ['bebida vegetal'], price: 4.50 },
  { keywords: ['requeijão'], price: 3.50 },
  { keywords: ['banana'], price: 0.85 },
  { keywords: ['maçã'], price: 1.50 },
  { keywords: ['pera'], price: 2.20 },
  { keywords: ['laranja'], price: 1.20 },
  { keywords: ['pêssego'], price: 2.50 },
  { keywords: ['kiwi'], price: 3.50 },
  { keywords: ['morango'], price: 3.80 },
  { keywords: ['mirtilo', 'framboesa', 'frutas vermelhas'], price: 5.20 },
  { keywords: ['maracujá'], price: 1.80 },
  { keywords: ['manga'], price: 2.80 },
  { keywords: ['tâmara'], price: 4.50 },
  { keywords: ['abacate'], price: 3.50 },
  { keywords: ['brócolis'], price: 2.80 },
  { keywords: ['couve-flor'], price: 2.50 },
  { keywords: ['espinafre', 'couve refogada', 'couve'], price: 2.20 },
  { keywords: ['acelga'], price: 1.80 },
  { keywords: ['rúcula'], price: 2.50 },
  { keywords: ['salada caprese', 'salada verde', 'salada mista', 'salada'], price: 2.50 },
  { keywords: ['cenoura baby', 'cenoura cozida', 'cenoura'], price: 1.80 },
  { keywords: ['batata doce'], price: 2.20 },
  { keywords: ['aipim', 'mandioca'], price: 1.80 },
  { keywords: ['inhame'], price: 2.50 },
  { keywords: ['abóbora'], price: 1.50 },
  { keywords: ['beterraba'], price: 1.80 },
  { keywords: ['pepino'], price: 1.20 },
  { keywords: ['aipo'], price: 2.20 },
  { keywords: ['aspargos'], price: 5.50 },
  { keywords: ['abobrinha'], price: 2.80 },
  { keywords: ['mix de vegetais', 'legumes salteados', 'ratatouille'], price: 3.80 },
  { keywords: ['ervilha'], price: 2.50 },
  { keywords: ['smoothie verde'], price: 3.50 },
  { keywords: ['sopa de lentilha'], price: 5.80 },
  { keywords: ['sopa de legumes', 'caldo de frango', 'sopa'], price: 5.50 },
  { keywords: ['arroz de couve-flor'], price: 3.20 },
  { keywords: ['arroz integral', 'arroz branco', 'arroz'], price: 1.20 },
  { keywords: ['quinoa'], price: 3.50 },
  { keywords: ['macarrão integral', 'macarrão'], price: 2.80 },
  { keywords: ['lentilha'], price: 2.20 },
  { keywords: ['feijão carioca', 'feijão'], price: 1.80 },
  { keywords: ['grão-de-bico'], price: 2.50 },
  { keywords: ['pão de centeio', 'pão integral', 'pão sírio', 'pão de forma', 'pão'], price: 2.50 },
  { keywords: ['torrada integral', 'torrada'], price: 1.50 },
  { keywords: ['biscoito de arroz', 'biscoito'], price: 2.20 },
  { keywords: ['aveia em flocos', 'aveia'], price: 1.80 },
  { keywords: ['granola integral', 'granola sem açúcar', 'granola'], price: 5.80 },
  { keywords: ['müsli natural', 'müsli'], price: 5.20 },
  { keywords: ['barra de cereal'], price: 3.20 },
  { keywords: ['tapioca'], price: 1.80 },
  { keywords: ['wrap de atum', 'sanduíche de frango', 'pão com ovo', 'wrap'], price: 8.50 },
  { keywords: ['amêndoas', 'amêndoa'], price: 3.80 },
  { keywords: ['castanha de caju'], price: 4.20 },
  { keywords: ['nozes'], price: 4.50 },
  { keywords: ['amendoim torrado', 'amendoim'], price: 2.80 },
  { keywords: ['pasta de amendoim'], price: 3.50 },
  { keywords: ['pasta de amêndoa'], price: 4.50 },
  { keywords: ['mix de castanhas', 'castanhas variadas', 'castanhas'], price: 5.20 },
  { keywords: ['azeite extra virgem', 'azeite', 'óleo de coco', 'manteiga clarificada'], price: 2.50 },
  { keywords: ['mel', 'geleia'], price: 2.80 },
  { keywords: ['homus', 'guacamole', 'pasta de grão-de-bico'], price: 4.20 },
  { keywords: ['chá verde', 'chá de camomila', 'água com limão'], price: 0.50 },
];

export function getCategoryForFood(name: string): ShoppingCategory {
  const lower = name.toLowerCase();
  for (const rule of categoryRules) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.category;
  }
  return 'Temperos & Outros';
}

export function getPriceForFood(name: string): number {
  const lower = name.toLowerCase();
  for (const rule of priceRules) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.price;
  }
  return 2.50;
}
