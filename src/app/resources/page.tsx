import type { Metadata } from "next";
import {
  REVALIDATE_SECONDS,
  getResourceCategories,
  getResources,
} from "@/lib/cms";
import ResourcesClient from "./ResourcesClient";

export const revalidate = REVALIDATE_SECONDS;

export const metadata: Metadata = {
  title: "Resources | Electrical Automation Guides, Manuals & Insights – Subtech",
  description:
    "Subtech resource center offers expert knowledge, product documentation, safety guidelines, and automation insights to support efficient power and motor control systems.",
  alternates: {
    canonical: "https://subtech.in/resources",
  },
  openGraph: {
    type: "website",
    url: "https://subtech.in/resources",
    siteName: "Subtech",
    title: "Resources | Electrical Automation Guides, Manuals & Insights – Subtech",
    description:
      "Access Subtech's complete suite of downloadable resources, product catalogs, technical documents, price lists and forms.",
    images: [
      {
        url: "https://subtech.in/images/subtech.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ResourcesPage() {
  const [resources, categories] = await Promise.all([
    getResources().catch(() => []),
    getResourceCategories().catch(() => []),
  ]);

  return <ResourcesClient resources={resources} categories={categories} />;
}
