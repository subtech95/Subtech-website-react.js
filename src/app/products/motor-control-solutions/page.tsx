import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/catalog";

const CATEGORY_SLUG = "motor-control-solutions";

export const metadata: Metadata = {
  title: "Motor Control Solutions | Subtech",
  description:
    "Single, two and three phase smart motor starter panels with PMC contactor, digital protection and field-tested reliability. Explore Subtech's full motor control range.",
  alternates: { canonical: `https://subtech.in/products/${CATEGORY_SLUG}` },
};

export default function MotorControlSolutionsPage() {
  const category = getCategory(CATEGORY_SLUG);
  if (!category) notFound();

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-red-500">Products</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Product Family
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            {category.name}
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            {category.description}
          </p>
        </div>

        {/* Sub-category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.subCategories.map((sub) => {
            const seriesCount = sub.types.reduce((n, t) => n + t.series.length, 0);
            return (
              <Link
                key={sub.slug}
                href={`/products/${category.slug}/${sub.slug}`}
                className="group bg-white border border-[#E8E8E8] rounded-2xl p-7 hover:border-red-500 hover:shadow-[0_16px_40px_rgba(204,0,0,0.08)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-500">
                    {sub.types.length} type{sub.types.length === 1 ? "" : "s"} ·{" "}
                    {seriesCount} series
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#999] group-hover:text-red-500 group-hover:translate-x-1 transition-all">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
                <h2 className="text-[22px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                  {sub.name}
                </h2>
                <p className="text-[13.5px] text-[#767676] leading-[1.65] mb-5">
                  {sub.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sub.types.map((t) => (
                    <span
                      key={t.slug}
                      className="text-[11.5px] px-3 py-1 bg-[#F5F5F5] text-[#3a3a3a] rounded-full"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
