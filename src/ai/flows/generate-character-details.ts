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
  name: z.string().min(1, 'Naam is verplicht.'),
  age: z.string().optional(),
  gender: z.enum(['Man', 'Vrouw']),
  role: z.string().optional(),
  roleOther: z.string().optional(),
  job: z.string().optional(),
  location: z.string().optional(),
  lengthM: z.string().optional(),
  lengthCm: z.string().optional(),
  build: z.string().optional(),
  buildOther: z.string().optional(),
  hairColor: z.string().optional(),
  hairColorOther: z.string().optional(),
  hairStyle: z.string().optional(),
  hairStyleOther: z.string().optional(),
  eyes: z.string().optional(),
  eyesOther: z.string().optional(),
  facialHair: z.string().optional(),
  facialHairOther: z.string().optional(),
  bodyHair: z.array(z.string()).optional(),
  breastsCup: z.string().optional(),
  breastsCupOther: z.string().optional(),
  breastsShape: z.string().optional(),
  breastsShapeOther: z.string().optional(),
  buttocksSize: z.string().optional(),
  buttocksSizeOther: z.string().optional(),
  buttocksShape: z.string().optional(),
  buttocksShapeOther: z.string().optional(),
  features: z.array(z.string()).optional(),
  impression: z.string().optional(),
  impressionOther: z.string().optional(),
  style: z.string().optional(),
  styleOther: z.string().optional(),
  outfitTop: z.string().optional(),
  outfitTopOther: z.string().optional(),
  outfitBottom: z.string().optional(),
  outfitBottomOther: z.string().optional(),
  shoes: z.string().optional(),
  shoesOther: z.string().optional(),
  lingerieMainType: z.string().optional(),
  lingerieMainTypeOther: z.string().optional(),
  lingerieTopType: z.string().optional(),
  lingerieTopTypeOther: z.string().optional(),
  lingerieBottomType: z.string().optional(),
  lingerieBottomTypeOther: z.string().optional(),
  lingerieBodyType: z.string().optional(),
  lingerieBodyTypeOther: z.string().optional(),
  lingerieBrandsDropdown: z.string().optional(),
  lingerieBrandsDropdownOther: z.string().optional(),
  lingerieStyle: z.string().optional(),
  lingerieStyleOther: z.string().optional(),
  lingerieMaterial: z.string().optional(),
  lingerieMaterialOther: z.string().optional(),
  lingerieColor: z.string().optional(),
  lingerieDetails: z.string().optional(),
  isSexyLingerie: z.boolean().optional(),
  sexyLingerieDetails: z.string().optional(),
  sexyLingerieDetailsOther: z.string().optional(),
  personality: z.string().optional(),
  backstory: z.string().optional(),
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
  prompt: `You are a creative writing assistant. Your task is to write a long, detailed, and engaging character description in Dutch.
  Use all the information provided below to create a vivid and cohesive portrait of the character. Weave the details together into a narrative description, rather than just listing them.
  Make the character feel real and unique. Ensure that each description is distinct and never identical to another, even with similar inputs.

  Character Data:
  {{{JSON.stringify .}}}

  Generate a new, unique, and detailed description.
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
