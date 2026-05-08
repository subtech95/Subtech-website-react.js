import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FAQSection,
  SectorApplications,
  SectorGrid,
  StatsStrip,
  TrustedByStrip,
  WhySubtechSection,
} from "@/components/solutions/SolutionsCommon";
import SectorIcon from "@/components/solutions/SectorIcon";
import { SECTORS, getSector } from "@/lib/solutions";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Solution not found | Subtech" };
  return {
    title: `${sector.name} Solutions | Subtech`,
    description: `${sector.tagline}. ${sector.description.slice(0, 130)}`,
    alternates: { canonical: `https://subtech.in/solutions/${slug}` },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/solutions" className="hover:text-red-500">
            Solutions
          </Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{sector.name}</span>
        </nav>

        {/* Sector hero */}
        <header className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-12 h-12 rounded-xl bg-[#FAFAFA] border border-[#E8E8E8] grid place-items-center text-[#0D0D0D]">
              <SectorIcon slug={sector.slug} className="w-6 h-6" />
            </span>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500">
              Industry Solution · {sector.solutionCount} solutions
            </p>
          </div>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] leading-[1.1] mb-4">
            {sector.name}
          </h1>
          <p className="text-[#3a3a3a] text-[16.5px] leading-[1.7] mb-3">
            <strong className="text-[#0D0D0D]">{sector.tagline}</strong>
          </p>
          <p className="text-[#3a3a3a] text-[15.5px] leading-[1.7] mb-6">
            {sector.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?subject=${encodeURIComponent(`${sector.name} solution enquiry`)}`}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
            >
              Request a Quote →
            </Link>
            <Link
              href="/products/motor-control-solutions"
              className="px-6 py-3 bg-white border border-[#E0E0E0] text-[#0D0D0D] rounded-xl font-bold text-[14px] hover:border-red-500 transition"
            >
              Browse Products
            </Link>
          </div>
        </header>

        {/* Sector-specific applications */}
        <SectorApplications sector={sector} />

        {/* Stats */}
        <StatsStrip />

        {/* Trust */}
        <TrustedByStrip />

        {/* Why Subtech */}
        <WhySubtechSection />

        {/* Other sectors */}
        <section className="mb-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
            Other Sectors
          </p>
          <h2 className="text-[clamp(22px,2.5vw,30px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-7 leading-[1.2]">
            Explore other industries we serve
          </h2>
          <SectorGrid exclude={sector.slug} />
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <section className="bg-[#0D0D0D] text-white rounded-3xl p-8 sm:p-12 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Project in {sector.name}?
          </p>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.01em] mb-4 leading-[1.2]">
            Let&apos;s engineer the right panel for your site
          </h2>
          <p className="text-[15px] text-white/70 leading-[1.7] max-w-2xl mx-auto mb-7">
            Our sales engineers will study your BOQ or single-line diagram and
            come back within 24 hours with a panel proposal and indicative
            pricing.
          </p>
          <Link
            href={`/contact?subject=${encodeURIComponent(`${sector.name} project enquiry`)}`}
            className="inline-block px-7 py-3.5 bg-red-500 text-white rounded-xl font-bold text-[14.5px] hover:bg-red-600 transition"
          >
            Talk to a Sales Engineer →
          </Link>
        </section>
      </div>
    </div>
  );
}
