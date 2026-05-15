/**
 * Subtech static product catalog — sourced from the printed price list
 * "FINAL SMART MOTOR CONTROL PANELS" (Jan 2026 release, Doc No. ST-MSP-E v1.0).
 *
 * The taxonomy mirrors the live PHP site at subtech.in:
 *   /products/{category}/{subcategory}/{type}/{series}
 *
 * MRP values are in INR. "On Request" means the SKU is built to order.
 */

export type Variant = {
  ref: string;
  hp: string;
  kw?: string;
  mcb?: string;
  capacitorStart?: string;
  capacitorRun?: string;
  relayRange?: string;
  motorType?: string;
  size?: string;
  weight?: string;
  mrp: number | "On Request";
  stdPack?: number | string;
  protection?: string;
};

export type Series = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  /** Public image path under /public, e.g. "/images/products/royal.png". */
  image?: string;
  features: string[];
  protections?: string[];
  addOns?: string[];
  notes?: string[];
  variants: Variant[];
  variantTags: string[];
  hpRange: string[];
};

export type ProductType = {
  slug: string;
  name: string;
  description: string;
  series: Series[];
};

export type SubCategory = {
  slug: string;
  name: string;
  description: string;
  types: ProductType[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  subCategories: SubCategory[];
};

const ADDONS_COMMON = [
  "Dry Run Charges: ₹890 charged extra",
  "Double tank operation: ₹1400 charged extra",
  "Sensor Set: ₹1380 charged extra",
];

// ── Single Phase ──────────────────────────────────────────────────────────────

const baseSeries: Series = {
  slug: "base",
  name: "Base",
  tagline: "Most basic analog single-phase starter",
  image: "/images/products/base.png",
  description:
    "Most basic analog starter with conventional switch and single run capacitor, no auto-cut protection.",
  longDescription:
    "Starter Panel for Single Phase Submersible Pumps. Operating Voltage 150-270 VAC. MCB protection for overload and short circuit. Used for submersible pumps with oil-filled motors.",
  features: [
    "Operating Voltage: 150-270 VAC",
    "MCB Protection For Overload and Short Circuit",
    "LED Indication - Power On",
    "Heavy Duty DMC Terminal",
    "Powder Coated Rust Free Enclosure",
    "Used For Submersible Pumps",
  ],
  variants: [
    { ref: "B1", hp: "1", mcb: "10 A.", capacitorRun: "36/45", motorType: "Oil filled", size: "200*200*90", weight: "1.6", mrp: 2040, stdPack: 10 },
    { ref: "B1F", hp: "1.5", mcb: "16 A.", capacitorRun: "50/60", motorType: "Oil filled", size: "200*200*90", weight: "1.6", mrp: 2200, stdPack: 10 },
  ],
  variantTags: ["Oil Filled"],
  hpRange: ["1", "1.5"],
};

const eBaseSeries: Series = {
  slug: "e-base",
  name: "E-Base",
  tagline: "Auto-cut analog starter with push buttons",
  image: "/images/products/e-base.png",
  description:
    "Safer analog starter with push buttons, Start and Run capacitors, and auto-cut after power resumption, with Voltage check button.",
  features: [
    "Operating Voltage: 150-270 VAC",
    "Auto Cut After Power Resumption",
    "MCB Protection For Overload & Short Circuit",
    "Manual Start And Stop By Push Buttons",
    "Inbuilt Start & Run Capacitors",
    "Heavy Duty DMC Terminal",
    "Powder Coated Rust Free Box",
    "LED Indication (Power On, Motor On)",
    "Volt Check By Push Button (Off Mode)",
    "Analog Ampere And Volt meter",
    "Used For Submersible Pumps",
  ],
  variants: [
    { ref: "E1O", hp: "1", mcb: "10 A.", capacitorRun: "36/45", motorType: "Oil filled", size: "200*210*100", weight: "2.0", mrp: 3795, stdPack: 10 },
    { ref: "E1", hp: "1", mcb: "10 A.", capacitorStart: "100/120", capacitorRun: "36/45", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 4150, stdPack: 10 },
    { ref: "E1FO", hp: "1.5", mcb: "16 A.", capacitorRun: "50", motorType: "Oil filled", size: "200*210*100", weight: "2.0", mrp: 4065, stdPack: 10 },
    { ref: "E1F", hp: "1.5", mcb: "16 A.", capacitorStart: "120/150", capacitorRun: "50", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 4400, stdPack: 10 },
    { ref: "E2", hp: "2", mcb: "20 A.", capacitorStart: "150/200", capacitorRun: "72", motorType: "Water filled", size: "200*210*100", weight: "2.8", mrp: 4700, stdPack: 10 },
    { ref: "E3", hp: "3", mcb: "25 A.", capacitorStart: "200/250", capacitorRun: "108", motorType: "Water filled", size: "280*225*100", weight: "3.2", mrp: 6375, stdPack: 5 },
  ],
  variantTags: ["Oil Filled", "Water Filled"],
  hpRange: ["1", "1.5", "2", "3"],
};

const eBaseProSeries: Series = {
  slug: "e-base-pro",
  name: "E-Base Pro",
  tagline: "Digital-display version of E-Base with auto-cut",
  image: "/images/products/e-base-pro.png",
  description:
    "Same as E-Base with a digital display replacing analog meters for better monitoring.",
  features: [
    "Operating Voltage: 150-270 VAC",
    "Auto Cut After Power Resumption",
    "MCB Protection For Overload & Short Circuit",
    "Manual Start And Stop By Push Buttons",
    "Inbuilt Start & Run Capacitors",
    "Digital Display For Volt & Amp",
    "Heavy Duty DMC Terminal",
    "Powder Coated Rust Free Box",
    "LED Indication (Power On, Motor On)",
    "Volt Check By Push Button (Off Mode)",
    "Used For Submersible Pumps",
  ],
  variants: [
    { ref: "EP1O", hp: "1", mcb: "10 A.", capacitorRun: "36/45", motorType: "Oil filled", size: "200*210*100", weight: "2.0", mrp: 4195, stdPack: 10 },
    { ref: "EP1", hp: "1", mcb: "10 A.", capacitorStart: "100/120", capacitorRun: "36/45", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 4550, stdPack: 10 },
    { ref: "EP1FO", hp: "1.5", mcb: "16 A.", capacitorRun: "50/60", motorType: "Oil filled", size: "200*210*100", weight: "2.0", mrp: 4465, stdPack: 10 },
    { ref: "EP1F", hp: "1.5", mcb: "16 A.", capacitorStart: "120/150", capacitorRun: "50/60", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 4800, stdPack: 10 },
    { ref: "EP2", hp: "2", mcb: "20 A.", capacitorStart: "150/200", capacitorRun: "72", motorType: "Water filled", size: "200*210*100", weight: "2.8", mrp: 5100, stdPack: 10 },
    { ref: "EP3", hp: "3", mcb: "25 A.", capacitorStart: "200/250", capacitorRun: "108", motorType: "Water filled", size: "280*225*100", weight: "3.2", mrp: 6775, stdPack: 5 },
  ],
  variantTags: ["Oil Filled", "Water Filled"],
  hpRange: ["1", "1.5", "2", "3"],
};

const eazyStopSeries: Series = {
  slug: "eazystop",
  name: "EazyStop",
  tagline: "Manual start, sensor-based auto stop (single sensor)",
  image: "/images/products/eazystop.png",
  description:
    "Manual start and automatic cut-off when the tank is full, using a single sensor. Ideal for affordable water overflow protection with manual control.",
  features: [
    "Operating Voltage: 150-270 VAC",
    "LED Indication (Power On, Motor On)",
    "Volt Check By Push Button (Off Mode)",
    "Analog Ampere And Volt meter",
    "Used For Submersible Pumps",
    "Sensor Included For Water Tank",
    "Water Overflow Protection Auto Stop",
    "Feature For Water & Energy Saving",
    "Starter For Semi-Automatic Operations",
  ],
  variants: [
    { ref: "ES1", hp: "1", mcb: "10 A.", capacitorStart: "100/120", capacitorRun: "36/45", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5220, stdPack: 5 },
    { ref: "ES1F", hp: "1.5", mcb: "16 A.", capacitorStart: "120/150", capacitorRun: "50", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5540, stdPack: 5 },
    { ref: "ES2", hp: "2", mcb: "20 A.", capacitorStart: "150/200", capacitorRun: "72", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5910, stdPack: 5 },
    { ref: "ES3", hp: "3", mcb: "25 A.", capacitorStart: "200/250", capacitorRun: "108", motorType: "Water filled", size: "280*225*100", weight: "3.2", mrp: 8020, stdPack: 3 },
  ],
  variantTags: ["Water Filled"],
  hpRange: ["1", "1.5", "2", "3"],
};

const setStopSeries: Series = {
  slug: "setstop",
  name: "SetStop",
  tagline: "Manual start, timer-based auto stop",
  image: "/images/products/setstop.png",
  description:
    "Manually start the pump and it will automatically stop at whatever time has been set. The timer is fully adjustable. Ideal for affordable basic automation with manual control.",
  features: [
    "A Smart, Energy-Efficient Starter With Built-In Timer Stop Function",
    "LED Indicators for Power ON & Motor ON",
    "Volt Check Via Push Button (When OFF)",
    "MCB Protection For Overload And Short Circuit",
    "Analog Volt & Ampere Meter",
    "Sturdy PVC Body With DMC Terminals for Power Connection",
  ],
  variants: [
    { ref: "SS1", hp: "1", mcb: "10 A.", capacitorStart: "100/120", capacitorRun: "36/45", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5220, stdPack: 5 },
    { ref: "SS1F", hp: "1.5", mcb: "16 A.", capacitorStart: "120/150", capacitorRun: "50", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5540, stdPack: 5 },
    { ref: "SS2", hp: "2", mcb: "20 A.", capacitorStart: "150/200", capacitorRun: "72", motorType: "Water filled", size: "200*210*100", weight: "2.0", mrp: 5910, stdPack: 5 },
    { ref: "SS3", hp: "3", mcb: "25 A.", capacitorStart: "200/250", capacitorRun: "108", motorType: "Water filled", size: "280*225*100", weight: "3.2", mrp: 8020, stdPack: 3 },
  ],
  variantTags: ["Water Filled"],
  hpRange: ["1", "1.5", "2", "3"],
};

const superRoyalSeries: Series = {
  slug: "super-royal",
  name: "Super Royal",
  tagline: "Fully automatic with overflow protection",
  image: "/images/products/super-royal.png",
  description:
    "Fully automatic motor starter with safety protections and dual tank sensors that auto start and stop the motor based on water level — ideal for customers seeking protection and complete automation.",
  longDescription:
    "Suitable for homes, industries, hotels and schools. Comes with two inbuilt water tank level sensors that automatically switch the motor ON/OFF based on overhead tank water level — no manual intervention needed.",
  features: [
    "Automatic And Manual Operation",
    "Operating Volt: 160-280 VAC",
    "MCB For Short Circuit and Overload",
    "Over/Under Voltage Protection*",
    "Over Load Protection*",
    "Dry Run Protection (Optional)*",
    "Start Delay Timer",
    "Auto/Manual Switch",
    "Soft Buttons For Manual Start & Stop",
    "Sensor Set",
    "Digital Overload Relay",
    "Water Overflow Protection System",
    "Powder Coated Rust Free Box",
    "LED Indications (Run Status)",
    "Digital Volt & Amp Meter",
    "Heavy Duty DMC Terminal",
  ],
  notes: ["*Site settable parameters"],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "SR1", hp: "1", mcb: "10 A.", relayRange: "5-20 A.", capacitorStart: "100/120", capacitorRun: "36/45", size: "280*225*100", weight: "2.8", mrp: 9590, stdPack: 5 },
    { ref: "SR1F", hp: "1.5", mcb: "16 A.", relayRange: "5-20 A.", capacitorStart: "100/120", capacitorRun: "50", size: "280*225*100", weight: "2.8", mrp: 10300, stdPack: 5 },
    { ref: "SR2", hp: "2", mcb: "20 A.", relayRange: "10-25 A.", capacitorStart: "120/150", capacitorRun: "72", size: "280*225*100", weight: "2.8", mrp: 11100, stdPack: 5 },
    { ref: "SR3", hp: "3", mcb: "25 A.", relayRange: "15-30 A.", capacitorStart: "150/200", capacitorRun: "108", size: "280*225*100", weight: "2.8", mrp: 12000, stdPack: 5 },
  ],
  variantTags: ["Single Tank", "Double Tank"],
  hpRange: ["1", "1.5", "2", "3"],
};

