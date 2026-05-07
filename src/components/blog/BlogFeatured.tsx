import Link from "next/link";
import type { BlogPostSummary } from "@/lib/types";

const RED = "#C8102E";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function readTime(text: string | null) {
  const words = (text ?? "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatLong(d: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function truncate(text: string | null, limit: number) {
  const t = (text ?? "").replace(/<[^>]*>/g, "");
  if (t.length <= limit) return t;
  const cut = t.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "...";
}

export default function BlogFeatured({
  post,
  imgUrl,
}: {
  post: BlogPostSummary;
  imgUrl: string | null;
}) {
  const tags = (post.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section className="pt-16 pb-0 px-4 sm:px-6">
      <div className="max-w-[1120px] mx-auto">
        <div
          className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-7"
          style={{ color: RED }}
        >
          Editor&apos;s Pick
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="group grid md:grid-cols-2 rounded-xl overflow-hidden border border-[#d4d4d4] no-underline"
        >
          {/* Visual */}
          <div
            className="relative min-h-[280px] md:min-h-[420px] flex flex-col justify-end overflow-hidden"
            style={{
              background: imgUrl
                ? `linear-gradient(135deg, #1a1a1a 0%, #2d0d14 100%)`
                : "linear-gradient(135deg, #1a1a1a 0%, #2d0d14 100%)",
              backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.75) 100%)",
              }}
            />
            <div className="relative z-[2] px-6 md:px-9 pb-3 md:pb-4">
              {post.category && (
                <div
                  className="inline-block px-3 py-1 rounded text-[10px] font-semibold tracking-[1.5px] uppercase text-white mb-3.5"
                  style={{ background: "rgba(200,16,46,0.85)" }}
                >
                  {post.category}
                </div>
              )}
              <h2 className="text-[22px] md:text-[24px] font-bold text-white leading-[1.3] tracking-[-0.5px] [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                {post.title}
              </h2>
            </div>
            <div className="relative z-[2] px-6 md:px-9 pt-4 pb-7">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${RED}, #ff4d6d)`,
                  }}
                >
                  {post.author ? getInitials(post.author) : "ST"}
                </div>
                <div>
                  <span className="block text-[13px] font-semibold text-white/85">
                    {post.author ?? "Subtech"}
                  </span>
                  <time className="text-[12px] text-white/40">
                    {formatLong(post.published_at ?? post.created_at)}
                  </time>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 bg-white flex flex-col justify-between">
            <div>
              <p className="text-[16px] font-light text-[#404040] leading-[1.8] mb-6">
                {truncate(post.short_desc, 300)}
              </p>
              <div className="text-[13px] text-[#6b6b6b] mb-5">
                {readTime(post.short_desc)}
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-[#f5f5f5] rounded-full text-[12px] font-medium text-[#404040]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-md text-white font-semibold text-[14px] transition group-hover:bg-[#333]"
              style={{ background: "#111" }}
            >
              Read Full Article
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
