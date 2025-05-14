
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
    [key: string]: {
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
    imageHint: 'Dynamic AI-powered web application dashboard interface, showcasing intelligent note organization, collaborative tools, and data visualization charts, sleek dark mode aesthetic, futuristic, cosmic background elements',
    defaultImage: 'https://placehold.co/700x450/1A093D/E0E0FF/png?text=MemoAI+Web+App',
    titleKey: 'webAppTitle',
    descriptionKey: 'webAppDescription',
    learnMoreKey: 'learnMore',
  },
  {
    id: 'mobile-app',
    icon: Smartphone,
    imageHint: 'Elegant mobile app interface for AI note-taking, offline access, quick capture widgets, cross-device sync, intuitive gestures, on a vibrant abstract background',
    defaultImage: 'https://placehold.co/700x450/0D1B3E/B0C8FF/png?text=MemoAI+Mobile+App',
    titleKey: 'mobileAppTitle',
    descriptionKey: 'mobileAppDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'desktop-app',
    icon: AppWindow,
    imageHint: 'Powerful native desktop application for knowledge management, featuring advanced search, offline capabilities, rich text editing with AI assistance, customizable workspace, connected to a conceptual neural network graphic',
    defaultImage: 'https://placehold.co/700x450/102A2A/A0E0E0/png?text=MemoAI+Desktop+App',
    titleKey: 'desktopAppTitle',
    descriptionKey: 'desktopAppDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'browser-extension',
    icon: Puzzle,
    imageHint: 'Seamless browser extension pop-up for web clipping and quick notes, integrated with AI summarization, contextual tagging, dark mode, floating over a blurred webpage showing research content',
    defaultImage: 'https://placehold.co/700x450/2E0F2E/E8C0E8/png?text=MemoAI+Browser+Ext',
    titleKey: 'browserExtensionTitle',
    descriptionKey: 'browserExtensionDescription',
    comingSoonKey: 'comingSoon',
  },
  {
    id: 'vscode-extension',
    icon: CodeXml,
    imageHint: 'VS Code extension sidebar for developers, AI-powered code snippet management, inline documentation access, task tracking within the IDE, dark theme, with abstract code structures in background',
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
    webAppDescription: lang === 'ar' ? 'وصول فوري لمعرفتك من أي متصفح. يتميز بتنظيم ذكي للملاحظات، أدوات تعاون قوية، وقدرات بحث متقدمة مدعومة بالذكاء الاصطناعي. مثالي للعمل والتعاون بسلاسة.' : 'Instant access to your knowledge from any browser. Features smart note organization, powerful collaboration tools, and AI-driven advanced search. Perfect for seamless work and collaboration.',
    mobileAppTitle: lang === 'ar' ? 'تطبيق MemoAI للجوال' : 'MemoAI Mobile App',
    mobileAppDescription: lang === 'ar' ? 'ملاحظاتك معك أينما كنت. يوفر التقاط سريع للأفكار، الوصول دون اتصال، والمزامنة السلسة عبر جميع أجهزتك. مصمم للإنتاجية أثناء التنقل.' : 'Your notes, wherever you are. Offers quick idea capture, offline access, and seamless cross-device synchronization. Designed for on-the-go productivity.',
    desktopAppTitle: lang === 'ar' ? 'تطبيق MemoAI لسطح المكتب' : 'MemoAI Desktop App',
    desktopAppDescription: lang === 'ar' ? 'تجربة MemoAI الكاملة مع أداء محسن وقدرات دون اتصال. يتضمن تحرير نصوص غني، مساحات عمل قابلة للتخصيص، وأدوات متقدمة للمستخدمين المتميزين الذين يطلبون الأفضل.' : 'The ultimate MemoAI experience with enhanced performance and offline capabilities. Includes rich text editing, customizable workspaces, and advanced tools for power users who demand the best.',
    browserExtensionTitle: lang === 'ar' ? 'امتداد متصفح MemoAI' : 'MemoAI Browser Extension',
    browserExtensionDescription: lang === 'ar' ? 'احفظ المقالات والمحتوى مباشرة من الويب إلى MemoAI. يقدم تلخيص ذكي للمقالات، وضع علامات سياقية، والتكامل السلس مع تطبيق الويب. رفيقك المثالي للبحث والتجميع.' : 'Save articles and content directly from the web to MemoAI. Offers intelligent article summarization, contextual tagging, and seamless integration with the web app. Your perfect research and collection companion.',
    vscodeExtensionTitle: lang === 'ar' ? 'امتداد MemoAI لـ VS Code' : 'MemoAI VS Code Extension',
    vscodeExtensionDescription: lang === 'ar' ? 'ادمِج قاعدة معارفك مباشرةً في بيئة التطوير الخاصة بك. يوفر وصول سريع لمقتطفات التعليمات البرمجية، إدارة الملاحظات المتعلقة بالمشاريع، ومساعدة ذكية أثناء الترميز. مثالي للمطورين.' : 'Integrate your knowledge base directly into your development environment. Provides quick access to code snippets, project-related note management, and intelligent assistance while you code. Ideal for developers.',
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
    <section id="products" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-tr from-primary/10 via-background to-accent/10">
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
                  <div className="relative aspect-video md:aspect-auto min-h-[300px] md:min-h-full group">
                    <Image
                      src={product.defaultImage}
                      alt={texts.products[product.titleKey]?.title || product.titleKey}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={product.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-black/70 md:via-black/40 md:to-transparent"></div>
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
                             {texts.products[product.learnMoreKey]} <ExternalLink className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
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

    