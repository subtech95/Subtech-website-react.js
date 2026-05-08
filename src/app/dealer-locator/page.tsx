import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find a Subtech Dealer | Dealer Locator",
  description:
    "Find the nearest Subtech dealer for motor starters, control panels and electrical automation. Available across India — share your location and we will connect you to the closest authorised dealer.",
  alternates: { canonical: "https://subtech.in/dealer-locator" },
};

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const FEATURED_DEALERS = [
  {
    name: "HK Electrical",
    contact: "HK Sharma",
    deals: "Motor Starter",
    address: "Sec - 51 Noida, Noida, 201301",
    phone: "+91 96543 02280",
  },
  {
    name: "Bhavana Electrical",
    contact: "Yogendra Tyagi",
    deals: "Motor Starter",
    address: "Indrapuram, Ghaziabad, 201014",
    phone: "+91 98116 40072",
  },
  {
    name: "Mukul Pipe Store",
    contact: "Kushal Rawla",
    deals: "Motor Starter",
    address: "Bilaspur, Bilaspur, 244921",
    phone: "+91 97601 77800",
  },
];

export default function DealerLocatorPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">Dealer Locator</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            220+ Dealers Across India
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            Find your nearest Subtech dealer
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            Tell us where you are and what you&apos;re looking for. Our team
            will connect you to the closest authorised Subtech dealer within 2
            working hours.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Form */}
          <main className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8">
            <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-6">
              Request a dealer connection
            </h2>

            <form
              method="post"
              action="/api/enquiry"
              className="grid sm:grid-cols-2 gap-5"
            >
              <input type="hidden" name="product" value="Dealer Locator enquiry" />

              <Field label="Full Name" name="name" required />
              <Field
                label="Mobile Number"
                name="phone"
                type="tel"
                required
                placeholder="10-digit mobile number"
              />

              <Select label="State" name="state" required options={STATES} />
              <Field
                label="City / District"
                name="city"
                required
                placeholder="e.g. Greater Noida"
              />

              <Field
                label="Pincode"
                name="pincode"
                placeholder="6-digit pincode"
              />
              <Select
                label="Looking for"
                name="qty"
                required
                options={[
                  "Single Phase Starter",
                  "Three Phase Starter",
                  "Two Phase Starter",
                  "AMF / ATS Panel",
                  "VFD Panel",
                  "Custom Panel",
                  "Spare Parts",
                  "Other",
                ]}
              />

              <div className="sm:col-span-2">
                <label className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  name="requirement"
                  rows={3}
                  placeholder="Quantity, motor HP, application…"
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
                <button
                  type="submit"
                  className="px-7 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
                >
                  Find My Dealer →
                </button>
                <p className="text-[12.5px] text-[#767676]">
                  🔒 We&apos;ll never share your number with anyone other than
                  authorised dealers.
                </p>
              </div>
            </form>
          </main>

          {/* Right column: featured dealers + contact */}
          <aside className="space-y-5">
            <div className="bg-[#0D0D0D] text-white rounded-2xl p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
                Want to become a dealer?
              </p>
              <h3 className="text-[18px] font-bold mb-3 leading-snug">
                Join 220+ partners across India
              </h3>
              <p className="text-[13.5px] text-white/70 leading-[1.65] mb-5">
                Margins, marketing support, training, and an exclusive
                territory model.
              </p>
              <Link
                href="/contact?subject=Dealer%20enquiry"
                className="inline-block w-full text-center px-5 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
              >
                Apply for Dealership →
              </Link>
            </div>

            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5">
              <h3 className="text-[14px] font-bold text-[#0D0D0D] mb-3">
                Or call us directly
              </h3>
              <a
                href="tel:+918506060582"
                className="block text-red-500 font-bold text-[18px] mb-1"
              >
                +91 85060 60582
              </a>
              <p className="text-[12px] text-[#767676]">
                Mon-Sat, 9 AM - 7 PM IST
              </p>
            </div>
          </aside>
        </div>

        {/* Featured dealers */}
        <section className="mt-14">
          <h2 className="text-[clamp(22px,2.5vw,28px)] font-bold tracking-[-0.01em] text-[#0D0D0D] mb-1">
            Featured authorised dealers
          </h2>
          <p className="text-[14px] text-[#767676] mb-6">
            A glimpse of our active partners — full directory shared after you
            submit the form.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_DEALERS.map((d) => (
              <article
                key={d.name}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-red-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition"
              >
                <h3 className="text-[16px] font-bold text-[#0D0D0D] mb-1 leading-snug">
                  {d.name}
                </h3>
                <p className="text-[12px] text-red-500 font-semibold uppercase tracking-[0.05em] mb-3">
                  {d.contact}
                </p>
                <p className="text-[13px] text-[#3a3a3a] leading-[1.6] mb-4">
                  <strong>Deals in:</strong> {d.deals}
                  <br />
                  {d.address}
                </p>
                <a
                  href={`tel:${d.phone.replace(/[^+\d]/g, "")}`}
                  className="text-[13.5px] text-red-500 font-semibold hover:underline"
                >
                  {d.phone}
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`f-${name}`}
        className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={`f-${name}`}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={`f-${name}`}
        className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        required={required}
        defaultValue=""
        className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] bg-white focus:border-red-500 focus:outline-none"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
