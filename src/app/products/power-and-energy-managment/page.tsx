import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Power And Energy Management Panels | Subtech",
  description:
    "AMF panels for Honda gensets, automatic changeover, GSP and three-phase motor starters from Subtech — built for reliable backup power and generator integration.",
  alternates: {
    canonical: "https://subtech.in/products/power-and-energy-managment",
  },
};

/* ============================================================
   Power And Energy Management — hub page
   Each subcategory has its own anchored section so the navbar
   dropdown can deep-link to the right block.
   ============================================================ */

type Spec = { label: string; value: string };

type AmfVariant = {
  id: string;
  name: string;
  model: string;
  shortName: string;
  blurb: string;
  specs: Spec[];
  highlights?: string[]; // variant-specific extras (added on top of shared)
  image: string; // expected image path (placeholder if missing)
  enquirySubject: string;
};

/* ───────── AMF section data ───────── */

const AMF_HERO = {
  headline: "Never lose power again.",
  intro:
    "Subtech's PMC-based AMF Panel detects mains failure instantly and auto-starts your petrol generator within seconds. When mains power restores, it shuts the genset down automatically. Zero manual effort. Zero downtime.",
  pmcCallout: {
    title: "What Makes It Different?",
    body:
      "Built with Subtech's proprietary PMC (Pre Magnetic Contactor) technology — the contactor coil activates for just 1 second, making it virtually maintenance-free with no chattering, no coil burning, and smooth switching even at low or high voltages.",
  },
};

const AMF_SHARED_HIGHLIGHTS: string[] = [
  "Auto Start and Auto Stop genset on mains failure and restoration",
  "Compatible with electronic controller and old key-type gensets",
  "Inbuilt battery charger keeps genset battery always ready",
  "Audio-visual alarm on genset faults",
  "Auto and Manual mode with remote operation provision",
  "3 cranking attempts at 15 sec intervals for reliable starting",
  "Powder-coated GI box, wall-mount, compact and rust-resistant",
  "PMC technology — no chattering, no coil burning, smooth switching",
];

const AMF_VARIANTS: AmfVariant[] = [
  {
    id: "amf-40a-eu30is-3p",
    name: "40 Amp EU30iS — Three Phase Three Pole",
    shortName: "40 A · EU30iS · 3-Pole",
    model: "Honda EU30iS",
    blurb:
      "Auto-starts your Honda EU30iS petrol generator on power failure and switches back when mains restore. No manual operation needed.",
    specs: [
      { label: "Compatible Model", value: "Honda EU30iS" },
      { label: "Current Rating", value: "40 Amp" },
      { label: "Configuration", value: "3-Pole" },
      { label: "Operating Voltage", value: "140 to 280 VAC (P-N)" },
      { label: "Generator Capacity", value: "Up to 7.5 kVA (Petrol)" },
      { label: "Mains Input", value: "Single Phase / Three Phase" },
    ],
    image: "/images/products/amf-honda-40a.png",
    enquirySubject: "AMF Panel — 40A EU30iS (3-Pole) enquiry",
  },
  {
    id: "amf-63a-eu70is-3p",
    name: "63 Amp EU70iS — Three Phase Three Pole",
    shortName: "63 A · EU70iS · 3-Pole",
    model: "Honda EU70iS",
    blurb:
      "Three Phase Power Backup, fully automatic. Handles three phase mains input with single phase generator output. Auto-starts on mains failure and switches back seamlessly when power restores.",
    specs: [
      { label: "Compatible Model", value: "Honda EU70iS" },
      { label: "Current Rating", value: "63 Amp" },
      { label: "Configuration", value: "3-Pole" },
      { label: "Phase", value: "Three Phase" },
      { label: "Mains Input", value: "Three Phase" },
      { label: "Generator Output", value: "Single Phase" },
    ],
    highlights: [
      "3-pole three phase configuration",
      "Three phase mains input with single phase generator output",
    ],
    image: "/images/products/amf-honda-63a-3p.png",
    enquirySubject: "AMF Panel — 63A EU70iS (3-Pole) enquiry",
  },
  {
    id: "amf-63a-eu70is-4p",
    name: "63 Amp EU70iS — Three Phase Four Pole",
    shortName: "63 A · EU70iS · 4-Pole",
    model: "Honda EU70iS",
    blurb:
      "Complete three phase protection with neutral switching — the safest configuration for sensitive equipment and critical loads. Recommended for hospitals, data centers and sensitive equipment.",
    specs: [
      { label: "Compatible Model", value: "Honda EU70iS" },
      { label: "Current Rating", value: "63 Amp" },
      { label: "Configuration", value: "4-Pole" },
      { label: "Phase", value: "Three Phase" },
      { label: "Neutral Switching", value: "Yes — full isolation" },
      { label: "Recommended For", value: "Hospitals, Data Centers" },
    ],
    highlights: [
      "4-pole three phase configuration with neutral switching",
      "Full isolation of mains and generator supply",
      "Recommended for hospitals, data centers and sensitive equipment",
    ],
    image: "/images/products/amf-honda-63a-4p.png",
    enquirySubject: "AMF Panel — 63A EU70iS (4-Pole) enquiry",
  },
];

