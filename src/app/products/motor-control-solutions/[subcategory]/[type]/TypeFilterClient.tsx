"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SeriesCard = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string | null;
  hpRange: string[];
  variantTags: string[];
  hpSummary: string;
  variantCount: number;
  href: string;
};

export default function TypeFilterClient({
  series,
  variantTags,
  hpFacets,
}: {
  series: SeriesCard[];
  variantTags: string[];
  hpFacets: [string, number][];
}) {
  const [activeVariants, setActiveVariants] = useState<Set<string>>(new Set());
  const [activeHps, setActiveHps] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return series.filter((s) => {
      if (
        activeVariants.size > 0 &&
        !s.variantTags.some((t) => activeVariants.has(t))
      ) {
        return false;
      }
      if (
        activeHps.size > 0 &&
        !s.hpRange.some((h) => activeHps.has(h))
      ) {
        return false;
      }
      return true;
    });
  }, [series, activeVariants, activeHps]);

  const toggle = (set: Set<string>, value: string): Set<string> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const clearAll = () => {
    setActiveVariants(new Set());
    setActiveHps(new Set());
  };

  const hasActiveFilter = activeVariants.size > 0 || activeHps.size > 0;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      {/* Filter sidebar */}
      <aside className="lg:sticky lg:top-24 self-start">
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0D0D0D]">
              Filter
            </h3>
            {hasActiveFilter && (
              <button
                onClick={clearAll}
                className="text-[12px] text-red-500 font-semibold hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {variantTags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-[12.5px] font-semibold text-[#0D0D0D] mb-3">
                Variant
              </h4>
              <ul className="space-y-2">
                {variantTags.map((tag) => {
                  const checked = activeVariants.has(tag);
                  return (
                    <li key={tag}>
                      <label className="flex items-center gap-2.5 cursor-pointer text-[13.5px] text-[#3a3a3a] hover:text-[#0D0D0D]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setActiveVariants(toggle(activeVariants, tag))
                          }
                          className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                        {tag}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {hpFacets.length > 0 && (
            <div>
              <h4 className="text-[12.5px] font-semibold text-[#0D0D0D] mb-3">
                Rating
              </h4>
              <ul className="space-y-2">
                {hpFacets.map(([hp, count]) => {
                  const checked = activeHps.has(hp);
                  return (
                    <li key={hp}>
                      <label className="flex items-center justify-between cursor-pointer text-[13.5px] text-[#3a3a3a] hover:text-[#0D0D0D]">
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setActiveHps(toggle(activeHps, hp))
                            }
                            className="w-4 h-4 accent-red-500 cursor-pointer"
                          />
                          {hp} HP
                        </span>
                        <span className="text-[12px] text-[#999]">({count})</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Series cards */}
      <main>
        <p className="text-[#767676] text-[14px] mb-5">
          Showing{" "}
          <strong className="text-[#0D0D0D]">{filtered.length}</strong> of{" "}
          {series.length} series
        </p>

        {filtered.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E0E0E0] rounded-2xl py-20 text-center">
            <p className="text-[#999] text-[15px] mb-4">
              No series match the selected filters.
            </p>
            <button
              onClick={clearAll}
              className="text-red-500 font-semibold text-[14px] hover:underline"
            >
              Clear filters →
            </button>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,260px))]">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:border-red-500 hover:shadow-[0_12px_28px_rgba(204,0,0,0.07)] hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <div className="aspect-[4/3] bg-white overflow-hidden border-b border-[#F0F0F0] relative">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-3 group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-[#CCC] text-[11px]">
                      No image
                    </div>
                  )}
                  <span className="absolute top-2.5 right-2.5 text-[10.5px] font-semibold text-red-500 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
                    {s.hpSummary}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2.5">
                    <h2 className="text-[15.5px] font-bold text-[#0D0D0D] leading-snug mb-0.5 group-hover:text-red-500 transition">
                      {s.name}
                    </h2>
                    <p className="text-[10.5px] text-[#767676] uppercase tracking-[0.05em]">
                      {s.tagline}
                    </p>
                  </div>

                  <p className="text-[12.5px] text-[#5a5a5a] leading-[1.55] mb-3 flex-1 line-clamp-3">
                    {s.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {s.variantTags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 bg-[#F5F5F5] text-[#3a3a3a] rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="text-[10px] px-2 py-0.5 bg-[#F5F5F5] text-[#3a3a3a] rounded-full">
                      {s.variantCount} model{s.variantCount === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between text-[12.5px] pt-2 border-t border-[#f4f4f4]">
                    <span className="font-semibold text-[#0D0D0D] group-hover:text-red-500 transition">
                      View Details
                    </span>
                    <span className="text-red-500 font-semibold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