const royalSeries: Series = {
  slug: "royal",
  name: "Royal",
  tagline: "Fully automatic single phase starter with water overflow protection",
  image: "/images/products/royal-family.png",
  description:
    "A fully automatic, micro-controlled digital starter panel for single phase submersible pumps. Two inbuilt water tank level sensors automatically switch the motor ON/OFF based on overhead tank water level.",
  longDescription:
    "Offers complete motor protection against overload, over/under voltage, and dry run conditions. A complete water automation solution in one package.",
  features: [
    "Automatic And Manual Operation",
    "Operating Volt: 160-280 VAC",
    "MCB For Short Circuit and Overload",
    "Over/Under Voltage Protection*",
    "Over Load Protection*",
    "Dry Run Protection (Optional)*",
    "Start Delay Timer",
    "Auto/Manual Switch",
    "Soft Buttons For Manual Start & Stop",
    "Inbuilt Sensor Set for Overhead Tank",
    "Inbuilt Underground Tank Operation (Optional)",
    "Digital Overload Relay",
    "Powder Coated Rust Free Box",
    "Digital Volt & Amp Meter",
    "Heavy Duty DMC Terminal",
  ],
  notes: ["*Site settable parameters"],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "R1", hp: "1", mcb: "10 A.", capacitorStart: "100/120", capacitorRun: "36/45", size: "280*225*100", weight: "2.9", mrp: 7280, stdPack: 5 },
    { ref: "R1F", hp: "1.5", mcb: "16 A.", capacitorStart: "100/120", capacitorRun: "50", size: "280*225*100", weight: "2.9", mrp: 7600, stdPack: 5 },
    { ref: "R2", hp: "2", mcb: "20 A.", capacitorStart: "120/150", capacitorRun: "72", size: "280*225*100", weight: "2.9", mrp: 7950, stdPack: 5 },
    { ref: "R3", hp: "3", mcb: "25 A.", capacitorStart: "150/200", capacitorRun: "108", size: "280*225*100", weight: "3.5", mrp: 9100, stdPack: 5 },
    { ref: "R3P", hp: "3 (PMC)", mcb: "25 A.", capacitorStart: "200/250", capacitorRun: "108", size: "350*300*110", weight: "4.0", mrp: 12000, stdPack: 3 },
    { ref: "R5", hp: "5 (PMC)", mcb: "40 A.", capacitorStart: "250/300", capacitorRun: "160", size: "350*300*110", weight: "5.0", mrp: 13100, stdPack: 3 },
    { ref: "R7", hp: "7.5 (PMC)", mcb: "63 A.", capacitorStart: "250/300", capacitorRun: "220", size: "350*300*110", weight: "6.0", mrp: 15700, stdPack: 2 },
    { ref: "R10", hp: "10 (PMC)", capacitorStart: "400/600", capacitorRun: "360", size: "450*450*150", weight: "11.0", mrp: 18500, stdPack: 2 },
  ],
  variantTags: ["Submersible", "PMC"],
  hpRange: ["1", "1.5", "2", "3", "5", "7.5", "10"],
};

