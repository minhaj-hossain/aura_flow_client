import CategoriesGrid from "@/components/homepage/CategoriesGrid";
import CTABanner from "@/components/homepage/CTABanner";
import FAQSection from "@/components/homepage/FAQSection";
import FeaturedItems from "@/components/homepage/FeaturedItems";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/20 selection:text-primary">
      <Hero />
      <FeaturedSection />
      <FeaturedItems />
      <CategoriesGrid />
      <Features />

      <Testimonials />
      <FAQSection />
      <NewsletterSection />
      <CTABanner />
    </div>
  );
}
