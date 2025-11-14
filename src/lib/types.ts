export type Character = {
  id: string;
  name: string;
  age: string;
  job: string;
  gender: 'Man' | 'Vrouw';
  imageUrl: string;
  imageHint: string;
  iconBgClass: string;
  iconTextClass: string;
  description?: string; // Add this line
  [key: string]: any; // Allow other properties
};

export type Story = {
  id: string;
  title: string;
  prompt: string;
  excerpt: string;
};
