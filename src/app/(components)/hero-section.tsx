import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection: FC = () => {
  return (
    <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              MemoAI: Your Intelligent Knowledge Hub
            </h1>
            <p className="text-lg text-foreground/80 md:text-xl lg:text-2xl">
              Capture, connect, and create with the power of AI. Transform your notes into actionable insights and unlock your full potential.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="#cta">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-md transition-transform hover:scale-105 border-primary/50 hover:bg-primary/5 hover:border-primary text-primary">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl group">
             <Image 
              src="https://placehold.co/800x450/008080/F0F0F0" 
              alt="MemoAI Interface Preview" 
              fill // Use fill instead of layout="fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" // Added sizes attribute
              className="object-cover transition-transform duration-500 group-hover:scale-105" // Use object-cover
              data-ai-hint="app interface"
              priority // Added priority for LCP
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
