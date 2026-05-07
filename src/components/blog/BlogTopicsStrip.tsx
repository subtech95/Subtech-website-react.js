import Link from "next/link";
import type { BlogCategory } from "@/lib/types";

const RED = "#C8102E";

export default function BlogTopicsStrip({
  categories,
}: {
  categories: (BlogCategory & { post_count?: number })[];
}) {
  if (!categories.length) return null;

  return (
    <div className="py-14 bg-[#f5f5f5]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-16 items-center">
          <div>
            <div
              className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
              style={{ color: RED }}
            >
              Browse by Topic
            </div>
            <h2 className="text-[28px] font-bold text-[#111] tracking-[-0.5px] mb-3">
              Find What You Need
            </h2>
            <p className="text-[15px] text-[#6b6b6b] leading-[1.7] font-light">
              Filter articles by the system or problem you are working with.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/blog?cat=${encodeURIComponent(c.slug)}`}
                className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#d4d4d4] rounded-md text-[13px] font-medium text-[#404040] transition hover:bg-[color:var(--bl-red)] hover:border-[color:var(--bl-red)] hover:text-white"
                style={{ ["--bl-red" as string]: RED }}
              >
                {c.name}
                {typeof c.post_count === "number" && (
                  <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#6b6b6b] group-hover:bg-white/20 group-hover:text-white/80">
                    {c.post_count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
