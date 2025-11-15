import AppLayout from "./(app)/layout";
import { NavCard } from '@/components/nav-card';
import { Book, Users, Pen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";


export default function Home() {
  return (
    <AppLayout>
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
           <Card className="h-full p-6 rounded-2xl shadow-lg border-transparent">
            <CardHeader className="p-0 mb-4 text-left">
              <CardTitle className="text-xl font-semibold text-foreground font-headline">
                Inloggen / Account
              </CardTitle>
              <CardDescription>
                Log in om je werk op te slaan.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <LoginForm showRememberMe={false} showGuestLogin={false} size="sm" />
            </CardContent>
          </Card>
        </div>
      </main>
    </AppLayout>
  )
}