const miniRoyalSeries: Series = {
  slug: "mini-royal",
  name: "Mini Royal",
  tagline: "Compact fully-automatic for monoblock pumps up to 2 HP",
  image: "/images/products/mini-royal.png",
  description:
    "Low-cost automatic starter for monoblock pumps up to 2 HP, with full safety protections, plastic body, and sensor support for auto motor control. Ideal for budget-conscious customers and reliable operation.",
  longDescription:
    "A micro-controlled digital panel with dual water level sensors for fully automatic ON/OFF control, ensuring efficient hands-free operation.",
  features: [
    "Auto / Manual Mode Selector Switch",
    "Water Overflow Protection System",
    "Operating Voltage: 130-280 V",
    "Digital Meter For Voltage & Current",
    "Digital Display For Water Level",
    "Compact Size",
    "User Settable Voltage & Current Limits",
    "Easy Installation/Operation",
    "DIN Rail Mounted",
    "Dry Run Feature (Optional)",
    "Capacity 25 amp. (Up to 2 HP Pumps)",
    "Over/Under Voltage & Current Protection",
    "Timer Based Operation (Optional)",
    "ABS PVC Box",
  ],
  addOns: [
    "Dry Run Charges - ₹890 charged extra",
    "For Daily/Weekly Digital Timer Based Operations - ₹2550 charged extra",
  ],
  variants: [
    { ref: "MR1", hp: "0.5 - 2", motorType: "Single Overhead Tank", size: "100*75*75", weight: "0.5", mrp: 6880, stdPack: 5 },
    { ref: "MR2", hp: "0.5 - 2", motorType: "Double Tank (Overhead and UG Tank)", size: "100*75*75", weight: "0.5", mrp: 7850, stdPack: 5 },
  ],
  variantTags: ["Monoblock", "Single Tank", "Double Tank"],
  hpRange: ["0.5-2"],
};

const royalPlusSeries: Series = {
  slug: "royal-plus",
  name: "Royal +",
  tagline: "Two-phase fully automatic starter",
  image: "/images/products/royal+.png",
  description:
    "Designed for two-phase motors with complete safety protections for reliable pump operation. Built mainly for locations where two-phase supply is common.",
  longDescription:
    "Ideal for the agriculture sector and farmers who need a dependable two-phase pump controller with strong protection. Works on phase-to-phase 440 Volt.",
  features: [
    "Automatic And Manual Operation",
    "Digital Automatic Starter",
    "Input: 180 - 440 VAC",
    "Works Well On Phase-To-Phase (440 Volt)",
    "Auto / Manual Mode Selector Switch",
    "Compact Size & Easy Installation/Operation",
    "Inbuilt 2 Pole MCB For Extra Protection",
    "LED Indications For Run Status",
    "Over / Under Voltage & Current Protection",
    "Inbuilt 440 VAC Start/Run Capacitors",
    "Powder Coated Rust Free Box",
    "Dry Run Feature (Optional)",
    "With PMC Contactor For Smooth Switching",
  ],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "RP3", hp: "3", mcb: "25 A.", relayRange: "15-30", capacitorStart: "200/250", capacitorRun: "85", size: "350*300*110", weight: "4.0", mrp: 12900, stdPack: 5 },
    { ref: "RP5", hp: "5", mcb: "40 A.", relayRange: "20-40", capacitorStart: "250/300", capacitorRun: "120", size: "350*300*110", weight: "4.0", mrp: 14400, stdPack: 5 },
    { ref: "RP7", hp: "7.5", mcb: "63 A.", relayRange: "30-55", capacitorStart: "300/400", capacitorRun: "216", size: "350*400*125", weight: "6.0", mrp: 16800, stdPack: 3 },
    { ref: "RP10", hp: "10", relayRange: "40-75", capacitorStart: "250/300*2", capacitorRun: "288", size: "450*450*150", weight: "10", mrp: 19980, stdPack: 3 },
  ],
  variantTags: ["Monoblock", "Two Phase"],
  hpRange: ["3", "5", "7.5", "10"],
};

// ── Three Phase ───────────────────────────────────────────────────────────────

const SHARED_3PH_FEATURES = [
  "Wide operating Voltage range: 240-480 VAC",
  "Continuous running capacity: 100+ hrs",
  "Status: R-Y-B Phases, Healthy Power, Run Hr.",
  "Faults: Phase fail, Reverse Phase, Unbalance Voltage, Over/Under Voltage, Overload",
  "PMC Contactor for smooth, fast switching (5 years warranty on contactor coil against burning)",
  "Body: Rust-free GPSP Sheet, Wall mounting, compact size",
  "Heavy duty DMC connection terminals for input and output",
];

const SHARED_3PH_PROTECTIONS = [
  "Single Phasing",
  "Reverse Phasing",
  "Phase Unbalance Cutoff",
  "Over Voltage Protection",
  "Under Voltage Protection",
  "Overload Protection",
  "Short Circuit Protection",
  "Dry Run Protection (Optional)",
];

const standardThreePhaseSeries: Series = {
  slug: "standard-three-phase",
  name: "Standard Smart Three Phase Panel",
  tagline: "Smart digital control panel for everyday three-phase motors",
  image: "/images/products/three-phase-standard.png",
  description:
    "A dependable, no-frills three-phase smart control panel with digital metering, MCB protection and PMC contactor switching. Built for everyday industrial and agricultural motors that need reliable control without the extras.",
  longDescription:
    "Includes a smart digital display showing voltage, current and run hours. Single push-button operation with knob-based settings, MCB inside for short-circuit and overload protection, PMC contactor for smooth switching, compact wall-mount GPSP enclosure.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Smart digital display (V / A / Run hours)",
    "Inbuilt MCB protection",
    "Single push-button operation",
    "Compact wall-mount design",
    "GPSP sheet enclosure, powder-coated rust-proof",
    "Heavy-duty DMC connection terminals",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "STD1",  hp: "1",    kw: "0.75", relayRange: "2-10",  size: "300*225*110", weight: "3.5", mrp: "On Request" },
    { ref: "STD3",  hp: "3",    kw: "2.2",  relayRange: "3-15",  size: "300*225*110", weight: "3.5", mrp: "On Request" },
    { ref: "STD5",  hp: "5",    kw: "3.7",  relayRange: "5-20",  size: "300*225*110", weight: "3.5", mrp: "On Request" },
    { ref: "STD7",  hp: "7.5",  kw: "5.5",  relayRange: "10-25", size: "300*225*110", weight: "3.5", mrp: "On Request" },
    { ref: "STD10", hp: "10",   kw: "7.5",  relayRange: "15-35", size: "300*225*110", weight: "4.0", mrp: "On Request" },
    { ref: "STD15", hp: "15",   kw: "11",   relayRange: "20-45", size: "350*270*120", weight: "5.5", mrp: "On Request" },
    { ref: "STD20", hp: "20",   kw: "15",   relayRange: "25-50", size: "350*270*120", weight: "5.5", mrp: "On Request" },
    { ref: "STD30", hp: "30",   kw: "22",   relayRange: "40-75", size: "450*400*130", weight: "8.0", mrp: "On Request" },
  ],
  variantTags: ["DOL", "Smart Digital"],
  hpRange: ["1", "3", "5", "7.5", "10", "15", "20", "30"],
};

