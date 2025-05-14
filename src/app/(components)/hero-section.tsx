
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface HeroTexts {
  title: string;
  subtitle: string;
  getStarted: string;
  learnMore: string;
}

const HeroSection: FC = () => {
  const [texts, setTexts] = useState<HeroTexts>({
    title: 'MemoAI: Your Intelligent Knowledge Hub',
    subtitle: 'Capture, connect, and create with the power of AI. Transform your notes into actionable insights and unlock your full potential.',
    getStarted: 'Get Started Free',
    learnMore: 'Learn More',
  });
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      setDirection(currentDirection);
      if (currentDirection === 'rtl') {
        setTexts({
          title: 'MemoAI: مركزك المعرفي الذكي',
          subtitle: 'التقط، تواصل، وأنشئ بقوة الذكاء الاصطناعي. حوّل ملاحظاتك إلى رؤى قابلة للتنفيذ واطلق العنان لإمكاناتك الكاملة.',
          getStarted: 'ابدأ مجانًا',
          learnMore: 'اعرف المزيد',
        });
      } else {
        setTexts({
          title: 'MemoAI: Your Intelligent Knowledge Hub',
          subtitle: 'Capture, connect, and create with the power of AI. Transform your notes into actionable insights and unlock your full potential.',
          getStarted: 'Get Started Free',
          learnMore: 'Learn More',
        });
      }
    };

    handleDirectionChange(); // Initial call
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className={`space-y-6 text-center ${direction === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {texts.title}
            </h1>
            <p className="text-lg text-foreground/80 md:text-xl lg:text-2xl">
              {texts.subtitle}
            </p>
            <div className={`flex flex-col gap-4 sm:flex-row sm:justify-center ${direction === 'rtl' ? 'md:justify-end' : 'md:justify-start'}`}>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="#cta">{texts.getStarted}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-md transition-transform hover:scale-105 border-primary/50 hover:bg-primary/5 hover:border-primary text-primary">
                <Link href="#features">{texts.learnMore}</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl group animate-fadeIn">
             <Image 
              src="https://placehold.co/800x450/180A4B/F0F0F0" 
              alt="MemoAI Interface Preview" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="app interface"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
