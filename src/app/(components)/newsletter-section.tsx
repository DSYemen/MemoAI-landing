
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface NewsletterSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  inputPlaceholder: string;
  buttonText: string;
  successTitle: string;
  successDescription: (email: string) => string;
  errorTitle: string;
  errorDescription: string;
  invalidEmailTitle: string;
  invalidEmailDescription: string;
}

const NewsletterSection: FC = () => {
  const [email, setEmail] = useState('');
  const [texts, setTexts] = useState<NewsletterSectionTexts>({
    mainTitle: 'Stay Updated with MemoAI',
    mainSubtitle: 'Subscribe to our newsletter for the latest product updates, AI insights, and special offers.',
    inputPlaceholder: 'Enter your email address',
    buttonText: 'Subscribe Now',
    successTitle: 'Subscription Successful!',
    successDescription: (email) => `Thank you for subscribing! A confirmation has been sent to ${email}.`,
    errorTitle: 'Subscription Failed',
    errorDescription: 'Could not process your subscription. Please try again later.',
    invalidEmailTitle: 'Invalid Email',
    invalidEmailDescription: 'Please enter a valid email address.',
  });
  const { toast } = useToast();
  const [currentDirection, setCurrentDirection] = useState('ltr');


  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      const lang = dir === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'ابق على اطلاع دائم مع MemoAI' : 'Stay Updated with MemoAI',
        mainSubtitle: lang === 'ar' ? 'اشترك في نشرتنا الإخبارية للحصول على آخر تحديثات المنتج، رؤى الذكاء الاصطناعي، والعروض الخاصة.' : 'Subscribe to our newsletter for the latest product updates, AI insights, and special offers.',
        inputPlaceholder: lang === 'ar' ? 'أدخل عنوان بريدك الإلكتروني' : 'Enter your email address',
        buttonText: lang === 'ar' ? 'اشترك الآن' : 'Subscribe Now',
        successTitle: lang === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscription Successful!',
        successDescription: (emailAddr) => lang === 'ar' ? `شكرًا لاشتراكك! تم إرسال تأكيد إلى ${emailAddr}.` : `Thank you for subscribing! A confirmation has been sent to ${emailAddr}.`,
        errorTitle: lang === 'ar' ? 'فشل الاشتراك' : 'Subscription Failed',
        errorDescription: lang === 'ar' ? 'تعذر معالجة اشتراكك. يرجى المحاولة مرة أخرى لاحقًا.' : 'Could not process your subscription. Please try again later.',
        invalidEmailTitle: lang === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid Email',
        invalidEmailDescription: lang === 'ar' ? 'الرجاء إدخال عنوان بريد إلكتروني صالح.' : 'Please enter a valid email address.',
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast({
        title: texts.invalidEmailTitle,
        description: texts.invalidEmailDescription,
        variant: 'destructive',
      });
      return;
    }
    // Simulate API call
    console.log('Subscribing email:', email);
    // You would typically make an API call here to subscribe the user
    // For demo purposes, we'll just show a success message
    toast({
      title: texts.successTitle,
      description: texts.successDescription(email),
    });
    setEmail(''); // Reset email input
  };

  return (
    <section id="newsletter" className="w-full py-20 md:py-24 bg-gradient-to-r from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fadeIn">
            <Input
              type="email"
              placeholder={texts.inputPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`flex-grow text-base shadow-md focus:ring-accent ${currentDirection === 'rtl' ? 'text-right' : 'text-left'}`}
              aria-label={texts.inputPlaceholder}
            />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
              {texts.buttonText}
              <Send className={`h-4 w-4 ${currentDirection === 'rtl' ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

    