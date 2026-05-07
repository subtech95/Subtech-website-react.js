import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Power And Energy Management | Subtech",
  description:
    "Power and energy management panels — coming soon to the Subtech online catalog. Talk to our sales team for current offerings: AMF, ATS, APFC and metering panels.",
  alternates: {
    canonical: "https://subtech.in/products/power-and-energy-managment",
  },
};

export default function PowerEnergyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-red-500">Products</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">
            Power And Energy Managment
          </span>
        </nav>

        <div className="max-w-3xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Product Family
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            Power And Energy Management
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            We are bringing our full power and energy management range online.
            In the meantime, our sales team can quote AMF, ATS, APFC, MCC and
            metering panels for your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7">
            <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-3">
              What we make
            </h2>
            <ul className="space-y-2.5 text-[14px] text-[#3a3a3a]">
              {[
                "AMF (Auto Mains Failure) Panels",
                "ATS (Automatic Transfer Switch) Panels",
                "APFC (Automatic Power Factor Correction) Panels",
                "MCC and PCC Panels",
                "LT Distribution Panels",
                "Energy & sub-metering panels",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0D0D0D] text-white rounded-2xl p-7">
            <h2 className="text-[20px] font-bold mb-3">
              Get a quote in 24 hours
            </h2>
            <p className="text-[14px] text-white/70 leading-[1.65] mb-5">
              Share your single-line diagram or load list and our engineering
              team will reply with a panel proposal.
            </p>
            <Link
              href="/contact?subject=Power%20%26%20Energy%20Management%20enquiry"
              className="inline-block px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition mb-3"
            >
              Request a Custom Solution →
            </Link>
            <p className="text-[12.5px] text-white/55">
              Or call 085060 60582 · ecommerce@subtech.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
