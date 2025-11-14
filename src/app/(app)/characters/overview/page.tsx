import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { mockCharacters } from '@/lib/mock-data';
import type { Character } from '@/lib/types';
import { ArrowLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';

function CharacterCard({ character }: { character: Character }) {
  return (
    <Card className="flex flex-col rounded-2xl shadow-lg border-gray-200/50 dark:border-gray-800/50 overflow-hidden h-full">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          <span className={cn('p-3 rounded-xl inline-block', character.iconBgClass)}>
            <User className={cn('h-6 w-6', character.iconTextClass)} />
          </span>
          <h3 className="text-xl font-semibold text-foreground font-headline">
            {character.name}
          </h3>
        </div>
        <div className="space-y-1 text-sm text-foreground/80">
          <p>
            <span className="font-medium">Leeftijd:</span> {character.age}
          </p>
          <p>
            <span className="font-medium">Beroep:</span> {character.job}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3 flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/characters/view/${character.id}`}>Bekijk</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="flex-1">
            <Link href={`/characters/edit/${character.id}`}>Bewerk</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}

export default function CharacterOverviewPage() {
  return (
    <div className="p-6 md:p-8">
      <nav className="mb-6">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Home
        </Link>
      </nav>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headline">Mijn Personages</h2>
        <Button asChild>
          <Link href="/characters/create">Nieuw Personage</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
