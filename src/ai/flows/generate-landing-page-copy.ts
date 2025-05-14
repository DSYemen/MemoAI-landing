
/**
 * @fileOverview Generates landing page copy based on a prompt.
 *
 * - generateLandingPageCopy - A function that generates landing page copy.
 * - GenerateLandingPageCopyInput - The input type for the generateLandingPageCopy function.
 * - GenerateLandingPageCopyOutput - The return type for the generateLandingPageCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageCopyInputSchema = z.object({
  prompt: z
    .string()
    .describe('A prompt describing the desired landing page copy.'),
});

export type GenerateLandingPageCopyInput = z.infer<
  typeof GenerateLandingPageCopyInputSchema
>;

const GenerateLandingPageCopyOutputSchema = z.object({
  title: z.string().describe('The title of the landing page.'),
  heroSection: z.string().describe('The copy for the hero section.'),
  featureShowcase: z
    .string()
    .describe('The copy for the feature showcase section.'),
  aiAssistantPreview: z
    .string()
    .describe('The copy for the AI assistant preview section.'),
  multiLanguageSupport: z
    .string()
    .describe('The copy for the multi-language support section.'),
  callToAction: z.string().describe('The call to action text.'),
});

export type GenerateLandingPageCopyOutput = z.infer<
  typeof GenerateLandingPageCopyOutputSchema
>;

export async function generateLandingPageCopy(
  input: GenerateLandingPageCopyInput
): Promise<GenerateLandingPageCopyOutput> {
  return generateLandingPageCopyFlow(input);
}

const generateLandingPageCopyPrompt = ai.definePrompt({
  name: 'generateLandingPageCopyPrompt',
  input: {schema: GenerateLandingPageCopyInputSchema},
  output: {schema: GenerateLandingPageCopyOutputSchema},
  prompt: `You are an expert copywriter specializing in landing pages.

  Based on the prompt, generate compelling copy for each section of the landing page.

  Prompt: {{{prompt}}}

  Return the copy in a JSON format that matches the output schema.
  `,
});

const generateLandingPageCopyFlow = ai.defineFlow(
  {
    name: 'generateLandingPageCopyFlow',
    inputSchema: GenerateLandingPageCopyInputSchema,
    outputSchema: GenerateLandingPageCopyOutputSchema,
  },
  async input => {
    const {output} = await generateLandingPageCopyPrompt(input);
    return output!;
  }
);
