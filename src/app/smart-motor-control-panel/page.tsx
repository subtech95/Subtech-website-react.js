import type { Metadata } from "next";
import SmartPanelClient from "@/components/products/SmartPanelClient";

export const metadata: Metadata = {
  title: "Smart Motor Control Panel | PMC + MPU Technology | Subtech",
  description:
    "Subtech Smart Motor Control Panel with PMC powerless switching, MPU digital brain, and 7 built-in protections. No motor burning. No coil damage. Manufacturer: S S Power System, Greater Noida.",
  authors: [{ name: "Subtech - SS Power System" }],
  alternates: { canonical: "https://subtech.in/smart-motor-control-panel" },
  openGraph: {
    type: "website",
    title: "Smart Motor Control Panel | PMC + MPU Technology | Subtech",
    description:
      "7 built-in motor protections. PMC powerless switching. 1000+ hours continuous run. Na Motor Jale, Na Panel.",
    url: "https://subtech.in/smart-motor-control-panel",
    siteName: "Subtech",
    images: [
      {
        url: "https://subtech.in/images/subtech.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Motor Control Panel | Subtech",
    description: "7 built-in motor protections. PMC powerless switching. 1000+ hours continuous run.",
    images: ["https://subtech.in/images/subtech.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Smart Motor Control Panel",
  brand: { "@type": "Brand", name: "Subtech" },
  manufacturer: {
    "@type": "Organization",
    name: "S S Power System",
    url: "https://subtech.in",
  },
  description:
    "Microcontroller-based motor control panel with PMC powerless switching, MPU digital brain, and 7 built-in protections for electric motors and pumps.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    seller: { "@type": "Organization", name: "S S Power System" },
  },
};

export default function SmartMotorControlPanelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmartPanelClient />
    </>
  );
}
