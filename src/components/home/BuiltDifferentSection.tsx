"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ============================================================
   "Built Different. Engineered Better." section
   Ported from sections/built-different.php
   ============================================================ */

type Star = {
  x: number;
  y: number;
  baseR: number;
  alpha: number;
  minA: number;
  maxA: number;
  speed: number;
  dir: 1 | -1;
  color: string;
  boost: number;
};

/* ── Slide-to-trigger button ───────────────────────────────── */
function SlideToTriggerButton({ href, children }: { href: string; children: React.ReactNode }) {
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  const handleRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const handle = handleRef.current;
    const label = labelRef.current;
    if (!btn || !handle || !label) return;

    const TRIGGER_AT = 0.88;
    const HANDLE_W = 44;

    let active = false;
    let triggered = false;
    let originX = 0;
    let curOff = 0;

    const maxOff = () => btn.offsetWidth - HANDLE_W;

    const render = (off: number) => {
      const max = maxOff();
      off = Math.max(0, Math.min(off, max));
      curOff = off;
      handle.style.transform = `translateX(${off}px)`;
      const p = max > 0 ? off / max : 0;
      label.style.opacity = Math.max(0.2, 1 - p * 1.3).toFixed(3);
    };

    const snapBack = () => {
      handle.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
      label.style.transition = "opacity 0.3s ease";
      label.style.opacity = "1";
      render(0);
      window.setTimeout(() => {
        handle.style.transition = "";
        label.style.transition = "";
      }, 550);
    };

    const doTrigger = () => {
      triggered = true;
      handle.style.transition = "transform 0.18s ease";
      render(maxOff());
      label.style.opacity = "0";
      const dest = btn.getAttribute("href") || "/";
      window.setTimeout(() => {
        window.location.href = dest;
      }, 400);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (triggered) return;
      e.preventDefault();
      active = true;
      originX = e.clientX - curOff;
      handle.style.transition = "none";
      label.style.transition = "none";
      handle.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!active || triggered) return;
      e.preventDefault();
      render(e.clientX - originX);
    };

    const onPointerUp = () => {
      if (!active || triggered) return;
      active = false;
      const max = maxOff();
      const p = max > 0 ? curOff / max : 0;
      if (p >= TRIGGER_AT) doTrigger();
      else snapBack();
    };

    const onPointerCancel = () => {
      if (triggered) return;
      active = false;
      snapBack();
    };

    const onClick = (e: MouseEvent) => {
      if (!triggered) e.preventDefault();
    };

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerCancel);
    btn.addEventListener("click", onClick);

    render(0);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerCancel);
      btn.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <Link href={href} ref={btnRef} className="tech-learn-btn">
      <span className="tlb-text" ref={labelRef}>
        {children}
      </span>
      <span className="tlb-icon" ref={handleRef}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}

