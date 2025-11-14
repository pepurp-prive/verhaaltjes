'use server';

/**
 * @fileOverview Generates character details using AI based on user input.
 *
 * This file defines a Genkit flow for generating character details based on user input.
 * It includes the `generateCharacterDetails` function, input and output schemas, and prompt definition.
 *
 * @exports generateCharacterDetails - An async function to generate character details.
 * @exports GenerateCharacterDetailsInput - The input type for generateCharacterDetails.
 * @exports GenerateCharacterDetailsOutput - The output type for generateCharacterDetails.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCharacterDetailsInputSchema = z.object({
  gender: z.string().describe('The gender of the character.'),
  age: z.string().describe('The age of the character.'),
  job: z.string().optional().describe('The job of the character.'),
  location: z.string().optional().describe('The location of the character.'),
  personality: z.string().optional().describe('The personality of the character.'),
  backstory: z.string().optional().describe('The backstory of the character.'),
  description: z.string().describe('A detailed description of the character based on the provided attributes.'),
});

export type GenerateCharacterDetailsInput = z.infer<typeof GenerateCharacterDetailsInputSchema>;

const GenerateCharacterDetailsOutputSchema = z.object({
  characterDetails: z.string().describe('A detailed and unique description of the character.'),
});

export type GenerateCharacterDetailsOutput = z.infer<typeof GenerateCharacterDetailsOutputSchema>;

export async function generateCharacterDetails(input: GenerateCharacterDetailsInput): Promise<GenerateCharacterDetailsOutput> {
  return generateCharacterDetailsFlow(input);
}

const generateCharacterDetailsPrompt = ai.definePrompt({
  name: 'generateCharacterDetailsPrompt',
  input: {
    schema: GenerateCharacterDetailsInputSchema,
  },
  output: {
    schema: GenerateCharacterDetailsOutputSchema,
  },
  prompt: `You are a creative writing assistant. Use the provided details to create a unique and compelling character description. Ensure that each description is distinct and never identical to another, even with similar inputs.

  Gender: {{{gender}}}
  Age: {{{age}}}
  Job: {{{job}}}
  Location: {{{location}}}
  Personality: {{{personality}}}
  Backstory: {{{backstory}}}
  Description: {{{description}}}

  Generate a new, unique description.
  `,
});

const generateCharacterDetailsFlow = ai.defineFlow(
  {
    name: 'generateCharacterDetailsFlow',
    inputSchema: GenerateCharacterDetailsInputSchema,
    outputSchema: GenerateCharacterDetailsOutputSchema,
  },
  async (input) => {
    const {output} = await generateCharacterDetailsPrompt(input);
    return output!;
  }
);
