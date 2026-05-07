"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Subtech Ki Pathshala — full client page
   Ported from pathshala.php
   ============================================================ */

type ErrorEntry = { fault: string; cause: string; fix: string; extra?: string };

const PK_ERROR_DB: Record<string, ErrorEntry> = {
  E01: {
    fault: "Overload Trip",
    cause:
      "Motor current exceeded the set overload limit. Load too high or motor too small for the application.",
    fix: "Check motor load. Reduce mechanical load or increase overload setpoint in MPU. Wait for motor to cool before restarting.",
    extra: "Auto-reset after cooling period unless locked out.",
  },
  E02: {
    fault: "Single Phase / Phase Failure",
    cause:
      "One of the three supply phases has failed or dropped below threshold. Blown fuse, loose connection, or upstream fault.",
    fix: "Check all 3 phases at incomer. Check fuses and connections. Restore supply phase before restarting.",
    extra: "Motor will not start in single phasing condition.",
  },
  E03: {
    fault: "Under Voltage",
    cause:
      "Supply voltage below the set minimum limit (default ~250V). Grid voltage dropped or long cable run causing voltage drop.",
    fix: "Check supply voltage at panel terminals. Increase cable size or contact electricity board for low voltage complaint.",
    extra: "Panel auto-restarts when voltage recovers.",
  },
  E04: {
    fault: "Over Voltage",
    cause:
      "Supply voltage exceeded the set maximum limit (default ~495V). Possible neutral displacement or upstream surge.",
    fix: "Check voltage at incomer. Check neutral connections. Install surge protection if recurrent.",
    extra: "Motor protected until voltage normalizes.",
  },
  E05: {
    fault: "Voltage Unbalance",
    cause:
      "Difference between phases exceeds 5%. Unequal loading on phases, loose connection, or supply issue.",
    fix: "Measure all 3 phase voltages. Check and tighten all connections. Report to electricity board if supply-side issue.",
    extra: "Sustained unbalance above 5% can cause overheating.",
  },
  E06: {
    fault: "Reverse Phase",
    cause:
      "Phase sequence detected as R-B-Y instead of correct R-Y-B. Can cause motor to rotate in wrong direction.",
    fix: "Swap any two supply phases at incomer. Verify with phase sequence meter.",
    extra: "Motor will not start. Prevents reverse rotation damage.",
  },
  OL: {
    fault: "Overload",
    cause: "Motor drawing excess current beyond set limit.",
    fix: "Reduce load. Check for mechanical jamming. Verify overload setpoint in MPU matches motor nameplate current.",
    extra: "Check motor nameplate FLC and match with MPU setting.",
  },
  PF: {
    fault: "Phase Failure",
    cause: "One phase completely absent.",
    fix: "Restore the missing phase. Check upstream MCB/fuses. Panel will restart automatically when all 3 phases return.",
    extra: "Operating on 2 phases severely damages motor windings.",
  },
  UV: {
    fault: "Under Voltage",
    cause: "Voltage below minimum limit.",
    fix: "Check grid supply voltage. Ensure proper cable sizing to avoid voltage drop over distance.",
    extra: "Common in areas with low voltage or peak load hours.",
  },
  OV: {
    fault: "Over Voltage",
    cause: "Voltage above maximum limit.",
    fix: "Check incomer voltage. Neutral earthing issue can cause phase-to-neutral voltage spikes.",
    extra: "Protects motor windings from insulation damage.",
  },
  DR: {
    fault: "Dry Run Protection",
    cause:
      "Pump running without water. Water source empty, suction pipe blocked, or pressure switch not detecting pressure.",
    fix: "Check water source level. Check suction pipe for blockage or air lock. Verify pressure switch connection and setpoint.",
    extra: "Panel waits for preset dry run restart delay before retry.",
  },
  RP: {
    fault: "Reverse Phase",
    cause: "Wrong phase sequence.",
    fix: "Swap any two input phase wires at the incomer MCB terminals. Do not swap at motor terminals.",
    extra: "Always verify with test run after correcting phase sequence.",
  },
};

const QUICK_CODES = ["E01", "E02", "E03", "E04", "E05", "E06", "OL", "PF", "UV", "OV", "DR", "RP"];

