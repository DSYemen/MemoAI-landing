
"use client";

import { Link as RouterLink } from 'react-router-dom'; // Changed import
import { useState, useEffect, type FC, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BrainCircuit, Sun, Moon, AlignLeft, AlignRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
  id: string; // Section ID without '#'
}

const getNavLinks = (lang: string): NavLink[] => [
  { href: '#hero', id: 'hero', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
  { href: '#features', id: 'features', label: lang === 'ar' ? 'الميزات' : 'Features' },
  { href: '#how-it-works', id: 'how-it-works', label: lang === 'ar' ? 'كيف يعمل' : 'How It Works' },
  { href: '#use-cases', id: 'use-cases', label: lang === 'ar' ? 'حالات الاستخدام' : 'Use Cases' },
  { href: '#products', id: 'products', label: lang === 'ar' ? 'المنتجات' : 'Products' },
  { href: '#try-ai', id: 'try-ai', label: lang === 'ar' ? 'جرب AI' : 'Try AI' },
  { href: '#testimonials', id: 'testimonials', label: lang === 'ar' ? 'الشهادات' : 'Testimonials' },
  { href: '#pricing', id: 'pricing', label: lang === 'ar' ? 'الأسعار' : 'Pricing' },
  { href: '#faq', id: 'faq', label: lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' },
];


interface NavbarTexts {
  memoAI: string;
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
  const [activeSection, setActiveSection] = useState<string | null>('hero');


  const updateTextsAndLinks = useCallback((currentDirection: string) => {
    const lang = currentDirection === 'rtl' ? 'ar' : 'en';
    setTexts({
      memoAI: lang === 'ar' ? 'ميمو AI' : 'MemoAI',
      getStarted: lang === 'ar' ? 'ابدأ الآن' : 'Get Started',
      toggleTheme: lang === 'ar' ? 'تبديل المظهر' : 'Toggle theme',
      toggleDirection: lang === 'ar' ? 'تبديل اتجاه النص' : 'Toggle text direction',
      toggleNav: lang === 'ar' ? 'تبديل قائمة التصفح' : 'Toggle navigation menu',
    });
    setCurrentNavLinks(getNavLinks(lang));
  }, []);


  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');

    const storedDirection = localStorage.getItem('direction') || 'ltr';
    setDirection(storedDirection);
    document.documentElement.setAttribute('dir', storedDirection);
    updateTextsAndLinks(storedDirection);
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: storedDirection } }));

    const handleDirectionChange = (event: Event) => {
      const newDirection = (event as CustomEvent).detail.direction;
      updateTextsAndLinks(newDirection);
    };
    window.addEventListener('directionChanged', handleDirectionChange);

    return () => {
      window.removeEventListener('directionChanged', handleDirectionChange);
    };
  }, [updateTextsAndLinks]);

  useEffect(() => {
    if (!mounted) return;

    const sectionElements = currentNavLinks
      .map(link => document.getElementById(link.id))
      .filter(el => el !== null) as HTMLElement[];

    if (sectionElements.length === 0) return;
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        let currentActive: string | null = null;
        let highestVisibleEntry: IntersectionObserverEntry | null = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!highestVisibleEntry || entry.boundingClientRect.top < highestVisibleEntry.boundingClientRect.top) {
                    highestVisibleEntry = entry;
                }
            }
        });

        if (highestVisibleEntry) {
            currentActive = highestVisibleEntry.target.id;
        } else {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY < 50 && sectionElements.find(s => s.id === 'hero')) {
                 currentActive = 'hero';
            } else if (scrollY + windowHeight >= docHeight - 100 && sectionElements.length > 0) {
                 currentActive = sectionElements[sectionElements.length - 1].id;
            }
        }
        if (currentActive) {
            setActiveSection(currentActive);
        }
    };

    const observerOptions = {
      root: null,
      rootMargin: `-${64 + 20}px 0px -${window.innerHeight * 0.55}px 0px`, 
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach(section => { if(section) observer.observe(section); });

    const currentHash = window.location.hash.substring(1);
    let initialSectionSet = false;
    if (currentNavLinks.some(link => link.id === currentHash)) {
        const targetElement = document.getElementById(currentHash);
        if (targetElement) {
            setTimeout(() => { 
                const navbarHeight = 64;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'auto' });
                setActiveSection(currentHash);
            }, 100);
            initialSectionSet = true;
        }
    }
    
    if (!initialSectionSet && window.scrollY < 50 && sectionElements.find(s => s.id === 'hero')) {
        setActiveSection('hero');
    }


    return () => sectionElements.forEach(section => {
      if (section) observer.unobserve(section);
    });
  }, [currentNavLinks, mounted]);


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
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: newDirection } }));
  };

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1); // Keep '#' for querySelector if needed, but getElementById doesn't need it
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = 64; // Height of the sticky navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId); 
      // For react-router-dom, if these were actual routes, you'd use navigate()
      // but for hash links on the same page, this manual scroll is fine.
      // window.history.pushState(null, '', href); // Optionally update URL hash without page jump
    }
    setIsMobileMenuOpen(false);
  };


  if (!mounted) { 
    return (
      <header className="sticky top-0 z-[60] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">MemoAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {getNavLinks('en').map((link) => ( 
              <span key={link.id} className="text-foreground/70">
                {link.label}
              </span>
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
                <Button variant="default" size="sm">Get Started</Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Use <a> tag for hash links if not using react-router-dom for page navigation */}
        <a href="#hero" onClick={(e) => handleNavLinkClick(e, '#hero')} className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{texts.memoAI}</span>
        </a>

        <nav className="hidden md:flex items-center gap-x-2 lg:gap-x-3 text-sm">
          {currentNavLinks.map((link) => (
            <a // Changed from RouterLink to simple <a> for hash scrolling
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={cn(
                "px-2 py-1 rounded-md transition-colors duration-200 ease-in-out",
                "hover:text-primary hover:bg-primary/10",
                activeSection === link.id
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-foreground/70 "
              )}
              aria-label={link.ariaLabel || link.label}
            >
              {link.label}
            </a>
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
              <a href="#cta" onClick={(e) => handleNavLinkClick(e, '#cta')}>{texts.getStarted}</a>
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
                  <a href="#hero" onClick={(e) => handleNavLinkClick(e, '#hero')} className="flex items-center gap-2">
                    <BrainCircuit className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold text-foreground">{texts.memoAI}</span>
                  </a>
                  <nav className="grid gap-4">
                    {currentNavLinks.map((link) => (
                      <a // Changed from RouterLink
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavLinkClick(e, link.href)}
                        className={cn(
                            "py-2 text-lg transition-colors duration-200 ease-in-out",
                            activeSection === link.id
                              ? "text-primary font-semibold"
                              : "text-foreground/70 hover:text-primary"
                          )}
                        aria-label={link.ariaLabel || link.label}
                      >
                        {link.label}
                      </a>
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
                  <Button variant="default" size="lg" asChild onClick={(e) => {handleNavLinkClick(e, '#cta'); setIsMobileMenuOpen(false);}} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href="#cta">{texts.getStarted}</a>
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
