
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageSquareQuote, Users } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  company?: string;
  imageHint: string;
  imageUrl?: string;
  rating: number;
  quote: string;
}

interface TestimonialsSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  testimonials: Testimonial[];
}

const getBaseTestimonials = (lang: string): Omit<Testimonial, 'imageUrl'>[] => [
  {
    name: lang === 'ar' ? 'علياء حسن' : 'Alia Hassan',
    title: lang === 'ar' ? 'مديرة تسويق' : 'Marketing Manager',
    company: lang === 'ar' ? 'شركة تكنولوجيا ناشئة' : 'Tech Startup Inc.',
    imageHint: 'professional woman headshot smiling',
    rating: 5,
    quote: lang === 'ar' ? 'MemoAI أحدث ثورة في طريقة تنظيم فريقنا للمعلومات والمشاريع. مساعد الذكاء الاصطناعي لا يقدر بثمن!' : 'MemoAI has revolutionized how our team organizes information and projects. The AI assistant is invaluable!',
  },
  {
    name: lang === 'ar' ? 'ديفيد لي' : 'David Lee',
    title: lang === 'ar' ? 'باحث دكتوراه' : 'PhD Researcher',
    imageHint: 'male student focused research',
    rating: 5,
    quote: lang === 'ar' ? 'كتطبيق لإدارة المعرفة، MemoAI هو الأفضل. ميزات التنظيم الذكي والبحث السريع وفرت لي ساعات لا تحصى.' : 'As a knowledge management app, MemoAI is top-notch. The smart organization and quick search features have saved me countless hours.',
  },
  {
    name: lang === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed',
    title: lang === 'ar' ? 'مصممة مستقلة' : 'Freelance Designer',
    imageHint: 'creative woman working digital art',
    rating: 4,
    quote: lang === 'ar' ? 'أستخدم MemoAI لجمع الإلهام وتتبع أفكار المشاريع. واجهة المستخدم بديهية والقدرات اللغوية رائعة لعملائي الدوليين.' : 'I use MemoAI for collecting inspiration and tracking project ideas. The UI is intuitive and the language capabilities are great for my international clients.',
  },
   {
    name: lang === 'ar' ? 'يوسف شريف' : 'Youssef Sherif',
    title: lang === 'ar' ? 'طالب جامعي' : 'University Student',
    imageHint: 'young man student library',
    rating: 5,
    quote: lang === 'ar' ? 'ساعدني MemoAI في تنظيم ملاحظات محاضراتي بشكل لم أكن أتخيله. خاصية التلخيص مذهلة قبل الامتحانات!' : 'MemoAI helped me organize my lecture notes like I never imagined. The summarization feature is amazing before exams!',
  }
];


const TestimonialsSection: FC = () => {
  const [texts, setTexts] = useState<TestimonialsSectionTexts>({
    mainTitle: 'Words From Our Users',
    mainSubtitle: 'Hear what people are saying about how MemoAI is transforming their productivity and knowledge management.',
    testimonials: getBaseTestimonials('en').map(t => ({ ...t, imageUrl: `https://placehold.co/100x100/4A3F7A/FFFFFF/png?text=${t.name.charAt(0)}`}))
  });
   const [currentDirection, setCurrentDirection] = useState('ltr');


  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      const lang = dir === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'كلمات من مستخدمينا' : 'Words From Our Users',
        mainSubtitle: lang === 'ar' ? 'استمع إلى ما يقوله الناس حول كيفية تغيير MemoAI لإنتاجيتهم وإدارة معارفهم.' : 'Hear what people are saying about how MemoAI is transforming their productivity and knowledge management.',
        testimonials: getBaseTestimonials(lang).map(t => ({ ...t, imageUrl: `https://placehold.co/100x100/4A3F7A/FFFFFF/png?text=${encodeURIComponent(t.name.charAt(0))}`}))
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="testimonials" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {texts.testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fadeIn group transform hover:-translate-y-1">
              <CardContent className={`p-6 text-center md:text-${currentDirection === 'rtl' ? 'right' : 'left'}`}>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md shrink-0">
                    <img
                      src={testimonial.imageUrl!}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                      data-ai-hint={testimonial.imageHint}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}{testimonial.company && `, ${testimonial.company}`}</p>
                    <div className="flex justify-center md:justify-start mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-4 text-foreground/80 italic relative">
                  <MessageSquareQuote className={`absolute -top-2 ${currentDirection === 'rtl' ? 'md:-right-2 -left-2' : 'md:-left-2 -right-2'}  h-8 w-8 text-accent/30 transform ${currentDirection === 'rtl' ? 'scale-x-[-1]' : ''}`} />
                  <p className="leading-relaxed">{testimonial.quote}</p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
