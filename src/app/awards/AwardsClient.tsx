"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const RED = "#E40006";
const RED_DARK = "#AF0909";

/* ───────── TYPES ───────── */
type IconKey =
  | "medal"
  | "shield"
  | "leaf"
  | "bolt"
  | "globe"
  | "target"
  | "building"
  | "badge"
  | "trophy";

type CategoryKey = "all" | "quality" | "govt" | "business";

type Cert = {
  title: string;
  meta: string;
  file: string;
  icon: IconKey;
  category: Exclude<CategoryKey, "all">;
  year?: string;
  highlight?: boolean;
};

/* ───────── DATA ───────── */
const CERTIFICATES: Cert[] = [
  // Quality & Compliance
  {
    title: "ISO 9001",
    meta: "Quality Management",
    file: "/certificates/ISO-9001.pdf",
    icon: "medal",
    category: "quality",
    highlight: true,
  },
  {
    title: "ISO 14001",
    meta: "Environmental Management",
    file: "/certificates/14001-UKASCERT.pdf",
    icon: "leaf",
    category: "quality",
    highlight: true,
  },
  {
    title: "ISO 45001",
    meta: "Occupational Health & Safety",
    file: "/certificates/45001-UKASCERT.pdf",
    icon: "shield",
    category: "quality",
  },
  {
    title: "ISO 50001",
    meta: "Energy Management",
    file: "/certificates/50001-UKASCERT.pdf",
    icon: "bolt",
    category: "quality",
  },
  {
    title: "CE Certificate",
    meta: "European Conformity",
    file: "/certificates/CE-Certificate.pdf",
    icon: "globe",
    category: "quality",
    highlight: true,
  },
  {
    title: "IEC Certificate",
    meta: "International Electrotechnical",
    file: "/certificates/certificate_Of_IEC.pdf",
    icon: "bolt",
    category: "quality",
  },
  {
    title: "Calibration Certificate",
    meta: "Measurement Accuracy",
    file: "/certificates/CALIBRATION.pdf",
    icon: "target",
    category: "quality",
  },

  // Government Approvals
  {
    title: "UP Jal Nigam",
    meta: "Approved Vendor",
    file: "/certificates/APPROVAL-UP-JAL-NIGAM.pdf",
    icon: "building",
    category: "govt",
    highlight: true,
  },
  {
    title: "Delhi Jal Board",
    meta: "DJB Approved",
    file: "/certificates/DJB.pdf",
    icon: "building",
    category: "govt",
  },
  {
    title: "Electrical License",
    meta: "Delhi Govt",
    file: "/certificates/Electrical-License-Delhi.pdf",
    icon: "bolt",
    category: "govt",
  },
  {
    title: "NSIC Registration",
    meta: "2023 - 2025",
    file: "/certificates/NSIC-23-25.pdf",
    icon: "badge",
    category: "govt",
    year: "2023",
  },
  {
    title: "ZED Certification",
    meta: "Zero Defect, Zero Effect",
    file: "/certificates/ZED.pdf",
    icon: "shield",
    category: "govt",
    highlight: true,
  },

  // Business & IP
  {
    title: "Trademark Registration",
    meta: "Subtech Brand",
    file: "/certificates/trademark.pdf",
    icon: "badge",
    category: "business",
  },
  {
    title: "Udyam Certificate",
    meta: "MSME Recognition",
    file: "/certificates/Udyam-Certificate.pdf",
    icon: "medal",
    category: "business",
  },
  {
    title: "Udyam Registration",
    meta: "MSME Registration",
    file: "/certificates/Udyam-Registration-Certificate.pdf",
    icon: "medal",
    category: "business",
  },
  {
    title: "Indian Entrepreneurship",
    meta: "Achievement Award",
    file: "/certificates/Indian-Enterpreunership.pdf",
    icon: "trophy",
    category: "business",
    highlight: true,
  },
];

const CATEGORIES: { key: CategoryKey; label: string; sub: string }[] = [
  { key: "all", label: "All", sub: "Every credential" },
  { key: "quality", label: "Quality & Compliance", sub: "ISO • CE • IEC" },
  { key: "govt", label: "Government Approvals", sub: "PSU & Utility" },
  { key: "business", label: "Business & IP", sub: "Brand & MSME" },
];

/* ───────── ICONS ───────── */
const ICONS: Record<IconKey, React.ReactNode> = {
  medal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c.5 2.26.7 4.15.7 5.88A7 7 0 0 1 13 15.85" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
};

