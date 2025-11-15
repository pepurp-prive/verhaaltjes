'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, Pen, Users, BookOpenText, Home } from 'lucide-react';
import { UserActions } from '@/components/user-actions';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { AuthStatus } from '@/components/auth-status';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
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
              <DropdownMenuContent align="start" className="bg-transparent border-none shadow-none">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem asChild className="focus:bg-transparent">
                      <Link href="/">
                        <Home className="h-5 w-5 text-green-600" />
                      </Link>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Startpagina</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem asChild className="focus:bg-transparent">
                      <Link href="/story/create">
                        <Pen className="h-5 w-5 text-green-600" />
                      </Link>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Nieuw Verhaal</p></TooltipContent>
                </Tooltip>
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem asChild className="focus:bg-transparent">
                      <Link href="/characters/overview">
                        <Users className="h-5 w-5 text-green-600" />
                      </Link>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Mijn Personages</p></TooltipContent>
                </Tooltip>
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem asChild className="focus:bg-transparent">
                       <Link href="/story/overview">
                        <BookOpenText className="h-5 w-5 text-green-600"/>
                      </Link>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Mijn Verhalen</p></TooltipContent>
                </Tooltip>
                <DropdownMenuSeparator className="bg-green-600/50 h-[1px] w-1/4" />
                <UserActions />
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <main className="max-w-4xl mx-auto pl-12">
            <div className="rounded-2xl shadow-lg bg-card">
              {children}
            </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
