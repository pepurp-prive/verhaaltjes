'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Redirect if user is already logged in (and not anonymous)
    if (!isUserLoading && user && !user.isAnonymous) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || (user && !user.isAnonymous)) {
    return <div className="flex h-screen items-center justify-center">Laden...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welkom terug!</CardTitle>
          <CardDescription>Log in op je World Weaver account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm showRememberMe={true} showGuestLogin={true} />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Nog geen account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Maak een account aan
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
