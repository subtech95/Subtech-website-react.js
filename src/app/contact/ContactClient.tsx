"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Status = { type: "success" | "error"; message: string } | null;

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const quickCards = [
  {
    title: "Customer Care",
    desc: "To register your product, raise a service request or for customer care details, click here.",
    href: "/customer-care",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Complaints",
    desc: "To escalate existing complaints about products, please follow this link.",
    href: "/customer-care",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M8 12H8.009M11.991 12H12M15.991 12H16"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Contact Us",
    desc: "Fill out our detailed contact form and we'll get back to you within 24 hours.",
    href: "#contact-form",
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

const socials = [
  { href: "https://www.facebook.com/subtech.in", label: "Facebook", initials: "Fb" },
  { href: "https://www.instagram.com/subtech.in/", label: "Instagram", initials: "Ig" },
  { href: "https://linkedin.com/company/subtech-in/", label: "LinkedIn", initials: "In" },
  { href: "https://www.youtube.com/@subtech.e", label: "YouTube", initials: "Yt" },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setStatus({ type: "error", message: "Enter Valid Mobile Number" });
      setTimeout(() => setStatus(null), 2500);
      return;
    }

    setSubmitting(true);
    try {
      const r = await fetch("https://crm.subtech.in/api/website/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await r.json().catch(() => ({}));
      if (!r.ok || json.status !== true) {
        throw new Error(json.message || "Submission failed. Please try again.");
      }
      setStatus({ type: "success", message: "Thank you. We will get back to you shortly." });
      setForm({ name: "", email: "", mobile: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let v = e.target.value;
    if (k === "name") v = v.replace(/[^a-zA-Z\s]/g, "");
    if (k === "mobile") v = v.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, [k]: v });
  };

  return (
    <div className="bg-[#FAFAFA] text-[#0D0D0D]">
      {/* HERO */}
      <section className="relative min-h-[420px] grid place-items-center text-center px-[5vw] pt-[120px] pb-[70px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(204, 0, 0, 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-[#CC0000]/10 text-red-500 rounded-full px-3.5 py-[5px] text-[0.78rem] font-semibold tracking-[0.06em] uppercase mb-[22px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            We&apos;re here to help
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold leading-[1.08] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
          >
            You can reach out to
            <br />
            us <em className="not-italic text-red-500">anytime.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[520px] mx-auto mt-[18px] text-[#767676] text-[1rem] font-light leading-[1.65]"
          >
            Whether you have a query, feedback, or you&apos;re just here to say hello, we&apos;re always
            happy to help. Connect with us on our customer care number.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-3.5 flex-wrap justify-center mt-9"
          >
            <a
              href="tel:918506060580"
              className="inline-flex items-center gap-2.5 px-[26px] py-3 rounded-xl text-[0.95rem] font-semibold bg-red-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
            >
              <PhoneIcon /> 8506060580
            </a>
            <a
              href="tel:+918506060581"
              className="inline-flex items-center gap-2.5 px-[26px] py-3 rounded-xl text-[0.95rem] font-semibold bg-transparent text-[#0D0D0D] border-[1.5px] border-[#E8E8E8] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
            >
              <PhoneIcon /> +91 8506060581
            </a>
          </motion.div>
        </div>
      </section>

      {/* QUICK CARDS */}
      <section className="px-[5vw] pb-20">
        <div className="grid gap-4 max-w-[1100px] mx-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {quickCards.map((card, i) => {
            const Inner = (
              <>
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#CC0000]/10 flex items-center justify-center mx-auto mb-[18px] text-red-500">
                  {card.icon}
                </div>
                <h5 className="text-[1rem] font-bold mb-2">{card.title}</h5>
                <p className="text-[0.875rem] text-[#767676] leading-[1.55] mb-3.5">{card.desc}</p>
                <span className="text-red-500 text-[0.85rem] font-semibold">Learn more &rsaquo;</span>
              </>
            );
            const baseCls =
              "group block bg-white border border-[#E8E8E8] rounded-2xl px-7 py-8 text-center transition-all hover:border-red-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(204,0,0,0.08)] relative overflow-hidden";
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {card.href.startsWith("#") ? (
                  <a href={card.href} className={baseCls}>
                    {Inner}
                  </a>
                ) : (
                  <Link href={card.href} className={baseCls}>
                    {Inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="contact-form" className="bg-[#0D0D0D] py-24 px-[5vw] relative overflow-hidden">
        <div
          className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(204, 0, 0, 0.14) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-extrabold leading-[1.1] tracking-[-0.03em] text-white mb-3.5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Get In Touch with <span className="text-red-500">Subtech</span>
            </h2>
            <p className="text-white/50 text-[0.95rem] leading-[1.65] max-w-[340px]">
              Please submit all general enquiries in the contact form and we look forward to hearing from you soon.
            </p>
            <div className="w-10 h-[3px] bg-red-500 rounded-sm my-7" />
            <div className="flex flex-col gap-[18px]">
              {[
                { label: "Sales & Marketing", val: "+91 8506060580", href: "tel:+918506060580" },
                { label: "Service & Complaint", val: "+91 8506060581", href: "tel:+918506060581" },
                { label: "Email", val: "support@subtech.in", href: "mailto:support@subtech.in" },
                { label: "Working Hours", val: "9:30am – 6pm, Mon – Sat" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3.5 items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-[6px] flex-shrink-0" />
                  <div>
                    <div className="text-[0.75rem] uppercase tracking-[0.08em] text-white/35 font-semibold mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[0.95rem] text-white/80">
                      {item.href ? (
                        <a href={item.href} className="hover:text-red-500 transition-colors">
                          {item.val}
                        </a>
                      ) : (
                        item.val
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id="name" label="Your Name *" placeholder="John Doe" value={form.name} onChange={update("name")} />
              <Field
                id="email"
                label="Your Email *"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="mobile"
                label="Your Mobile *"
                type="tel"
                placeholder="+91 00000 00000"
                value={form.mobile}
                onChange={update("mobile")}
              />
              <Field
                id="subject"
                label="Subject *"
                placeholder="How can we help?"
                value={form.subject}
                onChange={update("subject")}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="message" className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-white">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell us more about your query…"
                value={form.message}
                onChange={update("message")}
                className="bg-white/5 border border-white/10 rounded-[10px] text-white px-4 py-[13px] text-[0.95rem] outline-none transition-all focus:border-red-500 focus:bg-[#CC0000]/[0.06] resize-none h-[120px] placeholder:text-white/25"
              />
            </div>

            {status && (
              <div
                className={`text-[0.875rem] px-3.5 py-2.5 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "bg-red-500/10 text-red-400 border border-red-500/30"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 px-9 py-3.5 bg-red-500 text-white border-none rounded-xl text-[1rem] font-bold cursor-pointer transition-all self-start hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(204,0,0,0.35)] disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Submit Query →"}
            </button>
          </motion.form>
        </div>
      </section>

      {/* DETAILS + MAP */}
      <section className="py-24 px-[5vw]">
        <div className="max-w-[1100px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-red-500 mb-3"
          >
            Our Location
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-extrabold tracking-[-0.025em] mb-2.5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            Contact Us
          </motion.h2>
          <p className="text-[#767676] text-[0.95rem] mb-14">
            Have a question? Contact us using the customer support channels below.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="grid grid-cols-2 gap-9">
                <DetailBlock label="Address">
                  <a
                    href="https://maps.app.goo.gl/rvx81LF7kkFrCXaP9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[0.95rem] text-[#0D0D0D] leading-[1.65] hover:text-red-500"
                  >
                    271, Udyog Kendra 2,
                    <br />
                    Ecotech III, Greater Noida,
                    <br />
                    Tusyana, UP 201306
                  </a>
                </DetailBlock>

                <DetailBlock label="Hours">
                  <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#16A34A] rounded-full px-3 py-1 text-[0.78rem] font-semibold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                    Open Now
                  </div>
                  <p className="text-[0.95rem] leading-[1.65]">
                    Mon – Sat
                    <br />
                    9:30am – 6:00 pm
                  </p>
                </DetailBlock>

                <DetailBlock label="Sales & Marketing">
                  <a href="tel:+918506060580" className="block text-[0.95rem] hover:text-red-500">
                    +91 8506060580
                  </a>
                </DetailBlock>

                <DetailBlock label="Service & Complaint">
                  <a href="tel:+918506060581" className="block text-[0.95rem] hover:text-red-500">
                    +91 8506060581
                  </a>
                </DetailBlock>

                <DetailBlock label="Email">
                  <a href="mailto:support@subtech.in" className="block text-[0.95rem] hover:text-red-500">
                    support@subtech.in
                  </a>
                </DetailBlock>
              </div>

              <div className="flex gap-2.5 mt-7 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-[9px] bg-[#E8E8E8] text-[#767676] text-[0.8rem] font-bold flex items-center justify-center transition-colors hover:bg-red-500 hover:text-white"
                  >
                    {s.initials}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] overflow-hidden border border-[#E8E8E8] h-[340px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5!2d77.4765857!3d28.5313038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f179299ded%3A0xa16e659d4bff04f!2sSubtech!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Subtech Electronics Location - 271, Udyog Kendra 2, Ecotech III, Greater Noida"
                className="w-full h-full block border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-white">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/5 border border-white/10 rounded-[10px] text-white px-4 py-[13px] text-[0.95rem] outline-none transition-all focus:border-red-500 focus:bg-[#CC0000]/[0.06] w-full placeholder:text-white/25"
      />
    </div>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[0.8rem] font-bold text-[#767676] uppercase tracking-[0.08em] mb-2">{label}</h4>
      {children}
    </div>
  );
}
