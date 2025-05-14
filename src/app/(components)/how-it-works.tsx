
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Cpu, Lightbulb, Zap } from 'lucide-react';

interface HowItWorksStep {
  icon: FC<any>;
  title: string;
  description: string;
}

interface HowItWorksTexts {
  mainTitle: string;
  mainSubtitle: string;
  steps: HowItWorksStep[];
}

const getSteps = (lang: string): HowItWorksStep[] => [
  {
    icon: UploadCloud,
    title: lang === 'ar' ? '1. التقط كل شيء' : '1. Capture Everything',
    description: lang === 'ar' ? 'أضف ملاحظاتك ومستنداتك وأفكارك الصوتية وصفحات الويب بسهولة إلى MemoAI.' : 'Easily add your notes, documents, voice memos, and web pages to MemoAI.',
  },
  {
    icon: Cpu,
    title: lang === 'ar' ? '2. معالجة ذكية بالذكاء الاصطناعي' : '2. AI Smart Processing',
    description: lang === 'ar' ? 'يقوم محركنا الذكي بتحليل وتنظيم المحتوى الخاص بك، وتحديد الكلمات الرئيسية والأنماط.' : 'Our intelligent engine analyzes and organizes your content, identifying keywords and patterns.',
  },
  {
    icon: Lightbulb,
    title: lang === 'ar' ? '3. اكتشف رؤى جديدة' : '3. Uncover Insights',
    description: lang === 'ar' ? 'يكشف MemoAI عن الروابط المخفية ويقترح الأفكار ذات الصلة، مما يحول المعلومات إلى معرفة.' : 'MemoAI reveals hidden connections and suggests related ideas, transforming information into knowledge.',
  },
  {
    icon: Zap,
    title: lang === 'ar' ? '4. عزز إنتاجيتك' : '4. Supercharge Productivity',
    description: lang === 'ar' ? 'استخدم الملخصات التي تم إنشاؤها بواسطة الذكاء الاصطناعي والترجمات الفورية والإجابات السريعة لتسريع سير عملك.' : 'Utilize AI-generated summaries, instant translations, and quick answers to speed up your workflow.',
  }
];

const HowItWorksSection: FC = () => {
  const [texts, setTexts] = useState<HowItWorksTexts>({
    mainTitle: 'Behind the Magic: How MemoAI Works',
    mainSubtitle: 'Experience a seamless journey from raw information to structured knowledge with our intelligent platform.',
    steps: getSteps('en'),
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      const lang = currentDirection === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'خلف السحر: كيف يعمل MemoAI' : 'Behind the Magic: How MemoAI Works',
        mainSubtitle: lang === 'ar' ? 'جرب رحلة سلسة من المعلومات الأولية إلى المعرفة المنظمة من خلال منصتنا الذكية.' : 'Experience a seamless journey from raw information to structured knowledge with our intelligent platform.',
        steps: getSteps(lang),
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="how-it-works" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-tr from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {texts.steps.map((step, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fadeIn group transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-xl font-semibold text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/70 text-base">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
