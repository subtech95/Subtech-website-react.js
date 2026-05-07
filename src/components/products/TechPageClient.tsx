"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ============================================================
   Shared client component for MPU & PMC technology pages
   Renders the full body (breadcrumb → hero → stats → ps →
   how it works → features → comparison → applications → FAQ → CTA)
   ============================================================ */

export type TechPageData = {
  /* IDs / acronyms */
  acronym: string;            // "MPU" | "PMC"
  fullName: string;           // "Motor-Protection Unit" | "Pre-Magnetic Contactor"
  bcCurrent: string;          // breadcrumb current label
  /* Hero */
  heroSubLine: string;        // "Smart Motor Protection Technology" etc.
  heroDesc: string;
  heroBadges: string[];       // 3 badges
  heroImage: string;          // src
  heroImageAlt: string;
  heroBadgeLabel: string;     // small badge on image card
  /* Stats — exactly 4 */
  stats: { val: React.ReactNode; lbl: string }[];
  /* Problem vs Solution */
  ps: {
    introH2: string;
    introP: string;
    probTitleEW: string;
    probH3: string;
    probItems: string[];
    solTitleEW: string;
    solH3: string;
    solItems: string[];
  };
  /* How it works */
  hiw: {
    eyebrow: string;
    h2: string;
    intro: string;
    steps: { title: string; desc: string }[];
  };
  /* Features */
  feats: {
    h2: string;
    specTitle: string;
    specSub: string;
    specs: { k: string; v: string; r?: boolean }[];
    items: { title: string; desc: string }[];
  };
  /* Comparison */
  cmp: {
    h2: string;
    intro: string;
    leftHead: string;        // conventional column header
    rightHead: React.ReactNode; // PMC by Subtech (with red span)
    rows: {
      label: string;
      conv: React.ReactNode;
      ours: React.ReactNode;
    }[];
  };
  /* Applications */
  apps: {
    h2: string;
    intro: string;
    items: { title: string; desc: string }[];
  };
  /* FAQ */
  faq: {
    h2: string;
    aside: string;
    items: { q: string; a: string }[];
  };
  /* CTA */
  cta: {
    h2: string;
    p: string;
    btnHref: string;
    btnText: string;
  };
};

