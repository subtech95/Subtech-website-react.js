"use client";

import SubtechHero from "@/components/home/SubtechHero";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import WhyUsSection from "@/components/home/WhyUsSection";
import AboutSection from "@/components/home/AboutSection";
import SectorsSection from "@/components/home/SectorsSection";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FootprintSection from "@/components/home/FootprintSection";
import ProductsGrid from "@/components/home/ProductsGrid";
import TechnologySection from "@/components/home/TechnologySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CustomerCareSection from "@/components/home/CustomerCareSection";
import CTASection from "@/components/home/CTASection";
import BuiltDifferentSection from "@/components/home/BuiltDifferentSection";
export default function Home() {
  return (
    <>
      {/* Hero — pixel match to subtech.in: YouTube video bg + dark overlay + CTA */}
      <SubtechHero />

      {/* Client Logos Marquee */}
      <ClientsMarquee />

      {/* Why Choose Subtech - Bento Grid */}
      <WhyUsSection />

      <BuiltDifferentSection />

      {/* Technology Section */}
      <TechnologySection />

      {/* Products Range */}
      <ProductsGrid />

      {/* About Section */}
      <AboutSection />

      {/* Sectors Section */}
      <SectorsSection />

      {/* Free Consultation CTA */}
      <ConsultationCTA />

      {/* Footprint Section */}
      <FootprintSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Customer Care Section */}
      <CustomerCareSection />

      {/* Final CTA */}
      <CTASection />
    </>
  );
}
