'use client';

import { useAuth, useUser } from '@/firebase';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function UserActions() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
    router.push('/login');
  };

  if (isUserLoading) {
    return null; // Or a loading spinner
  }

  if (!user) {
      return null;
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuItem asChild className="focus:bg-transparent">
            <Link href="/settings">
              <Settings className="h-5 w-5 text-green-600" />
            </Link>
          </DropdownMenuItem>
        </TooltipTrigger>
        <TooltipContent side="right"><p>Instellingen</p></TooltipContent>
      </Tooltip>
      
      {user && !user.isAnonymous ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem
              onClick={handleLogout}
              className="focus:bg-transparent cursor-pointer"
            >
              <LogOut className="h-5 w-5 text-green-600" />
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right"><p>Uitloggen</p></TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem asChild className="focus:bg-transparent">
              <Link href="/login">
                <LogOut className="h-5 w-5 text-green-600 -scale-x-100" />
              </Link>
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="right"><p>Inloggen</p></TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
