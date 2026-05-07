import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you | Subtech",
  description:
    "Thanks for your enquiry. Our sales team will get back to you within 2 hours.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }> | { p?: string };
}) {
  const params =
    "then" in (searchParams as Promise<{ p?: string }>)
      ? await (searchParams as Promise<{ p?: string }>)
      : (searchParams as { p?: string });
  const product = params.p ?? "your enquiry";

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white border border-[#E8E8E8] rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 grid place-items-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CC0000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-3 leading-[1.15]">
            Thank you!
          </h1>
          <p className="text-[15px] text-[#3a3a3a] leading-[1.7] mb-1">
            We&apos;ve received your enquiry for{" "}
            <strong className="text-[#0D0D0D]">{product}</strong>.
          </p>
          <p className="text-[15px] text-[#3a3a3a] leading-[1.7] mb-8">
            Our sales team will reach out within{" "}
            <strong className="text-[#0D0D0D]">2 working hours</strong>.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-md mx-auto text-[13.5px]">
            <a
              href="tel:+918506060582"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0D0D0D] text-white rounded-xl font-semibold hover:bg-black transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              085060 60582
            </a>
            <a
              href="https://wa.me/918506060582"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:brightness-95 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4l-2-1c-.3-.1-.6 0-.8.2l-.9 1.1c-1.5-.7-2.7-1.9-3.4-3.4l1.1-.9c.2-.2.3-.5.2-.8l-1-2c-.2-.4-.6-.6-1-.5l-1.7.4c-.4.1-.7.4-.7.8 0 4.7 3.8 8.5 8.5 8.5.4 0 .8-.3.8-.7l.4-1.7c.1-.4-.1-.8-.5-1z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <Link
            href="/products/motor-control-solutions"
            className="text-red-500 font-semibold text-[14px] hover:underline"
          >
            ← Browse more products
          </Link>
        </div>
      </div>
    </div>
  );
}
