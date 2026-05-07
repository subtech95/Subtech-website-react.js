"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "What is a motor starter and how does it work?",
    answer:
      "A motor starter is a device that starts, stops, and protects an electric motor using a switching mechanism and overload/short-circuit protection. Subtech motor starters use PMC (Pre-Magnetic Contactor) technology, an advanced alternative to conventional contactors for enhanced protection and reliable operation.",
  },
  {
    question: "What are the different types of motor control panels?",
    answer:
      "Common motor control types include DOL (Direct-On-Line), Star-Delta, Soft Starter, Auto-Transformer, and VFD-based systems. Subtech provides smart motor control panels using PMC technology for safer and more reliable switching in industrial and agricultural applications.",
  },
  {
    question: "Why do motors need protection and control systems?",
    answer:
      "Motors need protection to reduce starting stress, prevent overheating/overcurrent damage, and protect wiring and equipment from abnormal conditions. Subtech PMC-based control systems improve protection reliability and help reduce motor failures.",
  },
  {
    question: "What is PMC technology in motor control?",
    answer:
      "PMC (Pre-Magnetic Contactor) is Subtech's advanced switching/protection technology designed to improve reliability and protection compared to conventional contactor-based switching, delivering safer and more dependable motor control for industrial applications.",
  },
  {
    question: "Which motor control panel is best for my motor (DOL or Star-Delta)?",
    answer:
      "For small motors (up to ~10-15 HP), a DOL panel is ideal. For higher HP motors (typically 10-50 HP), a Star-Delta panel is preferred to reduce starting current and improve motor safety. Both are available with Subtech's PMC technology.",
  },
  {
    question: "Can Subtech customize control panels as per site requirements?",
    answer:
      "Yes. Subtech offers custom-built electrical control panels based on your motor HP, voltage, automation needs, protections, enclosure IP rating, and application. Contact us at info@subtech.in for customized solutions.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#e5e7eb]">
      <button
        onClick={onClick}
        className="w-full py-6 bg-transparent border-0 text-left cursor-pointer flex justify-between items-center text-[16px] md:text-[18px] font-semibold text-[#1f2937] hover:text-[#b22809] transition-colors"
      >
        <span>{question}</span>
        <svg
          className={`flex-shrink-0 w-6 h-6 ml-5 text-[#9ca3af] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#b22809]" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#4b5563] text-[15px] md:text-[16px] leading-[1.7]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[900px] mx-auto mt-[60px] bg-[#F8F9FA] rounded-xl p-8 md:p-[50px_40px] shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[#b22809] text-[36px] font-bold uppercase tracking-[1px] mb-3">
            FAQ&apos;s
          </div>
          <h2 className="text-[25px] text-[#1a1a1a] font-semibold mb-4">
            Looking for answers?
          </h2>
        </div>

        {/* FAQ List */}
        <div className="mt-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact */}
        <div className="mt-[50px] pt-10 border-t-2 border-[#e5e7eb] text-center">
          <h3 className="text-[20px] font-semibold text-[#1f2937] mb-4">
            Still have questions?
          </h3>
          <Link
            href="/contact"
            className="inline-block px-8 py-[14px] bg-[#EF2E33] text-white text-[16px] font-semibold rounded-[25px] hover:bg-[#080808] hover:-translate-y-[2px] transition-all duration-200 mt-4"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
