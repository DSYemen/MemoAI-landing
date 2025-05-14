
import Navbar from './(components)/navbar';
import HeroSection from './(components)/hero-section';
import FeatureShowcase from './(components)/feature-showcase';
import HowItWorksSection from './(components)/how-it-works';
import UseCasesSection from './(components)/use-cases';
import ProductsSection from './(components)/products-section'; 
import TryAISection from './(components)/try-ai-section';
import TestimonialsSection from './(components)/testimonials-section';
import PricingSection from './(components)/pricing-section';
import PartnersSection from './(components)/partners-section';
import FeaturedClientsSection from './(components)/featured-clients-section';
import NewsletterSection from './(components)/newsletter-section';
import FaqSection from './(components)/faq-section';
import Footer from './(components)/footer';
import ScrollToTopButton from './(components)/scroll-to-top-button';

export default function HomePage() {
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

    