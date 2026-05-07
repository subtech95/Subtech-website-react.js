"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { BlogCategory } from "@/lib/types";

const RED = "#C8102E";

type Props = {
  categories: (BlogCategory & { post_count?: number })[];
  activeCat: string;
  activeCatName: string;
  isFiltered: boolean;
  searchQuery: string;
  baseQueryPath: string;
};

/**
 * "All Posts" pill + "Categories" dropdown.
 * Mirrors `.bl-filter-bar` from bloging.php.
 */
export default function BlogFilterRow({
  categories,
  activeCat,
  activeCatName,
  isFiltered,
  searchQuery,
  baseQueryPath,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pillBase =
    "inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border-[1.5px] text-[14px] font-semibold cursor-pointer transition-all whitespace-nowrap";
  const inactive =
    "border-[#e9ecef] bg-white text-[#495057] hover:border-[color:var(--bl-red)] hover:text-[color:var(--bl-red)] hover:bg-[#fff5f5]";
  const active = "bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#2a2a2a]";

  return (
    <div
      className="bg-white border-b border-[#f5f5f5] py-5"
      style={{ ["--bl-red" as string]: RED }}
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Link
            href="/blog"
            className={`${pillBase} ${!isFiltered ? active : inactive}`}
          >
            All Posts
          </Link>

          <div className="relative" ref={wrapRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`${pillBase} ${activeCat ? active : inactive}`}
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
                {categories.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#9ca3af]">
                    No categories
                  </div>
                ) : (
                  categories.map((c) => {
                    const isActive = activeCat === c.slug;
                    return (
                      <Link
                        key={c.id}
                        href={`/blog?cat=${encodeURIComponent(c.slug)}`}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-2.5 text-[14px] font-medium rounded-lg transition-colors ${
                          isActive
                            ? "bg-[#1a1a1a] text-white"
                            : "text-[#495057] hover:bg-[#fff5f5] hover:text-[color:var(--bl-red)]"
                        }`}
                      >
                        {c.name}
                        {typeof c.post_count === "number" && (
                          <span className="ml-1 opacity-70">
                            ({c.post_count})
                          </span>
                        )}
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {searchQuery && (
          <div className="text-center mt-2.5 text-[14px] font-semibold text-[#495057]">
            Showing results for:{" "}
            <span style={{ color: RED }}>{searchQuery}</span>
            &nbsp;|&nbsp;
            <Link href={baseQueryPath} className="text-[#1a1a1a] underline">
              Clear
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
