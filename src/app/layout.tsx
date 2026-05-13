import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Subtech | Industrial Motor Protection Panels | Greater Noida",
  description: "Subtech manufactures VFD panels, AMF panels, MCC panels and motor starters. Trusted by GAIL, NTPC, DMRC. Est. 1998, Greater Noida.",
  keywords: "motor starter India, VFD panel manufacturer, AMF panel supplier, MCC panel, Industrial control panels, Subtech Greater Noida",
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.subtech.in",
    siteName: "Subtech",
    title: "Subtech | Industrial Motor Protection Panels | Greater Noida",
    description: "Subtech manufactures VFD panels, AMF panels, MCC panels and motor starters. Trusted by GAIL, NTPC, DMRC. Est. 1998, Greater Noida.",
    images: [
      {
        url: "https://www.subtech.in/logos/big logo.svg", // Fallback to logo or replace with a real OG image later
        width: 1200,
        height: 630,
        alt: "Subtech Industrial Power",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subtech | Industrial Motor Protection Panels",
    description: "Subtech manufactures VFD panels, AMF panels, MCC panels and motor starters. Trusted by GAIL, NTPC, DMRC. Est. 1998.",
    images: ["https://www.subtech.in/logos/big logo.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Subtech",
  url: "https://www.subtech.in",
  logo: "https://www.subtech.in/logos/big logo.svg",
  foundingDate: "1998",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+91-0000000000",
    email: "info@subtech.in"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "271, Udyog Kendra II, Ecotech III",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201306",
    addressCountry: "India"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${cormorant.variable} antialiased font-sans`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Subtech AI chat widget (legacy PHP, proxied via nginx to subtech-website droplet) */}
        <Script src="/chat-widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
