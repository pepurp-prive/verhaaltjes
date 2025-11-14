import type { Character, Story } from './types';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Jan van der Meer',
    age: '32',
    job: 'Softwareontwikkelaar',
    gender: 'Man',
    imageUrl: '', // You can add a placeholder image URL if you want
    imageHint: 'male portrait',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/50',
    iconTextClass: 'text-blue-700 dark:text-blue-300'
  },
  {
    id: '2',
    name: 'Eva de Wit',
    age: '28',
    job: 'Grafisch ontwerper',
    gender: 'Vrouw',
    imageUrl: '', // You can add a placeholder image URL if you want
    imageHint: 'female portrait',
    iconBgClass: 'bg-pink-100 dark:bg-pink-900/50',
    iconTextClass: 'text-pink-700 dark:text-pink-300'
  }
];

export const mockStories: Story[] = [];
