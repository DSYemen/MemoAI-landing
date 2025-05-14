
"use client";

import type { FC } from 'react';
import { useState, useTransition, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { summarizeFeatureDescriptions } from '@/ai/flows/summarize-feature-descriptions';
import { translateLandingPage } from '@/ai/flows/translate-landing-page';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Loader2, Wand2, Languages, ImageIcon, Bot, Sparkles, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface TryAITab {
  id: string;
  icon: FC<any>;
  titleKey: string;
  descriptionKey: string;
  serviceDescriptionKey: string;
  formTitleKey: string;
  formDescriptionKey: string;
}

interface TryAITexts {
  mainTitle: string;
  mainSubtitle: string;
  tabs: {
    [key: string]: {
      title: string;
      description: string;
      serviceDescription: string;
      formTitle: string;
      formDescription: string;
    };
  };
  // Text Analyzer specific
  analyzerTextareaPlaceholder: string;
  analyzerButtonText: string;
  analyzerButtonProcessingText: string;
  analyzerSummaryTitle: string;
  analyzerInputRequiredTitle: string;
  analyzerInputRequiredDescription: string;
  analyzerAnalysisCompleteTitle: string;
  analyzerAnalysisCompleteDescription: string;
  analyzerErrorTitle: string;
  analyzerErrorDescription: string;
  // Translator specific
  translatorTextareaPlaceholder: string;
  translatorSelectPlaceholder: string;
  translatorButtonText: string;
  translatorButtonTranslatingText: string;
  translatorTranslatedTitle: string;
  translatorInputRequiredTitle: string;
  translatorInputRequiredDescription: string;
  translatorLanguageRequiredTitle: string;
  translatorLanguageRequiredDescription: string;
  translatorTranslationCompleteTitle: string;
  translatorTranslationCompleteDescription: (lang: string) => string;
  translatorErrorTitle: string;
  translatorErrorDescription: string;
  // Image Generator specific
  imageGenInputPlaceholder: string;
  imageGenButtonText: string;
  imageGenButtonGeneratingText: string;
  imageGenGeneratedImageTitle: string;
  imageGenPromptRequiredTitle: string;
  imageGenPromptRequiredDescription: string;
  imageGenImageGeneratedTitle: string;
  imageGenImageGeneratedDescription: string;
  imageGenErrorTitle: string;
  imageGenErrorDescription: string;
  demoDisclaimer: string;
}

const tabDetails: TryAITab[] = [
  { id: 'text-analyzer', icon: Bot, titleKey: 'textAnalyzerTitle', descriptionKey: 'textAnalyzerDescription', serviceDescriptionKey: 'textAnalyzerServiceDescription', formTitleKey: 'textAnalyzerFormTitle', formDescriptionKey: 'textAnalyzerFormDescription' },
  { id: 'translator', icon: Languages, titleKey: 'translatorTitle', descriptionKey: 'translatorDescription', serviceDescriptionKey: 'translatorServiceDescription', formTitleKey: 'translatorFormTitle', formDescriptionKey: 'translatorFormDescription' },
  { id: 'image-generator', icon: ImageIcon, titleKey: 'imageGeneratorTitle', descriptionKey: 'imageGeneratorDescription', serviceDescriptionKey: 'imageGeneratorServiceDescription', formTitleKey: 'imageGeneratorFormTitle', formDescriptionKey: 'imageGeneratorFormDescription' },
];

const getTexts = (lang: string): TryAITexts => ({
  mainTitle: lang === 'ar' ? 'جرب قوة الذكاء الاصطناعي مع MemoAI' : 'Experience AI Power with MemoAI',
  mainSubtitle: lang === 'ar' ? 'تفاعل مع نماذجنا الذكية مباشرةً. حلل النصوص، ترجم اللغات، أو أنشئ صورًا فريدة بلمسة زر.' : 'Interact with our intelligent models directly. Analyze text, translate languages, or generate unique images at the touch of a button.',
  tabs: {
    textAnalyzerTitle: lang === 'ar' ? 'محلل النصوص' : 'Text Analyzer',
    textAnalyzerDescription: lang === 'ar' ? 'لخص وافهم أي نص.' : 'Summarize and understand any text.',
    textAnalyzerServiceDescription: lang === 'ar' ? 'استكشف الرؤى من نصوصك مع محلل النصوص الذكي من MemoAI. تستخدم هذه الأداة القوية معالجة متقدمة للغة الطبيعية لتحليل وتلخيص محتواك. يمكنك لصق المقالات، ملاحظات الاجتماعات، أوصاف المنتجات، أو أي نص طويل آخر، وسيقدم لك ذكاؤنا الاصطناعي ملخصًا موجزًا، يحدد الموضوعات الرئيسية، ويساعدك على فهم الرسالة الأساسية في ثوانٍ. هذه الميزة مثالية للطلاب والباحثين والمحترفين الذين يحتاجون إلى معالجة كميات كبيرة من المعلومات بكفاءة وسرعة.' : 'Unlock insights from your text with MemoAI\'s intelligent Text Analyzer. This powerful tool uses advanced Natural Language Processing to dissect and summarize your content. Paste in articles, meeting notes, product descriptions, or any lengthy text, and our AI will provide you with a concise summary, identify key themes, and help you grasp the core message in seconds. It\'s perfect for students, researchers, and professionals who need to process large amounts of information efficiently.',
    textAnalyzerFormTitle: lang === 'ar' ? 'جرّب محلل النصوص' : 'Try the Text Analyzer',
    textAnalyzerFormDescription: lang === 'ar' ? 'ببساطة، الصق المحتوى الخاص بك في مربع النص أدناه. سيقوم الذكاء الاصطناعي بتحليله وتقديم ملخص واضح ومختصر يبرز النقاط الرئيسية. اضغط على "تحليل بواسطة AI" للبدء وشاهد كيف يمكن لـ MemoAI تبسيط المعلومات المعقدة لك.' : 'Simply paste your content into the text area below. Our AI will then analyze it and generate a clear, brief summary highlighting the main points. Click \'Analyze with AI\' to begin and see how MemoAI can simplify complex information for you.',
    translatorTitle: lang === 'ar' ? 'مترجم اللغات' : 'Language Translator',
    translatorDescription: lang === 'ar' ? 'ترجم النصوص إلى لغات متعددة.' : 'Translate text into multiple languages.',
    translatorServiceDescription: lang === 'ar' ? 'تجاوز حواجز اللغة فورًا مع مترجم اللغات متعدد الاستخدامات من MemoAI. مدعومًا بأحدث تقنيات الترجمة الآلية العصبية، فإنه يوفر ترجمات دقيقة ومناسبة للسياق عبر مجموعة واسعة من اللغات. سواء كنت تتواصل مع عملاء دوليين، أو تقرأ أبحاثًا أجنبية، أو تتعلم لغة جديدة، يضمن مترجمنا فهم رسالتك بوضوح. استمتع بتجربة ترجمة سلسة وفعالة تمكنك من التفاعل بثقة على نطاق عالمي.' : 'Break down language barriers instantly with MemoAI\'s versatile Language Translator. Powered by cutting-edge neural machine translation, it provides accurate and context-aware translations across a wide array of languages. Whether you\'re communicating with international clients, reading foreign research papers, or learning a new language, our translator ensures your message is understood clearly. Experience seamless and effective translation that empowers you to engage confidently on a global scale.',
    translatorFormTitle: lang === 'ar' ? 'جرّب المترجم' : 'Try the Translator',
    translatorFormDescription: lang === 'ar' ? 'اكتب أو الصق النص الذي ترغب في ترجمته في الحقل أدناه. بعد ذلك، اختر لغتك الهدف من القائمة المنسدلة التي تضم العديد من اللغات الشائعة. اضغط على "ترجمة" لرؤية قدرات الترجمة الفورية لـ MemoAI أثناء العمل.' : 'Type or paste the text you wish to translate into the field below. Then, select your target language from the dropdown list featuring many popular languages. Click \'Translate\' to see MemoAI\'s instant AI translation capabilities in action.',
    imageGeneratorTitle: lang === 'ar' ? 'مولد الصور' : 'Image Generator',
    imageGeneratorDescription: lang === 'ar' ? 'حول أفكارك النصية إلى صور مذهلة.' : 'Turn your text ideas into stunning visuals.',
    imageGeneratorServiceDescription: lang === 'ar' ? 'حوّل خيالك إلى واقع مع مولد الصور بالذكاء الاصطناعي من MemoAI. فقط قم بوصف الصورة التي تتخيلها بتفصيل، وسيقوم نموذجنا التوليدي المتقدم بتحويل كلماتك إلى عمل فني بصري فريد ومبتكر. هذه الأداة مثالية لمنشئي المحتوى، المسوقين، المصممين، أو أي شخص يتطلع إلى إضافة شرارة بصرية إبداعية إلى مشاريعه. كلما كان وصفك أكثر تفصيلاً وغنىً بالكلمات المفتاحية، كانت النتيجة أكثر دقة وروعة!' : 'Bring your imagination to life with MemoAI\'s AI Image Generator. Transform your textual ideas into stunning, unique visuals. Describe any scene, concept, or character in detail, and our advanced generative model will craft a custom image based on your prompt. Ideal for content creators, marketers, designers, or anyone looking to add a creative visual spark to their projects. The more detailed and descriptive your prompt, the better and more accurate the resulting image will be!',
    imageGeneratorFormTitle: lang === 'ar' ? 'جرّب مولد الصور' : 'Try the Image Generator',
    imageGeneratorFormDescription: lang === 'ar' ? 'اكتب وصفًا تفصيليًا للصورة التي تريد إنشاءها في حقل الإدخال. كن محددًا أو مبدعًا كما تشاء! على سبيل المثال، جرب: "رائد فضاء يركب حصانًا على سطح القمر بخلفية سديم ملون" أو "مقهى دافئ ومريح في يوم ممطر، مرئي من خلال نافذة ضبابية". ثم اضغط على "إنشاء صورة" ودع الذكاء الاصطناعي يبهرك.' : 'Describe the image you want to create in detail within the input field. Be as specific or as imaginative as you like! For example, try: "An astronaut riding a horse on the moon with a colorful nebula background" or "A cozy, warm coffee shop on a rainy day, viewed through a misty window." Then click \'Generate Image\' and let our AI amaze you.',
  },
  analyzerTextareaPlaceholder: lang === 'ar' ? 'أدخل النص هنا... على سبيل المثال، صف فكرة تطبيق جديدة أو الصق ملاحظات اجتماع.' : 'Enter your text here... For example, describe a new app idea or paste meeting notes.',
  analyzerButtonText: lang === 'ar' ? 'تحليل بواسطة AI' : 'Analyze with AI',
  analyzerButtonProcessingText: lang === 'ar' ? 'جاري المعالجة...' : 'Processing...',
  analyzerSummaryTitle: lang === 'ar' ? 'الملخص المُنشأ بواسطة AI:' : 'AI Generated Summary:',
  analyzerInputRequiredTitle: lang === 'ar' ? "الإدخال مطلوب" : "Input Required",
  analyzerInputRequiredDescription: lang === 'ar' ? "الرجاء إدخال بعض النصوص لتحليلها." : "Please enter some text to analyze.",
  analyzerAnalysisCompleteTitle: lang === 'ar' ? "اكتمل التحليل" : "Analysis Complete",
  analyzerAnalysisCompleteDescription: lang === 'ar' ? "لقد قام الذكاء الاصطناعي بمعالجة النص الخاص بك." : "AI has processed your text.",
  analyzerErrorTitle: lang === 'ar' ? "خطأ" : "Error",
  analyzerErrorDescription: lang === 'ar' ? "فشل في معالجة النص باستخدام الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى." : "Failed to process text with AI. Please try again.",
  translatorTextareaPlaceholder: lang === 'ar' ? 'أدخل النص المراد ترجمته...' : 'Enter text to translate...',
  translatorSelectPlaceholder: lang === 'ar' ? 'اختر اللغة الهدف' : 'Select target language',
  translatorButtonText: lang === 'ar' ? 'ترجمة' : 'Translate',
  translatorButtonTranslatingText: lang === 'ar' ? 'جاري الترجمة...' : 'Translating...',
  translatorTranslatedTitle: lang === 'ar' ? 'النص المترجم:' : 'Translated Text:',
  translatorInputRequiredTitle: lang === 'ar' ? "الإدخال مطلوب" : "Input Required",
  translatorInputRequiredDescription: lang === 'ar' ? "الرجاء إدخال بعض النصوص لترجمتها." : "Please enter some text to translate.",
  translatorLanguageRequiredTitle: lang === 'ar' ? "اللغة مطلوبة" : "Language Required",
  translatorLanguageRequiredDescription: lang === 'ar' ? "الرجاء تحديد اللغة الهدف." : "Please select a target language.",
  translatorTranslationCompleteTitle: lang === 'ar' ? "اكتملت الترجمة" : "Translation Complete",
  translatorTranslationCompleteDescription: (selectedLang) => lang === 'ar' ? `تمت ترجمة النص إلى ${targetLanguages.find(l => l.value === selectedLang)?.label || 'اللغة المختارة'}.` : `Text translated to ${targetLanguages.find(l => l.value === selectedLang)?.label || 'the selected language'}.`,
  translatorErrorTitle: lang === 'ar' ? "خطأ" : "Error",
  translatorErrorDescription: lang === 'ar' ? "فشلت ترجمة النص. حاول مرة اخرى." : "Failed to translate text. Please try again.",
  imageGenInputPlaceholder: lang === 'ar' ? 'صف الصورة التي تريدها (مثال: قطة ترتدي قبعة فضاء)' : 'Describe your desired image (e.g., a cat wearing a space helmet)',
  imageGenButtonText: lang === 'ar' ? 'إنشاء صورة' : 'Generate Image',
  imageGenButtonGeneratingText: lang === 'ar' ? 'جاري الإنشاء...' : 'Generating...',
  imageGenGeneratedImageTitle: lang === 'ar' ? 'الصورة المولدة:' : 'Generated Image:',
  imageGenPromptRequiredTitle: lang === 'ar' ? "الوصف مطلوب" : "Prompt Required",
  imageGenPromptRequiredDescription: lang === 'ar' ? "الرجاء إدخال وصف لإنشاء الصورة." : "Please enter a prompt to generate the image.",
  imageGenImageGeneratedTitle: lang === 'ar' ? "تم إنشاء الصورة" : "Image Generated",
  imageGenImageGeneratedDescription: lang === 'ar' ? "تم إنشاء صورتك بنجاح." : "Your image has been successfully generated.",
  imageGenErrorTitle: lang === 'ar' ? "خطأ في إنشاء الصورة" : "Image Generation Error",
  imageGenErrorDescription: lang === 'ar' ? "فشل في إنشاء الصورة. حاول مرة اخرى." : "Failed to generate image. Please try again.",
  demoDisclaimer: lang === 'ar' ? "* ردود ونتائج الذكاء الاصطناعي هي لأغراض توضيحية وقد تختلف عن النتائج الفعلية في المنتج الكامل." : "* AI responses and results are for demonstration purposes and may vary from actual outcomes in the full product."
});

const TryAISection: FC = () => {
  const [texts, setTexts] = useState<TryAITexts>(getTexts('en'));
  const [currentDirection, setCurrentDirection] = useState('ltr');
  const { toast } = useToast();

  // Text Analyzer State
  const [analyzerInputText, setAnalyzerInputText] = useState<string>('');
  const [analyzerSummary, setAnalyzerSummary] = useState<string | null>(null);
  const [isAnalyzerPending, startAnalyzerTransition] = useTransition();

  // Translator State
  const [translatorInputText, setTranslatorInputText] = useState<string>('');
  const [translatorTargetLanguage, setTranslatorTargetLanguage] = useState<string>(targetLanguages[0].value);
  const [translatorTranslatedText, setTranslatorTranslatedText] = useState<string | null>(null);
  const [isTranslatorPending, startTranslatorTransition] = useTransition();

  // Image Generator State
  const [imageGenPrompt, setImageGenPrompt] = useState<string>('');
  const [imageGenImageUrl, setImageGenImageUrl] = useState<string | null>(null);
  const [isImageGenPending, startImageGenTransition] = useTransition();

  const updateTexts = useCallback(() => {
    const dir = document.documentElement.dir || 'ltr';
    setCurrentDirection(dir);
    setTexts(getTexts(dir === 'rtl' ? 'ar' : 'en'));
  }, []);

  useEffect(() => {
    updateTexts();
    window.addEventListener('directionChanged', updateTexts);
    return () => window.removeEventListener('directionChanged', updateTexts);
  }, [updateTexts]);

  const handleAnalyzerSubmit = async () => {
    if (!analyzerInputText.trim()) {
      toast({ title: texts.analyzerInputRequiredTitle, description: texts.analyzerInputRequiredDescription, variant: "destructive" });
      return;
    }
    startAnalyzerTransition(async () => {
      try {
        const result = await summarizeFeatureDescriptions({ featureDescriptions: analyzerInputText });
        setAnalyzerSummary(result.summarizedDescriptions);
        toast({ title: texts.analyzerAnalysisCompleteTitle, description: texts.analyzerAnalysisCompleteDescription });
      } catch (error) {
        setAnalyzerSummary(null);
        toast({ title: texts.analyzerErrorTitle, description: texts.analyzerErrorDescription, variant: "destructive" });
        console.error("Analyzer error:", error);
      }
    });
  };

  const handleTranslatorSubmit = async () => {
    if (!translatorInputText.trim()) {
      toast({ title: texts.translatorInputRequiredTitle, description: texts.translatorInputRequiredDescription, variant: "destructive" });
      return;
    }
    if (!translatorTargetLanguage) {
      toast({ title: texts.translatorLanguageRequiredTitle, description: texts.translatorLanguageRequiredDescription, variant: "destructive" });
      return;
    }
    startTranslatorTransition(async () => {
      try {
        const result = await translateLandingPage({ text: translatorInputText, targetLanguage: translatorTargetLanguage });
        setTranslatorTranslatedText(result.translatedText);
        toast({ title: texts.translatorTranslationCompleteTitle, description: texts.translatorTranslationCompleteDescription(translatorTargetLanguage) });
      } catch (error) {
        setTranslatorTranslatedText(null);
        toast({ title: texts.translatorErrorTitle, description: texts.translatorErrorDescription, variant: "destructive" });
        console.error("Translator error:", error);
      }
    });
  };

  const handleImageGenSubmit = async () => {
    if (!imageGenPrompt.trim()) {
      toast({ title: texts.imageGenPromptRequiredTitle, description: texts.imageGenPromptRequiredDescription, variant: "destructive" });
      return;
    }
    startImageGenTransition(async () => {
      setImageGenImageUrl(`https://placehold.co/512x512/1A093D/E0E0FF/png?text=${encodeURIComponent(currentDirection === 'rtl' ? 'جاري الإنشاء...' : 'Generating...')}`);
      try {
        const result = await generateImage({ prompt: imageGenPrompt });
        setImageGenImageUrl(result.imageDataUri);
        toast({ title: texts.imageGenImageGeneratedTitle, description: texts.imageGenImageGeneratedDescription });
      } catch (error) {
        setImageGenImageUrl(null);
        toast({ title: texts.imageGenErrorTitle, description: texts.imageGenErrorDescription, variant: "destructive" });
        console.error("Image Gen error:", error);
      }
    });
  };

  return (
    <section id="try-ai" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-muted via-background to-muted/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
           <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>

        <Tabs defaultValue={tabDetails[0].id} className="w-full" dir={currentDirection}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-transparent p-0 h-auto mb-10">
            {tabDetails.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 px-3 py-3 text-sm font-medium rounded-lg
                           border border-border/50 bg-card/60 backdrop-blur-sm shadow-md
                           hover:bg-accent/20 hover:text-accent-foreground 
                           data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-xl 
                           transition-all duration-300 h-full whitespace-normal text-center sm:text-left"
              >
                <tab.icon className="h-5 w-5 shrink-0" />
                <div className="flex flex-col">
                    <span className="font-semibold">{texts.tabs[tab.titleKey]?.title}</span>
                    <span className="text-xs text-muted-foreground data-[state=active]:text-accent-foreground/80">{texts.tabs[tab.descriptionKey]?.description}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Text Analyzer Tab Content */}
          <TabsContent value={tabDetails[0].id} className="outline-none ring-0">
            <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-primary/20 animate-fadeIn">
              <div className="grid md:grid-cols-2 items-start">
                <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full bg-muted/30 ${currentDirection === 'rtl' ? 'md:border-l' : 'md:border-r'} border-border/50`}>
                  <h3 className="text-2xl font-semibold text-primary mb-3">{texts.tabs[tabDetails[0].titleKey]?.title}</h3>
                  <p className="text-foreground/80 leading-relaxed text-base">{texts.tabs[tabDetails[0].serviceDescriptionKey]?.serviceDescription}</p>
                </div>
                <div className={`p-6 md:p-8 lg:p-10`}>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Wand2 className="h-6 w-6 text-primary" />
                      {texts.tabs[tabDetails[0].formTitleKey]?.formTitle}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {texts.tabs[tabDetails[0].formDescriptionKey]?.formDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <Textarea
                      placeholder={texts.analyzerTextareaPlaceholder}
                      value={analyzerInputText}
                      onChange={(e) => setAnalyzerInputText(e.target.value)}
                      rows={6}
                      className="resize-none text-base focus:ring-accent"
                      disabled={isAnalyzerPending}
                      aria-label={texts.tabs[tabDetails[0].formTitleKey]?.formTitle}
                    />
                    <Button onClick={handleAnalyzerSubmit} disabled={isAnalyzerPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
                      {isAnalyzerPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {texts.analyzerButtonProcessingText}</>
                      ) : (
                        <>{texts.analyzerButtonText} <Wand2 className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" /></>
                      )}
                    </Button>
                    {analyzerSummary && (
                      <div className="mt-6 p-4 border rounded-md bg-background/70 space-y-2 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-primary">{texts.analyzerSummaryTitle}</h3>
                        <p className="text-foreground/90 whitespace-pre-wrap text-base">{analyzerSummary}</p>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Translator Tab Content */}
          <TabsContent value={tabDetails[1].id} className="outline-none ring-0">
            <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-primary/20 animate-fadeIn">
              <div className="grid md:grid-cols-2 items-start">
                <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full bg-muted/30 ${currentDirection === 'rtl' ? 'md:border-l' : 'md:border-r'} border-border/50`}>
                   <h3 className="text-2xl font-semibold text-primary mb-3">{texts.tabs[tabDetails[1].titleKey]?.title}</h3>
                   <p className="text-foreground/80 leading-relaxed text-base">{texts.tabs[tabDetails[1].serviceDescriptionKey]?.serviceDescription}</p>
                </div>
                <div className={`p-6 md:p-8 lg:p-10`}>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Languages className="h-6 w-6 text-primary" />
                      {texts.tabs[tabDetails[1].formTitleKey]?.formTitle}
                    </CardTitle>
                    <CardDescription className="text-base">
                       {texts.tabs[tabDetails[1].formDescriptionKey]?.formDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <Textarea
                      placeholder={texts.translatorTextareaPlaceholder}
                      value={translatorInputText}
                      onChange={(e) => setTranslatorInputText(e.target.value)}
                      rows={5}
                      className="resize-none text-base focus:ring-accent"
                      disabled={isTranslatorPending}
                      aria-label={texts.tabs[tabDetails[1].formTitleKey]?.formTitle}
                    />
                    <Select value={translatorTargetLanguage} onValueChange={setTranslatorTargetLanguage} disabled={isTranslatorPending} dir={currentDirection}>
                      <SelectTrigger className="w-full text-base focus:ring-accent" aria-label={texts.translatorSelectPlaceholder}>
                        <SelectValue placeholder={texts.translatorSelectPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {targetLanguages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="text-base">
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleTranslatorSubmit} disabled={isTranslatorPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
                      {isTranslatorPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {texts.translatorButtonTranslatingText}</>
                      ) : (
                        <>{texts.translatorButtonText} <ArrowRightLeft className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" /></>
                      )}
                    </Button>
                    {translatorTranslatedText && (
                      <div className="mt-6 p-4 border rounded-md bg-background/70 space-y-2 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-primary">{texts.translatorTranslatedTitle}</h3>
                        <p className="text-foreground/90 whitespace-pre-wrap text-base">{translatorTranslatedText}</p>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Image Generator Tab Content */}
          <TabsContent value={tabDetails[2].id} className="outline-none ring-0">
            <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-primary/20 animate-fadeIn">
              <div className="grid md:grid-cols-2 items-start">
                 <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full bg-muted/30 ${currentDirection === 'rtl' ? 'md:border-l' : 'md:border-r'} border-border/50`}>
                   <h3 className="text-2xl font-semibold text-primary mb-3">{texts.tabs[tabDetails[2].titleKey]?.title}</h3>
                   <p className="text-foreground/80 leading-relaxed text-base">{texts.tabs[tabDetails[2].serviceDescriptionKey]?.serviceDescription}</p>
                </div>
                <div className={`p-6 md:p-8 lg:p-10`}>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <ImageIcon className="h-6 w-6 text-primary" />
                       {texts.tabs[tabDetails[2].formTitleKey]?.formTitle}
                    </CardTitle>
                    <CardDescription className="text-base">
                       {texts.tabs[tabDetails[2].formDescriptionKey]?.formDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <Input
                      type="text"
                      placeholder={texts.imageGenInputPlaceholder}
                      value={imageGenPrompt}
                      onChange={(e) => setImageGenPrompt(e.target.value)}
                      className="text-base focus:ring-accent"
                      disabled={isImageGenPending}
                      aria-label={texts.tabs[tabDetails[2].formTitleKey]?.formTitle}
                    />
                    <Button onClick={handleImageGenSubmit} disabled={isImageGenPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
                      {isImageGenPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {texts.imageGenButtonGeneratingText}</>
                      ) : (
                         <>{texts.imageGenButtonText} <Sparkles className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" /></>
                      )}
                    </Button>
                    {imageGenImageUrl && (
                      <div className="mt-6 p-4 border rounded-md bg-background/70 space-y-2 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-primary">{texts.imageGenGeneratedImageTitle}</h3>
                        <div className="aspect-square relative w-full max-w-md mx-auto rounded-md overflow-hidden">
                          <Image src={imageGenImageUrl} alt={texts.imageGenGeneratedImageTitle} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" data-ai-hint="generated image" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {texts.demoDisclaimer}
        </p>
      </div>
    </section>
  );
};

export default TryAISection;
