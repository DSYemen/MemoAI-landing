
"use client";

import Link from 'next/link';
import { useState, useEffect, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BrainCircuit, Sun, Moon, AlignLeft, AlignRight } from 'lucide-react'; // Changed icons

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#ai-preview', label: 'AI Preview' },
  { href: '#language-support', label: 'Languages' },
];

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>('light');
  const [direction, setDirection] = useState<string>('ltr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Theme initialization
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }


    // Direction initialization
    const storedDirection = localStorage.getItem('direction');
    if (storedDirection) {
      setDirection(storedDirection);
      document.documentElement.setAttribute('dir', storedDirection);
    } else {
      setDirection('ltr');
      document.documentElement.setAttribute('dir', 'ltr');
      localStorage.setItem('direction', 'ltr');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDirection = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    localStorage.setItem('direction', newDirection);
    document.documentElement.setAttribute('dir', newDirection);
  };

  if (!mounted) {
    // Render placeholder icons or null to prevent hydration mismatch
    // This helps ensure server and client are in sync initially for these dynamic icons
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">MemoAI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
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
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
              <Sun className="h-5 w-5" /> {/* Default or placeholder */}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Toggle text direction">
              <AlignLeft className="h-5 w-5" /> {/* Default or placeholder */}
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
              {/* SheetContent can remain, its internal dynamic parts handled by its own state */}
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
          <span className="text-xl font-bold text-foreground">MemoAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
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
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDirection} aria-label="Toggle text direction">
            {direction === 'ltr' ? <AlignRight className="h-5 w-5" /> : <AlignLeft className="h-5 w-5" />}
          </Button>
          <div className="hidden md:flex items-center gap-4 ml-2">
            <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#cta">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
                  <BrainCircuit className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold text-foreground">MemoAI</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="py-2 text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => { toggleTheme(); setIsMobileMenuOpen(false);}} className="w-full">
                    {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                    Toggle Theme
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { toggleDirection(); setIsMobileMenuOpen(false);}} className="w-full">
                    {direction === 'ltr' ? <AlignRight className="mr-2 h-4 w-4" /> : <AlignLeft className="mr-2 h-4 w-4" />}
                    Toggle Direction
                    </Button>
                </div>
                <Button variant="default" size="lg" asChild onClick={() => setIsMobileMenuOpen(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#cta">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
