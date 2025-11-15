'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { FormSection } from '@/components/form-section';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  notificationsEnabled: z.boolean(),
  defaultStoryPrivacy: z.enum(['public', 'private']),
  fontSize: z.coerce.number().min(12).max(24),
  defaultCharacterArchetype: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const settingsRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'settings', user.uid);
  }, [user, firestore]);

  const { data: settingsData, isLoading: isSettingsLoading } = useDoc<SettingsFormValues>(settingsRef);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    if (settingsData) {
      form.reset(settingsData);
    }
  }, [settingsData, form]);

  async function onSubmit(data: SettingsFormValues) {
    if (!settingsRef) return;
    setIsSaving(true);
    
    updateDocumentNonBlocking(settingsRef, data);
    
    toast({
      title: 'Instellingen opgeslagen',
      description: 'Je voorkeuren zijn bijgewerkt.',
    });
    setIsSaving(false);
  }

  if (isUserLoading || isSettingsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold font-headline">Instellingen</h1>
        <p className="text-muted-foreground">Beheer je account- en app-voorkeuren.</p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormSection title="Weergave">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thema</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een thema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Licht</SelectItem>
                      <SelectItem value="dark">Donker</SelectItem>
                      <SelectItem value="system">Systeem</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Pas het uiterlijk van de applicatie aan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fontSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lettergrootte</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Stel je voorkeurslettergrootte in (12-24).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection title="Notificaties">
            <FormField
              control={form.control}
              name="notificationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Notificaties</FormLabel>
                    <FormDescription>
                      Ontvang meldingen over updates en nieuwe functies.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormSection>
          
          <FormSection title="Standaardwaarden">
             <FormField
              control={form.control}
              name="defaultStoryPrivacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Standaard Privacy Verhalen</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer privacy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Privé</SelectItem>
                      <SelectItem value="public">Publiek</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Stel de standaard privacy in voor nieuwe verhalen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="defaultCharacterArchetype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Standaard Personage Archetype</FormLabel>
                  <FormControl>
                    <Input placeholder="Bijv. Held, Anti-held" {...field} />
                  </FormControl>
                   <FormDescription>
                    Stel een standaard archetype in voor nieuwe personages.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? 'Opslaan...' : 'Wijzigingen Opslaan'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
