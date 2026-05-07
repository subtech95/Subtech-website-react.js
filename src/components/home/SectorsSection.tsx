"use client";

import { motion } from "framer-motion";

const sectors = [
  {
    title: "Manufacturing",
    description: "Industrial automation and control systems",
    image: "/images/sectors/sector1.webp",
  },
  {
    title: "Commercial",
    description: "Office buildings and retail spaces",
    image: "/images/sectors/sector2.webp",
  },
  {
    title: "Energy",
    description: "Power generation and distribution",
    image: "/images/sectors/sector3.webp",
  },
  {
    title: "Infrastructure",
    description: "Critical infrastructure projects",
    image: "/images/sectors/sector4.webp",
  },
  {
    title: "Residential",
    description: "Residential electrical solutions and home automation",
    image: "/images/sectors/sector5.webp",
  },
  {
    title: "Defence",
    description: "Military and defense electrical systems",
    image: "/images/sectors/sector6.webp",
  },
];

export default function SectorsSection() {
  return (
    <section className="py-[60px] md:py-[80px] bg-white">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#1a1a1a] tracking-[-1px] mb-3">
            Driving Innovation Across Sectors
          </h2>
          <p className="text-[16px] text-[#666]">
            Delivering reliable electrical solutions tailored to every industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative h-[350px] rounded-xl overflow-hidden group cursor-default shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sector.image}
                alt={sector.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full py-4 text-center text-white bg-black/60 group-hover:bg-black/80 transition-colors duration-300">
                <h4 className="text-[18px] font-bold mb-1">{sector.title}</h4>
                <p className="text-[13px] text-white/80">{sector.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
