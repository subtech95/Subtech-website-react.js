/**
 * Subtech Solutions catalogue.
 *
 * Mirrors the PHP site: /solutions hub + 13 sector sub-pages, each with
 * a tagline and an SEO-friendly slug. Content drawn from the live PHP
 * version of subtech.in/solutions.
 */

export type Sector = {
  slug: string;
  /** Industry name shown on cards */
  name: string;
  /** One-line value prop shown under the name */
  tagline: string;
  /** Longer paragraph for the sector hero */
  description: string;
  /** Number of canned solutions the PHP site shows for this sector */
  solutionCount: number;
  /** Emoji used on the hub card (cheap, no asset cost) */
  icon: string;
  /** Bullet list of typical applications for the sector page body */
  applications: string[];
};

export const SECTORS: Sector[] = [
  {
    slug: "utilities-and-energy",
    name: "Utilities & Energy",
    tagline: "Power and Water Infrastructure Automation",
    description:
      "Pumping stations, water treatment plants, sewage handling and energy distribution boards — Subtech panels stand up to 24x7 duty cycles and rural power conditions across municipal and PSU projects.",
    solutionCount: 6,
    icon: "⚡",
    applications: [
      "Municipal water pump and tubewell automation",
      "Sewage and effluent treatment plant motor control",
      "Energy distribution feeder pillars",
      "AMF / ATS panels for redundancy in critical loads",
      "APFC panels for power factor correction at substations",
      "SCADA-ready RTU panels for remote monitoring",
    ],
  },
  {
    slug: "government-project-automation",
    name: "Government Infrastructure",
    tagline: "Automation for Smart Cities and Public Utilities",
    description:
      "From PHED Rajasthan to UP Jal Nigam, Delhi Jal Board and Indian Railways — Subtech is empanelled with multiple government bodies and listed on the GeM portal for direct procurement.",
    solutionCount: 4,
    icon: "🏛️",
    applications: [
      "Tubewell and overhead tank automation for state water boards",
      "Street-light feeder pillars and timer panels",
      "Smart-city pump house IoT control panels",
      "ITI / training centre panels with safety interlocks",
    ],
  },
  {
    slug: "campus-power-automation",
    name: "Schools & Colleges",
    tagline: "Campus Automation for Educational Institutions",
    description:
      "Multi-block campuses need staged power distribution, water automation across hostels and labs, and reliable backup. Subtech panels handle daily peak loads without manual switching.",
    solutionCount: 5,
    icon: "🎓",
    applications: [
      "Centralised pump room control for hostels and academic blocks",
      "AMF panels for genset auto-changeover",
      "MCC panels for HVAC, lifts and lab equipment",
      "APFC panels to reduce campus electricity bills",
      "Smart timer panels for street and corridor lighting",
    ],
  },
  {
    slug: "industrial-motor-control",
    name: "Industrial & Manufacturing",
    tagline: "Heavy-Duty Motor Control for Factories and Plants",
    description:
      "Honda, Reliance, Nalco and 200+ industrial clients run on Subtech motor protection. Built for foundry heat, cement-plant dust and continuous-process duty cycles.",
    solutionCount: 5,
    icon: "🏭",
    applications: [
      "DOL / Star-Delta starter panels from 1 HP to 500 HP",
      "Soft starter panels for high-inertia loads",
      "VFD panels for energy-efficient motor control",
      "MCC and PCC panels with custom BOQ",
      "Reverse-forward DOL panels for conveyors and material handling",
    ],
  },
  {
    slug: "hospital-critical-power-systems",
    name: "Hospitals & Healthcare",
    tagline: "Critical Power and Water Automation for Healthcare",
    description:
      "Operating theatres, ICUs and water-supply systems can't tolerate downtime. Subtech AMF panels switch to genset in under 10 seconds; protection is layered, not optional.",
    solutionCount: 5,
    icon: "🏥",
    applications: [
      "AMF panels for OT / ICU genset auto-start",
      "ATS panels with synchronisation for multi-source power",
      "Pump panels for water supply and chiller plants",
      "MCC panels for HVAC, vacuum and medical-air systems",
      "APFC panels to reduce demand charges",
    ],
  },
  {
    slug: "home-automation-panels",
    name: "Residential & Farmhouses",
    tagline: "Home and Farmhouse Electrical Automation",
    description:
      "From single-phase Royal series for home pumps to fully-automatic two-tank starters for farmhouses, Subtech makes domestic water and power management hands-free.",
    solutionCount: 5,
    icon: "🏡",
    applications: [
      "Single-phase fully-automatic submersible starters",
      "Two-phase Royal+ panels for areas with split-phase supply",
      "Mini Royal automation for monoblock booster pumps",
      "Tank overflow protection with dual sensors",
      "Compact ABS-PVC DIN-rail panels for villa control rooms",
    ],
  },
  {
    slug: "smart-irrigation-motor-protection",
    name: "Agriculture & Farming",
    tagline: "Motor Protection for Farm Pumps and Borewells",
    description:
      "Rural power has voltage swings, dry-run risks and three-phase imbalance. Subtech Kisan series is built specifically for farmer use — knob-based, simple, indestructible.",
    solutionCount: 4,
    icon: "🌾",
    applications: [
      "Kisan series DOL and Star Delta starters",
      "4G / GSM mobile-controlled motor starters for remote farms",
      "Dry-run protection for borewells and submersibles",
      "Auto phase correction DOL for areas with reverse-phase supply",
    ],
  },
  {
    slug: "commercial-building-automation",
    name: "Commercial & Corporate Buildings",
    tagline: "Building Automation for Offices, Shops, and Clinics",
    description:
      "Clean-looking floor-mounted MCCs, sub-metering for tenant billing, and BMS-ready panels — Subtech is specified by leading project consultants across NCR and PAN India.",
    solutionCount: 6,
    icon: "🏢",
    applications: [
      "MCC panels for HVAC, lifts and pump rooms",
      "Floor-wise distribution boards with sub-metering",
      "AMF / ATS panels for genset auto-changeover",
      "VFD panels for HVAC blower energy savings",
      "APFC panels to keep PF above 0.95",
      "Smart timer panels for facade and corridor lighting",
    ],
  },
  {
    slug: "real-estate-electrical-panels",
    name: "Real Estate & Building Projects",
    tagline: "Electrical Panels for Builders and Developers",
    description:
      "Bulk-priced, on-time delivery and snag-free handover. Subtech supplies developers like Bhutani, BPTP and Supertech with project-grade panels under one BOQ.",
    solutionCount: 5,
    icon: "🏗️",
    applications: [
      "LT distribution panels for project handover",
      "Pump-room panels for towers and townships",
      "Genset AMF / synchronising panels",
      "Common-area lighting timers",
      "Sub-metering panels for tenant billing",
    ],
  },
  {
    slug: "bank-power-backup-automation",
    name: "Banks & Financial Institutions",
    tagline: "Power Reliability for Banking Operations",
    description:
      "ATM kiosks, branch UPS rooms and data centre redundancy — Subtech supplies banks across India with AMF, ATS and surge-protected distribution panels.",
    solutionCount: 5,
    icon: "🏦",
    applications: [
      "AMF panels for branch genset auto-start",
      "ATS panels for dual-source power redundancy",
      "Surge-protected distribution boards",
      "Sub-metering for branch energy audits",
      "ATM kiosk power-backup integration panels",
    ],
  },
  {
    slug: "telecom-power-systems",
    name: "Telecom & IT Infrastructure",
    tagline: "Power Automation for Towers, Data Centres, and Server Rooms",
    description:
      "Airtel, DHL and Hathway use Subtech power-automation in tower sites, data centre PDUs and server rooms — engineered for 24×7 reliability and remote monitoring.",
    solutionCount: 7,
    icon: "📡",
    applications: [
      "AMF / ATS panels for tower-site auto-changeover",
      "Server-room PDUs with surge protection",
      "Data centre MCC panels with energy metering",
      "Cooling-load VFD panels",
      "Battery-charger panels for telecom DC plants",
      "Synchronising panels for multi-genset farms",
      "Remote-monitor RTU panels for unmanned tower sites",
    ],
  },
  {
    slug: "defence-electrical-systems",
    name: "Defence & Strategic Installations",
    tagline: "Ruggedised Automation for Defence and Security",
    description:
      "Indian Air Force, defence cantonments and strategic installations specify Subtech for ruggedised AMF panels, dust-proof enclosures and certified load-tested motor control.",
    solutionCount: 5,
    icon: "🛡️",
    applications: [
      "Ruggedised AMF panels for forward operating bases",
      "Dust-proof and ingress-protected MCC panels",
      "Synchronising panels for multi-genset installations",
      "Pump-room automation for cantonment water supply",
      "BIS / ISI marked LT panels for tender compliance",
    ],
  },
  {
    slug: "oems-and-panel-integrators",
    name: "OEMs / Panel Integrators",
    tagline: "Bulk Components and Custom Panels for OEMs",
    description:
      "Sub-assemblies, bulk discounts and OEM-private-labelled motor protection units. Build your own panel line on top of Subtech components.",
    solutionCount: 5,
    icon: "⚙️",
    applications: [
      "MPU and PMC contactor sub-assemblies in bulk",
      "Private-labelled motor starters with your branding",
      "BOQ-based custom panel fabrication",
      "Spare-part kits for after-sales service",
      "Drop-shipping support for tender deliveries",
    ],
  },
];

