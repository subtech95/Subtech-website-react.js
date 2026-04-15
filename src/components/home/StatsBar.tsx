"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import AnimatedSection from "../shared/AnimatedSection";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, duration = 2, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animationFrame = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animationFrame);
        }
      };
      requestAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-[40px] font-bold tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section id="stats" className="bg-white py-16 border-b-[3px] border-b-red-500 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <AnimatedSection className="flex flex-col items-center justify-center p-4" delay={0.1}>
            <Counter end={22} prefix="Rs " suffix=" Cr+" />
            <p className="text-gray-muted mt-2 font-medium">Revenue</p>
          </AnimatedSection>
          
          <AnimatedSection className="flex flex-col items-center justify-center p-4 border-l-0 md:border-l border-gray-subtle/50" delay={0.2}>
            <Counter end={220} suffix="+" />
            <p className="text-gray-muted mt-2 font-medium">Dealers</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col items-center justify-center p-4 border-l-0 md:border-l border-gray-subtle/50" delay={0.3}>
            <Counter end={25} suffix="+" />
            <p className="text-gray-muted mt-2 font-medium">Years Experience</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col items-center justify-center p-4 border-l-0 md:border-l border-gray-subtle/50" delay={0.4}>
            <Counter end={10000} suffix="+" />
            <p className="text-gray-muted mt-2 font-medium">Panels Installed</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
