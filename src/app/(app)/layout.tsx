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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-4 sm:p-6 lg:p-8">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
        <TooltipProvider delayDuration={1000}>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/story/create"
                      className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
                    >
                      <Pen className="h-6 w-6" />
                      <span className="sr-only">Verhaal Maken</span>
                    </Link>
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Verhaal Maken</p>
                </TooltipContent>
              </Tooltip>
               <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuItem asChild>
                    <Link
                        href="/characters/overview"
                        className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
                    >
                        <Users className="h-6 w-6" />
                        <span className="sr-only">Mijn Personages</span>
                    </Link>
                    </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Mijn Personages</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuItem asChild>
                    <Link
                        href="/story/overview"
                        className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
                    >
                        <Book className="h-6 w-6" />
                        <span className="sr-only">Mijn Verhalen</span>
                    </Link>
                    </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Mijn Verhalen</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>

      <div className="max-w-4xl pl-20">
          <Card className="rounded-2xl shadow-lg">
            <main>{children}</main>
          </Card>
      </div>
    </div>
  );
}
