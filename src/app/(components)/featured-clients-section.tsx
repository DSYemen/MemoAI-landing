import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';

interface Client {
  originalName: string;
  name: string;
  logoUrl: string;
  imageHint: string;
}

interface FeaturedClientsSectionTexts {
  mainTitle: string;
  mainSubtitle: string;
  clients: Client[];
}

const getBaseClients = (): Omit<Client, 'name'>[] => [
  { originalName: 'Innovate Corp', logoUrl: 'https://placehold.co/160x80/FFFFFF/1A093D/png?text=Client+1', imageHint: 'innovate corp logo modern' },
  { originalName: 'Synergy Solutions', logoUrl: 'https://placehold.co/160x80/FFFFFF/0D1B3E/png?text=Client+2', imageHint: 'synergy solutions logo professional' },
  { originalName: 'Apex Enterprises', logoUrl: 'https://placehold.co/160x80/FFFFFF/102A2A/png?text=Client+3', imageHint: 'apex enterprises logo strong' },
  { originalName: 'Momentum Dynamics', logoUrl: 'https://placehold.co/160x80/FFFFFF/2E0F2E/png?text=Client+4', imageHint: 'momentum dynamics logo dynamic' },
  { originalName: 'Quantum Leap Inc.', logoUrl: 'https://placehold.co/160x80/FFFFFF/301A1A/png?text=Client+5', imageHint: 'quantum leap logo futuristic' },
  { originalName: 'Starlight Group', logoUrl: 'https://placehold.co/160x80/FFFFFF/222244/png?text=Client+6', imageHint: 'starlight group logo elegant' },
];

const FeaturedClientsSection: FC = () => {
  const [texts, setTexts] = useState<FeaturedClientsSectionTexts>({
    mainTitle: 'Trusted by Leading Companies',
    mainSubtitle: 'Join a growing community of innovative businesses leveraging MemoAI to achieve their goals.',
    clients: getBaseClients().map(c => ({ ...c, name: c.originalName })),
  });

  useEffect(() => {
    const dir = document.documentElement.dir || 'ltr';
    const lang = dir === 'rtl' ? 'ar' : 'en';
    
    const baseClients = getBaseClients();

    setTexts({
      mainTitle: lang === 'ar' ? 'يثق بنا كبرى الشركات' : 'Trusted by Leading Companies',
      mainSubtitle: lang === 'ar' ? 'انضم إلى مجتمع متنامٍ من الشركات المبتكرة التي تستفيد من MemoAI لتحقيق أهدافها.' : 'Join a growing community of innovative businesses leveraging MemoAI to achieve their goals.',
      clients: baseClients.map(c => ({
        ...c,
        name: lang === 'ar' ? `عميل ${c.originalName.split(" ")[1]?.charAt(0) || c.originalName.charAt(0) || 'X'}` : c.originalName
      })),
    });
  }, []);

  return (
    <section id="featured-clients" className="w-full py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-12 text-center">
          <Building className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {texts.mainTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-foreground/70 md:text-xl">
            {texts.mainSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10 items-center max-w-4xl mx-auto">
          {texts.clients.map((client) => (
            <div key={client.originalName} className="flex justify-center items-center p-4 animate-fadeIn group">
              <img
                src={client.logoUrl}
                alt={client.name}
                width={160}
                height={80}
                className="object-contain transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                data-ai-hint={client.imageHint}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClientsSection;
