"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-0 pb-10">
      {/* Red separator at very top */}
      <div className="h-[2px] bg-[#CC0000] w-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        {/* Four columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-semibold text-[18px] mb-6">Products</h4>
            <ul className="space-y-4 text-gray-muted text-[15px]">
              <li><Link href="/products" className="hover:text-red-500 transition-colors">VFD Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">AMF Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">MCC Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">Motor Starters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] mb-6">Company</h4>
            <ul className="space-y-4 text-gray-muted text-[15px]">
              <li><Link href="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/about#certifications" className="hover:text-red-500 transition-colors">Certifications</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><Link href="/#technology" className="hover:text-red-500 transition-colors">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-muted text-[15px]">
              <li><Link href="/products" className="hover:text-red-500 transition-colors">Product Catalog</Link></li>
              <li><Link href="/about" className="hover:text-red-500 transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Get Support</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Dealer Enquiry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] mb-6">Contact</h4>
            <address className="not-italic space-y-4 text-gray-muted text-[15px]">
              <p>Subtech, Greater Noida,<br />Uttar Pradesh, India</p>
              <p><a href="tel:+910000000000" className="hover:text-white transition-colors">+91-0000000000</a></p>
              <p><a href="mailto:info@subtech.in" className="hover:text-white transition-colors">info@subtech.in</a></p>
            </address>
          </div>
        </div>

        {/* Gray separator */}
        <div className="h-px bg-white/10 w-full" />

        {/* Massive Subtech text */}
        <div className="w-full overflow-hidden py-10">
          <motion.div
            className="group cursor-default select-none text-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p
              className="text-white font-bold leading-none tracking-[-4px] transition-all duration-[400ms] ease-in-out group-hover:[text-shadow:0_0_80px_rgba(204,0,0,0.3)]"
              style={{
                fontSize: "clamp(80px, 15vw, 220px)",
              }}
            >
              Subtech
            </p>
            <p className="text-[13px] text-[#888888] uppercase tracking-[2px] mt-4 font-light">
              Est. 1998 — Greater Noida, India
            </p>
          </motion.div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-muted text-[14px]">
            &copy; {new Date().getFullYear()} Subtech. All rights reserved.
          </p>
          <div className="flex gap-4 text-gray-muted text-[13px] uppercase tracking-wider font-light">
            <span>ISO 9001</span>
            <span className="hidden sm:inline">•</span>
            <span>ISO 14001</span>
            <span className="hidden sm:inline">•</span>
            <span>CE</span>
            <span className="hidden sm:inline">•</span>
            <span>CPRI</span>
            <span className="hidden sm:inline">•</span>
            <span>ZED Silver</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
