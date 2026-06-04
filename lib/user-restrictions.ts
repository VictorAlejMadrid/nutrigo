import { RestrictionOption } from '../hooks/use-profile';

export const allRestrictions: RestrictionOption[] = [
  'gluten',
  'lactose',
  'vegetarian',
  'vegan',
  'none',
];

export function translateUserRestriction(restriction: RestrictionOption) {
  switch (restriction) {
    case 'gluten':
      return 'Glúten';
    case 'lactose':
      return 'Lactose';
    case 'vegetarian':
      return 'Vegetariano';
    case 'vegan':
      return 'Vegano';
    case 'none':
      return 'Nenhuma';
    default:
      return 'Nenhuma';
  }
}
