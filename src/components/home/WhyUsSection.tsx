"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, duration = 1.8 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { number: 25, suffix: "+", label: "Years of\nExperience" },
  { number: 10000, suffix: "+", label: "Panels\nInstalled" },
  { number: 500, suffix: "+", label: "Active\nClients" },
  { number: 99, suffix: "%", label: "Client\nRetention" },
];

const cards = [
  {
    icon: "🛡️",
    title: "5-Year Coil Burning Warranty",
    desc: "Industry-first warranty on PMC coils. We stand behind our engineering. If the coil burns, we replace it. No questions asked.",
    tags: ["PMC Technology", "Zero Risk"],
    span: "col-span-12 md:col-span-5",
    accent: false,
  },
  {
    icon: "⚡",
    title: "Microcontroller-Based Protection",
    desc: "Our MPU (Motor Protection Unit) uses microprocessor technology for precise detection of single phasing, dry run, overload, and voltage fluctuation. Works in extreme heat and dust.",
    tags: ["MPU", "Smart Protection", "All Weather"],
    span: "col-span-12 md:col-span-7",
    accent: true,
  },
  {
    icon: "🔧",
    title: "Less Wiring, Faster Setup",
    desc: "Pre-wired and tested panels reduce installation time by 60%. Plug-and-play simplicity for electricians in the field.",
    tags: ["Quick Install"],
    span: "col-span-12 md:col-span-4",
    accent: false,
  },
  {
    icon: "📊",
    title: "Built-in Digital Display",
    desc: "Live monitoring of Voltage, Amperes, Run-Hours, and fault codes. 90% of issues diagnosed over phone without site visit.",
    tags: ["Remote Diagnostics", "Real-Time"],
    span: "col-span-12 md:col-span-4",
    accent: false,
  },
  {
    icon: "🏭",
    title: "100% In-House Manufacturing",
    desc: "From PCB design to final assembly, everything happens under one roof in Greater Noida. Complete quality control at every step.",
    tags: ["ISO Certified", "Made in India"],
    span: "col-span-12 md:col-span-4",
    accent: false,
  },
];

export default function WhyUsSection() {
  return (
    <section className="w-full bg-[#080808] relative overflow-hidden py-[110px] md:py-[130px] font-sans">
      {/* Animated ambient orbs */}
      <div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-0 top-[-260px] right-[-260px] animate-orb1"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.16) 0%, transparent 65%)" }} />
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none bottom-[-180px] left-[-180px] animate-orb2"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.09) 0%, transparent 65%)" }} />

      {/* Animated grid */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-grid-drift"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute left-0 right-0 h-[2px] animate-scanline"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,16,46,0.25), rgba(255,80,100,0.4), rgba(200,16,46,0.25), transparent)", filter: "blur(1px)" }} />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 relative z-[2]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-end mb-[72px]">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-[10px] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ff4d6a] mb-5">
              <span className="w-[30px] h-[1px] bg-[#C8102E]" />
              Why Choose Subtech
              <span className="w-[7px] h-[7px] rounded-full bg-[#C8102E] inline-block ml-1 animate-pulse shadow-[0_0_6px_rgba(200,16,46,0.8)]" />
            </div>
            <h2 className="text-[38px] md:text-[clamp(40px,5vw,64px)] font-normal leading-[1.05] tracking-[-0.025em] text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
              <span className="block">Engineering That</span>
              <span className="block"><em className="italic text-[#C8102E] relative">Outlasts</em> Everything</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[16px] leading-[1.75] text-white/40 max-w-[460px] self-end"
          >
            Every Subtech panel is designed to survive India&apos;s harshest conditions. From scorching summers to monsoon humidity, our technology keeps motors running when others fail.
          </motion.p>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden mb-[72px]"
        >
          {stats.map((stat, i) => (
            <div key={i} className="px-7 py-7 bg-white/[0.02] hover:bg-[rgba(200,16,46,0.08)] transition-colors duration-300 relative group">
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8102E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="text-[44px] font-normal text-white leading-none tracking-[-0.02em]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                <AnimatedCounter target={stat.number} />
                <sup className="text-[#C8102E] text-[22px] align-super">{stat.suffix}</sup>
              </div>
              <div className="text-[12px] text-white/35 mt-2 leading-[1.5] whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bento Cards */}
        <div className="grid grid-cols-12 gap-[14px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className={`${card.span} rounded-[18px] p-8 relative overflow-hidden border transition-all duration-300 cursor-default group
                ${card.accent
                  ? "bg-gradient-to-br from-[#C8102E] to-[#8b0a1f] border-[#C8102E] hover:shadow-[0_20px_60px_rgba(200,16,46,0.35)]"
                  : "border-white/[0.06] bg-white/[0.03] hover:border-[rgba(200,16,46,0.4)] hover:bg-[rgba(200,16,46,0.05)]"
                } hover:-translate-y-[6px] hover:scale-[1.01]`}
            >
              {/* Shimmer */}
              <div className="absolute top-0 -left-full w-[60%] h-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent group-hover:left-[160%] transition-[left] duration-600 pointer-events-none" />

              {/* Icon */}
              <div className={`w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[20px] mb-[18px] border group-hover:scale-[1.12] group-hover:-rotate-[4deg] transition-transform duration-400
                ${card.accent ? "bg-white/[0.14] border-white/[0.24]" : "bg-[rgba(200,16,46,0.14)] border-[rgba(200,16,46,0.24)]"}`}>
                {card.icon}
              </div>

              <h3 className="text-[17px] font-semibold text-white leading-[1.3] mb-[10px]">{card.title}</h3>
              <p className={`text-[13.5px] leading-[1.72] ${card.accent ? "text-white/80 group-hover:text-white/95" : "text-white/40 group-hover:text-white/55"} transition-colors`}>
                {card.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-[7px] mt-[14px]">
                {card.tags.map((tag) => (
                  <span key={tag} className={`text-[11px] font-semibold px-3 py-1 rounded-full border tracking-[0.02em] group-hover:-translate-y-[2px] transition-transform
                    ${card.accent
                      ? "bg-white/[0.14] border-white/[0.28] text-white"
                      : "bg-[rgba(200,16,46,0.1)] border-[rgba(200,16,46,0.2)] text-[#ff8097]"
                    }`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ghost number */}
              <span className={`absolute bottom-[-10px] right-[10px] text-[100px] font-normal leading-none select-none pointer-events-none tracking-[-0.04em] group-hover:scale-[1.06] group-hover:-translate-y-1 transition-all
                ${card.accent ? "text-white/10" : "text-white/[0.035] group-hover:text-[rgba(200,16,46,0.1)]"}`}
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
