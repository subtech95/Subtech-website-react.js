/**
 * Types for the Subtech CRM public API (`https://crm.subtech.in/api/public/*`).
 *
 * Response shape: `{ status: true, message, data: T }`
 */

export type ApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  product_count?: number;
};

/** Shape returned by `GET /api/public/products` (list view). */
export type ProductSummary = {
  id: number;
  name: string;
  slug: string;
  pcat_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  image: string | null;
  description: string | null;
  price: string | null;
};

/** Shape returned by `GET /api/public/products/:slug` (detail view). */
export type Product = ProductSummary & {
  specs: string | null;
  created_at?: string;
};

// ── Blog ──────────────────────────────────────────────────────────────────────
// Matches the CRM responses from /api/public/blog-categories and /api/public/blogs.

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  count?: number;
};

/**
 * Shape returned by `GET /api/public/blogs` (list view).
 * Mirrors columns selected in CRM `public.routes.js`.
 */
export type BlogPostSummary = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  category: string | null;
  author: string | null;
  tags: string | null;
  published_at: string | null;
  created_at: string | null;
  short_desc: string | null;
  comment_count: number | string;
};

export type BlogListResponse = {
  posts: BlogPostSummary[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
};

/** Shape returned by `GET /api/public/blogs/:slug` (detail view). */
export type BlogPost = Omit<BlogPostSummary, "short_desc"> & {
  content: string | null;
};

// ── Resources ────────────────────────────────────────────────────────────────
// Matches CRM `mi_resource` table:
//   id, title, description, file_url, category, download_count,
//   active, created_at

export type Resource = {
  id: number;
  title: string;
  description: string | null;
  file_url: string | null;
  thumbnail: string | null;
  type: string | null;
  category: string | null;
  sort_order?: number | null;
  download_count: number | string;
  created_at: string | null;
};

export type ResourceCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};
