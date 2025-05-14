
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import FeatureCard from './feature-card';
import { Brain, Languages as LucideLanguages, Zap, Users } from 'lucide-react';

interface Feature {
  icon: FC<any>; 
  title: string;
  description: string;
}

interface FeatureShowcaseTexts {
  mainTitle: string;
  mainSubtitle: string;
  features: Feature[];
}

const getFeatures = (lang: string): Feature[] => [
  {
    icon: Brain,
    title: lang === 'ar' ? 'تنظيم ذكي' : 'Smart Organization',
    description: lang === 'ar' ? 'يقوم الذكاء الاصطناعي بتصنيف ملاحظاتك، وتحديد الموضوعات الرئيسية، واقتراح الاتصالات ذات الصلة بذكاء، مما يجعل معرفتك متاحة على الفور.' : 'AI categorizes your notes, identifies key themes, and intelligently suggests relevant connections, making your knowledge instantly accessible.',
  },
  {
    icon: LucideLanguages,
    title: lang === 'ar' ? 'دعم لغات عالمي' : 'Global Language Support',
    description: lang === 'ar' ? 'اعمل بسلاسة بلغتك المفضلة. يوفر MemoAI دعمًا قويًا للنصوص متعددة الاتجاهات وقدرات ترجمة فورية.' : 'Work seamlessly in your preferred language. MemoAI offers robust multi-directional text support and instant translation capabilities.',
  },
  {
    icon: Zap,
    title: lang === 'ar' ? 'رؤى فورية بالذكاء الاصطناعي' : 'Instant AI Insights',
    description: lang === 'ar' ? 'حوّل المحتوى الخاص بك بسرعة. قم بتلخيص الأفكار أو توسيعها أو إعادة صياغة النص بسرعة باستخدام مساعدنا المدمج للذكاء الاصطناعي.' : 'Transform your content on the fly. Quickly summarize, expand ideas, or rephrase text with our integrated AI assistant.',
  },
  {
    icon: Users,
    title: lang === 'ar' ? 'مساحات تعاونية' : 'Collaborative Spaces',
    description: lang === 'ar' ? 'شارك الملاحظات وقواعد المعرفة بسهولة مع فريقك. عزز الإبداع والإنتاجية في بيئة مشتركة وذكية.' : 'Effortlessly share notes and knowledge bases with your team. Foster creativity and productivity in a shared, intelligent environment.',
  },
];


const FeatureShowcase: FC = () => {
  const [texts, setTexts] = useState<FeatureShowcaseTexts>({
    mainTitle: 'Discover the Power of MemoAI',
    mainSubtitle: 'MemoAI is packed with intelligent features designed to revolutionize how you manage and utilize information.',
    features: getFeatures('en')
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      const lang = currentDirection === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'اكتشف قوة MemoAI' : 'Discover the Power of MemoAI',
        mainSubtitle: lang === 'ar' ? 'MemoAI مليء بالميزات الذكية المصممة لإحداث ثورة في كيفية إدارتك واستخدامك للمعلومات.' : 'MemoAI is packed with intelligent features designed to revolutionize how you manage and utilize information.',
        features: getFeatures(lang)
      });
    };

    handleDirectionChange(); 
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);


  return (
    <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-bl from-background via-muted/50 to-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          {texts.features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="animate-fadeIn"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
