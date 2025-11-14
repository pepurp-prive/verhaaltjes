import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockCharacters } from '@/lib/mock-data';
import type { Character } from '@/lib/types';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

function CharacterCard({ character }: { character: Character }) {
  return (
    <Card className="p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 h-full">
      <CardContent className="p-0">
        <div className="flex items-center space-x-4 mb-3">
          <span className={cn('p-2 rounded-lg inline-block', character.iconBgClass)}>
            <User className={cn('h-6 w-6', character.iconTextClass)} />
          </span>
          <h3 className="text-xl font-semibold text-foreground font-headline">
            {character.name}
          </h3>
        </div>
        <p className="text-foreground/80 mb-1">
          <span className="font-medium">Leeftijd:</span> {character.age}
        </p>
        <p className="text-foreground/80 mb-4">
          <span className="font-medium">Beroep:</span> {character.job}
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="#">Bekijk</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/characters/create">Bewerk</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CharacterOverviewPage() {
  return (
    <Card className="rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headline">Mijn Personages</h2>
        <Button asChild>
          <Link href="/characters/create">Nieuw Personage</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </Card>
  );
}
