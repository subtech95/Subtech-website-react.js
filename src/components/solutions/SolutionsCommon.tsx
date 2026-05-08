/**
 * Shared building blocks for /solutions and /solutions/[slug].
 * Keeps the boilerplate (stats, trusted-by strip, why-us, FAQ) in one place
 * so the two pages stay visually consistent without duplicate JSX.
 */
import Link from "next/link";
import {
  FAQS,
  SECTORS,
  STATS,
  TRUSTED_BY,
  WHY_SUBTECH,
  type Sector,
} from "@/lib/solutions";
import SectorIcon from "./SectorIcon";

export function SectorGrid({ exclude }: { exclude?: string }) {
  const sectors = exclude
    ? SECTORS.filter((s) => s.slug !== exclude)
    : SECTORS;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {sectors.map((s) => (
        <Link
          key={s.slug}
          href={`/solutions/${s.slug}`}
          className="group bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-red-500 hover:shadow-[0_16px_40px_rgba(204,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col"
        >
          <div className="w-11 h-11 rounded-xl bg-[#FAFAFA] border border-[#EFEFEF] grid place-items-center text-[#0D0D0D] group-hover:text-red-500 group-hover:border-red-500/30 group-hover:bg-red-500/5 transition-colors mb-4">
            <SectorIcon slug={s.slug} className="w-5 h-5" />
          </div>
          <h3 className="text-[17px] font-bold text-[#0D0D0D] leading-snug mb-3 flex-1 group-hover:text-red-500 transition-colors">
            {s.name}
          </h3>
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="text-red-500 font-semibold">
              {s.solutionCount} Solutions
            </span>
            <span className="text-red-500 font-semibold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E8E8E8] rounded-2xl p-5 text-center"
        >
          <p className="text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.01em] text-[#0D0D0D]">
            {s.value}
          </p>
          <p className="text-[11.5px] uppercase tracking-[0.08em] text-[#767676] mt-1">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function TrustedByStrip() {
  return (
    <section className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 mb-12">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-4 text-center">
        Trusted By
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px] text-[#3a3a3a]">
        {TRUSTED_BY.map((c) => (
          <span key={c} className="font-semibold">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

export function WhySubtechSection() {
  return (
    <section className="mb-16">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
        Why Subtech
      </p>
      <h2 className="text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-2 leading-[1.2]">
        Why Industrial Buyers Choose Subtech
      </h2>
      <p className="text-[15px] text-[#3a3a3a] leading-[1.7] max-w-3xl mb-7">
        From single-phase pump starters to complete MCC panels for large
        plants, Subtech brings 25+ years of manufacturing expertise, full
        certification backing, and pan-India dealer support to every project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WHY_SUBTECH.map((b) => (
          <div
            key={b.n}
            className="bg-white border border-[#E8E8E8] rounded-2xl p-6"
          >
            <p className="text-[12px] font-semibold text-red-500 mb-2">{b.n}</p>
            <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-2 leading-snug">
              {b.title}
            </h3>
            <p className="text-[13.5px] text-[#3a3a3a] leading-[1.65]">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="mb-12">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
        FAQ
      </p>
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-6 leading-[1.2]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <details
            key={i}
            className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-[14.5px] font-semibold text-[#0D0D0D] hover:bg-[#FAFAFA] transition">
              <span>{item.q}</span>
              <span className="text-red-500 transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <p className="px-5 pb-5 text-[14px] text-[#3a3a3a] leading-[1.7]">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SectorApplications({ sector }: { sector: Sector }) {
  return (
    <section className="bg-white rounded-2xl border border-[#E8E8E8] p-6 sm:p-8 mb-12">
      <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-1">
        Typical applications
      </h2>
      <p className="text-[13.5px] text-[#767676] mb-5">
        Where Subtech panels show up most often in the {sector.name.toLowerCase()} sector.
      </p>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
        {sector.applications.map((a, i) => (
          <li
            key={i}
            className="text-[14px] text-[#3a3a3a] flex items-start gap-2.5 leading-[1.6]"
          >
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