export const STATS = [
  { value: "25+", label: "Years in Operation" },
  { value: "13", label: "Sectors Served" },
  { value: "220+", label: "Dealer Network" },
  { value: "ISO", label: "4 Certifications" },
  { value: "GeM", label: "Government Listed" },
];

export const TRUSTED_BY = [
  "Indian Railways",
  "Delhi Metro",
  "NTPC",
  "GAIL",
  "Indian Air Force",
  "UP Jal Nigam",
  "PGCIL",
  "Honda Power",
  "DJB",
  "NLC India",
];

export const WHY_SUBTECH = [
  {
    n: "01",
    title: "Certified for Government Tenders",
    body: "ISO 9001, ISO 14001, ISO 45001, ISO 50001 certified. ERTL and SIGMA lab tested. Products listed on GeM portal for direct government and PSU procurement.",
  },
  {
    n: "02",
    title: "7-Point Motor Protection Standard",
    body: "Every panel includes overload, phase failure, phase imbalance, over/under voltage, short circuit, and dry-run protection as standard — not as an optional add-on.",
  },
  {
    n: "03",
    title: "Honda Authorised Automation Partner",
    body: "Subtech is the authorised automation partner for Honda Generators in India. AMF and ATS panels certified for Honda genset compatibility from single phase to 1000 kVA.",
  },
  {
    n: "04",
    title: "True HP Ratings. No Over-Rating.",
    body: "All panels are rated and tested at the stated HP. No over-rating for cost cutting. What is printed on the nameplate is what is installed inside.",
  },
  {
    n: "05",
    title: "Pan-India Dealer Support",
    body: "220+ active dealers across India provide local availability, installation support, and after-sales service. No waiting weeks for a service engineer from headquarters.",
  },
  {
    n: "06",
    title: "Custom and OEM Panels on Order",
    body: "BOQ-based custom panel fabrication for government tenders, OEM integration, and large project requirements. MCC, PCC, LT panels, and feeder pillars available on request.",
  },
];

