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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, signInAnonymously } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in.'),
  password: z.string().min(1, 'Wachtwoord is verplicht.'),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ showSignupLink = false, isCompact = false }: { showSignupLink?: boolean, isCompact?: boolean }) {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });
  
  useEffect(() => {
    // Redirect if user is logged in (and not anonymous)
    if (!isUserLoading && user && !user.isAnonymous && !showSignupLink) {
      router.push('/');
    }
  }, [user, isUserLoading, router, showSignupLink]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: LoginFormValues) {
    setError(null);
    if (!auth) return;
    try {
      await setPersistence(auth, values.rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Succesvol ingelogd!',
        description: 'Je wordt doorgestuurd.',
      });
      router.push('/');
    } catch (e: any) {
      setError('Inloggegevens onjuist. Probeer het opnieuw.');
    }
  }
  
  async function handleAnonymousLogin() {
     if (!auth) return;
    try {
      await signInAnonymously(auth);
      toast({
        title: 'Ingelogd als gast',
        description: 'Je werk wordt niet permanent opgeslagen.',
      });
      router.push('/');
    } catch (e) {
      setError('Kon niet anoniem inloggen. Probeer het later opnieuw.');
    }
  }

  // Hide form if user is already logged in, unless they are anonymous.
  if (!isUserLoading && user && !user.isAnonymous) {
    return (
       <div className="text-center text-sm">
        <p>Je bent al ingelogd als {user.email}.</p>
         <Button variant="link" onClick={() => auth?.signOut()}>Uitloggen</Button>
      </div>
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isCompact ? "sr-only" : ""}>E-mailadres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="E-mailadres" {...field} />
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
                <FormLabel className={isCompact ? "sr-only" : ""}>Wachtwoord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Wachtwoord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="rememberMe" className="text-sm font-normal text-muted-foreground">
                  Onthoud mij
                </Label>
              </FormItem>
            )}
          />

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Bezig...' : 'Inloggen'}
          </Button>
        </form>
      </Form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
            Of
            </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleAnonymousLogin}>
        Ga verder als gast
      </Button>

      {showSignupLink && (
         <p className="mt-6 text-center text-sm text-muted-foreground">
            Nog geen account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Maak een account aan
            </Link>
          </p>
      )}
    </>
  );
}
