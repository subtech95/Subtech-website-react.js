import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Subtech",
  description:
    "Terms & conditions for using subtech.in and Subtech products and services. Copyright, product information, limitation of liability and governing law.",
  alternates: { canonical: "https://subtech.in/term-and-condition" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro={
        <p>
          Please read these Terms &amp; Conditions carefully before using{" "}
          <a href="https://subtech.in" className="text-red-500">
            subtech.in
          </a>
          . By accessing or using our website or services you agree to be bound
          by these terms.
        </p>
      }
      sections={[
        {
          heading: "Copyright and Trademark",
          body: (
            <p>
              Unless otherwise indicated, material on this website — including
              texts, images, illustrations, software, audio clips, video clips
              and animation files — is subject to the copyright and trademark
              rights of Subtech Private Limited. The material may not be
              copied, reproduced, modified, posted, transmitted or distributed,
              in whole or in part, in any form whatsoever, without our prior
              written consent. All rights reserved.
            </p>
          ),
        },
        {
          heading: "Product and Service Information",
          body: (
            <>
              <p>
                We strive to provide accurate information about our products
                and services. However Subtech does not warrant that the
                descriptions, specifications, or prices are error-free or
                complete.
              </p>
              <p>
                We reserve the right to modify or discontinue any product or
                service at any time without prior notice.
              </p>
            </>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <>
              <p>
                Subtech shall not be liable for any direct, indirect,
                incidental or consequential damages resulting from:
              </p>
              <ul>
                <li>Use or inability to use the website or services</li>
                <li>Unauthorised access to your data or transmissions</li>
                <li>Any content or conduct of a third party</li>
              </ul>
            </>
          ),
        },
        {
          heading: "User Submissions",
          body: (
            <p>
              Any feedback, suggestions, or content submitted by users may be
              used by Subtech without restriction. You grant us a non-exclusive,
              royalty-free licence to use such content.
            </p>
          ),
        },
        {
          heading: "Third-Party Links",
          body: (
            <p>
              Our website may contain links to third-party websites. Subtech is
              not responsible for the content, accuracy, or practices of these
              external sites.
            </p>
          ),
        },
        {
          heading: "Termination",
          body: (
            <p>
              We reserve the right to terminate or restrict your access to our
              website and services at our sole discretion, without notice, if
              you violate these Terms.
            </p>
          ),
        },
        {
          heading: "Governing Law",
          body: (
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes will be subject to the exclusive
              jurisdiction of the courts located in Surajpur, Greater Noida.
            </p>
          ),
        },
      ]}
    />
  );
}
