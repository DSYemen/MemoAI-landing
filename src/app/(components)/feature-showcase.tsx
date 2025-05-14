import type { FC } from 'react';
import FeatureCard from './feature-card';
import { Brain, Languages as LucideLanguages, Zap, Users } from 'lucide-react'; // Renamed Languages to LucideLanguages

const features = [
  {
    icon: Brain,
    title: 'Smart Organization',
    description: 'AI categorizes your notes, identifies key themes, and intelligently suggests relevant connections, making your knowledge instantly accessible.',
  },
  {
    icon: LucideLanguages,
    title: 'Global Language Support',
    description: 'Work seamlessly in your preferred language. MemoAI offers robust multi-directional text support and instant translation capabilities.',
  },
  {
    icon: Zap,
    title: 'Instant AI Insights',
    description: 'Transform your content on the fly. Quickly summarize, expand ideas, or rephrase text with our integrated AI assistant.',
  },
  {
    icon: Users,
    title: 'Collaborative Spaces',
    description: 'Effortlessly share notes and knowledge bases with your team. Foster creativity and productivity in a shared, intelligent environment.',
  },
];

const FeatureShowcase: FC = () => {
  return (
    <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Discover the Power of MemoAI
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            MemoAI is packed with intelligent features designed to revolutionize how you manage and utilize information.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
