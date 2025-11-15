import AppLayout from "./(app)/layout";
import { NavCard } from '@/components/nav-card';
import { Book, Users, Pen } from 'lucide-react';
import { AuthStatus } from '@/components/auth-status';

export default function Home() {
  return (
    <AppLayout>
       <AuthStatus />
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
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/></svg>}
            iconBgClass="bg-yellow-100 dark:bg-yellow-900/50"
            iconTextClass="text-yellow-700 dark:text-yellow-300"
            title="Mijn Verhalen"
            description="Lees, bewerk en vervolg je opgeslagen verhalen."
          />
           <NavCard
            href="/settings"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>}
            iconBgClass="bg-purple-100 dark:bg-purple-900/50"
            iconTextClass="text-purple-700 dark:text-purple-300"
            title="Instellingen"
            description="Beheer je account- en app-voorkeuren."
          />
        </div>
      </main>
    </AppLayout>
  )
}
