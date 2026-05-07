import type { Metadata } from "next";
import PathshalaClient from "@/components/pathshala/PathshalaClient";

export const metadata: Metadata = {
  title: "Subtech Ki Pathshala - Motor Protection Seekho | Subtech",
  description:
    "Free technical education for electricians, dealers, farmers and engineers. Motor protection, VFD, AMF panels, error code lookup, calculators and more. By Subtech, Greater Noida.",
  authors: [{ name: "Subtech - SS Power System" }],
  alternates: { canonical: "https://subtech.in/pathshala" },
  openGraph: {
    type: "website",
    title: "Subtech Ki Pathshala - Free Motor Protection Education",
    description:
      "Error code lookup, HP calculators, wiring guides, video tutorials and articles for electricians, dealers, and engineers.",
    url: "https://subtech.in/pathshala",
    siteName: "Subtech",
    images: [{ url: "https://subtech.in/images/subtech.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subtech Ki Pathshala - Free Motor Protection Education",
    images: ["https://subtech.in/images/subtech.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Subtech Ki Pathshala",
  description:
    "Free technical education hub for electricians, dealers, farmers and engineers on motor protection, VFD, AMF panels and electrical automation.",
  url: "https://subtech.in/pathshala",
  provider: {
    "@type": "Organization",
    name: "S S Power System",
    url: "https://subtech.in",
  },
};

export default function PathshalaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PathshalaClient />
    </>
  );
}
