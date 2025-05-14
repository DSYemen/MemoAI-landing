import { useEffect } from 'react';
import { Cairo } from 'next/font/google'; // We'll keep this for font loading, but Next specific parts are gone
import Navbar from './app/(components)/navbar';
import HeroSection from './app/(components)/hero-section';
import FeatureShowcase from './app/(components)/feature-showcase';
import HowItWorksSection from './app/(components)/how-it-works';
import UseCasesSection from './app/(components)/use-cases';
import ProductsSection from './app/(components)/products-section'; 
import TryAISection from './app/(components)/try-ai-section';
import TestimonialsSection from './app/(components)/testimonials-section';
import PricingSection from './app/(components)/pricing-section';
import PartnersSection from './app/(components)/partners-section';
import FeaturedClientsSection from './app/(components)/featured-clients-section';
import NewsletterSection from './app/(components)/newsletter-section';
import FaqSection from './app/(components)/faq-section';
import Footer from './app/(components)/footer';
import ScrollToTopButton from './app/(components)/scroll-to-top-button';

// This setup for Cairo font might need adjustment for Vite if it doesn't work directly.
// For Vite, you typically import fonts in CSS or link them in index.html.
// However, the `variable` approach is often tied to Next.js's font optimization.
// For simplicity, we'll try to keep it, but it might need a CSS-based import.
const cairoFont = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'], 
  display: 'swap', 
});

// Simulate metadata for title (basic)
useEffect(() => {
  document.title = 'MemoAI: Your Intelligent Knowledge Hub';
  // Add meta description if needed
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', 'Capture, connect, and create with the power of AI. Transform your notes into actionable insights.');
}, []);


export default function App() {
  useEffect(() => {
    // Set the lang attribute and font variable on the HTML element
    // This replicates part of what Next.js's RootLayout does
    document.documentElement.lang = "en"; // Default language
    document.documentElement.classList.add(cairoFont.variable);
    // suppressHydrationWarning is not applicable here in the same way
    return () => {
      document.documentElement.classList.remove(cairoFont.variable);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <UseCasesSection />
        <ProductsSection /> 
        <TryAISection />
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