export default function TechPageClient({ data }: { data: TechPageData }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  /* Reveal + step + stat observers */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("vis");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -44px 0px" }
    );
    root.querySelectorAll(".reveal, .stagger").forEach((el) => reveal.observe(el));

    const stepObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("iv");
            stepObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    root.querySelectorAll(".step").forEach((el) => stepObs.observe(el));

    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("iv");
            statObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    root.querySelectorAll(".stat").forEach((el) => statObs.observe(el));

    return () => {
      reveal.disconnect();
      stepObs.disconnect();
      statObs.disconnect();
    };
  }, []);

  return (
    <div className="tech-page" ref={rootRef}>
      {/* BREADCRUMB */}
      <nav className="bc" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/technology">Technology</Link>
            </li>
            <li className="cur">{data.bcCurrent}</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <div className="eyebrow hero-eyebrow reveal">Subtech Proprietary Technology</div>
            <h1 className="hero-h1">
              <div className="h1-accent-line">
                <span className="h1-acronym reveal">{data.acronym}</span>
                <span className="h1-tag reveal">by Subtech</span>
              </div>
              <span className="h1-full reveal">{data.fullName}</span>
            </h1>
            <div className="hero-divider reveal">
              <span className="hero-divider-text">{data.heroSubLine}</span>
            </div>
            <p className="hero-desc reveal">{data.heroDesc}</p>
            <div className="hero-badges reveal">
              {data.heroBadges.map((b) => (
                <div key={b} className="hbadge">
                  <span className="hbadge-dot" />
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal fr">
            <div className="pmc-card">
              <img src={data.heroImage} className="card-img" alt={data.heroImageAlt} />
              <div className="card-badge">{data.heroBadgeLabel}</div>
              <div className="card-br" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="container">
          {data.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM vs SOLUTION */}
      <section className="ps-sec">
        <div className="container">
          <div className="sec-hd">
            <div className="eyebrow reveal">The Engineering Rationale</div>
            <h2 className="reveal">{data.ps.introH2}</h2>
            <p className="reveal">{data.ps.introP}</p>
          </div>
          <div className="ps-grid reveal">
            <div className="ps-col prob">
              <div className="ps-ew">{data.ps.probTitleEW}</div>
              <h3>{data.ps.probH3}</h3>
              <ul className="ps-list">
                {data.ps.probItems.map((t, i) => (
                  <li key={i}>
                    <span className="ps-dot" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ps-col sol">
              <div className="ps-ew">{data.ps.solTitleEW}</div>
              <h3>{data.ps.solH3}</h3>
              <ul className="ps-list">
                {data.ps.solItems.map((t, i) => (
                  <li key={i}>
                    <span className="ps-dot" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw">
        <div className="container">
          <div className="sec-hd">
            <div className="eyebrow reveal">{data.hiw.eyebrow}</div>
            <h2 className="reveal">{data.hiw.h2}</h2>
            <p className="reveal">{data.hiw.intro}</p>
          </div>
          <div className="steps stagger">
            {data.hiw.steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-bar" />
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feats">
        <div className="container">
          <div className="sec-hd">
            <div className="eyebrow reveal">Specifications and Performance</div>
            <h2 className="reveal">{data.feats.h2}</h2>
          </div>
          <div className="feats-layout">
            <div className="reveal fl">
              <div className="spec-card">
                <div className="spec-title">{data.feats.specTitle}</div>
                <div className="spec-sub">{data.feats.specSub}</div>
                {data.feats.specs.map((s, i) => (
                  <div className="spec-row" key={i}>
                    <span className="spec-k">{s.k}</span>
                    <span className={`spec-v${s.r ? " r" : ""}`}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="feats-grid stagger">
              {data.feats.items.map((f, i) => (
                <div className="feat" key={i}>
                  <div className="feat-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="feat-title">{f.title}</div>
                  <p className="feat-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="cmp" id="comparison">
        <div className="container">
          <div className="sec-hd">
            <div className="eyebrow reveal">Technical Comparison</div>
            <h2 className="reveal">{data.cmp.h2}</h2>
            <p className="reveal">{data.cmp.intro}</p>
          </div>
          <div className="reveal">
            <table className="cmp-tbl">
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col" className="cc">
                    {data.cmp.leftHead}
                  </th>
                  <th scope="col" className="cp">
                    {data.cmp.rightHead}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.cmp.rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.label}</td>
                    <td className="cc">{r.conv}</td>
                    <td className="cp">{r.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="apps">
        <div className="container">
          <div className="sec-hd">
            <div className="eyebrow reveal">Sectors and Applications</div>
            <h2 className="reveal">{data.apps.h2}</h2>
            <p className="reveal">{data.apps.intro}</p>
          </div>
          <div className="app-grid stagger">
            {data.apps.items.map((a, i) => (
              <div className="app-card" key={i}>
                <span className="an">{String(i + 1).padStart(2, "0")}</span>
                <div className="at">{a.title}</div>
                <p className="ad">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-side reveal fl">
              <div className="eyebrow">Frequently Asked</div>
              <h2>{data.faq.h2}</h2>
              <p>{data.faq.aside}</p>
            </div>
            <div className="faq-list reveal">
              {data.faq.items.map((f, i) => {
                const open = openIdx === i;
                return (
                  <div className={`faq-item${open ? " open" : ""}`} key={i}>
                    <button
                      className="faq-q"
                      aria-expanded={open}
                      onClick={() => setOpenIdx(open ? null : i)}
                    >
                      {f.q}
                      <span className="faq-arr" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div className="faq-a">{f.a}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta" id="enquire">
        <div className="container">
          <div className="cta-text">
            <h2>{data.cta.h2}</h2>
            <p>{data.cta.p}</p>
          </div>
          <Link href={data.cta.btnHref} className="cta-btn">
            {data.cta.btnText}
          </Link>
        </div>
      </div>

      {/* Override globals.css @layer base h1/h2/h3/p rules within this page */}
      <style jsx global>{`
        .tech-page h1,
        .tech-page h2,
        .tech-page h3,
        .tech-page h4,
        .tech-page p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
      `}</style>

      <style jsx>{`
        .tech-page {
          --red: #c8102e;
          --red-dk: #a30d24;
          --black: #0d0d0d;
          --ink: #181818;
          --g70: #484848;
          --g50: #767676;
          --g30: #b2b2b2;
          --g15: #e0e0e0;
          --g06: #f6f5f5;
          --white: #ffffff;
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --ease-io: cubic-bezier(0.65, 0, 0.35, 1);

          font-size: 15px;
          line-height: 1.7;
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .tech-page :global(*),
        .tech-page :global(*::before),
        .tech-page :global(*::after) {
          box-sizing: border-box;
        }

        .tech-page :global(.reveal) {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.72s var(--ease),
            transform 0.72s var(--ease);
        }
        .tech-page :global(.reveal.fl) {
          transform: translateX(-28px);
        }
        .tech-page :global(.reveal.fr) {
          transform: translateX(28px);
        }
        .tech-page :global(.reveal.vis) {
          opacity: 1;
          transform: none;
        }
        .tech-page :global(.stagger > *) {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.6s var(--ease),
            transform 0.6s var(--ease);
        }
        .tech-page :global(.stagger.vis > *:nth-child(1)) {
          transition-delay: 0s;
        }
        .tech-page :global(.stagger.vis > *:nth-child(2)) {
          transition-delay: 0.07s;
        }
        .tech-page :global(.stagger.vis > *:nth-child(3)) {
          transition-delay: 0.14s;
        }
        .tech-page :global(.stagger.vis > *:nth-child(4)) {
          transition-delay: 0.21s;
        }
        .tech-page :global(.stagger.vis > *:nth-child(5)) {
          transition-delay: 0.28s;
        }
        .tech-page :global(.stagger.vis > *:nth-child(6)) {
          transition-delay: 0.35s;
        }
        .tech-page :global(.stagger.vis > *) {
          opacity: 1;
          transform: none;
        }

        .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 36px;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 14px;
        }
        .eyebrow::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--red);
        }

        /* Breadcrumb */
        .bc {
          background: var(--g06);
          border-bottom: 1px solid var(--g15);
          padding: 10px 0;
        }
        .bc :global(ol) {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .bc :global(li) {
          font-size: 11.5px;
          color: var(--g50);
        }
        .bc :global(li a) {
          color: var(--g50);
          text-decoration: none;
          transition: color 0.2s;
        }
        .bc :global(li a:hover) {
          color: var(--red);
        }
        .bc :global(li.cur) {
          color: var(--ink);
          font-weight: 500;
        }
        .bc :global(li + li::before) {
          content: "/";
          margin-right: 8px;
          color: var(--g30);
        }

        /* Hero */
        .hero {
          padding: 88px 0 80px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--g15);
          background:
            radial-gradient(
              ellipse 65% 80% at 105% 50%,
              rgba(200, 16, 46, 0.09) 0%,
              rgba(200, 16, 46, 0.02) 45%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 55% 55% at -5% 100%,
              rgba(20, 20, 20, 0.055) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 80% 50% at 50% -10%,
              rgba(200, 16, 46, 0.04) 0%,
              transparent 55%
            ),
            linear-gradient(168deg, #faf9f9 0%, #ffffff 35%, #f7f5f5 75%, #f2f0f0 100%);
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(200, 16, 46, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 16, 46, 0.025) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .hero::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, var(--red) 0%, transparent 100%);
        }
        .hero .container {
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 68px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          margin-bottom: 20px;
        }
        .hero-h1 {
          margin: 0;
          line-height: 1;
        }
        .h1-acronym {
          display: block;
          font-size: clamp(80px, 11vw, 140px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 0.88;
          background: linear-gradient(135deg, #181818 30%, #6b0818 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .h1-accent-line {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 8px;
        }
        .h1-tag {
          display: inline-block;
          background: var(--red);
          color: var(--white);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 5px 12px;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .h1-full {
          display: block;
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 400;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--g50);
          margin-top: 12px;
          padding-left: 3px;
        }
        .hero-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 24px 0;
        }
        .hero-divider::before {
          content: "";
          display: block;
          width: 36px;
          height: 2px;
          background: var(--red);
          flex-shrink: 0;
        }
        .hero-divider::after {
          content: "";
          display: block;
          flex: 1;
          height: 1px;
          background: var(--g15);
        }
        .hero-divider-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--g30);
          white-space: nowrap;
        }
        .hero-desc {
          font-size: 14.5px;
          color: var(--g70);
          line-height: 1.85;
          max-width: 488px;
          font-weight: 300;
        }
        .hero-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 28px;
        }
        .hbadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
          border: 1px solid var(--g15);
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(4px);
        }
        .hbadge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--red);
          flex-shrink: 0;
        }

        /* Image card */
        .pmc-card {
          background: var(--black);
          position: relative;
          aspect-ratio: 4 / 3.2;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pmc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse 60% 50% at 20% 20%,
            rgba(200, 16, 46, 0.12) 0%,
            transparent 60%
          );
        }
        .pmc-card::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          width: 32px;
          height: 32px;
          border-top: 1.5px solid var(--red);
          border-right: 1.5px solid var(--red);
        }
        .card-br {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
          width: 32px;
          height: 32px;
          border-bottom: 1.5px solid var(--red);
          border-left: 1.5px solid var(--red);
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          z-index: 0;
          transition: transform 0.5s var(--ease);
        }
        .pmc-card:hover .card-img {
          transform: scale(1.03);
        }
        .card-badge {
          position: absolute;
          bottom: 18px;
          right: 18px;
          z-index: 3;
          background: var(--red);
          color: var(--white);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 5px 12px;
        }

        /* Stats */
        .stats {
          background: var(--black);
        }
        .stats .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat {
          padding: 30px 24px;
          text-align: center;
          border-right: 1px solid #1a1a1a;
          position: relative;
          overflow: hidden;
        }
        .stat:last-child {
          border-right: none;
        }
        .stat::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 32px;
          height: 1.5px;
          background: var(--red);
          transition: transform 0.5s var(--ease);
        }
        .stat.iv::after {
          transform: translateX(-50%) scaleX(1);
        }
        .stat-val {
          font-size: 32px;
          font-weight: 700;
          color: var(--white);
          line-height: 1;
          margin-bottom: 7px;
          letter-spacing: -0.02em;
        }
        .stat-val :global(em) {
          color: var(--red);
          font-style: normal;
        }
        .stat-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #555;
        }

        /* Section base */
        section {
          padding: 88px 0;
        }
        .sec-hd {
          margin-bottom: 52px;
        }
        .sec-hd :global(h2) {
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 600;
          line-height: 1.22;
          color: var(--ink);
          margin-top: 8px;
          letter-spacing: -0.01em;
        }
        .sec-hd :global(p) {
          font-size: 14.5px;
          color: var(--g50);
          max-width: 580px;
          margin-top: 14px;
          line-height: 1.82;
          font-weight: 300;
        }

        /* Problem vs solution */
        .ps-sec {
          background: var(--g06);
        }
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .ps-col {
          padding: 44px 48px;
        }
        .ps-col.prob {
          background: var(--white);
          border: 1px solid var(--g15);
          border-right: none;
        }
        .ps-col.sol {
          background: var(--black);
          border-top: 2px solid var(--red);
        }
        .ps-ew {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ps-col.prob .ps-ew {
          color: var(--g30);
        }
        .ps-col.sol .ps-ew {
          color: var(--red);
        }
        .ps-col :global(h3) {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .ps-col.prob :global(h3) {
          color: var(--ink);
        }
        .ps-col.sol :global(h3) {
          color: var(--white);
        }
        .ps-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ps-list :global(li) {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.78;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid;
        }
        .ps-col.prob .ps-list :global(li) {
          color: var(--g70);
          border-color: var(--g15);
        }
        .ps-col.sol .ps-list :global(li) {
          color: #9a9a9a;
          border-color: #1e1e1e;
        }
        .ps-list :global(li:last-child) {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .ps-list :global(.ps-dot) {
          flex-shrink: 0;
          margin-top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .ps-col.prob .ps-list :global(.ps-dot) {
          background: var(--g30);
        }
        .ps-col.sol .ps-list :global(.ps-dot) {
          background: var(--red);
        }

        /* How it works */
        .hiw {
          background: var(--white);
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--g15);
        }
        .step {
          padding: 38px 28px;
          border-right: 1px solid var(--g15);
          position: relative;
        }
        .step:last-child {
          border-right: none;
        }
        .step-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--g15);
          overflow: hidden;
        }
        .step-bar::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--red);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.65s var(--ease);
        }
        .step.iv .step-bar::after {
          transform: scaleX(1);
        }
        .step-num {
          font-size: 44px;
          font-weight: 200;
          color: var(--g15);
          line-height: 1;
          margin-bottom: 18px;
          display: block;
          letter-spacing: -0.02em;
        }
        .step-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .step-desc {
          font-size: 13px;
          font-weight: 300;
          color: var(--g50);
          line-height: 1.78;
        }

        /* Features */
        .feats {
          background: var(--g06);
        }
        .feats-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 52px;
          align-items: start;
        }
        .spec-card {
          background: var(--black);
          padding: 32px 28px;
          border-top: 2px solid var(--red);
          position: sticky;
          top: 72px;
        }
        .spec-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 4px;
        }
        .spec-sub {
          font-size: 11px;
          font-weight: 400;
          color: #555;
          margin-bottom: 24px;
          letter-spacing: 0.06em;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #1e1e1e;
          font-size: 13px;
        }
        .spec-row:last-child {
          border-bottom: none;
        }
        .spec-k {
          color: #606060;
          font-weight: 300;
        }
        .spec-v {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--white);
        }
        .spec-v.r {
          color: var(--red);
        }
        .feats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .feat {
          background: var(--white);
          padding: 28px 26px;
          border-top: 1.5px solid transparent;
          transition: border-color 0.25s;
        }
        .feat:hover {
          border-top-color: var(--red);
        }
        .feat-num {
          font-size: 22px;
          font-weight: 200;
          color: var(--g15);
          line-height: 1;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }
        .feat-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .feat-desc {
          font-size: 13px;
          font-weight: 300;
          color: var(--g50);
          line-height: 1.78;
        }

        /* Comparison */
        .cmp {
          background: var(--white);
        }
        .cmp-tbl {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--g15);
          font-size: 13.5px;
        }
        .cmp-tbl :global(th) {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 15px 22px;
          text-align: left;
        }
        .cmp-tbl :global(th:first-child) {
          background: var(--g06);
          color: var(--g50);
          width: 30%;
        }
        .cmp-tbl :global(th.cc) {
          background: #fafafa;
          color: var(--g50);
          border-left: 1px solid var(--g15);
        }
        .cmp-tbl :global(th.cp) {
          background: var(--black);
          color: var(--white);
          border-left: 1px solid var(--g15);
        }
        .cmp-tbl :global(th.cp span) {
          color: var(--red);
        }
        .cmp-tbl :global(td) {
          padding: 14px 22px;
          border-top: 1px solid var(--g15);
          color: var(--g70);
          vertical-align: middle;
          font-weight: 300;
        }
        .cmp-tbl :global(td:first-child) {
          background: var(--g06);
          color: var(--ink);
          font-weight: 500;
        }
        .cmp-tbl :global(td.cc) {
          border-left: 1px solid var(--g15);
        }
        .cmp-tbl :global(td.cp) {
          background: #fdf8f8;
          border-left: 1px solid var(--g15);
        }
        .cmp-tbl :global(.pill) {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.07em;
          padding: 3px 10px;
          border-radius: 2px;
        }
        .cmp-tbl :global(.pill.n) {
          background: #f2f2f2;
          color: #999;
        }
        .cmp-tbl :global(.pill.p) {
          background: #fef0f2;
          color: var(--red);
        }

        /* Apps */
        .apps {
          background: var(--g06);
        }
        .app-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--g15);
          border: 1px solid var(--g15);
        }
        .app-card {
          background: var(--white);
          padding: 32px 28px;
          transition: background 0.27s;
          cursor: default;
        }
        .app-card:hover {
          background: var(--black);
        }
        .app-card:hover .an {
          color: var(--red);
        }
        .app-card:hover .at {
          color: var(--white);
        }
        .app-card:hover .ad {
          color: #5a5a5a;
        }
        .an {
          font-size: 12px;
          font-weight: 300;
          color: var(--g30);
          margin-bottom: 14px;
          display: block;
          transition: color 0.25s;
        }
        .at {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 10px;
          transition: color 0.25s;
        }
        .ad {
          font-size: 13px;
          font-weight: 300;
          color: var(--g50);
          line-height: 1.78;
          transition: color 0.25s;
        }

        /* FAQ */
        .faq {
          background: var(--white);
        }
        .faq-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 72px;
          align-items: start;
        }
        .faq-side :global(h2) {
          font-size: 28px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.22;
          margin: 10px 0 18px;
          letter-spacing: -0.01em;
        }
        .faq-side :global(p) {
          font-size: 14px;
          font-weight: 300;
          color: var(--g50);
          line-height: 1.82;
        }
        .faq-list {
          border-top: 1px solid var(--g15);
        }
        .faq-item {
          border-bottom: 1px solid var(--g15);
        }
        .faq-q {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--ink);
          padding: 22px 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          transition: color 0.2s;
        }
        .faq-q:hover {
          color: var(--red);
        }
        .faq-arr {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border: 1px solid var(--g15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 300;
          color: var(--red);
          transition:
            transform 0.25s var(--ease),
            border-color 0.2s;
        }
        .faq-item.open .faq-arr {
          transform: rotate(45deg);
          border-color: var(--red);
        }
        .faq-a {
          font-size: 13.5px;
          font-weight: 300;
          color: var(--g50);
          line-height: 1.82;
          max-height: 0;
          overflow: hidden;
          transition:
            max-height 0.38s var(--ease-io),
            padding-bottom 0.2s;
        }
        .faq-item.open .faq-a {
          max-height: 320px;
          padding-bottom: 22px;
        }

        /* CTA */
        .cta {
          background: var(--black);
          padding: 72px 0;
          border-top: 2px solid var(--red);
        }
        .cta .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
        }
        .cta-text :global(h2) {
          font-size: 26px;
          font-weight: 600;
          color: var(--white);
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        .cta-text :global(p) {
          font-size: 14px;
          font-weight: 300;
          color: #5a5a5a;
          line-height: 1.78;
          max-width: 480px;
        }
        .cta :global(.cta-btn) {
          display: inline-block;
          flex-shrink: 0;
          background: var(--red);
          color: var(--white);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 30px;
          text-decoration: none;
          border: 1.5px solid var(--red);
          transition:
            background 0.22s,
            border-color 0.22s;
        }
        .cta :global(.cta-btn:hover) {
          background: var(--red-dk);
          border-color: var(--red-dk);
        }

        /* Responsive */
        @media (max-width: 960px) {
          .hero .container,
          .feats-layout,
          .faq-layout,
          .cta .container {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .steps {
            grid-template-columns: 1fr 1fr;
          }
          .ps-grid {
            grid-template-columns: 1fr;
          }
          .ps-col.prob {
            border-right: 1px solid var(--g15);
          }
          .app-grid {
            grid-template-columns: 1fr 1fr;
          }
          .stats .container {
            grid-template-columns: 1fr 1fr;
          }
          .feats-grid {
            grid-template-columns: 1fr;
          }
          .spec-card {
            position: static;
          }
        }
        @media (max-width: 580px) {
          .steps,
          .app-grid,
          .stats .container {
            grid-template-columns: 1fr;
          }
          .container {
            padding: 0 20px;
          }
          section {
            padding: 60px 0;
          }
          .h1-acronym {
            font-size: 72px;
          }
        }
      `}</style>
    </div>
  );
}
