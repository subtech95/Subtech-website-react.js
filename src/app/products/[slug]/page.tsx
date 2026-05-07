import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getProducts,
  imageUrl,
  REVALIDATE_SECONDS,
} from "@/lib/cms";

export const revalidate = REVALIDATE_SECONDS;

/**
 * Pre-render every published product at build time. New products added later
 * are rendered on-demand and cached, then revalidated every REVALIDATE_SECONDS.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    // CMS unreachable at build time — let pages render on-demand instead
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = "then" in params ? await params : params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found | Subtech" };

  const desc = product.description
    ? product.description.replace(/<[^>]+>/g, "").slice(0, 160)
    : "Industrial electrical panel by Subtech.";
  const img = imageUrl(product.image);

  return {
    title: `${product.name} | Subtech`,
    description: desc,
    alternates: { canonical: `https://subtech.in/products/${product.slug}` },
    openGraph: {
      type: "website",
      url: `https://subtech.in/products/${product.slug}`,
      siteName: "Subtech",
      title: `${product.name} | Subtech`,
      description: desc,
      ...(img ? { images: [{ url: img }] } : {}),
    },
  };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Split CRM specs textarea (newline-separated) into bullet items. */
function splitLines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Derive a friendly 4-row summary table from the product slug and metadata.
 * The slug pattern in the CMS is descriptive, e.g.
 * "1-hp-double-tank-single-phase-motor-starter-fully-automatic-super-royal-model"
 * — enough to extract HP, variant, phase, operation and series.
 */
function deriveSummary(slug: string, fallbackCategory: string | null) {
  const s = slug.toLowerCase();

  // HP — match patterns like "1-hp", "1-5-hp" (= 1.5 HP), "12-5-hp"
  const hpMatch = s.match(/(\d+(?:-\d+)?)-hp(?!-?[a-z])/);
  const hp = hpMatch
    ? `${hpMatch[1].replace("-", ".")} HP`
    : "Multiple ratings";

  // Phase
  let phase = "—";
  if (/single-phase/.test(s)) phase = "Single Phase";
  else if (/two-phase/.test(s)) phase = "Two Phase";
  else if (/three-phase/.test(s)) phase = "Three Phase";

  // Operation
  let operation = "—";
  if (/fully-automatic/.test(s)) operation = "Fully Automatic";
  else if (/semi-automatic/.test(s)) operation = "Semi Automatic";
  else if (/auto-cut/.test(s)) operation = "Auto Cut";
  else if (/manual/.test(s)) operation = "Manual";

  // Variant cues
  const variants: string[] = [];
  if (/double-tank/.test(s)) variants.push("Double Tank");
  if (/single-tank/.test(s)) variants.push("Single Tank");
  if (/oil-filled/.test(s)) variants.push("Oil Filled");
  if (/water-filled/.test(s)) variants.push("Water Filled");
  if (/monoblock/.test(s)) variants.push("Monoblock");
  if (/star-delta/.test(s)) variants.push("Star Delta");
  if (/dol/.test(s)) variants.push("DOL");
  if (/4g|gsm/.test(s)) variants.push("4G/GSM");
  const variant = variants.join(" · ") || (fallbackCategory ?? "Industrial use");

  return [
    { label: "Rating", value: hp },
    { label: "Phase", value: phase },
    { label: "Operation", value: operation },
    { label: "Best Suited For", value: variant },
  ];
}

/* ── Static sections (mirror PHP product page template) ─────────────────── */

const WHO_SHOULD_BUY = [
  {
    icon: "🏭",
    title: "Industrial Units & Factories",
    desc: "Manufacturing plants, processing units, and industrial facilities requiring reliable motor control and automation solutions.",
  },
  {
    icon: "🌾",
    title: "Agricultural & Farming",
    desc: "Farmers and agricultural businesses using water pumps, irrigation systems, and motor-driven equipment for daily operations.",
  },
  {
    icon: "🏗️",
    title: "Contractors & Builders",
    desc: "Electrical contractors, panel builders, and construction professionals who need dependable motor starting solutions.",
  },
  {
    icon: "🏢",
    title: "Commercial Establishments",
    desc: "Hotels, hospitals, offices, and commercial buildings with HVAC, lift, and pump motor control requirements.",
  },
];

