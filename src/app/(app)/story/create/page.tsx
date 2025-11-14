'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { generateStoryFromPrompt } from '@/ai/flows/generate-story-from-prompt';

const storySchema = z.object({
  prompt: z.string().min(10, 'Voer een idee in van minstens 10 karakters.'),
});

type StoryFormValues = z.infer<typeof storySchema>;

export default function StoryCreatePage() {
  const [storyResult, setStoryResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: StoryFormValues) {
    setError(null);
    setStoryResult(null);
    try {
      const result = await generateStoryFromPrompt({ prompt: values.prompt });
      setStoryResult(result.story);
    } catch (e: any) {
      setError(e.message || 'Er is een onbekende fout opgetreden.');
    }
  }

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <nav className="mb-4">
            <Link
              href="/story/overview"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar Verhalen
            </Link>
          </nav>
        <CardTitle className="font-headline text-2xl">
          Nieuw Verhaal Maken
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jouw idee (prompt) *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Bijv: 'Een detective die een mysterie oplost op Mars...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-left">
              <Button type="submit" disabled={isSubmitting} size="lg" className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? 'Bezig...' : 'Genereer Verhaal'}
              </Button>
            </div>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Fout</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {storyResult && (
          <Card className="mt-6 bg-secondary/50">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Jouw Verhaal:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-foreground/90">
                {storyResult}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
