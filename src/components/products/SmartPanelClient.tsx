"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ============================================================
   Smart Motor Control Panel — full client page
   Ported from smart-motor-control-panel.php
   ============================================================ */

const HP_RANGES = ["Up to 10 HP", "Up to 20 HP", "Up to 200 HP"];

const LED_DATA = [
  { color: "#4CAF50", label: "Healthy", desc: "All 3 phases OK. Motor safe to run." },
  { color: "#F44336", label: "Phase Fail", desc: "Single phasing detected. Motor stopped." },
  { color: "#FF9800", label: "Overload Trip", desc: "Current exceeded set limit. Auto cut-off." },
  { color: "#2196F3", label: "Motor Running", desc: "Motor operating normally. Run hours counting." },
  { color: "#9C27B0", label: "Reverse Phase", desc: "Wrong phase sequence detected. Motor stopped." },
  { color: "#F44336", label: "V. Unbalance", desc: "Voltage difference between phases too high." },
];

const LED_TABS = [
  { color: "#4CAF50", label: "Healthy" },
  { color: "#F44336", label: "Phase Fail" },
  { color: "#FF9800", label: "Overload Trip" },
  { color: "#2196F3", label: "Motor Running" },
  { color: "#9C27B0", label: "Reverse Phase" },
  { color: "#F44336", label: "V. Unbalance" },
];

