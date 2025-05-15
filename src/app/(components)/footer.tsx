
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BrainCircuit, Github, Twitter, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterTexts {
  brandName: string;
  brandSlogan: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  navLinksTitle: string;
  navLinks: { label: string; href: string }[];
  legalLinksTitle: string;
  legalLinks: { label: string; href: string }[];
  contactLinksTitle: string;
  contactEmail: string;
  contactPhone?: string;
  socialMediaTitle: string;
  allRightsReserved: (year: number) => string;
}

const getFooterTexts = (lang: string): FooterTexts => {
  const commonNavLinks = [
    { id: 'features', defaultLabel: 'Features', arLabel: 'الميزات', href: '#features' },
    { id: 'products', defaultLabel: 'Products', arLabel: 'المنتجات', href: '#products' },
    { id: 'pricing', defaultLabel: 'Pricing', arLabel: 'الأسعار', href: '#pricing' },
    { id: 'faq', defaultLabel: 'FAQ', arLabel: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const commonLegalLinks = [
    { id: 'privacy', defaultLabel: 'Privacy Policy', arLabel: 'سياسة الخصوصية', href: '#' },
    { id: 'terms', defaultLabel: 'Terms of Service', arLabel: 'شروط الخدمة', href: '#' },
  ];

  return {
    brandName: lang === 'ar' ? 'ميمو AI' : 'MemoAI',
    brandSlogan: lang === 'ar' ? 'ذاكرتك الرقمية الثانية المدعومة بالذكاء الإصطناعي.' : 'Your AI-powered second digitl memory.',
    ctaTitle: lang === 'ar' ? 'هل أنت مستعد لتحويل ملاحظاتك؟' : 'Ready to Transform Your Notes?',
    ctaSubtitle: lang === 'ar' ? 'انضم إلى آلاف المستخدمين الذين يستفيدون بالفعل من قوة الذكاء الاصطناعي.' : 'Join thousands of users already leveraging the power of AI.',
    ctaButton: lang === 'ar' ? 'سجل في النسخة التجريبية' : 'Sign Up for Free Beta',
    navLinksTitle: lang === 'ar' ? 'روابط سريعة' : 'Quick Links',
    navLinks: commonNavLinks.map(link => ({ label: lang === 'ar' ? link.arLabel : link.defaultLabel, href: link.href })),
    legalLinksTitle: lang === 'ar' ? 'قانوني' : 'Legal',
    legalLinks: commonLegalLinks.map(link => ({ label: lang === 'ar' ? link.arLabel : link.defaultLabel, href: link.href })),
    contactLinksTitle: lang === 'ar' ? 'تواصل معنا' : 'Contact Us',
    contactEmail: 'AhmedAlmaghz@gmail.com',
    contactPhone: '00967777781844',
    socialMediaTitle: lang === 'ar' ? 'تابعنا' : 'Follow Us',
    allRightsReserved: (year) => lang === 'ar' ? `© ${year} شركة ميمو AI. جميع الحقوق محفوظة.` : `© ${year} MemoAI Inc. All rights reserved.`,
  };
};


const Footer: FC = () => {
  const [texts, setTexts] = useState<FooterTexts>(getFooterTexts('en'));
  const [currentDirection, setCurrentDirection] = useState('ltr');


  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      setTexts(getFooterTexts(dir === 'rtl' ? 'ar' : 'en'));
    };

    handleDirectionChange(); 
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      event.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = 64; 
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    // For RouterLink, react-router-dom handles navigation
  };


  return (
    <footer id="cta" className="w-full pt-16 md:pt-24 pb-8 bg-muted border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto mb-16 text-center animate-fadeIn">
          <h3 className="text-3xl font-bold text-primary mb-3 sm:text-4xl">{texts.ctaTitle}</h3>
          <p className="text-foreground/80 mb-8 text-lg">
            {texts.ctaSubtitle}
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl transition-transform hover:scale-105 animate-pulse-slow border-2 border-accent-foreground/30" style={{ animationDuration: '3s' }}>
            <a href="#cta" onClick={(e) => handleNavLinkClick(e, '#cta')}>{texts.ctaButton}</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 text-center md:text-left">
          <div className="space-y-4">
            <RouterLink to="/" className="inline-flex items-center justify-center md:justify-start">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className={`ml-3 text-2xl font-bold tracking-wide text-foreground ${currentDirection === 'rtl' ? 'mr-3 ml-0' : 'ml-3'}`}>{texts.brandName}</span>
            </RouterLink>
            <p className="text-sm text-foreground/70">{texts.brandSlogan}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-primary mb-2">{texts.navLinksTitle}</h4>
            <ul className="space-y-2">
              {texts.navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-sm text-foreground/70 transition-colors duration-300 hover:text-accent hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-primary mb-2">{texts.legalLinksTitle}</h4>
            <ul className="space-y-2">
              {texts.legalLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-foreground/70 transition-colors duration-300 hover:text-accent hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-primary mb-2">{texts.contactLinksTitle}</h4>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${texts.contactEmail}`} className="flex items-center justify-center md:justify-start gap-2 text-sm text-foreground/70 transition-colors duration-300 hover:text-accent hover:underline">
                  <Mail className="h-4 w-4" /> {texts.contactEmail}
                </a>
              </li>
              {texts.contactPhone && (
                 <li>
                  <a href={`tel:${texts.contactPhone.replace(/[^\d+]/g, '')}`} className="flex items-center justify-center md:justify-start gap-2 text-sm text-foreground/70 transition-colors duration-300 hover:text-accent hover:underline">
                    <Phone className="h-4 w-4" /> {texts.contactPhone}
                  </a>
                </li>
              )}
            </ul>
            <h4 className="text-lg font-semibold text-primary mb-2 pt-4">{texts.socialMediaTitle}</h4>
             <div className="flex justify-center md:justify-start items-center space-x-4">
                <a href="#" aria-label="Twitter" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" aria-label="GitHub" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-foreground/70 transition-colors duration-300 hover:text-accent">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
          </div>
        </div>
          
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-foreground/60">
            {texts.allRightsReserved(new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
