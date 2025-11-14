'use client';

import { useState, useEffect, useMemo, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { mockCharacters } from '@/lib/mock-data';
import type { Character } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function CharacterDataView({ character }: { character: Character }) {
  const displayData = useMemo(() => {
    // Exclude some internal or less relevant fields from the display
    const { id, imageUrl, imageHint, iconBgClass, iconTextClass, description, ...rest } = character;
    return rest;
  }, [character]);

  return (
    <div className="space-y-4 text-sm">
      {Object.entries(displayData).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        const formattedValue = Array.isArray(value) ? value.join(', ') : String(value);

        return (
          <div key={key} className="grid grid-cols-3 gap-2 border-b pb-2">
            <dt className="font-medium text-muted-foreground">{formattedKey}</dt>
            <dd className="col-span-2 text-foreground">{formattedValue}</dd>
          </div>
        );
      })}
    </div>
  );
}

function CharacterView({ characterId }: { characterId: string }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundCharacter = mockCharacters.find((c) => c.id === characterId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    }
    setIsLoading(false);
  }, [characterId]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Personage niet gevonden</h2>
        <Link href="/characters/overview" className="text-primary hover:underline mt-4 inline-block">
          Terug naar overzicht
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <nav className="mb-6">
        <Link
          href="/characters/overview"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Personages
        </Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          {character.name}
        </h1>
        <p className="text-muted-foreground">{character.job}</p>
      </header>
      
      <Tabs defaultValue="description">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Beschrijving</TabsTrigger>
          <TabsTrigger value="data">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Beschrijving</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                  {character.description}
                </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Personage Details</CardTitle>
            </CardHeader>
            <CardContent>
              <CharacterDataView character={character} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export default function CharacterViewPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  return <CharacterView characterId={resolvedParams.id} />;
}
