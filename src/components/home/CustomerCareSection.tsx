"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const careLinks = [
  {
    href: "/customer-care",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#222] fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    label: "Service Request",
  },
  {
    href: "/customer-care",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#222] fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "For Warranty",
  },
  {
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#222] fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 15.92z" />
      </svg>
    ),
    label: "Contact Us",
  },
];

const features = [
  { icon: "/images/icons/shopping-cart.png", text: "Buy in store or online" },
  { icon: "/images/icons/service.png", text: "Service and Installation" },
  { icon: "/images/icons/warranty-white.png", text: "Product Warranty" },
  { icon: "/images/icons/product-review.png", text: "Top Rated Products" },
];

export default function CustomerCareSection() {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile
    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    setSubmitting(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setSubmitting(false);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", mobile: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 bg-gray-500 rounded-xl border border-[#eee] hover:border-[#ddd] transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feat.icon} alt={feat.text} className="w-12 h-12 mb-3 object-contain" loading="lazy" />
                  <span className="text-[13px] font-medium text-[#333]">{feat.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[24px] font-bold text-[#111] mb-2">Customer Care</h3>
            <p className="text-[14px] text-[#888] mb-6">Have a query about our services?</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-3xl mb-3">&#10003;</div>
                <p className="text-green-700 font-semibold">Thank you! We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, "") })}
                    className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[14px] focus:outline-none focus:border-[#cc0000] transition-colors bg-white text-black"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[14px] focus:outline-none focus:border-[#cc0000] transition-colors bg-white text-black"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[14px] focus:outline-none focus:border-[#cc0000] transition-colors bg-white text-black"
                />
                <textarea
                  placeholder="Your Message *"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg text-[14px] focus:outline-none focus:border-[#cc0000] transition-colors resize-none bg-white text-black"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-[#111] text-white font-semibold rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 bg-white border border-[#e8e8e8] rounded-[20px] p-5"
        >
          <ul className="flex flex-col md:flex-row gap-[14px] list-none m-0 p-0">
            {careLinks.map((link) => (
              <li key={link.label} className="flex-1">
                <Link
                  href={link.href}
                  className="flex items-center gap-3 p-4 bg-[#fafafa] border border-[#ebebeb] rounded-[14px] no-underline text-[#111] hover:border-gray-400 hover:-translate-y-[1px] transition-all"
                >
                  <span className="w-10 h-10 min-w-[40px] bg-[#f0f0f0] rounded-[10px] flex items-center justify-center">
                    {link.icon}
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-[#1a1a1a] whitespace-nowrap">
                    {link.label}
                  </span>
                  <span className="w-8 h-8 min-w-[32px] bg-[#ebebeb] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#444] fill-none stroke-2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
