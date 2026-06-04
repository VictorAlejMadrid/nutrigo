import { ObjectiveOption } from '../hooks/use-profile';

export const allObjectives: ObjectiveOption[] = [
  'weight-loss',
  'muscle-gain',
  'maintenance',
  'health-and-organization',
];

export function translateUserObjective(objective: ObjectiveOption) {
  switch (objective) {
    case 'weight-loss':
      return 'Emagrecimento';
    case 'muscle-gain':
      return 'Ganho de Massa';
    case 'maintenance':
      return 'Manutenção';
    case 'health-and-organization':
      return 'Saúde e Organização';
    default:
      return 'Emagrecimento';
  }
}