/* ───────── Shared "who / applications / FAQ" content ───────── */

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
  "Auto-backup for petrol generators (Honda EU30iS / EU70iS)",
  "Site offices and remote installations with unreliable mains",
  "Telecom shelters and small commercial outlets",
  "Farm houses and irrigation control rooms",
  "Hospitals and data centers (use 4-Pole model for neutral switching)",
  "Generator-mains transfer for small and mid-size industries",
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
  {
    q: "What's the difference between 3-Pole and 4-Pole?",
    a: "3-Pole switches the three line conductors. 4-Pole also switches the neutral, fully isolating mains and generator supplies — the safer option for hospitals, data centers and sensitive electronic equipment.",
  },
];

/* ───────── Automatic Changeover (ATS) section data ───────── */

const ATS_HERO = {
  headline: "Automatic power backup. No manual switching needed.",
  intro:
    "Subtech's ATS (Automatic Transfer Switch) handles your power changeover without any manual effort. When mains supply fails and your genset is running, it automatically connects the load to the generator. When mains restores, it switches back instantly — mains always gets priority.",
};

const ATS_HIGHLIGHTS: string[] = [
  "Automatic changeover between mains and generator",
  "Relay activates only during genset run time for longer life",
  "Minimum changeover time to protect sensitive equipment",
  "Time delay in generator mode for higher capacity loads",
  "Fully automatic operation with electrical interlocking",
  "Auxiliary contacts for portable genset stop command (IGN)",
  "Heavy duty DMC connection terminal block",
  "Screw tight connection for safe and reliable wiring",
  "Powder-coated GI box, wall-mount, compact size",
  "Long life and maintenance free",
];

type AtsVariant = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  specs: Spec[];
  image: string;
  enquirySubject: string;
};

const ATS_VARIANTS: AtsVariant[] = [
  {
    id: "ats-40a-ign-1ph-dp",
    name: "40 Amp (IGN) Relay Changeover — Single Phase Two Pole",
    shortName: "40 A · IGN · 1-Ph · DP",
    blurb:
      "Automatically switches load to generator on mains failure and back when power restores. Manual start, auto changeover. Suitable for 1 to 3 kVA generators.",
    specs: [
      { label: "Model No", value: "I-PCB011" },
      { label: "Type", value: "Relay Based ATS" },
      { label: "Phase", value: "Single Phase" },
      { label: "Pole", value: "Double Pole (DP)" },
      { label: "Current Rating", value: "40 Amp" },
      { label: "Genset Range", value: "1 to 3 kVA" },
    ],
    image: "/images/products/ats-40a-ign-1ph-dp.png",
    enquirySubject: "Automatic Changeover — 40A IGN (1-Ph DP) enquiry",
  },
];

/* ───────── Other Power & Energy stubs ───────── */

type SubcategoryStub = {
  id: string;
  name: string;
  type: string;
  blurb: string;
  image: string;
};

