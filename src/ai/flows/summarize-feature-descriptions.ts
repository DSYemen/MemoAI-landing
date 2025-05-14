
/**
 * @fileOverview Summarizes feature descriptions of MemoAI.
 *
 * - summarizeFeatureDescriptions - A function that summarizes feature descriptions.
 * - SummarizeFeatureDescriptionsInput - The input type for the summarizeFeatureDescriptions function.
 * - SummarizeFeatureDescriptionsOutput - The return type for the summarizeFeatureDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFeatureDescriptionsInputSchema = z.object({
  featureDescriptions: z
    .string()
    .describe('Detailed descriptions of MemoAI features.'),
});
export type SummarizeFeatureDescriptionsInput = z.infer<
  typeof SummarizeFeatureDescriptionsInputSchema
>;

const SummarizeFeatureDescriptionsOutputSchema = z.object({
  summarizedDescriptions: z
    .string()
    .describe('Concise summaries of MemoAI features.'),
});
export type SummarizeFeatureDescriptionsOutput = z.infer<
  typeof SummarizeFeatureDescriptionsOutputSchema
>;

export async function summarizeFeatureDescriptions(
  input: SummarizeFeatureDescriptionsInput
): Promise<SummarizeFeatureDescriptionsOutput> {
  return summarizeFeatureDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFeatureDescriptionsPrompt',
  input: {schema: SummarizeFeatureDescriptionsInputSchema},
  output: {schema: SummarizeFeatureDescriptionsOutputSchema},
  prompt: `You are an expert at creating concise and engaging feature descriptions.
  Given the detailed descriptions of MemoAI features, create short, impactful summaries suitable for a feature showcase.
  
  Detailed Descriptions: {{{featureDescriptions}}}
  
  Concise Summaries:`,
});

const summarizeFeatureDescriptionsFlow = ai.defineFlow(
  {
    name: 'summarizeFeatureDescriptionsFlow',
    inputSchema: SummarizeFeatureDescriptionsInputSchema,
    outputSchema: SummarizeFeatureDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
