import type { Metadata } from "next";
import Link from "next/link";
import {
  getBlogCategories,
  getBlogPosts,
  imageUrl,
  REVALIDATE_SECONDS,
} from "@/lib/cms";
import type { BlogPostSummary } from "@/lib/types";
import BlogHero from "@/components/blog/BlogHero";
import BlogFilterRow from "@/components/blog/BlogFilterRow";
import BlogStatsBar from "@/components/blog/BlogStatsBar";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogTopicsStrip from "@/components/blog/BlogTopicsStrip";
import BlogTrending from "@/components/blog/BlogTrending";
import BlogNewsletter from "@/components/blog/BlogNewsletter";

export const revalidate = REVALIDATE_SECONDS;

const PER_PAGE = 12;
const SITE_URL = "https://subtech.in";
const RED = "#C8102E";

type SearchParams = {
  cat?: string;
  tag?: string;
  s?: string;
  page?: string;
};

function truncate(text: string | null, limit = 150): string {
  const stripped = (text ?? "").replace(/<[^>]*>/g, "");
  if (stripped.length <= limit) return stripped;
  const cut = stripped.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "...";
}

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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function buildPageUrl(
  page: number,
  cat?: string,
  tag?: string,
  search?: string,
): string {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (tag) params.set("tag", tag.replace(/ /g, "-"));
  if (search) params.set("s", search);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}): Promise<Metadata> {
  const params =
    "then" in (searchParams as Promise<SearchParams>)
      ? await (searchParams as Promise<SearchParams>)
      : (searchParams as SearchParams);

  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const titleSuffix = page > 1 ? ` - Page ${page}` : "";
  const title = `Blogs - Electrical Automation Insights | Subtech${titleSuffix}`;
  const description =
    "Expert articles on motor control panels, AMF panels, ATS, VFD, pump automation, and industrial electrical systems. Insights by Subtech - trusted since 1998.";
  const canonical = `${SITE_URL}/blog${page > 1 ? `?page=${page}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: page > 1 ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blog`,
      siteName: "Subtech",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/images/subtech.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/subtech.jpg`],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const params =
    "then" in (searchParams as Promise<SearchParams>)
      ? await (searchParams as Promise<SearchParams>)
      : (searchParams as SearchParams);

  const cat = params.cat?.trim() || "";
  const tag = params.tag ? params.tag.replace(/-/g, " ").trim() : "";
  const search = params.s?.trim() || "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const isFiltered = !!(cat || tag || search);
  const isLanding = !isFiltered && page === 1;

  // On the landing variant, request 1 extra so we can extract a "featured" card
  const requestPerPage = isLanding ? PER_PAGE + 1 : PER_PAGE;

  const [list, categories] = await Promise.all([
    getBlogPosts({ cat, tag, search, page, perPage: requestPerPage }),
    getBlogCategories(),
  ]);

  let { posts } = list;
  const { total, total_pages } = list;

  // Pull out featured (latest) post for the landing variant
  let featured: BlogPostSummary | null = null;
  if (isLanding && posts.length > 0) {
    featured = posts[0];
    posts = posts.slice(1, PER_PAGE + 1);
  }

  // Trending: pick top-4 by comment_count from the visible page (no extra fetch)
  const trending: BlogPostSummary[] = isLanding
    ? [...posts]
        .sort((a, b) => Number(b.comment_count ?? 0) - Number(a.comment_count ?? 0))
        .slice(0, 4)
    : [];

  const activeCategory = cat ? categories.find((c) => c.slug === cat) : null;
  const totalCategories = categories.length;
  const baseQueryPath = cat ? `/blog?cat=${cat}` : "/blog";

  return (
    <div className="bg-white">
      {/* HERO */}
      <BlogHero
        initialQuery={search}
        activeCat={cat}
        totalPosts={total}
        totalCategories={totalCategories}
      />

      {/* FILTER ROW */}
      <BlogFilterRow
        categories={categories}
        activeCat={cat}
        activeCatName={activeCategory?.name ?? ""}
        isFiltered={isFiltered}
        searchQuery={search}
        baseQueryPath={baseQueryPath}
      />

      {/* STATS BAR (landing only) */}
      {isLanding && <BlogStatsBar totalPosts={total} />}

      {/* FEATURED (landing only) */}
      {featured && (
        <BlogFeatured post={featured} imgUrl={imageUrl(featured.image)} />
      )}

      {/* GRID */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-[1120px] mx-auto">
          {/* Grid header */}
          <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
            <div>
              {search ? (
                <>
                  <div
                    className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
                    style={{ color: RED }}
                  >
                    Search Results
                  </div>
                  <div className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
                    Results for &ldquo;{search}&rdquo; ({total})
                  </div>
                </>
              ) : cat ? (
                <>
                  <div
                    className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
                    style={{ color: RED }}
                  >
                    Category
                  </div>
                  <div className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
                    {activeCategory?.name ?? cat}
                  </div>
                </>
              ) : tag ? (
                <>
                  <div
                    className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
                    style={{ color: RED }}
                  >
                    Tagged
                  </div>
                  <div className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
                    {tag}
                  </div>
                </>
              ) : page > 1 ? (
                <>
                  <div
                    className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
                    style={{ color: RED }}
                  >
                    All Articles
                  </div>
                  <div className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
                    Page {page}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-[12px] font-semibold tracking-[2.5px] uppercase mb-3"
                    style={{ color: RED }}
                  >
                    Latest Articles
                  </div>
                  <div className="text-[clamp(24px,3vw,34px)] font-bold text-[#111] tracking-[-0.5px]">
                    Recent Posts
                  </div>
                </>
              )}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 text-[#6b6b6b] border border-dashed border-[#d4d4d4] rounded-xl">
              <div className="text-5xl mb-3">🔍</div>
              <div className="text-lg font-semibold text-[#111] mb-2">
                No articles found
              </div>
              <div className="text-sm">
                Try a different search term or{" "}
                <Link href="/blog" className="underline" style={{ color: RED }}>
                  browse all articles
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const img = imageUrl(post.image);
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white border border-[#d4d4d4] rounded-[10px] overflow-hidden block transition hover:border-[rgba(200,16,46,0.3)] hover:shadow-[0_8px_32px_rgba(200,16,46,0.08)] hover:-translate-y-1"
                  >
                    <div
                      className="relative aspect-[16/10] overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a1a1a 0%, #2d1520 60%, #3d0a18 100%)",
                      }}
                    >
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-white/[0.12] text-5xl">
                          ⚡
                        </div>
                      )}
                      <span
                        className="absolute top-3.5 right-3.5 text-[10px] font-semibold px-2.5 py-1 rounded-full text-white tracking-[0.5px]"
                        style={{ background: "rgba(200,16,46,0.85)" }}
                      >
                        {readTime(post.short_desc)}
                      </span>
                    </div>
                    <div className="p-6">
                      {post.category && (
                        <div
                          className="text-[11px] font-semibold tracking-[1.5px] uppercase mb-2.5"
                          style={{ color: RED }}
                        >
                          {post.category}
                        </div>
                      )}
                      <h3 className="text-[16px] font-semibold text-[#111] leading-[1.4] tracking-[-0.2px] mb-2.5 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[14px] font-light text-[#6b6b6b] leading-[1.7] mb-4 line-clamp-3">
                        {truncate(post.short_desc, 150)}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f5]">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${RED}, #ff4d6d)`,
                            }}
                          >
                            {post.author ? getInitials(post.author) : "ST"}
                          </div>
                          <div className="text-[13px] font-medium text-[#404040]">
                            {post.author ?? "Subtech"}
                          </div>
                        </div>
                        <div className="text-[12px] text-[#6b6b6b]">
                          {formatDate(post.published_at ?? post.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {total_pages > 1 && (
            <Pagination
              page={page}
              totalPages={total_pages}
              total={total}
              cat={cat}
              tag={tag}
              search={search}
            />
          )}
        </div>
      </section>

      {/* TOPICS STRIP (landing only) */}
      {isLanding && <BlogTopicsStrip categories={categories} />}

      {/* TRENDING (landing only) */}
      {isLanding && trending.length > 0 && <BlogTrending posts={trending} />}

      {/* NEWSLETTER (page 1 only) */}
      {page === 1 && <BlogNewsletter />}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  total,
  cat,
  tag,
  search,
}: {
  page: number;
  totalPages: number;
  total: number;
  cat: string;
  tag: string;
  search: string;
}) {
  const range = 2;
  const start = Math.max(1, page - range);
  const end = Math.min(totalPages, page + range);
  const startNum = (page - 1) * PER_PAGE + 1;
  const endNum = Math.min(page * PER_PAGE, total);

  const baseClass =
    "inline-flex items-center justify-center min-w-[42px] h-[42px] px-3.5 rounded-[10px] text-[14px] font-semibold border-[1.5px] border-[#e0e0e0] bg-white text-[#495057] transition-all";
  const linkClass = `${baseClass} hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#fff5f5] hover:-translate-y-0.5`;
  const activeClass = `${baseClass} bg-[#1a1a1a] text-white border-[#1a1a1a] pointer-events-none`;
  const disabledClass = `${baseClass} opacity-35 pointer-events-none`;

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <>
      <nav
        className="flex justify-center items-center gap-1.5 mt-12 flex-wrap"
        aria-label="Blog pagination"
      >
        {page > 1 ? (
          <Link
            href={buildPageUrl(page - 1, cat, tag, search)}
            className={`${linkClass} font-bold gap-1`}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Prev
          </Link>
        ) : (
          <span className={`${disabledClass} font-bold gap-1`}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Prev
          </span>
        )}

        {start > 1 && (
          <>
            <Link href={buildPageUrl(1, cat, tag, search)} className={linkClass}>
              1
            </Link>
            {start > 2 && (
              <span className="text-[#999] min-w-[32px] text-center">...</span>
            )}
          </>
        )}

        {pages.map((i) =>
          i === page ? (
            <span key={i} className={activeClass} aria-current="page">
              {i}
            </span>
          ) : (
            <Link
              key={i}
              href={buildPageUrl(i, cat, tag, search)}
              className={linkClass}
            >
              {i}
            </Link>
          ),
        )}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="text-[#999] min-w-[32px] text-center">...</span>
            )}
            <Link
              href={buildPageUrl(totalPages, cat, tag, search)}
              className={linkClass}
            >
              {totalPages}
            </Link>
          </>
        )}

        {page < totalPages ? (
          <Link
            href={buildPageUrl(page + 1, cat, tag, search)}
            className={`${linkClass} font-bold gap-1`}
            aria-label="Next page"
          >
            Next
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <span className={`${disabledClass} font-bold gap-1`}>
            Next
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        )}
      </nav>
      <div className="text-center mt-3.5 text-[13px] text-[#999] font-medium">
        Showing {startNum}-{endNum} of {total} posts
      </div>
    </>
  );
}
