"use client";

import Link from "next/link";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
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
      {/* Hero - ScrollExpandMedia with high-quality video */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://www.youtube.com/watch?v=oFuWT0fFyhw"
        bgImageSrc="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=80"
        title="Your Global Partner in Electrical Excellence"
        date="Est. 1998 - Greater Noida"
        scrollToExpand="Scroll to explore Subtech"
        textBlend={true}
      >
        {/* Content revealed after video expands */}
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl md:text-[48px] font-semibold text-black text-center mb-6 leading-[1.2] tracking-[-1px]">
            Trusted by India&apos;s Largest Organizations
          </h2>

          <p className="text-lg text-black/70 text-center max-w-3xl mx-auto mb-12 leading-[1.7]">
            Complete solutions in smart motor control panels, switchgear, and automation,
            trusted by industries worldwide for a sustainable Earth.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { value: "Rs 22 Cr", label: "Revenue" },
              { value: "220+", label: "Dealers" },
              { value: "25+", label: "Years" },
              { value: "10,000+", label: "Panels Installed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 uppercase tracking-[2px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#CC0000] hover:bg-[#AA0000] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg hover:-translate-y-[2px]"
            >
              Get Your Solution
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </ScrollExpandMedia>

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
