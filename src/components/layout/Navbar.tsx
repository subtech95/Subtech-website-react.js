"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", path: "/products" },
    { name: "Solutions", path: "/products" },
    { name: "Technology", path: "/#technology" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Placeholder for GA4 tracking
  const trackClick = (eventName: string, data: Record<string, string>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", eventName, data);
    } else {
      console.log("GA4 Event Triggered:", eventName, data);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-subtle/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="relative z-10 block h-[36px] w-[140px]">
          <Image
            src="/logos/white.svg"
            alt="Subtech Industrial Motor Protection Panels"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[16px] text-white/90">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-white transition-colors hover:text-red-500 duration-200 ${
                pathname === link.path ? "text-white font-medium" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block relative z-10">
          <Link
            href="/contact"
            onClick={() => trackClick("click_get_quote_nav", { button_location: "navbar" })}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-[8px] font-medium transition-colors duration-200 inline-block text-[15px]"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative z-10 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Slide Down */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-subtle/10 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[16px] py-1"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => {
              trackClick("click_get_quote_nav", { button_location: "navbar_mobile" });
              setMobileMenuOpen(false);
            }}
            className="bg-red-500 text-center text-white px-6 py-3 rounded-[8px] font-medium mt-2"
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
