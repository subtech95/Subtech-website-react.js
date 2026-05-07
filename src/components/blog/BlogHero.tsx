"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RED = "#C8102E";

type Props = {
  initialQuery?: string;
  activeCat?: string;
  totalPosts: number;
  totalCategories: number;
};

/**
 * Editorial blog hero — "Electrical Automation Insights."
 * Mirrors `bloging.php` `.bl-hero`:
 *   - radial soft red glow background
 *   - small "Blogs" red eyebrow (uppercase, letter-spacing 2.5px)
 *   - clamp(36, 5vw, 56) title with red "Insights." accent
 *   - 480px max search bar with 8px corners, red Search button
 *   - meta strip: X+ Articles · Y Technical Topics · Since 1998 Field Experience
 */
export default function BlogHero({
  initialQuery = "",
  activeCat = "",
  totalPosts,
  totalCategories,
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (activeCat) params.set("cat", activeCat);
    if (q) params.set("s", q);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog");
  }

  return (
    <section
      className="relative pt-28 md:pt-[110px] pb-14 md:pb-20 px-4 sm:px-6 overflow-hidden border-b border-[#f5f5f5]"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,16,46,0.08) 0%, rgba(200,16,46,0.03) 50%, #ffffff 100%)",
      }}
    >
      <div className="max-w-[1120px] mx-auto relative z-[1]">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[2.5px] uppercase mb-6"
          style={{ color: RED }}
        >
          Blogs
        </div>

        {/* Title */}
        <h1 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-1.5px] leading-[1.08] text-[#111] mb-5">
          Electrical Automation
          <br />
          <span style={{ color: RED }}>Insights.</span>
        </h1>

        {/* Description */}
        <p className="text-[18px] font-light text-[#6b6b6b] leading-[1.75] max-w-[580px] mb-9">
          Technical articles, troubleshooting guides, and application notes for
          motor control, pump automation, AMF panels, and industrial power
          systems.
        </p>

        {/* Search */}
        <form
          onSubmit={submit}
          className="flex items-stretch max-w-[480px] bg-white border-[1.5px] border-[#d4d4d4] rounded-lg overflow-hidden focus-within:border-[rgba(200,16,46,0.5)] transition-colors"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search articles - e.g. star delta, AMF panel..."
            autoComplete="off"
            className="flex-1 bg-transparent border-0 outline-none px-5 py-3.5 text-[15px] text-[#111] placeholder:text-[#6b6b6b]"
          />
          <button
            type="submit"
            className="px-6 py-3.5 text-white font-semibold text-[14px] transition whitespace-nowrap"
            style={{ background: RED }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a00d24")}
            onMouseLeave={(e) => (e.currentTarget.style.background = RED)}
          >
            Search
          </button>
        </form>

        {/* Meta strip */}
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          <Meta strong={`${totalPosts}+`} label="Articles Published" />
          <Meta strong={String(totalCategories)} label="Technical Topics" />
          <Meta strong="Since 1998" label="Field Experience" />
        </div>
      </div>
    </section>
  );
}

function Meta({ strong, label }: { strong: string; label: string }) {
  return (
    <div className="text-[13px] text-[#6b6b6b] flex items-center gap-1.5">
      <strong className="text-[#1a1a1a] font-semibold">{strong}</strong>
      {label}
    </div>
  );
}
