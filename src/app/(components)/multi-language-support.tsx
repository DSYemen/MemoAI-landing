
"use client";

import type { FC } from 'react';
import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translateLandingPage } from '@/ai/flows/translate-landing-page';
import { useToast } from "@/hooks/use-toast";
import { Languages as LucideLanguages, Loader2, ArrowRightLeft } from 'lucide-react';

interface LanguageOption {
  value: string;
  label: string;
}

const targetLanguages: LanguageOption[] = [
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic (العربية)' },
  { value: 'hi', label: 'Hindi' },
];

interface MultiLangTexts {
  mainTitle: string;
  mainSubtitle: string;
  cardTitle: string;
  cardDescription: string;
  textareaPlaceholder: string;
  selectPlaceholder: string;
  buttonText: string;
  buttonTranslatingText: string;
  translatedTitle: string;
  inputRequiredTitle: string;
  inputRequiredDescription: string;
  languageRequiredTitle: string;
  languageRequiredDescription: string;
  translationCompleteTitle: string;
  translationCompleteDescription: (lang: string) => string;
  errorTitle: string;
  errorDescription: string;
  demoDisclaimer: string;
}


const MultiLanguageSupport: FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>(targetLanguages[0].value);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [texts, setTexts] = useState<MultiLangTexts>({
    mainTitle: 'Speak Your Mind, In Any Language',
    mainSubtitle: 'MemoAI breaks down language barriers. Experience seamless multi-lingual note-taking and instant translation.',
    cardTitle: 'AI Translator',
    cardDescription: 'Enter text and choose a language to see our AI translation in action.',
    textareaPlaceholder: 'Enter text to translate...',
    selectPlaceholder: 'Select target language',
    buttonText: 'Translate',
    buttonTranslatingText: 'Translating...',
    translatedTitle: 'Translated Text:',
    inputRequiredTitle: "Input Required",
    inputRequiredDescription: "Please enter some text to translate.",
    languageRequiredTitle: "Language Required",
    languageRequiredDescription: "Please select a target language.",
    translationCompleteTitle: "Translation Complete",
    translationCompleteDescription: (lang) => `Text translated to ${targetLanguages.find(l => l.value === lang)?.label || 'the selected language'}.`,
    errorTitle: "Error",
    errorDescription: "Failed to translate text. Please try again.",
    demoDisclaimer: "* AI translations are for demonstration and may not be perfectly accurate."
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      if (currentDirection === 'rtl') {
        setTexts({
          mainTitle: 'عبر عن رأيك بأي لغة',
          mainSubtitle: 'MemoAI يكسر حواجز اللغة. جرب تدوين الملاحظات متعدد اللغات بسلاسة والترجمة الفورية.',
          cardTitle: 'مترجم AI',
          cardDescription: 'أدخل نصًا واختر لغة لترى ترجمة الذكاء الاصطناعي الخاصة بنا أثناء العمل.',
          textareaPlaceholder: 'أدخل النص المراد ترجمته...',
          selectPlaceholder: 'اختر اللغة الهدف',
          buttonText: 'ترجمة',
          buttonTranslatingText: 'جاري الترجمة...',
          translatedTitle: 'النص المترجم:',
          inputRequiredTitle: "الإدخال مطلوب",
          inputRequiredDescription: "الرجاء إدخال بعض النصوص لترجمتها.",
          languageRequiredTitle: "اللغة مطلوبة",
          languageRequiredDescription: "الرجاء تحديد اللغة الهدف.",
          translationCompleteTitle: "اكتملت الترجمة",
          translationCompleteDescription: (lang) => `تمت ترجمة النص إلى ${targetLanguages.find(l => l.value === lang)?.label || 'اللغة المختارة'}.`,
          errorTitle: "خطأ",
          errorDescription: "فشلت ترجمة النص. حاول مرة اخرى.",
          demoDisclaimer: "* ترجمات الذكاء الاصطناعي هي لأغراض توضيحية وقد لا تكون دقيقة تمامًا."
        });
      } else {
         setTexts({
            mainTitle: 'Speak Your Mind, In Any Language',
            mainSubtitle: 'MemoAI breaks down language barriers. Experience seamless multi-lingual note-taking and instant translation.',
            cardTitle: 'AI Translator',
            cardDescription: 'Enter text and choose a language to see our AI translation in action.',
            textareaPlaceholder: 'Enter text to translate...',
            selectPlaceholder: 'Select target language',
            buttonText: 'Translate',
            buttonTranslatingText: 'Translating...',
            translatedTitle: 'Translated Text:',
            inputRequiredTitle: "Input Required",
            inputRequiredDescription: "Please enter some text to translate.",
            languageRequiredTitle: "Language Required",
            languageRequiredDescription: "Please select a target language.",
            translationCompleteTitle: "Translation Complete",
            translationCompleteDescription: (lang) => `Text translated to ${targetLanguages.find(l => l.value === lang)?.label || 'the selected language'}.`,
            errorTitle: "Error",
            errorDescription: "Failed to translate text. Please try again.",
            demoDisclaimer: "* AI translations are for demonstration and may not be perfectly accurate."
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
    if (!targetLanguage) {
       toast({
        title: texts.languageRequiredTitle,
        description: texts.languageRequiredDescription,
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await translateLandingPage({ text: inputText, targetLanguage });
        setTranslatedText(result.translatedText);
        toast({
          title: texts.translationCompleteTitle,
          description: texts.translationCompleteDescription(targetLanguage),
        });
      } catch (error) {
        console.error("Multi-Language Support Error:", error);
        setTranslatedText(null);
        toast({
          title: texts.errorTitle,
          description: texts.errorDescription,
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
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl animate-fadeIn">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <LucideLanguages className="h-6 w-6 text-primary" />
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
              rows={6}
              className="resize-none text-base focus:ring-accent"
              disabled={isPending}
              aria-label={texts.cardTitle}
            />
            
            <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled={isPending}>
              <SelectTrigger className="w-full text-base focus:ring-accent" aria-label={texts.selectPlaceholder}>
                <SelectValue placeholder={texts.selectPlaceholder} />
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
                  {texts.buttonTranslatingText}
                </>
              ) : (
                <>
                  {texts.buttonText} <ArrowRightLeft className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {translatedText && (
              <div className="mt-6 p-4 border rounded-md bg-muted space-y-2 animate-fadeIn">
                <h3 className="text-lg font-semibold text-primary">{texts.translatedTitle}</h3>
                <p className="text-foreground/90 whitespace-pre-wrap text-base">{translatedText}</p>
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

export default MultiLanguageSupport;
