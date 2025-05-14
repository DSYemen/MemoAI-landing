
/**
 * @fileOverview A translation AI agent for translating landing page content.
 *
 * - translateLandingPage - A function that handles the landing page translation process.
 * - TranslateLandingPageInput - The input type for the translateLandingPage function.
 * - TranslateLandingPageOutput - The return type for the translateLandingPage function.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';

const TranslateLandingPageInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The target language for translation.'),
});

export type TranslateLandingPageInput = z.infer<typeof TranslateLandingPageInputSchema>;

const TranslateLandingPageOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
});

export type TranslateLandingPageOutput = z.infer<typeof TranslateLandingPageOutputSchema>;

export async function translateLandingPage(input: TranslateLandingPageInput): Promise<TranslateLandingPageOutput> {
  return translateLandingPageFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translateLandingPagePrompt',
  input: {schema: TranslateLandingPageInputSchema},
  output: {schema: TranslateLandingPageOutputSchema},
  prompt: `Translate the following text into {{targetLanguage}}:

{{{text}}}`,
});

const translateLandingPageFlow = ai.defineFlow(
  {
    name: 'translateLandingPageFlow',
    inputSchema: TranslateLandingPageInputSchema,
    outputSchema: TranslateLandingPageOutputSchema,
  },
  async input => {
    const {output} = await translatePrompt(input);
    return output!;
  }
);
