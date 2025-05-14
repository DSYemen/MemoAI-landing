
"use client";

import Link from 'next/link';
import { useState, useEffect, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BrainCircuit, Sun, Moon, AlignLeft, AlignRight } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
}

const getNavLinks = (lang: string): NavLink[] => [
  { href: '#features', label: lang === 'ar' ? 'الميزات' : 'Features' },
  { href: '#how-it-works', label: lang === 'ar' ? 'كيف يعمل' : 'How It Works' },
  { href: '#use-cases', label: lang === 'ar' ? 'حالات الاستخدام' : 'Use Cases' },
  { href: '#ai-preview', label: lang === 'ar' ? 'معاينة AI' : 'AI Preview' },
  { href: '#language-support', label: lang === 'ar' ? 'اللغات' : 'Languages' },
  { href: '#faq', label: lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
];


interface NavbarTexts {
  memoAI: string;
  // features: string; // No longer needed directly as getNavLinks handles it
  // aiPreview: string;
  // languages: string;
  getStarted: string;
  toggleTheme: string;
  toggleDirection: string;
  toggleNav: string;
}

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>('light');
  const [direction, setDirection] = useState<string>('ltr');
  const [mounted, setMounted] = useState(false);
  const [texts, setTexts] = useState<NavbarTexts>({
    memoAI: 'MemoAI',
    getStarted: 'Get Started',
    toggleTheme: 'Toggle theme',
    toggleDirection: 'Toggle text direction',
    toggleNav: 'Toggle navigation menu',
  });
  const [currentNavLinks, setCurrentNavLinks] = useState<NavLink[]>(getNavLinks('en'));


  const updateTextsAndLinks = (currentDirection: string) => {
    const lang = currentDirection === 'rtl' ? 'ar' : 'en';
    setTexts({
      memoAI: lang === 'ar' ? 'ميمو AI' : 'MemoAI',
      getStarted: lang === 'ar' ? 'ابدأ الآن' : 'Get Started',
      toggleTheme: lang === 'ar' ? 'تبديل المظهر' : 'Toggle theme',
      toggleDirection: lang === 'ar' ? 'تبديل اتجاه النص' : 'Toggle text direction',
      toggleNav: lang === 'ar' ? 'تبديل قائمة التصفح' : 'Toggle navigation menu',
    });
    setCurrentNavLinks(getNavLinks(lang));
  };


  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');

    const storedDirection = localStorage.getItem('direction') || 'ltr';
    setDirection(storedDirection);
    document.documentElement.setAttribute('dir', storedDirection);
    updateTextsAndLinks(storedDirection); // Use the combined function
    // Dispatch initial direction for other components
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: storedDirection } }));


    const handleDirectionChange = (event: Event) => {
      const newDirection = (event as CustomEvent).detail.direction;
      // No need to setDirection here as it's managed by toggleDirection
      updateTextsAndLinks(newDirection);
    };
    // Listen to the global direction change event
    window.addEventListener('directionChanged', handleDirectionChange);

    return () => {
      window.removeEventListener('directionChanged', handleDirectionChange);
    };

  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleDirection = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection); 
    localStorage.setItem('direction', newDirection);
    document.documentElement.setAttribute('dir', newDirection);
    updateTextsAndLinks(newDirection); 
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: newDirection } }));
  };


  if (!mounted) {
    // Simplified skeleton for SSR/initial load to prevent layout shifts
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">MemoAI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {getNavLinks('en').map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/70 transition-colors hover:text-foreground"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme (placeholder)">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Toggle text direction (placeholder)">
              <AlignLeft className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-4 ml-2">
                <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#cta">Get Started</Link>
                </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{texts.memoAI}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-4 lg:gap-x-6 text-sm font-medium">
          {currentNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
              prefetch={false}
              aria-label={link.ariaLabel || link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={texts.toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDirection} aria-label={texts.toggleDirection}>
            {direction === 'ltr' ? <AlignRight className="h-5 w-5" /> : <AlignLeft className="h-5 w-5" />}
          </Button>
          <div className="hidden md:flex items-center gap-4 ml-2">
            <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#cta">{texts.getStarted}</Link>
            </Button>
          </div>
        

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{texts.toggleNav}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={direction === 'rtl' ? 'left' : 'right'}>
                <div className="grid gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
                    <BrainCircuit className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold text-foreground">{texts.memoAI}</span>
                  </Link>
                  <nav className="grid gap-4">
                    {currentNavLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="py-2 text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
                        prefetch={false}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label={link.ariaLabel || link.label}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => { toggleTheme(); setIsMobileMenuOpen(false);}} className="w-full">
                      {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                      {texts.toggleTheme}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { toggleDirection(); setIsMobileMenuOpen(false);}} className="w-full">
                      {direction === 'ltr' ? <AlignRight className="mr-2 h-4 w-4" /> : <AlignLeft className="mr-2 h-4 w-4" />}
                      {texts.toggleDirection}
                      </Button>
                  </div>
                  <Button variant="default" size="lg" asChild onClick={() => setIsMobileMenuOpen(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="#cta">{texts.getStarted}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
