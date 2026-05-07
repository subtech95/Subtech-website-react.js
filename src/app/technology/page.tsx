import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technology | MPU, PMC & Smart Motor Control | Subtech",
  description:
    "Explore Subtech's proprietary motor protection technologies — MPU (Motor Protection Unit), PMC (Pre-Magnetic Contactor), Smart Motor Control Panel, and Command Center IoT platform.",
  alternates: { canonical: "https://subtech.in/technology" },
  openGraph: {
    type: "website",
    title: "Subtech Technology — MPU, PMC, Smart Motor Control",
    description:
      "Two proprietary technologies. One smart panel. Built different. Engineered better.",
    url: "https://subtech.in/technology",
    siteName: "Subtech",
  },
};

const techCards = [
  {
    href: "/products/mpu",
    eyebrow: "Technology 01",
    title: "MPU",
    fullName: "Motor Protection Unit",
    desc: "Microcontroller-based digital unit. Replaces 6 conventional starter components with 1 intelligent module. 7 built-in protections.",
    specs: [
      ["Voltage Range", "200–480 VAC"],
      ["Protections", "7 functions"],
      ["Replaces", "6 parts"],
      ["Display", "Digital V/A/Hrs"],
    ],
    accent: "#C8102E",
  },
  {
    href: "/products/pmc",
    eyebrow: "Technology 02",
    title: "PMC",
    fullName: "Pre-Magnetic Contactor",
    desc: "DC-coil switching technology. Zero coil burning. No contact chattering. Powerless instant switching across wide voltage range.",
    specs: [
      ["Coil Voltage", "20–28 VDC"],
      ["Current Range", "Up to 150 A"],
      ["Coil Burning", "Zero probability"],
      ["Warranty", "5 years"],
    ],
    accent: "#C8102E",
  },
  {
    href: "/smart-motor-control-panel",
    eyebrow: "Integrated Solution",
    title: "Smart Motor Control Panel",
    fullName: "MPU + PMC + MCB → 1 panel",
    desc: "Three components, integrated. 7 built-in motor protections. PMC powerless switching. 1000+ hours continuous run. Used by GAIL, NTPC, DMRC.",
    specs: [
      ["Voltage Range", "250–495 VAC"],
      ["Motor Range", "1–200 HP"],
      ["Continuous Run", "1000+ Hrs"],
      ["IP Grade", "IP54"],
    ],
    accent: "#C8102E",
  },
  {
    href: "/command-center",
    eyebrow: "IoT Platform",
    title: "Command Center",
    fullName: "Remote monitoring & control",
    desc: "GSM/4G IoT platform. Live status, remote ON/OFF, smart scheduling, instant alerts, multi-user access, energy reports — for every connected panel.",
    specs: [
      ["Connectivity", "GSM / 4G"],
      ["Dashboard", "Web + Mobile"],
      ["Alerts", "SMS / App"],
      ["Multi-User", "Role-based"],
    ],
    accent: "#C8102E",
  },
];

