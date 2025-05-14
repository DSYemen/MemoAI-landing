import type { FC } from 'react';
import Link from 'next/link';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: FC = () => {
  return (
    <footer id="cta" className="w-full py-16 md:py-20 bg-muted border-t">
      <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center justify-center">
              <BrainCircuit className="h-10 w-10 text-primary" />
              <span className="ml-3 text-3xl font-bold tracking-wide text-foreground">MemoAI</span>
            </Link>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-primary mb-4 sm:text-3xl">Ready to Transform Your Notes?</h3>
            <p className="text-foreground/80 mb-6 text-lg">
              Join thousands of users who are already leveraging the power of AI to organize their thoughts and boost productivity.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
              <Link href="#">Sign Up for Free Beta</Link>
            </Button>
          </div>
          
          <div className="flex justify-center items-center space-x-6 mb-10">
            <a href="#" aria-label="Twitter" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
              <Twitter className="h-7 w-7" />
            </a>
            <a href="#" aria-label="GitHub" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
              <Github className="h-7 w-7" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
              <Linkedin className="h-7 w-7" />
            </a>
          </div>

          <div className="flex flex-col-reverse items-center justify-between pt-8 border-t lg:flex-row">
            <p className="text-sm text-foreground/60 mt-4 lg:mt-0">
              © {new Date().getFullYear()} MemoAI Inc. All rights reserved.
            </p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <Link href="#" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  Terms of Service
                </Link>
              </li>
               <li>
                <Link href="mailto:info@memoai.app" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