const kisanDolSeries: Series = {
  slug: "kisan-dol",
  name: "Kisan Series — DOL",
  tagline: "Smart DOL starter, knob-based, for everyday agricultural use",
  image: "/images/products/kisan-dol.png",
  description:
    "Simple knob-based starter built for everyday agricultural use. Available range: 1 to 30 HP.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Site settable overload cut-off (by knob)",
    "Fixed over & under voltage cut-off",
    "Smart digital display interface",
    "Rust-free GPSP/GI sheet enclosure",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "DK1", hp: "1", kw: "0.75", relayRange: "2-10", size: "280*205*110", weight: "3.0", mrp: 10500, stdPack: 5 },
    { ref: "DK5", hp: "5", kw: "3.7", relayRange: "5-20", size: "280*205*110", weight: "3.0", mrp: 10500, stdPack: 5 },
    { ref: "DK7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "280*205*110", weight: "3.0", mrp: 10500, stdPack: 5 },
    { ref: "DK10L", hp: "10", kw: "7.5", relayRange: "10-30", size: "280*205*110", weight: "3.0", mrp: 10500, stdPack: 5 },
    { ref: "DK7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "280*205*110", weight: "3.5", mrp: 11700, stdPack: 5 },
    { ref: "DK10", hp: "10", kw: "7.5", relayRange: "15-35", size: "280*205*110", weight: "3.5", mrp: 11700, stdPack: 5 },
    { ref: "DK12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "280*205*110", weight: "3.5", mrp: 12000, stdPack: 5 },
    { ref: "DK15", hp: "15", kw: "11", relayRange: "20-45", size: "310*250*120", weight: "5.0", mrp: 13100, stdPack: 3 },
    { ref: "DK20", hp: "20", kw: "15", relayRange: "25-50", size: "310*250*120", weight: "5.0", mrp: 16400, stdPack: 3 },
    { ref: "DK30", hp: "30", kw: "22", relayRange: "40-75", size: "450*400*130", weight: "8.0", mrp: 19100, stdPack: 2 },
  ],
  variantTags: ["DOL", "Submersible"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20", "30"],
};

const powerMaxDolSeries: Series = {
  slug: "powermax-dol",
  name: "PowerMax Series — DOL",
  tagline: "Stronger build with inbuilt MCB for reliable daily operation",
  image: "/images/products/powermax-dol.png",
  description:
    "Stronger build with inbuilt MCB for reliable daily operation. Available range: 1 to 30 HP.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Inbuilt MCB / MCCB protection",
    "Site settable overload cut-off (by knob)",
    "Fixed over & under voltage cut-off",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  notes: ["DX30 is available in MCCB"],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "DX1", hp: "1", kw: "0.75", relayRange: "2-10", size: "300*225*110", weight: "4.0", mrp: 13200, stdPack: 5, protection: "MCB" },
    { ref: "DX5", hp: "5", kw: "3.7", relayRange: "5-20", size: "300*225*110", weight: "4.0", mrp: 13200, stdPack: 5, protection: "MCB" },
    { ref: "DX7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.0", mrp: 13200, stdPack: 5, protection: "MCB" },
    { ref: "DX10L", hp: "10", kw: "7.5", relayRange: "10-30", size: "300*225*110", weight: "4.0", mrp: 13200, stdPack: 5, protection: "MCB" },
    { ref: "DX7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.3", mrp: 14000, stdPack: 5, protection: "MCB" },
    { ref: "DX10", hp: "10", kw: "7.5", relayRange: "15-35", size: "300*225*110", weight: "4.3", mrp: 14000, stdPack: 5, protection: "MCB" },
    { ref: "DX12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "300*225*110", weight: "4.3", mrp: 14800, stdPack: 5, protection: "MCB" },
    { ref: "DX15", hp: "15", kw: "11", relayRange: "20-45", size: "350*270*120", weight: "5.5", mrp: 15700, stdPack: 3, protection: "MCB" },
    { ref: "DX20", hp: "20", kw: "15", relayRange: "25-50", size: "350*270*120", weight: "5.5", mrp: 18200, stdPack: 3, protection: "MCB" },
    { ref: "DX30", hp: "30", kw: "22", relayRange: "40-75", size: "450*400*150", weight: "9.5", mrp: 23900, stdPack: 2, protection: "MCCB" },
  ],
  variantTags: ["DOL", "Submersible"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20", "30"],
};

const goldDolSeries: Series = {
  slug: "gold-dol",
  name: "Gold Series — DOL",
  tagline: "Premium remote-trip functionality without inbuilt MCB",
  image: "/images/products/gold-dol.png",
  description:
    "Get premium Remote Trip functionality without paying for inbuilt MCB. Ideal for industrial and commercial use.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Remote Trip provision & programmable protections",
    "Site settable overload cut-off (by knob)",
    "Fixed over & under voltage cut-off",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "DG1", hp: "1", kw: "0.75", relayRange: "2-10", size: "300*225*110", weight: "4.0", mrp: 12500, stdPack: 5 },
    { ref: "DG5", hp: "5", kw: "3.7", relayRange: "5-20", size: "300*225*110", weight: "4.0", mrp: 12500, stdPack: 5 },
    { ref: "DG7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.0", mrp: 12500, stdPack: 5 },
    { ref: "DG10L", hp: "10", kw: "7.5", relayRange: "10-30", size: "300*225*110", weight: "4.0", mrp: 13700, stdPack: 5 },
    { ref: "DG7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.3", mrp: 13700, stdPack: 5 },
    { ref: "DG10", hp: "10", kw: "7.5", relayRange: "15-35", size: "300*225*110", weight: "4.3", mrp: 13700, stdPack: 5 },
    { ref: "DG12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "300*225*110", weight: "4.3", mrp: 14200, stdPack: 5 },
    { ref: "DG15", hp: "15", kw: "11", relayRange: "20-45", size: "350*270*120", weight: "5.5", mrp: 15200, stdPack: 3 },
    { ref: "DG20", hp: "20", kw: "15", relayRange: "25-50", size: "350*270*120", weight: "5.5", mrp: 17400, stdPack: 3 },
    { ref: "DG30", hp: "30", kw: "22", relayRange: "40-75", size: "450*400*130", weight: "8.0", mrp: 21900, stdPack: 2 },
  ],
  variantTags: ["DOL", "Remote Trip"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20", "30"],
};

const primeDolSeries: Series = {
  slug: "prime-dol",
  name: "Prime Series — DOL",
  tagline: "Top-of-the-line digital soft-switch settings with highest automation",
  image: "/images/products/prime-dol.png",
  description:
    "Top-of-the-line digital soft-switch settings with the highest automation and control.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Site settable overload cut-off (by soft switch)",
    "Site settable over & under voltage cut-off (by soft switch)",
    "Remote Trip provision & programmable protections",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  notes: ["DP30 is available in MCCB"],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "DP1", hp: "1", kw: "0.75", relayRange: "2-10", size: "300*225*110", weight: "4.0", mrp: 14800, stdPack: 5 },
    { ref: "DP5", hp: "5", kw: "3.7", relayRange: "5-20", size: "300*225*110", weight: "4.0", mrp: 14800, stdPack: 5 },
    { ref: "DP7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.0", mrp: 14800, stdPack: 5 },
    { ref: "DP10L", hp: "10", kw: "7.5", relayRange: "10-30", size: "300*225*110", weight: "4.0", mrp: 14800, stdPack: 5 },
    { ref: "DP7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.3", mrp: 15800, stdPack: 5 },
    { ref: "DP10", hp: "10", kw: "7.5", relayRange: "15-35", size: "300*225*110", weight: "4.3", mrp: 15800, stdPack: 5 },
    { ref: "DP12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "300*225*110", weight: "4.3", mrp: 16600, stdPack: 5 },
    { ref: "DP15", hp: "15", kw: "11", relayRange: "20-45", size: "350*270*120", weight: "5.5", mrp: 17500, stdPack: 3 },
    { ref: "DP20", hp: "20", kw: "15", relayRange: "25-50", size: "350*270*120", weight: "5.5", mrp: 19800, stdPack: 3 },
    { ref: "DP30", hp: "30", kw: "22", relayRange: "40-75", size: "450*400*150", weight: "9.5", mrp: 27600, stdPack: 2, protection: "MCCB" },
  ],
  variantTags: ["DOL", "Soft Switch"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20", "30"],
};

const kisanSdSeries: Series = {
  slug: "kisan-star-delta",
  name: "Kisan Series — Star Delta",
  tagline: "Smart Star Delta starter for large irrigation pumps",
  image: "/images/products/kisan-star-delta.png",
  description:
    "Simple knob-based Star Delta starter built for large irrigation and agricultural pumps. Starting range: 7.5 HP.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Site settable overload cut-off (by knob)",
    "Fixed over & under voltage cut-off",
    "Smart digital display interface",
    "Rust-free GPSP/GI sheet enclosure",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "SDK7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*300*125", weight: "5.5", mrp: 21600, stdPack: 6 },
    { ref: "SDK10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*300*125", weight: "5.5", mrp: 21600, stdPack: 6 },
    { ref: "SDK15", hp: "15", kw: "11", relayRange: "20-45", size: "350*300*125", weight: "5.5", mrp: 22300, stdPack: 6 },
    { ref: "SDK20", hp: "20", kw: "15", relayRange: "25-50", size: "350*300*125", weight: "5.5", mrp: 22300, stdPack: 6 },
    { ref: "SDK25", hp: "25", kw: "18.5", relayRange: "30-55", size: "350*300*125", weight: "6.0", mrp: 31100, stdPack: 5 },
    { ref: "SDK30L", hp: "30", kw: "22", relayRange: "40-75", size: "350*300*125", weight: "6.0", mrp: 31100, stdPack: 5 },
    { ref: "SDK30", hp: "30", kw: "22", relayRange: "40-75", size: "450*500*170", weight: "6.0", mrp: 46800, stdPack: 3 },
    { ref: "SDK40", hp: "40", kw: "30", relayRange: "60-90", size: "450*500*170", weight: "9.0", mrp: 49250, stdPack: 3 },
    { ref: "SDK50", hp: "50", kw: "37", relayRange: "70-120", size: "450*500*170", weight: "15.0", mrp: 62900, stdPack: 3 },
    { ref: "SDK60", hp: "60", kw: "45", relayRange: "80-140", size: "450*500*170", weight: "15.0", mrp: 62900, stdPack: 3 },
    { ref: "SDK75", hp: "75", kw: "56", relayRange: "90-150", size: "550*450*130", weight: "22.0", mrp: 79500, stdPack: 3 },
    { ref: "SDK85", hp: "85", kw: "60", relayRange: "120-185", size: "550*450*130", weight: "22.0", mrp: "On Request" },
    { ref: "SDK100", hp: "100", kw: "75", relayRange: "70-120 (H)", mrp: "On Request" },
    { ref: "SDK125", hp: "125", kw: "92", relayRange: "80-140 (H)", mrp: "On Request" },
  ],
  variantTags: ["Star Delta", "Submersible"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60", "75", "85", "100", "125"],
};

const powerMaxSdSeries: Series = {
  slug: "powermax-star-delta",
  name: "PowerMax Series — Star Delta",
  tagline: "Stronger build with inbuilt MCB/MCCB for industrial loads",
  image: "/images/products/powermax-star-delta.png",
  description:
    "Stronger build with inbuilt MCB/MCCB for heavy-duty industrial and motor applications. Suitable for industrial pumps, heavy motors, and demanding irrigation work.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Inbuilt MCB / MCCB protection",
    "Site settable overload cut-off (by knob)",
    "Fixed over & under voltage cut-off",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  notes: ["Size and Weight are approximate"],
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "SDX7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*400*125", weight: "7.5", mrp: 26300, stdPack: 4, protection: "MCB" },
    { ref: "SDX10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*400*125", weight: "7.5", mrp: 26300, stdPack: 4, protection: "MCB" },
    { ref: "SDX15", hp: "15", kw: "11", relayRange: "20-45", size: "350*400*125", weight: "7.5", mrp: 28200, stdPack: 4, protection: "MCB" },
    { ref: "SDX20", hp: "20", kw: "15", relayRange: "25-50", size: "350*400*125", weight: "8.0", mrp: 28200, stdPack: 4, protection: "MCB" },
    { ref: "SDX25", hp: "25", kw: "18.5", relayRange: "30-55", size: "380*455*125", weight: "9.2", mrp: 35900, stdPack: 2, protection: "MCCB" },
    { ref: "SDX30L", hp: "30", kw: "22", relayRange: "40-75", size: "380*455*125", weight: "9.3", mrp: 36500, stdPack: 2, protection: "MCCB" },
    { ref: "SDX30", hp: "30", kw: "22", relayRange: "40-75", size: "430*510*150", weight: "13.2", mrp: 53500, stdPack: 3, protection: "MCCB" },
    { ref: "SDX40", hp: "40", kw: "30", relayRange: "60-90", size: "430*510*150", weight: "13.2", mrp: 54800, stdPack: 3, protection: "MCCB" },
    { ref: "SDX50", hp: "50", kw: "37", relayRange: "70-120", size: "600*450*190", weight: "22.0", mrp: 75600, stdPack: 3, protection: "MCCB" },
    { ref: "SDX60", hp: "60", kw: "45", relayRange: "80-140", size: "600*450*190", weight: "22.5", mrp: 75600, stdPack: 3, protection: "MCCB" },
    { ref: "SDX75", hp: "75", kw: "56", relayRange: "90-150", size: "700*500*200", weight: "33.0", mrp: 94800, stdPack: 3, protection: "MCCB" },
    { ref: "SDX85", hp: "85", kw: "60", relayRange: "120-185", size: "700*500*200", weight: "33.0", mrp: 99500, protection: "MCCB" },
    { ref: "SDX100", hp: "100", kw: "75", relayRange: "70-120 (H)", mrp: "On Request", protection: "MCCB" },
    { ref: "SDX125", hp: "125", kw: "92", relayRange: "80-140 (H)", mrp: "On Request", protection: "MCCB" },
  ],
  variantTags: ["Star Delta", "Submersible"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60", "75", "85", "100", "125"],
};

