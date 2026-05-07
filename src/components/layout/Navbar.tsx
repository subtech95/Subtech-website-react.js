"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Subtech Navbar — ported from PHP `config/header.php`.
 *
 * - Sticky top, white background (matches subtech.in)
 * - Brand: logo + "Since 1998" caption
 * - Center: Home / Products (mega menu) / Solutions / About / Company (dropdown) /
 *   Contact / Smart-Panel
 * - Right: Customer Care pill button (with icon)
 * - Mobile: dark right-side off-canvas with collapsible sections
 */

const RED = "#E40006";
const RED_HOVER = "#C00005";

/* ───────── DATA ─────────
 * Mirrors the live PHP site at subtech.in:
 *   /products/{category}/{subcategory}/{type}
 * Sub-categories are the "Sub-category" column; their .items are the Type
 * column in the four-column mega menu.
 */
type ProductLink = { name: string; href: string };
type ProductGroup = {
  name: string;
  slug: string;
  subgroups: { name: string; slug: string; items: ProductLink[] }[];
};

const PRODUCT_DATA: ProductGroup[] = [
  {
    name: "Motor Control Solutions",
    slug: "motor-control-solutions",
    subgroups: [
      {
        name: "Single Phase Motor Starter",
        slug: "single-phase-motor-starter",
        items: [
          { name: "Manual", href: "/products/motor-control-solutions/single-phase-motor-starter/manual" },
          { name: "Auto Cut", href: "/products/motor-control-solutions/single-phase-motor-starter/auto-cut" },
          { name: "Semi Automatic", href: "/products/motor-control-solutions/single-phase-motor-starter/semi-automatic" },
          { name: "Fully Automatic", href: "/products/motor-control-solutions/single-phase-motor-starter/fully-automatic" },
        ],
      },
      {
        name: "Two Phase Motor Starter",
        slug: "two-phase-motor-starter",
        items: [
          { name: "Fully Automatic", href: "/products/motor-control-solutions/two-phase-motor-starter/fully-automatic" },
        ],
      },
      {
        name: "Three Phase Motor Starter",
        slug: "three-phase-motor-starter",
        items: [
          { name: "Fully Automatic", href: "/products/motor-control-solutions/three-phase-motor-starter/fully-automatic" },
          { name: "Advanced DOL", href: "/products/motor-control-solutions/three-phase-motor-starter/advanced-dol" },
          { name: "4G / GSM", href: "/products/motor-control-solutions/three-phase-motor-starter/4g-gsm" },
        ],
      },
    ],
  },
  {
    name: "Power And Energy Managment",
    slug: "power-and-energy-managment",
    subgroups: [
      {
        name: "Coming Soon",
        slug: "coming-soon",
        items: [
          { name: "Talk to Sales", href: "/products/power-and-energy-managment" },
        ],
      },
    ],
  },
];