const GLOSSARY: { term: string; def: string }[] = [
  { term: "DOL Starter", def: "Direct Online Starter. Motor ko seedha supply se connect karta hai. Small motors (up to 7.5 HP) ke liye." },
  { term: "Star-Delta", def: "Motor starting method for large motors (above 10 HP). Star mein start, delta mein run. Inrush current kam karta hai." },
  { term: "MPU", def: "Motor Protection Unit. Subtech ka digital brain jo overload, phase fail, dry run sab detect karta hai." },
  { term: "PMC", def: "Pre Magnetic Contactor. Subtech ka patented switch. Coil nahi jalti. 1000+ hours continuous run possible." },
  { term: "VFD", def: "Variable Frequency Drive. Motor ki speed control karta hai frequency change karke. Energy efficient." },
  { term: "Overload", def: "Jab motor rated current se zyada current kheenche. Motor overheat ho ke jal sakti hai." },
  { term: "Single Phasing", def: "3-phase supply mein se ek phase band hona. Motor sirf 2 phase pe chale — bahut dangerous." },
  { term: "Dry Run", def: "Pump bina paani ke chalti rahe. Motor overheat ho jaati hai. Subtech panel isko detect karke band kar deta hai." },
  { term: "AMF Panel", def: "Automatic Mains Failure panel. Mains band hote hi DG automatically start ho jaata hai." },
  { term: "ATS", def: "Automatic Transfer Switch. Power source switch karta hai — mains se DG ya solar pe automatically." },
  { term: "IP Rating", def: "Ingress Protection. Panel ke enclosure ki rating. IP54 = dust protected and splash resistant." },
  { term: "Contactor", def: "Electrically controlled switch for motors. AC coil se operate hota hai. Cheap ones jal jaate hain." },
  { term: "Thermal Relay (OLR)", def: "Bimetallic strip se overload detect karta hai. Temperature ke saath accuracy change hoti hai — MPU better hai." },
  { term: "Busbar", def: "Panel ke andar copper ka thick conductor. Current le jaata hai. Thin busbar = zyada heat = risk." },
  { term: "MCCB", def: "Moulded Case Circuit Breaker. Short circuit pe automatically trip karta hai. MCB se zyada capacity." },
  { term: "Phase Sequence", def: "3-phase mein phase ka order (R-Y-B). Wrong sequence se motor ulta ghoomta hai — motor damage ho sakti hai." },
  { term: "Voltage Unbalance", def: "Teen phases mein voltage alag hona. 5% se zyada unbalance motor ke liye harmful hai." },
  { term: "Power Factor", def: "Actual power aur apparent power ka ratio. Inductive loads (motors) ka PF low hota hai. APFC se improve hota hai." },
  { term: "APFC Panel", def: "Automatic Power Factor Correction. Capacitors automatically connect/disconnect karke PF 0.95+ pe rakho." },
  { term: "MCC Panel", def: "Motor Control Centre. Multiple motors ek hi panel se control aur protect karta hai." },
];

const REELS = [
  {
    embed: "https://www.instagram.com/reel/DViy9XSDznH/embed/",
    link: "https://www.instagram.com/reel/DViy9XSDznH/?igsh=MWwwb28wOHVuN2hm",
    tag: "Motor Protection",
    title: "Motor Kyu Jalti Hai?",
    desc: "Real reasons behind motor failure in India. From single phasing to overloading — understand the root causes and how Subtech panels prevent them.",
  },
  {
    embed: "https://www.instagram.com/reel/DWlVe-CkT-F/embed/",
    link: "https://www.instagram.com/reel/DWlVe-CkT-F/?igsh=NTJ1ZnA3ZGpyaWc=",
    tag: "Panel Selection",
    title: "Sahi Panel Kaise Chunein? Complete Guide",
    desc: "DOL, Star-Delta, ya VFD — kaunsa panel aapke motor ke liye sahi hai? subtech ka simple explanation with real product examples.",
  },
  {
    embed: "https://www.instagram.com/reel/DWJZBiDj9Sz/embed/",
    link: "https://www.instagram.com/reel/DWJZBiDj9Sz/?igsh=MThybGF4d2MzbGNleA==",
    tag: "Electrical Safety",
    title: "Panel Ke Andar Kya Hota Hai?",
    desc: "Inside a Subtech panel — components, quality, and why cheap panels fail. A direct explanation from the subtech with real product visuals.",
  },
];

