import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allTypeSlugs, getType, summariseHpRange } from "@/lib/catalog";
import TypeFilterClient from "./TypeFilterClient";

const CATEGORY_SLUG = "motor-control-solutions";

export function generateStaticParams() {
  return allTypeSlugs()
    .filter((p) => p.category === CATEGORY_SLUG)
    .map((p) => ({ subcategory: p.subcategory, type: p.type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string; type: string }>;
}): Promise<Metadata> {
  const { subcategory, type } = await params;
  const found = getType(CATEGORY_SLUG, subcategory, type);
  if (!found) return { title: "Not found | Subtech" };
  return {
    title: `${found.type.name} ${found.sub.name} | Subtech`,
    description: found.type.description,
    alternates: {
      canonical: `https://subtech.in/products/${CATEGORY_SLUG}/${subcategory}/${type}`,
    },
  };
}

export default async function TypePage({
  params,
}: {
  params: Promise<{ subcategory: string; type: string }>;
}) {
  const { subcategory, type } = await params;
  const found = getType(CATEGORY_SLUG, subcategory, type);
  if (!found) notFound();
  const { category, sub, type: t } = found;

  // Pre-compute filter facets
  const variantTags = Array.from(
    new Set(t.series.flatMap((s) => s.variantTags)),
  );
  const hpFacets = (() => {
    const counts = new Map<string, number>();
    for (const s of t.series) {
      for (const hp of s.hpRange) {
        counts.set(hp, (counts.get(hp) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((a, b) => {
      const na = parseFloat(a[0]);
      const nb = parseFloat(b[0]);
      return na - nb;
    });
  })();

  const seriesData = t.series.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
    image: s.image ?? null,
    hpRange: s.hpRange,
    variantTags: s.variantTags,
    hpSummary: summariseHpRange(s),
    variantCount: s.variants.length,
    href: `/products/${category.slug}/${sub.slug}/${t.slug}/${s.slug}`,
  }));

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link
            href={`/products/${category.slug}`}
            className="hover:text-red-500"
          >
            {category.name}
          </Link>
          <span>›</span>
          <Link
            href={`/products/${category.slug}/${sub.slug}`}
            className="hover:text-red-500"
          >
            {sub.name}
          </Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{t.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            {sub.name}
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            {t.name}
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            {t.description}
          </p>
        </div>

        <TypeFilterClient
          series={seriesData}
          variantTags={variantTags}
          hpFacets={hpFacets}
        />
      </div>
    </div>
  );
}
