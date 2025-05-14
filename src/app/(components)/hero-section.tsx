
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

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
  const [heroImageUrl, setHeroImageUrl] = useState<string>("https://placehold.co/1200x800/0A0F1E/F0F0F0/png?text=Loading+Cosmic+AI+Portal...");
  const initialImageHint = "expansive cosmic vista, nebulae, distant galaxies, with a subtle overlay of abstract AI neural network patterns, digital art, cinematic, breathtaking";

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      setDirection(currentDirection);
      if (currentDirection === 'rtl') {
        setTexts({
          title: 'MemoAI: بوابتك الكونية للذكاء',
          subtitle: 'التقط، تواصل، وأبدع بقوة الذكاء الاصطناعي. حوّل ملاحظاتك إلى رؤى فعالة واكتشف أقصى إمكاناتك.',
          getStarted: 'ابدأ التجربة مجانًا',
          learnMore: 'اكتشف المزيد',
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

    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    
    const fetchHeroImage = async () => {
      try {
        const result = await generateImage({ prompt: initialImageHint });
        if (result.imageDataUri) {
          setHeroImageUrl(result.imageDataUri);
        } else {
          console.warn("Hero image generation did not return a data URI.");
          setHeroImageUrl("https://placehold.co/1200x800/E02020/FFFFFF/png?text=Error+Generating+Image");
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
        setHeroImageUrl("https://placehold.co/1200x800/E02020/FFFFFF/png?text=Error+Generating+Image");
      }
    };

    fetchHeroImage();

    return () => {
      window.removeEventListener('directionChanged', handleDirectionChange);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative w-full h-[calc(100vh-64px)] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImageUrl} 
          alt="Cosmic AI Portal Background" 
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          priority={heroImageUrl.startsWith('https://placehold.co')} 
          data-ai-hint={initialImageHint}
        />
        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-black/70 md:via-black/40 md:to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 animate-fadeIn">
        <div 
          className={cn(
            "max-w-3xl text-center mx-auto",
            direction === 'rtl' ? 'md:text-right md:mr-0 md:ml-auto' : 'md:text-left md:ml-0 md:mr-auto'
          )}
        >
          <h1 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-fadeIn" 
            style={{animationDelay: '0.2s', textShadow: '0px 4px 12px rgba(var(--primary-hsl), 0.5), 0 0 15px rgba(0,0,0,0.7)'}}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground/80 filter brightness-125">
              {texts.title.split(': ')[0]}:
            </span>
            <span className="block mt-1 md:mt-2 text-primary-foreground/90">
              {texts.title.split(': ')[1]}
            </span>
          </h1>
          <p 
            className="mt-6 max-w-xl text-lg text-primary-foreground/80 md:text-xl lg:text-2xl animate-fadeIn mx-auto" 
            style={{animationDelay: '0.4s', textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}
          >
            {texts.subtitle}
          </p>
          <div 
            className={cn(
              "mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fadeIn",
              direction === 'rtl' ? 'md:justify-end' : 'md:justify-start'
            )}
            style={{animationDelay: '0.6s'}}
          >
            <Button 
              size="lg" 
              asChild 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl transition-all hover:scale-105 hover:shadow-accent/50 animate-pulse-slow border-2 border-accent-foreground/30"
              style={{animationDuration: '3s'}}
            >
              <Link href="#cta">
                <Sparkles className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" /> 
                {texts.getStarted}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="shadow-lg transition-all hover:scale-105 border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground text-primary-foreground backdrop-blur-sm bg-white/5"
            >
              <Link href="#features">{texts.learnMore}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