export default function PathshalaClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    root.querySelectorAll(".pk-fade").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Error code lookup ── */
  const [errorInput, setErrorInput] = useState("");
  const [errorResult, setErrorResult] = useState<{
    code: string;
    found: boolean;
    fault: string;
    cause: string;
    fix: string;
    extra: string;
  } | null>(null);

  const lookupError = (raw?: string) => {
    const code = (raw ?? errorInput).trim().toUpperCase();
    if (!code) return;
    const data = PK_ERROR_DB[code];
    if (data) {
      setErrorResult({
        code,
        found: true,
        fault: data.fault,
        cause: data.cause,
        fix: data.fix,
        extra: data.extra ? `ℹ ${data.extra}` : "",
      });
    } else {
      setErrorResult({
        code,
        found: false,
        fault: "Code Not Found",
        cause: "This code is not in our database. Please check your MPU manual for the specific model.",
        fix: "Call Subtech support: 8506060580 or WhatsApp with your panel model number.",
        extra: "",
      });
    }
  };

  /* ── HP/kW converter ── */
  const [hpVal, setHpVal] = useState("10");
  const [hpUnit, setHpUnit] = useState<"hp" | "kw">("hp");
  const hpResult = (() => {
    const v = parseFloat(hpVal);
    if (isNaN(v) || v <= 0) return { val: "-", unit: "kW", note: "Enter a value" };
    if (hpUnit === "hp") {
      const kW = v * 0.7457;
      const flc = ((kW * 1000) / (1.732 * 415 * 0.85)).toFixed(1);
      return {
        val: kW.toFixed(2),
        unit: "kW",
        note: `${v} HP = ${kW.toFixed(2)} kW. At 415V 3-phase, FLC approx. ${flc} A (at 0.85 PF).`,
      };
    }
    const hp = v / 0.7457;
    return { val: hp.toFixed(2), unit: "HP", note: `${v} kW = ${hp.toFixed(2)} HP.` };
  })();

  /* ── FLC calculator ── */
  const [flcHp, setFlcHp] = useState("");
  const [flcPhase, setFlcPhase] = useState<"3" | "1">("3");
  const flcResult = (() => {
    const hp = parseFloat(flcHp);
    if (isNaN(hp) || hp <= 0)
      return { val: "-", note: "Enter motor HP to calculate FLC" };
    const kw = hp * 0.7457;
    if (flcPhase === "3") {
      const flc = ((kw * 1000) / (1.732 * 415 * 0.85)).toFixed(1);
      return {
        val: flc,
        note: "At 415V 3-Phase, PF 0.85, efficiency 90%. Set OLR/MPU overload to this value.",
      };
    }
    const flc = ((kw * 1000) / (230 * 0.85)).toFixed(1);
    return { val: flc, note: "At 230V Single-Phase, PF 0.85, efficiency 90%." };
  })();

  /* ── ROI ── */
  const [roiHp, setRoiHp] = useState("");
  const [roiHrs, setRoiHrs] = useState("");
  const roiResult = (() => {
    const hp = parseFloat(roiHp);
    const hrs = parseFloat(roiHrs);
    if (isNaN(hp) || isNaN(hrs) || hp <= 0 || hrs <= 0) return null;
    const burnCost = Math.max(15000, Math.round(15000 + (hp - 5) * 2000));
    const panelCost = hp <= 5 ? 5500 : hp <= 10 ? 7000 : hp <= 20 ? 12000 : 20000;
    const totalLoss = burnCost + Math.round(hrs * 1200) + 3500;
    const saving = totalLoss - panelCost;
    return {
      burnCost: `Rs ${burnCost.toLocaleString("en-IN")}`,
      panelCost: `Rs ${panelCost.toLocaleString("en-IN")}`,
      conclusion: `Panel ${Math.ceil((panelCost / totalLoss) * 100)}% of one motor burn cost. Saves Rs ${saving.toLocaleString("en-IN")} per incident.`,
    };
  })();

  /* ── Panel selector ── */
  const [selHp, setSelHp] = useState("");
  const [selApp, setSelApp] = useState("");
  const selResult = (() => {
    const hp = parseFloat(selHp);
    if (isNaN(hp) || hp <= 0 || !selApp) return null;
    if (selApp === "generator")
      return {
        type: "AMF Panel",
        note: "Auto Mains Failure panel for DG set. Auto start on mains failure, auto stop on mains return.",
      };
    if (hp <= 1) return { type: "Single Phase DOL", note: "Up to 1 HP. With dry run and overload protection via MPU." };
    if (hp <= 7.5 && (selApp === "pump" || selApp === "agriculture"))
      return {
        type: "Three Phase DOL (Smart)",
        note: "Up to 7.5 HP pump. PMC + MPU with dry run, level controller interface.",
      };
    if (hp <= 20)
      return {
        type: "Three Phase DOL",
        note: "Up to 20 HP. Full 7-protection suite. PMC + MPU based.",
      };
    if (hp <= 100)
      return {
        type: "Star-Delta Starter",
        note: "10-100 HP. Reduced starting current. 3x PMC contactors for star and delta switching.",
      };
    return {
      type: "Star-Delta / VFD Panel",
      note: "Above 100 HP. VFD recommended for soft starting and energy savings. Contact our team for custom design.",
    };
  })();

  /* ── Glossary filter ── */
  const [glossQuery, setGlossQuery] = useState("");
  const filteredGloss = GLOSSARY.filter((g) => {
    if (!glossQuery) return true;
    const q = glossQuery.toLowerCase();
    return g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pk-wrap" ref={rootRef}>
      {/* HERO */}
      <section className="pk-hero">
        <div className="pk-hero-inner">
          <div className="pk-fade">
            <div className="pk-hero-badge">
              🎓 <span>Free for Everyone</span> Subtech Ki Pathshala
            </div>
            <div className="pk-hero-hindi">सुबटेक की पाठशाला</div>
            <h1 className="pk-h1">
              Seekho. Samjho.
              <br />
              <span className="pk-red">Protect Karo.</span>
            </h1>
            <p className="pk-hero-tagline">
              Free technical education for electricians, dealers, farmers and engineers. From error
              code lookup to motor ROI calculators, everything in one place.
            </p>
            <div className="pk-hero-ctas">
              <button className="pk-btn pk-btn-red" onClick={() => scrollTo("pk-videos")}>
                🎬 Watch Videos
              </button>
              <button className="pk-btn pk-btn-ghost" onClick={() => scrollTo("pk-error-tool")}>
                🔍 Error Code Lookup
              </button>
            </div>
            <div className="pk-hero-stats">
              <div>
                <div className="pk-hero-stat-val">4+</div>
                <div className="pk-hero-stat-lbl">Tools Available</div>
              </div>
              <div>
                <div className="pk-hero-stat-val">Free</div>
                <div className="pk-hero-stat-lbl">Always Free</div>
              </div>
              <div>
                <div className="pk-hero-stat-val">25+</div>
                <div className="pk-hero-stat-lbl">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS PATHSHALA */}
      <section className="pk-section pk-section-alt">
        <div className="pk-container">
          <div className="pk-center pk-section-head pk-fade">
            <div className="pk-label">About Pathshala</div>
            <h2 className="pk-h2">
              Everything You Need to Know.
              <br />
              <span className="pk-red">All in One Place.</span>
            </h2>
            <p className="pk-lead" style={{ marginTop: 12 }}>
              Motor jali kyu? Panel kab badalna chahiye? Kaunsa contactor sahi hai? Subtech ki
              Pathshala mein sab milega — free of cost.
            </p>
          </div>
          <div className="pk-what-grid">
            {[
              {
                ic: "🎬",
                t: "Video Tutorials",
                d: "subtech ke saath real panel education. Motor protection ke secrets explained simply.",
              },
              {
                ic: "🔍",
                t: "Error Code Lookup",
                d: "Type any MPU fault code, get cause and fix instantly. No manual needed.",
              },
              {
                ic: "🧮",
                t: "Calculators",
                d: "HP to kW, full load current, ROI calculator, panel type selector.",
              },
              {
                ic: "📚",
                t: "Glossary",
                d: "Simple definitions for every electrical term in Hindi and English. 20+ terms.",
              },
            ].map((c, i) => (
              <div className={`pk-what-card pk-fade pk-fade-d${i}`} key={c.t}>
                <div className="pk-what-card-icon">{c.ic}</div>
                <div className="pk-what-card-title">{c.t}</div>
                <div className="pk-what-card-sub">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="pk-videos-section" id="pk-videos">
        <div className="pk-videos-inner">
          <div className="pk-videos-head pk-fade">
            <h2 className="pk-h2">
              Motor Protection Ki
              <br />
              <span className="pk-red">Real Education.</span>
            </h2>
            <p className="pk-lead" style={{ marginTop: 12 }}>
              subtech seedha explain karte hain - kyu motor jalti hai, aur kaise bachate hain. Field
              se seedha aap tak.
            </p>
          </div>

          <div className="pk-videos-grid">
            {REELS.map((r, i) => (
              <div className={`pk-video-card pk-fade pk-fade-d${i}`} key={r.embed}>
                <div style={{ padding: "20px 20px 0" }}>
                  <div className="pk-reel-wrap">
                    <iframe
                      src={r.embed}
                      scrolling="no"
                      allowTransparency
                      allowFullScreen
                      loading="lazy"
                      title={`Subtech Pathshala Reel ${i + 1}`}
                    />
                  </div>
                </div>
                <div className="pk-video-info">
                  <div className="pk-video-tag">{r.tag}</div>
                  <div className="pk-video-title">{r.title}</div>
                  <div className="pk-video-desc">{r.desc}</div>
                  <div className="pk-video-meta">
                    <div className="pk-video-author">
                      <div className="pk-author-avatar">S</div>
                      <span>Subtech &nbsp;·&nbsp; Instagram Reel</span>
                    </div>
                  </div>
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="pk-ig-link">
                    📷 View on Instagram →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pk-videos-ig-cta pk-fade">
            <p>Aur videos dekhne ke liye Instagram follow karo</p>
            <a
              href="https://www.instagram.com/subtech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="pk-btn-ig"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @subtech.in - Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ERROR CODE LOOKUP */}
      <section className="pk-section pk-section-alt" id="pk-error-tool">
        <div className="pk-container">
          <div className="pk-center pk-section-head pk-fade">
            <div className="pk-label">Instant Tool</div>
            <h2 className="pk-h2">MPU Error Code Lookup</h2>
            <p className="pk-lead" style={{ marginTop: 12 }}>
              Panel mein red light aayi? Error code dekha? Type karo neeche — cause aur fix second
              mein milega.
            </p>
          </div>

          <div className="pk-fade">
            <div className="pk-error-wrap">
              <div className="pk-error-inner">
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "rgba(200,16,46,0.8)",
                    marginBottom: 8,
                  }}
                >
                  Error Code Finder
                </div>
                <h3
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.3px",
                  }}
                >
                  Konsa Error Aaya?
                </h3>
                <div className="pk-error-search">
                  <input
                    type="text"
                    value={errorInput}
                    placeholder="E01, OL, PF, UV ..."
                    onChange={(e) => setErrorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") lookupError();
                    }}
                  />
                  <button onClick={() => lookupError()}>🔍 Dhundo</button>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 12,
                  }}
                >
                  Common codes — click to try:
                </div>
                <div className="pk-quick-codes">
                  {QUICK_CODES.map((c) => (
                    <span
                      key={c}
                      className="pk-quick-code"
                      onClick={() => {
                        setErrorInput(c);
                        lookupError(c);
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {errorResult && (
                  <div
                    className={`pk-error-result show ${
                      errorResult.found ? "found" : "notfound"
                    }`}
                  >
                    <div className="pk-error-code-big">{errorResult.code}</div>
                    <div className="pk-error-fault">{errorResult.fault}</div>
                    <div className="pk-error-cols">
                      <div>
                        <div className="pk-error-col-title">🔎 Possible Cause</div>
                        <div className="pk-error-col-val">{errorResult.cause}</div>
                      </div>
                      <div>
                        <div className="pk-error-col-title">🔧 Recommended Fix</div>
                        <div className="pk-error-col-val">{errorResult.fix}</div>
                      </div>
                    </div>
                    {errorResult.extra && (
                      <div
                        style={{
                          marginTop: 16,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {errorResult.extra}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR TOOLS */}
      <section className="pk-section" id="pk-tools">
        <div className="pk-container">
          <div className="pk-center pk-section-head pk-fade">
            <div className="pk-label pk-label-blue">Smart Tools</div>
            <h2 className="pk-h2">
              Engineer Ki Toolkit.
              <br />
              <span className="pk-red">Sabke Liye Free.</span>
            </h2>
            <p className="pk-lead" style={{ marginTop: 12 }}>
              HP se kW karo, cable size nikalo, ya dekho Subtech panel kitne mein recover ho jaata
              hai.
            </p>
          </div>

          <div className="pk-tools-grid">
            {/* HP to kW */}
            <div className="pk-tool-card pk-fade">
              <div className="pk-tool-header">
                <div
                  className="pk-tool-icon-wrap"
                  style={{ background: "#eff6ff", color: "#1d4ed8" }}
                >
                  ⚡
                </div>
                <div>
                  <div className="pk-tool-name">HP to kW Converter</div>
                  <div className="pk-tool-desc">
                    Horsepower and kilowatt converter (both ways)
                  </div>
                </div>
              </div>
              <div className="pk-tool-body">
                <div className="pk-tool-row">
                  <div className="pk-input-group">
                    <label>Value</label>
                    <input
                      type="number"
                      value={hpVal}
                      placeholder="10"
                      onChange={(e) => setHpVal(e.target.value)}
                    />
                  </div>
                  <div className="pk-input-group">
                    <label>From</label>
                    <select
                      value={hpUnit}
                      onChange={(e) => setHpUnit(e.target.value as "hp" | "kw")}
                    >
                      <option value="hp">HP (Horsepower)</option>
                      <option value="kw">kW (Kilowatt)</option>
                    </select>
                  </div>
                </div>
                <div className="pk-tool-result">
                  <div className="pk-tool-result-label">Result</div>
                  <div>
                    <span className="pk-tool-result-val">{hpResult.val}</span>
                    <span className="pk-tool-result-unit">{hpResult.unit}</span>
                  </div>
                  <div className="pk-tool-result-note">{hpResult.note}</div>
                </div>
              </div>
            </div>

            {/* FLC */}
            <div className="pk-tool-card pk-fade pk-fade-d1">
              <div className="pk-tool-header">
                <div
                  className="pk-tool-icon-wrap"
                  style={{ background: "#f0fdf4", color: "#15803d" }}
                >
                  ⚡
                </div>
                <div>
                  <div className="pk-tool-name">Full Load Current (FLC)</div>
                  <div className="pk-tool-desc">Motor FLC for panel and cable sizing</div>
                </div>
              </div>
              <div className="pk-tool-body">
                <div className="pk-tool-row">
                  <div className="pk-input-group">
                    <label>Motor Power (HP)</label>
                    <input
                      type="number"
                      value={flcHp}
                      placeholder="10"
                      onChange={(e) => setFlcHp(e.target.value)}
                    />
                  </div>
                  <div className="pk-input-group">
                    <label>Phase</label>
                    <select
                      value={flcPhase}
                      onChange={(e) => setFlcPhase(e.target.value as "3" | "1")}
                    >
                      <option value="3">3-Phase (415V)</option>
                      <option value="1">1-Phase (230V)</option>
                    </select>
                  </div>
                </div>
                <div className="pk-tool-result">
                  <div className="pk-tool-result-label">Full Load Current</div>
                  <div>
                    <span className="pk-tool-result-val">{flcResult.val}</span>
                    <span className="pk-tool-result-unit">Ampere</span>
                  </div>
                  <div className="pk-tool-result-note">{flcResult.note}</div>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="pk-tool-card pk-fade pk-fade-d2">
              <div className="pk-tool-header">
                <div
                  className="pk-tool-icon-wrap"
                  style={{ background: "#fff5f5", color: "var(--red)" }}
                >
                  📈
                </div>
                <div>
                  <div className="pk-tool-name">Subtech ROI Calculator</div>
                  <div className="pk-tool-desc">Kitne mein recover hoga panel — dekho</div>
                </div>
              </div>
              <div className="pk-tool-body">
                <div className="pk-tool-row">
                  <div className="pk-input-group">
                    <label>Motor HP</label>
                    <input
                      type="number"
                      value={roiHp}
                      placeholder="10"
                      onChange={(e) => setRoiHp(e.target.value)}
                    />
                  </div>
                  <div className="pk-input-group">
                    <label>Usage (hrs/day)</label>
                    <input
                      type="number"
                      value={roiHrs}
                      placeholder="8"
                      onChange={(e) => setRoiHrs(e.target.value)}
                    />
                  </div>
                </div>
                {roiResult ? (
                  <div className="pk-roi-result show">
                    <div className="pk-roi-row">
                      <div className="pk-roi-box loss">
                        <div className="pk-roi-box-lbl">1 Motor Burn Cost</div>
                        <div className="pk-roi-box-val">{roiResult.burnCost}</div>
                      </div>
                      <div className="pk-roi-box save">
                        <div className="pk-roi-box-lbl">Subtech Panel Cost</div>
                        <div className="pk-roi-box-val">{roiResult.panelCost}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        padding: 12,
                        background: "var(--green-light)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid rgba(21,128,61,0.1)",
                        fontSize: 13,
                        color: "var(--green)",
                        fontWeight: 600,
                      }}
                    >
                      {roiResult.conclusion}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--gray-500)",
                      padding: "12px 0",
                    }}
                  >
                    Enter motor HP and daily usage to see ROI
                  </div>
                )}
              </div>
            </div>

            {/* Panel selector */}
            <div className="pk-tool-card pk-fade pk-fade-d3">
              <div className="pk-tool-header">
                <div
                  className="pk-tool-icon-wrap"
                  style={{ background: "#f5f3ff", color: "#7c3aed" }}
                >
                  🔌
                </div>
                <div>
                  <div className="pk-tool-name">Panel Type Selector</div>
                  <div className="pk-tool-desc">
                    Kaunsa panel sahi hai aapke motor ke liye
                  </div>
                </div>
              </div>
              <div className="pk-tool-body">
                <div className="pk-tool-row">
                  <div className="pk-input-group">
                    <label>Motor HP</label>
                    <input
                      type="number"
                      value={selHp}
                      placeholder="15"
                      onChange={(e) => setSelHp(e.target.value)}
                    />
                  </div>
                  <div className="pk-input-group">
                    <label>Application</label>
                    <select value={selApp} onChange={(e) => setSelApp(e.target.value)}>
                      <option value="">Select...</option>
                      <option value="pump">Water Pump</option>
                      <option value="industrial">Industrial Motor</option>
                      <option value="agriculture">Agriculture Pump</option>
                      <option value="generator">DG / Generator</option>
                    </select>
                  </div>
                </div>
                {selResult ? (
                  <div className="pk-tool-result">
                    <div className="pk-tool-result-label">Recommended Panel</div>
                    <div className="pk-tool-result-val" style={{ fontSize: 20 }}>
                      {selResult.type}
                    </div>
                    <div className="pk-tool-result-note">{selResult.note}</div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--gray-500)",
                      padding: "12px 0",
                    }}
                  >
                    Select HP and application type
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="pk-section pk-section-alt" id="pk-glossary">
        <div className="pk-container">
          <div className="pk-center pk-section-head pk-fade">
            <div className="pk-label pk-label-amber">Glossary</div>
            <h2 className="pk-h2">
              Electrical Terms
              <br />
              <span className="pk-red">Simply Explained.</span>
            </h2>
            <p className="pk-lead" style={{ marginTop: 12 }}>
              Technical words in simple Hindi and English. 20+ terms from the field.
            </p>
          </div>

          <div className="pk-gloss-search-wrap pk-fade">
            <div className="pk-gloss-search">
              <input
                type="text"
                value={glossQuery}
                placeholder="Search: DOL, VFD, contactor, overload ..."
                onChange={(e) => setGlossQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="pk-gloss-grid">
            {filteredGloss.map((g) => (
              <div className="pk-gloss-item pk-fade" key={g.term}>
                <div className="pk-gloss-term">{g.term}</div>
                <div className="pk-gloss-def">{g.def}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="pk-cta-strip">
        <div className="pk-container">
          <h2>Aur Kuch Sikhna Hai?</h2>
          <p>
            Call karo ya WhatsApp karo. Our technical team is available Mon-Sat, 9 AM to 6 PM.
          </p>
          <div className="pk-cta-btns">
            <a href="tel:+918506060580" className="pk-btn pk-btn-white">
              📞 Call Now: 8506060580
            </a>
            <a
              href="https://wa.me/918506060580?text=Pathshala%20se%20question%20hai"
              className="pk-btn pk-btn-border"
            >
              💬 WhatsApp Karo
            </a>
          </div>
        </div>
      </div>

      {/* Reset globals.css h1/h2/h3/p inside this page */}
      <style jsx global>{`
        .pk-wrap h1,
        .pk-wrap h2,
        .pk-wrap h3,
        .pk-wrap h4,
        .pk-wrap p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
      `}</style>

      <style jsx>{`
        .pk-wrap {
          --red: #c8102e;
          --red-dark: #9b0c22;
          --red-light: #fff5f5;
          --red-mid: rgba(200, 16, 46, 0.08);
          --dark: #111111;
          --gray-900: #1a1a1a;
          --gray-700: #404040;
          --gray-500: #6b6b6b;
          --gray-300: #d4d4d4;
          --gray-100: #f5f5f5;
          --white: #ffffff;
          --green: #15803d;
          --green-light: #f0fdf4;
          --amber: #b45309;
          --amber-light: #fffbeb;
          --blue: #1d4ed8;
          --blue-light: #eff6ff;
          --purple: #7c3aed;
          --purple-light: #f5f3ff;
          --border: #e5e7eb;
          --radius: 14px;
          --radius-sm: 8px;
          --shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 4px 16px rgba(0, 0, 0, 0.04);
          --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.08);
          --max-w: 1120px;

          color: var(--gray-900);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
        }
        .pk-wrap :global(*),
        .pk-wrap :global(*::before),
        .pk-wrap :global(*::after) {
          box-sizing: border-box;
        }
        .pk-wrap :global(a) {
          color: inherit;
          text-decoration: none;
        }
        .pk-wrap :global(img) {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .pk-container {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 24px;
        }
        .pk-section {
          padding: 88px 24px;
        }
        .pk-section-alt {
          background: var(--gray-100);
        }

        /* fade */
        .pk-wrap :global(.pk-fade) {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease;
        }
        .pk-wrap :global(.pk-fade.visible) {
          opacity: 1;
          transform: none;
        }
        .pk-wrap :global(.pk-fade-d1) {
          transition-delay: 0.08s;
        }
        .pk-wrap :global(.pk-fade-d2) {
          transition-delay: 0.16s;
        }
        .pk-wrap :global(.pk-fade-d3) {
          transition-delay: 0.24s;
        }
        .pk-wrap :global(.pk-fade-d4) {
          transition-delay: 0.32s;
        }

        /* labels */
        .pk-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
          color: var(--red);
          background: var(--red-light);
          border: 1px solid rgba(200, 16, 46, 0.12);
        }
        .pk-label::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }
        .pk-label-blue {
          color: var(--blue);
          background: var(--blue-light);
          border-color: rgba(29, 78, 216, 0.12);
        }
        .pk-label-amber {
          color: var(--amber);
          background: var(--amber-light);
          border-color: rgba(180, 83, 9, 0.12);
        }

        /* headings */
        .pk-h1 {
          font-size: clamp(36px, 5.5vw, 60px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1.5px;
        }
        .pk-h2 {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.8px;
        }
        .pk-lead {
          font-size: 17px;
          font-weight: 300;
          color: var(--gray-500);
          line-height: 1.75;
          max-width: 560px;
        }
        .pk-center {
          text-align: center;
        }
        .pk-center .pk-lead {
          margin: 0 auto;
        }
        .pk-red {
          color: var(--red);
        }
        .pk-section-head {
          margin-bottom: 48px;
        }

        /* button */
        .pk-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 26px;
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          text-decoration: none;
        }
        .pk-btn-red {
          background: var(--red);
          color: #fff;
        }
        .pk-btn-red:hover {
          background: var(--red-dark);
          transform: translateY(-1px);
          color: #fff;
        }
        .pk-btn-ghost {
          background: transparent;
          color: var(--gray-900);
          border: 1.5px solid var(--border);
        }
        .pk-btn-ghost:hover {
          border-color: var(--gray-900);
          transform: translateY(-1px);
        }

        /* hero */
        .pk-hero {
          padding: 110px 24px 80px;
          background: radial-gradient(
            ellipse 75% 55% at 50% 0%,
            rgba(200, 16, 46, 0.07) 0%,
            rgba(200, 16, 46, 0.02) 55%,
            #fff 100%
          );
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .pk-hero-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        .pk-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 30px;
          background: var(--red);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .pk-hero-badge :global(span) {
          opacity: 0.7;
        }
        .pk-hero-hindi {
          font-size: 15px;
          font-weight: 500;
          color: var(--gray-500);
          margin-bottom: 10px;
        }
        .pk-hero-tagline {
          font-size: 14px;
          color: var(--gray-500);
          margin: 20px 0 32px;
          line-height: 1.6;
        }
        .pk-hero-stats {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }
        .pk-hero-stat-val {
          font-size: 28px;
          font-weight: 800;
          color: var(--red);
          line-height: 1;
        }
        .pk-hero-stat-lbl {
          font-size: 12px;
          color: var(--gray-500);
          margin-top: 3px;
        }
        .pk-hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* what-grid */
        .pk-what-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }
        .pk-what-card {
          padding: 28px 20px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--white);
          text-align: center;
          transition: all 0.25s;
        }
        .pk-what-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
          border-color: rgba(200, 16, 46, 0.2);
        }
        .pk-what-card-icon {
          font-size: 36px;
          margin-bottom: 14px;
        }
        .pk-what-card-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 6px;
        }
        .pk-what-card-sub {
          font-size: 13px;
          color: var(--gray-500);
          line-height: 1.6;
        }

        /* videos */
        .pk-videos-section {
          padding: 88px 24px;
          background: var(--dark);
          position: relative;
          overflow: hidden;
        }
        .pk-videos-section::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -120px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 16, 46, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .pk-videos-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .pk-videos-head {
          margin-bottom: 48px;
        }
        .pk-videos-head .pk-h2 {
          color: #fff;
        }
        .pk-videos-head .pk-lead {
          color: rgba(255, 255, 255, 0.5);
        }
        .pk-videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: start;
        }
        .pk-video-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          transition:
            border-color 0.25s,
            transform 0.25s;
        }
        .pk-video-card:hover {
          border-color: rgba(200, 16, 46, 0.4);
          transform: translateY(-4px);
        }
        .pk-reel-wrap {
          position: relative;
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
          aspect-ratio: 9 / 16;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
        }
        .pk-reel-wrap :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .pk-video-info {
          padding: 22px 24px 26px;
        }
        .pk-video-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(200, 16, 46, 0.9);
          margin-bottom: 10px;
        }
        .pk-video-tag::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--red);
        }
        .pk-video-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .pk-video-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.65;
          margin-bottom: 16px;
        }
        .pk-video-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
        }
        .pk-video-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pk-author-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .pk-ig-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition:
            background 0.2s,
            color 0.2s;
          margin-top: 14px;
        }
        .pk-ig-link:hover {
          background: rgba(200, 16, 46, 0.2);
          border-color: rgba(200, 16, 46, 0.4);
          color: #fff;
        }
        .pk-videos-ig-cta {
          text-align: center;
          margin-top: 44px;
          padding-top: 36px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pk-videos-ig-cta :global(p) {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 16px;
        }
        .pk-btn-ig {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition:
            opacity 0.2s,
            transform 0.2s;
        }
        .pk-btn-ig:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          color: #fff;
        }

        /* error code */
        .pk-error-wrap {
          background: var(--dark);
          border-radius: 20px;
          padding: 56px;
          position: relative;
          overflow: hidden;
        }
        .pk-error-wrap::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(200, 16, 46, 0.25) 0%, transparent 70%);
        }
        .pk-error-inner {
          max-width: 680px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .pk-error-search {
          display: flex;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          overflow: hidden;
          align-items: stretch;
          margin: 28px 0;
        }
        .pk-error-search :global(input) {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 16px 20px;
          font-family: inherit;
          font-size: 16px;
          color: #fff;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .pk-error-search :global(input::placeholder) {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 400;
          letter-spacing: 0;
        }
        .pk-error-search :global(button) {
          padding: 16px 28px;
          background: var(--red);
          border: none;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .pk-error-search :global(button:hover) {
          background: var(--red-dark);
        }
        .pk-error-result {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 24px;
          display: none;
        }
        .pk-error-result.show {
          display: block;
        }
        .pk-error-result.found {
          border-color: rgba(21, 128, 61, 0.4);
          background: rgba(21, 128, 61, 0.07);
        }
        .pk-error-result.notfound {
          border-color: rgba(200, 16, 46, 0.3);
        }
        .pk-error-code-big {
          font-size: 32px;
          font-weight: 900;
          color: var(--red);
          margin-bottom: 6px;
        }
        .pk-error-fault {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }
        .pk-error-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        .pk-error-col-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 8px;
        }
        .pk-error-col-val {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.65;
        }
        .pk-quick-codes {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .pk-quick-code {
          padding: 6px 14px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s;
        }
        .pk-quick-code:hover {
          background: rgba(200, 16, 46, 0.2);
          border-color: rgba(200, 16, 46, 0.4);
          color: #fff;
        }

        /* tools */
        .pk-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .pk-tool-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .pk-tool-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pk-tool-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .pk-tool-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
        }
        .pk-tool-desc {
          font-size: 12px;
          color: var(--gray-500);
          margin-top: 2px;
        }
        .pk-tool-body {
          padding: 24px;
        }
        .pk-tool-row {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .pk-input-group {
          flex: 1;
          min-width: 120px;
        }
        .pk-input-group :global(label) {
          font-size: 11px;
          font-weight: 700;
          color: var(--gray-500);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .pk-input-group :global(input),
        .pk-input-group :global(select) {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 14px;
          color: var(--dark);
          outline: none;
          transition: border-color 0.2s;
          background: var(--white);
        }
        .pk-input-group :global(input:focus),
        .pk-input-group :global(select:focus) {
          border-color: var(--red);
        }
        .pk-tool-result {
          padding: 16px;
          border-radius: var(--radius-sm);
          background: var(--gray-100);
          border: 1px solid var(--border);
          margin-top: 4px;
        }
        .pk-tool-result-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--gray-500);
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .pk-tool-result-val {
          font-size: 28px;
          font-weight: 800;
          color: var(--red);
          line-height: 1;
        }
        .pk-tool-result-unit {
          font-size: 14px;
          color: var(--gray-500);
          margin-left: 4px;
        }
        .pk-tool-result-note {
          font-size: 12px;
          color: var(--gray-500);
          margin-top: 8px;
          line-height: 1.5;
        }

        /* roi */
        .pk-roi-result.show {
          display: block;
        }
        .pk-roi-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }
        .pk-roi-box {
          padding: 14px;
          border-radius: var(--radius-sm);
          text-align: center;
        }
        .pk-roi-box.loss {
          background: #fff5f5;
          border: 1px solid rgba(200, 16, 46, 0.1);
        }
        .pk-roi-box.save {
          background: var(--green-light);
          border: 1px solid rgba(21, 128, 61, 0.1);
        }
        .pk-roi-box-lbl {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gray-500);
          margin-bottom: 4px;
        }
        .pk-roi-box-val {
          font-size: 20px;
          font-weight: 800;
        }
        .pk-roi-box.loss .pk-roi-box-val {
          color: var(--red);
        }
        .pk-roi-box.save .pk-roi-box-val {
          color: var(--green);
        }

        /* glossary */
        .pk-gloss-search-wrap {
          max-width: 480px;
          margin: 0 auto 36px;
        }
        .pk-gloss-search {
          display: flex;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          align-items: stretch;
        }
        .pk-gloss-search :global(input) {
          flex: 1;
          padding: 13px 18px;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 15px;
          color: var(--dark);
          background: var(--white);
        }
        .pk-gloss-search :global(input::placeholder) {
          color: var(--gray-300);
        }
        .pk-gloss-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }
        .pk-gloss-item {
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--white);
          transition: border-color 0.2s;
        }
        .pk-gloss-item:hover {
          border-color: rgba(200, 16, 46, 0.25);
        }
        .pk-gloss-term {
          font-size: 14px;
          font-weight: 700;
          color: var(--red);
          margin-bottom: 6px;
        }
        .pk-gloss-def {
          font-size: 13px;
          color: var(--gray-700);
          line-height: 1.65;
        }

        /* cta */
        .pk-cta-strip {
          background: var(--red);
          padding: 56px 24px;
          text-align: center;
        }
        .pk-cta-strip :global(h2) {
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }
        .pk-cta-strip :global(p) {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.75);
          max-width: 480px;
          margin: 0 auto 28px;
          font-weight: 300;
        }
        .pk-cta-btns {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .pk-cta-strip .pk-btn-white {
          background: #fff;
          color: var(--red);
          font-weight: 700;
        }
        .pk-cta-strip .pk-btn-white:hover {
          background: var(--red-light);
          transform: translateY(-1px);
        }
        .pk-cta-strip .pk-btn-border {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
        }
        .pk-cta-strip .pk-btn-border:hover {
          border-color: #fff;
          transform: translateY(-1px);
        }

        /* responsive */
        @media (max-width: 1024px) {
          .pk-videos-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 900px) {
          .pk-error-cols {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .pk-section {
            padding: 60px 24px;
          }
          .pk-error-wrap {
            padding: 32px 24px;
          }
          .pk-tools-grid {
            grid-template-columns: 1fr;
          }
          .pk-videos-section {
            padding: 60px 24px;
          }
          .pk-videos-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
