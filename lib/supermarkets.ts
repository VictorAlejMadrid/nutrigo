export type Supermarket = {
  id: string;
  name: string;
  emoji: string;
  neighborhood: string;
  distance: string;
  deliveryTime: string;
  rating: number;
  minOrder: number;
};

export const allSupermarkets: Supermarket[] = [
  {
    id: 'mercado-verde',
    name: 'Mercado Verde',
    emoji: '🌿',
    neighborhood: 'Pinheiros',
    distance: '0.8 km',
    deliveryTime: '30–45 min',
    rating: 4.8,
    minOrder: 50,
  },
  {
    id: 'superfresh',
    name: 'SuperFresh',
    emoji: '🛒',
    neighborhood: 'Vila Madalena',
    distance: '1.4 km',
    deliveryTime: '45–60 min',
    rating: 4.6,
    minOrder: 40,
  },
  {
    id: 'bom-preco',
    name: 'Bom Preço',
    emoji: '🏪',
    neighborhood: 'Consolação',
    distance: '2.1 km',
    deliveryTime: '50–70 min',
    rating: 4.3,
    minOrder: 35,
  },
  {
    id: 'atacadao-bem',
    name: 'Atacadão Bem',
    emoji: '📦',
    neighborhood: 'Lapa',
    distance: '3.0 km',
    deliveryTime: '60–90 min',
    rating: 4.1,
    minOrder: 80,
  },
];
