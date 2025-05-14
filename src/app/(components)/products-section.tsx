
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe2, Smartphone, AppWindow, Puzzle, CodeXml, ExternalLink } from 'lucide-react';

interface ProductInfo {
  id: string;
  icon: FC<any>;
  imageHint: string;
  defaultImage: string;
  titleKey: string;
  descriptionKey: string;
  comingSoonKey?: string;
  learnMoreKey?: string;
}

interface ProductsSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  products: {
    [key: string]: { // title, description, comingSoon, learnMore
      title: string;
      description: string;
      comingSoon?: string;
      learnMore?: string;
    };
  };
}

const productDetails: ProductInfo[] = [
  {
    id: 'web-app',
    icon: Globe2,
    imageHint: 'sleek web application interface darkmode',
    defaultImage: 'https://placehold.co/700x450/1A093D/E0E0FF/png?text=MemoAI+Web+App',
    titleKey: 'webAppTitle',
    descriptionKey: 'webAppDescription',
    learnMoreKey: 'learnMore',
  },
  {
    id: 'mobile-app',
    icon: Smartphone,
    imageHint: 'modern mobile app screen notes ai',
    defaultImage: 'https://placehold.co/700x450/0D1B3E/B0C8FF/png?text=MemoAI+Mobile+App',
    titleKey: 'mobileAppTitle',
    descriptionKey: 'mobileAppDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'desktop-app',
    icon: AppWindow,
    imageHint: 'powerful desktop application darkmode notes productivity',
    defaultImage: 'https://placehold.co/700x450/102A2A/A0E0E0/png?text=MemoAI+Desktop+App',
    titleKey: 'desktopAppTitle',
    descriptionKey: 'desktopAppDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'browser-extension',
    icon: Puzzle,
    imageHint: 'browser extension popup interface notes ai dark',
    defaultImage: 'https://placehold.co/700x450/2E0F2E/E8C0E8/png?text=MemoAI+Browser+Ext',
    titleKey: 'browserExtensionTitle',
    descriptionKey: 'browserExtensionDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'vscode-extension',
    icon: CodeXml,
    imageHint: 'VSCode extension UI notes ai developer dark',
    defaultImage: 'https://placehold.co/700x450/301A1A/FFC0C0/png?text=MemoAI+VSCode+Ext',
    titleKey: 'vscodeExtensionTitle',
    descriptionKey: 'vscodeExtensionDescription',
    comingSoonKey: 'comingSoon',
  },
];

