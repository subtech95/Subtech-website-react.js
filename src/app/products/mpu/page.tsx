import type { Metadata } from "next";
import TechPageClient, { type TechPageData } from "@/components/products/TechPageClient";

export const metadata: Metadata = {
  title:
    "MPU Motor Protection Unit – 7-in-1 Smart Digital Motor Controller | Subtech Electronics",
  description:
    "Subtech MPU (Motor Protection Unit) is a microcontroller-based digital unit that consolidates 6 conventional starter components into one intelligent module. Provides 7 protections — overload, dry run, single phasing, reverse phasing, phase unbalance, over voltage, under voltage. Wide range 200–480V.",
  keywords:
    "Motor Protection Unit, MPU controller, smart motor starter, overload protection relay, dry run protection, single phase preventer, phase fail protection, digital motor controller, Subtech Electronics, submersible pump protection India, Jal Nigam panel, motor protection device",
  authors: [{ name: "Subtech Electronics, Greater Noida" }],
  alternates: { canonical: "https://subtech.in/products/mpu" },
  openGraph: {
    type: "website",
    title: "MPU Motor Protection Unit | Subtech Electronics",
    description:
      "Replace 6 conventional parts with 1 intelligent unit. 7 built-in protections, 200–480V wide range, digital monitoring.",
    url: "https://subtech.in/products/mpu",
    siteName: "Subtech Electronics",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://subtech.in/products/mpu#product",
      name: "MPU Motor Protection Unit",
      alternateName: "Motor Protection Unit",
      description:
        "MPU by Subtech Electronics is a pre-programmed microcontroller-based digital unit that consolidates 6 conventional motor starter components into one intelligent module. Provides 7 independently settable protection functions.",
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
        { "@type": "PropertyValue", name: "Technology", value: "Microcontroller Based" },
        { "@type": "PropertyValue", name: "Operating Voltage Range", value: "200 to 480 VAC" },
        { "@type": "PropertyValue", name: "Number of Protections", value: "7" },
        { "@type": "PropertyValue", name: "Components Replaced", value: "6 Conventional Parts" },
        { "@type": "PropertyValue", name: "Run Hour Meter", value: "Up to 999 Hours" },
        { "@type": "PropertyValue", name: "Operating Mode", value: "Auto / Manual / Bypass" },
      ],
      url: "https://subtech.in/products/mpu",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://subtech.in" },
        { "@type": "ListItem", position: 2, name: "Technology", item: "https://subtech.in/technology" },
        { "@type": "ListItem", position: 3, name: "MPU Motor Protection Unit", item: "https://subtech.in/products/mpu" },
      ],
    },
  ],
};