export default function SmartPanelClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [rangeIdx, setRangeIdx] = useState(0);
  const [ledIdx, setLedIdx] = useState(0);
  const [audience, setAudience] = useState<"govt" | "builders" | "dealers">("govt");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const ledManualRef = useRef(false);

  /* Scroll reveal */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".sp-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* LED auto-cycle (pauses when user manually clicks for a bit) */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (ledManualRef.current) return;
      setLedIdx((i) => (i + 1) % LED_DATA.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const led = LED_DATA[ledIdx];

  return (
    <div className="sp-wrap" ref={rootRef}>
      {/* Font Awesome via CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* HERO */}
      <section className="sp-hero" id="sp-hero">
        <div className="sp-hero-inner">
          <div className="sp-hero-text">
            <div className="sp-hero-tagline">Smart Motor Control Panel</div>
            <h1 className="sp-hero-title">
              Na Motor Jale,
              <br />
              <span className="sp-red">Na Panel.</span>
            </h1>
            <p className="sp-hero-desc">
              Microcontroller-based digital protection for electric motors and pumps. 7 built-in
              protections. PMC powerless switching. 1000+ hours continuous run.
            </p>

            <div className="sp-range-tabs">
              {["Single Phase", "Three Phase DOL", "Star Delta"].map((label, i) => (
                <button
                  key={label}
                  className={`sp-range-tab${rangeIdx === i ? " active" : ""}`}
                  onClick={() => setRangeIdx(i)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="sp-hero-stats">
              <div>
                <div className="sp-stat-value" id="sp-stat-hp">
                  {HP_RANGES[rangeIdx]}
                </div>
                <div className="sp-stat-label">Motor Range</div>
              </div>
              <div>
                <div className="sp-stat-value">7</div>
                <div className="sp-stat-label">Built-in Protections</div>
              </div>
              <div>
                <div className="sp-stat-value">1000+</div>
                <div className="sp-stat-label">Hours Continuous Run</div>
              </div>
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="sp-btn-red"
                style={{ padding: "14px 32px", fontSize: 15 }}
              >
                <i className="fas fa-phone" style={{ marginRight: 6 }} />
                Get Quote
              </Link>
              <a
                href="https://wa.me/918506060582"
                className="sp-btn-outline"
                style={{ padding: "14px 32px", fontSize: 15 }}
              >
                <i className="fab fa-whatsapp" style={{ marginRight: 6, color: "#25D366" }} />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="sp-hero-visual">
            <img
              src="/images/brands/photo1.jpeg"
              alt="Smart Motor Control Panel"
              style={{ width: "100%", maxWidth: 600, height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="sp-section" id="sp-problem">
        <div className="sp-container">
          <div className="sp-reveal sp-feature-block">
            <div className="sp-feature-text">
              <span className="sp-label">The Problem</span>
              <h2 className="sp-feature-title">
                Why Do Electric
                <br />
                Motors <span className="sp-red">Burn?</span>
              </h2>
              <p className="sp-feature-desc">
                Four main reasons destroy motors worth lakhs every year. Most starters provide zero
                protection against them.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  { ic: "⚡", t: "Overload", d: "Motor draws excess current" },
                  { ic: "⊘", t: "Single Phasing", d: "One phase drops out" },
                  { ic: "≋", t: "Unbalance Voltage", d: "Phases at different voltages" },
                  { ic: "▼▲", t: "Low / High Voltage", d: "Supply out of safe range" },
                ].map((b) => (
                  <div className="sp-card sp-card-sm" key={b.t}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{b.ic}</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.t}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{b.d}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: "var(--radius)",
                  background: "var(--red-light)",
                  border: "1px solid rgba(229,57,53,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "var(--red)",
                    marginBottom: 8,
                  }}
                >
                  The Real Cost of a Burnt Motor:
                </div>
                <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>
                  Motor rewinding: <strong>Rs 15,000 - 50,000</strong>
                  <br />
                  Downtime loss: <strong>Rs 5,000 - 10,000/day</strong>
                  <br />
                  Site visits and repair: <strong>Rs 2,000 - 5,000 each</strong>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--red)",
                    marginTop: 10,
                  }}
                >
                  तो आपको मोटर चलानी है, या जलानी है?
                </div>
              </div>
            </div>

            <div className="sp-feature-visual">
              <img
                src="/images/brands/photo2.png"
                alt="Burnt Electric Motor"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: 500,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* OLD vs NEW */}
      <section className="sp-section sp-section-alt" id="sp-comparison">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label">The Shift</span>
            <h2 className="sp-section-title">
              Old Technology vs <span className="sp-red">New Technology</span>
            </h2>
            <p className="sp-section-subtitle">
              The same motor. Two completely different outcomes.
            </p>
          </div>

          <div className="sp-reveal sp-vs-container">
            <div className="sp-vs-side sp-vs-old">
              <img
                src="/images/brands/photo3.jpeg"
                alt="Traditional DOL Starter"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  height: 300,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              />
              <div className="sp-vs-title" style={{ color: "var(--text-3)" }}>
                <i className="fas fa-times-circle" style={{ color: "var(--red)" }} /> Without
                Protection
              </div>
              <ul className="sp-vs-list">
                {[
                  "Contactor coil burns at low/high voltage",
                  "Thermal overload relay is inaccurate",
                  "No voltage monitoring capability",
                  "No dry run protection",
                  "No digital display, only analog meters",
                  "Heats up within 4-6 hours of continuous run",
                  "6+ loose components assembled together",
                  "Messy, complex internal wiring",
                  "Narrow voltage range: 325-445 VAC",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="sp-vs-divider">VS</div>

            <div className="sp-vs-side sp-vs-new">
              <img
                src="/images/brands/photo4.jpeg"
                alt="Subtech Smart Panel"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  height: 300,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              />
              <div className="sp-vs-title">
                <i className="fas fa-shield-halved" style={{ color: "var(--green)" }} />{" "}
                <span className="sp-red">All Protections</span>
              </div>
              <ul className="sp-vs-list">
                {[
                  "PMC: Zero coil burning, powerless switching",
                  "MPU: Digital programmable overload (accurate)",
                  "Real-time voltage, current and run-hour monitoring",
                  "Dry run protection built-in",
                  "Digital display for V / A / Run Hours",
                  "1000+ hours continuous run without heating",
                  "Only 3 components: MCB + MPU + PMC",
                  "Clean, minimal internal wiring",
                  "Wide voltage range: 250-495 VAC",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SECRETS */}
      <section className="sp-section" id="sp-secrets">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label">Industry Secrets</span>
            <h2 className="sp-section-title">4 Inside Secrets of Motor Starters</h2>
            <p className="sp-section-subtitle">That no company will ever reveal to you.</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                num: "#1",
                ic: "⚒",
                title: "Under-rated Starters and Upsizing Game",
                text: "Most cheap starters sold as \"10 HP\" are built with 7.5 HP parts or less. Result: overheating, repeated tripping, or motor damage.",
                diff: "When we say 10 HP, it runs 10 HP or higher. True power rating. No upsizing game.",
              },
              {
                num: "#2",
                ic: "🔌",
                title: "Neutral Operation Risk",
                text: "Many panels need a proper neutral line. In villages and industrial zones, neutral is loose, shared, or at wrong voltage. Protections fail.",
                diff: "Our panels work without neutral. Period. Operates on 3-phase supply directly.",
              },
              {
                num: "#3",
                ic: "🔧",
                title: "Less and Thin Copper Inside",
                text: "To cut cost, many use thin copper links, narrow busbars, thinner wires. Result: more heat, voltage drop, faster ageing, more burning.",
                diff: "More copper, proper sizing, thicker bus bars, DMC terminals. Runs cooler, lasts longer.",
              },
              {
                num: "#4",
                ic: "🦠",
                title: "Panels That Rust Too Early",
                text: "Many use low-grade sheet metal and weak powder coating. After a few seasons, moisture enters, metal rusts from inside.",
                diff: "GPSP/GI sheet, powder coated, rubber gaskets, moulded cable entries. Dust and reptile resistant.",
              },
            ].map((s, i) => (
              <div className={`sp-reveal sp-reveal-d${i} sp-secret-card`} key={s.num}>
                <span className="sp-secret-number">{s.num}</span>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.ic}</div>
                <div className="sp-secret-title">{s.title}</div>
                <div className="sp-secret-text">{s.text}</div>
                <div className="sp-secret-diff">
                  <div className="sp-secret-diff-title">Subtech Difference</div>
                  <div className="sp-secret-diff-text">{s.diff}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE COMPONENTS */}
      <section className="sp-section sp-section-alt" id="sp-components">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Inside the Smart Panel</h2>
            <p className="sp-section-subtitle">Three core components. One integrated system.</p>
          </div>

          <div className="sp-reveal sp-component-row">
            {[
              {
                color: "var(--blue)",
                img: "/images/brands/photo8.png",
                alt: "MCB / MCCB",
                title: "MCB / MCCB",
                sub: "Power Breaker",
                subColor: "var(--blue)",
                desc: "Automatically switches OFF during short circuit. Full reliability for abnormal conditions.",
              },
              {
                color: "var(--red)",
                img: "/images/brands/mpu.jpg",
                alt: "MPU Unit",
                title: "MPU",
                sub: "The Brain",
                subColor: "var(--red)",
                desc: "Control, monitoring and all 7 protections. Replaces 6 separate components in one unit.",
              },
              {
                color: "var(--amber)",
                img: "/images/brands/render1.png",
                alt: "PMC Unit",
                title: "PMC",
                sub: "The Switch",
                subColor: "var(--amber)",
                desc: "Powerless, fast switching. Zero coil burning. 5-year warranty. Up to 150 Amp.",
              },
            ].map((c, i, arr) => (
              <div
                key={c.title}
                style={{ display: "contents" }}
                aria-label={`Component ${c.title}`}
              >
                <div className="sp-component-card">
                  <div className="accent-bar" style={{ background: c.color }} />
                  <img
                    src={c.img}
                    alt={c.alt}
                    style={{
                      width: "100%",
                      maxWidth: 250,
                      height: 200,
                      objectFit: "contain",
                      display: "block",
                      marginBottom: 16,
                    }}
                  />
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{c.title}</div>
                  <div
                    style={{
                      fontSize: 13,
                      color: c.subColor,
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    {c.sub}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-3)",
                      marginTop: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {c.desc}
                  </div>
                </div>
                {i < arr.length - 1 && <div className="sp-component-plus">+</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MPU DEEP-DIVE */}
      <section className="sp-section" id="sp-technology">
        <div className="sp-container">
          <div className="sp-reveal sp-feature-block reverse">
            <div className="sp-feature-text">
              <span className="sp-label sp-label-amber">Control Unit</span>
              <h2 className="sp-feature-title">
                1 Brain Replaces
                <br />
                <span style={{ color: "var(--amber)" }}>6 Separate Parts.</span>
              </h2>
              <p className="sp-feature-desc">
                MPU (Motor Protection Unit) is a microcontroller-based digital unit that combines
                monitoring, control, and protection. No more loose parts, messy wiring, or inaccurate
                analog readings.
              </p>
              <div className="sp-feature-bullets">
                {[
                  "Digital Volt meter, Amp meter, and Run Hour meter in one display",
                  "Start/Stop push buttons with Auto, Manual, and Bypass modes",
                  "Built-in Star-Delta timer for seamless motor starting",
                  "Programmable overload, under-voltage, and over-voltage settings",
                  "Separate LED indicator for every fault type",
                  "Remote trip provision and pressure switch interface",
                ].map((t) => (
                  <div className="sp-feature-bullet" key={t}>
                    <div className="sp-feature-bullet-icon">
                      <i className="fas fa-check" style={{ fontSize: 10 }} />
                    </div>
                    <div className="sp-feature-bullet-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-feature-visual">
              <img
                src="/images/brands/photo11.png"
                alt="MPU vs 6 Parts"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: 450,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PMC DEEP-DIVE */}
      <section className="sp-section sp-section-alt" id="sp-pmc">
        <div className="sp-container">
          <div className="sp-reveal sp-feature-block">
            <div className="sp-feature-text">
              <span className="sp-label">Switching Technology</span>
              <h2 className="sp-feature-title">
                Powerless Switching.
                <br />
                <span className="sp-red">Zero Coil Burning.</span>
              </h2>
              <p className="sp-feature-desc">
                PMC (Pre Magnetic Contactor) is our proprietary switching technology. Unlike
                conventional contactors that burn coils at low or high voltages, PMC operates on
                20-28V DC with zero power consumption during hold state.
              </p>
              <div className="sp-feature-bullets">
                {[
                  "Operates across 140-480 VAC. No coil damage at any voltage.",
                  "Smooth, instant switching with no chattering at contact points.",
                  "5-Year warranty on coil burning. Available up to 150 Amp.",
                  "Ideal for frequent switching in ATS, AMF, street light panels.",
                ].map((t) => (
                  <div className="sp-feature-bullet" key={t}>
                    <div className="sp-feature-bullet-icon">
                      <i className="fas fa-check" style={{ fontSize: 10 }} />
                    </div>
                    <div className="sp-feature-bullet-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-feature-visual">
              <div
                style={{
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="sp-compare-row"
                  style={{ background: "var(--text-1)", color: "white" }}
                >
                  <div
                    className="sp-compare-label"
                    style={{
                      background: "var(--text-1)",
                      color: "white",
                      fontSize: 11,
                    }}
                  >
                    Feature
                  </div>
                  <div
                    className="sp-compare-good"
                    style={{
                      background: "var(--red)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    <i className="fas fa-bolt" style={{ marginRight: 6 }} />
                    PMC (Subtech)
                  </div>
                  <div
                    className="sp-compare-bad"
                    style={{
                      background: "var(--text-2)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 12,
                    }}
                  >
                    Conventional Contactor
                  </div>
                </div>
                {[
                  ["Coil Voltage", "140-480 VAC", "200-240 VAC"],
                  ["Coil Burning", "Zero probability", "Common at low/high V"],
                  ["Power Draw", "Powerless switching", "Continuous consumption"],
                  ["Chattering", "None", "At unstable voltage"],
                  ["Continuous Run", "1000+ hours", "4-6 hours (heats up)"],
                  ["Range", "Up to 150 Amp", "Rating dependent"],
                  ["Warranty", "5 Years on coil", "Standard 1 year"],
                ].map(([k, g, b]) => (
                  <div className="sp-compare-row" key={k}>
                    <div className="sp-compare-label">{k}</div>
                    <div className="sp-compare-good">{g}</div>
                    <div className="sp-compare-bad">{b}</div>
                  </div>
                ))}
              </div>

              <img
                src="/images/brands/photo12.png"
                alt="PMC vs Contactor"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: 250,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 12,
                  marginTop: 16,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7 PROTECTIONS */}
      <section className="sp-section" id="sp-protections">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label sp-label-green">Protection Suite</span>
            <h2 className="sp-section-title">
              7 Built-in Protections.
              <br />
              <span style={{ color: "var(--green)" }}>99% Motor Safety.</span>
            </h2>
            <p className="sp-section-subtitle">
              Every protection is inside the MPU. No add-on modules, no extra wiring, no extra
              cost.
            </p>
          </div>

          <div className="sp-reveal sp-prot-grid">
            {[
              { ic: "⚡", n: "Overload", s: "Digital Programmable" },
              { ic: "💧", n: "Dry Run", s: "Water Source Guard" },
              { ic: "⊘", n: "Single Phasing", s: "Phase Failure Detection" },
              { ic: "▼", n: "Under Voltage", s: "Settable Low Limit" },
              { ic: "▲", n: "Over Voltage", s: "Settable High Limit" },
              { ic: "≋", n: "Unbalance", s: "Voltage Asymmetry" },
              { ic: "⤻", n: "Reverse Phase", s: "Wrong Sequence Guard" },
              { ic: "⚠", n: "Short Circuit", s: "Via MCB/MCCB" },
            ].map((p) => (
              <div className="sp-prot-item yes" key={p.n}>
                <div className="sp-prot-icon">{p.ic}</div>
                <div className="sp-prot-name">{p.n}</div>
                <div className="sp-prot-status">{p.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LED INDICATORS */}
      <section className="sp-section sp-section-alt" id="sp-indicators">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label">Smart Indicators</span>
            <h2 className="sp-section-title">
              Every Fault Has a Light.
              <br />
              <span style={{ color: "var(--text-3)" }}>No Guesswork.</span>
            </h2>
            <p className="sp-section-subtitle">
              Separate LED indicators for every fault type. Know exactly what went wrong, instantly.
            </p>
          </div>

          <div className="sp-reveal sp-led-display">
            <div
              className="sp-led-circle-outer"
              style={{
                background: `radial-gradient(circle, ${led.color}26 0%, transparent 70%)`,
              }}
            >
              <div
                className="sp-led-circle"
                style={{
                  background: led.color,
                  boxShadow: `0 0 30px ${led.color}80, 0 0 60px ${led.color}40`,
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: led.color,
                  marginBottom: 4,
                }}
              >
                {led.label}
              </div>
              <div style={{ fontSize: 14, color: "var(--text-3)" }}>{led.desc}</div>
            </div>
            <div className="sp-led-tabs">
              {LED_TABS.map((t, i) => (
                <button
                  key={t.label}
                  className={`sp-led-tab${ledIdx === i ? " active" : ""}`}
                  onClick={() => {
                    ledManualRef.current = true;
                    setLedIdx(i);
                    window.setTimeout(() => {
                      ledManualRef.current = false;
                    }, 8000);
                  }}
                  style={ledIdx === i ? { color: t.color } : undefined}
                >
                  <div className="sp-led-dot" style={{ background: t.color }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section className="sp-section" id="sp-specs">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Technical Specifications</h2>
          </div>
          <div className="sp-spec-grid">
            {[
              { l: "Voltage Range", v: "250-495", u: "VAC", s: "Widest in the industry" },
              { l: "DOL Motor Range", v: "1-20", u: "HP", s: "Single and Three Phase" },
              { l: "Star Delta Range", v: "10-200", u: "HP", s: "Heavy industrial loads" },
              { l: "Continuous Run", v: "1000+", u: "Hrs", s: "PMC technology" },
              { l: "Protections", v: "7", u: "Built-in", s: "Digital programmable" },
              { l: "Operating Modes", v: "3", u: "Modes", s: "Auto / Manual / Bypass" },
              { l: "Frequency", v: "50", u: "Hz", s: "Standard Indian supply" },
              { l: "Enclosure", v: "IP54", u: "Grade", s: "Dust and reptile resistant" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`sp-reveal sp-reveal-d${i % 4} sp-spec-card`}
              >
                <div className="sp-spec-label">{s.l}</div>
                <div className="sp-spec-value">
                  {s.v}
                  <span className="sp-spec-unit">{s.u}</span>
                </div>
                <div className="sp-spec-sub">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN THE PANEL */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label">Visual Proof</span>
            <h2 className="sp-section-title">
              Open the Panel. <span className="sp-red">See the Difference.</span>
            </h2>
            <p className="sp-section-subtitle">
              Clean wiring. Fewer parts. Longer life. Zero confusion for technicians.
            </p>
          </div>
          <div
            className="sp-reveal sp-open-panel-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            <div>
              <img
                src="/images/brands/photo13.png"
                alt="Other Brand Panel Open"
                style={{
                  width: "100%",
                  maxWidth: 500,
                  height: 400,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 12,
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 14,
                  color: "var(--text-3)",
                  fontWeight: 600,
                }}
              >
                Other Control Panel
              </div>
            </div>
            <div>
              <img
                src="/images/brands/photo14A.png"
                alt="Subtech Panel Open"
                style={{
                  width: "100%",
                  maxWidth: 500,
                  height: 400,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 12,
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                SUBTECH <span className="sp-red">Digital Smart Panel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COST OF OWNERSHIP */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-label">The Real Math</span>
            <h2 className="sp-section-title">Cost of Ownership</h2>
            <p className="sp-section-subtitle">
              A cheap starter is the most expensive decision you can make.
            </p>
          </div>
          <div className="sp-reveal sp-cost-grid">
            <div className="sp-cost-card loss">
              <div className="sp-cost-label">Motor Rewinding</div>
              <div className="sp-cost-amount">Rs 25,000+</div>
              <div className="sp-cost-sub">Average for 5-10 HP motor</div>
            </div>
            <div className="sp-cost-card loss">
              <div className="sp-cost-label">Downtime Loss</div>
              <div className="sp-cost-amount">Rs 10,000</div>
              <div className="sp-cost-sub">Per day of pump failure</div>
            </div>
            <div className="sp-cost-card save">
              <div className="sp-cost-label">Subtech Smart Panel</div>
              <div className="sp-cost-amount">Rs 6,000</div>
              <div className="sp-cost-sub">Prevents all of the above</div>
            </div>
          </div>
          <div
            className="sp-reveal"
            style={{
              textAlign: "center",
              marginTop: 20,
              padding: "18px 24px",
              borderRadius: "var(--radius)",
              background: "var(--green-light)",
              border: "1px solid rgba(46,125,50,0.1)",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--green)" }}>
              Net Saving: Rs 29,000+ per incident prevented.
            </span>
            <span style={{ fontSize: 14, color: "var(--text-2)", marginLeft: 8 }}>
              That is 5x the cost of the panel.
            </span>
          </div>
        </div>
      </section>

      {/* APPLICATION AREAS */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Where Our Panels Work</h2>
          </div>
          <div
            className="sp-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                ic: "💧",
                t: "Water Pump Automation",
                line2: "Industrial | Domestic | Agriculture",
                sub: "With/Without Water Level Controller and GPRS Control",
              },
              {
                ic: "💡",
                t: "Street Light Automation",
                line2: "Single / Three Phase",
                sub: "Timer based, dusk-to-dawn, remote switching",
              },
              {
                ic: "⚙",
                t: "Generator Automation",
                line2: "AMF Panels for DG Sets",
                sub: "Auto start and stop on mains failure",
              },
            ].map((a) => (
              <div className="sp-card" style={{ textAlign: "center" }} key={a.t}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.ic}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{a.t}</div>
                <div style={{ fontSize: 13, color: "var(--text-3)" }}>{a.line2}</div>
                <div
                  style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}
                >
                  {a.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMAND CENTER */}
      <section className="sp-section sp-section-dark">
        <div className="sp-container">
          <div className="sp-reveal sp-feature-block">
            <div className="sp-feature-text">
              <span className="sp-label sp-label-dark">IoT Platform</span>
              <h2 className="sp-section-title">Subtech Command Center</h2>
              <p className="sp-section-subtitle">
                Smart control for every motor, pump and light from one screen.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {[
                  ["fa-map-marker-alt", "Live Status"],
                  ["fa-wifi", "Remote ON/OFF"],
                  ["fa-clock", "Smart Scheduling"],
                  ["fa-bell", "Instant Alerts"],
                  ["fa-users", "Multi-User Access"],
                  ["fa-chart-bar", "Energy Reports"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    style={{
                      padding: 14,
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <i
                      className={`fas ${icon}`}
                      style={{ color: "var(--red)", marginRight: 6 }}
                    />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-feature-visual">
              <img
                src="/images/brands/photo15.png"
                alt="Command Center Dashboard"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: 400,
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY SUBTECH */}
      <section className="sp-section" id="sp-why">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Why Choose Subtech?</h2>
          </div>

          <div className="sp-reveal">
            <div className="sp-audience-tabs">
              {(
                [
                  ["govt", "Government and PSUs"],
                  ["builders", "Builders and Contractors"],
                  ["dealers", "Distributors and Partners"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  className={`sp-audience-tab${audience === id ? " active" : ""}`}
                  onClick={() => setAudience(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {(audience === "govt"
                ? [
                    [
                      "📋",
                      "Proven Track Record",
                      "GAIL, NTPC, DMRC, DJB, UP Jal Nigam, Railways, Air Force, Uranium Mines, NLC, Coalfields",
                    ],
                    [
                      "🎓",
                      "Deep Expertise",
                      "Tube-well automation, multi-pump control, STP, street lighting, DG automation",
                    ],
                    [
                      "📡",
                      "Reduce Physical Visits",
                      "GSM/GPRS centralised monitoring for distributed water supply networks",
                    ],
                    [
                      "🌱",
                      "Green Initiative",
                      "Energy-saving focus, reduce power wastage, motor damage, and water overflow",
                    ],
                  ]
                : audience === "builders"
                  ? [
                      [
                        "🎯",
                        "Single-Window Solution",
                        "Water pumps, fire pumps, lighting, DG AMF, ACCL, street lighting and LT panels",
                      ],
                      [
                        "📐",
                        "Custom as per Drawings",
                        "Match site conditions, consultant drawings and integration needs",
                      ],
                      [
                        "🛡",
                        "Fewer Site Complaints",
                        "PMC and MPU based panels drastically reduce failures and motor burning",
                      ],
                      [
                        "🔧",
                        "220+ Dealer Network",
                        "Strong service support through dealers and experienced technical team",
                      ],
                    ]
                  : [
                      [
                        "📦",
                        "Wide Product Range",
                        "Single-phase to 200 HP star-delta, GSM panels, AMF, ATS, ACCL, timers",
                      ],
                      [
                        "📈",
                        "Strong Demand",
                        "Residential, agricultural and industrial markets. Easy to sell across segments.",
                      ],
                      [
                        "🤝",
                        "Long-term Support",
                        "Training, technical support, marketing material and relationship approach",
                      ],
                      [
                        "🔬",
                        "In-house R&D",
                        "New product development and customization for local market needs",
                      ],
                    ]
              ).map(([ic, t, d]) => (
                <div className="sp-card" key={t}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{ic}</div>
                  <strong>{t}</strong>
                  <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="sp-section sp-section-alt" id="sp-certs">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Certifications and Approvals</h2>
          </div>
          <div
            className="sp-reveal"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              "ISO 9001",
              "ISO 14001",
              "ISO 45001",
              "ISO 50001",
              "CPRI Tested",
              "ERTL Tested",
              "ZED Silver",
              "Make in India",
              "CE Marked",
            ].map((c) => (
              <span className="sp-cert-badge" key={c}>
                {c}
              </span>
            ))}
          </div>
          <div
            className="sp-reveal"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}
          >
            {[
              "Delhi Jal Board",
              "UP Jal Nigam",
              "PHED Rajasthan",
              "Indian Railways",
              "Indian Air Force",
            ].map((c) => (
              <span className="sp-client-badge" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Our Clients</h2>
            <p className="sp-section-subtitle">
              Trusted by government, defence, infrastructure and real estate leaders.
            </p>
          </div>
          <div
            className="sp-reveal"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}
          >
            {[
              "GAIL",
              "Honda",
              "NTPC Ltd.",
              "Indian Railways",
              "Indian Air Force",
              "Air India",
              "DMRC",
              "BMRC",
              "PGCIL",
              "AMU",
              "TMU",
              "IIIT Guwahati",
              "Delhi Jal Board",
              "UP Jal Nigam",
              "Nagar Nigam",
              "HCL",
              "NLC Ind.",
              "Coalfields",
              "Uranium Mines",
              "CMET",
              "Expo Mart Gr. Noida",
              "Supertech",
              "Jaypee Group",
              "Gulshan Homz",
              "Nirala Infra",
              "Bhutani",
              "Eros",
              "Migsun",
              "Ansal Housing",
            ].map((c) => (
              <span className="sp-client-badge" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section-alt" id="sp-faq">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <h2 className="sp-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="sp-reveal" style={{ maxWidth: 680, margin: "0 auto" }}>
            {[
              {
                q: "What makes Subtech different from other motor starters?",
                a: 'Traditional starters use 6+ separate components assembled together (contactor, OLR, ammeter, timer, SPPR, push buttons). Subtech uses a microcontroller-based MPU that integrates all functions into one unit, plus PMC for powerless switching. This means 7 protections built-in, wider voltage range (250-495 VAC), 1000+ hours continuous run, and zero coil burning.',
              },
              {
                q: "Will it work where voltage is unstable?",
                a: "Yes. Subtech panels operate across 250-495 VAC, the widest range in the industry. The panel does not require a neutral line. All voltage protections are programmable to your specific site conditions.",
              },
              {
                q: "Is it suitable for submersible pumps?",
                a: "Absolutely. Our panels are used extensively in agriculture for submersible and monoblock pumps. Features like dry run protection, auto-restart on power resume, and water level controller integration make it specifically designed for pump applications.",
              },
              {
                q: "What is PMC? Why is it better than a contactor?",
                a: "PMC (Pre Magnetic Contactor) is our proprietary switching device. It uses a 20-28V DC coil that consumes zero power in hold state. Unlike AC contactors that burn coils at low/high voltage and chatter at unstable supply, PMC operates smoothly across 140-480 VAC with zero coil burning probability. It comes with a 5-year warranty on coil burning.",
              },
              {
                q: "Can I monitor panels remotely?",
                a: "Yes. With Subtech Command Center (optional GSM/4G module), you can monitor all connected panels from a web dashboard. Features include live status, remote ON/OFF, smart scheduling, instant alerts, energy logs, and multi-user role-based access.",
              },
              {
                q: "What certifications does Subtech have?",
                a: "ISO 9001, ISO 14001, ISO 45001, ISO 50001, CPRI tested, ERTL tested, ZED Silver certified, Make in India, CE marked. Approved by Delhi Jal Board, UP Jal Nigam, PHED Rajasthan, Indian Railways, and Indian Air Force.",
              },
              {
                q: "What motor HP range does this panel support?",
                a: "Single Phase: up to 10 HP. Three Phase DOL: up to 20 HP. Star Delta: up to 200 HP. Custom configurations available for specific industrial requirements.",
              },
              {
                q: "How do I become a Subtech dealer?",
                a: "Contact us via phone or WhatsApp. We offer dealer appointments with training, technical support, marketing materials, and attractive margin structures. We are expanding our 220+ dealer network across India.",
              },
            ].map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  className={`sp-faq-item${open ? " open" : ""}`}
                  key={i}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <div className="sp-faq-q">
                    {f.q}
                    <span className="sp-faq-toggle">+</span>
                  </div>
                  <div className="sp-faq-a">
                    <div className="sp-faq-a-text">{f.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-section" id="sp-enquiry" style={{ textAlign: "center" }}>
        <div className="sp-container sp-reveal">
          <div
            style={{
              fontSize: 14,
              color: "var(--red)",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Ready for your next project?
          </div>
          <h2 className="sp-section-title">Get a Free Quote Today.</h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-2)",
              maxWidth: 440,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Call or WhatsApp our team. Free technical consultation and site survey for your project.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <a
              href="tel:+918506060582"
              className="sp-btn-red"
              style={{ padding: "14px 36px", fontSize: 15 }}
            >
              <i className="fas fa-phone" style={{ marginRight: 6 }} />
              Call Now
            </a>
            <a
              href="https://wa.me/918506060582"
              className="sp-btn-outline"
              style={{ padding: "14px 36px", fontSize: 15 }}
            >
              <i className="fab fa-whatsapp" style={{ marginRight: 6, color: "#25D366" }} />
              WhatsApp Us
            </a>
          </div>
          <div style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.8 }}>
            <i className="fas fa-envelope" style={{ color: "var(--red)", marginRight: 6 }} />{" "}
            info@subtech.in
            <br />
            <i className="fas fa-phone" style={{ color: "var(--red)", marginRight: 6 }} />{" "}
            0120-4679823 | 8506060581 | 8506060582
            <br />
            <i className="fas fa-map-marker-alt" style={{ color: "var(--red)", marginRight: 6 }} />{" "}
            271, Udyog Kendra-II, Ecotech-III, Greater Noida, G.B. Nagar UP - 201306
          </div>
        </div>
      </section>

      {/* Override globals.css h1/h2/h3/p so this page's typography wins */}
      <style jsx global>{`
        .sp-wrap h1,
        .sp-wrap h2,
        .sp-wrap h3,
        .sp-wrap h4,
        .sp-wrap p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
        /* Buttons that are Next.js <Link> components don't always get scoped — use globals */
        .sp-wrap .sp-btn-red {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 24px;
          border-radius: 10px;
          background: #e53935;
          color: white;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition:
            background 0.2s,
            transform 0.2s;
          font-family: inherit;
          text-decoration: none;
        }
        .sp-wrap .sp-btn-red:hover {
          background: #c62828;
          transform: translateY(-1px);
          color: white;
        }
        .sp-wrap .sp-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 24px;
          border-radius: 10px;
          background: transparent;
          color: #1a1a1a;
          font-size: 13px;
          font-weight: 700;
          border: 1.5px solid #e8e8ec;
          cursor: pointer;
          transition:
            border-color 0.2s,
            transform 0.2s;
          font-family: inherit;
          text-decoration: none;
        }
        .sp-wrap .sp-btn-outline:hover {
          border-color: #1a1a1a;
          transform: translateY(-1px);
        }
        /* Font Awesome override (in case any global !important font-family fights it) */
        .sp-wrap .fas,
        .sp-wrap .far,
        .sp-wrap .fal,
        .sp-wrap .fad {
          font-family: "Font Awesome 6 Free" !important;
        }
        .sp-wrap .fab {
          font-family: "Font Awesome 6 Brands" !important;
        }
      `}</style>

      <style jsx>{`
        .sp-wrap {
          --white: #ffffff;
          --bg: #fafafa;
          --bg-alt: #f2f2f5;
          --bg-card: #ffffff;
          --border: #e8e8ec;
          --border-light: #f0f0f3;
          --black: #111111;
          --text-1: #1a1a1a;
          --text-2: #444444;
          --text-3: #777777;
          --text-4: #aaaaaa;
          --red: #e53935;
          --red-dark: #c62828;
          --red-light: #ffebee;
          --red-glow: rgba(229, 57, 53, 0.08);
          --green: #2e7d32;
          --green-light: #e8f5e9;
          --amber: #f57f17;
          --amber-light: #fff8e1;
          --blue: #1565c0;
          --blue-light: #e3f2fd;
          --radius: 16px;
          --radius-sm: 10px;
          --radius-xs: 6px;
          --shadow:
            0 1px 3px rgba(0, 0, 0, 0.04),
            0 4px 20px rgba(0, 0, 0, 0.03);
          --shadow-lg: 0 4px 40px rgba(0, 0, 0, 0.06);
          --max-w: 1100px;

          color: var(--text-1);
          background: var(--white);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .sp-wrap :global(*),
        .sp-wrap :global(*::before),
        .sp-wrap :global(*::after) {
          box-sizing: border-box;
        }
        .sp-wrap :global(img) {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .sp-wrap :global(a) {
          color: inherit;
          text-decoration: none;
        }
        .sp-container {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 24px;
        }
        .sp-section {
          padding: 100px 24px;
        }
        .sp-section-alt {
          background: var(--bg);
        }
        .sp-section-dark {
          background: var(--black);
          color: var(--white);
        }

        /* Reveal */
        .sp-wrap :global(.sp-reveal) {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sp-wrap :global(.sp-reveal.visible) {
          opacity: 1;
          transform: translateY(0);
        }
        .sp-wrap :global(.sp-reveal-d1) {
          transition-delay: 0.1s;
        }
        .sp-wrap :global(.sp-reveal-d2) {
          transition-delay: 0.2s;
        }
        .sp-wrap :global(.sp-reveal-d3) {
          transition-delay: 0.3s;
        }
        .sp-wrap :global(.sp-reveal-d4) {
          transition-delay: 0.4s;
        }

        /* Typography */
        .sp-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--red);
          background: var(--red-light);
          border: 1px solid rgba(229, 57, 53, 0.12);
          margin-bottom: 16px;
        }
        .sp-label::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--red);
        }
        .sp-label-green {
          color: var(--green);
          background: var(--green-light);
          border-color: rgba(46, 125, 50, 0.12);
        }
        .sp-label-green::before {
          background: var(--green);
        }
        .sp-label-amber {
          color: var(--amber);
          background: var(--amber-light);
          border-color: rgba(245, 127, 23, 0.12);
        }
        .sp-label-amber::before {
          background: var(--amber);
        }
        .sp-label-dark {
          color: var(--white);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .sp-label-dark::before {
          background: var(--white);
        }
        .sp-section-title {
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          color: var(--text-1);
          margin-bottom: 16px;
        }
        .sp-section-dark .sp-section-title {
          color: var(--white);
        }
        .sp-section-subtitle {
          font-size: 17px;
          color: var(--text-3);
          max-width: 540px;
          line-height: 1.65;
        }
        .sp-section-dark .sp-section-subtitle {
          color: rgba(255, 255, 255, 0.6);
        }
        .sp-red {
          color: var(--red);
        }
        .sp-section-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .sp-section-header .sp-section-subtitle {
          margin: 0 auto;
        }

        /* Hero */
        .sp-hero {
          min-height: 92vh;
          display: flex;
          align-items: center;
          padding: 100px 24px 60px;
          position: relative;
          overflow: hidden;
        }
        .sp-hero::before {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--red-glow) 0%, transparent 65%);
          pointer-events: none;
        }
        .sp-hero-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
        }
        .sp-hero-text {
          flex: 1 1 420px;
        }
        .sp-hero-visual {
          flex: 1 1 380px;
        }
        .sp-hero-tagline {
          font-size: 13px;
          font-weight: 700;
          color: var(--red);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .sp-hero-title {
          font-size: clamp(38px, 6vw, 60px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 20px;
        }
        .sp-hero-desc {
          font-size: 17px;
          color: var(--text-2);
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .sp-hero-stats {
          display: flex;
          gap: 32px;
          padding: 24px 0;
          border-top: 1px solid var(--border);
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .sp-stat-value {
          font-size: 32px;
          font-weight: 900;
          color: var(--red);
          line-height: 1;
        }
        .sp-stat-label {
          font-size: 12px;
          color: var(--text-3);
          margin-top: 4px;
          font-weight: 500;
        }
        .sp-range-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .sp-range-tab {
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--border);
          background: white;
          color: var(--text-2);
          transition: all 0.3s;
          font-family: inherit;
        }
        .sp-range-tab.active {
          background: var(--red);
          color: white;
          border-color: var(--red);
        }

        /* Feature block */
        .sp-feature-block {
          display: flex;
          gap: 60px;
          align-items: center;
          flex-wrap: wrap;
        }
        .sp-feature-block.reverse {
          flex-direction: row-reverse;
        }
        .sp-feature-text {
          flex: 1 1 400px;
          min-width: 300px;
        }
        .sp-feature-visual {
          flex: 1 1 400px;
          min-width: 280px;
        }
        .sp-feature-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin: 16px 0;
        }
        .sp-feature-desc {
          font-size: 15px;
          color: var(--text-2);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .sp-feature-bullets {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sp-feature-bullet {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .sp-feature-bullet-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: var(--green-light);
          color: var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .sp-feature-bullet-text {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.55;
        }

        /* Compare table */
        .sp-compare-row {
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid var(--border-light);
        }
        .sp-compare-row:last-child {
          border-bottom: none;
        }
        .sp-compare-label {
          flex: 0 0 180px;
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-3);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          background: var(--bg);
          display: flex;
          align-items: center;
        }
        .sp-compare-good {
          flex: 1;
          padding: 14px 16px;
          font-size: 13px;
          font-weight: 700;
          color: var(--green);
          background: var(--green-light);
          display: flex;
          align-items: center;
        }
        .sp-compare-bad {
          flex: 1;
          padding: 14px 16px;
          font-size: 13px;
          color: var(--text-3);
          background: var(--white);
          display: flex;
          align-items: center;
        }

        /* Cards */
        .sp-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 24px;
          transition:
            box-shadow 0.3s,
            transform 0.3s;
        }
        .sp-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
        .sp-card-sm {
          padding: 16px;
        }

        /* Specs */
        .sp-spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .sp-spec-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 20px;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .sp-spec-card:hover {
          box-shadow: var(--shadow);
        }
        .sp-spec-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-4);
          margin-bottom: 14px;
        }
        .sp-spec-value {
          font-size: 38px;
          font-weight: 900;
          color: var(--text-1);
          line-height: 1;
        }
        .sp-spec-unit {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-3);
          margin-left: 2px;
        }
        .sp-spec-sub {
          font-size: 12px;
          color: var(--text-4);
          margin-top: 8px;
        }

        /* Secrets */
        .sp-secret-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
        }
        .sp-secret-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--red);
        }
        .sp-secret-number {
          font-size: 48px;
          font-weight: 900;
          color: var(--red-light);
          position: absolute;
          top: 12px;
          right: 16px;
          line-height: 1;
        }
        .sp-secret-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-1);
          margin-bottom: 10px;
        }
        .sp-secret-text {
          font-size: 13px;
          color: var(--text-2);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .sp-secret-diff {
          padding: 12px 14px;
          border-radius: var(--radius-xs);
          background: var(--green-light);
          border: 1px solid rgba(46, 125, 50, 0.1);
        }
        .sp-secret-diff-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .sp-secret-diff-text {
          font-size: 12px;
          color: var(--green);
          font-weight: 600;
          line-height: 1.5;
        }

        /* Protection grid */
        .sp-prot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
        }
        .sp-prot-item {
          padding: 20px 14px;
          border-radius: var(--radius);
          text-align: center;
          transition: transform 0.3s;
        }
        .sp-prot-item:hover {
          transform: translateY(-3px);
        }
        .sp-prot-item.yes {
          background: var(--green-light);
          border: 1px solid rgba(46, 125, 50, 0.1);
        }
        .sp-prot-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .sp-prot-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-1);
        }
        .sp-prot-status {
          font-size: 10px;
          margin-top: 4px;
          font-weight: 600;
          color: var(--green);
        }

        /* LED */
        .sp-led-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .sp-led-circle-outer {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.6s;
        }
        .sp-led-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.5s;
        }
        .sp-led-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .sp-led-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--white);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-2);
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
        }
        .sp-led-tab.active {
          border-color: currentColor;
        }
        .sp-led-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Component row */
        .sp-component-row {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 20px;
          flex-wrap: wrap;
        }
        .sp-component-card {
          width: 280px;
          padding: 32px 24px;
          border-radius: var(--radius);
          background: var(--white);
          border: 1px solid var(--border);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sp-component-card .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }
        .sp-component-plus {
          display: flex;
          align-items: center;
          font-size: 28px;
          color: var(--text-4);
          font-weight: 300;
        }

        /* VS layout */
        .sp-vs-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: start;
        }
        .sp-vs-side {
          padding: 32px 24px;
          border-radius: var(--radius);
        }
        .sp-vs-old {
          background: var(--bg);
          border: 1px solid var(--border);
        }
        .sp-vs-new {
          background: var(--white);
          border: 2px solid var(--red);
          box-shadow: 0 4px 30px var(--red-glow);
        }
        .sp-vs-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 900;
          color: var(--text-4);
          padding-top: 100px;
        }
        .sp-vs-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sp-vs-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sp-vs-list :global(li) {
          font-size: 13px;
          line-height: 1.5;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .sp-vs-list :global(li::before) {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .sp-vs-old .sp-vs-list :global(li::before) {
          content: "✗";
          color: var(--red);
          font-weight: 700;
        }
        .sp-vs-new .sp-vs-list :global(li::before) {
          content: "✓";
          color: var(--green);
          font-weight: 700;
        }

        /* Cost */
        .sp-cost-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .sp-cost-card {
          padding: 28px 20px;
          border-radius: var(--radius);
          text-align: center;
        }
        .sp-cost-card.loss {
          background: var(--red-light);
          border: 1px solid rgba(229, 57, 53, 0.1);
        }
        .sp-cost-card.loss .sp-cost-amount {
          color: var(--red);
        }
        .sp-cost-card.save {
          background: var(--green-light);
          border: 1px solid rgba(46, 125, 50, 0.1);
        }
        .sp-cost-card.save .sp-cost-amount {
          color: var(--green);
        }
        .sp-cost-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-3);
          margin-bottom: 8px;
        }
        .sp-cost-amount {
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
        }
        .sp-cost-sub {
          font-size: 12px;
          color: var(--text-3);
          margin-top: 6px;
        }

        /* Badges */
        .sp-client-badge {
          display: inline-flex;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          background: var(--bg);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-2);
        }
        .sp-cert-badge {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: var(--radius-xs);
          background: var(--red-light);
          border: 1px solid rgba(229, 57, 53, 0.1);
          font-size: 11px;
          font-weight: 700;
          color: var(--red);
        }

        /* Audience tabs */
        .sp-audience-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .sp-audience-tab {
          padding: 10px 24px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border);
          background: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          color: var(--text-2);
          font-family: inherit;
        }
        .sp-audience-tab.active {
          background: var(--red);
          color: white;
          border-color: var(--red);
        }

        /* FAQ */
        .sp-faq-item {
          border-bottom: 1px solid var(--border-light);
          padding: 20px 0;
          cursor: pointer;
        }
        .sp-faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-1);
        }
        .sp-faq-toggle {
          font-size: 20px;
          color: var(--text-4);
          transition: transform 0.3s;
          flex-shrink: 0;
          margin-left: 16px;
        }
        .sp-faq-item.open .sp-faq-toggle {
          transform: rotate(45deg);
        }
        .sp-faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sp-faq-item.open .sp-faq-a {
          max-height: 400px;
        }
        .sp-faq-a-text {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.7;
          padding-top: 12px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sp-hero-inner {
            flex-direction: column-reverse;
            text-align: center;
          }
          .sp-hero-stats {
            justify-content: center;
          }
          .sp-hero-desc {
            margin: 0 auto 32px;
          }
          .sp-range-tabs {
            justify-content: center;
          }
          .sp-feature-block,
          .sp-feature-block.reverse {
            flex-direction: column;
          }
          .sp-vs-container {
            grid-template-columns: 1fr;
          }
          .sp-vs-divider {
            padding-top: 0;
          }
          .sp-compare-label {
            flex: 0 0 100px;
            font-size: 10px;
          }
          .sp-section {
            padding: 60px 24px;
          }
          .sp-open-panel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
