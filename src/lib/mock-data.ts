import type { Character, Story } from './types';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'David de Vries',
    age: '32',
    job: 'Architect',
    gender: 'Man',
    imageUrl: 'https://picsum.photos/seed/char-male-1/100/100',
    imageHint: 'male portrait',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/50',
    iconTextClass: 'text-blue-700 dark:text-blue-300',
  },
  {
    id: '2',
    name: 'Eva Janssen',
    age: '28',
    job: 'Journalist',
    gender: 'Vrouw',
    imageUrl: 'https://picsum.photos/seed/char-female-1/100/100',
    imageHint: 'female portrait',
    iconBgClass: 'bg-pink-100 dark:bg-pink-900/50',
    iconTextClass: 'text-pink-700 dark:text-pink-300',
  },
];

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Het Marsmysterie',
    prompt: 'Een detective die een mysterie oplost op Mars...',
    excerpt:
      'De rode stoflaag van de Valles Marineris plakte aan zijn laarzen terwijl detective Kaelen de verlaten habitat naderde. Binnen lag de data-chip... maar de deur was van binnenuit vergrendeld. Op Mars, waar niemand buiten kan overleven, was dat onmogelijk. Tenzij...',
  },
];
