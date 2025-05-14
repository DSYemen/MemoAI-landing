
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterTexts {
  brandName: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  privacyPolicy: string;
  termsOfService: string;
  contactUs: string;
  allRightsReserved: (year: number) => string;
}

const Footer: FC = () => {
    const [texts, setTexts] = useState<FooterTexts>({
    brandName: 'MemoAI',
    ctaTitle: 'Ready to Transform Your Notes?',
    ctaSubtitle: 'Join thousands of users who are already leveraging the power of AI to organize their thoughts and boost productivity.',
    ctaButton: 'Sign Up for Free Beta',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactUs: 'Contact Us',
    allRightsReserved: (year) => `© ${year} MemoAI Inc. All rights reserved.`,
  });

  useEffect(() => {
    const handleDirectionChange = () => {
      const currentDirection = document.documentElement.dir || 'ltr';
      if (currentDirection === 'rtl') {
        setTexts({
          brandName: 'ميمو AI',
          ctaTitle: 'هل أنت مستعد لتغيير طريقة تدوين ملاحظاتك؟',
          ctaSubtitle: 'انضم إلى آلاف المستخدمين الذين يستفيدون بالفعل من قوة الذكاء الاصطناعي لتنظيم أفكارهم وزيادة إنتاجيتهم.',
          ctaButton: 'سجل في النسخة التجريبية المجانية',
          privacyPolicy: 'سياسة الخصوصية',
          termsOfService: 'شروط الخدمة',
          contactUs: 'اتصل بنا',
          allRightsReserved: (year) => `© ${year} شركة ميمو AI. جميع الحقوق محفوظة.`,
        });
      } else {
        setTexts({
          brandName: 'MemoAI',
          ctaTitle: 'Ready to Transform Your Notes?',
          ctaSubtitle: 'Join thousands of users who are already leveraging the power of AI to organize their thoughts and boost productivity.',
          ctaButton: 'Sign Up for Free Beta',
          privacyPolicy: 'Privacy Policy',
          termsOfService: 'Terms of Service',
          contactUs: 'Contact Us',
          allRightsReserved: (year) => `© ${year} MemoAI Inc. All rights reserved.`,
        });
      }
    };

    handleDirectionChange(); // Initial call
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);


  return (
    <footer id="cta" className="w-full py-16 md:py-20 bg-muted border-t">
      <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center justify-center">
              <BrainCircuit className="h-10 w-10 text-primary" />
              <span className="ml-3 text-3xl font-bold tracking-wide text-foreground">{texts.brandName}</span>
            </Link>
          </div>

          <div className="max-w-xl mx-auto mb-12 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-primary mb-4 sm:text-3xl">{texts.ctaTitle}</h3>
            <p className="text-foreground/80 mb-6 text-lg">
              {texts.ctaSubtitle}
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
              <Link href="#">{texts.ctaButton}</Link>
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
              {texts.allRightsReserved(new Date().getFullYear())}
            </p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <Link href="#" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  {texts.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  {texts.termsOfService}
                </Link>
              </li>
               <li>
                <Link href="mailto:info@memoai.app" className="text-sm text-foreground/60 transition-colors duration-300 hover:text-accent">
                  {texts.contactUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
