/**
 * Shared shell for legal pages (privacy, return, terms). Keeps the layout
 * consistent across them and lets the page content focus on copy.
 */
import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id?: string;
  heading: string;
  body: ReactNode;
};

export default function LegalPage({
  title,
  intro,
  sections,
  contact = true,
}: {
  title: string;
  intro?: ReactNode;
  sections: LegalSection[];
  contact?: boolean;
}) {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">{title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Legal
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] leading-[1.1] mb-4">
            {title}
          </h1>
          {intro && (
            <div className="text-[15px] text-[#3a3a3a] leading-[1.75]">
              {intro}
            </div>
          )}
          <p className="text-[12px] text-[#999] mt-4">
            Last updated: January 2026
          </p>
        </header>

        {/* Sections */}
        <article className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 space-y-9">
          {sections.map((s, i) => (
            <section key={i} id={s.id}>
              <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-3 leading-snug">
                {s.heading}
              </h2>
              <div className="text-[14.5px] text-[#3a3a3a] leading-[1.75] space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-red-500">
                {s.body}
              </div>
            </section>
          ))}

          {contact && (
            <section className="border-t border-[#F0F0F0] pt-8">
              <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-3 leading-snug">
                Contact Us
              </h2>
              <p className="text-[14.5px] text-[#3a3a3a] leading-[1.75]">
                Questions about this policy? Reach out to the Subtech team:
              </p>
              <ul className="mt-3 text-[14.5px] text-[#3a3a3a] leading-[1.85]">
                <li>
                  <strong className="text-[#0D0D0D]">Email:</strong>{" "}
                  <a
                    href="mailto:ecommerce@subtech.in"
                    className="text-red-500"
                  >
                    ecommerce@subtech.in
                  </a>
                </li>
                <li>
                  <strong className="text-[#0D0D0D]">Phone:</strong>{" "}
                  <a href="tel:+918506060582" className="text-red-500">
                    +91 85060 60582
                  </a>
                </li>
                <li>
                  <strong className="text-[#0D0D0D]">Address:</strong> 271,
                  Udyog Kendra II, Ecotech III, Greater Noida – 201306, Uttar
                  Pradesh, India
                </li>
              </ul>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
