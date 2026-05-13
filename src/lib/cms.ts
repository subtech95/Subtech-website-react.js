/**
 * Subtech CMS client.
 *
 * Talks to the public read API on the CRM:
 *   `${CMS_BASE_URL}/api/public/*`
 *
 * Response envelope is always `{ status, message, data }`.
 *
 * All reads are server-side (Server Components) and cached via Next.js
 * `revalidate` so the public site stays fast and admin edits show up
 * within `REVALIDATE_SECONDS`.
 */

import type {
  ApiEnvelope,
  BlogCategory,
  BlogListResponse,
  BlogPost,
  Category,
  Product,
  ProductSummary,
  Resource,
  ResourceCategory,
} from "./types";

export const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_BASE_URL?.replace(/\/+$/, "") ??
  "https://crm.subtech.in";

/** How long Next.js may cache CMS responses (5 min). */
export const REVALIDATE_SECONDS = 300;

/**
 * Convert a CMS image path to a fully-qualified URL.
 *
 * The CRM stores images in three shapes historically:
 *   1. Full absolute URL  → "https://…/foo.png"           (return unchanged)
 *   2. Rooted path        → "/uploads/website/cms/foo.png" (prepend origin)
 *   3. Bare filename      → "49.png"                       (legacy PHP blog posts;
 *                                                            actually live at
 *                                                            /uploads/website/cms/)
 * We auto-resolve (3) to (2) so older blog cards show their images instead of
 * getting a 200-OK-HTML response from the CRM's catch-all route.
 */
export function imageUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (/^(https?:|data:)/i.test(src)) return src;
  if (src.startsWith("/")) return `${CMS_BASE_URL}${src}`;
  // Bare filename — assume CMS uploads folder
  return `${CMS_BASE_URL}/uploads/website/cms/${src}`;
}

async function getJson<T>(
  path: string,
  init?: RequestInit & { revalidate?: number },
): Promise<T> {
  const url = `${CMS_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    next: { revalidate: init?.revalidate ?? REVALIDATE_SECONDS },
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
  });

  if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got: ${res.status} ${res.url}\n${text.slice(0, 200)}`);
  }

  const json = (await res.json()) as ApiEnvelope<T>;
  if (!json.status) {
    throw new Error(`CMS error on ${url}: ${json.message}`);
  }
  return json.data;
}
// ── Public API ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return getJson<Category[]>("/api/public/categories");
}

export type ProductsQuery = { pcat?: string; search?: string };

export async function getProducts(
  q: ProductsQuery = {},
): Promise<ProductSummary[]> {
  const qs = new URLSearchParams();
  if (q.pcat) qs.set("pcat", q.pcat);
  if (q.search) qs.set("search", q.search);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return getJson<ProductSummary[]>(`/api/public/products${suffix}`);
}

/**
 * Fetch a single product by slug (or numeric id).
 * Returns `null` if the product is not found, instead of throwing —
 * lets pages call `notFound()` cleanly.
 */
export async function getProduct(slugOrId: string): Promise<Product | null> {
  try {
    return await getJson<Product>(
      `/api/public/products/${encodeURIComponent(slugOrId)}`,
    );
  } catch (err) {
    if (err instanceof Error && err.message.includes("404")) return null;
    if (err instanceof Error && err.message.includes("not found")) return null;
    throw err;
  }
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return getJson<BlogCategory[]>("/api/public/blog-categories");
}

export type BlogQuery = {
  cat?: string;
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
};

export async function getBlogPosts(
  q: BlogQuery = {},
): Promise<BlogListResponse> {
  const qs = new URLSearchParams();
  if (q.cat) qs.set("cat", q.cat);
  if (q.tag) qs.set("tag", q.tag);
  if (q.search) qs.set("search", q.search);
  if (q.page && q.page > 1) qs.set("page", String(q.page));
  if (q.perPage) qs.set("per_page", String(q.perPage));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return getJson<BlogListResponse>(`/api/public/blogs${suffix}`);
}

/**
 * Fetch a single published blog post by slug.
 * Returns `null` if not found so pages can call `notFound()` cleanly.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getJson<BlogPost>(
      `/api/public/blogs/${encodeURIComponent(slug)}`,
    );
  } catch (err) {
    if (err instanceof Error && /Blog post not found|404/i.test(err.message)) {
      return null;
    }
    throw err;
  }
}

// ── Resources ─────────────────────────────────────────────────────────────────

export type ResourceQuery = { category?: string; search?: string };

export async function getResources(q: ResourceQuery = {}): Promise<Resource[]> {
  const qs = new URLSearchParams();
  if (q.category) qs.set("category", q.category);
  if (q.search) qs.set("search", q.search);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return getJson<Resource[]>(`/api/public/resources${suffix}`);
}

export async function getResourceCategories(): Promise<ResourceCategory[]> {
  return getJson<ResourceCategory[]>("/api/public/resource-categories");
}

/**
 * Build the public URL for the resource download endpoint.
 * Use this from the client to bump the download counter — the file itself
 * lives at `imageUrl(resource.file_url)`.
 */
export function resourceDownloadUrl(id: number): string {
  return `${CMS_BASE_URL}/api/public/resources/${id}/download`;
}
