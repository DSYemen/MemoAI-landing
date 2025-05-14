"use client";

import type { FC } from 'react';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translateLandingPage } from '@/ai/flows/translate-landing-page';
import { useToast } from "@/hooks/use-toast";
import { Languages as LucideLanguages, Loader2, ArrowRightLeft } from 'lucide-react'; // Renamed Languages to LucideLanguages

const targetLanguages = [
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
];

const MultiLanguageSupport: FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>(targetLanguages[0].value);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }
    if (!targetLanguage) {
       toast({
        title: "Language Required",
        description: "Please select a target language.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await translateLandingPage({ text: inputText, targetLanguage });
        setTranslatedText(result.translatedText);
        toast({
          title: "Translation Complete",
          description: `Text translated to ${targetLanguages.find(l => l.value === targetLanguage)?.label || 'the selected language'}.`,
        });
      } catch (error) {
        console.error("Multi-Language Support Error:", error);
        setTranslatedText(null);
        toast({
          title: "Error",
          description: "Failed to translate text. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="language-support" className="w-full py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Speak Your Mind, In Any Language
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            MemoAI breaks down language barriers. Experience seamless multi-lingual note-taking and instant translation.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <LucideLanguages className="h-6 w-6 text-primary" />
              AI Translator
            </CardTitle>
            <CardDescription>
              Enter text and choose a language to see our AI translation in action.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="resize-none text-base focus:ring-accent"
              disabled={isPending}
              aria-label="Text input for translation"
            />
            
            <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled={isPending}>
              <SelectTrigger className="w-full text-base focus:ring-accent" aria-label="Target language selection">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                {targetLanguages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-base">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSubmit} disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  Translate <ArrowRightLeft className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {translatedText && (
              <div className="mt-6 p-4 border rounded-md bg-muted space-y-2 animate-fadeIn">
                <h3 className="text-lg font-semibold text-primary">Translated Text:</h3>
                <p className="text-foreground/90 whitespace-pre-wrap text-base">{translatedText}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          * AI translations are for demonstration and may not be perfectly accurate.
        </p>
      </div>
    </section>
  );
};

export default MultiLanguageSupport;
