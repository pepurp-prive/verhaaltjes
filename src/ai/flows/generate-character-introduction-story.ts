'use server';

/**
 * @fileOverview A Genkit flow for generating a short introductory story for a character.
 *
 * This flow takes character details as input and uses an AI model to write a brief
 * narrative that introduces the character to the reader, based on their attributes.
 *
 * @exports generateCharacterIntroductionStory - The main function to trigger the story generation.
 * @exports GenerateCharacterIntroductionStoryInput - The input type.
 * @exports GenerateCharacterIntroductionStoryOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema, accepting a flexible character object
const GenerateCharacterIntroductionStoryInputSchema = z.object({
  character: z.record(z.any()).describe('An object containing all character details.'),
});

export type GenerateCharacterIntroductionStoryInput = z.infer<typeof GenerateCharacterIntroductionStoryInputSchema>;

const GenerateCharacterIntroductionStoryOutputSchema = z.object({
  story: z.string().describe('The generated introductory story for the character.'),
});

export type GenerateCharacterIntroductionStoryOutput = z.infer<typeof GenerateCharacterIntroductionStoryOutputSchema>;

export async function generateCharacterIntroductionStory(
  input: GenerateCharacterIntroductionStoryInput
): Promise<GenerateCharacterIntroductionStoryOutput> {
  return generateCharacterIntroductionStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCharacterIntroductionStoryPrompt',
  input: { schema: GenerateCharacterIntroductionStoryInputSchema },
  output: { schema: GenerateCharacterIntroductionStoryOutputSchema },
  prompt: `You are a creative writer specializing in character introductions.
Based on the following character data, write a short, engaging introductory story (in Dutch) that reveals the character's personality, appearance, and background in a natural way. Make the reader curious about them.

Character Data:
{{{JSON.stringify character}}}

Write a compelling, short story. Ensure the story is unique.
`,
});

const generateCharacterIntroductionStoryFlow = ai.defineFlow(
  {
    name: 'generateCharacterIntroductionStoryFlow',
    inputSchema: GenerateCharacterIntroductionStoryInputSchema,
    outputSchema: GenerateCharacterIntroductionStoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