const goldSdSeries: Series = {
  slug: "gold-star-delta",
  name: "Gold Series — Star Delta",
  tagline: "Remote trip without MCB/MCCB for industrial use",
  image: "/images/products/gold-star-delta.png",
  description:
    "Adds Remote Trip functionality without MCB/MCCB for industrial and commercial use.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Remote Trip provision & programmable protections",
    "Site settable overload cut-off (by knob)",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  addOns: ADDONS_COMMON,
  variants: [
    { ref: "SDG7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*300*125", weight: "5.5", mrp: 24100, stdPack: 6 },
    { ref: "SDG10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*300*125", weight: "5.5", mrp: 24100, stdPack: 6 },
    { ref: "SDG15", hp: "15", kw: "11", relayRange: "20-45", size: "350*300*125", weight: "5.5", mrp: 24900, stdPack: 6 },
    { ref: "SDG20", hp: "20", kw: "15", relayRange: "25-50", size: "350*300*125", weight: "6.0", mrp: 24900, stdPack: 6 },
    { ref: "SDG25", hp: "25", kw: "18.5", relayRange: "30-55", size: "350*300*125", weight: "6.0", mrp: 33600, stdPack: 5 },
    { ref: "SDG30L", hp: "30", kw: "22", relayRange: "40-75", size: "350*300*125", weight: "6.0", mrp: 33600, stdPack: 5 },
    { ref: "SDG30", hp: "30", kw: "22", relayRange: "40-75", size: "350*300*125", weight: "6.0", mrp: 49300, stdPack: 3 },
    { ref: "SDG40", hp: "40", kw: "30", relayRange: "60-90", size: "450*500*170", weight: "9.0", mrp: 51700, stdPack: 3 },
    { ref: "SDG50", hp: "50", kw: "37", relayRange: "70-120", size: "450*500*170", weight: "15.0", mrp: 65400, stdPack: 3 },
    { ref: "SDG60", hp: "60", kw: "45", relayRange: "80-140", size: "450*500*170", weight: "15.0", mrp: 65400, stdPack: 3 },
  ],
  variantTags: ["Star Delta", "Remote Trip"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60"],
};

const primeSdSeries: Series = {
  slug: "prime-star-delta",
  name: "Prime Series — Star Delta",
  tagline: "Top-of-the-line digital soft-switch with external command support",
  image: "/images/products/prime-star-delta.png",
  description:
    "Top-of-the-line digital soft-switch settings with external command support and the highest automation.",
  features: [
    ...SHARED_3PH_FEATURES,
    "Site settable overload cut-off (by soft switch)",
    "Site settable over & under voltage cut-off (by soft switch)",
    "Remote Trip provision & programmable protections",
    "Smart digital display interface",
    "Heavy Duty DMC Power Terminal",
  ],
  protections: SHARED_3PH_PROTECTIONS,
  notes: ["Size and Weight are approximate"],
  addOns: [
    "Dry Run Charges: ₹890 charged extra",
    "Sensor set (2 pcs) for water level controlling: ₹2500",
  ],
  variants: [
    { ref: "SDP7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*400*125", weight: "7.5", mrp: 29900, stdPack: 4, protection: "MCB" },
    { ref: "SDP10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*400*125", weight: "7.5", mrp: 29900, stdPack: 4, protection: "MCB" },
    { ref: "SDP15", hp: "15", kw: "11", relayRange: "20-45", size: "350*400*125", weight: "7.5", mrp: 33150, stdPack: 4, protection: "MCB" },
    { ref: "SDP20", hp: "20", kw: "15", relayRange: "25-50", size: "350*400*125", weight: "8.0", mrp: 33150, stdPack: 4, protection: "MCB" },
    { ref: "SDP25", hp: "25", kw: "18.5", relayRange: "30-55", size: "380*455*125", weight: "9.2", mrp: 39800, stdPack: 2, protection: "MCCB" },
    { ref: "SDP30L", hp: "30", kw: "22", relayRange: "40-75", size: "380*455*125", weight: "9.2", mrp: 39900, stdPack: 2, protection: "MCCB" },
    { ref: "SDP30", hp: "30", kw: "22", relayRange: "40-75", size: "430*510*150", weight: "13.2", mrp: 55500, stdPack: 3, protection: "MCCB" },
    { ref: "SDP40", hp: "40", kw: "30", relayRange: "60-90", size: "430*510*150", weight: "13.2", mrp: 57800, stdPack: 3, protection: "MCCB" },
    { ref: "SDP50", hp: "50", kw: "37", relayRange: "70-120", size: "600*450*190", weight: "22.0", mrp: 79500, stdPack: 3, protection: "MCCB" },
    { ref: "SDP60", hp: "60", kw: "45", relayRange: "80-140", size: "600*450*190", weight: "22.5", mrp: 79500, stdPack: 3, protection: "MCCB" },
    { ref: "SDP75", hp: "75", kw: "56", relayRange: "90-150", size: "650*500*200", weight: "33.0", mrp: 98800, stdPack: 3, protection: "MCCB" },
    { ref: "SDP85", hp: "85", kw: "60", relayRange: "120-175", mrp: "On Request", protection: "MCCB" },
    { ref: "SDP100", hp: "100", kw: "75", relayRange: "70-120 (H)", mrp: "On Request", protection: "MCCB" },
    { ref: "SDP125", hp: "125", kw: "92", relayRange: "80-140 (H)", mrp: "On Request", protection: "MCCB" },
  ],
  variantTags: ["Star Delta", "Soft Switch"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60", "75", "85", "100", "125"],
};

const apcDolSeries: Series = {
  slug: "auto-phase-correction-dol",
  name: "Inbuilt Auto Phase Correction DOL",
  tagline: "Auto-corrects phase sequence for safe 3-phase motor operation",
  image: "/images/products/apc-dol.png",
  description:
    "Smart motor starter panel that automatically corrects phase sequence for safe and proper 3-phase motor operation.",
  features: [
    "Microcontroller based system",
    "Wide voltage range: 200-480 VAC",
    "Auto / Manual / Bypass mode",
    "Start / Stop push button control",
    "Adjustable start delay",
    "Digital voltmeter, ammeter and run-hour display",
    "LED status and fault indications",
    "Over / under voltage protection",
    "Overload protection",
    "Rust-free GI sheet enclosure",
    "Compact wall-mounted design",
    "Heavy-duty terminals for secure wiring",
    "Inbuilt MCB / MCCB protection",
    "Low maintenance and reliable performance",
  ],
  notes: ["Also available in Star Delta configuration as per requirement"],
  variants: [
    { ref: "DAP5", hp: "5", kw: "3.7", relayRange: "5-20", size: "350*400*125", weight: "5.0", mrp: 32000 },
    { ref: "DAP7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*400*125", weight: "5.0", mrp: 32000 },
    { ref: "DAP10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*400*125", weight: "5.0", mrp: 32000 },
    { ref: "DAP12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "350*400*125", weight: "5.0", mrp: 33750 },
    { ref: "DAP15", hp: "15", kw: "11", relayRange: "20-45", size: "350*400*125", weight: "5.0", mrp: 33750 },
  ],
  variantTags: ["DOL", "Auto Phase Correction"],
  hpRange: ["5", "7.5", "10", "12.5", "15"],
};

const reverseForwardSeries: Series = {
  slug: "reverse-forward-dol",
  name: "Reverse Forward DOL",
  tagline: "Run motor in both forward and reverse directions",
  image: "/images/products/apc-dol.png",
  description:
    "Allows the motor to run in both forward and reverse directions as per application need.",
  features: [
    "Microcontroller based system",
    "Wide voltage range: 200-480 VAC",
    "Auto / Manual / Bypass mode",
    "Reverse and Forward push button control",
    "Adjustable start delay",
    "Digital voltmeter, ammeter and run-hour display",
    "LED status and fault indications",
    "Over / under voltage protection",
    "Overload protection",
    "Rust-free GI sheet enclosure",
    "Compact wall-mounted design",
    "Inbuilt MCB / MCCB protection",
  ],
  variants: [
    { ref: "DRE7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*400*125", weight: "5.0", mrp: "On Request" },
    { ref: "DRE10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*400*125", weight: "5.0", mrp: "On Request" },
    { ref: "DRE12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "350*400*125", weight: "5.0", mrp: "On Request" },
    { ref: "DRE15", hp: "15", kw: "11", relayRange: "20-45", size: "350*400*125", weight: "5.0", mrp: "On Request" },
  ],
  variantTags: ["DOL", "Reverse Forward"],
  hpRange: ["7.5", "10", "12.5", "15"],
};

const SHARED_4G_FEATURES = [
  "Controlling & Monitoring via SMS, Call, WhatsApp, Web-App",
  "Auto / Manual / Bypass Mode",
  "GSM Auto Mode and GSM Manual Mode",
  "Power resumption alert via SMS",
  "Real-time fault alerts on mobile",
  "Run-Hour Meter",
  "All Fault Indicators",
  "4G connectivity built-in",
  "Programmable protections",
  "Smart digital display interface",
];

const SHARED_4G_PROTECTIONS = [
  "Single Phase Protection",
  "Phase Reversal Protection",
  "Over Voltage Protection",
  "Under Voltage Protection",
  "Overload Protection",
  "Under Load Protection",
  "Short Circuit Protection",
  "Dry Run Protection (Optional)",
];

const kisan4gDolSeries: Series = {
  slug: "kisan-4g-dol",
  name: "Kisan 4G Series — DOL",
  tagline: "Mobile-controlled DOL starter for farmers",
  image: "/images/products/kisan-4g-dol.png",
  description:
    "Designed by Subtech, a smart and farmer-friendly motor starter for easy pump operation through mobile phone. Start, stop, and monitor the motor remotely.",
  features: SHARED_4G_FEATURES,
  protections: SHARED_4G_PROTECTIONS,
  notes: ["Ideal for agriculture use where simple control, safety, and affordability matter"],
  variants: [
    { ref: "D4K1", hp: "1", kw: "0.75", relayRange: "2-10", size: "280*205*110", weight: "3.0", mrp: 20600, stdPack: 4 },
    { ref: "D4K5", hp: "5", kw: "3.7", relayRange: "5-20", size: "280*205*110", weight: "3.0", mrp: 20600, stdPack: 4 },
    { ref: "D4K7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "280*205*110", weight: "3.0", mrp: 20600, stdPack: 4 },
    { ref: "D4K7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "280*205*110", weight: "3.5", mrp: 22300, stdPack: 4 },
    { ref: "D4K10", hp: "10", kw: "7.5", relayRange: "15-35", size: "280*205*110", weight: "3.5", mrp: 22300, stdPack: 4 },
    { ref: "D4K12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "280*205*110", weight: "3.5", mrp: 22300, stdPack: 4 },
    { ref: "D4K15", hp: "15", kw: "11", relayRange: "20-45", size: "280*205*110", weight: "3.5", mrp: 23900, stdPack: 2 },
    { ref: "D4K20", hp: "20", kw: "15", relayRange: "25-50", size: "310*250*120", weight: "5.0", mrp: 28900, stdPack: 2 },
  ],
  variantTags: ["DOL", "4G/GSM"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20"],
};

const powermax4gDolSeries: Series = {
  slug: "powermax-4g-dol",
  name: "Powermax 4G Series — DOL",
  tagline: "Mobile-controlled DOL with built-in protection",
  image: "/images/products/powermax-4g-dol.png",
  description:
    "The Subtech PowerMax DOL Motor Control Panel is designed for reliable and efficient motor starting with built-in protection and mobile-based control. Ideal for users who need better protection, reliability, and smooth motor control.",
  features: SHARED_4G_FEATURES,
  protections: SHARED_4G_PROTECTIONS,
  variants: [
    { ref: "D4X1", hp: "1", kw: "0.75", relayRange: "2-10", size: "300*225*110", weight: "4.0", mrp: 23200, stdPack: 4 },
    { ref: "D4X5", hp: "5", kw: "3.7", relayRange: "5-20", size: "300*225*110", weight: "4.0", mrp: 23200, stdPack: 4 },
    { ref: "D4X7L", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.0", mrp: 23200, stdPack: 4 },
    { ref: "D4X7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "300*225*110", weight: "4.3", mrp: 24500, stdPack: 4 },
    { ref: "D4X10", hp: "10", kw: "7.5", relayRange: "15-35", size: "300*225*110", weight: "4.3", mrp: 24500, stdPack: 4 },
    { ref: "D4X12", hp: "12.5", kw: "9.3", relayRange: "20-40", size: "300*225*110", weight: "4.3", mrp: 24900, stdPack: 4 },
    { ref: "D4X15", hp: "15", kw: "11", relayRange: "20-45", size: "300*225*110", weight: "4.3", mrp: 27300, stdPack: 2 },
    { ref: "D4X20", hp: "20", kw: "15", relayRange: "25-50", size: "350*250*120", weight: "5.5", mrp: 31500, stdPack: 2 },
  ],
  variantTags: ["DOL", "4G/GSM"],
  hpRange: ["1", "5", "7.5", "10", "12.5", "15", "20"],
};

const kisan4gSdSeries: Series = {
  slug: "kisan-4g-star-delta",
  name: "Kisan 4G Series — Star Delta",
  tagline: "Mobile-controlled Star Delta starter for farmers",
  image: "/images/products/kisan-4g-star-delta.png",
  description:
    "Highly beneficial for farmers and available at an affordable price. Completely safeguards the motor against damage caused by electrical fluctuations and shows voltage and amperes coming in the electrical line.",
  features: SHARED_4G_FEATURES,
  protections: SHARED_4G_PROTECTIONS,
  notes: ["Size and Weight are approximate"],
  variants: [
    { ref: "S4K7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*300*125", weight: "5.5", mrp: 32400, stdPack: 4 },
    { ref: "S4K10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*300*125", weight: "5.5", mrp: 32400, stdPack: 4 },
    { ref: "S4K15", hp: "15", kw: "11", relayRange: "20-45", size: "350*300*125", weight: "5.5", mrp: 33800, stdPack: 4 },
    { ref: "S4K20", hp: "20", kw: "15", relayRange: "25-50", size: "350*300*125", weight: "6.0", mrp: 33800, stdPack: 4 },
    { ref: "S4K25", hp: "25", kw: "18.5", relayRange: "30-55", size: "350*300*125", weight: "6.0", mrp: 41900, stdPack: 4 },
    { ref: "S4K30L", hp: "30", kw: "22", relayRange: "40-75", size: "350*300*125", weight: "6.0", mrp: 43600, stdPack: 4 },
    { ref: "S4K30", hp: "30", kw: "22", relayRange: "40-75", size: "350*300*125", weight: "6.0", mrp: 57750, stdPack: 3 },
    { ref: "S4K40", hp: "40", kw: "30", relayRange: "60-90", size: "450*450*130", weight: "9.0", mrp: 59000, stdPack: 3 },
    { ref: "S4K50", hp: "50", kw: "37", relayRange: "70-120", size: "450*450*150", weight: "11.0", mrp: 75500, stdPack: 3 },
    { ref: "S4K60", hp: "60", kw: "45", relayRange: "80-140", size: "450*450*150", weight: "11.0", mrp: 75500, stdPack: 3 },
    { ref: "S4K75", hp: "75", kw: "56", relayRange: "90-150", size: "500*450*150", weight: "15.0", mrp: 93600, stdPack: 2 },
    { ref: "S4K85", hp: "85", kw: "60", relayRange: "120-185", size: "500*450*150", weight: "15.0", mrp: 97800 },
    { ref: "S4K100", hp: "100", kw: "75", relayRange: "70-120 H", mrp: "On Request" },
    { ref: "S4K125", hp: "125", kw: "92", relayRange: "80-140 H", mrp: "On Request" },
  ],
  variantTags: ["Star Delta", "4G/GSM"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60", "75", "85", "100", "125"],
};

const powermax4gSdSeries: Series = {
  slug: "powermax-4g-star-delta",
  name: "Powermax 4G Series — Star Delta",
  tagline: "Mobile-controlled Star Delta with MCB/MCCB",
  image: "/images/products/powermax-4g-star-delta.png",
  description:
    "Smart motor control panel designed for smooth starting and remote operation of three-phase submersible and motor pumps. Combines 4G/mobile-based access with dependable protection, digital monitoring, and a durable panel design.",
  features: SHARED_4G_FEATURES,
  protections: SHARED_4G_PROTECTIONS,
  notes: ["Size and Weight are approximate"],
  addOns: [
    "Dry Run Charges: ₹890 charged extra",
    "Remote Trip: ₹1150",
    "Sensor set (2 pcs) for water level controlling: ₹2500",
  ],
  variants: [
    { ref: "S4X7", hp: "7.5", kw: "5.5", relayRange: "10-25", size: "350*400*125", weight: "7.5", mrp: 36000, stdPack: 3, protection: "MCB" },
    { ref: "S4X10", hp: "10", kw: "7.5", relayRange: "15-35", size: "350*400*125", weight: "7.5", mrp: 36000, stdPack: 3, protection: "MCB" },
    { ref: "S4X15", hp: "15", kw: "11", relayRange: "20-45", size: "350*400*125", weight: "7.5", mrp: 37900, stdPack: 3, protection: "MCB" },
    { ref: "S4X20", hp: "20", kw: "15", relayRange: "25-50", size: "350*400*125", weight: "8.0", mrp: 39600, stdPack: 3, protection: "MCB" },
    { ref: "S4X25", hp: "25", kw: "18.5", relayRange: "30-55", size: "350*455*125", weight: "9.2", mrp: 49600, stdPack: 3, protection: "MCCB" },
    { ref: "S4X30L", hp: "30", kw: "22", relayRange: "40-75", size: "350*455*125", weight: "9.3", mrp: 49900, stdPack: 3, protection: "MCCB" },
    { ref: "S4X30", hp: "30", kw: "22", relayRange: "40-75", size: "350*455*125", weight: "9.3", mrp: 65500, stdPack: 2, protection: "MCCB" },
    { ref: "S4X40", hp: "40", kw: "30", relayRange: "60-90", size: "430*510*150", weight: "13.2", mrp: 68400, stdPack: 2, protection: "MCCB" },
    { ref: "S4X50", hp: "50", kw: "37", relayRange: "70-120", size: "600*450*190", weight: "22.0", mrp: 91300, stdPack: 2, protection: "MCCB" },
    { ref: "S4X60", hp: "60", kw: "45", relayRange: "80-140", size: "600*450*190", weight: "22.5", mrp: 91300, stdPack: 2, protection: "MCCB" },
    { ref: "S4X75", hp: "75", kw: "56", relayRange: "90-150", size: "650*500*200", weight: "33.0", mrp: 110800, stdPack: 2, protection: "MCCB" },
    { ref: "S4X85", hp: "85", kw: "60", relayRange: "120-185", size: "650*500*200", weight: "38.0", mrp: 119500, protection: "MCCB" },
    { ref: "S4X100", hp: "100", kw: "75", relayRange: "70-120 (H)", mrp: "On Request", protection: "MCCB" },
    { ref: "S4X125", hp: "125", kw: "90", relayRange: "80-140 (H)", mrp: "On Request", protection: "MCCB" },
  ],
  variantTags: ["Star Delta", "4G/GSM"],
  hpRange: ["7.5", "10", "15", "20", "25", "30", "40", "50", "60", "75", "85", "100", "125"],
};

// ── Catalog assembly ──────────────────────────────────────────────────────────

export const CATALOG: Category[] = [
  {
    slug: "motor-control-solutions",
    name: "Motor Control Solutions",
    description:
      "Single, two and three phase smart motor starter panels with PMC contactor, digital protection and field-tested reliability.",
    subCategories: [
      {
        slug: "single-phase-motor-starter",
        name: "Single Phase Motor Starter",
        description:
          "Manual, semi-automatic and fully automatic starters for single-phase submersible and monoblock pumps.",
        types: [
          {
            slug: "manual",
            name: "Manual",
            description:
              "Basic manual starters with overload and short-circuit protection — strong, simple, dependable.",
            series: [baseSeries],
          },
          {
            slug: "auto-cut",
            name: "Auto Cut",
            description:
              "Push-button starters that automatically cut the motor after power resumption to protect against voltage spikes.",
            series: [eBaseSeries, eBaseProSeries],
          },
          {
            slug: "semi-automatic",
            name: "Semi Automatic",
            description:
              "Manual start with sensor- or timer-based automatic stop. Affordable basic automation with manual control.",
            series: [eazyStopSeries, setStopSeries],
          },
          {
            slug: "fully-automatic",
            name: "Fully Automatic",
            description:
              "Sensor-driven full automation with water overflow protection, dry-run optional and digital monitoring.",
            series: [superRoyalSeries, royalSeries, miniRoyalSeries],
          },
        ],
      },
      {
        slug: "two-phase-motor-starter",
        name: "Two Phase Motor Starter",
        description:
          "Two-phase starter panels for areas where two-phase supply is the norm — built around the Royal+ digital starter.",
        types: [
          {
            slug: "fully-automatic",
            name: "Fully Automatic",
            description:
              "Phase-to-phase 440 V starter for two-phase submersible pumps with PMC contactor and full protection.",
            series: [royalPlusSeries],
          },
        ],
      },
      {
        slug: "three-phase-motor-starter",
        name: "Three Phase Motor Starter",
        description:
          "Three-phase smart motor control panels — DOL and Star Delta — with our patented MPU controller and PMC contactor.",
        types: [
          {
            slug: "standard",
            name: "Standard",
            description:
              "Standard three-phase smart control panels — reliable, simple, and built for everyday industrial and agricultural use.",
            series: [standardThreePhaseSeries],
          },
          {
            slug: "fully-automatic",
            name: "Fully Automatic",
            description:
              "Fully automatic DOL and Star Delta panels — Kisan, PowerMax, Gold and Prime series.",
            series: [
              kisanDolSeries,
              powerMaxDolSeries,
              goldDolSeries,
              primeDolSeries,
              kisanSdSeries,
              powerMaxSdSeries,
              goldSdSeries,
              primeSdSeries,
            ],
          },
          {
            slug: "advanced-dol",
            name: "Advanced DOL",
            description:
              "Specialised three-phase DOL panels: Auto Phase Correction and Reverse Forward operation.",
            series: [apcDolSeries, reverseForwardSeries],
          },
          {
            slug: "4g-gsm",
            name: "4G / GSM",
            description:
              "All-in-one 4G/GSM remote control and protection panels — operate by SMS, Call, WhatsApp or Web-App.",
            series: [
              kisan4gDolSeries,
              powermax4gDolSeries,
              kisan4gSdSeries,
              powermax4gSdSeries,
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "power-and-energy-managment",
    name: "Power And Energy Managment",
    description:
      "Power, energy management and metering panels — coming soon to the online catalog. Contact our sales team for current offerings.",
    subCategories: [],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCategory(slug: string): Category | undefined {
  return CATALOG.find((c) => c.slug === slug);
}

export function getSubCategory(
  categorySlug: string,
  subCategorySlug: string,
): { category: Category; sub: SubCategory } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const sub = category.subCategories.find((s) => s.slug === subCategorySlug);
  if (!sub) return undefined;
  return { category, sub };
}

export function getType(
  categorySlug: string,
  subCategorySlug: string,
  typeSlug: string,
):
  | { category: Category; sub: SubCategory; type: ProductType }
  | undefined {
  const found = getSubCategory(categorySlug, subCategorySlug);
  if (!found) return undefined;
  const type = found.sub.types.find((t) => t.slug === typeSlug);
  if (!type) return undefined;
  return { ...found, type };
}

export function getSeries(
  categorySlug: string,
  subCategorySlug: string,
  typeSlug: string,
  seriesSlug: string,
):
  | { category: Category; sub: SubCategory; type: ProductType; series: Series }
  | undefined {
  const found = getType(categorySlug, subCategorySlug, typeSlug);
  if (!found) return undefined;
  const series = found.type.series.find((s) => s.slug === seriesSlug);
  if (!series) return undefined;
  return { ...found, series };
}

export function allCategorySlugs(): { category: string }[] {
  return CATALOG.map((c) => ({ category: c.slug }));
}

export function allSubCategorySlugs(): { category: string; subcategory: string }[] {
  return CATALOG.flatMap((c) =>
    c.subCategories.map((s) => ({ category: c.slug, subcategory: s.slug })),
  );
}

export function allTypeSlugs(): {
  category: string;
  subcategory: string;
  type: string;
}[] {
  return CATALOG.flatMap((c) =>
    c.subCategories.flatMap((s) =>
      s.types.map((t) => ({
        category: c.slug,
        subcategory: s.slug,
        type: t.slug,
      })),
    ),
  );
}

export function allSeriesSlugs(): {
  category: string;
  subcategory: string;
  type: string;
  series: string;
}[] {
  return CATALOG.flatMap((c) =>
    c.subCategories.flatMap((s) =>
      s.types.flatMap((t) =>
        t.series.map((sr) => ({
          category: c.slug,
          subcategory: s.slug,
          type: t.slug,
          series: sr.slug,
        })),
      ),
    ),
  );
}

export function formatINR(v: number | "On Request"): string {
  if (v === "On Request") return "On Request";
  return `₹${v.toLocaleString("en-IN")}`;
}

export function summariseHpRange(series: Series): string {
  const range = series.hpRange;
  if (range.length === 0) return "";
  if (range.length === 1) return `${range[0]} HP`;
  return `${range[0]} - ${range[range.length - 1]} HP`;
}