const PLACEHOLDER_STUBS: SubcategoryStub[] = [
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

/* ───────── tiny icon components ───────── */
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

function ProductPlaceholder({ name, compact = false }: { name: string; compact?: boolean }) {
  return (
    <div
      className={`${
        compact ? "aspect-[4/3]" : "aspect-square"
      } w-full rounded-2xl border border-dashed border-[#d8d4cf] bg-[#f5f5f3] flex flex-col items-center justify-center text-center px-6`}
    >
      <svg
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#bfbab3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-2.5"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h4" />
        <circle cx="17" cy="16" r="1.5" />
      </svg>
      <div className="text-[10.5px] font-semibold tracking-[0.15em] uppercase text-[#a8a39a] mb-0.5 leading-tight">
        {name}
      </div>
      <div className="text-[10.5px] text-[#bfbab3]">Photo coming soon</div>
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
            AMF panels for Honda petrol gensets, automatic changeover units,
            generator synchronisation panels and heavy-duty three-phase
            starters — built to keep your facility running through power cuts
            and generator-mains transitions.
          </p>
        </div>

        {/* ============================================================
            AMF PANEL (FOR HONDA) — full section with 3 variants
            ============================================================ */}
        <section id="amf-panel-honda" className="scroll-mt-24 mb-24">
          {/* Hero copy */}
          <div className="max-w-3xl mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
              AMF Panel (for Honda) · Three Phase
            </p>
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
              {AMF_HERO.headline}
            </h2>
            <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
              {AMF_HERO.intro}
            </p>
          </div>

          {/* PMC callout */}
          <div className="bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] text-white rounded-2xl p-8 mb-12 max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-[18px] font-bold mb-2">
                  {AMF_HERO.pmcCallout.title}
                </h3>
                <p className="text-[14px] text-white/75 leading-[1.65]">
                  {AMF_HERO.pmcCallout.body}
                </p>
              </div>
            </div>
          </div>

          {/* Shared key highlights */}
          <div className="mb-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-5">
              Key Highlights
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[14.5px] text-[#3a3a3a]">
              {AMF_SHARED_HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Variant cards */}
          <div className="mb-14">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Available Models
            </h3>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Three configurations to match your generator and load profile
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {AMF_VARIANTS.map((v) => (
                <div
                  key={v.id}
                  id={v.id}
                  className="scroll-mt-24 bg-white border border-[#ececec] rounded-2xl overflow-hidden flex flex-col"
                >
                  {/* Image / placeholder */}
                  <div className="p-4 bg-[#fafafa] border-b border-[#ececec]">
                    <ProductPlaceholder name={v.shortName} compact />
                  </div>
                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                      {v.name}
                    </h4>
                    <p className="text-[13px] text-[#5a5a5a] leading-[1.6] mb-4">
                      {v.blurb}
                    </p>

                    {/* Mini specs table */}
                    <dl className="text-[12.5px] divide-y divide-[#f0f0f0] border-y border-[#f0f0f0] mb-5">
                      {v.specs.map((s) => (
                        <div
                          key={s.label}
                          className="grid grid-cols-[1fr,1.2fr] gap-2 py-2"
                        >
                          <dt className="text-[#888]">{s.label}</dt>
                          <dd className="font-semibold text-[#0D0D0D] text-right">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Variant-specific bullets if any */}
                    {v.highlights && v.highlights.length > 0 && (
                      <ul className="text-[12.5px] text-[#3a3a3a] space-y-1.5 mb-5">
                        {v.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="mt-[6px] w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/contact?subject=${encodeURIComponent(v.enquirySubject)}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg font-bold text-[13px] hover:bg-red-600 transition"
                    >
                      Get a Free Quote
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
              Where the AMF panel range works best
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

        {/* ============================================================
            AUTOMATIC CHANGEOVER (ATS)
            ============================================================ */}
        <section id="automatic-changeover" className="scroll-mt-24 mb-24">
          {/* Hero copy */}
          <div className="max-w-3xl mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
              Automatic Changeover · Single Phase
            </p>
            <h2 className="text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
              {ATS_HERO.headline}
            </h2>
            <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
              {ATS_HERO.intro}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="mb-12">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-5">
              Key Highlights
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[14.5px] text-[#3a3a3a]">
              {ATS_HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Variant card(s) */}
          <div className="mb-10">
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Available Models
            </h3>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Single Phase Two Pole models for small petrol gensets
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ATS_VARIANTS.map((v) => (
                <div
                  key={v.id}
                  id={v.id}
                  className="scroll-mt-24 bg-white border border-[#ececec] rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="p-4 bg-[#fafafa] border-b border-[#ececec]">
                    <ProductPlaceholder name={v.shortName} compact />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-2 leading-snug">
                      {v.name}
                    </h4>
                    <p className="text-[13px] text-[#5a5a5a] leading-[1.6] mb-4">
                      {v.blurb}
                    </p>
                    <dl className="text-[12.5px] divide-y divide-[#f0f0f0] border-y border-[#f0f0f0] mb-5">
                      {v.specs.map((s) => (
                        <div
                          key={s.label}
                          className="grid grid-cols-[1fr,1.2fr] gap-2 py-2"
                        >
                          <dt className="text-[#888]">{s.label}</dt>
                          <dd className="font-semibold text-[#0D0D0D] text-right">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(v.enquirySubject)}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg font-bold text-[13px] hover:bg-red-600 transition"
                    >
                      Get a Free Quote
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Note linking to shared who/applications */}
            <p className="mt-6 text-[12.5px] text-[#767676] italic max-w-2xl">
              Same buyer profile and use cases as our AMF range — see{" "}
              <a href="#amf-panel-honda" className="text-red-500 hover:underline not-italic font-semibold">
                Who Should Buy
              </a>{" "}
              and{" "}
              <a href="#amf-panel-honda" className="text-red-500 hover:underline not-italic font-semibold">
                Applications
              </a>{" "}
              above for industries and use cases.
            </p>
          </div>
        </section>

        {/* ===== OTHER STUB SECTIONS ===== */}
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
