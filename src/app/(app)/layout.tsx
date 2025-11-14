import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Menu, Pen, Users, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-primary border-primary hover:bg-primary/10 hover:text-primary"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-transparent border-none shadow-none"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/story/create"
                className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
              >
                <Pen className="h-4 w-4" />
                <span>Verhaal Maken</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/characters/overview"
                className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
              >
                <Users className="h-4 w-4" />
                <span>Mijn Personages</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/story/overview"
                className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
              >
                <Book className="h-4 w-4" />
                <span>Mijn Verhalen</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Card className="rounded-2xl shadow-lg">
        <main>{children}</main>
      </Card>
    </div>
  );
}
