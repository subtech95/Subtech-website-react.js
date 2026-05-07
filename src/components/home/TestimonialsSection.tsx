"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mr. Rakesh P. Seth",
    designation: "Astt. General Manager",
    company: "Honda Power India",
    rating: 5,
    icon: "/logos/clients/Shiva.png",
    text: "We have been recommending Subtech AMF & Changeover Panels with Honda generators. The performance has been outstanding, smooth changeover, robust build quality, and seamless integration. Subtech has delivered a reliable and efficient solution for both residential and commercial applications.",
  },
  {
    name: "Executive Officer",
    designation: "",
    company: "Nagar Palika Parishad, Atrauli (Aligarh)",
    rating: 5,
    icon: "/logos/clients/aligarh.png",
    text: "We were searching for a high-quality Motor Starter Panel. Subtech's 40 HP Star-Delta panel performed far better than those from companies we used earlier. Installation was smooth, performance is excellent, and since installation, with zero complaints so far.",
  },
  {
    name: "Rajiv Kumar Sharma",
    designation: "University Engineer",
    company: "Aligarh Muslim University",
    rating: 5,
    icon: "/logos/clients/amu.png",
    text: "We are satisfied with Subtech's DOL & Star-Delta starters installed across our university sites. They have been performing very well for the last three years with no complaints, supported by excellent after-sales service.",
  },
  {
    name: "Mr. Jik Chourasia",
    designation: "Junior Warrant Officer",
    company: "Indian Air Force, Bagdogra",
    rating: 5,
    icon: "/logos/clients/airforce.png",
    text: "I appreciate Subtech's incredible work during the installation of a 50 kVA AMF Panel at Air Force Station Bagdogra. Their timely delivery, seamless installation, and commitment to quality make a remarkable difference.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-[1.4rem] ${i < count ? "text-[#dc3545]" : "text-[#ddd]"}`}>
          {i < count ? "\u2605" : "\u2606"}
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 410;
    if (window.innerWidth <= 768) return window.innerWidth - 100;
    return 410;
  }, []);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const cardWidth = getCardWidth();
    const gap = typeof window !== "undefined" && window.innerWidth <= 768 ? 15 : 30;
    wrapperRef.current.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  }, [currentIndex, getCardWidth]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const move = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      let next = prev + dir;
      if (next >= testimonials.length) next = 0;
      if (next < 0) next = testimonials.length - 1;
      return next;
    });
  }, []);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => move(1), 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [move]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    autoPlayRef.current = setInterval(() => move(1), 5000);
  };

  // Touch support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) move(diff > 0 ? 1 : -1);
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => updatePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePosition]);

  return (
    <section className="py-[60px] px-5 bg-white">
      <div className="max-w-[1400px] mx-auto relative px-[50px] md:px-[70px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[2rem] md:text-[2.5rem] font-semibold text-[#1a1a1a] mb-12"
        >
          What Our Customers Say
        </motion.h2>

        {/* Prev Arrow */}
        <button
          onClick={() => move(-1)}
          className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-white border-2 border-[#dc3545] rounded-full flex items-center justify-center text-[#dc3545] text-[1.1rem] md:text-[1.5rem] font-bold shadow-sm hover:bg-[#dc3545] hover:text-white hover:scale-110 transition-all"
          aria-label="Previous testimonial"
        >
          &lsaquo;
        </button>

        {/* Cards Container */}
        <div
          className="overflow-hidden"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={wrapperRef}
            className="flex gap-[15px] md:gap-[30px] py-[10px] transition-transform duration-500 ease-in-out"
          >
            {/* Original + duplicates for seamless loop */}
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[calc(100%-2px)] md:min-w-[380px] md:max-w-[420px] bg-white border-2 border-[#dc3545] rounded-[15px] p-6 md:p-[30px_25px] shadow-[0_4px_15px_rgba(220,53,69,0.1)] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(220,53,69,0.25)] transition-all duration-300 flex-shrink-0"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1">
                    <h3 className="text-[1rem] font-bold text-[#1a1a1a] m-0 mb-[5px]">
                      {t.name}
                    </h3>
                    {(t.designation || t.company) && (
                      <div className="flex items-center gap-2 text-[#6c757d] text-[0.7rem]">
                        <span className="w-4 h-4 border-[1.5px] border-[#6c757d] rounded-full inline-flex items-center justify-center text-[10px]">
                          &#x25C9;
                        </span>
                        <span>
                          {t.designation}{t.designation && t.company ? ", " : ""}
                          {t.company}
                        </span>
                      </div>
                    )}
                  </div>
                  {t.icon && (
                    <div className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.icon} alt={t.company} className="w-[50px] h-auto object-contain" loading="lazy" />
                    </div>
                  )}
                </div>

                <Stars count={t.rating} />

                <p className="text-[0.9rem] leading-[1.7] text-[#4a4a4a]">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={() => move(1)}
          className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10 w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-white border-2 border-[#dc3545] rounded-full flex items-center justify-center text-[#dc3545] text-[1.1rem] md:text-[1.5rem] font-bold shadow-sm hover:bg-[#dc3545] hover:text-white hover:scale-110 transition-all"
          aria-label="Next testimonial"
        >
          &rsaquo;
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-3 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                currentIndex === i
                  ? "bg-[#dc3545] w-[35px]"
                  : "bg-[#dee2e6] w-3 hover:bg-[#adb5bd]"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
