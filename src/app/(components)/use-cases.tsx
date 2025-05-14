"use client";
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Briefcase, Lightbulb, Users } from 'lucide-react';

interface UseCase {
  icon: FC<any>;
  imagePlaceholder: string;
  imageHint: string;
  title: string;
  description: string;
}

interface UseCasesTexts {
  mainTitle: string;
  mainSubtitle: string;
  cases: UseCase[];
}

const getUseCases = (lang: string): UseCase[] => [
  {
    icon: BookOpen,
    imagePlaceholder: 'https://placehold.co/600x400.png',
    imageHint: 'student studying',
    title: lang === 'ar' ? 'الطلاب والباحثون' : 'Students & Researchers',
    description: lang === 'ar' ? 'نظم ملاحظات المحاضرات، وأوراق البحث، ومواد الدراسة بكفاءة. دع الذكاء الاصطناعي يساعدك في العثور على الروابط وتسريع أبحاثك.' : 'Organize lecture notes, research papers, and study materials efficiently. Let AI help you find connections and accelerate your research.',
  },
  {
    icon: Briefcase,
    imagePlaceholder: 'https://placehold.co/600x400.png',
    imageHint: 'professionals meeting',
    title: lang === 'ar' ? 'المحترفون والفرق' : 'Professionals & Teams',
    description: lang === 'ar' ? 'التقط محاضر الاجتماعات، وتتبع تقدم المشاريع، وشارك قواعد المعرفة. عزز التعاون والإنتاجية في مكان عملك.' : 'Capture meeting minutes, track project progress, and share knowledge bases. Enhance collaboration and productivity in your workplace.',
  },
  {
    icon: Lightbulb,
    imagePlaceholder: 'https://placehold.co/600x400.png',
    imageHint: 'creative workspace',
    title: lang === 'ar' ? 'المبدعون والمفكرون' : 'Creatives & Thinkers',
    description: lang === 'ar' ? 'اجمع الإلهام، وطور الأفكار، وصمم مشاريعك القادمة. MemoAI هو لوحتك الرقمية الذكية لتنمية الإبداع.' : 'Gather inspiration, develop ideas, and outline your next big projects. MemoAI is your smart digital canvas for fostering creativity.',
  },
  {
    icon: Users,
    imagePlaceholder: 'https://placehold.co/600x400.png',
    imageHint: 'personal journal',
    title: lang === 'ar' ? 'إدارة المعرفة الشخصية' : 'Personal Knowledge Management',
    description: lang === 'ar' ? 'قم ببناء "عقلك الثاني". نظم أفكارك وتعلمك واهتماماتك في مكان واحد آمن وذكي ويمكن البحث فيه.' : 'Build your "second brain". Organize your thoughts, learnings, and interests in one secure, intelligent, and searchable place.',
  },
];

const UseCasesSection: FC = () => {
  const [texts, setTexts] = useState<UseCasesTexts>({
    mainTitle: 'MemoAI: Tailored For You',
    mainSubtitle: 'Discover how MemoAI adapts to various needs, helping everyone unlock their full potential.',
    cases: getUseCases('en'),
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      const lang = currentDirection === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'MemoAI: مصمم خصيصًا لك' : 'MemoAI: Tailored For You',
        mainSubtitle: lang === 'ar' ? 'اكتشف كيف يتكيف MemoAI مع الاحتياجات المختلفة، مما يساعد الجميع على إطلاق العنان لإمكاناتهم الكاملة.' : 'Discover how MemoAI adapts to various needs, helping everyone unlock their full potential.',
        cases: getUseCases(lang),
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="use-cases" className="w-full py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {texts.cases.map((useCase, index) => (
            <Card key={index} className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card group animate-fadeIn">
              <div className="relative h-56 w-full">
                <Image
                  src={useCase.imagePlaceholder}
                  alt={useCase.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={useCase.imageHint}
                />
              </div>
              <CardHeader className="flex flex-row items-start gap-3 pt-4">
                 <div className="bg-primary/10 p-3 rounded-lg mt-1">
                    <useCase.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                 </div>
                <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-primary">{useCase.title}</CardTitle>
                    <CardDescription className="text-base text-foreground/80 pt-1">{useCase.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;