const APPLICATIONS = [
  {
    n: 1,
    title: "Water Pump Motor Control",
    desc: "Submersible, centrifugal, and booster pump motor starting, protection, and automation for residential and commercial use.",
  },
  {
    n: 2,
    title: "Compressor & HVAC Systems",
    desc: "Air compressors, chillers, and HVAC blower motor control in factories, commercial buildings, and cold storage units.",
  },
  {
    n: 3,
    title: "Conveyor & Material Handling",
    desc: "Belt conveyors, rollers, and material handling equipment motors used in manufacturing and logistics.",
  },
  {
    n: 4,
    title: "Irrigation & Agriculture",
    desc: "Drip irrigation, sprinkler systems, and tube well motors for farms and agricultural land management.",
  },
  {
    n: 5,
    title: "Generator & ATS Panels",
    desc: "Auto transfer switch panels and generator motor control for seamless power backup solutions.",
  },
  {
    n: 6,
    title: "CNC & Machine Tools",
    desc: "Lathe machines, drilling machines, and CNC equipment requiring precise motor starting and protection.",
  },
];

const faqs = (name: string) => [
  {
    q: `What is the warranty on ${name}?`,
    a: "Subtech provides a standard manufacturer warranty on this product. Warranty terms may vary based on the specific model and configuration. Contact our sales team for detailed warranty information.",
  },
  {
    q: `Can I get a customized version of ${name}?`,
    a: "Yes, Subtech specializes in custom panel manufacturing. We can modify specifications, ratings, enclosure types, and features as per your specific requirements. Share your needs through the quote form above.",
  },
  {
    q: "What is the delivery time?",
    a: "Standard models are typically available within 3-5 working days. Customized configurations may take 7-15 working days depending on complexity. We deliver across India.",
  },
  {
    q: "Is installation support available?",
    a: "Yes, Subtech provides installation guidance and technical support. For bulk orders, on-site commissioning support is also available. Our service team can assist with wiring diagrams and configuration.",
  },
  {
    q: "Can I buy this product in bulk for my project?",
    a: "Absolutely. We offer competitive bulk pricing for dealers, distributors, contractors, and project orders. Request a quote with your quantity for the best price.",
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = "then" in params ? await params : params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const img = imageUrl(product.image);
  const specLines = splitLines(product.specs);
  const summary = deriveSummary(product.slug, product.category_name);
  const plainDesc = (product.description ?? "").replace(/<[^>]+>/g, "").trim();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: plainDesc,
    image: img ?? undefined,
    brand: { "@type": "Brand", name: "Subtech" },
    manufacturer: {
      "@type": "Organization",
      name: "Subtech Private Limited",
      url: "https://subtech.in",
    },
    category: product.category_name ?? "Electrical Automation",
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `https://subtech.in/products/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-red-500">Products</Link>
          {product.category_slug && product.category_name && (
            <>
              <span>›</span>
              <Link
                href={`/products?pcat=${encodeURIComponent(product.category_slug)}`}
                className="hover:text-red-500"
              >
                {product.category_name}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{product.name}</span>
        </nav>

        {/* Top section: image · summary · quote form */}
        <section className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden aspect-square grid place-items-center p-8 lg:sticky lg:top-24">
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-[#CCC] text-[13px]">No image available</div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 bg-red-500/10 px-3 py-1 rounded-full mb-4">
              Subtech Product
            </span>
            <h1 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-3 leading-[1.2]">
              {product.name}
            </h1>
            {product.category_name && (
              <p className="text-[14px] text-[#767676] mb-5">
                {product.category_name}
              </p>
            )}

            {product.price && (
              <div className="mb-5 flex items-baseline gap-2">
                <span className="text-[24px] font-bold text-[#0D0D0D]">
                  ₹{product.price}
                </span>
                <span className="text-[12.5px] text-[#767676]">
                  ex. GST · ex. installation
                </span>
              </div>
            )}

            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-red-500 text-white rounded-xl font-bold text-[13.5px] hover:bg-red-600 transition"
            >
              Get Best Price
            </a>

            <dl className="border border-[#E8E8E8] rounded-2xl overflow-hidden bg-white text-[13.5px]">
              {summary.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[140px_1fr] ${
                    i < summary.length - 1
                      ? "border-b border-[#F0F0F0]"
                      : ""
                  }`}
                >
                  <dt className="px-4 py-3 bg-[#FAFAFA] font-semibold text-[#0D0D0D] uppercase tracking-[0.04em] text-[11.5px] flex items-center">
                    {row.label}
                  </dt>
                  <dd className="px-4 py-3 text-[#3a3a3a]">{row.value}</dd>
                </div>
              ))}
            </dl>

            {plainDesc && (
              <p className="text-[14px] text-[#3a3a3a] leading-[1.7] mt-6">
                {plainDesc.slice(0, 280)}
                {plainDesc.length > 280 ? "…" : ""}
              </p>
            )}
          </div>

          {/* Quote form */}
          <aside id="quote" className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="bg-red-500 text-white px-5 py-4">
                <h2 className="text-[16px] font-bold leading-tight">
                  Get a Free Quote
                </h2>
                <p className="text-[12px] text-white/85 mt-0.5">
                  Quick response within 2 hours
                </p>
              </div>

              <form
                method="post"
                action="/api/enquiry"
                className="p-5 space-y-3.5"
              >
                <input type="hidden" name="product" value={product.name} />
                <Field label="Your Name" name="name" placeholder="Enter full name" required />
                <Field
                  label="Mobile Number"
                  name="phone"
                  placeholder="10-digit mobile number"
                  type="tel"
                  required
                />
                <Field
                  label="Quantity"
                  name="qty"
                  placeholder="How many units?"
                  type="number"
                  required
                />
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5">
                    Requirement Details
                  </label>
                  <textarea
                    name="requirement"
                    rows={3}
                    placeholder="Describe your requirement…"
                    className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
                >
                  Get Best Price →
                </button>
                <p className="text-center text-[12px] text-[#767676]">
                  🔒 Your information is safe with us
                </p>
              </form>
            </div>
          </aside>
        </section>

        {/* Description + Additional Information — full-width stacked */}
        <section className="space-y-3 mb-16">
          <details
            open
            className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between font-bold text-[#0D0D0D] hover:bg-[#FAFAFA] transition">
              Description
              <span className="text-red-500 transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="px-6 pb-6 border-t border-[#F0F0F0] pt-5">
              {product.description ? (
                <div
                  className="prose prose-sm max-w-none text-[#3a3a3a] leading-[1.75]
                             [&_p]:mb-3 [&_strong]:text-[#0D0D0D] [&_a]:text-red-500
                             [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                             [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-[14px] text-[#767676]">
                  Detailed description coming soon. Contact our sales team for
                  full specifications.
                </p>
              )}
            </div>
          </details>

          <details className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden">
            <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between font-bold text-[#0D0D0D] hover:bg-[#FAFAFA] transition">
              Additional Information
              <span className="text-red-500 transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="px-6 pb-6 border-t border-[#F0F0F0] pt-5">
              {specLines.length > 0 ? (
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {specLines.map((line, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-[#3a3a3a] flex items-start gap-2.5 leading-[1.6]"
                    >
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[14px] text-[#767676]">
                  Additional specifications available on request. Use the quote
                  form to ask our sales team.
                </p>
              )}
            </div>
          </details>
        </section>

        {/* Who should buy */}
        <section className="mb-16">
          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-1">
            Who Should Buy {product.name}?
          </h2>
          <p className="text-[14px] text-[#767676] mb-6">
            This product is ideal for the following users and industries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_SHOULD_BUY.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-red-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition"
              >
                <div className="text-[28px] mb-3">{b.icon}</div>
                <h3 className="text-[15px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-[13px] text-[#767676] leading-[1.55]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-16">
          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-1">
            Applications &amp; Use Cases
          </h2>
          <p className="text-[14px] text-[#767676] mb-6">
            Where you can use {product.name} effectively
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPLICATIONS.map((a) => (
              <div
                key={a.n}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-red-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500 text-white grid place-items-center font-bold text-[15px] mb-3">
                  {a.n}
                </div>
                <h3 className="text-[15px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-[13px] text-[#767676] leading-[1.55]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] text-[#767676] mb-6">
            Common questions about {product.name}
          </p>
          <div className="space-y-3">
            {faqs(product.name).map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-[14.5px] font-semibold text-[#0D0D0D] hover:bg-[#FAFAFA] transition">
                  <span>{item.q}</span>
                  <span className="text-red-500 transition-transform duration-200 group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[14px] text-[#3a3a3a] leading-[1.7]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* Reusable form field */
function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={`f-${name}`}
        className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={`f-${name}`}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none"
      />
    </div>
  );
}
