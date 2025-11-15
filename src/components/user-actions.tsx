'use client';

import { useAuth, useUser } from '@/firebase';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';

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

  if (user && !user.isAnonymous) {
    return (
      <>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Instellingen</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Uitloggen</span>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href="/login" className="flex items-center gap-2">
                <LogOut className="h-4 w-4 -scale-x-100" />
                <span>Inloggen</span>
            </Link>
        </DropdownMenuItem>
    </>
  );
}
