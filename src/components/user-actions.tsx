'use client';

import { useAuth, useUser } from '@/firebase';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function UserActions() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (isUserLoading) {
    return null; // Or a loading spinner
  }

  if (user && !user.isAnonymous) {
    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem asChild>
              <Link
                href="/settings"
                className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline"
              >
                <Settings className="h-6 w-6" />
                <span className="sr-only">Instellingen</span>
              </Link>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Instellingen</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-primary !bg-transparent hover:!bg-transparent focus:!bg-transparent hover:underline cursor-pointer"
            >
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Uitloggen</span>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Uitloggen</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  }

  return null; // Don't show login/signup in this menu
}