const getTexts = (lang: string): ProductsSectionTexts => ({
  mainTitle: lang === 'ar' ? 'اكتشف مجموعة منتجات MemoAI' : 'Explore the MemoAI Suite',
  mainSubtitle: lang === 'ar' ? 'أدوات ذكية مصممة لتعزيز إنتاجيتك وإبداعك عبر جميع منصاتك.' : 'Intelligent tools designed to boost your productivity and creativity across all your platforms.',
  products: {
    webAppTitle: lang === 'ar' ? 'تطبيق الويب MemoAI' : 'MemoAI Web App',
    webAppDescription: lang === 'ar' ? 'يمكنك الوصول إلى ملاحظاتك ومعرفتك من أي مكان باستخدام تطبيق الويب القوي والبديهي الخاص بنا. مثالي للعمل والتعاون أثناء التنقل.' : 'Access your notes and knowledge from anywhere with our powerful and intuitive web application. Perfect for on-the-go work and collaboration.',
    mobileAppTitle: lang === 'ar' ? 'تطبيق MemoAI للجوال' : 'MemoAI Mobile App',
    mobileAppDescription: lang === 'ar' ? 'التقط الأفكار أثناء التنقل وحافظ على مزامنة ملاحظاتك عبر الأجهزة. تجربة سلسة في متناول يدك.' : 'Capture ideas on the go and keep your notes synced across devices. A seamless experience right at your fingertips.',
    desktopAppTitle: lang === 'ar' ? 'تطبيق MemoAI لسطح المكتب' : 'MemoAI Desktop App',
    desktopAppDescription: lang === 'ar' ? 'أطلق العنان لقوة MemoAI الكاملة مع تطبيق سطح المكتب المخصص. مثالي للمستخدمين المتميزين الذين يحتاجون إلى أداء عالي وقدرات دون اتصال بالإنترنت.' : 'Unleash the full power of MemoAI with our dedicated desktop application. Ideal for power users needing high performance and offline capabilities.',
    browserExtensionTitle: lang === 'ar' ? 'امتداد متصفح MemoAI' : 'MemoAI Browser Extension',
    browserExtensionDescription: lang === 'ar' ? 'احفظ المقالات ومقاطع الفيديو والمحتويات الأخرى مباشرة في MemoAI من متصفحك. اجعل بحثك وجمع معلوماتك أمرًا سهلاً.' : 'Save articles, videos, and other content directly to MemoAI from your browser. Make your research and information gathering a breeze.',
    vscodeExtensionTitle: lang === 'ar' ? 'امتداد MemoAI لـ VS Code' : 'MemoAI VS Code Extension',
    vscodeExtensionDescription: lang === 'ar' ? 'ادمج قاعدة معارف MemoAI مباشرة في بيئة التطوير الخاصة بك. يمكنك الوصول إلى المقتطفات والملاحظات والوثائق دون مغادرة محرر الشيفرة الخاص بك.' : 'Integrate your MemoAI knowledge base directly into your development environment. Access snippets, notes, and documentation without leaving your code editor.',
    comingSoon: lang === 'ar' ? 'قريباً' : 'Coming Soon',
    learnMore: lang === 'ar' ? 'اعرف المزيد' : 'Learn More',
  }
});

const ProductsSection: FC = () => {
  const [texts, setTexts] = useState<ProductsSectionTexts>(getTexts('en'));
  const [currentDirection, setCurrentDirection] = useState('ltr');

  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      setTexts(getTexts(dir === 'rtl' ? 'ar' : 'en'));
    };
    handleDirectionChange();
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="products" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-tr from-background via-muted to-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>

        <Tabs defaultValue={productDetails[0].id} className="w-full" dir={currentDirection}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-transparent p-0 h-auto mb-10">
            {productDetails.map((product) => (
              <TabsTrigger
                key={product.id}
                value={product.id}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 px-2 py-3 text-sm font-medium rounded-md
                           border border-border/50 bg-card/50 backdrop-blur-sm shadow-md
                           hover:bg-accent/20 hover:text-accent-foreground 
                           data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg 
                           transition-all duration-300 h-full whitespace-normal text-center sm:text-left"
              >
                <product.icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{texts.products[product.titleKey]?.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {productDetails.map((product) => (
            <TabsContent key={product.id} value={product.id} className="outline-none ring-0">
              <Card className="overflow-hidden shadow-xl bg-card/70 backdrop-blur-md border-primary/20 animate-fadeIn">
                <div className="grid md:grid-cols-2 items-stretch">
                  <div className="relative aspect-video md:aspect-auto min-h-[300px] md:min-h-full">
                    <Image
                      src={product.defaultImage}
                      alt={texts.products[product.titleKey]?.title || product.titleKey}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={product.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r"></div>
                  </div>
                  <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center ${currentDirection === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
                         <product.icon className="h-7 w-7" />
                        {texts.products[product.titleKey]?.title}
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                        {texts.products[product.descriptionKey]?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-auto">
                      {product.comingSoonKey ? (
                        <Button variant="outline" size="lg" disabled className="w-full sm:w-auto border-dashed border-primary/50 text-primary">
                          {texts.products[product.comingSoonKey]}
                        </Button>
                      ) : product.learnMoreKey ? (
                         <Button size="lg" asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                           <a href="#" target="_blank" rel="noopener noreferrer">
                             {texts.products[product.learnMoreKey]} <ExternalLink className="ml-2 h-4 w-4" />
                           </a>
                         </Button>
                      ) : null}
                    </CardContent>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsSection;

    