// This file is intended to be imported in a NextJS server action.
'use server';

/**
 * @fileOverview Generates a story from a user-provided prompt.
 *
 * - generateStoryFromPrompt - A function that generates a story based on a prompt.
 * - GenerateStoryFromPromptInput - The input type for the generateStoryFromPrompt function.
 * - GenerateStoryFromPromptOutput - The return type for the generateStoryFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryFromPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate a story from.'),
});
export type GenerateStoryFromPromptInput = z.infer<typeof GenerateStoryFromPromptInputSchema>;

const GenerateStoryFromPromptOutputSchema = z.object({
  story: z.string().describe('The generated story.'),
});
export type GenerateStoryFromPromptOutput = z.infer<typeof GenerateStoryFromPromptOutputSchema>;

export async function generateStoryFromPrompt(input: GenerateStoryFromPromptInput): Promise<GenerateStoryFromPromptOutput> {
  return generateStoryFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryFromPromptPrompt',
  input: {schema: GenerateStoryFromPromptInputSchema},
  output: {schema: GenerateStoryFromPromptOutputSchema},
  prompt: `You are a creative writer, specialized in writing short stories in the Nederlands. Write a story based on the following prompt:\n\n{{prompt}}`,
});

const generateStoryFromPromptFlow = ai.defineFlow(
  {
    name: 'generateStoryFromPromptFlow',
    inputSchema: GenerateStoryFromPromptInputSchema,
    outputSchema: GenerateStoryFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
