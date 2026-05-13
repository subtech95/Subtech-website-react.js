"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load the 3D Canvas
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-full flex items-center justify-center bg-black/50 rounded-lg animate-pulse">
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-[100vh] bg-hero-glow pt-24 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12 relative z-10 py-12 md:py-0">
        
        {/* Left Content Column */}
        <motion.div 
          className="w-full md:w-[60%] text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="caption text-red-500 mb-6 font-medium">
            Est. 1998 | Greater Noida, India
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="mb-6 lg:mr-12">
            Industrial Power. Engineered for India.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="body-text text-gray-subtle/80 mb-10 max-w-xl">
            Protecting motors and machines across GAIL, NTPC, DMRC, Indian Railways and 220+ dealers nationwide.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link 
              href="/products" 
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-[8px] font-medium transition-all duration-200 text-center"
            >
              Explore Products
            </Link>
            <Link 
              href="#technology" 
              className="px-8 py-4 bg-transparent border border-gray-subtle/30 hover:border-white hover:bg-white/5 text-white rounded-[8px] font-medium transition-all duration-200 text-center flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Watch How It Works
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center text-[13px] font-semibold text-gray-muted tracking-wider uppercase">
            <span>ISO 9001</span>
            <span className="hidden sm:block w-[1px] h-4 bg-gray-muted/30"></span>
            <span>CE Certified</span>
            <span className="hidden sm:block w-[1px] h-4 bg-gray-muted/30"></span>
            <span>CPRI Tested</span>
            <span className="hidden sm:block w-[1px] h-4 bg-gray-muted/30"></span>
            <span>ZED Silver</span>
          </motion.div>
        </motion.div>

        {/* Right 3D Column */}
        <motion.div 
          className="w-full md:w-[40%] h-[50vh] md:h-[80vh] relative z-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer text-white/50 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          const statsSection = document.getElementById("stats");
          statsSection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
