"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

function AnimCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
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

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section className="py-[100px] bg-[#f0f0f0] font-sans overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px] items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/factory.webp"
              alt="Subtech Manufacturing Facility, Greater Noida"
              className="w-full rounded-xl block object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute bottom-[-20px] right-[-20px] bg-[#111] text-white py-5 px-6 rounded-[10px] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
              <span className="text-[36px] font-bold text-[#E93132] leading-none">25+</span>
              <span className="text-[13px] font-medium text-white/70 leading-[1.3]">Years in<br />the Field</span>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="py-2"
          >
            <div className="text-[12px] font-semibold tracking-[2.5px] uppercase text-[#E93132] mb-5">
              About Subtech
            </div>
            <h2 className="text-[clamp(28px,3.5vw,38px)] font-bold text-[#111] leading-[1.2] tracking-[-0.8px] mb-5">
              Built for Industry.<br />Trusted by Engineers.
            </h2>
            <p className="text-[16px] font-light text-[#555] leading-[1.8] mb-9">
              Since 1998, we have been manufacturing reliable electrical control panels, motor starters,
              AMF systems, and pump automation solutions from our facility in Greater Noida. Over 10,000
              panels installed across government, industrial, and agricultural projects pan-India.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-7 mb-9 flex-wrap">
              <div>
                <div className="text-[28px] font-bold text-[#111] leading-none mb-1">
                  <AnimCounter end={10} suffix="k+" />
                </div>
                <div className="text-[12px] font-normal text-[#888]">Panels Installed</div>
              </div>
              <div className="w-[1px] h-10 bg-[#d4d4d4] hidden md:block" />
              <div>
                <div className="text-[28px] font-bold text-[#111] leading-none mb-1">
                  <AnimCounter end={50} suffix="+" />
                </div>
                <div className="text-[12px] font-normal text-[#888]">Govt & Industrial Clients</div>
              </div>
              <div className="w-[1px] h-10 bg-[#d4d4d4] hidden md:block" />
              <div>
                <div className="text-[28px] font-bold text-[#111] leading-none mb-1">
                  <AnimCounter end={100} suffix="%" />
                </div>
                <div className="text-[12px] font-normal text-[#888]">In-House Manufacturing</div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-[10px] px-7 py-[13px] bg-[#111] text-white text-[14px] font-semibold rounded-md hover:bg-[#E93132] transition-colors duration-200 group"
            >
              Learn More About Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