const COMPANY_LINKS = [
  {
    name: "Blogs",
    href: "/blog",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    name: "Careers",
    href: "/jobs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    name: "Resources",
    href: "/resources",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    name: "Awards & Certifications",
    href: "/awards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Pathshala",
    href: "/pathshala",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Contact Us", href: "/contact" },
  { name: "Smart-Panel", href: "/smart-motor-control-panel" },
];

/* ───────── ICONS ───────── */
const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="10" height="6">
    <polyline points="1 1 5 5 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ───────── DESKTOP: PRODUCTS MEGA MENU ───────── */
function ProductsMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const cat = PRODUCT_DATA[activeCat];
  const sub = cat?.subgroups[activeSub];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full bg-white border-t-[3px] shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
          style={{ borderTopColor: RED }}
          onMouseLeave={onClose}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12">
            {/* Col 1: Category */}
            <div className="col-span-3 bg-[#f7f7f7] py-6 px-5 border-r border-[#eee]">
              <h6 className="text-[15px] font-bold text-[#343a40] mb-4 inline-block pb-1 border-b-2" style={{ borderColor: RED }}>
                Select Product
              </h6>
              <ul className="space-y-1">
                {PRODUCT_DATA.map((p, i) => (
                  <li
                    key={p.slug}
                    onMouseEnter={() => {
                      setActiveCat(i);
                      setActiveSub(0);
                    }}
                    className={`px-3 py-2 rounded-md text-[14px] cursor-pointer transition-all ${
                      i === activeCat
                        ? "bg-[#f8d7da] font-semibold"
                        : "text-[#495057] hover:bg-[#e9ecef] hover:text-[#212529]"
                    }`}
                    style={i === activeCat ? { color: RED } : undefined}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Subcategory */}
            <div className="col-span-3 bg-[#fcfcfc] py-6 px-5 border-r border-[#eee]">
              <h6 className="text-[15px] font-bold text-[#343a40] mb-4 inline-block pb-1 border-b-2" style={{ borderColor: RED }}>
                Select Sub-category
              </h6>
              <ul className="space-y-1">
                {cat?.subgroups.map((s, i) => (
                  <li
                    key={s.name}
                    onMouseEnter={() => setActiveSub(i)}
                    className={`px-3 py-2 rounded-md text-[14px] cursor-pointer transition-all ${
                      i === activeSub
                        ? "bg-[#f8d7da] font-semibold"
                        : "text-[#495057] hover:bg-[#e9ecef] hover:text-[#212529]"
                    }`}
                    style={i === activeSub ? { color: RED } : undefined}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Type */}
            <div className="col-span-3 bg-[#fcfcfc] py-6 px-5 border-r border-[#eee]">
              <h6 className="text-[15px] font-bold text-[#343a40] mb-4 inline-block pb-1 border-b-2" style={{ borderColor: RED }}>
                Select Type
              </h6>
              <ul className="space-y-1">
                {sub?.items.map((t) => (
                  <li key={t.name}>
                    <Link
                      href={t.href}
                      onClick={onClose}
                      className="block px-3 py-2 rounded-md text-[14px] text-[#495057] hover:bg-[#e9ecef] hover:text-[#212529] transition-all"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: CTA */}
            <div className="col-span-3 bg-[#e9ecef] py-6 px-5">
              <h6 className="text-[15px] font-bold text-[#343a40] mb-4">
                Design Your Solution With Us
              </h6>
              <div className="bg-white rounded-lg p-6 shadow-[0_2px_4px_rgba(0,0,0,0.05)] text-center">
                <p className="text-[13.5px] text-[#6c757d] leading-[1.55] mb-5">
                  Need something specific? Let our experts guide you.
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block w-full py-3 px-4 rounded-md font-semibold text-white text-[14px] transition hover:brightness-95"
                  style={{ background: RED }}
                >
                  Request a Custom Solution
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────── DESKTOP: COMPANY DROPDOWN ───────── */
function CompanyDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[240px] bg-white rounded-xl border border-black/[0.07] p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
          onMouseLeave={onClose}
        >
          <span
            aria-hidden
            className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-white rotate-45 border-t border-l border-black/[0.07] rounded-tl-[2px]"
          />
          {COMPANY_LINKS.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-[#1a1a2e] hover:bg-[#f5f5f8] hover:text-[#d0021b] transition"
              >
                <span className="w-[30px] h-[30px] rounded-[7px] bg-[#f0f0f4] text-[#555] group-hover:bg-[#d0021b] group-hover:text-white flex items-center justify-center shrink-0 transition">
                  <span className="w-[14px] h-[14px]">{item.icon}</span>
                </span>
                <span className="flex-1">{item.name}</span>
                <span className="text-[#d0021b] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <ChevronRight />
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

/* ───────── MOBILE OFFCANVAS ───────── */
function MobileOffcanvas({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [openProductIdx, setOpenProductIdx] = useState<number | null>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed top-0 right-0 bottom-0 z-[90] w-[300px] max-w-[85%] flex flex-col"
            style={{
              background:
                "radial-gradient(800px 520px at 100% 10%, rgba(228,0,6,0.18), transparent 55%), radial-gradient(700px 520px at 50% 120%, rgba(228,0,6,0.12), transparent 55%), #0D0F14",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#0D0F14] border-b border-white/[0.07]">
              <h5 className="font-bold text-[15px] tracking-[2px] uppercase text-white">Menu</h5>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center text-white/65 hover:text-white hover:rotate-90 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <ul className="py-2">
                <MobileLink href="/" label="Home" onClose={onClose} active={pathname === "/"} />

                {/* Products with collapse */}
                <li>
                  <button
                    onClick={() => setProductsOpen((v) => !v)}
                    className={`w-full flex justify-between items-center text-[14px] py-3.5 px-5 border-b border-white/[0.05] text-left transition ${
                      productsOpen
                        ? "bg-[rgba(228,0,6,0.08)] text-white"
                        : "text-[#C8CDD8] hover:bg-white/[0.04] hover:text-white"
                    }`}
                    style={
                      productsOpen
                        ? { boxShadow: `inset 3px 0 0 ${RED}` }
                        : undefined
                    }
                  >
                    Products
                    <span
                      className={`text-[12px] transition-transform duration-300 ${
                        productsOpen ? "rotate-90" : ""
                      }`}
                      style={{ color: productsOpen ? RED : "#6B7280" }}
                    >
                      ▶
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {productsOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-[#0D0F14]"
                      >
                        <ul className="py-1">
                          {PRODUCT_DATA.map((p, idx) => {
                            const isOpen = openProductIdx === idx;
                            return (
                              <li key={p.slug}>
                                <button
                                  onClick={() =>
                                    setOpenProductIdx(isOpen ? null : idx)
                                  }
                                  className="w-full flex justify-between items-center px-5 py-2.5 text-[13px] font-semibold text-[#C8CDD8] hover:bg-white/[0.04] hover:text-white transition"
                                >
                                  {p.name}
                                  <span className="text-[10px]">{isOpen ? "−" : "+"}</span>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.ul
                                      initial={{ height: 0 }}
                                      animate={{ height: "auto" }}
                                      exit={{ height: 0 }}
                                      transition={{ duration: 0.22 }}
                                      className="overflow-hidden bg-[#111318]"
                                    >
                                      {p.subgroups.flatMap((sg) =>
                                        sg.items.map((it) => (
                                          <li key={it.name + it.href}>
                                            <Link
                                              href={it.href}
                                              onClick={onClose}
                                              className="block py-2 pl-9 pr-5 text-[12.5px] text-[#9CA3AF] hover:text-white hover:bg-white/[0.03] transition"
                                            >
                                              {it.name}
                                            </Link>
                                          </li>
                                        ))
                                      )}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                <MobileLink href="/solutions" label="Solutions" onClose={onClose} active={pathname.startsWith("/solutions")} />
                <MobileLink href="/about" label="About Us" onClose={onClose} active={pathname.startsWith("/about")} />

                {/* Company collapse */}
                <li>
                  <button
                    onClick={() => setCompanyOpen((v) => !v)}
                    className={`w-full flex justify-between items-center text-[14px] py-3.5 px-5 border-b border-white/[0.05] text-left transition ${
                      companyOpen
                        ? "bg-[rgba(228,0,6,0.08)] text-white"
                        : "text-[#C8CDD8] hover:bg-white/[0.04] hover:text-white"
                    }`}
                    style={
                      companyOpen
                        ? { boxShadow: `inset 3px 0 0 ${RED}` }
                        : undefined
                    }
                  >
                    Company
                    <span
                      className={`text-[12px] transition-transform duration-300 ${
                        companyOpen ? "rotate-90" : ""
                      }`}
                      style={{ color: companyOpen ? RED : "#6B7280" }}
                    >
                      ▶
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {companyOpen && (
                      <motion.ul
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-[#0D0F14] border-b border-white/[0.05]"
                      >
                        {COMPANY_LINKS.map((c) => (
                          <li key={c.name}>
                            <Link
                              href={c.href}
                              onClick={onClose}
                              className="block py-2.5 pl-9 pr-5 text-[13px] text-[#9CA3AF] hover:text-white hover:bg-white/[0.03] transition"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <MobileLink href="/contact" label="Contact Us" onClose={onClose} active={pathname.startsWith("/contact")} />
                <MobileLink
                  href="/smart-motor-control-panel"
                  label="Smart-Panel"
                  onClose={onClose}
                  active={pathname.startsWith("/smart-motor-control-panel")}
                />
              </ul>

              <div className="px-4 py-4 border-t border-white/[0.07] bg-[#111318]">
                <Link
                  href="/customer-care"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border text-[13px] font-semibold transition"
                  style={{
                    background: "rgba(228,0,6,0.10)",
                    borderColor: "rgba(228,0,6,0.25)",
                    color: RED,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Customer Care
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileLink({
  href,
  label,
  onClose,
  active,
}: {
  href: string;
  label: string;
  onClose: () => void;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={`block text-[14px] py-3.5 px-5 border-b border-white/[0.05] transition relative ${
          active
            ? "text-white bg-[rgba(228,0,6,0.08)]"
            : "text-[#C8CDD8] hover:bg-white/[0.04] hover:text-white"
        }`}
        style={active ? { boxShadow: `inset 3px 0 0 ${RED}` } : undefined}
      >
        {label}
      </Link>
    </li>
  );
}

/* ───────── MAIN NAVBAR ───────── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const productsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setCompanyOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Hover with small delay so the menu doesn't snap shut accidentally
  const hover = (
    setter: (b: boolean) => void,
    ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
    open: boolean
  ) => {
    if (ref.current) clearTimeout(ref.current);
    if (open) setter(true);
    else ref.current = setTimeout(() => setter(false), 120);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] bg-white border-b transition-all duration-300 ${
          scrolled
            ? "border-black/[0.06] shadow-[0_4px_18px_rgba(0,0,0,0.06)] py-2"
            : "border-transparent py-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex flex-col items-center leading-none shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Subtech Logo"
              className="block max-w-[130px] lg:max-w-[150px] h-auto"
            />
            <span className="text-[8.5px] tracking-[3px] uppercase text-black font-semibold mt-[3px]">
              Since 1998
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto relative">
            {/* Home */}
            <DesktopLink href="/" label="Home" active={isActive("/") && pathname === "/"} />

            {/* Products with mega menu */}
            <div
              className="relative"
              onMouseEnter={() => hover(setProductsOpen, productsTimeout, true)}
              onMouseLeave={() => hover(setProductsOpen, productsTimeout, false)}
            >
              <button
                aria-expanded={productsOpen}
                className={`flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium transition ${
                  productsOpen || isActive("/products")
                    ? "text-black"
                    : "text-[#212529] hover:text-[#000]"
                }`}
              >
                Products
                <ChevronDown
                  className={`opacity-80 transition-transform duration-300 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <DesktopLink href="/solutions" label="Solutions" active={isActive("/solutions")} />
            <DesktopLink href="/about" label="About Us" active={isActive("/about")} />

            {/* Company dropdown */}
            <div
              className="relative"
              onMouseEnter={() => hover(setCompanyOpen, companyTimeout, true)}
              onMouseLeave={() => hover(setCompanyOpen, companyTimeout, false)}
            >
              <button
                aria-expanded={companyOpen}
                className="flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-[#212529] hover:text-black transition"
              >
                Company
                <ChevronDown
                  className={`opacity-80 transition-transform duration-300 ${
                    companyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <CompanyDropdown
                open={companyOpen}
                onClose={() => setCompanyOpen(false)}
              />
            </div>

            <DesktopLink href="/contact" label="Contact Us" active={isActive("/contact")} />
            <DesktopLink
              href="/smart-motor-control-panel"
              label="Smart-Panel"
              active={isActive("/smart-motor-control-panel")}
            />
          </nav>

          {/* Customer Care (desktop) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/customer-care"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12.5px] font-semibold text-white transition hover:brightness-95 shadow-[0_6px_16px_-6px_rgba(228,0,6,0.55)]"
              style={{ background: RED }}
              onMouseEnter={(e) => (e.currentTarget.style.background = RED_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.background = RED)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Customer Care
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -mr-1 text-[#0D0D0D]"
            aria-label="Open menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mega menu (full-width) */}
        <div
          onMouseEnter={() => hover(setProductsOpen, productsTimeout, true)}
          onMouseLeave={() => hover(setProductsOpen, productsTimeout, false)}
        >
          <ProductsMegaMenu
            open={productsOpen}
            onClose={() => setProductsOpen(false)}
          />
        </div>
      </header>

      <MobileOffcanvas open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-[14px] font-medium transition relative ${
        active ? "text-black" : "text-[#212529] hover:text-black"
      }`}
    >
      {label}
      {active && (
        <span
          className="absolute left-3 right-3 bottom-1 h-[2px] rounded-full"
          style={{ background: RED }}
        />
      )}
    </Link>
  );
}
