
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, DollarSign, Zap, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PricingPlanFeature {
  text: string;
  icon: FC<any>;
}
interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingPlanFeature[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
}

interface PricingSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  plans: PricingPlan[];
  popularBadge: string;
}

const getBasePlans = (lang: string): Omit<PricingPlan, 'features'> & { featureKeys: string[] }[] => [
  {
    id: 'free',
    name: lang === 'ar' ? 'الخطة المجانية' : 'Free Plan',
    price: lang === 'ar' ? '0$' : '$0',
    period: lang === 'ar' ? '/شهر' : '/month',
    description: lang === 'ar' ? 'ابدأ مع الأساسيات لتنظيم أفكارك الأولية.' : 'Get started with the basics for your initial idea organization.',
    featureKeys: ['basicOrg', 'limitedAi', 'communitySupport'],
    ctaText: lang === 'ar' ? 'ابدأ مجانًا' : 'Get Started Free',
    ctaLink: '#cta',
  },
  {
    id: 'pro',
    name: lang === 'ar' ? 'الخطة الاحترافية' : 'Pro Plan',
    price: lang === 'ar' ? '9$' : '$9',
    period: lang === 'ar' ? '/شهر' : '/month',
    description: lang === 'ar' ? 'للمستخدمين الأفراد الذين يتطلعون لزيادة إنتاجيتهم بالذكاء الاصطناعي.' : 'For individual users looking to boost productivity with AI.',
    featureKeys: ['advancedOrg', 'fullAi', 'multiLanguage', 'prioritySupport', 'collaboration'],
    ctaText: lang === 'ar' ? 'اختر الخطة الاحترافية' : 'Choose Pro Plan',
    ctaLink: '#cta',
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: lang === 'ar' ? 'خطة الشركات' : 'Enterprise Plan',
    price: lang === 'ar' ? 'مخصص' : 'Custom',
    period: lang === 'ar' ? '' : '',
    description: lang === 'ar' ? 'حلول مخصصة للفرق والمؤسسات الكبيرة التي تحتاج إلى أمان متقدم ودعم مخصص.' : 'Tailored solutions for large teams and organizations needing advanced security and dedicated support.',
    featureKeys: ['allPro', 'advancedSecurity', 'dedicatedSupport', 'customIntegrations', 'sla'],
    ctaText: lang === 'ar' ? 'تواصل مع المبيعات' : 'Contact Sales',
    ctaLink: 'mailto:sales@memoai.app',
  },
];

const getFeatureDetails = (lang: string): { [key: string]: Omit<PricingPlanFeature, 'icon'> & { iconName: string } } => ({
  basicOrg: { text: lang === 'ar' ? 'تنظيم أساسي للملاحظات' : 'Basic Note Organization', iconName: 'CheckCircle' },
  limitedAi: { text: lang === 'ar' ? 'وصول محدود لميزات الذكاء الاصطناعي' : 'Limited AI Feature Access', iconName: 'Zap' },
  communitySupport: { text: lang === 'ar' ? 'دعم عبر المجتمع' : 'Community Support', iconName: 'Users' },
  advancedOrg: { text: lang === 'ar' ? 'تنظيم متقدم للملاحظات (وسوم، مجلدات ذكية)' : 'Advanced Note Organization (Tags, Smart Folders)', iconName: 'CheckCircle' },
  fullAi: { text: lang === 'ar' ? 'وصول كامل لميزات الذكاء الاصطناعي (تلخيص، ترجمة، إنشاء صور)' : 'Full AI Feature Access (Summarize, Translate, Image Gen)', iconName: 'Zap' },
  multiLanguage: { text: lang === 'ar' ? 'دعم متعدد اللغات متكامل' : 'Full Multi-language Support', iconName: 'Languages' },
  prioritySupport: { text: lang === 'ar' ? 'دعم فني ذو أولوية' : 'Priority Support', iconName: 'CheckCircle' },
  collaboration: { text: lang === 'ar' ? 'أدوات تعاون أساسية' : 'Basic Collaboration Tools', iconName: 'Users' },
  allPro: { text: lang === 'ar' ? 'جميع ميزات الخطة الاحترافية' : 'All Pro Plan Features', iconName: 'CheckCircle' },
  advancedSecurity: { text: lang === 'ar' ? 'ميزات أمان متقدمة وتحكم إداري' : 'Advanced Security & Admin Controls', iconName: 'ShieldCheck' },
  dedicatedSupport: { text: lang === 'ar' ? 'مدير حساب مخصص ودعم متميز' : 'Dedicated Account Manager & Premium Support', iconName: 'Users' },
  customIntegrations: { text: lang === 'ar' ? 'تكاملات مخصصة مع أنظمتك' : 'Custom Integrations with Your Systems', iconName: 'Zap' },
  sla: { text: lang === 'ar' ? 'اتفاقية مستوى الخدمة (SLA)' : 'Service Level Agreement (SLA)', iconName: 'CheckCircle' },
});

