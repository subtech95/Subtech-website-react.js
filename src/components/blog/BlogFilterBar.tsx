"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { BlogCategory } from "@/lib/types";

type Props = {
  categories: BlogCategory[];
  activeCat: string;
  activeCatName: string;
  search: string;
};

export default function BlogFilterBar({
  categories,
  activeCat,
  activeCatName,
  search,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(search);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const isAllActive = !activeCat && !search;

  const filterBtn =
    "px-6 py-2.5 rounded-full border-[1.5px] text-sm font-semibold cursor-pointer transition-all inline-flex items-center gap-1.5 whitespace-nowrap";
  const inactive =
    "border-[#e9ecef] bg-white text-[#495057] hover:border-[#e93132] hover:text-[#e93132] hover:bg-[#fff5f5]";
  const active = "bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#2a2a2a]";

  function submitSearch() {
    const q = value.trim();
    const params = new URLSearchParams();
    if (activeCat) params.set("cat", activeCat);
    if (q) params.set("s", q);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog");
  }

  return (
    <div className="flex items-center justify-center gap-2.5 flex-wrap">
      <Link
        href="/blog"
        className={`${filterBtn} ${isAllActive ? active : inactive}`}
      >
        All Posts
      </Link>

      <div className="relative" ref={wrapRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`${filterBtn} ${activeCat ? active : inactive}`}
        >
          {activeCatName || "Categories"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open && (
          <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[260px] max-h-[360px] overflow-y-auto bg-white border border-[#e5e7eb] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-1.5 z-[100]">
            {categories.map((c) => {
              const isActive = activeCat === c.slug;
              return (
                <Link
                  key={c.id}
                  href={`/blog?cat=${encodeURIComponent(c.slug)}`}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                      : "text-[#495057] hover:bg-[#fff5f5] hover:text-[#e93132]"
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
            {categories.length === 0 && (
              <div className="px-4 py-3 text-sm text-[#9ca3af]">
                No categories
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-[300px] max-w-full">
        <div className="relative flex items-center w-full h-[45px] border-[1.5px] border-[#d1d5db] rounded-full bg-white px-4 transition-all focus-within:border-[#e93132] focus-within:shadow-[0_0_0_3px_rgba(233,49,50,0.1)]">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="#999"
            strokeWidth="2"
            className="flex-shrink-0 mr-2.5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            id="instantSearch"
            type="text"
            autoComplete="off"
            value={value}
            placeholder={
              activeCatName
                ? `Search in ${activeCatName}...`
                : "Search articles..."
            }
            onChange={(e) => {
              setValue(e.target.value);
              window.dispatchEvent(
                new CustomEvent("blog-instant-filter", {
                  detail: e.target.value,
                }),
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch();
            }}
            className="w-full border-0 outline-none bg-transparent text-sm text-[#1a1a1a] placeholder:text-[#9ca3af]"
          />
        </div>
      </div>
    </div>
  );
}
