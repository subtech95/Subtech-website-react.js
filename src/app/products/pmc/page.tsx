import type { Metadata } from "next";
import TechPageClient, { type TechPageData } from "@/components/products/TechPageClient";

export const metadata: Metadata = {
  title: "PMC Pre-Magnetic Contactor – Smart Switching Technology | Subtech",
  description:
    "Subtech PMC (Pre-Magnetic Contactor) is a DC-coil switching technology with zero coil burning, no contact chattering, and wide voltage operation up to 150A. Used in ATS panels, motor starters, AMF panels and street light control panels across India.",
  keywords:
    "Pre-Magnetic Contactor, PMC contactor, smart switching contactor, DC coil contactor, no coil burning contactor, ATS panel contactor, motor starter contactor, Subtech Electronics, industrial contactor India, AMF panel switching",
  authors: [{ name: "Subtech Electronics, Greater Noida" }],
  alternates: { canonical: "https://subtech.in/products/pmc" },
  openGraph: {
    type: "website",
    title: "PMC Pre-Magnetic Contactor | Subtech Electronics",
    description:
      "Zero coil burning. No contact chattering. Wide voltage operation. Subtech PMC is India's smart switching contactor for ATS, AMF, motor starters and street light panels.",
    url: "https://subtech.in/products/pmc",
    siteName: "Subtech Electronics",
    images: [{ url: "https://subtech.in/images/subtech.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://subtech.in/products/pmc#product",
      name: "PMC Pre-Magnetic Contactor",
      alternateName: "Pre Magnetic Contactor",
      description:
        "PMC by Subtech Electronics is a DC-coil smart switching technology that eliminates coil burning and contact chattering with instant powerless switching, operating reliably at high and low voltages. Available up to 150 Ampere.",
      brand: { "@type": "Brand", name: "Subtech Electronics" },
      manufacturer: {
        "@type": "Organization",
        name: "S S Power System",
        url: "https://subtech.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Greater Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Coil Type", value: "DC Operated" },
        { "@type": "PropertyValue", name: "Coil Voltage Range", value: "20 to 28 VDC" },
        { "@type": "PropertyValue", name: "Maximum Current Rating", value: "150 Ampere" },
        { "@type": "PropertyValue", name: "Coil Burning Probability", value: "Zero" },
        { "@type": "PropertyValue", name: "Contact Chattering", value: "Eliminated" },
        { "@type": "PropertyValue", name: "Coil Warranty", value: "5 Years" },
      ],
      url: "https://subtech.in/products/pmc",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://subtech.in" },
        { "@type": "ListItem", position: 2, name: "Technology", item: "https://subtech.in/technology" },
        { "@type": "ListItem", position: 3, name: "PMC Pre-Magnetic Contactor", item: "https://subtech.in/products/pmc" },
      ],
    },
  ],
};