const iconMap: { [key: string]: FC<any> } = {
  CheckCircle, Zap, Users, ShieldCheck, Languages: CheckCircle // Temp fix for languages icon, assuming it's a feature check
};


const PricingSection: FC = () => {
  const [texts, setTexts] = useState<PricingSectionTexts>(() => {
    const lang = 'en';
    const basePlans = getBasePlans(lang);
    const featureDetails = getFeatureDetails(lang);
    return {
      mainTitle: lang === 'ar' ? 'خطط أسعار مرنة تناسب احتياجاتك' : 'Flexible Pricing Plans for Your Needs',
      mainSubtitle: lang === 'ar' ? 'اختر الخطة التي تمكنك من تحقيق أقصى استفادة من MemoAI، سواء كنت مستخدمًا فرديًا أو فريقًا كبيرًا.' : 'Choose the plan that empowers you to get the most out of MemoAI, whether you\'re an individual or a large team.',
      plans: basePlans.map(plan => ({
        ...plan,
        features: plan.featureKeys.map(key => ({
          text: featureDetails[key].text,
          icon: iconMap[featureDetails[key].iconName] || CheckCircle,
        }))
      })),
      popularBadge: lang === 'ar' ? 'الأكثر شيوعًا' : 'Most Popular',
    };
  });
  const [currentDirection, setCurrentDirection] = useState('ltr');

  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      const lang = dir === 'rtl' ? 'ar' : 'en';
      const basePlans = getBasePlans(lang);
      const featureDetails = getFeatureDetails(lang);
      setTexts({
        mainTitle: lang === 'ar' ? 'خطط أسعار مرنة تناسب احتياجاتك' : 'Flexible Pricing Plans for Your Needs',
        mainSubtitle: lang === 'ar' ? 'اختر الخطة التي تمكنك من تحقيق أقصى استفادة من MemoAI، سواء كنت مستخدمًا فرديًا أو فريقًا كبيرًا.' : 'Choose the plan that empowers you to get the most out of MemoAI, whether you\'re an individual or a large team.',
        plans: basePlans.map(plan => ({
          ...plan,
          features: plan.featureKeys.map(key => ({
            text: featureDetails[key].text,
            icon: iconMap[featureDetails[key].iconName] || CheckCircle,
          }))
        })),
        popularBadge: lang === 'ar' ? 'الأكثر شيوعًا' : 'Most Popular',
      });
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="pricing" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-tl from-muted via-background to-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {texts.plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 animate-fadeIn bg-card/80 backdrop-blur-sm",
                plan.isPopular ? "border-2 border-accent ring-2 ring-accent/50 relative overflow-visible" : "border-primary/20"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-full shadow-lg z-10">
                  {texts.popularBadge}
                </div>
              )}
              <CardHeader className="p-6 text-center">
                <CardTitle className="text-2xl font-bold text-primary mb-2">{plan.name}</CardTitle>
                <p className="text-4xl font-extrabold text-foreground">
                  {plan.price}
                  {plan.period && <span className="text-base font-normal text-muted-foreground">{plan.period}</span>}
                </p>
                <CardDescription className="mt-2 text-foreground/70">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <feature.icon className={cn("h-5 w-5 shrink-0", plan.isPopular ? "text-accent" : "text-primary")} />
                      <span className="text-foreground/90">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 mt-auto">
                <Button
                  size="lg"
                  asChild
                  className={cn(
                    "w-full text-lg transition-transform hover:scale-105",
                    plan.isPopular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  <Link href={plan.ctaLink}>{plan.ctaText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

    