import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Subtech",
  description:
    "How Subtech (S S Power System) collects, uses and protects your personal data when you use our website and Subtech Soldiers app.",
  alternates: { canonical: "https://subtech.in/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          This Privacy Policy explains what information S S Power System
          (&ldquo;Subtech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects
          when you visit{" "}
          <a href="https://subtech.in" className="text-red-500">
            subtech.in
          </a>{" "}
          or use the Subtech Soldiers mobile application, how we use it, and
          the choices you have.
        </p>
      }
      sections={[
        {
          heading: "1. Information We Collect",
          body: (
            <>
              <p>
                When you visit the Site we automatically collect certain
                information about your device — web browser, IP address, time
                zone and the cookies installed on your device. As you browse,
                we collect information about the pages or products you view,
                the websites or search terms that referred you, and how you
                interact with the Site. We refer to this automatically
                collected information as &quot;Device Information&quot;.
              </p>
              <p>We collect Device Information using the following:</p>
              <ul>
                <li>
                  <strong>Cookies</strong> — data files placed on your device
                  that often include an anonymous unique identifier.
                </li>
                <li>
                  <strong>Log files</strong> — track actions on the Site,
                  including IP address, browser type, ISP, referring/exit
                  pages, and timestamps.
                </li>
                <li>
                  <strong>Web beacons, tags, pixels</strong> — electronic files
                  used to record information about how you browse the Site.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "2. How We Use Your Information",
          body: (
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Improving website functionality and user experience</li>
              <li>Responding to enquiries and providing customer support</li>
              <li>
                Sending updates, offers, or promotional content (only if you
                opt in)
              </li>
              <li>Complying with legal requirements</li>
            </ul>
          ),
        },
        {
          heading: "3. Sharing Your Personal Information",
          body: (
            <>
              <p>
                We do not sell or rent your personal information. We may share
                data with:
              </p>
              <ul>
                <li>
                  Trusted third-party service providers who assist in operating
                  our website and services
                </li>
                <li>Legal or regulatory bodies when required by law</li>
                <li>Business partners only with your consent</li>
              </ul>
            </>
          ),
        },
        {
          heading: "4. Data Security",
          body: (
            <p>
              We implement appropriate technical and organisational security
              measures to protect your personal data from unauthorised access,
              alteration, or disclosure.
            </p>
          ),
        },
        {
          heading: "5. Cookies Policy",
          body: (
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience and analyse site traffic. You can control cookie
              preferences through your browser settings.
            </p>
          ),
        },
        {
          heading: "6. Subtech Soldiers Mobile Application",
          body: (
            <>
              <p>
                The Subtech Soldiers app exists to provide an efficient
                complaint resolution system for our electrical panels. To do
                that we may collect:
              </p>
              <ul>
                <li>
                  <strong>Personal Data</strong> — Full Name, Phone Number,
                  Email Address.
                </li>
                <li>
                  <strong>Professional Data</strong> — Company name or
                  technician ID to verify your status as a professional
                  electrician.
                </li>
                <li>
                  <strong>Complaint &amp; Service Data</strong> — Panel serial
                  numbers, fault descriptions and service history.
                </li>
                <li>
                  <strong>Images / Media</strong> — Camera and Gallery access
                  to upload photos of panel issues.
                </li>
                <li>
                  <strong>Location Data</strong> — to assign the nearest
                  technician to a complaint site.
                </li>
              </ul>
              <p>
                You can access, update or delete your information from within
                the app. To close your account, contact our support team at{" "}
                <a href="mailto:ecommerce@subtech.in" className="text-red-500">
                  ecommerce@subtech.in
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: "7. Changes to this Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our practices, or for other operational, legal or
              regulatory reasons. The updated date at the top of this page
              shows when changes last took effect.
            </p>
          ),
        },
      ]}
    />
  );
}
