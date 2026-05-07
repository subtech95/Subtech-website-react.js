import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allSeriesSlugs,
  formatINR,
  getSeries,
  type Variant,
} from "@/lib/catalog";

const CATEGORY_SLUG = "motor-control-solutions";

export function generateStaticParams() {
  return allSeriesSlugs()
    .filter((p) => p.category === CATEGORY_SLUG)
    .map((p) => ({
      subcategory: p.subcategory,
      type: p.type,
      series: p.series,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string; type: string; series: string }>;
}): Promise<Metadata> {
  const { subcategory, type, series } = await params;
  const found = getSeries(CATEGORY_SLUG, subcategory, type, series);
  if (!found) return { title: "Not found | Subtech" };
  return {
    title: `${found.series.name} | Subtech`,
    description: found.series.description.slice(0, 160),
    alternates: {
      canonical: `https://subtech.in/products/${CATEGORY_SLUG}/${subcategory}/${type}/${series}`,
    },
  };
}

/* ── Price-table column logic (unchanged) ───────────────────────────────── */

type ColKey =
  | "ref"
  | "rating"
  | "kw"
  | "mcb"
  | "relayRange"
  | "capStart"
  | "capRun"
  | "motorType"
  | "size"
  | "weight"
  | "protection"
  | "stdPack"
  | "mrp";

function activeColumns(variants: Variant[]): ColKey[] {
  const used = (key: keyof Variant) =>
    variants.some((v) => v[key] != null && v[key] !== "");
  const cols: ColKey[] = ["ref", "rating"];
  if (used("kw")) cols.push("kw");
  if (used("mcb")) cols.push("mcb");
  if (used("relayRange")) cols.push("relayRange");
  if (used("capacitorStart")) cols.push("capStart");
  if (used("capacitorRun")) cols.push("capRun");
  if (used("motorType")) cols.push("motorType");
  if (used("size")) cols.push("size");
  if (used("weight")) cols.push("weight");
  if (used("protection")) cols.push("protection");
  cols.push("mrp");
  if (used("stdPack")) cols.push("stdPack");
  return cols;
}

const HEADERS: Record<ColKey, string> = {
  ref: "Ref. No.",
  rating: "HP",
  kw: "kW",
  mcb: "MCB",
  relayRange: "Relay Range (A)",
  capStart: "Cap. Start (MFD)",
  capRun: "Cap. Run (MFD)",
  motorType: "Motor / Variant",
  size: "Size (mm)",
  weight: "Wt. (kg)",
  protection: "Protection",
  mrp: "MRP",
  stdPack: "Std. Pack",
};

function cellValue(col: ColKey, v: Variant): React.ReactNode {
  switch (col) {
    case "ref":
      return <span className="font-semibold text-[#0D0D0D]">{v.ref}</span>;
    case "rating":
      return v.hp;
    case "kw":
      return v.kw ?? "—";
    case "mcb":
      return v.mcb ?? "—";
    case "relayRange":
      return v.relayRange ?? "—";
    case "capStart":
      return v.capacitorStart ?? "—";
    case "capRun":
      return v.capacitorRun ?? "—";
    case "motorType":
      return v.motorType ?? "—";
    case "size":
      return v.size ?? "—";
    case "weight":
      return v.weight ?? "—";
    case "protection":
      return v.protection ?? "—";
    case "stdPack":
      return v.stdPack ?? "—";
    case "mrp":
      return (
        <span className="font-semibold text-[#0D0D0D]">
          {formatINR(v.mrp)}
        </span>
      );
  }
}

/* ── Static sections (mirror the PHP page template) ─────────────────────── */

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

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ subcategory: string; type: string; series: string }>;
}) {
  const { subcategory, type, series } = await params;
  const found = getSeries(CATEGORY_SLUG, subcategory, type, series);
  if (!found) notFound();
  const { category, sub, type: t, series: s } = found;

  const cols = activeColumns(s.variants);
  const absoluteImage = s.image ? `https://subtech.in${s.image}` : undefined;

  // 4-row spec summary at the top of the page (mirrors PHP "model type / capacitors / operation / best suited for")
  const specSummary: { label: string; value: string }[] = [
    { label: "Model Type", value: `${s.name} · ${sub.name}` },
    { label: "Operation", value: `${t.name} · ${s.tagline}` },
    {
      label: "Rating Range",
      value:
        s.hpRange.length > 1
          ? `${s.hpRange[0]} HP - ${s.hpRange[s.hpRange.length - 1]} HP`
          : `${s.hpRange[0] ?? "—"} HP`,
    },
    {
      label: "Best Suited For",
      value: s.variantTags.join(" · ") || "Industrial & agricultural use",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: s.name,
    description: s.description,
    image: absoluteImage,
    brand: { "@type": "Brand", name: "Subtech" },
    manufacturer: {
      "@type": "Organization",
      name: "Subtech Private Limited",
      url: "https://subtech.in",
    },
    category: `${category.name} / ${sub.name} / ${t.name}`,
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
          <Link href={`/products/${category.slug}`} className="hover:text-red-500">
            {category.name}
          </Link>
          <span>›</span>
          <Link
            href={`/products/${category.slug}/${sub.slug}`}
            className="hover:text-red-500"
          >
            {sub.name}
          </Link>
          <span>›</span>
          <Link
            href={`/products/${category.slug}/${sub.slug}/${t.slug}`}
            className="hover:text-red-500"
          >
            {t.name}
          </Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{s.name}</span>
        </nav>

        {/* Top section: image · summary · quote form */}
        <section className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden aspect-square grid place-items-center p-8">
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.image}
                  alt={s.name}
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
            <h1 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-5 leading-[1.2]">
              {s.name}
              <span className="block text-[15px] font-normal text-[#767676] mt-1.5">
                {sub.name} · {t.name}
              </span>
            </h1>

            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-red-500 text-white rounded-xl font-bold text-[13.5px] hover:bg-red-600 transition"
            >
              Get Best Price
            </a>

            <dl className="border border-[#E8E8E8] rounded-2xl overflow-hidden bg-white text-[13.5px]">
              {specSummary.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[140px_1fr] ${
                    i < specSummary.length - 1
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

            <p className="text-[14px] text-[#3a3a3a] leading-[1.7] mt-6">
              {s.description}
            </p>
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
                <input type="hidden" name="product" value={s.name} />
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

        {/* Description + Additional Information — full-width stacked accordions
            (matches the PHP product page) */}
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
            <div className="px-6 pb-6 text-[14px] text-[#3a3a3a] leading-[1.7] border-t border-[#F0F0F0] pt-5">
              {s.longDescription && (
                <p className="mb-4">{s.longDescription}</p>
              )}
              <p>{s.description}</p>
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
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {s.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-[#3a3a3a] flex items-start gap-2.5 leading-[1.6]"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </section>

        {/* Models & Pricing table */}
        <section className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden mb-16">
          <div className="p-6 border-b border-[#E8E8E8] flex items-center justify-between gap-4">
            <h2 className="text-[20px] font-bold text-[#0D0D0D]">
              Models &amp; Pricing
            </h2>
            <span className="text-[12px] text-[#999]">
              {s.variants.length} model{s.variants.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-[#FAFAFA] text-[#0D0D0D]">
                <tr>
                  {cols.map((c) => (
                    <th
                      key={c}
                      className="text-left font-semibold px-4 py-3 whitespace-nowrap border-b border-[#E8E8E8]"
                    >
                      {HEADERS[c]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.variants.map((v, i) => (
                  <tr key={v.ref} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}>
                    {cols.map((c) => (
                      <td
                        key={c}
                        className="px-4 py-3 text-[#3a3a3a] whitespace-nowrap border-b border-[#F0F0F0]"
                      >
                        {cellValue(c, v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-[#FAFAFA] text-[12px] text-[#767676] border-t border-[#E8E8E8]">
            Prices are MRP in INR, ex-GST and ex-installation. Specifications
            subject to change without notice.
          </div>
        </section>

        {/* Add-ons + Notes + Protections (only when present) */}
        {(s.addOns?.length || s.protections?.length) && (
          <section className="grid lg:grid-cols-2 gap-5 mb-16">
            {s.protections && s.protections.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E8E8E8] p-6">
                <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-4">
                  Protections
                </h2>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {s.protections.map((p, i) => (
                    <li
                      key={i}
                      className="text-[13.5px] text-[#3a3a3a] flex items-start gap-2.5"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-[3px]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {s.addOns && s.addOns.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E8E8E8] p-6">
                <h2 className="text-[18px] font-bold text-[#0D0D0D] mb-4">
                  Add-ons
                </h2>
                <ul className="space-y-2.5">
                  {s.addOns.map((a, i) => (
                    <li
                      key={i}
                      className="text-[13.5px] text-[#3a3a3a] flex items-start gap-2.5 leading-[1.55]"
                    >
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                {s.notes && s.notes.length > 0 && (
                  <ul className="mt-4 pt-4 border-t border-[#F0F0F0] space-y-1.5">
                    {s.notes.map((n, i) => (
                      <li key={i} className="text-[12.5px] text-[#767676]">
                        Note: {n}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        )}

        {/* Who should buy */}
        <section className="mb-16">
          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-1">
            Who Should Buy {s.name}?
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
            Where you can use {s.name} effectively
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
            Common questions about {s.name}
          </p>
          <div className="space-y-3">
            {faqs(s.name).map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-[14.5px] font-semibold text-[#0D0D0D]">
                  <span>{item.q}</span>
                  <span className="text-red-500 transition-transform group-open:rotate-180">
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

/* Small reusable form field component */
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
