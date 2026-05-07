"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { imageUrl, resourceDownloadUrl } from "@/lib/cms";
import type { Resource, ResourceCategory } from "@/lib/types";

const RED = "#E40006";

/* ───────── helpers ───────── */
function formatNumber(num: number): string {
  if (num >= 1000) {
    const x = num / 1000;
    return x % 1 !== 0 ? `${x.toFixed(1)}k` : `${Math.round(x)}k`;
  }
  return String(num);
}

function formatDate(d: string | null): string {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function categorySlug(name: string | null | undefined): string {
  return String(name ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

/** Pick a deterministic placeholder image when the resource has no thumbnail. */
function placeholderImage(seed: string | number): string {
  const id = String(seed)
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const pics = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  ];
  return pics[id % pics.length];
}

/* ───────── HERO ───────── */
function ResourcesHero() {
  return (
    <section className="pt-32 pb-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="flex items-center justify-center gap-2 text-[13px] font-semibold mb-3"
            style={{ color: RED }}
          >
            <span className="w-[18px] h-[2px] rounded-full" style={{ background: RED }} />
            Knowledge Hub
          </div>
          <h1 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0D0D0D]">
            Resources
          </h1>
          <p className="text-[#4b5563] mt-3 max-w-2xl mx-auto text-[15px] leading-[1.7]">
            Access our complete suite of downloadable catalogs, datasheets, price lists, forms and
            company information.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── SEARCH BAR ───────── */
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="max-w-[650px] mx-auto mt-8 mb-8 relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333] pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search resources by name..."
        className="w-full rounded-xl pl-11 pr-5 py-3.5 border border-[#eee] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)] text-[15px] text-[#0D0D0D] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ddd] focus:shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition"
      />
    </div>
  );
}

/* ───────── FILTER PILLS ───────── */
function FilterPills({
  categories,
  active,
  onChange,
}: {
  categories: { label: string; slug: string }[];
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((c) => {
        const isActive = active === c.slug;
        return (
          <button
            key={c.slug}
            onClick={() => onChange(c.slug)}
            className={`rounded-full border px-5 py-2 text-[14px] font-medium transition ${
              isActive
                ? "text-white"
                : "bg-white text-[#666] border-[#eee] hover:border-[#ddd]"
            }`}
            style={
              isActive
                ? {
                    background: RED,
                    borderColor: RED,
                    boxShadow: "0 4px 15px rgba(228,0,6,0.3)",
                  }
                : undefined
            }
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── RESOURCE CARD ───────── */
function ResourceCard({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const [downloads, setDownloads] = useState<number>(Number(resource.download_count) || 0);
  const fileHref = imageUrl(resource.file_url) ?? "#";
  const thumb = imageUrl(resource.thumbnail) ?? placeholderImage(resource.id);

  // Fire-and-forget download counter bump. Optimistically increment locally.
  const handleDownload = () => {
    if (!resource.file_url) return;
    setDownloads((d) => d + 1);
    fetch(resourceDownloadUrl(resource.id), { method: "POST" }).catch(() => {
      /* counter is best-effort — never block the file download */
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.07)] overflow-hidden h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="relative h-[220px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={resource.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/600x400/f3f4f6/E40006?text=Subtech";
          }}
        />
        <div
          className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
          style={{ color: RED }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          {formatNumber(downloads)} downloads
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h5 className="font-bold text-[1.2rem] text-[#0D0D0D] mb-3">{resource.title}</h5>
        <p className="text-[#777] text-[14px] leading-[1.5] mb-5 flex-1">
          {resource.description || "—"}
        </p>
        <div className="flex items-center gap-2 text-[13px] text-[#aaa] mb-6">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          Last updated: {formatDate(resource.created_at)}
        </div>
        {resource.file_url ? (
          <a
            href={fileHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownload}
            className="rounded-xl py-3 px-4 font-semibold text-white text-[14px] flex items-center justify-center gap-2 hover:brightness-95 transition"
            style={{ background: RED }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download
          </a>
        ) : (
          <span className="rounded-xl py-3 px-4 font-semibold text-[#9ca3af] text-[14px] flex items-center justify-center gap-2 bg-[#f3f4f6]">
            File coming soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ───────── PAGE ───────── */
export default function ResourcesClient({
  resources,
  categories,
}: {
  resources: Resource[];
  categories: ResourceCategory[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const pillItems = useMemo(
    () => [
      { label: "All Resources", slug: "all" },
      ...categories.map((c) => ({ label: c.name, slug: c.slug })),
    ],
    [categories],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "all" || categorySlug(r.category) === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, search, activeCategory]);

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <ResourcesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPills
          categories={pillItems}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {resources.length === 0 ? (
          <div className="text-center py-20 text-[#767676]">
            <p className="text-[15px]">
              No resources are available yet. Please check back soon.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#767676]">
            <p className="text-[15px]">No resources found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
