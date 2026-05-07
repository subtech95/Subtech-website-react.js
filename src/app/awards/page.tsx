import type { Metadata } from "next";
import AwardsClient from "./AwardsClient";

export const metadata: Metadata = {
  title:
    "Awards & Certifications | Subtech | ISO 9001, ISO 14001, CE Certified",
  description:
    "Subtech is ISO 9001, ISO 14001, ISO 45001, ISO 50001, CE and IEC certified. Approved by UP Jal Nigam, Delhi Jal Board and recognized under NSIC, ZED, Udyam.",
  keywords:
    "Subtech certifications, ISO 9001 panel manufacturer, ISO 14001 Subtech, CE certified panels, IEC certified Subtech, NSIC Subtech, ZED certified, UP Jal Nigam approved, DJB approved",
  alternates: {
    canonical: "https://subtech.in/awards",
  },
  openGraph: {
    type: "website",
    url: "https://subtech.in/awards",
    siteName: "Subtech",
    title: "Awards & Certifications | Subtech",
    description:
      "Subtech is a trusted brand - manufacturer of Motor Starters, AMF Panels, and LT Panels, certified by ISO, CE, IEC and approved by leading government bodies.",
    images: [
      {
        url: "https://subtech.in/images/subtech.jpg",
        width: 1200,
        height: 630,
        alt: "Subtech Awards & Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards & Certifications | Subtech",
    description:
      "ISO 9001, ISO 14001, ISO 45001, ISO 50001, CE & IEC certified. Approved by UP Jal Nigam, Delhi Jal Board, NSIC, ZED & Udyam.",
    images: ["https://subtech.in/images/subtech.jpg"],
  },
};

export default function AwardsPage() {
  return <AwardsClient />;
}
