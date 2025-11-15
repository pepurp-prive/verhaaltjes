'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const signupSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in.'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters lang zijn.'),
  confirmPassword: z.string(),
  isEighteenPlus: z.boolean().refine(val => val === true, {
    message: 'Je moet bevestigen dat je 18 jaar of ouder bent.',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen.',
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isEighteenPlus: false,
    },
  });

  useEffect(() => {
    if (!isUserLoading && user && !user.isAnonymous) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SignupFormValues) {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      
      const userRef = doc(firestore, 'users', newUser.uid);
      setDocumentNonBlocking(userRef, {
        id: newUser.uid,
        email: newUser.email,
        settingsId: newUser.uid // Using UID as settingsId for 1:1 relationship
      }, { merge: true });

      const settingsRef = doc(firestore, 'users', newUser.uid, 'settings', newUser.uid);
      setDocumentNonBlocking(settingsRef, {
        id: newUser.uid,
        theme: 'light',
        notificationsEnabled: true,
        defaultStoryPrivacy: 'private',
        fontSize: 16,
        defaultCharacterArchetype: 'Hero'
      }, { merge: true });

      toast({
        title: 'Account aangemaakt!',
        description: 'Je wordt nu ingelogd en doorgestuurd.',
      });
      router.push('/');
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError('Dit e-mailadres is al in gebruik.');
      } else {
        setError('Er is iets misgegaan. Probeer het opnieuw.');
      }
    }
  }
  
  if (isUserLoading || (user && !user.isAnonymous)) {
    return <div className="flex h-screen items-center justify-center">Laden...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Maak een Account</CardTitle>
          <CardDescription>Begin met het bouwen van jouw wereld</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mailadres</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jouw@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wachtwoord</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bevestig Wachtwoord</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="isEighteenPlus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ik ben 18 jaar of ouder
                      </FormLabel>
                      <FormDescription>
                        Je moet 18+ zijn om een account aan te maken.
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {error && <p className="text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Bezig...' : 'Account Aanmaken'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Heb je al een account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log hier in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
