import AppLayout from "./(app)/layout";
import { NavCard } from '@/components/nav-card';
import { Book, Users, Pen, Circle } from 'lucide-react';

function HomeContent() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-headline">
          World Weaver
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Jouw toolkit voor het bouwen van werelden.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NavCard
          href="/story/create"
          icon={<Pen />}
          iconBgClass="bg-green-100 dark:bg-green-900/50"
          iconTextClass="text-green-700 dark:text-green-300"
          title="Verhaal Maken"
          description="Genereer een nieuw verhaal op basis van jouw idee."
        />

        <NavCard
          href="/characters/overview"
          icon={<Users />}
          iconBgClass="bg-blue-100 dark:bg-blue-900/50"
          iconTextClass="text-blue-700 dark:text-blue-300"
          title="Mijn Personages"
          description="Maak, bewerk en beheer je personages."
        />

        <NavCard
          href="/story/overview"
          icon={<Book />}
          iconBgClass="bg-yellow-100 dark:bg-yellow-900/50"
          iconTextClass="text-yellow-700 dark:text-yellow-300"
          title="Mijn Verhalen"
          description="Lees, bewerk en vervolg je opgeslagen verhalen."
        />

        <NavCard
          href="#"
          icon={<Circle />}
          iconBgClass="bg-gray-100 dark:bg-gray-800"
          iconTextClass="text-gray-500"
          title="..."
          description="..."
          disabled
        />
      </div>
    </main>
  );
}


export default function Home() {
  return (
    <AppLayout>
      <HomeContent />
    </AppLayout>
  )
