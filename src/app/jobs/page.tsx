import type { Metadata } from "next";
import CareersClient from "@/components/careers/CareersClient";

export const metadata: Metadata = {
  title: "Jobs at Subtech | Open Positions in Greater Noida",
  description:
    "Browse open jobs at Subtech, Greater Noida. Roles in sales, manufacturing, R&D, marketing, service and more. Apply online — full-time positions across India.",
  authors: [{ name: "Subtech - SS Power System" }],
  alternates: { canonical: "https://subtech.in/jobs" },
  openGraph: {
    type: "website",
    title: "Jobs at Subtech | Open Positions in Greater Noida",
    description:
      "Browse open jobs at Subtech. Sales, manufacturing, R&D, marketing, service and more. Apply online today.",
    url: "https://subtech.in/jobs",
    siteName: "Subtech",
    images: [{ url: "https://subtech.in/images/subtech.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs at Subtech",
    description: "Browse open jobs at Subtech, Greater Noida.",
    images: ["https://subtech.in/images/subtech.jpg"],
  },
};

export default function JobsPage() {
  return <CareersClient />;
}
