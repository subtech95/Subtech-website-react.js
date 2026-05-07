"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function BlogInstantFilter({ children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    function onFilter(e: Event) {
      const q = ((e as CustomEvent<string>).detail || "").toLowerCase().trim();
      const root = wrapRef.current;
      if (!root) return;

      const cards = root.querySelectorAll<HTMLElement>(".blog-card");
      const grid = root.querySelector<HTMLElement>("#blogGrid");
      let shown = 0;

      const old = root.querySelector(".blog-no-match");
      if (old) old.remove();

      cards.forEach((card) => {
        const title = card.dataset.title ?? "";
        const excerpt = card.dataset.excerpt ?? "";
        const author = card.dataset.author ?? "";
        const matches =
          !q ||
          title.includes(q) ||
          excerpt.includes(q) ||
          author.includes(q);
        card.style.display = matches ? "" : "none";
        if (matches) shown++;
      });

      if (q) {
        setStatus(
          `${shown} article${shown !== 1 ? "s" : ""} found for "${q}"`,
        );
      } else {
        setStatus("");
      }

      if (q && shown === 0 && grid) {
        const msg = document.createElement("div");
        msg.className =
          "blog-no-match col-span-full text-center py-12 text-[#9ca3af] text-sm";
        msg.innerHTML = `No articles match <strong class="text-[#e93132]">"${escapeHtml(
          q,
        )}"</strong> on this page. <a class="text-[#e93132] underline" href="/blog?s=${encodeURIComponent(
          q,
        )}">Search all posts</a>`;
        grid.appendChild(msg);
      }
    }

    window.addEventListener("blog-instant-filter", onFilter);
    return () => window.removeEventListener("blog-instant-filter", onFilter);
  }, []);

  return (
    <div ref={wrapRef}>
      {children}
      {status && (
        <div className="text-xs text-[#9ca3af] mt-2 text-center">{status}</div>
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
