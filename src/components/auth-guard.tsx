'use client';

import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { signInAnonymously } from 'firebase/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      // Automatically sign in anonymously for development purposes
      // This avoids having to log in manually every time.
      signInAnonymously(auth).catch((error) => {
        console.error("Anonymous sign-in failed:", error);
        // If anon sign-in fails, redirect to login.
        // This might happen if anonymous auth is disabled in Firebase.
        router.push('/login');
      });
    }
  }, [isUserLoading, user, auth, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
