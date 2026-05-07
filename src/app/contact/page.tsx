import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Subtech - Call, Email or Visit Us in Greater Noida",
  description:
    "Contact Subtech for motor starters, LT panels, AMF/ATS systems and automation solutions. Call +91 8506060580, email support@subtech.in or visit us in Greater Noida.",
  alternates: {
    canonical: "https://subtech.in/contact",
  },
  openGraph: {
    type: "website",
    url: "https://subtech.in/contact",
    siteName: "www.subtech.in",
    title: "Contact Us | Subtech - Call, Email or Visit Us in Greater Noida",
    description:
      "Contact Subtech for motor starters, LT panels, AMF/ATS systems and automation solutions. Call +91 8506060580, email support@subtech.in or visit us in Greater Noida.",
    images: [{ url: "https://subtech.in/images/subtech.jpg" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