export const FAQS = [
  {
    q: "What HP range do Subtech panels cover?",
    a: "Subtech covers single phase from 0.5 HP to 3 HP, three phase DOL from 1 HP to 30 HP, and Star-Delta panels from 7.5 HP to 200+ HP. Auto-Transformer panels cover up to 500 HP. Custom panels above this range are available for large industrial and government projects.",
  },
  {
    q: "Are products available on the GeM portal for government procurement?",
    a: "Yes. Subtech products are listed on the Government e-Marketplace (GeM) portal. Government departments, PSUs and defence establishments can directly procure. Contact our sales team for GeM product codes and procurement support.",
  },
  {
    q: "What certifications does Subtech hold for government tenders?",
    a: "Subtech holds ISO 9001 (Quality), ISO 14001 (Environmental), ISO 45001 (Occupational Health & Safety) and ISO 50001 (Energy Management). Products are ERTL and SIGMA lab tested. Certification documents are available for tender submission on request.",
  },
  {
    q: "Can Subtech supply custom panels as per BOQ or project drawings?",
    a: "Yes. Subtech accepts custom orders based on client BOQ, government tender specifications, or OEM drawings. We manufacture MCC, PCC, LT distribution panels and feeder pillars to order. Lead time is typically 2-6 weeks depending on complexity and quantity.",
  },
  {
    q: "Which sectors has Subtech served and who are the major clients?",
    a: "Subtech serves 13 sectors including industrial, government, healthcare, defence, education, telecom and real estate. Major clients include Indian Railways, Delhi Metro, NTPC, GAIL, Indian Air Force, UP Jal Nigam, PGCIL, Honda Power and DJB.",
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
