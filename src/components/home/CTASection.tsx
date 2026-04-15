import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#CC0000] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-[48px] font-semibold text-white tracking-[-1px] leading-[1.2] mb-4">
          Ready to Protect Your Motors?
        </h2>
        <p className="text-white/80 text-lg mb-10">
          Get a custom quote in 2 hours
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#CC0000] font-semibold px-10 py-4 rounded-lg hover:bg-white/90 transition-colors duration-200 text-lg"
        >
          Get Free Quote
        </Link>
      </div>
    </section>
  );
}
