
import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Briefcase, Lightbulb, Users } from 'lucide-react';
import { generateImage } from '@/ai/flows/generate-image-flow';

interface UseCaseContent {
  icon: FC<any>;
  imageHint: string;
  title: string;
  description: string;
  imageUrl?: string; 
}

interface UseCasesTexts {
  mainTitle: string;
  mainSubtitle: string;
}

const getBaseUseCases = (lang: string): Omit<UseCaseContent, 'imageUrl'>[] => [
  {
    icon: BookOpen,
    imageHint: 'student using a futuristic AI-powered tablet for research, bright and focused, digital art, knowledge visualization',
    title: lang === 'ar' ? 'الطلاب والباحثون' : 'Students & Researchers',
    description: lang === 'ar' ? 'نظم ملاحظات المحاضرات، وأوراق البحث، ومواد الدراسة بكفاءة. دع الذكاء الاصطناعي يساعدك في العثور على الروابط وتسريع أبحاثك.' : 'Organize lecture notes, research papers, and study materials efficiently. Let AI help you find connections and accelerate your research.',
  },
  {
    icon: Briefcase,
    imageHint: 'diverse team of professionals in a modern office collaborating using AI-driven data visualizations on a large screen, productive, digital art',
    title: lang === 'ar' ? 'المحترفون والفرق' : 'Professionals & Teams',
    description: lang === 'ar' ? 'التقط محاضر الاجتماعات، وتتبع تقدم المشاريع، وشارك قواعد المعرفة. عزز التعاون والإنتاجية في مكان عملك.' : 'Capture meeting minutes, track project progress, and share knowledge bases. Enhance collaboration and productivity in your workplace.',
  },
  {
    icon: Lightbulb,
    imageHint: 'artist\'s vibrant and inspiring digital workspace with AI tools suggesting creative ideas on a holographic display, innovative, digital art',
    title: lang === 'ar' ? 'المبدعون والمفكرون' : 'Creatives & Thinkers',
    description: lang === 'ar' ? 'اجمع الإلهام، وطور الأفكار، وصمم مشاريعك القادمة. MemoAI هو لوحتك الرقمية الذكية لتنمية الإبداع.' : 'Gather inspiration, develop ideas, and outline your next big projects. MemoAI is your smart digital canvas for fostering creativity.',
  },
  {
    icon: Users,
    imageHint: 'individual peacefully organizing their thoughts and memories using a sleek personal AI knowledge management device, serene, digital art, connected ideas',
    title: lang === 'ar' ? 'إدارة المعرفة الشخصية' : 'Personal Knowledge Management',
    description: lang === 'ar' ? 'قم ببناء "عقلك الثاني". نظم أفكارك وتعلمك واهتماماتك في مكان واحد آمن وذكي ويمكن البحث فيه.' : 'Build your "second brain". Organize your thoughts, learnings, and interests in one secure, intelligent, and searchable place.',
  },
];

const UseCasesSection: FC = () => {
  const [texts, setTexts] = useState<UseCasesTexts>({
    mainTitle: 'MemoAI: Tailored For You',
    mainSubtitle: 'Discover how MemoAI adapts to various needs, helping everyone unlock their full potential.',
  });
  const [useCasesContent, setUseCasesContent] = useState<UseCaseContent[]>([]);

  const fetchAndSetImages = useCallback(async (currentLang: string) => {
    const baseCases = getBaseUseCases(currentLang);
    setUseCasesContent(baseCases.map(uc => ({ 
        ...uc, 
        imageUrl: `https://placehold.co/600x400/180A4B/F0F0F0/png?text=Loading:${uc.title.substring(0,8)}...` 
    })));

    const updatedCasesWithImages = await Promise.all(
      baseCases.map(async (useCase) => {
        try {
          // Simulating placeholder for now
          // const result = await generateImage({ prompt: useCase.imageHint });
          // return { ...useCase, imageUrl: result.imageDataUri };
          return { ...useCase, imageUrl: `https://placehold.co/600x400/180A4B/F0F0F0/png?text=${encodeURIComponent(useCase.title)}` };

        } catch (error) {
          console.error(`Failed to generate image for ${useCase.title}:`, error);
          return { ...useCase, imageUrl: `https://placehold.co/600x400/E02020/FFFFFF/png?text=Error:${encodeURIComponent(useCase.title.substring(0,8))}` };
        }
      })
    );
    setUseCasesContent(updatedCasesWithImages);
  }, []);

  useEffect(() => {
    const currentDirection = document.documentElement.dir || 'ltr';
    const lang = currentDirection === 'rtl' ? 'ar' : 'en';
    
    setTexts({
      mainTitle: lang === 'ar' ? 'MemoAI: مصمم خصيصًا لك' : 'MemoAI: Tailored For You',
      mainSubtitle: lang === 'ar' ? 'اكتشف كيف يتكيف MemoAI مع الاحتياجات المختلفة، مما يساعد الجميع على إطلاق العنان لإمكاناتهم الكاملة.' : 'Discover how MemoAI adapts to various needs, helping everyone unlock their full potential.',
    });
    fetchAndSetImages(lang);

    const handleDirectionChangeInternal = () => {
      const newDirection = document.documentElement.dir || 'ltr';
      const newLang = newDirection === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: newLang === 'ar' ? 'MemoAI: مصمم خصيصًا لك' : 'MemoAI: Tailored For You',
        mainSubtitle: newLang === 'ar' ? 'اكتشف كيف يتكيف MemoAI مع الاحتياجات المختلفة، مما يساعد الجميع على إطلاق العنان لإمكاناتهم الكاملة.' : 'Discover how MemoAI adapts to various needs, helping everyone unlock their full potential.',
      });
      fetchAndSetImages(newLang);
    };
    
    window.addEventListener('directionChanged', handleDirectionChangeInternal);
    return () => window.removeEventListener('directionChanged', handleDirectionChangeInternal);
  }, [fetchAndSetImages]);

  return (
    <section id="use-cases" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-tl from-background via-muted/50 to-secondary/5">
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
          {useCasesContent.map((useCase, index) => (
            <Card key={index} className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card group animate-fadeIn">
              <div className="relative h-56 w-full">
                <img
                  src={useCase.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(useCase.title)}`}
                  alt={`AI Generated: ${useCase.title}`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={useCase.imageHint}
                  loading="lazy"
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
