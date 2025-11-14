'use server';

/**
 * @fileOverview A flow to generate content for individual character fields using AI.
 *
 * - generateAiFieldContent - A function that generates content for a specified character field.
 * - GenerateAiFieldContentInput - The input type for the generateAiFieldContent function.
 * - GenerateAiFieldContentOutput - The return type for the generateAiFieldContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiFieldContentInputSchema = z.object({
  fieldId: z.string().describe('The ID of the field to generate content for.'),
  gender: z.string().describe('The gender of the character.'),
  age: z.string().describe('The age of the character.'),
  job: z.string().optional().describe('The job of the character, if available.'),
});
export type GenerateAiFieldContentInput = z.infer<typeof GenerateAiFieldContentInputSchema>;

const GenerateAiFieldContentOutputSchema = z.object({
  content: z.string().describe('The generated content for the field.'),
});
export type GenerateAiFieldContentOutput = z.infer<typeof GenerateAiFieldContentOutputSchema>;

export async function generateAiFieldContent(input: GenerateAiFieldContentInput): Promise<GenerateAiFieldContentOutput> {
  return generateAiFieldContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiFieldContentPrompt',
  input: {schema: GenerateAiFieldContentInputSchema},
  output: {schema: GenerateAiFieldContentOutputSchema},
  prompt: `You are an AI assistant for writers, skilled at generating creative content for character fields.

Based on the provided character details, generate content for the specified field. Keep the response concise and relevant.

Field ID: {{{fieldId}}}
Gender: {{{gender}}}
Age: {{{age}}}
Job: {{#if job}}Job: {{{job}}}{{/if}}

Output the generated content as a string.
`,
});

const generateAiFieldContentFlow = ai.defineFlow(
  {
    name: 'generateAiFieldContentFlow',
    inputSchema: GenerateAiFieldContentInputSchema,
    outputSchema: GenerateAiFieldContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {content: output!.content};
  }
);
