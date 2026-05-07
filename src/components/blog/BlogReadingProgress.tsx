"use client";

import { useEffect, useState } from "react";

const RED = "#EF2E33";

/**
 * Thin red progress bar fixed to the top of the viewport — fills as the
 * reader scrolls through the article. Mirrors `.prog` from bloging-single.php.
 */
export default function BlogReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none transition-[width] duration-75 ease-linear"
      style={{
        width: `${pct}%`,
        background: RED,
      }}
    />
  );
}
