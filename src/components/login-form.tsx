'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in.'),
  password: z.string().min(1, 'Wachtwoord is verplicht.'),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
    showRememberMe?: boolean;
    showGuestLogin?: boolean;
}

export function LoginForm({ showRememberMe = false, showGuestLogin = false }: LoginFormProps) {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">E-mailadres</FormLabel>
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
                <FormLabel className="sr-only">Wachtwoord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Wachtwoord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showRememberMe && (
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Onthoud mij
                  </label>
                </FormItem>
              )}
            />
          )}

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Bezig...' : 'Inloggen'}
          </Button>
        </form>
      </Form>
      
      {showGuestLogin && (
        <>
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
        </>
      )}
    </>
  );
}
