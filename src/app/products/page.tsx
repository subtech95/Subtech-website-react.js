import type { Metadata } from "next";
import Link from "next/link";
import {
  getCategories,
  getProducts,
  imageUrl,
  REVALIDATE_SECONDS,
} from "@/lib/cms";

export const revalidate = REVALIDATE_SECONDS;

export const metadata: Metadata = {
  title: "Products | Subtech - Industrial Electrical Panels & Automation",
  description:
    "Browse Subtech's range of motor starters, LT panels, AMF/ATS systems, MCC panels, VFD panels and industrial automation products. Trusted by 200+ businesses across India.",
  alternates: { canonical: "https://subtech.in/products" },
  openGraph: {
    type: "website",
    url: "https://subtech.in/products",
    siteName: "Subtech",
    title: "Products | Subtech",
    description:
      "Motor starters, LT panels, AMF/ATS systems, MCC panels, VFD panels and industrial automation products.",
  },
};

type SearchParams = { pcat?: string; q?: string };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const params =
    "then" in (searchParams as Promise<SearchParams>)
      ? await (searchParams as Promise<SearchParams>)
      : (searchParams as SearchParams);

  const [products, categories] = await Promise.all([
    getProducts({ pcat: params.pcat, search: params.q }),
    getCategories(),
  ]);

  const activeSlug = params.pcat ?? null;

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Our Catalog
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-3">
            {activeSlug
              ? categories.find((c) => c.slug === activeSlug)?.name ?? "Products"
              : "All Products"}
          </h1>
          <p className="text-[#767676] max-w-2xl mx-auto text-[15px] leading-[1.7]">
            Industrial electrical panels and automation products built in Greater
            Noida. Trusted by GAIL, NTPC, DMRC, Honda and 200+ businesses.
          </p>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar — categories */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0D0D0D] mb-4">
                Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/products"
                    className={`flex justify-between items-center px-3 py-2 rounded-lg text-[14px] transition ${
                      !activeSlug
                        ? "bg-red-500 text-white font-semibold"
                        : "text-[#0D0D0D] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/products?pcat=${encodeURIComponent(c.slug)}`}
                      className={`flex justify-between items-center px-3 py-2 rounded-lg text-[14px] transition ${
                        activeSlug === c.slug
                          ? "bg-red-500 text-white font-semibold"
                          : "text-[#0D0D0D] hover:bg-[#F5F5F5]"
                      }`}
                    >
                      <span>{c.name}</span>
                      {typeof c.product_count === "number" &&
                        c.product_count > 0 && (
                          <span
                            className={`text-[12px] ${
                              activeSlug === c.slug ? "text-white/80" : "text-[#999]"
                            }`}
                          >
                            {c.product_count}
                          </span>
                        )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <main>
            {products.length === 0 ? (
              <div className="bg-white border border-dashed border-[#E0E0E0] rounded-2xl py-20 text-center">
                <p className="text-[#999] text-[15px]">
                  No products found{params.q ? ` for “${params.q}”` : ""}.
                </p>
                {(params.pcat || params.q) && (
                  <Link
                    href="/products"
                    className="inline-block mt-4 text-red-500 font-semibold text-[14px] hover:underline"
                  >
                    Clear filters →
                  </Link>
                )}
              </div>
            ) : (
              <>
                <p className="text-[#767676] text-[14px] mb-5">
                  Showing <strong className="text-[#0D0D0D]">{products.length}</strong>{" "}
                  product{products.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((p) => {
                    const img = imageUrl(p.image);
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden hover:border-red-500 hover:shadow-[0_16px_40px_rgba(204,0,0,0.08)] hover:-translate-y-1 transition-all"
                      >
                        <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
                          {img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full grid place-items-center text-[#CCC] text-[12px]">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          {p.category_name && (
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-red-500 mb-2">
                              {p.category_name}
                            </p>
                          )}
                          <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                            {p.name}
                          </h3>
                          {p.description && (
                            <p className="text-[13px] text-[#767676] line-clamp-2 leading-[1.55] mb-3">
                              {p.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            {p.price ? (
                              <span className="text-[15px] font-bold text-[#0D0D0D]">
                                ₹{p.price}
                              </span>
                            ) : (
                              <span />
                            )}
                            <span className="text-red-500 text-[13px] font-semibold group-hover:translate-x-1 transition-transform">
                              View →
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
