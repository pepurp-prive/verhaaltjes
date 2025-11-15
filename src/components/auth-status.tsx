'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function AuthStatus() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>;
  }

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
      {user && !user.isAnonymous ? (
         <Badge variant="secondary" className="text-sm border border-border">
          {user.email}
        </Badge>
      ) : (
        <Button asChild>
          <Link href="/login">Inloggen / Registreren</Link>
        </Button>
      )}
    </div>
  );
}