const data: TechPageData = {
  acronym: "MPU",
  fullName: "Motor‑Protection  Unit",
  bcCurrent: "MPU Motor Protection Unit",
  heroSubLine: "Smart Motor Protection Technology",
  heroDesc:
    "MPU is Subtech's pre-programmed microcontroller unit that consolidates six conventional starter components into one intelligent module. It monitors voltage, current, and phase parameters continuously — and cuts off the motor within milliseconds on any of seven independently configurable fault conditions, before damage occurs.",
  heroBadges: ["7 Protections", "200–480V Range", "Replaces 6 Parts"],
  heroImage: "/images/brands/mpu.jpg",
  heroImageAlt: "Subtech MPU Motor Protection Unit",
  heroBadgeLabel: "MPU Unit",
  stats: [
    { val: <>7 +</>, lbl: "Protection Functions" },
    { val: <>6 → 1</>, lbl: "Parts Consolidated" },
    {
      val: (
        <>
          200 - 480<em>V</em>
        </>
      ),
      lbl: "Operating Voltage Range",
    },
    { val: <>99 %</>, lbl: "Motor Safety" },
  ],
  ps: {
    introH2: "Why Conventional Motor Starters Fall Short",
    introP:
      "A standard motor starter is built from six separate components — each with its own wiring, calibration, and failure mode. More parts means more panel space, more site work, and more ways for the system to break down.",
    probTitleEW: "Conventional 6-Component Starter",
    probH3: "Known Failure Points",
    probItems: [
      "Thermal overload relays require manual calibration on site and are sensitive to ambient temperature, leading to nuisance trips or missed protection events.",
      "Single phase preventers and analog ammeters are separate units — each adds wiring, panel space, and an independent point of failure in the control circuit.",
      "No built-in voltage monitoring means over voltage and under voltage damage goes undetected until the motor winding has already been stressed beyond safe limits.",
      "Fault identification requires manual inspection across multiple components. Field engineers cannot tell which protection has activated without checking each device individually.",
    ],
    solTitleEW: "MPU Technology",
    solH3: "How Subtech Addresses It",
    solItems: [
      "MPU replaces all six conventional components with one pre-programmed microcontroller unit. A single device handles overload, phase protection, voltage monitoring, timing, and display.",
      "All seven protection thresholds are individually configurable on site using front-panel buttons — no external tools, laptops, or calibration equipment required.",
      "Each protection has a dedicated LED fault indicator. Field engineers identify the exact fault type immediately — overload, dry run, phase fail — without inspecting multiple devices.",
      "The wide 200 to 480 VAC operating range ensures MPU continues to protect the motor even during significant grid voltage variation — common in rural and infrastructure sites.",
    ],
  },
  hiw: {
    eyebrow: "Working Principle",
    h2: "How MPU Monitors and Protects in Real Time",
    intro:
      "The MPU runs a continuous sensing loop, comparing live voltage, current, and phase parameters against configured thresholds — and cuts off within milliseconds on any fault detection.",
    steps: [
      {
        title: "Continuous Sensing",
        desc: "Onboard sensors and mini CTs measure three-phase voltage, motor current, phase sequence, and phase balance across every operating cycle without interruption.",
      },
      {
        title: "Parameter Comparison",
        desc: "The microcontroller compares live readings against threshold values stored in memory — either factory-set or adjusted on site using front-panel buttons for each motor's rating.",
      },
      {
        title: "Fault Identification",
        desc: "On any parameter exceeding its limit, MPU identifies the specific fault, illuminates the dedicated LED indicator, and initiates the cut-off sequence within milliseconds.",
      },
      {
        title: "Auto Restart or Hold",
        desc: "Depending on mode selection, the unit either holds off until manually reset, or auto-restarts the motor after a configurable delay once the fault condition has cleared.",
      },
    ],
  },
  feats: {
    h2: "Technical Capabilities",
    specTitle: "MPU Specifications",
    specSub: "Standard production range",
    specs: [
      { k: "Technology", v: "Microcontroller Based" },
      { k: "Voltage Range", v: "200 to 480 VAC", r: true },
      { k: "Protections", v: "7 Functions", r: true },
      { k: "Display", v: "Digital Volt and Amp" },
      { k: "Run Hour Meter", v: "Up to 999 Hours" },
      { k: "Operating Mode", v: "Auto / Manual / Bypass" },
      { k: "Remote Trip", v: "Provision Included", r: true },
      { k: "Contactor", v: "PMC (5-Year Warranty)" },
    ],
    items: [
      {
        title: "7 Built-In Protections",
        desc: "Overload, dry run, single phasing, reverse phasing, phase unbalance, over voltage, and under voltage — all seven in one unit with a dedicated LED indicator per fault.",
      },
      {
        title: "Button-Settable Thresholds",
        desc: "Overload, dry run, over voltage, and under voltage limits are adjustable on site using front-panel buttons. No laptop, software, or calibration tools required.",
      },
      {
        title: "Wide Voltage Range",
        desc: "Operates across 200 to 480 VAC, handling supply variation common in rural feeders, Jal Nigam systems, and generator-backed installations without degradation.",
      },
      {
        title: "Auto / Manual / Bypass Mode",
        desc: "Three operating modes built in. Auto for scheduled or remote starts, manual for direct control, and bypass to override protections during maintenance without rewiring.",
      },
      {
        title: "Digital Monitoring Display",
        desc: "Live voltage, current, and run hours shown on the front digital panel. No separate panel meters or external instruments required alongside the MPU.",
      },
      {
        title: "Remote Trip Provision",
        desc: "Accepts trip signals from float switches, pressure sensors, GSM modules, or SCADA — enabling integration into Subtech's 4G smart automation panels and wider control systems.",
      },
    ],
  },
  cmp: {
    h2: "MPU vs. Conventional Starter Assembly",
    intro:
      "A direct parameter comparison between Subtech MPU and a traditional multi-component motor starter build.",
    leftHead: "Conventional Starter Assembly",
    rightHead: (
      <>
        <span>MPU</span> by Subtech
      </>
    ),
    rows: [
      {
        label: "Component Count",
        conv: <span className="pill n">6 Separate Units</span>,
        ours: <span className="pill p">1 Integrated Module</span>,
      },
      {
        label: "Protection Functions",
        conv: <span className="pill n">2–3 Basic, Fixed Settings</span>,
        ours: <span className="pill p">7 Individually Settable</span>,
      },
      {
        label: "Voltage Monitoring",
        conv: "None or basic",
        ours: <span className="pill p">Digital Display, All Phases</span>,
      },
      {
        label: "Current Monitoring",
        conv: "Analog meter only",
        ours: <span className="pill p">Digital Ammeter, Live Reading</span>,
      },
      {
        label: "Operating Voltage Range",
        conv: "Narrow, voltage sensitive",
        ours: <span className="pill p">200 to 480 VAC</span>,
      },
      {
        label: "Fault Identification",
        conv: <span className="pill n">Manual Inspection Required</span>,
        ours: <span className="pill p">Dedicated LED per Fault Type</span>,
      },
      {
        label: "Run Hour Tracking",
        conv: <span className="pill n">Not Available</span>,
        ours: <span className="pill p">Built-In, Up to 999 Hours</span>,
      },
      {
        label: "Remote Trip Provision",
        conv: <span className="pill n">Not Standard</span>,
        ours: <span className="pill p">Included as Standard</span>,
      },
      {
        label: "Threshold Adjustment",
        conv: "Manual knob, fixed ranges",
        ours: <span className="pill p">Button Settable On-Site</span>,
      },
    ],
  },
  apps: {
    h2: "Where MPU Technology is Applied",
    intro:
      "MPU is the standard protection module across Subtech's complete panel range and is actively specified by government departments, infrastructure contractors, and industrial OEMs across India.",
    items: [
      {
        title: "Industrial Motor Starters",
        desc: "DOL, Star-Delta, and reverse-forward panels for three-phase motors in factories, processing plants, and commercial buildings — MPU provides all protections in one module.",
      },
      {
        title: "Submersible Pump Panels",
        desc: "Dry run and overload protection are critical for submersible motors where damage from dry-running requires extracting the pump from the borewell — an expensive repair.",
      },
      {
        title: "Jal Nigam and Water Supply",
        desc: "Government water supply departments specify MPU for seven-protection coverage, site-settable thresholds, and digital monitoring in a single standardised panel design.",
      },
      {
        title: "Agricultural Motor Control",
        desc: "Wide voltage range and configurable auto-restart make MPU suitable for rural installations where grid voltage is unstable and site supervision is not always available.",
      },
      {
        title: "GSM and 4G Smart Automation",
        desc: "MPU's remote trip provision connects with Subtech's GSM and 4G smart panels, enabling remote start-stop commands, fault SMS alerts, and real-time monitoring.",
      },
      {
        title: "Sump Pump and HVAC",
        desc: "Auto mode, run-hour logging, and bypass provision make MPU suited for sump pump panels, cooling tower motors, and HVAC pump circuits in commercial buildings.",
      },
    ],
  },
  faq: {
    h2: "Technical Questions",
    aside:
      "Common questions from panel builders, government procurement engineers, site contractors, and OEM manufacturers specifying MPU in motor control designs.",
    items: [
      {
        q: "What does MPU stand for and what does it replace?",
        a: "MPU stands for Motor Protection Unit. It is a pre-programmed microcontroller-based digital module by Subtech Electronics that consolidates six conventional motor starter components — thermal overload relay, single phase preventer, analog ammeter, start/stop push buttons, star-delta timer, and additional protection modules — into one compact intelligent unit with seven protection functions built in.",
      },
      {
        q: "What are the seven protections in MPU?",
        a: "MPU provides: (1) Overload cut-off, (2) Dry run cut-off, (3) Single phasing cut-off, (4) Reverse phasing cut-off, (5) Phase unbalance cut-off at approximately 60V difference, (6) Over voltage cut-off, and (7) Under voltage cut-off. Protections 1, 2, 6, and 7 are button-settable on site. Each protection activates its own dedicated LED indicator on the front panel.",
      },
      {
        q: "Can MPU thresholds be configured on site without special tools?",
        a: "Yes. Overload, dry run, over voltage, and under voltage cut-off thresholds are button-settable on site using the front-panel controls on the MPU unit itself. No external laptop, proprietary software, or calibration tools are required. This makes site commissioning practical for field engineers without specialist electrical instrumentation.",
      },
      {
        q: "Why is MPU suitable for unstable grid areas and rural installations?",
        a: "MPU operates across a wide voltage range of 200 to 480 VAC — well beyond the narrow band of standard fixed-voltage controllers. This means MPU continues to function and protect the motor even when grid voltage dips or spikes, conditions common in rural feeders, agricultural connections, and Jal Nigam water supply systems across India.",
      },
      {
        q: "Can MPU be integrated with remote control and SCADA systems?",
        a: "Yes. MPU includes a remote trip provision input that accepts signals from float switches, pressure sensors, GSM controllers, and SCADA systems. This allows MPU-based panels to be integrated into Subtech's GSM or 4G remote automation systems for remote start/stop commands, fault SMS alerts, and real-time parameter monitoring without additional interface hardware.",
      },
      {
        q: "What contactor does Subtech use in MPU-based panels?",
        a: "Subtech panels with MPU use the PMC (Pre-Magnetic Contactor), Subtech's proprietary DC-coil switching technology that eliminates coil burning and contact chattering. The PMC contactor carries a five-year warranty against coil burning and is designed for reliable operation at both low and high supply voltages — directly complementing MPU's wide voltage protection range.",
      },
    ],
  },
  cta: {
    h2: "Specify MPU in Your Next Panel",
    p: "Technical datasheet, wiring diagrams, HP-wise selection guide, and application consultation available on request. Serving industrial, infrastructure, and government motor control projects across India since 1999.",
    btnHref: "/contact",
    btnText: "Send Enquiry",
  },
};

export default function MpuPage() {
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
