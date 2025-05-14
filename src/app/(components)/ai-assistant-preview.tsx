
"use client";

import type { FC } from 'react';
import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeFeatureDescriptions } from '@/ai/flows/summarize-feature-descriptions';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from 'lucide-react';

interface AiAssistantTexts {
  mainTitle: string;
  mainSubtitle: string;
  cardTitle: string;
  cardDescription: string;
  textareaPlaceholder: string;
  buttonText: string;
  buttonProcessingText: string;
  summaryTitle: string;
  inputRequiredTitle: string;
  inputRequiredDescription: string;
  analysisCompleteTitle: string;
  analysisCompleteDescription: string;
  errorTitle: string;
  errorDescription: string;
  demoDisclaimer: string;
}

const AiAssistantPreview: FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [texts, setTexts] = useState<AiAssistantTexts>({
    mainTitle: 'Meet Your AI Knowledge Companion',
    mainSubtitle: "Enter some text, notes, or feature ideas below to see how MemoAI's assistant can help you summarize and understand information.",
    cardTitle: 'AI Text Analyzer',
    cardDescription: 'Paste your content and let our AI provide a concise summary.',
    textareaPlaceholder: 'Enter your text here... For example, describe a new app idea or paste meeting notes.',
    buttonText: 'Analyze with AI',
    buttonProcessingText: 'Processing...',
    summaryTitle: 'AI Generated Summary:',
    inputRequiredTitle: "Input Required",
    inputRequiredDescription: "Please enter some text to analyze.",
    analysisCompleteTitle: "Analysis Complete",
    analysisCompleteDescription: "AI has processed your text.",
    errorTitle: "Error",
    errorDescription: "Failed to process text with AI. Please try again.",
    demoDisclaimer: "* AI responses are for demonstration purposes and may vary."
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      if (currentDirection === 'rtl') {
        setTexts({
          mainTitle: 'تعرف على رفيقك المعرفي الذكي',
          mainSubtitle: 'أدخل بعض النصوص أو الملاحظات أو أفكار الميزات أدناه لترى كيف يمكن لمساعد MemoAI أن يساعدك في تلخيص وفهم المعلومات.',
          cardTitle: 'محلل النصوص بالذكاء الاصطناعي',
          cardDescription: 'الصق المحتوى الخاص بك ودع الذكاء الاصطناعي الخاص بنا يقدم ملخصًا موجزًا.',
          textareaPlaceholder: 'أدخل النص هنا... على سبيل المثال، صف فكرة تطبيق جديدة أو الصق ملاحظات اجتماع.',
          buttonText: 'تحليل بواسطة AI',
          buttonProcessingText: 'جاري المعالجة...',
          summaryTitle: 'الملخص المُنشأ بواسطة AI:',
          inputRequiredTitle: "الإدخال مطلوب",
          inputRequiredDescription: "الرجاء إدخال بعض النصوص لتحليلها.",
          analysisCompleteTitle: "اكتمل التحليل",
          analysisCompleteDescription: "لقد قام الذكاء الاصطناعي بمعالجة النص الخاص بك.",
          errorTitle: "خطأ",
          errorDescription: "فشل في معالجة النص باستخدام الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.",
          demoDisclaimer: "* ردود الذكاء الاصطناعي هي لأغراض توضيحية وقد تختلف."
        });
      } else {
        setTexts({
          mainTitle: 'Meet Your AI Knowledge Companion',
          mainSubtitle: "Enter some text, notes, or feature ideas below to see how MemoAI's assistant can help you summarize and understand information.",
          cardTitle: 'AI Text Analyzer',
          cardDescription: 'Paste your content and let our AI provide a concise summary.',
          textareaPlaceholder: 'Enter your text here... For example, describe a new app idea or paste meeting notes.',
          buttonText: 'Analyze with AI',
          buttonProcessingText: 'Processing...',
          summaryTitle: 'AI Generated Summary:',
          inputRequiredTitle: "Input Required",
          inputRequiredDescription: "Please enter some text to analyze.",
          analysisCompleteTitle: "Analysis Complete",
          analysisCompleteDescription: "AI has processed your text.",
          errorTitle: "Error",
          errorDescription: "Failed to process text with AI. Please try again.",
          demoDisclaimer: "* AI responses are for demonstration purposes and may vary."
        });
      }
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);


  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: texts.inputRequiredTitle,
        description: texts.inputRequiredDescription,
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await summarizeFeatureDescriptions({ featureDescriptions: inputText });
        setSummary(result.summarizedDescriptions);
        toast({
          title: texts.analysisCompleteTitle,
          description: texts.analysisCompleteDescription,
        });
      } catch (error) {
        console.error("AI Assistant Preview Error:", error);
        setSummary(null);
        toast({
          title: texts.errorTitle,
          description: texts.errorDescription,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="ai-preview" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted via-background to-muted/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl animate-fadeIn bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Wand2 className="h-6 w-6 text-primary" />
              {texts.cardTitle}
            </CardTitle>
            <CardDescription>
              {texts.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder={texts.textareaPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="resize-none text-base focus:ring-accent"
              disabled={isPending}
              aria-label={texts.cardTitle}
            />
            <Button onClick={handleSubmit} disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {texts.buttonProcessingText}
                </>
              ) : (
                texts.buttonText
              )}
            </Button>

            {summary && (
              <div className="mt-6 p-4 border rounded-md bg-background/70 space-y-2 animate-fadeIn">
                <h3 className="text-lg font-semibold text-primary">{texts.summaryTitle}</h3>
                <p className="text-foreground/90 whitespace-pre-wrap">{summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
         <p className="mt-4 text-center text-sm text-muted-foreground">
            {texts.demoDisclaimer}
          </p>
      </div>
    </section>
  );
};

export default AiAssistantPreview;
