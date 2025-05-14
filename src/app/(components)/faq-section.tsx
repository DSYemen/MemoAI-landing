"use client";
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqTexts {
  mainTitle: string;
  mainSubtitle: string;
  faqs: FaqItem[];
}

const getFaqs = (lang: string): FaqItem[] => [
  {
    question: lang === 'ar' ? 'هل MemoAI مجاني للاستخدام؟' : 'Is MemoAI free to use?',
    answer: lang === 'ar' ? 'نعم، يقدم MemoAI خطة مجانية سخية مع ميزات أساسية. لدينا أيضًا خطط متميزة للمستخدمين المتقدمين والفرق التي تبحث عن وظائف إضافية وحدود أعلى.' : 'Yes, MemoAI offers a generous free plan with core features. We also have premium plans for power users and teams looking for additional functionality and higher limits.',
  },
  {
    question: lang === 'ar' ? 'ما مدى أمان بياناتي مع MemoAI؟' : 'How secure is my data with MemoAI?',
    answer: lang === 'ar' ? 'نحن نأخذ أمن البيانات على محمل الجد. يتم تشفير جميع بياناتك أثناء النقل وفي حالة عدم النشاط. نستخدم ممارسات الأمان المتوافقة مع معايير الصناعة لحماية معلوماتك.' : 'We take data security very seriously. All your data is encrypted in transit and at rest. We use industry-standard security practices to protect your information.',
  },
  {
    question: lang === 'ar' ? 'هل يمكنني استيراد ملاحظاتي الحالية؟' : 'Can I import my existing notes?',
    answer: lang === 'ar' ? 'نعم، نحن ندعم استيراد الملاحظات من العديد من المنصات الشائعة. نعمل باستمرار على إضافة المزيد من خيارات الاستيراد.' : 'Yes, we support importing notes from several popular platforms. We are continuously working on adding more import options.',
  },
  {
    question: lang === 'ar' ? 'ما اللغات التي يدعمها MemoAI؟' : 'What languages does MemoAI support?',
    answer: lang === 'ar' ? 'يدعم MemoAI لغات متعددة لواجهة المستخدم وقدرات الترجمة. يمكنك العمل بلغتك المفضلة والاستفادة من ميزات الترجمة بالذكاء الاصطناعي.' : 'MemoAI supports multiple languages for the user interface and translation capabilities. You can work in your preferred language and leverage AI translation features.',
  },
   {
    question: lang === 'ar' ? 'كيف يساعدني الذكاء الاصطناعي في MemoAI؟' : 'How does AI help in MemoAI?',
    answer: lang === 'ar' ? 'يساعدك الذكاء الاصطناعي في MemoAI على تنظيم ملاحظاتك، وتلخيص النصوص الطويلة، وترجمة المحتوى، واقتراح الروابط بين الأفكار، والإجابة على أسئلتك بناءً على معرفتك المخزنة.' : 'AI in MemoAI helps you organize your notes, summarize long texts, translate content, suggest connections between ideas, and even answer your questions based on your stored knowledge.',
  }
];

const FaqSection: FC = () => {
  const [texts, setTexts] = useState<FaqTexts>({
    mainTitle: 'Frequently Asked Questions',
    mainSubtitle: 'Find answers to common questions about MemoAI. If you need more help, feel free to contact us.',
    faqs: getFaqs('en'),
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      const lang = currentDirection === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
        mainSubtitle: lang === 'ar' ? 'ابحث عن إجابات للأسئلة الشائعة حول MemoAI. إذا كنت بحاجة إلى مزيد من المساعدة، فلا تتردد في الاتصال بنا.' : 'Find answers to common questions about MemoAI. If you need more help, feel free to contact us.',
        faqs: getFaqs(lang),
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="faq" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-bl from-muted to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {texts.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg animate-fadeIn">
                <AccordionTrigger className="p-6 text-lg font-semibold text-primary hover:no-underline text-left rtl:text-right">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-base text-foreground/90">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;