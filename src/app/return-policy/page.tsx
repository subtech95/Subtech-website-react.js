import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Return Policy | Subtech",
  description:
    "Subtech return and refund policy: 7-day returns, free pickup for damaged items, refund within 7 working days, free replacements on transit damage.",
  alternates: { canonical: "https://subtech.in/return-policy" },
};

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Return Policy"
      intro={
        <p>
          At Subtech, we stand behind the quality of our products. If
          you&apos;re not completely satisfied with your purchase, we offer a
          simple and transparent return policy to give you peace of mind.
        </p>
      }
      sections={[
        {
          heading: "Return Eligibility",
          body: (
            <>
              <ul>
                <li>Returns accepted within 7 days of product delivery.</li>
                <li>
                  Products must be unused, in original packaging, and in
                  resalable condition.
                </li>
              </ul>
              <p>Returns are not accepted for:</p>
              <ul>
                <li>Used or damaged items (not due to transit).</li>
                <li>Custom-built or specially ordered products.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How to Initiate a Return",
          body: (
            <>
              <p>To request a return, contact our support team at:</p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:ecommerce@subtech.in"
                    className="text-red-500"
                  >
                    ecommerce@subtech.in
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href="tel:+918506060582" className="text-red-500">
                    +91 85060 60582
                  </a>
                </li>
              </ul>
              <p>
                Once your return is approved, we&apos;ll arrange for pickup or
                provide instructions for shipping the product back.
              </p>
            </>
          ),
        },
        {
          heading: "Refunds",
          body: (
            <ul>
              <li>
                Refunds are credited within 7 working days after product
                inspection.
              </li>
              <li>
                For prepaid orders, refunds will be made to the original
                payment method.
              </li>
              <li>For COD orders, refunds are issued via bank transfer.</li>
            </ul>
          ),
        },
        {
          heading: "Replacements",
          body: (
            <>
              <p>We offer free replacements for products that are:</p>
              <ul>
                <li>Damaged during shipping.</li>
                <li>Incorrect or defective on arrival.</li>
              </ul>
              <p>
                Once the replacement or return product is received it will be
                inspected, and the replacement or return product will be
                delivered within 2 days.
              </p>
              <p>
                <strong>Note:</strong> Such issues must be reported within 48
                hours of delivery.
              </p>
            </>
          ),
        },
        {
          heading: "Shipping Charges",
          body: (
            <ul>
              <li>
                Return shipping is free for damaged, defective, or wrong
                items.
              </li>
              <li>
                For other return reasons (e.g. change of mind), return shipping
                charges may apply or be deducted from the refund.
              </li>
            </ul>
          ),
        },
        {
          heading: "Shipping Policy",
          body: (
            <p>
              All products are delivered within 3-5 working days across India.
              Customised configurations may take 7-15 working days depending on
              complexity.
            </p>
          ),
        },
      ]}
    />
  );
}
