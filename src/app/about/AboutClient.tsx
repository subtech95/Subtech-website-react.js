"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const RED = "#E40006";

/* ───────── HERO ───────── */
function AboutHero() {
  return (
    <section className="pt-32 pb-0 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[18px] p-7 sm:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: RED }}>
                <span className="w-[18px] h-[2px] rounded-full" style={{ background: RED }} />
                A Legacy of Innovation and Quality
              </div>

              <h1 className="text-[clamp(28px,4vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em] my-3 text-[#0D0D0D]">
                Redefining <span style={{ color: RED, fontStyle: "italic" }}>Industrial</span>
                <br />
                Automation
              </h1>

              <p className="text-[#4b5563] mb-5 max-w-[520px] leading-[1.8] text-[15px]">
                Subtech is a leading Indian manufacturer and solution provider in the field of electrical
                automation, specializing in LT panels, AMF/ATS systems, motor starters, and industrial
                control panels. With a deep-rooted commitment to innovation, safety, and performance, we
                serve a diverse clientele across residential, commercial, agricultural, and industrial
                sectors. With a presence across India and trust of over 200 businesses, Subtech is
                recognized for delivering reliable, efficient, and customized solutions that simplify motor
                control and power management. Our in-house R&amp;D and quality control practices ensure that
                every product is built for durability, safety, and long-term performance. We are
                continuously evolving by integrating IoT, smart monitoring, and digital technologies into
                our solutions making our systems future-ready.
              </p>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="rounded-[10px] px-4 py-2.5 font-semibold text-white text-[14px] hover:brightness-95 transition"
                  style={{ background: RED, border: `1px solid ${RED}` }}
                >
                  Our Story
                </Link>
                <a
                  href="#vision-mission"
                  className="rounded-[10px] px-4 py-2.5 font-semibold text-[14px] bg-white border border-[#e5e7eb] text-[#111827] hover:bg-[#f9fafb] transition"
                >
                  Vision &amp; Mission
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl overflow-hidden relative shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/factory.webp"
                alt="Subtech manufacturing facility, Greater Noida"
                className="w-full h-auto max-h-[420px] object-cover block"
                onError={(e) => {
                  // Fallback to existing on-disk image until factory.jpg is uploaded
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/subtech.webp";
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── MISSION ───────── */
const missionItems = [
  {
    title: "High-Reliability Manufacturing",
    text: "To design and manufacture high-reliability control panels that reduce downtime, prevent motor burning and optimise energy and water usage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    title: "Smart Technology Innovation",
    text: "To continuously innovate using microcontroller-based protection, RF/4G/5G/IoT connectivity and advanced contactor concepts such as PMC.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Pan-India Channel Network",
    text: "To build a strong network of dealers, contractors and service partners across India who share our customer-first values.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    title: "Government & Infrastructure Support",
    text: "To support government projects with robust, field-proven automation solutions that contribute to water and power conservation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

function MissionSection() {
  return (
    <section className="px-4 sm:px-6 mt-20 mb-12">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-[20px] font-semibold mb-4 text-[#0D0D0D]">Our Mission</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {missionItems.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-2.5 mb-2" style={{ color: RED }}>
                {m.icon}
                <h6 className="font-extrabold text-[13px] sm:text-[14px] text-[#111827] m-0">{m.title}</h6>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#4b5563] leading-[1.6] m-0">
                {m.text.split(/(\*\*[^*]+\*\*)/).map((part, idx) =>
                  part.startsWith("**") ? <strong key={idx}>{part.slice(2, -2)}</strong> : part
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── VISION ───────── */
function VisionCard() {
  return (
    <section id="vision-mission" className="px-4 sm:px-6 mb-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px] w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/skyline.png"
            alt="Subtech vision — powering urban infrastructure"
            className="w-full h-full object-cover absolute inset-0"
            onError={(e) => {
              // Fallback to existing on-disk image until skyline.jpg is uploaded
              (e.currentTarget as HTMLImageElement).src =
                "/images/sectors/sector1.webp";
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center bg-gradient-to-t from-black/70 to-black/30">
            <h4 className="text-white font-extrabold text-[22px] mb-3">✦ Subtech&apos;s Vision</h4>
            <p className="text-white/90 text-[14px] leading-[1.7] max-w-3xl">
              To become{" "}
              <strong className="text-white font-bold">
                India&apos;s most trusted brand in motor, power &amp; water automation
              </strong>
              , delivering smart, reliable &amp; energy-efficient solutions that improve everyday life for
              people, businesses, &amp; government organisations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── WHY US ───────── */
const whyItems = [
  {
    title: "High Durability Products",
    text: "Designed for tough industrial conditions using premium materials and rigorous testing for long-lasting performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Trusted by Businesses",
    text: "From OEMs to infrastructure developers and PSUs—our customer-first approach builds long-term trust nationwide.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Robust After-Sales Support",
    text: "Prompt support from installation guidance to troubleshooting and warranty assistance—after purchase too.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" />
      </svg>
    ),
  },
];

function WhyUsAbout() {
  return (
    <section className="px-4 sm:px-6 py-12 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold mb-2 text-[#0D0D0D]">Why Choose Us?</h2>
          <p className="text-[#767676]">
            Reliable engineering, smart automation, and long-term support — built for real-world performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {whyItems.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-[#eceff3] rounded-2xl p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition"
            >
              <div
                className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(228,0,6,0.08)", color: RED }}
              >
                {w.icon}
              </div>
              <h5 className="font-extrabold mb-2" style={{ color: RED }}>
                {w.title}
              </h5>
              <p className="text-[14px] text-[#4b5563] leading-[1.65] m-0">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── JOURNEY TIMELINE ───────── */
type TimelineEntry = {
  year: string;
  title: string;
  body: React.ReactNode;
  side: "left" | "right";
};

const journey2016: TimelineEntry[] = [
  {
    year: "2025",
    side: "left",
    title: "Today – Innovating for a Smarter Tomorrow",
    body: (
      <>
        From our early days of innovation to our expanding global presence, <b>Subtech</b> stands as a
        symbol of trust, technology, and transformation. Our focus remains on creating sustainable,
        efficient, and intelligent automation solutions that empower industries, improve energy
        efficiency, and shape a more reliable future.
      </>
    ),
  },
  {
    year: "2018",
    side: "right",
    title: "2018 — A Year of Growth and Diversification",
    body: (
      <>
        We further expanded our reach across government, corporate, and institutional sectors:
        <br />• <b>Aligarh Muslim University</b> – Customized control solutions for daily operations.
        <br />• <b>Siddhartha Cooperative Group Housing Society</b> – Energy-efficient automation.
        <br />• <b>Kinobeo Softwares Pvt. Ltd.</b> – Electrical distribution systems.
        <br />• <b>Supertech</b> – Tailored automation to streamline operations.
        <br />• <b>Jaiprakash Associates Ltd.</b> – Water management workflows through automation.
        <br />• <b>GAIL (India) Ltd.</b> – New automation systems for enhanced performance.
      </>
    ),
  },
  {
    year: "2017",
    side: "left",
    title: "2017 — Expanding Into Public Infrastructure",
    body: (
      <>
        We extended our expertise into <b>public utilities and infrastructure:</b>
        <br />• <b>DMRC (Delhi Metro Rail Corporation)</b> – Automation systems that enhanced operational
        efficiency.
      </>
    ),
  },
  {
    year: "2016",
    side: "right",
    title: "2016 — Strengthening Industrial Collaboration",
    body: (
      <>
        Our expertise expanded across major industrial and construction sectors:
        <br />• <b>Ansal Housing &amp; Construction Ltd.</b> – Advanced electrical systems.
        <br />• <b>GAIL (India) Ltd.</b> – Tailored automation for reliability and safety.
      </>
    ),
  },
];

const journey2015: TimelineEntry[] = [
  {
    year: "2015",
    side: "left",
    title: "2015 — Building Strong Partnerships",
    body: (
      <>
        Our work gained the trust of leading corporations and institutions across India:
        <br />• <b>Gulshan Homes Pvt. Ltd.</b>, <b>NTPC</b>, <b>Homes 121 Apartment Association</b>,{" "}
        <b>Delhi Public School</b>, <b>Punjab National Bank</b> — providing automation systems ensuring
        consistent operational performance.
      </>
    ),
  },
  {
    year: "2013",
    side: "right",
    title: "2013 — Advancing Through Technology",
    body: (
      <>
        We developed our specialized <b>“PMC” technology</b> for precise and ideal switching, and
        established our <b>state-of-the-art manufacturing plant in Greater Noida</b>. We also introduced{" "}
        <b>Motor Protection Units (MPUs)</b> driven by digital microcontroller technology.
      </>
    ),
  },
  {
    year: "2011",
    side: "left",
    title: "2011 — Expanding Product Horizons",
    body: (
      <>
        Expanded our portfolio by introducing <b>Motor Starters and AMF Panels</b>, offering integrated
        systems for diverse industrial applications, and entered the <b>real estate sector</b>.
      </>
    ),
  },
  {
    year: "2008",
    side: "right",
    title: "2008 — Partnering for Progress",
    body: (
      <>
        Launched our first <b>AMF Panels</b> and began collaboration with <b>Honda</b>, developing
        generator automation for petrol generators — establishing Subtech as a trusted name in generator
        control.
      </>
    ),
  },
  {
    year: "2005",
    side: "left",
    title: "2005 — Expanding Beyond Borders",
    body: (
      <>
        Subtech started the <b>export of products</b>, carrying our innovations to international markets
        and strengthening our global footprint.
      </>
    ),
  },
  {
    year: "2003",
    side: "right",
    title: "2003 — The Beginning of a Vision",
    body: (
      <>
        Foundation laid with the official registration as <b>S S Power System</b>. Introduced automatic
        changeovers and birthed the <b>“Subtech”</b> brand — the hallmark of our quality, trust, and
        innovation.
      </>
    ),
  },
];

function TimelineList({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* Rail — left-edge on mobile (24px), centered on desktop */}
      <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-[2px] bg-[#e9ecef] -translate-x-1/2" />

      {items.map((item, i) => (
        <motion.div
          key={`${item.year}-${i}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative pt-4 pb-10 md:pb-16"
        >
          {/* Year dot — smaller on mobile, on the left rail */}
          <div
            className="absolute top-3 md:top-10 z-10 w-12 h-12 md:w-[60px] md:h-[60px] rounded-full text-white font-semibold text-[12px] md:text-[16px] flex items-center justify-center left-[24px] md:left-1/2 -translate-x-1/2"
            style={{
              background: RED,
              boxShadow:
                "0 0 0 3px rgba(175,9,9,0.9), 0 0 18px 6px rgba(228,0,6,0.3)",
            }}
          >
            {item.year}
          </div>

          {/* Content — single full-width column on mobile, alternating on desktop */}
          <div className="md:grid md:grid-cols-2 md:items-center">
            {item.side === "left" ? (
              <>
                <div className="md:text-right md:pr-[80px] pl-[68px] md:pl-0 pr-1 order-2 md:order-1">
                  <h4 className="font-bold text-[15px] md:text-[16px] text-[#0D0D0D] mt-0 mb-2 leading-[1.35]">
                    {item.title}
                  </h4>
                  <p className="text-[#3a3a3a] text-[13.5px] md:text-[14px] leading-[1.7] m-0">
                    {item.body}
                  </p>
                </div>
                <div className="hidden md:block order-1 md:order-2" />
              </>
            ) : (
              <>
                <div className="hidden md:block" />
                <div className="md:pl-[80px] pl-[68px] pr-1 order-2">
                  <h4 className="font-bold text-[15px] md:text-[16px] text-[#0D0D0D] mt-0 mb-2 leading-[1.35]">
                    {item.title}
                  </h4>
                  <p className="text-[#3a3a3a] text-[13.5px] md:text-[14px] leading-[1.7] m-0">
                    {item.body}
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function JourneySection() {
  const [tab, setTab] = useState<"2016" | "2015">("2016");
  return (
    <section className="bg-[#fafafa] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold mb-3" style={{ color: RED }}>
          Our Journey
        </h2>
        <p className="text-[#4b5563] mb-6 max-w-3xl">
          At Subtech (S S Power System), our journey is one of innovation, dedication, and continuous
          growth. From humble beginnings to global recognition, we have consistently evolved to deliver
          cutting-edge power automation and electrical control solutions that empower industries and
          simplify lives.
        </p>

        {/* Tabs */}
        <div className="flex border-b border-[#e9ecef] mb-6">
          {(["2016", "2015"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 pb-2 text-[15px] font-medium transition-colors ${
                tab === t
                  ? "text-[#0D0D0D] font-semibold border-b-[3px]"
                  : "text-[#767676] border-b-[3px] border-transparent hover:text-[#0D0D0D]"
              }`}
              style={tab === t ? { borderBottomColor: RED } : undefined}
            >
              {t === "2016" ? "2016 & Beyond" : "2015 – 2003"}
            </button>
          ))}
        </div>

        <TimelineList items={tab === "2016" ? journey2016 : journey2015} />
      </div>
    </section>
  );
}

/* ───────── CERTIFICATES CAROUSEL ─────────
   Filenames match the actual JPGs on subtech.in's `/certificates/` folder
   (also copied to `public/certificates/` here). Browsers auto-encode the
   spaces and parentheses in the URLs at request time, so no manual
   `encodeURIComponent` needed in the JSX. */
const certificates = [
  { title: "ISO 9001",            img: "/certificates/ISO 9001_page-0001.jpg" },
  { title: "ISO 14001",           img: "/certificates/ISO 14001_page-0001.jpg" },
  { title: "ISO 45001",           img: "/certificates/ISO 45001_page-0001.jpg" },
  { title: "ISO 50001",           img: "/certificates/ISO 50001_page-0001.jpg" },
  { title: "Zed Silver",          img: "/certificates/Zed Silver (1)_page-0001.jpg" },
  { title: "Auth Letter",         img: "/certificates/AUTH LETTER.jpg" },
  { title: "CE Certificate",      img: "/certificates/CE Certificate_page.jpg" },
  { title: "Trade Mark Certificate", img: "/certificates/Trade Mark Certificate_page.jpg" },
];

function CertificatesCarousel() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [perView, setPerView] = useState(5);
  const total = certificates.length;

  // Responsive slidesPerView (mirrors original Swiper breakpoints)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 576) setPerView(1);
      else if (w < 992) setPerView(3);
      else setPerView(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 2100);
    return () => clearInterval(id);
  }, [hovering, total]);

  const go = (delta: number) => setActive((a) => (a + delta + total) % total);

  // Compute shortest signed distance between i and active (looped)
  const dist = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const slideWidth = 100 / perView; // % of container per slide

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <h2 className="text-center text-[clamp(28px,3.5vw,42px)] font-bold text-[#0D0D0D] mb-8">
        Certificates
      </h2>

      <div
        className="relative max-w-7xl mx-auto overflow-hidden"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="relative h-[440px]">
          {certificates.map((cert, i) => {
            const d = dist(i);
            const visible = Math.abs(d) <= Math.floor(perView / 2) + 1;
            if (!visible) return null;

            const isActive = d === 0;
            const isAdjacent = Math.abs(d) === 1;

            const scale = isActive ? 1.15 : isAdjacent ? 0.88 : 0.78;
            const blur = isActive ? 0 : isAdjacent ? 1.5 : 3;
            const brightness = isActive ? 1 : isAdjacent ? 0.75 : 0.6;
            const opacity = isActive ? 1 : isAdjacent ? 0.75 : 0.6;

            // Position: center is 50%, each slide offset by slideWidth%
            const left = 50 + d * slideWidth;

            return (
              <div
                key={cert.title}
                className="absolute top-1/2 transition-all duration-[900ms]"
                style={{
                  left: `${left}%`,
                  width: `${slideWidth}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                  opacity,
                  transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
                }}
              >
                <div className="rounded-2xl overflow-hidden">
                  <div className="h-[340px] flex items-center justify-center bg-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.img}
                      alt={cert.title}
                      className="h-full w-auto object-contain"
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = `https://placehold.co/300x400/f3f4f6/${RED.slice(1)}?text=${encodeURIComponent(cert.title)}`;
                      }}
                    />
                  </div>
                  <div className="text-center font-bold text-[#111827] py-3.5">{cert.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev/Next */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center hover:bg-white transition"
          style={{ color: RED }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center hover:bg-white transition"
          style={{ color: RED }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === active ? RED : "rgba(0,0,0,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */
export default function AboutClient() {
  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <AboutHero />
      <MissionSection />
      <VisionCard />
      <WhyUsAbout />
      <JourneySection />
      <CertificatesCarousel />
    </div>
  );
}
