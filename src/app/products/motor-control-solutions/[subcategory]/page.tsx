import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allSubCategorySlugs,
  getSubCategory,
} from "@/lib/catalog";

const CATEGORY_SLUG = "motor-control-solutions";

export function generateStaticParams() {
  return allSubCategorySlugs()
    .filter((p) => p.category === CATEGORY_SLUG)
    .map((p) => ({ subcategory: p.subcategory }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const found = getSubCategory(CATEGORY_SLUG, subcategory);
  if (!found) return { title: "Not found | Subtech" };
  return {
    title: `${found.sub.name} | Subtech`,
    description: found.sub.description,
    alternates: {
      canonical: `https://subtech.in/products/${CATEGORY_SLUG}/${subcategory}`,
    },
  };
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  const found = getSubCategory(CATEGORY_SLUG, subcategory);
  if (!found) notFound();
  const { category, sub } = found;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-red-500">Products</Link>
          <span>›</span>
          <Link
            href={`/products/${category.slug}`}
            className="hover:text-red-500"
          >
            {category.name}
          </Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{sub.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            {category.name}
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            {sub.name}
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            {sub.description}
          </p>
        </div>

        {/* Type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sub.types.map((type) => (
            <Link
              key={type.slug}
              href={`/products/${category.slug}/${sub.slug}/${type.slug}`}
              className="group bg-white border border-[#E8E8E8] rounded-2xl p-7 hover:border-red-500 hover:shadow-[0_16px_40px_rgba(204,0,0,0.08)] hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-500">
                  {type.series.length} series
                </span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#999] group-hover:text-red-500 group-hover:translate-x-1 transition-all">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-[22px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                {type.name}
              </h2>
              <p className="text-[13.5px] text-[#767676] leading-[1.65] mb-5">
                {type.description}
              </p>
              <ul className="space-y-2">
                {type.series.slice(0, 4).map((s) => (
                  <li
                    key={s.slug}
                    className="text-[13px] text-[#3a3a3a] flex items-center gap-3"
                  >
                    <span className="w-9 h-9 rounded-md bg-[#F7F7F7] border border-[#EFEFEF] grid place-items-center overflow-hidden flex-shrink-0">
                      {s.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.image}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                      )}
                    </span>
                    <span>{s.name}</span>
                  </li>
                ))}
                {type.series.length > 4 && (
                  <li className="text-[12.5px] text-[#999] pl-12">
                    +{type.series.length - 4} more
                  </li>
                )}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