const data: TechPageData = {
  acronym: "PMC",
  fullName: "Pre‑Magnetic  Contactor",
  bcCurrent: "PMC Pre-Magnetic Contactor",
  heroSubLine: "Smart Switching Technology",
  heroDesc:
    "PMC is Subtech's in-house contactor technology that resolves the two primary failure points in conventional contactors — coil burnout and contact chattering. Operating on a staged DC coil with wide voltage tolerance, it delivers fast, stable switching across industrial, infrastructure, and government applications.",
  heroBadges: ["Zero Coil Burning", "Up to 150 Ampere", "5-Year Warranty"],
  heroImage: "/images/brands/render1.png",
  heroImageAlt: "Subtech PMC Pre-Magnetic Contactor",
  heroBadgeLabel: "PMC Unit",
  stats: [
    {
      val: (
        <>
          <em>0%</em>
        </>
      ),
      lbl: "Coil Burning Probability",
    },
    {
      val: (
        <>
          150<em>A</em>
        </>
      ),
      lbl: "Maximum Current Rating",
    },
    {
      val: (
        <>
          20 - 28<em>V</em>
        </>
      ),
      lbl: "DC Coil Operating Range",
    },
    {
      val: (
        <>
          5<em>yr</em>
        </>
      ),
      lbl: "Warranty on Coil Burning",
    },
  ],
  ps: {
    introH2: "Why Conventional Contactors Fall Short",
    introP:
      "Standard AC electromagnetic contactors carry inherent design limitations that cause recurring failures, unplanned downtime, and elevated maintenance costs across industrial and infrastructure installations.",
    probTitleEW: "Conventional AC Contactor",
    probH3: "Known Failure Points",
    probItems: [
      "The AC coil draws continuous current during operation, causing heat buildup and eventual burnout, particularly at low or high voltage supply conditions.",
      "Contact chattering occurs when supply voltage drops, producing repeated make-and-break cycles that accelerate contact wear and generate electrical noise.",
      "Voltage sensitivity requires supply to remain within a narrow band. Deviation beyond this band degrades performance or results in complete failure.",
      "Frequent coil and contact replacements increase maintenance expenditure and introduce unplanned downtime across motor control and changeover applications.",
    ],
    solTitleEW: "PMC Technology",
    solH3: "How Subtech Addresses It",
    solItems: [
      "The DC coil energises only for the duration required to pull in the armature, then transitions to a low-power holding state. Heat generation is eliminated at source.",
      "An onboard electronic control circuit ensures clean, bounce-free contact closure and release at every cycle, regardless of supply variation.",
      "The 20 to 28 VDC coil input range accommodates both low and high voltage conditions, providing reliable operation on unstable grids and generator-fed systems.",
      "Long service life with minimal maintenance requirements. PMC is designed for high-frequency switching duty in demanding field conditions across multiple sectors.",
    ],
  },
  hiw: {
    eyebrow: "Working Principle",
    h2: "How the PMC Contactor Operates",
    intro:
      "The PMC uses a staged DC energisation sequence managed by an onboard microelectronic circuit, replacing the continuous AC coil excitation of a conventional contactor.",
    steps: [
      {
        title: "Signal Received",
        desc: "The control circuit receives a switching command from the panel logic, automation controller, timer, or remote GSM trigger connected to the installation.",
      },
      {
        title: "DC Coil Pull-In",
        desc: "A high-energy DC pulse energises the coil for the precise duration required to pull in the armature and close the main contacts. Duration is electronically controlled.",
      },
      {
        title: "Low-Power Hold",
        desc: "Once contacts are closed, the coil transitions to a minimal holding state. Full excitation is no longer required, preventing heat buildup and coil degradation.",
      },
      {
        title: "Clean Release",
        desc: "On de-energisation, contacts open without bounce or arcing. The unit resets immediately and is ready for the next switching cycle with no recovery delay.",
      },
    ],
  },
  feats: {
    h2: "Technical Capabilities",
    specTitle: "PMC Specifications",
    specSub: "Standard production range",
    specs: [
      { k: "Coil Type", v: "DC Operated" },
      { k: "Coil Voltage", v: "20 to 28 VDC", r: true },
      { k: "Current Range", v: "Up to 150 A", r: true },
      { k: "Coil Burning", v: "Zero Probability", r: true },
      { k: "Chattering", v: "Eliminated", r: true },
      { k: "Voltage Tolerance", v: "High and Low Both" },
      { k: "Switching Mode", v: "Powerless / Fast" },
      { k: "Coil Warranty", v: "5 Years" },
    ],
    items: [
      {
        title: "Instant Switching",
        desc: "Pull-in and release occur within milliseconds, making PMC suitable for time-sensitive ATS, AMF, and automation changeovers where delay is not acceptable.",
      },
      {
        title: "Zero Coil Burnout",
        desc: "The DC holding circuit draws negligible current in steady state, preventing thermal stress on the coil. Backed by a five-year warranty against coil burning.",
      },
      {
        title: "Wide Voltage Tolerance",
        desc: "Operates reliably across both low and high supply conditions. Designed for rural feeders, generator-backed systems, and sites with irregular grid voltage.",
      },
      {
        title: "No Contact Chattering",
        desc: "Electronic control ensures clean make and break at every cycle. Contact surfaces are protected from wear, extending overall service life versus conventional designs.",
      },
      {
        title: "Low Maintenance Design",
        desc: "Fewer moving parts, sealed electronics, and long-life contacts reduce field maintenance visits and replacement part inventory requirements at site.",
      },
      {
        title: "High Current Capability",
        desc: "Available up to 150 Ampere, supporting starters from small single-phase motors to large three-phase industrial drives and generator changeover panels.",
      },
    ],
  },
  cmp: {
    h2: "PMC vs. Conventional AC Contactor",
    intro:
      "A direct parameter-by-parameter comparison between Subtech PMC and a standard AC electromagnetic contactor.",
    leftHead: "Conventional AC Contactor",
    rightHead: (
      <>
        <span>PMC</span> by Subtech
      </>
    ),
    rows: [
      {
        label: "Coil Type",
        conv: "AC coil, continuous excitation",
        ours: <span className="pill p">DC Coil, Staged Operation</span>,
      },
      {
        label: "Coil Burnout Risk",
        conv: <span className="pill n">High at low or high voltage</span>,
        ours: <span className="pill p">Zero Probability</span>,
      },
      {
        label: "Contact Chattering",
        conv: <span className="pill n">Present during voltage dip</span>,
        ours: <span className="pill p">Completely Eliminated</span>,
      },
      {
        label: "Operating Voltage Range",
        conv: "Narrow band, voltage sensitive",
        ours: <span className="pill p">Wide Range, High and Low</span>,
      },
      {
        label: "Heat Generation",
        conv: "Continuous under load",
        ours: <span className="pill p">Minimal, Holding Mode Only</span>,
      },
      {
        label: "Switching Speed",
        conv: "Standard electromechanical",
        ours: <span className="pill p">Instant Fast Switching</span>,
      },
      {
        label: "Maintenance Frequency",
        conv: "High, coil and contact wear",
        ours: <span className="pill p">Low, Extended Service Life</span>,
      },
      {
        label: "Coil Warranty",
        conv: "Standard 12 months",
        ours: <span className="pill p">5 Years on Coil Burning</span>,
      },
      {
        label: "Available Current Range",
        conv: "Varies by product line",
        ours: <span className="pill p">Up to 150 Ampere</span>,
      },
    ],
  },
  apps: {
    h2: "Where PMC Technology is Applied",
    intro:
      "PMC is integrated across Subtech's panel range and is also available as a standalone switching component for OEM manufacturers and panel builders.",
    items: [
      {
        title: "ATS and AMF Panels",
        desc: "Fast, reliable changeover between mains and generator supply with no chattering or coil failure during repeated high-frequency switching cycles.",
      },
      {
        title: "Motor Starter Panels",
        desc: "Used in DOL, Star-Delta, and VFD bypass starters for motors from 1 HP to 150 HP across single and three-phase industrial and agricultural applications.",
      },
      {
        title: "Street Light Control Panels",
        desc: "Daily high-frequency switching over years of operation demands contactors that do not chatter or burn out. PMC is standard in Subtech street light panels.",
      },
      {
        title: "Phase Sequence Correctors",
        desc: "Auto phase correction requires instantaneous contact switching on phase reversal detection. PMC provides the required speed and reliability for this function.",
      },
      {
        title: "GSM and 4G Smart Automation",
        desc: "Remote on-off commands via GSM or 4G networks are executed by PMC contactors at the load end, where remote switching reliability is critical.",
      },
      {
        title: "Industrial and Commercial Panels",
        desc: "Suitable for MCC panels, pump control panels, HVAC switchgear, and other industrial applications where contactor-related downtime is not acceptable.",
      },
    ],
  },
  faq: {
    h2: "Technical Questions",
    aside:
      "Common questions from panel builders, procurement engineers, and maintenance teams on PMC specification and field application.",
    items: [
      {
        q: "What does PMC stand for and what does it do?",
        a: "PMC stands for Pre-Magnetic Contactor. It is a modified contactor design by Subtech Electronics using a DC-operated coil and electronic switching circuit to eliminate coil burnout and contact chattering. Applied in ATS panels, AMF panels, motor starters, and street light control panels across industrial, commercial, and government installations.",
      },
      {
        q: "Why does PMC not experience coil burning?",
        a: "In a conventional AC contactor, the coil remains fully energised throughout its operating life and generates continuous heat. In PMC, the DC coil receives a short pull-in pulse only for the instant required to close contacts, then transitions to a low-power holding state. Sustained heat generation is eliminated entirely — which is the primary cause of coil burnout in standard contactors.",
      },
      {
        q: "Can PMC operate reliably with unstable or fluctuating power supply?",
        a: "Yes. PMC is designed to operate at both low and high voltage conditions. Its 20 to 28 VDC coil input range and electronic control circuit are specifically configured for supply instability common in rural feeders, generator-backed systems, and infrastructure sites where grid voltage is irregular.",
      },
      {
        q: "What current ratings are available in PMC?",
        a: "Subtech PMC is catalogued at 63A, 100A, and 150A ratings, covering motor starters, ATS and AMF panels, street light panels, and phase sequence correctors. Custom or higher ratings are available for specific project or OEM requirements.",
      },
      {
        q: "Is PMC available as a standalone component for OEM or panel builders?",
        a: "Yes. PMC is available as an integrated component within Subtech panels and as a standalone switching unit for OEM manufacturers and panel fabricators. Bulk supply and technical integration support are available on request.",
      },
      {
        q: "What warranty does Subtech provide on PMC?",
        a: "Subtech provides a five-year warranty against coil burning on PMC units. This reflects engineering confidence in the staged DC coil design and its expected service life under normal operating conditions. Standard warranty terms are provided in the product documentation.",
      },
    ],
  },
  cta: {
    h2: "Specify PMC in Your Next Panel",
    p: "Technical datasheet, current ratings, and application consultation available on request. Serving industrial, infrastructure, and government projects across India since 1998.",
    btnHref: "/contact",
    btnText: "Send Enquiry",
  },
};

export default function PmcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TechPageClient data={data} />
    </>
  );
}
