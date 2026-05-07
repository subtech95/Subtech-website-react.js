"use client";

import { useRef, useEffect } from "react";

const clientLogos = [
  { name: "Airtel", src: "/logos/clients/Airtel-logo.png" },
  { name: "BPTP", src: "/logos/clients/bptpnew.png" },
  { name: "DHL", src: "/logos/clients/DHLnew.png" },
  { name: "Hathway", src: "/logos/clients/Hathway.png" },
  { name: "Honda", src: "/logos/clients/hondanew.png" },
  { name: "Lal Path Lab", src: "/logos/clients/lalpathlabnew.png" },
  { name: "Bhutani", src: "/logos/clients/logo-bhutani.png" },
  { name: "Nalco", src: "/logos/clients/nalkonew.png" },
  { name: "NTPC", src: "/logos/clients/NTPC.NS.png" },
  { name: "Supertech", src: "/logos/clients/supertechnew.png" },
  { name: "Uno Minda", src: "/logos/clients/unoMinda.png" },
];

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex-shrink-0 w-[168px] h-[72px] rounded-xl flex items-center justify-center px-[18px] bg-[#f8f8f6] border border-[#e8e8e4] shadow-sm hover:shadow-md transition-all duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="max-w-[120px] max-h-[44px] w-auto h-auto object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        loading="lazy"
      />
    </div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseEnter = () => {
      track.style.animationPlayState = "paused";
    };
    const handleMouseLeave = () => {
      track.style.animationPlayState = "running";
    };

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const logos = [...clientLogos, ...clientLogos]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden py-[6px]">
      <div
        ref={trackRef}
        className={`flex gap-5 w-max ${reverse ? "animate-marquee-rev" : "animate-marquee-fwd"}`}
      >
        {logos.map((logo, i) => (
          <LogoTile key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarquee() {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-[42px] md:text-[52px] font-semibold text-[#1a1a1a] tracking-[-0.5px]">
          Trusted by <em className="font-normal text-[#666] italic">Industry Leaders</em>
        </h2>
        <p className="text-[18px] text-[#666] mt-3">
          Powering critical infrastructure across India
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[150px] z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-[150px] z-10 bg-gradient-to-l from-white to-transparent" />

        <MarqueeRow />
        <div className="mt-4">
          <MarqueeRow reverse />
        </div>
      </div>
    </section>
  );
}