/* ── Main section ──────────────────────────────────────────── */
export default function BuiltDifferentSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* Star canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const CURSOR_R = 140;
    const CURSOR_R_SQ = CURSOR_R * CURSOR_R;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 5200);
      for (let i = 0; i < count; i++) {
        const baseR = Math.random() * 1.5 + 0.25;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseR,
          alpha: Math.random(),
          minA: Math.random() * 0.08,
          maxA: Math.random() * 0.45 + 0.5,
          speed: Math.random() * 0.007 + 0.0008,
          dir: Math.random() < 0.5 ? 1 : -1,
          color: "255,255,255",
          boost: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dSq = dx * dx + dy * dy;
        const target = dSq < CURSOR_R_SQ ? 1 - Math.sqrt(dSq) / CURSOR_R : 0;
        s.boost += (target - s.boost) * 0.055;

        const spd = s.speed + s.boost * 0.03;
        s.alpha += spd * s.dir;
        if (s.alpha >= s.maxA) {
          s.alpha = s.maxA;
          s.dir = -1;
        }
        if (s.alpha <= s.minA) {
          s.alpha = s.minA;
          s.dir = 1;
        }

        const rA = Math.min(s.alpha + s.boost * 0.55, 1);
        const rR = s.baseR + s.boost * s.baseR * 2.8;

        if (s.boost > 0.08) {
          const haloR = rR * 5;
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR);
          grd.addColorStop(0, `rgba(255,255,255,${(s.boost * 0.38).toFixed(3)})`);
          grd.addColorStop(0.4, `rgba(255,255,255,${(s.boost * 0.12).toFixed(3)})`);
          grd.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, rR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${rA.toFixed(3)})`;
        ctx.fill();

        if (s.boost > 0.45) {
          const arm = rR * (1.8 + s.boost * 4);
          const armA = ((s.boost - 0.45) / 0.55) * 0.55;
          ctx.save();
          ctx.strokeStyle = `rgba(${s.color},${armA.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x - arm, s.y);
          ctx.lineTo(s.x + arm, s.y);
          ctx.moveTo(s.x, s.y - arm);
          ctx.lineTo(s.x, s.y + arm);
          ctx.stroke();
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      resize();
      init();
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            resize();
            init();
            cancelAnimationFrame(raf);
            draw();
          } else {
            cancelAnimationFrame(raf);
          }
        });
      },
      { threshold: 0.05 }
    );
    obs.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Reveal observer */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveals = section.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section className="tech-intro" ref={sectionRef}>
      {/* Star canvas */}
      <canvas
        id="ti-stars"
        aria-hidden="true"
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Moon decoration */}
      <div
        className="ti-sun"
        aria-hidden="true"
        style={{ backgroundImage: "url('/images/brands/moon.webp')" }}
      />

      {/* Header */}
      <div className="ti-header">
        <div className="eyebrow">Subtech Core Technology</div>
        <h1>
          Built Different.
          <br />
          <span>Engineered Better.</span>
        </h1>
        <p className="intro-sub">
          While the industry still relies on conventional contactors and disconnected protection
          components, Subtech has developed two proprietary technologies: <strong>MPU</strong> and{" "}
          <strong>PMC</strong>, that replace multiple outdated parts with smarter, integrated
          solutions. This is not an upgrade. This is a different class of motor control.
        </p>
      </div>

      {/* Comparison bar */}
      <div className="comparison-bar">
        <div className="comp-side old">
          <div className="comp-label">Traditional Starter</div>
          <div className="comp-count">6</div>
          <div className="comp-desc">
            Separate components wired together. More failure points. More panel space. More
            maintenance.
          </div>
          <div className="comp-parts" style={{ color: "white" }}>
            <div className="comp-part">Thermal Overload Relay</div>
            <div className="comp-part">Single Phase Preventer</div>
            <div className="comp-part">Analog Ammeter</div>
            <div className="comp-part">Push Buttons (Start / Stop)</div>
            <div className="comp-part">Conventional AC Contactor</div>
            <div className="comp-part">Extra Protection Modules</div>
          </div>
          <div className="vs-divider">VS</div>
        </div>
        <div className="comp-side new">
          <div className="comp-label">Subtech Smart Panel: MPU + PMC</div>
          <div className="comp-count">2</div>
          <div className="comp-desc">
            Two intelligent units that do the work of six, and do it better.
          </div>
          <div className="comp-gain">
            <div className="comp-gain-item">MPU: 1 unit replaces 5 components</div>
            <div className="comp-gain-item">PMC: Solves coil burning &amp; chattering for life</div>
            <div className="comp-gain-item">Compact panel: less wiring, less space</div>
            <div className="comp-gain-item">Fewer parts = fewer failures = lower lifetime cost</div>
            <div className="comp-gain-item">
              Suitable for any motor: agricultural, industrial, commercial
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="tech-grid-divider" />

      {/* Tech cards */}
      <div className="tech-grid">
        {/* MPU */}
        <div className="tech-card reveal reveal-delay-1">
          <div className="tech-card-inner">
            <div className="tech-tag">Technology 01</div>
            <h3>MPU</h3>
            <div className="tech-fullname">Motor Protection Unit</div>
            <p className="tech-lead">
              A microcontroller-based digital unit developed by Subtech that consolidates
              monitoring, protection, and control into a single intelligent module, replacing what
              used to require five separate components.
            </p>
            <div className="spec-grid">
              <div className="spec-item">
                <div className="spec-label">Type</div>
                <div className="spec-value">Microcontroller-Based Digital Unit</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Replaces</div>
                <div className="spec-value">5 Conventional Components</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Display</div>
                <div className="spec-value">Digital Volt / Amp Meter</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Modes</div>
                <div className="spec-value">Auto / Manual / Bypass</div>
              </div>
            </div>
            <SlideToTriggerButton href="/products/mpu">Learn More</SlideToTriggerButton>
          </div>
        </div>

        {/* PMC */}
        <div className="tech-card reveal reveal-delay-2">
          <div className="tech-card-inner">
            <div className="tech-tag">Technology 02</div>
            <h3>PMC</h3>
            <div className="tech-fullname">Pre-Magnetic Contactor</div>
            <p className="tech-lead">
              A modified contactor concept engineered by Subtech that eliminates the two most common
              failure modes in conventional contactors: coil burning and contact chattering, through
              powerless, fast switching on a wide DC voltage range.
            </p>
            <div className="spec-grid">
              <div className="spec-item">
                <div className="spec-label">Coil Voltage</div>
                <div className="spec-value">20–28 V DC (Wide Range)</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Available Rating</div>
                <div className="spec-value">Up to 150 Ampere</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Coil Burn Risk</div>
                <div className="spec-value">Zero Probability</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Switching</div>
                <div className="spec-value">Powerless / Instantaneous</div>
              </div>
            </div>
            <SlideToTriggerButton href="/products/pmc">Learn More</SlideToTriggerButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tech-intro {
          --dark: #080808;
          --card: #111111;
          --border: rgba(255, 255, 255, 0.08);
          --white: #f0f0f0;
          --text: #9ca3af;
          --muted: #6b7280;
          --red: #c8102e;
          --red-dk: #a30d24;
          --black: #000;
          --mono: "DM Mono", "Courier New", monospace;
          --display: "DM Sans", sans-serif;

          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 80px 0 56px;
          background: var(--dark);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        /* Moon decoration */
        .ti-sun {
          position: absolute;
          top: -40px;
          right: -55px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          pointer-events: none;
          background-size: cover;
          background-position: center;
          opacity: 0.92;
          filter: grayscale(1) brightness(1.1) saturate(0);
          z-index: 1;
          background-color: transparent;
          animation: ti-moon-float 8s ease-in-out infinite;
        }
        @keyframes ti-moon-float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.02);
          }
        }
        .ti-sun::before {
          content: "";
          position: absolute;
          inset: -80px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.04) 55%,
            transparent 75%
          );
          z-index: -2;
          pointer-events: none;
        }
        .ti-sun::after {
          content: "";
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(255, 255, 255, 0.02) 65%,
            transparent 80%
          );
          z-index: -1;
          pointer-events: none;
          filter: blur(8px);
        }

        /* Header */
        .ti-header {
          padding: 0 8vw;
          position: relative;
          z-index: 2;
        }
        .eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .eyebrow::before {
          content: "";
          display: inline-block;
          width: 32px;
          height: 2px;
          background: var(--red);
        }
        .tech-intro h1 {
          font-family: var(--display);
          font-size: clamp(36px, 4.5vw, 68px);
          line-height: 1.05;
          color: var(--white);
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
          max-width: 700px;
        }
        .tech-intro h1 :global(span) {
          color: var(--red);
          -webkit-text-stroke: 0px;
        }
        .intro-sub {
          max-width: 640px;
          margin-top: 28px;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--text);
          position: relative;
          z-index: 1;
        }

        /* Comparison bar */
        .comparison-bar {
          margin-top: 40px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .comp-side {
          padding: 28px 6vw;
          background: rgba(255, 255, 255, 0.03);
          position: relative;
        }
        .comp-side.old {
          background: rgba(255, 255, 255, 0.025);
          border-right: 1px solid rgba(255, 255, 255, 0.07);
        }
        .comp-side.new {
          background: rgba(180, 10, 10, 0.06);
        }
        .comp-count {
          font-size: clamp(44px, 5vw, 72px);
          line-height: 1;
          font-family: var(--display);
          color: var(--white);
        }
        .comp-side.new .comp-count {
          color: var(--red);
        }
        .comp-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--white);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .comp-side.new .comp-label {
          color: var(--red);
        }
        .comp-desc {
          font-size: 13px;
          color: var(--white);
          margin-top: 10px;
          line-height: 1.6;
        }
        .comp-side.new .comp-desc {
          color: var(--text);
        }
        .comp-parts {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 16px;
        }
        .comp-part {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: var(--white);
          text-decoration: line-through;
        }
        .comp-part::before {
          content: "✕";
          color: var(--white);
          font-size: 11px;
        }
        .comp-gain {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 16px;
        }
        .comp-gain-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: var(--white);
        }
        .comp-gain-item::before {
          content: "✓";
          color: var(--red);
          font-weight: 700;
        }
        .vs-divider {
          position: absolute;
          right: -28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 56px;
          height: 56px;
          background: var(--red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--display);
          font-size: 22px;
          color: white;
          box-shadow: 0 0 40px rgba(204, 23, 23, 0.5);
        }

        /* Tech grid */
        .tech-grid-divider {
          height: 1px;
          margin: 0 6vw;
          background: rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 2;
        }
        .tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 32px 6vw 56px;
          position: relative;
          z-index: 2;
        }
        .tech-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .tech-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 16px 56px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .tech-card-inner {
          padding: 60px 6vw 56px;
        }
        .tech-tag {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 5px;
          color: var(--red);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .tech-card :global(h3) {
          font-family: var(--display);
          font-size: clamp(40px, 5vw, 72px);
          color: var(--white);
          line-height: 0.95;
          margin-bottom: 4px;
        }
        .tech-fullname {
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 1px;
          margin-bottom: 32px;
          font-family: var(--mono);
        }
        .tech-lead {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text);
          margin-bottom: 40px;
          border-left: 2px solid var(--red);
          padding-left: 20px;
        }

        /* Spec grid */
        .spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          margin-bottom: 40px;
        }
        .spec-item {
          background: var(--card);
          padding: 20px 18px;
        }
        .spec-label {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 3px;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .spec-value {
          font-size: 14px;
          color: var(--white);
          font-weight: 500;
        }

        /* Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal :global(.visible),
        .reveal.visible {
          opacity: 1;
          transform: none;
        }
        .reveal-delay-1 {
          transition-delay: 0.1s;
        }
        .reveal-delay-2 {
          transition-delay: 0.2s;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .ti-sun {
            display: none;
          }
          .tech-grid {
            grid-template-columns: 1fr;
            padding: 24px 5vw 40px;
            gap: 16px;
          }
          .comparison-bar {
            grid-template-columns: 1fr;
          }
          .vs-divider {
            display: none;
          }
          .comp-side.old {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          }
        }
        @media (max-width: 600px) {
          .spec-grid {
            grid-template-columns: 1fr;
          }
          .tech-card-inner {
            padding: 36px 24px 40px;
          }
        }
      `}</style>

      {/* Slide-to-trigger button styles (global so they apply inside <Link>) */}
      <style jsx global>{`
        .tech-intro .tech-learn-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin-top: 36px;
          text-decoration: none;
          overflow: hidden;
          border: 1px solid rgba(204, 23, 23, 0.5);
          border-radius: 10px;
          cursor: default;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
          width: 210px;
          height: 46px;
          background: #fff !important;
          transition: none !important;
        }
        .tech-intro .tech-learn-btn:hover {
          background: #fff !important;
          border-color: rgba(204, 23, 23, 0.5) !important;
          color: #111 !important;
        }
        .tech-intro .tlb-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #111;
          pointer-events: none;
          z-index: 1;
        }
        .tech-intro .tlb-icon {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 44px;
          background: rgba(204, 23, 23, 0.1);
          border-right: 1px solid rgba(204, 23, 23, 0.28);
          border-radius: 10px 0 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          z-index: 2;
          will-change: transform;
          flex-shrink: 0;
          transition:
            background 0.2s ease,
            border-right-color 0.2s ease;
        }
        .tech-intro .tlb-icon:active {
          cursor: grabbing;
        }
        .tech-intro .tlb-icon svg {
          width: 16px;
          height: 16px;
          stroke: #c8102e;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        .tech-intro .tech-learn-btn:hover .tlb-text {
          color: #111 !important;
          background-color: transparent !important;
        }
        .tech-intro .tech-learn-btn:hover .tlb-icon {
          background: #c8102e !important;
          border-right-color: #c8102e !important;
        }
        .tech-intro .tech-learn-btn:hover .tlb-icon svg {
          stroke: #fff !important;
        }
      `}</style>
    </section>
  );
}