export default function TechnologyPage() {
  return (
    <div className="tech-hub">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Subtech Core Technology</div>
          <h1>
            Built Different.
            <br />
            <span>Engineered Better.</span>
          </h1>
          <p className="lead">
            While the industry still relies on conventional contactors and disconnected protection
            components, Subtech has developed proprietary technologies that replace multiple
            outdated parts with smarter, integrated solutions. This is not an upgrade. This is a
            different class of motor control.
          </p>
        </div>
      </section>

      {/* COMPARISON STRIP */}
      <section className="comparison">
        <div className="container">
          <div className="comp-grid">
            <div className="comp-side old">
              <div className="comp-label">Traditional Starter</div>
              <div className="comp-count">6</div>
              <div className="comp-desc">
                Separate components wired together. More failure points. More panel space. More
                maintenance.
              </div>
            </div>
            <div className="vs">VS</div>
            <div className="comp-side new">
              <div className="comp-label">Subtech Smart Panel</div>
              <div className="comp-count">2</div>
              <div className="comp-desc">
                MPU + PMC do the work of six, and do it better. Less wiring, less space, fewer
                failures.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH GRID */}
      <section className="grid-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow-dark">Four Pillars</div>
            <h2>The Subtech Technology Stack</h2>
            <p>
              Every Subtech panel runs on these four building blocks. Click any to dive into the
              full technical spec, working principle, and applications.
            </p>
          </div>

          <div className="cards">
            {techCards.map((c) => (
              <Link key={c.href} href={c.href} className="card">
                <div className="card-eyebrow">{c.eyebrow}</div>
                <h3>{c.title}</h3>
                <div className="card-fullname">{c.fullName}</div>
                <p className="card-desc">{c.desc}</p>
                <div className="spec-grid">
                  {c.specs.map(([k, v]) => (
                    <div className="spec" key={k}>
                      <div className="spec-k">{k}</div>
                      <div className="spec-v">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="card-cta">
                  Explore {c.title} <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta">
        <div className="container">
          <div>
            <h2>Specify Subtech Technology In Your Next Project</h2>
            <p>
              Datasheets, wiring diagrams, HP-wise selection, and application consultation
              available on request. Serving industrial, infrastructure, and government across India
              since 1998.
            </p>
          </div>
          <Link href="/contact" className="cta-btn">
            Send Enquiry
          </Link>
        </div>
      </section>

      <style>{`
        .tech-hub {
          background: #080808;
          color: #f0f0f0;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        .tech-hub *, .tech-hub *::before, .tech-hub *::after { box-sizing: border-box; }
        .tech-hub h1, .tech-hub h2, .tech-hub h3, .tech-hub p {
          font-size: inherit; font-weight: inherit; letter-spacing: inherit;
          line-height: inherit; color: inherit; margin: 0;
        }
        .tech-hub .container { max-width: 1160px; margin: 0 auto; padding: 0 36px; }

        /* Hero */
        .tech-hub .hero {
          padding: 140px 0 80px;
          background:
            radial-gradient(ellipse 60% 80% at 100% 50%, rgba(200,16,46,0.10), transparent 60%),
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,16,46,0.06), transparent 60%),
            #080808;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tech-hub .eyebrow {
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: #C8102E; margin-bottom: 18px;
          display: inline-flex; align-items: center; gap: 12px;
        }
        .tech-hub .eyebrow::before {
          content: ''; display: inline-block; width: 32px; height: 2px; background: #C8102E;
        }
        .tech-hub .eyebrow-dark { color: #C8102E; }
        .tech-hub .hero h1 {
          font-size: clamp(36px, 5vw, 68px); line-height: 1.05;
          color: #f0f0f0; max-width: 720px; letter-spacing: -0.5px; font-weight: 600;
        }
        .tech-hub .hero h1 span { color: #C8102E; }
        .tech-hub .lead {
          max-width: 640px; margin-top: 28px; font-size: 16px; font-weight: 300;
          line-height: 1.75; color: #9ca3af;
        }

        /* Comparison */
        .tech-hub .comparison { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .tech-hub .comp-grid {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; align-items: center;
          padding: 32px; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
          background: rgba(255,255,255,0.025);
        }
        .tech-hub .comp-side { padding: 16px 24px; }
        .tech-hub .comp-side.new { background: rgba(180,10,10,0.06); border-radius: 12px; padding: 24px; }
        .tech-hub .comp-label {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 4px;
          text-transform: uppercase; color: #f0f0f0; margin-bottom: 8px;
        }
        .tech-hub .new .comp-label { color: #C8102E; }
        .tech-hub .comp-count {
          font-size: clamp(48px, 6vw, 88px); font-weight: 600; line-height: 1; color: #f0f0f0;
        }
        .tech-hub .new .comp-count { color: #C8102E; }
        .tech-hub .comp-desc { font-size: 13px; color: #9ca3af; margin-top: 12px; line-height: 1.6; }
        .tech-hub .vs {
          width: 56px; height: 56px; background: #C8102E; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #fff;
          font-weight: 600; font-size: 18px; box-shadow: 0 0 40px rgba(200,16,46,0.5);
          flex-shrink: 0;
        }

        /* Grid */
        .tech-hub .grid-section { padding: 100px 0; }
        .tech-hub .section-head { margin-bottom: 56px; max-width: 720px; }
        .tech-hub .section-head h2 {
          font-size: clamp(28px, 3.5vw, 44px); font-weight: 600; line-height: 1.15;
          color: #f0f0f0; margin: 16px 0; letter-spacing: -0.5px;
        }
        .tech-hub .section-head p { font-size: 15px; line-height: 1.75; color: #9ca3af; font-weight: 300; }

        .tech-hub .cards {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        .tech-hub .card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px; padding: 36px 32px; text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          backdrop-filter: blur(20px) saturate(150%);
        }
        .tech-hub .card:hover {
          transform: translateY(-4px); border-color: rgba(200,16,46,0.4);
          box-shadow: 0 16px 56px rgba(0,0,0,0.5);
        }
        .tech-hub .card-eyebrow {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 5px;
          color: #C8102E; text-transform: uppercase; margin-bottom: 12px;
        }
        .tech-hub .card h3 {
          font-size: clamp(36px, 4vw, 56px); color: #f0f0f0; line-height: 0.95;
          font-weight: 600; margin-bottom: 6px;
        }
        .tech-hub .card-fullname {
          font-size: 13px; color: #6b7280; letter-spacing: 1px;
          margin-bottom: 24px; font-family: 'DM Mono', monospace;
        }
        .tech-hub .card-desc {
          font-size: 14px; line-height: 1.75; color: #9ca3af;
          margin-bottom: 28px; border-left: 2px solid #C8102E; padding-left: 18px;
        }
        .tech-hub .spec-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 28px;
        }
        .tech-hub .spec { background: #111111; padding: 16px 14px; }
        .tech-hub .spec-k {
          font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 3px;
          color: #6b7280; text-transform: uppercase; margin-bottom: 6px;
        }
        .tech-hub .spec-v { font-size: 13px; color: #f0f0f0; font-weight: 500; }
        .tech-hub .card-cta {
          margin-top: auto; font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 3px; color: #C8102E; font-weight: 600;
          text-transform: uppercase; display: inline-flex; align-items: center; gap: 10px;
          transition: gap 0.2s ease;
        }
        .tech-hub .card:hover .card-cta { gap: 16px; }

        /* CTA */
        .tech-hub .cta {
          background: #000; padding: 72px 0; border-top: 2px solid #C8102E;
        }
        .tech-hub .cta .container {
          display: flex; justify-content: space-between; align-items: center; gap: 48px;
        }
        .tech-hub .cta h2 {
          font-size: 26px; font-weight: 600; color: #fff;
          margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .tech-hub .cta p {
          font-size: 14px; color: #9ca3af; line-height: 1.7;
          max-width: 540px; font-weight: 300;
        }
        .tech-hub .cta-btn {
          display: inline-block; flex-shrink: 0; background: #C8102E; color: #fff;
          font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 14px 30px; text-decoration: none; border: 1.5px solid #C8102E;
          transition: background 0.2s, border-color 0.2s;
        }
        .tech-hub .cta-btn:hover { background: #a30d24; border-color: #a30d24; }

        @media (max-width: 900px) {
          .tech-hub .hero { padding: 110px 0 60px; }
          .tech-hub .cards { grid-template-columns: 1fr; }
          .tech-hub .comp-grid { grid-template-columns: 1fr; gap: 24px; }
          .tech-hub .vs { margin: 0 auto; }
          .tech-hub .cta .container { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .tech-hub .container { padding: 0 20px; }
          .tech-hub .spec-grid { grid-template-columns: 1fr; }
          .tech-hub .card { padding: 28px 24px; }
        }
      `}</style>
    </div>
  );
}
