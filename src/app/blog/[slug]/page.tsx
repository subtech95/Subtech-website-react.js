import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getBlogPosts,
  imageUrl,
  REVALIDATE_SECONDS,
} from "@/lib/cms";
import type { BlogPostSummary } from "@/lib/types";
import BlogReadingProgress from "@/components/blog/BlogReadingProgress";
import BlogShareRail from "@/components/blog/BlogShareRail";
import BlogCommentForm from "@/components/blog/BlogCommentForm";

export const revalidate = REVALIDATE_SECONDS;

const SITE_URL = "https://subtech.in";
const RED = "#EF2E33";

type Params = Promise<{ slug: string }> | { slug: string };

function unwrap<T>(p: T | Promise<T>): Promise<T> {
  return Promise.resolve(p as T | Promise<T>);
}

function readTime(text: string | null) {
  const words = (text ?? "")
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatLong(d: string | null) {
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

function getInitials(name: string | null) {
  const n = (name ?? "").trim();
  if (!n) return "S";
  return n
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function categorySlug(name: string | null): string {
  return (name ?? "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await unwrap(params);
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: "Blog post not found | Subtech" };
  }
  const img = imageUrl(post.image);
  return {
    title: `${post.title} | Subtech`,
    description:
      ((post.content ?? "")
        .replace(/<[^>]*>/g, "")
        .slice(0, 160)
        .trim() || `${post.title} — Subtech blog`),
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "Subtech",
      title: post.title,
      ...(img && {
        images: [{ url: img, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      ...(img && { images: [img] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await unwrap(params);
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const img = imageUrl(post.image);
  const mins = readTime(post.content);
  const date = formatLong(post.published_at ?? post.created_at);
  const author = post.author ?? "Subtech Team";
  const cat = post.category;
  const catSlug = categorySlug(cat);
  const canonical = `${SITE_URL}/blog/${post.slug}`;

  // Suggested posts: same category if available, else latest 3 (excluding current).
  let suggested: BlogPostSummary[] = [];
  try {
    const list = await getBlogPosts({
      cat: cat ? catSlug : undefined,
      perPage: 4,
    });
    suggested = list.posts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
    if (suggested.length === 0) {
      const fallback = await getBlogPosts({ perPage: 4 });
      suggested = fallback.posts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);
    }
  } catch {
    suggested = [];
  }

  const tags = (post.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="bg-[#fafaf8]">
      <BlogReadingProgress />

      {/* ───── DARK CINEMATIC HERO ───── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:pt-32 md:pb-16">
        {/* Ambient red glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 80%, rgba(239,46,51,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-[1] max-w-[900px] mx-auto px-6 md:px-10">
          {/* Category eyebrow */}
          {cat && (
            <Link
              href={`/blog?cat=${catSlug}`}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase mb-5 transition-colors"
              style={{ color: RED }}
            >
              <span
                className="inline-block w-7 h-[2px]"
                style={{ background: RED }}
              />
              {cat}
            </Link>
          )}

          <h1 className="text-white text-[clamp(26px,4.5vw,48px)] font-extrabold tracking-[-1.2px] leading-[1.12] mb-7">
            {post.title}
          </h1>

          {/* Author + meta pills */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center text-white text-[16px] font-bold shrink-0 border-2 border-white/[0.15]"
                style={{
                  background: `linear-gradient(135deg, ${RED}, #ff6b6b)`,
                }}
              >
                {getInitials(author)}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white leading-tight">
                  {author}
                </div>
                <div className="text-[11px] text-white/40">Subtech</div>
              </div>
            </div>

            <Pill>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[13px] h-[13px]"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {mins} min read
            </Pill>
            <Pill>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[13px] h-[13px]"
              >
                <path d="M4 4h16v12H5.17L4 17.17V4z" />
              </svg>
              {Number(post.comment_count) || 0} comments
            </Pill>
            <Pill>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-[13px] h-[13px]"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {date}
            </Pill>
          </div>
        </div>
      </section>

      {/* ───── HERO IMAGE ───── */}
      {img && (
        <div className="max-w-[900px] mx-auto px-6 md:px-10 mt-5 relative z-[3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={post.title}
            className="w-full h-auto block rounded-[14px] shadow-[0_16px_48px_rgba(0,0,0,0.15)] object-cover"
          />
        </div>
      )}

      {/* ───── CONTENT (share + article) ───── */}
      <div className="max-w-[880px] mx-auto px-6 pt-14 grid md:grid-cols-[200px_1fr] gap-6 md:gap-0 items-start">
        {/* Sticky share rail */}
        <aside className="md:sticky md:top-24 md:pr-4 md:self-start z-[10]">
          <BlogShareRail url={canonical} title={post.title} />
        </aside>

        {/* Article body with red wire accent */}
        <div className="relative pl-6 border-l-2" style={{ borderColor: RED }}>
          {/* Circuit dots top + bottom */}
          <span
            aria-hidden
            className="absolute top-0 -left-[5px] w-2 h-2 rounded-full"
            style={{ background: RED }}
          />
          <span
            aria-hidden
            className="absolute bottom-0 -left-[5px] w-2 h-2 rounded-full"
            style={{ background: RED }}
          />

          {/* Rendered HTML content from CMS */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-7 border-t border-[#e0e0e0] flex items-center gap-3.5 flex-wrap">
              <span className="text-[10px] font-extrabold tracking-[2px] uppercase text-[#bbb]">
                Tags
              </span>
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(
                    t.replace(/\s+/g, "-"),
                  )}`}
                  className="px-4 py-1 rounded-full border-[1.5px] border-[#e0e0e0] text-[12.5px] font-semibold text-[#666] transition-all hover:-translate-y-0.5"
                  style={{
                    transition: "all 0.25s",
                  }}
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ───── SUGGESTED POSTS ───── */}
      {suggested.length > 0 && (
        <section className="max-w-[880px] mx-auto px-6 mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
            <h3 className="text-[22px] font-extrabold text-[#111] m-0">
              Suggested Posts
            </h3>
            {cat && (
              <Link
                href={`/blog?cat=${catSlug}`}
                className="text-[13px] font-bold border-b-[1.5px] pb-px"
                style={{
                  color: RED,
                  borderColor: "rgba(239,46,51,0.25)",
                }}
              >
                View all
              </Link>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {suggested.map((s) => {
              const sImg = imageUrl(s.image);
              return (
                <Link
                  key={s.id}
                  href={`/blog/${s.slug}`}
                  className="group block rounded-[14px] overflow-hidden border border-[#e0e0e0] bg-white transition-all hover:-translate-y-1 hover:border-[rgba(239,46,51,0.35)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="aspect-[16/9] bg-black">
                    {sImg && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sImg}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3.5 pb-4">
                    <div className="text-[12px] text-[#999] mb-1.5">
                      {formatLong(s.published_at ?? s.created_at)}
                    </div>
                    <div className="text-[15px] font-extrabold text-[#111] leading-[1.35] mb-2.5 line-clamp-2">
                      {s.title}
                    </div>
                    <div
                      className="text-[13px] font-extrabold transition-all group-hover:translate-x-1"
                      style={{ color: RED }}
                    >
                      Read more →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ───── COMMENT SECTION (DARK) ───── */}
      <section className="bg-[#111] mt-20 py-16 px-6 w-screen relative left-1/2 -translate-x-1/2">
        <div className="max-w-[640px] mx-auto">
          <h3 className="text-[28px] font-extrabold text-white tracking-[-0.5px] mb-2">
            Leave a Comment
          </h3>
          <p className="text-[14px] text-white/40 mb-9">
            Your email address will not be published.
          </p>
          <BlogCommentForm blogId={post.id} />
        </div>
      </section>

      {/* Article HTML styles — scoped to .blog-prose */}
      <style>{`
        .blog-prose {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 17.5px;
          line-height: 1.85;
          color: #3a3a3a;
        }
        .blog-prose p { margin-bottom: 26px; }
        .blog-prose h1 {
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 800;
          color: #111;
          margin: 28px 0 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .blog-prose h2 {
          font-size: 26px;
          font-weight: 800;
          color: #111;
          margin: 56px 0 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          position: relative;
          padding-bottom: 12px;
        }
        .blog-prose h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 48px;
          height: 3px;
          background: ${RED};
          border-radius: 2px;
        }
        .blog-prose h3 {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin: 40px 0 12px;
          line-height: 1.3;
        }
        .blog-prose h4 {
          font-size: 17px;
          font-weight: 700;
          color: #111;
          margin: 32px 0 10px;
        }
        .blog-prose a {
          color: ${RED};
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(239,46,51,0.25);
          transition: border-color 0.2s;
        }
        .blog-prose a:hover { border-bottom-color: ${RED}; }
        .blog-prose strong { font-weight: 700; color: #111; }
        .blog-prose img {
          max-width: 100%;
          border-radius: 10px;
          margin: 28px 0;
          display: block;
          height: auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .blog-prose ul,
        .blog-prose ol { margin: 0 0 26px 24px; }
        .blog-prose li { margin-bottom: 8px; line-height: 1.8; }
        .blog-prose li::marker { color: ${RED}; font-weight: 700; }
        .blog-prose blockquote {
          margin: 36px 0;
          padding: 28px 32px 28px 28px;
          background: #111;
          color: rgba(255,255,255,0.85);
          border-radius: 12px;
          font-size: 18px;
          font-style: italic;
          line-height: 1.7;
          position: relative;
          overflow: hidden;
          border: none;
        }
        .blog-prose blockquote::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, ${RED}, #ff6b6b, ${RED});
        }
        .blog-prose blockquote p {
          margin-bottom: 0;
          color: rgba(255,255,255,0.85);
        }
        .blog-prose code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.84em;
          background: #f5f5f3;
          padding: 2px 7px;
          border-radius: 4px;
          color: #c9232a;
        }
        .blog-prose pre {
          background: #0d0d1a;
          color: #d4d4d4;
          padding: 24px 28px;
          border-radius: 12px;
          overflow-x: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 28px 0;
        }
        .blog-prose pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .blog-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 28px 0;
          font-size: 15px;
          border-radius: 10px;
          overflow: hidden;
        }
        .blog-prose table th {
          background: #111;
          color: #fff;
          padding: 12px 16px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-align: left;
        }
        .blog-prose table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e0e0e0;
        }
        .blog-prose table tr:hover td { background: #f5f5f3; }
        .blog-prose hr {
          border: none;
          height: 1px;
          background: #e0e0e0;
          margin: 3rem 0;
          position: relative;
        }
        .blog-prose hr::before {
          content: '⚡';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 16px;
          background: #fafaf8;
          padding: 0 12px;
        }
        .blog-prose .lead {
          font-size: 19px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        @media (max-width: 600px) {
          .blog-prose { font-size: 16px; }
          .blog-prose h2 { font-size: 22px; }
        }
      `}</style>
    </article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-white/55 backdrop-blur-md">
      {children}
    </span>
  );
}
