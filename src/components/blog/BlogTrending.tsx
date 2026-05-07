import Link from "next/link";
import type { BlogPostSummary } from "@/lib/types";

const RED = "#C8102E";

function readTime(text: string | null) {
  const words = (text ?? "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDate(d: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
}

export default function BlogTrending({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  if (!posts.length) return null;

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="mb-8">
          <div
            className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
            style={{ color: RED }}
          >
            Most Read
          </div>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
            Trending Articles
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="flex items-start gap-5 p-6 border border-[#d4d4d4] rounded-[10px] transition hover:border-[rgba(200,16,46,0.3)] hover:bg-[#fef2f2]"
            >
              <div
                className="text-[32px] font-extralight italic leading-none shrink-0 min-w-[40px]"
                style={{ color: RED }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                {p.category && (
                  <div
                    className="text-[11px] font-semibold tracking-[1.5px] uppercase mb-1.5"
                    style={{ color: RED }}
                  >
                    {p.category}
                  </div>
                )}
                <h4 className="text-[15px] font-semibold text-[#111] leading-[1.45] mb-2">
                  {p.title}
                </h4>
                <div className="text-[12px] text-[#6b6b6b]">
                  {p.author && <>{p.author} • </>}
                  {formatDate(p.published_at ?? p.created_at)} •{" "}
                  {readTime(p.short_desc)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
