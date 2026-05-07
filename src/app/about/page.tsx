import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Subtech - Electrical Automation Manufacturer Since 1998",
  description:
    "Know our story — Subtech is a Greater Noida based manufacturer of motor starters, LT panels, AMF/ATS and control panels since 1998. Trusted by 200+ businesses across India.",
  alternates: {
    canonical: "https://subtech.in/about",
  },
  openGraph: {
    type: "website",
    url: "https://subtech.in/about",
    siteName: "Subtech",
    title: "About Us | Subtech - Electrical Automation Manufacturer Since 1998",
    description:
      "Know our story — Subtech is a Greater Noida based manufacturer of motor starters, LT panels, AMF/ATS and control panels since 1998.",
    images: [
      {
        url: "https://subtech.in/images/subtech.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
