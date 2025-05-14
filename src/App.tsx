
import { useEffect } from 'react';
// Removed Cairo import from next/font as it's now handled by CSS
import Navbar from './app/(components)/navbar';
import HeroSection from './app/(components)/hero-section';
import FeatureShowcase from './app/(components)/feature-showcase';
import HowItWorksSection from './app/(components)/how-it-works';
import UseCasesSection from './app/(components)/use-cases';
import ProductsSection from './app/(components)/products-section'; 
// import TryAISection from './app/(components)/try-ai-section';
import TestimonialsSection from './app/(components)/testimonials-section';
import PricingSection from './app/(components)/pricing-section';
import PartnersSection from './app/(components)/partners-section';
import FeaturedClientsSection from './app/(components)/featured-clients-section';
import NewsletterSection from './app/(components)/newsletter-section';
import FaqSection from './app/(components)/faq-section';
import Footer from './app/(components)/footer';
import ScrollToTopButton from './app/(components)/scroll-to-top-button';

// Removed AiAssistantPreview and MultiLanguageSupport imports as their functionality is in TryAISection

export default function App() {
  useEffect(() => {
    // Set document title and meta description
    document.title = 'MemoAI: Your Intelligent Knowledge Hub';
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', 'Capture, connect, and create with the power of AI. Transform your notes into actionable insights.');
    
    // Set default language for the html element
    document.documentElement.lang = "en"; 
    // No need to add font class variable here anymore
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background"> {/* font-family is applied via body in globals.css */}
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <UseCasesSection />
        <ProductsSection /> 
        <TestimonialsSection />
        <PricingSection />
        <PartnersSection />
        <FeaturedClientsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