/* ───────── COUNT-UP ───────── */
function useCountUp(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ───────── HERO ───────── */
function AwardsHero() {
  return (
    <section className="relative pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* ambient red glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(228,0,6,0.10), transparent 60%), radial-gradient(40% 40% at 90% 30%, rgba(228,0,6,0.05), transparent 60%)",
        }}
      />
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-[0.6px] uppercase mb-5"
          style={{
            color: RED,
            background: "rgba(228,0,6,0.08)",
            border: "1px solid rgba(228,0,6,0.18)",
          }}
        >
          <span className="relative flex w-2 h-2">
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: RED, opacity: 0.6 }}
            />
            <span className="relative w-2 h-2 rounded-full" style={{ background: RED }} />
          </span>
          Recognized Excellence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-[clamp(34px,5.4vw,60px)] font-bold tracking-[-0.02em] leading-[1.05] text-[#0D0D0D]"
        >
          Awards &amp;{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${RED} 0%, #ff6b6c 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Certifications
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-[15.5px] md:text-[17px] text-[#4b5563] leading-[1.75] max-w-3xl mx-auto mt-5"
        >
          Subtech stands on 25+ years of engineering integrity. Every certification here is a
          promise - of quality, of safety, of trust earned from India&apos;s leading industrial
          and government bodies.
        </motion.p>
      </div>
    </section>
  );
}

/* ───────── STATS ───────── */
function StatItem({
  num,
  suffix = "",
  label,
  start,
  delay,
}: {
  num: number;
  suffix?: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const v = useCountUp(num, 1400, start);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white border border-[#ececec] rounded-2xl p-6 text-center overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_18px_45px_-10px_rgba(228,0,6,0.18)] hover:border-transparent"
    >
      <span
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${RED}, #ff6b6c)` }}
      />
      <div
        className="text-[36px] md:text-[40px] font-bold leading-none mb-1.5 tabular-nums"
        style={{ color: RED }}
      >
        {v}
        {suffix}
      </div>
      <div className="text-[13px] text-[#666] font-medium tracking-[0.3px]">{label}</div>
    </motion.div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStart(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-4 sm:px-6 -mt-2">
      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <StatItem num={25} suffix="+" label="Years of Excellence" start={start} delay={0} />
        <StatItem num={16} suffix="+" label="Active Certifications" start={start} delay={0.08} />
        <StatItem num={4} label="ISO Standards" start={start} delay={0.16} />
        <StatItem num={50} suffix="+" label="Govt / PSU Clients" start={start} delay={0.24} />
      </div>
    </section>
  );
}

/* ───────── FILTER TABS ───────── */
function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: CategoryKey;
  onChange: (k: CategoryKey) => void;
  counts: Record<CategoryKey, number>;
}) {
  return (
    <div className="max-w-6xl mx-auto mt-12 mb-8 px-4 sm:px-6">
      <div className="bg-white border border-[#ececec] rounded-2xl p-1.5 flex flex-wrap gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {CATEGORIES.map((c) => {
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              onClick={() => onChange(c.key)}
              className={`relative flex-1 min-w-[140px] rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 ${
                isActive ? "text-white" : "text-[#374151] hover:bg-[#f7f7f9]"
              }`}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${RED}, ${RED_DARK})`,
                      boxShadow: "0 10px 22px -10px rgba(228,0,6,0.5)",
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13.5px] font-semibold leading-tight">{c.label}</div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-[#f1f3f6] text-[#6b7280]"
                  }`}
                >
                  {counts[c.key]}
                </span>
              </div>
              <div
                className={`text-[11px] mt-0.5 ${isActive ? "text-white/80" : "text-[#9aa1ab]"}`}
              >
                {c.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── CARD ───────── */
function CertCard({
  cert,
  onOpen,
  index,
}: {
  cert: Cert;
  onOpen: (c: Cert) => void;
  index: number;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(cert)}
      className="group relative text-left bg-white border border-[#ececec] rounded-2xl p-6 flex flex-col items-start min-h-[260px] overflow-hidden hover:border-[rgba(228,0,6,0.4)] hover:shadow-[0_30px_60px_-20px_rgba(228,0,6,0.22)] transition-all duration-300"
    >
      {/* shimmer */}
      <span
        className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms]"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(228,0,6,0.07) 50%, transparent 70%)",
        }}
      />

      {cert.highlight && (
        <span
          className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.6px] uppercase px-2 py-0.5 rounded-full"
          style={{
            color: RED,
            background: "rgba(228,0,6,0.08)",
            border: "1px solid rgba(228,0,6,0.18)",
          }}
        >
          ★ Featured
        </span>
      )}

      {/* icon */}
      <div
        className="relative w-[64px] h-[64px] rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, rgba(228,0,6,0.08), rgba(228,0,6,0.02))",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${RED}, #ff6b6c)` }}
        />
        <div
          className="relative w-8 h-8 transition-colors duration-300"
          style={{ color: RED }}
        >
          <div className="w-full h-full text-current group-hover:text-white transition-colors duration-300">
            {ICONS[cert.icon]}
          </div>
        </div>
      </div>

      <h3 className="text-[16px] font-semibold text-[#0D0D0D] leading-snug mb-1">
        {cert.title}
      </h3>
      <div className="text-[11.5px] text-[#9aa1ab] uppercase tracking-[0.8px] font-semibold mb-5">
        {cert.meta}
      </div>

      <span className="relative mt-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold border border-[#E40006] text-[#E40006] bg-transparent transition-[gap,color,background-color] duration-300 group-hover:gap-2.5 group-hover:bg-[#E40006] group-hover:text-white">
        View Certificate
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </motion.button>
  );
}

