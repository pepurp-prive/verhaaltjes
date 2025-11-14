// This file is generated automatically.
'use server';

/**
 * @fileOverview Genkit flow for automatically filling character categories using AI.
 *
 * This file defines a Genkit flow that allows users to automatically fill in entire categories of character details
 * (e.g., appearance, clothing) using AI, saving time and effort in character creation.
 *
 * @exports aiFillCharacterCategories - The main function to trigger the AI category fill flow.
 * @exports AiFillCharacterCategoriesInput - The input type for the aiFillCharacterCategories function.
 * @exports AiFillCharacterCategoriesOutput - The output type for the aiFillCharacterCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFillCharacterCategoriesInputSchema = z.object({
  sectionId: z.string().describe('The ID of the character section to fill (e.g., base-section, appearance-section).'),
  currentGender: z.string().describe('The gender of the character (e.g., Man, Vrouw).'),
  currentAge: z.string().describe('The age of the character (e.g., 25, Unknown).'),
});

export type AiFillCharacterCategoriesInput = z.infer<typeof AiFillCharacterCategoriesInputSchema>;

const AiFillCharacterCategoriesOutputSchema = z.object({
  categoryData: z.record(z.any()).describe('A JSON object containing the AI-generated data for the specified character category.'),
});

export type AiFillCharacterCategoriesOutput = z.infer<typeof AiFillCharacterCategoriesOutputSchema>;

export async function aiFillCharacterCategories(
  input: AiFillCharacterCategoriesInput
): Promise<AiFillCharacterCategoriesOutput> {
  return aiFillCharacterCategoriesFlow(input);
}

const aiFillCharacterCategoriesPrompt = ai.definePrompt({
  name: 'aiFillCharacterCategoriesPrompt',
  input: {schema: AiFillCharacterCategoriesInputSchema},
  output: {schema: AiFillCharacterCategoriesOutputSchema},
  prompt: `You are an AI assistant for writers. Generate realistic, Dutch data for a character.
  You will receive the section ID, current gender and age of a character and you will return only a valid JSON object that will fulfill the
  character information for the given section ID.

  The current gender is {{{currentGender}}} and the age is {{{currentAge}}}.
  Here is the section ID: {{{sectionId}}}

  Return ONLY a valid JSON object.
  `,
});

const aiFillCharacterCategoriesFlow = ai.defineFlow(
  {
    name: 'aiFillCharacterCategoriesFlow',
    inputSchema: AiFillCharacterCategoriesInputSchema,
    outputSchema: AiFillCharacterCategoriesOutputSchema,
  },
  async input => {
    const {output} = await aiFillCharacterCategoriesPrompt(input);
    return {
      categoryData: output!,
    };
  }
);
