import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rate Your Electrician | Subtech",
  description:
    "Rate your electrician's service, share your experience, and help us build a network of accountable, quality-driven electricians across India.",
  alternates: { canonical: "https://subtech.in/rate-electrician" },
};

const STATS = [
  { value: "50,000+", label: "Electricians registered" },
  { value: "4.7 / 5", label: "Average rating" },
  { value: "200+", label: "Cities covered" },
  { value: "24h", label: "Response time" },
];

export default function RateElectricianPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#767676] mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span>›</span>
          <span className="text-[#0D0D0D] font-medium">
            Rate Your Electrician
          </span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-3">
            Help us raise the bar
          </p>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4 leading-[1.1]">
            Rate your electrician
          </h1>
          <p className="text-[#3a3a3a] text-[16px] leading-[1.7]">
            Subtech panels are only as reliable as the electrician who installs
            them. Tell us how your installation went — your honest feedback
            improves our network and protects every customer who comes after
            you.
          </p>
        </header>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
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

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form */}
          <main className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8">
            <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-1">
              Share your experience
            </h2>
            <p className="text-[13.5px] text-[#767676] mb-6">
              Takes 60 seconds. Your contact stays confidential.
            </p>

            <form
              method="post"
              action="/api/enquiry"
              className="grid sm:grid-cols-2 gap-5"
            >
              <input
                type="hidden"
                name="product"
                value="Rate Your Electrician submission"
              />

              <Field label="Your Name" name="name" required />
              <Field
                label="Your Mobile"
                name="phone"
                type="tel"
                required
                placeholder="10-digit mobile"
              />

              <Field
                label="Electrician's Name"
                name="electrician_name"
                required
              />
              <Field
                label="Electrician's Mobile"
                name="electrician_phone"
                type="tel"
                placeholder="If known"
              />

              <Field
                label="City / Town"
                name="city"
                required
                placeholder="e.g. Greater Noida"
              />
              <Field
                label="Installation Date"
                name="installation_date"
                type="date"
              />

              {/* Star rating */}
              <div className="sm:col-span-2">
                <label className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-2">
                  Overall Rating
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex gap-1.5">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <label
                      key={n}
                      className="cursor-pointer group"
                      title={`${n} star${n === 1 ? "" : "s"}`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={n}
                        required={n === 5}
                        className="sr-only peer"
                      />
                      <span className="block w-11 h-11 rounded-xl bg-[#F5F5F5] grid place-items-center text-[20px] text-[#CCC] hover:text-amber-400 hover:bg-amber-50 peer-checked:text-amber-400 peer-checked:bg-amber-50 peer-checked:ring-2 peer-checked:ring-amber-300 transition">
                        ★
                      </span>
                    </label>
                  ))}
                  {/* Reverse so 5 stars is leftmost — radios above use n=5..1 left-to-right */}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5">
                  What did the electrician do well?
                </label>
                <textarea
                  name="positives"
                  rows={2}
                  placeholder="Punctuality, neat wiring, clear explanation…"
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11.5px] font-semibold text-[#0D0D0D] uppercase tracking-[0.05em] mb-1.5">
                  What could have been better?
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  name="requirement"
                  rows={3}
                  required
                  placeholder="Be honest — we read every single one."
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg text-[13.5px] focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
                <button
                  type="submit"
                  className="px-7 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
                >
                  Submit Rating →
                </button>
                <p className="text-[12.5px] text-[#767676]">
                  🔒 Your contact details stay confidential. The electrician
                  cannot see who rated them.
                </p>
              </div>
            </form>
          </main>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-[#0D0D0D] text-white rounded-2xl p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
                Are you an electrician?
              </p>
              <h3 className="text-[18px] font-bold mb-3 leading-snug">
                Get listed in Subtech Soldier
              </h3>
              <p className="text-[13.5px] text-white/70 leading-[1.65] mb-5">
                Free app for electricians — register installs, claim cashback
                on every panel, and get inbound leads from customers nearby.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.subtech.app"
                target="_blank"
                rel="noopener"
                className="block w-full text-center px-5 py-3 bg-red-500 text-white rounded-xl font-bold text-[14px] hover:bg-red-600 transition"
              >
                Get the app →
              </a>
            </div>

            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5">
              <h3 className="text-[14px] font-bold text-[#0D0D0D] mb-3">
                Why your rating matters
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#3a3a3a] leading-[1.55]">
                {[
                  "Top-rated electricians get priority leads",
                  "Repeated low ratings → de-listed from our network",
                  "Helps the next customer pick a quality installer",
                  "Direct feedback to Subtech's quality team",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
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