/* ───────── MODAL ───────── */
function CertModal({
  cert,
  onClose,
}: {
  cert: Cert | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: "rgba(8, 8, 10, 0.78)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-2xl w-full max-w-[960px] h-[90vh] max-h-[860px] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#eee]">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                  style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DARK})` }}
                >
                  <div className="w-5 h-5">{ICONS[cert.icon]}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-[#0D0D0D] truncate">
                    {cert.title}
                  </div>
                  <div className="text-[11.5px] text-[#9aa1ab] uppercase tracking-[0.6px] font-semibold truncate">
                    {cert.meta}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={cert.file}
                  download
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold border border-[#e5e7eb] text-[#374151] hover:bg-[#f7f7f9] transition"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold text-white transition hover:brightness-95"
                  style={{ background: RED }}
                >
                  Open in new tab
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-[#f5f5f5] hover:bg-[color:rgba(228,0,6,1)] hover:text-white text-[#333] flex items-center justify-center text-lg transition-all hover:rotate-90"
                  style={{ transitionDuration: "300ms" }}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 bg-[#0a0a0a]">
              <iframe
                src={cert.file}
                title={cert.title}
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────── GRID SECTION ───────── */
function CertGrid({
  active,
  onOpen,
}: {
  active: CategoryKey;
  onOpen: (c: Cert) => void;
}) {
  const list = useMemo(() => {
    if (active === "all") return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.category === active);
  }, [active]);

  return (
    <section className="px-4 sm:px-6">
      <motion.div
        layout
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => (
            <CertCard key={c.title} cert={c} onOpen={onOpen} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ───────── CTA ───────── */
function ClosingCTA() {
  return (
    <section className="px-4 sm:px-6 mt-20 mb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden text-center px-6 sm:px-12 py-14 sm:py-16"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          color: "#fff",
        }}
      >
        <div
          className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(228,0,6,0.28), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 w-[420px] h-[420px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(228,0,6,0.14), transparent 60%)",
          }}
        />

        <div
          className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.8px] uppercase mb-4"
          style={{
            color: "#ff8e8e",
            background: "rgba(228,0,6,0.18)",
            border: "1px solid rgba(228,0,6,0.35)",
          }}
        >
          ✓ Verified · Trusted · Certified
        </div>
        <h3 className="relative text-[clamp(26px,3.6vw,38px)] font-bold tracking-[-0.01em] mb-3 text-white">
          Build with a manufacturer that puts compliance first.
        </h3>
        <p className="relative text-[15px] md:text-[16px] text-[#bdbdbd] leading-[1.7] max-w-2xl mx-auto mb-8">
          Every Subtech panel is built on a foundation of certified processes and audited
          quality systems. Get a quote backed by 25+ years of engineering integrity.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-[14.5px] transition-all hover:-translate-y-0.5"
            style={{
              background: RED,
              boxShadow: "0 18px 36px -10px rgba(228,0,6,0.55)",
            }}
          >
            Request a Quote
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14.5px] transition border border-white/25 text-white hover:bg-white/10"
          >
            About Subtech
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────── PAGE ───────── */
export default function AwardsClient() {
  const [active, setActive] = useState<CategoryKey>("all");
  const [open, setOpen] = useState<Cert | null>(null);

  const counts: Record<CategoryKey, number> = useMemo(
    () => ({
      all: CERTIFICATES.length,
      quality: CERTIFICATES.filter((c) => c.category === "quality").length,
      govt: CERTIFICATES.filter((c) => c.category === "govt").length,
      business: CERTIFICATES.filter((c) => c.category === "business").length,
    }),
    []
  );

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      <AwardsHero />
      <StatsStrip />
      <FilterTabs active={active} onChange={setActive} counts={counts} />
      <CertGrid active={active} onOpen={setOpen} />
      <ClosingCTA />
      <CertModal cert={open} onClose={() => setOpen(null)} />
    </div>
  );
}
