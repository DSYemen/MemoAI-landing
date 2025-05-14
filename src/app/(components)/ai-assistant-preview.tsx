"use client";

import type { FC } from 'react';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeFeatureDescriptions } from '@/ai/flows/summarize-feature-descriptions';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from 'lucide-react';

const AiAssistantPreview: FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        // Using the existing flow, which expects 'featureDescriptions'.
        // The UI prompts the user for general text or ideas.
        const result = await summarizeFeatureDescriptions({ featureDescriptions: inputText });
        setSummary(result.summarizedDescriptions);
        toast({
          title: "Analysis Complete",
          description: "AI has processed your text.",
        });
      } catch (error) {
        console.error("AI Assistant Preview Error:", error);
        setSummary(null);
        toast({
          title: "Error",
          description: "Failed to process text with AI. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="ai-preview" className="w-full py-20 md:py-28 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Meet Your AI Knowledge Companion
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            Enter some text, notes, or feature ideas below to see how MemoAI's assistant can help you summarize and understand information.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Wand2 className="h-6 w-6 text-primary" />
              AI Text Analyzer
            </CardTitle>
            <CardDescription>
              Paste your content and let our AI provide a concise summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Enter your text here... For example, describe a new app idea or paste meeting notes."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="resize-none text-base focus:ring-accent"
              disabled={isPending}
              aria-label="Text input for AI analysis"
            />
            <Button onClick={handleSubmit} disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Analyze with AI"
              )}
            </Button>

            {summary && (
              <div className="mt-6 p-4 border rounded-md bg-background space-y-2 animate-fadeIn">
                <h3 className="text-lg font-semibold text-primary">AI Generated Summary:</h3>
                <p className="text-foreground/90 whitespace-pre-wrap">{summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
         <p className="mt-4 text-center text-sm text-muted-foreground">
            * AI responses are for demonstration purposes and may vary.
          </p>
      </div>
    </section>
  );
};

export default AiAssistantPreview;
