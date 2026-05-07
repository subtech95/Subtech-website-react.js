"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ConsultationCTA() {
  return (
    <section className="py-[80px] px-6 bg-[#f8f8f8]">
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white border border-[#e8e8e8] rounded-[20px] py-14 px-6 md:px-12 shadow-[0_2px_24px_rgba(0,0,0,0.04)]"
        >
          {/* Red line */}
          <div className="w-10 h-[3px] bg-[#E93132] rounded-sm mx-auto mb-7" />

          <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#ccc] mb-5">
            Free Consultation
          </div>

          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold text-[#111] leading-[1.1] tracking-[-1.2px] mb-4">
            30 Minutes with Our<br />
            <em className="not-italic text-[#E93132]">Engineering Team</em>
          </h2>

          <p className="text-[15px] text-[#999] leading-[1.7] mb-6 max-w-[460px] mx-auto">
            Discuss your load requirements, site conditions, and automation needs. No obligations, no pressure.
          </p>

          {/* Points */}
          <div className="flex justify-center gap-[6px] mb-9 flex-wrap">
            {["Panel Sizing", "Site Recommendations", "Budget Estimation"].map((point) => (
              <span
                key={point}
                className="px-4 py-[6px] text-[12px] font-semibold text-[#777] bg-[#f7f7f7] rounded-full before:content-['✓_'] before:text-[#E93132] before:font-bold"
              >
                {point}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mb-5 flex-wrap">
            <Link
              href="/contact"
              className="px-11 py-4 bg-[#111] text-white text-[15px] font-bold rounded-[10px] hover:bg-[#E93132] hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(233,49,50,0.2)] transition-all duration-300"
            >
              Book Now
            </Link>
            <a
              href="https://wa.me/918506060580"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent text-[#666] text-[15px] font-semibold rounded-[10px] border-[1.5px] border-[#e0e0e0] hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>

          <p className="text-[12px] text-[#ccc]">Your Load, Our Logic.</p>
        </motion.div>
      </div>
    </section>
  );
}
