"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  index: number;
}

export default function ProductCard({ title, description, slug, index }: ProductCardProps) {
  // Placeholder for GA4 tracking
  const trackClick = (productName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", "view_product", { product: productName });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <Link 
        href={`/products#${slug}`} 
        onClick={() => trackClick(title)}
        className="block h-full bg-white border border-gray-subtle rounded-[12px] p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-t-red-500 hover:border-t-[3px] relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <div className="w-[80px] h-[80px] bg-gray-subtle/20 rounded-lg mb-6 flex items-center justify-center relative">
          {/* Implement actual product image or icon later */}
          <span className="text-gray-muted text-xs">Icon</span>
        </div>
        <h3 className="text-[24px] font-semibold mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-muted text-[15px] leading-relaxed mb-6">
          {description}
        </p>
        <div className="text-red-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
