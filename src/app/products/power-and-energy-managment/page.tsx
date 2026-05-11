import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Power And Energy Management Panels | Subtech",
  description:
    "AMF panels, automatic changeover, GSP and three-phase motor starters from Subtech — built for reliable backup power and generator integration.",
  alternates: {
    canonical: "https://subtech.in/products/power-and-energy-managment",
  },
};

/* ============================================================
   Power And Energy Management — hub page
   Each subcategory has its own anchored section so the navbar
   dropdown can deep-link to the right block.
   ============================================================ */

type SubcategoryStub = {
  id: string;
  name: string;
  type: string;
  blurb: string;
  image: string;
};

const PLACEHOLDER_STUBS: SubcategoryStub[] = [
  {
    id: "automatic-changeover",
    name: "Automatic Changeover",
    type: "Single Phase",
    blurb:
      "Auto switch between mains and inverter / second source — clean handover, no manual flipping.",
    image: "/images/products/automatic-changeover.png",
  },
  {
    id: "gsp",
    name: "GSP — Generator Synchronised Panel",
    type: "Three Phase",
    blurb:
      "Synchronise multiple generators or genset with mains for seamless load sharing in larger sites.",
    image: "/images/products/gsp.png",
  },
  {
    id: "three-phase-motor-starter",
    name: "Three Phase Motor Starter (PEM)",
    type: "Fully Automatic",
    blurb:
      "Heavy-duty three-phase starter for industrial pump and motor loads, with full protection.",
    image: "/images/products/pem-three-phase-starter.png",
  },
];

const AMF_SPECS: { label: string; value: string }[] = [
  { label: "Operating Voltage", value: "140 to 280 VAC (P-N)" },
  { label: "Current Rating", value: "40 Amp / 63 Amp" },
  { label: "Generator Capacity", value: "Up to 7.5 kVA (Petrol)" },
  { label: "Mains Input", value: "Single Phase / Three Phase" },
];

const AMF_FEATURES: string[] = [
  "Auto-start petrol generator on mains failure",
  "Auto-switch back to mains when power restores — no manual operation",
  "Suitable for Honda EU30iS and similar petrol gensets up to 7.5 kVA",
  "Three Phase Three Pole switching for balanced load transfer",
  "Wide operating voltage 140-280 VAC keeps the panel reliable on weak grids",
  "Current rating selectable: 40 A / 63 A versions",
  "LED indications for Mains, Generator, Load",
  "Powder-coated rust-free metal enclosure",
];

const WHO_SHOULD_BUY: { icon: string; title: string; desc: string }[] = [
  {
    icon: "factory",
    title: "Industrial Units & Factories",
    desc: "Manufacturing plants needing reliable auto-backup from a petrol generator when mains fail.",
  },
  {
    icon: "leaf",
    title: "Agricultural & Farming",
    desc: "Farms, dairies, poultry — keep critical loads running on Honda gensets without manual switching.",
  },
  {
    icon: "tools",
    title: "Contractors & Builders",
    desc: "Site offices, construction zones and temporary installations needing hands-free backup.",
  },
  {
    icon: "building",
    title: "Commercial Establishments",
    desc: "Hotels, hospitals, offices and shops — uninterrupted operation during power cuts.",
  },
];

const APPLICATIONS: string[] = [
  "Auto-backup for petrol generators (Honda EU30iS class)",
  "Site offices and remote installations with unreliable mains",
  "Telecom shelters and small commercial outlets",
  "Farm houses and irrigation control rooms",
  "Emergency lighting and ICU/critical load backup",
  "Generator-mains transfer for small industries",
];

const AMF_FAQ: { q: string; a: string }[] = [
  {
    q: "What is the warranty on the AMF Panel?",
    a: "12 months from date of invoice against manufacturing defects, covering all electronic components and the enclosure.",
  },
  {
    q: "Can I get a customised version?",
    a: "Yes — current rating, voltage cutoffs, generator type and panel size can be customised for bulk orders. Contact our sales team with your requirement.",
  },
  {
    q: "What is the delivery time?",
    a: "Standard models ship within 3-5 working days. Customised panels take 10-15 working days depending on the BOM.",
  },
  {
    q: "Is installation support available?",
    a: "Yes. Our service team supports installation through certified electricians across India. Remote commissioning guidance is also available.",
  },
  {
    q: "Can I buy this product in bulk for my project?",
    a: "Absolutely. Project / dealer pricing is available for quantities above 10 units. Share your single-line diagram or load list and we will quote within 24 hours.",
  },
];

/* ───────── tiny icon components for the Who-Should-Buy grid ───────── */
function WhoIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "factory")
    return (
      <svg {...common}>
        <path d="M3 21h18M5 21V9l5 3V9l5 3V9l4 3v9" />
        <path d="M9 17h2M13 17h2M17 17h.01" />
      </svg>
    );
  if (name === "leaf")
    return (
      <svg {...common}>
        <path d="M11 20A7 7 0 0 1 4 13c0-6 5-9 11-9 0 6-3 11-9 11" />
        <path d="M11 20s1-5 6-7" />
      </svg>
    );
  if (name === "tools")
    return (
      <svg {...common}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  if (name === "building")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
      </svg>
    );
  return null;
}

