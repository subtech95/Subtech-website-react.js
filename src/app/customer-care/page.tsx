import type { Metadata } from "next";
import CustomerCareClient from "@/components/customer-care/CustomerCareClient";

export const metadata: Metadata = {
  title: "Customer Care | Subtech - Service, Warranty & Support",
  description:
    "Subtech makes support easy. File a warranty claim, register a service request, or track your complaint in real time. Your satisfaction is our priority.",
  authors: [{ name: "Subtech - SS Power System" }],
  alternates: { canonical: "https://subtech.in/customer-care" },
  openGraph: {
    type: "website",
    title: "Customer Care | Subtech - Service, Warranty & Support",
    description:
      "File a warranty claim, register a service request, or track your complaint in real time. Your satisfaction is our priority.",
    url: "https://subtech.in/customer-care",
    siteName: "Subtech - SS Power System",
    images: [{ url: "https://subtech.in/images/subtech.jpg" }],
  },
};

export default function CustomerCarePage() {
  return <CustomerCareClient />;
}
