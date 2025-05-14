
import Navbar from './(components)/navbar';
import HeroSection from './(components)/hero-section';
import FeatureShowcase from './(components)/feature-showcase';
import HowItWorksSection from './(components)/how-it-works';
import UseCasesSection from './(components)/use-cases';
import ProductsSection from './(components)/products-section'; 
import AiAssistantPreview from './(components)/ai-assistant-preview';
import MultiLanguageSupport from './(components)/multi-language-support';
import FaqSection from './(components)/faq-section';
import Footer from './(components)/footer';
import ScrollToTopButton from './(components)/scroll-to-top-button';

export default function HomePage() {
  return (
    // Removed relative z-[1] from this div as it might not be necessary if HeroSection overflow is fixed
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <UseCasesSection />
        <ProductsSection /> 
        <AiAssistantPreview />
        <MultiLanguageSupport />
        <FaqSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
