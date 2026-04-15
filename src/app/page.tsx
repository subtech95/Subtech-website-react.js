"use client";

import Link from "next/link";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import StatsBar from "@/components/home/StatsBar";
import ProductsGrid from "@/components/home/ProductsGrid";
import TechnologySection from "@/components/home/TechnologySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      {/* Hero — ScrollExpandMedia */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://www.youtube.com/watch?v=oFuWT0fFyhw"
        bgImageSrc="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=80"
        title="Industrial Power Engineered for India"
        date="Est. 1998 — Greater Noida"
        scrollToExpand="Scroll to explore Subtech"
        textBlend={true}
      >
        {/* Content revealed after video expands */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading */}
          <h2 className="text-3xl md:text-[48px] font-semibold text-white text-center mb-6 leading-[1.2] tracking-[-1px]">
            Trusted by India&apos;s Largest Organizations
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 text-center max-w-3xl mx-auto mb-12 leading-[1.7]">
            Powering critical infrastructure for GAIL, NTPC, DMRC, Indian
            Railways, Indian Air Force and 220+ dealers across India. Our
            panels protect the machines that keep the nation running.
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
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#CC0000] hover:bg-[#AA0000] text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Remaining homepage sections */}
      <StatsBar />
      <ProductsGrid />
      <TechnologySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
