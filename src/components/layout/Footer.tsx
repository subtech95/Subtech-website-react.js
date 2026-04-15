import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-subtle/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="h-[36px] relative w-[140px] mb-6">
              <Image
                src="/logos/white.svg"
                alt="Subtech Industrial Power Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-muted text-[16px] leading-[1.7] mb-6">
              Industrial Power. Engineered for India. Protecting motors and machines since 1998.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-[18px] mb-6">Products</h4>
            <ul className="space-y-4 text-gray-muted text-[15px]">
              <li><Link href="/products" className="hover:text-red-500 transition-colors">VFD Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">AMF Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">MCC Panels</Link></li>
              <li><Link href="/products" className="hover:text-red-500 transition-colors">Motor Starters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] mb-6">Company</h4>
            <ul className="space-y-4 text-gray-muted text-[15px]">
              <li><Link href="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/about#certifications" className="hover:text-red-500 transition-colors">Certifications</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><Link href="/#technology" className="hover:text-red-500 transition-colors">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] mb-6">Contact</h4>
            <address className="not-italic space-y-4 text-gray-muted text-[15px]">
              <p>Subtech, Plot No X, Sector Y,<br />Faridabad, Haryana, India</p>
              <p><a href="tel:+910000000000" className="hover:text-white transition-colors">+91-0000000000</a></p>
              <p><a href="mailto:info@subtech.in" className="hover:text-white transition-colors">info@subtech.in</a></p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-subtle/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-muted text-[14px]">
            &copy; {new Date().getFullYear()} Subtech. All rights reserved.
          </p>
          <div className="flex gap-4 text-gray-muted text-[13px] uppercase tracking-wider font-light">
            <span>ISO 9001</span>
            <span className="hidden sm:inline">•</span>
            <span>ISO 14001</span>
            <span className="hidden sm:inline">•</span>
            <span>CE</span>
            <span className="hidden sm:inline">•</span>
            <span>CPRI</span>
            <span className="hidden sm:inline">•</span>
            <span>ZED Silver</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
