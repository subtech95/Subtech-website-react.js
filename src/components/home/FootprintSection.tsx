"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return <span ref={ref}>{val}<span className="text-[28px] text-[#d32f2f]">{suffix}</span></span>;
}

const stats = [
  { number: 500, suffix: "+", label: "Active Clients", desc: "Industries, institutions, and government bodies served." },
  { number: 28, suffix: "+", label: "States Covered", desc: "Pan-India presence through a trained dealer network." },
  { number: 99, suffix: "+", label: "Cities", desc: "Serviceable locations backed by local support teams." },
  { number: 25, suffix: "+", label: "Years in Industry", desc: "Since 1998 \u2014 built on engineering reliability." },
];

const sectorTags = [
  "Manufacturing", "Infrastructure", "Commercial", "Industrial",
  "Government / PSU", "Defence", "Energy & Utilities",
];

export default function FootprintSection() {
  return (
    <section className="py-[100px] md:py-[100px] relative overflow-hidden bg-[#F8FAFC]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        {/* Label + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="flex items-center gap-[10px] text-[11px] tracking-[0.22em] uppercase text-[#d32f2f] font-semibold mb-[14px]">
            <span className="w-7 h-[2px] bg-[#d32f2f] flex-shrink-0" />
            Trusted Across India
          </p>
          <h2 className="text-[clamp(36px,5vw,54px)] font-semibold leading-[1.05] tracking-[-0.01em] text-black max-w-[520px] mb-[60px]">
            Our Footprint of<br /><span className="text-[#d32f2f]">Reliable Installations</span>
          </h2>
        </motion.div>

        {/* Stat Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[rgba(255,255,255,0.07)] mb-[72px]"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="border-r border-b border-[#e5e5e5] py-10 px-6 md:px-8 hover:bg-[rgba(211,47,47,0.05)] transition-colors relative"
            >
              <div className="text-[40px] md:text-[56px] font-bold text-black leading-none tracking-[-0.02em] mb-[6px]">
                <Counter end={s.number} suffix={s.suffix} />
              </div>
              <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#999] mb-3">
                {s.label}
              </div>
              <div className="text-[13px] text-black/70 leading-[1.6] max-w-[160px]">
                {s.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Sector Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <span className="text-[11px] tracking-[0.18em] uppercase text-[#d32f2f] mr-1 font-semibold">
            Sectors &mdash;
          </span>
          {sectorTags.map((tag) => (
            <span
              key={tag}
              className="border border-red-500 px-4 py-[7px] text-[12px] font-medium text-black tracking-[0.05em] hover:border-black hover:text-red-500 hover:bg-white transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
