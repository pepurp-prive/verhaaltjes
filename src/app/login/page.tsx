'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welkom terug!</CardTitle>
          <CardDescription>Log in op je World Weaver account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm showSignupLink={true} />
        </CardContent>
      </Card>
    </div>
  );
}
