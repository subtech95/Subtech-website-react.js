import type { Metadata } from "next";
import CareersClient from "@/components/careers/CareersClient";

export const metadata: Metadata = {
  title: "Careers at Subtech | Join India's Smart Motor Control Panel Manufacturer",
  description:
    "Explore career opportunities at Subtech, Greater Noida. Join our team in manufacturing, R&D, sales, and more. Apply now for full-time roles across India.",
  authors: [{ name: "Subtech - SS Power System" }],
  alternates: { canonical: "https://subtech.in/careers" },
  openGraph: {
    type: "website",
    title: "Careers at Subtech | Join India's Smart Motor Control Panel Manufacturer",
    description:
      "Explore career opportunities at Subtech, Greater Noida. Join our team in manufacturing, R&D, sales, and more.",
    url: "https://subtech.in/careers",
    siteName: "Subtech",
    images: [{ url: "https://subtech.in/images/subtech.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Subtech",
    description: "Explore career opportunities at Subtech Electronics, Greater Noida.",
    images: ["https://subtech.in/images/subtech.jpg"],
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
