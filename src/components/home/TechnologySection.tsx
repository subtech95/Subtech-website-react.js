"use client";

import AnimatedSection from "../shared/AnimatedSection";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "MPU - Motor Protection Unit",
    description: "Microprocessor-based protection. Works in any weather.",
  },
  {
    title: "PMC - Pre-Magnetic Contactor",
    description: "DC-operated. No humming. 5-year coil warranty.",
  },
  {
    title: "Double Protection",
    description: "Detects single-phasing on BOTH input and output side.",
  },
  {
    title: "Digital Display",
    description: "Live Amperes, Voltage, Run-Hours. 90% issues resolved by phone.",
  }
];

export default function TechnologySection() {
  return (
    <section id="technology" className="bg-black text-white py-24 border-t border-gray-subtle/10 relative overflow-hidden">
      {/* Subtle red glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-divider-glow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <h2 className="mb-16">Why Subtech Lasts Longer</h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-sub-black border border-gray-subtle/10 rounded-[12px] p-8 hover:border-gray-subtle/30 transition-colors"
            >
              <div className="w-3 h-3 rounded-full bg-red-500 mb-6 shadow-[0_0_10px_rgba(204,0,0,0.8)]"></div>
              <h3 className="text-[20px] font-semibold mb-4 text-white">{pillar.title}</h3>
              <p className="text-gray-muted text-[15px] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