/* ───────── placeholder block for products without a photo yet ───────── */
function ProductPlaceholder({ name }: { name: string }) {
  return (
    <div className="aspect-square w-full rounded-2xl border border-dashed border-[#d8d4cf] bg-[#f5f5f3] flex flex-col items-center justify-center text-center px-6">
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#bfbab3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-3"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h4" />
        <circle cx="17" cy="16" r="1.5" />
      </svg>
      <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a8a39a] mb-1">
        {name}
      </div>
      <div className="text-[11px] text-[#bfbab3]">Photo coming soon</div>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function PowerEnergyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-red-500">Products</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">
            Power And Energy Managment
          </span>
        </nav>

        {/* Hub header */}
        <div className="max-w-3xl mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Product Family
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            Power And Energy Management
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            AMF panels, automatic changeover units, generator synchronisation
            and heavy-duty three-phase starters — built to keep your facility
            running through power cuts and generator-mains transitions.
          </p>
        </div>

        {/* ===== AMF PANEL (FOR HONDA) ===== */}
        <section id="amf-panel-honda" className="scroll-mt-24 mb-24">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left — image */}
            <div className="lg:sticky lg:top-28">
              {/*
                Drop the real product photo at:
                  public/images/products/amf-panel-honda.png
                and the placeholder below will be replaced automatically.
              */}
              <ProductPlaceholder name="AMF Panel for Honda" />
            </div>

            {/* Right — content */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
                AMF Panel (for Honda) · Three Phase
              </p>
              <h2 className="text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.15]">
                40 Amp EU30iS AMF Panel — Three Phase Three Pole Model
              </h2>
              <p className="text-[#3a3a3a] text-[15.5px] leading-[1.7] mb-6">
                Auto-starts your petrol generator on power failure and switches
                back when mains restore. No manual operation needed. Designed
                around the Honda EU30iS class of petrol gensets for clean,
                hands-free backup power.
              </p>

              {/* Quick specs grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {AMF_SPECS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white border border-[#ececec] rounded-xl px-4 py-3"
                  >
                    <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8a8a] mb-0.5">
                      {s.label}
                    </div>
                    <div className="text-[14px] font-semibold text-[#0D0D0D]">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact?subject=AMF%20Panel%20for%20Honda%20enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
              >
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <p className="text-[12.5px] text-[#767676] mt-2">
                Quick response within 2 hours.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-5">
              Key Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[14.5px] text-[#3a3a3a]">
              {AMF_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who should buy */}
          <div className="mt-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Who Should Buy This Panel?
            </h3>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Ideal for the following users and industries
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WHO_SHOULD_BUY.map((w) => (
                <div
                  key={w.title}
                  className="bg-white border border-[#ececec] rounded-2xl p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-3">
                    <WhoIcon name={w.icon} />
                  </div>
                  <h4 className="text-[14.5px] font-bold text-[#0D0D0D] mb-1.5">
                    {w.title}
                  </h4>
                  <p className="text-[12.5px] text-[#5a5a5a] leading-[1.55]">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="mt-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Applications & Use Cases
            </h3>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Where this panel works best
            </p>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {APPLICATIONS.map((app, i) => (
                <li
                  key={app}
                  className="bg-white border border-[#ececec] rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="w-7 h-7 rounded-lg bg-red-500 text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] text-[#3a3a3a] leading-[1.55]">
                    {app}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Common questions about the AMF Panel
            </p>
            <div className="bg-white border border-[#ececec] rounded-2xl divide-y divide-[#ececec]">
              {AMF_FAQ.map((f) => (
                <details key={f.q} className="group">
                  <summary className="px-5 py-4 cursor-pointer flex items-center justify-between gap-4 list-none">
                    <span className="text-[14.5px] font-semibold text-[#0D0D0D]">
                      {f.q}
                    </span>
                    <svg
                      className="w-4 h-4 text-[#9a9a9a] transition-transform group-open:rotate-180 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[13.5px] text-[#5a5a5a] leading-[1.65]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OTHER 3 SUBCATEGORIES — STUB SECTIONS ===== */}
        {PLACEHOLDER_STUBS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-24 mb-20 grid lg:grid-cols-2 gap-10 items-center"
          >
            <ProductPlaceholder name={s.name} />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
                {s.type}
              </p>
              <h2 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.15]">
                {s.name}
              </h2>
              <p className="text-[#3a3a3a] text-[15px] leading-[1.7] mb-6">
                {s.blurb}
              </p>
              <p className="text-[12.5px] text-[#a8a39a] mb-6 italic">
                Detailed specs, variants and features being added. Get in touch
                for a quote with your exact requirement.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(s.name + " enquiry")}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
              >
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
