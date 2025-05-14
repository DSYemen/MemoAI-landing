
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Handshake } from 'lucide-react'; // Changed from Share2 to Handshake

interface Partner {
  name: string;
  logoUrl: string; // Placeholder URL
  imageHint: string;
}

interface PartnersSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  partners: Partner[];
}

const getBasePartners = (lang: string): Partner[] => [
  { name: 'Tech Innovators Inc.', logoUrl: 'https://placehold.co/150x75/FFFFFF/1A093D/png?text=Partner+A', imageHint: 'modern tech company logo blue' },
  { name: 'Global Solutions Ltd.', logoUrl: 'https://placehold.co/150x75/FFFFFF/0D1B3E/png?text=Partner+B', imageHint: 'global solutions logo globe' },
  { name: 'AI Pioneers Co.', logoUrl: 'https://placehold.co/150x75/FFFFFF/102A2A/png?text=Partner+C', imageHint: 'ai pioneers logo brain' },
  { name: 'Future Systems Group', logoUrl: 'https://placehold.co/150x75/FFFFFF/2E0F2E/png?text=Partner+D', imageHint: 'future systems logo abstract' },
  { name: 'Creative Labs LLC', logoUrl: 'https://placehold.co/150x75/FFFFFF/301A1A/png?text=Partner+E', imageHint: 'creative labs logo colorful' },
  { name: 'Data Corp United', logoUrl: 'https://placehold.co/150x75/FFFFFF/222244/png?text=Partner+F', imageHint: 'data corp logo server' },
];

const PartnersSection: FC = () => {
  const [texts, setTexts] = useState<PartnersSectionTexts>({
    mainTitle: 'Our Valued Partners',
    mainSubtitle: 'Collaborating with leading organizations to drive innovation and deliver exceptional value.',
    partners: getBasePartners('en'),
  });
   const [currentDirection, setCurrentDirection] = useState('ltr');

  useEffect(() => {
    const handleDirectionChange = () => {
      const dir = document.documentElement.dir || 'ltr';
      setCurrentDirection(dir);
      const lang = dir === 'rtl' ? 'ar' : 'en';
      setTexts({
        mainTitle: lang === 'ar' ? 'شركاؤنا الكرام' : 'Our Valued Partners',
        mainSubtitle: lang === 'ar' ? 'نتعاون مع المؤسسات الرائدة لدفع عجلة الابتكار وتقديم قيمة استثنائية.' : 'Collaborating with leading organizations to drive innovation and deliver exceptional value.',
        partners: getBasePartners(lang).map(p => ({ ...p, name: lang === 'ar' ? `شريك ${p.name.split(" ")[1]?.charAt(0) || 'X'}` : p.name })), // Simplified translation for demo
      });
    };
    handleDirectionChange(); // Initial call
    window.addEventListener('directionChanged', handleDirectionChange);
    return () => window.removeEventListener('directionChanged', handleDirectionChange);
  }, []);

  return (
    <section id="partners" className="w-full py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-12 text-center">
          <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-foreground/70 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {texts.partners.map((partner) => (
            <div key={partner.name} className="flex justify-center items-center p-4 animate-fadeIn group">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={150}
                height={75}
                className="object-contain transition-transform duration-300 group-hover:scale-110 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                data-ai-hint={partner.imageHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

    