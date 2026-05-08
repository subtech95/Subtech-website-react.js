import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQSection,
  SectorGrid,
  StatsStrip,
  TrustedByStrip,
  WhySubtechSection,
} from "@/components/solutions/SolutionsCommon";

export const metadata: Metadata = {
  title:
    "Industrial & Agricultural Automation Solutions | 13 Sectors | Subtech",
  description:
    "Subtech delivers sector-specific electrical automation across 13 industries — utilities, government, healthcare, defence, agriculture and more. ISO certified, GeM listed, 220+ dealers.",
  alternates: { canonical: "https://subtech.in/solutions" },
};

export default function SolutionsHubPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">Solutions</span>
        </nav>

        {/* Hero */}
        <header className="max-w-3xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Subtech Solutions
          </p>
          <h1 className="text-[clamp(36px,5vw,60px)] font-bold tracking-[-0.02em] text-[#0D0D0D] leading-[1.05] mb-4">
            Automation solutions{" "}
            <span className="text-red-500">by industry</span>
          </h1>
          <p className="text-[#3a3a3a] text-[16.5px] leading-[1.7] mb-3">
            <strong className="text-[#0D0D0D]">
              13 Sectors. 67+ Specialised Solutions.
            </strong>
          </p>
          <p className="text-[#3a3a3a] text-[15.5px] leading-[1.7]">
            Subtech delivers sector-specific electrical automation for
            utilities, government, industry, healthcare, defence, and more. Each
            solution is engineered for the exact requirements and pain points
            of that sector.
          </p>
        </header>

        {/* Stats */}
        <StatsStrip />

        {/* All sectors grid */}
        <section className="mb-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
            All Sectors
          </p>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-7 leading-[1.2]">
            Choose Your Industry
          </h2>
          <SectorGrid />
        </section>

        {/* Trust strip */}
        <TrustedByStrip />

        {/* Why Subtech */}
        <WhySubtechSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <section className="bg-[#0D0D0D] text-white rounded-3xl p-8 sm:p-12 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Have a tender or BOQ?
          </p>
          <h2 className="text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em] mb-4 leading-[1.2]">
            We build to your spec, not just from our catalog
          </h2>
          <p className="text-[15px] text-white/70 leading-[1.7] max-w-2xl mx-auto mb-7">
            Custom MCC, PCC, LT panels and feeder pillars manufactured to your
            BOQ. Empanelled with multiple PSUs and listed on GeM portal for
            direct procurement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?subject=Solutions%20enquiry"
              className="px-7 py-3.5 bg-red-500 text-white rounded-xl font-bold text-[14.5px] hover:bg-red-600 transition"
            >
              Request a Custom Quote →
            </Link>
            <a
              href="tel:+918506060582"
              className="px-7 py-3.5 bg-white/10 text-white rounded-xl font-bold text-[14.5px] hover:bg-white/15 transition"
            >
              Call 085060 60582
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
