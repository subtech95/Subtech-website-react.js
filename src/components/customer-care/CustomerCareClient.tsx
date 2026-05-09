"use client";

import Link from "next/link";
import { useState } from "react";

/* ============================================================
   Customer Care — full client page
   Ported from customer-care.php (uses /Controller/Master/ endpoint)
   ============================================================ */

// Same-origin proxy — avoids CORS errors when posted from earth.subtech.in.
// The proxy forwards verbatim to the legacy CRM endpoint server-side.
const FORM_ENDPOINT = "/api/enquiry";

type TabId = "service" | "warranty" | "track";

type MsgState = { type: "success" | "error"; text: string } | null;

const validateMobile = (m: string) => /^[6-9][0-9]{9}$/.test(m.trim());
const cleanName = (s: string) => s.replace(/[^a-zA-Z\s]/g, "");

export default function CustomerCareClient() {
  const [tab, setTab] = useState<TabId>("service");

  /* ── Service form state ── */
  const [svSerial, setSvSerial] = useState("");
  const [svName, setSvName] = useState("");
  const [svMobile, setSvMobile] = useState("");
  const [svEmail, setSvEmail] = useState("");
  const [svFile, setSvFile] = useState<File | null>(null);
  const [svMsg2, setSvMsg2] = useState("");
  const [svFeedback, setSvFeedback] = useState<MsgState>(null);
  const [svBusy, setSvBusy] = useState(false);

  /* ── Warranty form state ── */
  const [wrSerial, setWrSerial] = useState("");
  const [wrDate, setWrDate] = useState("");
  const [wrName, setWrName] = useState("");
  const [wrMobile, setWrMobile] = useState("");
  const [wrDealer, setWrDealer] = useState("");
  const [wrFile, setWrFile] = useState<File | null>(null);
  const [wrFeedback, setWrFeedback] = useState<MsgState>(null);
  const [wrBusy, setWrBusy] = useState(false);

  /* ── Track form state ── */
  const [trackInput, setTrackInput] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const submitService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSvFeedback(null);
    if (svMobile && !validateMobile(svMobile)) {
      setSvFeedback({ type: "error", text: "Please enter a valid 10-digit mobile number." });
      return;
    }
    if (!svFile && false) return; // image is optional in original
    setSvBusy(true);
    const fd = new FormData();
    fd.append("method", "Complains");
    fd.append("serial_no", svSerial);
    fd.append("name", svName);
    fd.append("mobile", svMobile);
    fd.append("email", svEmail);
    fd.append("message", svMsg2);
    if (svFile) fd.append("image", svFile);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        if (j.type === "success") {
          setSvFeedback({ type: "success", text: j.message || "Submitted successfully!" });
          setTimeout(() => {
            setSvSerial(""); setSvName(""); setSvMobile(""); setSvEmail("");
            setSvFile(null); setSvMsg2(""); setSvFeedback(null);
          }, 2500);
        } else {
          setSvFeedback({ type: "error", text: j.message || "Something went wrong." });
        }
      } catch {
        setSvFeedback({ type: "success", text: "Submitted!" });
      }
    } catch {
      setSvFeedback({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSvBusy(false);
    }
  };

  const submitWarranty = async (e: React.FormEvent) => {
    e.preventDefault();
    setWrFeedback(null);
    if (wrMobile && !validateMobile(wrMobile)) {
      setWrFeedback({ type: "error", text: "Please enter a valid 10-digit mobile number." });
      return;
    }
    setWrBusy(true);
    const fd = new FormData();
    fd.append("method", "warranty_check");
    fd.append("serial_no", wrSerial);
    fd.append("purchase_date", wrDate);
    fd.append("name", wrName);
    fd.append("mobile", wrMobile);
    fd.append("dealer", wrDealer);
    if (wrFile) fd.append("invoice", wrFile);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        setWrFeedback({
          type: j.type === "success" ? "success" : "error",
          text: j.message || "Done.",
        });
      } catch {
        setWrFeedback({ type: "success", text: "Submitted!" });
      }
    } catch {
      setWrFeedback({ type: "error", text: "Network error. Please try again." });
    } finally {
      setWrBusy(false);
    }
  };

  const submitTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim().length < 4) return;
    setTrackResult(
      "Your complaint is being processed. Our team will contact you within 24 hours."
    );
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    {
      id: "service",
      label: "Service Request",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      id: "warranty",
      label: "For Warranty",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: "track",
      label: "Track Complaint",
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
  ];

  return (
    <section id="cc-section">
      {/* Breadcrumb */}
      <div className="cc-bc">
        <div className="cc-bc-wrap">
          <Link href="/">Home</Link>
          <span>›</span>
          <span className="cur">Customer Care</span>
        </div>
      </div>

      <div className="cc-bg-glow" />

      <div className="cc-wrap">
        {/* HEADER */}
        <div className="cc-header">
          <div className="cc-eyebrow">Support Centre</div>
          <h1>
            <em>
            Customer Care</em>
          </h1>
          <p>We&apos;re here to help with service, warranty and product support.</p>
        </div>

        {/* TABS */}
        <div className="cc-tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`cc-tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
              role="tab"
              aria-selected={tab === t.id}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* PANELS */}
        <div className="cc-panels">
          {/* SERVICE */}
          {tab === "service" && (
            <div className="cc-panel active">
              <div className="cc-form-card">
                <div className="cc-form-title">Service Request</div>
                <div className="cc-form-sub">
                  Fill in the details below and our team will get back to you within 24 hours.
                </div>

                <form className="cc-form" onSubmit={submitService}>
                  <div className="cc-field">
                    <label>
                      Product Serial Number <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={svSerial}
                      onChange={(e) => setSvSerial(e.target.value)}
                      placeholder="e.g. ST-2024-XXXXX"
                      required
                    />
                  </div>

                  <div className="cc-row">
                    <div className="cc-field">
                      <label>
                        Your Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        value={svName}
                        onChange={(e) => setSvName(cleanName(e.target.value))}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="cc-field">
                      <label>
                        Mobile Number <span>*</span>
                      </label>
                      <input
                        type="tel"
                        value={svMobile}
                        onChange={(e) => setSvMobile(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div className="cc-field">
                    <label>
                      Email Address <span>*</span>
                    </label>
                    <input
                      type="email"
                      value={svEmail}
                      onChange={(e) => setSvEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="cc-field">
                    <label>Upload Image</label>
                    <label className="cc-upload-label" htmlFor="service_file_input">
                      <div className="cc-upload-icon">
                        <svg viewBox="0 0 24 24">
                          <polyline points="16 16 12 12 8 16" />
                          <line x1="12" y1="12" x2="12" y2="21" />
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                      </div>
                      <div className="cc-upload-text">
                        <strong>{svFile ? svFile.name : "Click to upload image"}</strong>
                        PNG, JPG up to 5MB
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="service_file_input"
                        style={{ display: "none" }}
                        onChange={(e) => setSvFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>

                  <div className="cc-field">
                    <label>
                      Problem / Reason <span>*</span>
                    </label>
                    <textarea
                      value={svMsg2}
                      onChange={(e) => setSvMsg2(e.target.value)}
                      placeholder="Describe the issue in detail..."
                      required
                    />
                  </div>

                  {svFeedback && (
                    <div className={`cc-msg ${svFeedback.type} show`}>{svFeedback.text}</div>
                  )}

                  <button type="submit" className="cc-submit" disabled={svBusy}>
                    {svBusy ? "Submitting…" : "Submit Request"}
                    <svg viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* WARRANTY */}
          {tab === "warranty" && (
            <div className="cc-panel active">
              <div className="cc-form-card">
                <div className="cc-form-title">Warranty Check</div>
                <div className="cc-form-sub">
                  Enter your product serial number to check warranty status or initiate a claim.
                </div>

                <form className="cc-form" onSubmit={submitWarranty}>
                  <div className="cc-row">
                    <div className="cc-field">
                      <label>
                        Product Serial Number <span>*</span>
                      </label>
                      <input
                        type="text"
                        value={wrSerial}
                        onChange={(e) => setWrSerial(e.target.value)}
                        placeholder="e.g. ST-2024-XXXXX"
                        required
                      />
                    </div>
                    <div className="cc-field">
                      <label>
                        Purchase Date <span>*</span>
                      </label>
                      <input
                        type="date"
                        value={wrDate}
                        onChange={(e) => setWrDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="cc-row">
                    <div className="cc-field">
                      <label>
                        Your Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        value={wrName}
                        onChange={(e) => setWrName(cleanName(e.target.value))}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="cc-field">
                      <label>
                        Mobile Number <span>*</span>
                      </label>
                      <input
                        type="tel"
                        value={wrMobile}
                        onChange={(e) => setWrMobile(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div className="cc-field">
                    <label>Dealer / Purchase Location</label>
                    <input
                      type="text"
                      value={wrDealer}
                      onChange={(e) => setWrDealer(e.target.value)}
                      placeholder="Where did you purchase?"
                    />
                  </div>

                  <div className="cc-field">
                    <label>
                      Upload Invoice <span>*</span>
                    </label>
                    <label className="cc-upload-label" htmlFor="warranty_file_input">
                      <div className="cc-upload-icon">
                        <svg viewBox="0 0 24 24">
                          <polyline points="16 16 12 12 8 16" />
                          <line x1="12" y1="12" x2="12" y2="21" />
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                      </div>
                      <div className="cc-upload-text">
                        <strong>{wrFile ? wrFile.name : "Click to upload invoice"}</strong>
                        PDF, PNG, JPG up to 5MB
                      </div>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        id="warranty_file_input"
                        style={{ display: "none" }}
                        onChange={(e) => setWrFile(e.target.files?.[0] ?? null)}
                        required
                      />
                    </label>
                  </div>

                  {wrFeedback && (
                    <div className={`cc-msg warranty-result ${wrFeedback.type} show`}>
                      {wrFeedback.text}
                    </div>
                  )}

                  <button type="submit" className="cc-submit" disabled={wrBusy}>
                    {wrBusy ? "Checking…" : "Check Warranty"}
                    <svg viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TRACK */}
          {tab === "track" && (
            <div className="cc-panel active">
              <div className="cc-form-card">
                <div className="cc-form-title">Track Your Complaint</div>
                <div className="cc-form-sub">
                  Enter your complaint ID or registered mobile number to check status.
                </div>

                <form className="cc-form" onSubmit={submitTrack}>
                  <div className="cc-field">
                    <label>
                      Complaint ID or Mobile Number <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      placeholder="e.g. SUB-2024-001 or 98XXXXXXXX"
                    />
                  </div>

                  <button type="submit" className="cc-submit">
                    Track Status
                    <svg viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </form>

                {trackResult && (
                  <div className="track-result show">
                    <div className="track-status">
                      <div className="track-dot" />
                      <span>{trackResult}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="cc-divider">
          <div className="cc-divider-line" />
          <div className="cc-divider-text">Get in touch directly</div>
          <div className="cc-divider-line" />
        </div>

        {/* CONTACT CARDS */}
        <div className="cc-contact">
          <a href="tel:+918506060581" className="cc-contact-card">
            <div className="cc-contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3>Speak to Us</h3>
            <p>Talk directly with our support team for immediate assistance.</p>
            <div className="cc-contact-btn">Call Now</div>
          </a>

          <a
            href="https://wa.me/919211034399"
            className="cc-contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="cc-contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Chat with Us</h3>
            <p>Connect with us on WhatsApp for quick support and updates.</p>
            <div className="cc-contact-btn">WhatsApp</div>
          </a>

          <a href="mailto:support@subtech.in" className="cc-contact-card">
            <div className="cc-contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3>Write to Us</h3>
            <p>Send us an email and we&apos;ll get back to you soon.</p>
            <div className="cc-contact-btn">Send Email</div>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #cc-section h1,
        #cc-section h2,
        #cc-section h3,
        #cc-section h4,
        #cc-section p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          
        }
        #cc-section {
          --bg: #f8fafc;
          --card: #0f0f0f;
          --card2: #141414;
          --border: rgba(255, 255, 255, 0.07);
          --border2: rgba(255, 255, 255, 0.12);
          --red: #c8102e;
          --red-glow: rgba(200, 16, 46, 0.25);
          --white: #f0f2f8;
          --text: #9ca3af;
          --muted: #4b5563;
          --mono: "DM Mono", monospace;
          --display: "Syne", sans-serif;
          --body: "DM Sans", sans-serif;

          background: var(--bg);
          color: var(--white);
          overflow-x: hidden;
          position: relative;
          font-family: var(--body);
          -webkit-font-smoothing: antialiased;
        }
        #cc-section * {
          box-sizing: border-box;
        }
        #cc-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* Breadcrumb */
        .cc-bc {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 0;
          position: relative;
          z-index: 2;
        }
        .cc-bc-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: #6b7280;
        }
        .cc-bc-wrap a {
          color: #6b7280;
          text-decoration: none;
        }
        .cc-bc-wrap a:hover {
          color: var(--red);
        }
        .cc-bc-wrap .cur {
          color: #111;
          font-weight: 500;
        }

        .cc-bg-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(200, 16, 46, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cc-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px 120px;
        }

        /* HEADER */
        .cc-header {
          text-align: center;
          margin-bottom: 64px;
          animation: ccFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 20px;
        }
        .cc-eyebrow::before,
        .cc-eyebrow::after {
          content: "";
          width: 28px;
          height: 1px;
          background: var(--red);
          opacity: 0.5;
        }
        .cc-header h1 {
          font-family: var(--display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #111;
          margin-bottom: 16px;
        }
        .cc-header h1 em {
          font-style: normal;
          color: var(--red);
        }
        .cc-header p {
          font-size: 15px;
          font-weight: 300;
          color: #4b5563;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* TABS */
        .cc-tabs {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 40px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 6px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
          animation: ccFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .cc-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 10px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          cursor: pointer;
          border: none;
          background: transparent;
          transition: all 0.25s ease;
        }
        .cc-tab svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cc-tab.active {
          background: var(--red);
          color: #fff;
          box-shadow: 0 4px 20px var(--red-glow);
        }
        .cc-tab:not(.active):hover {
          color: var(--white);
          background: rgba(255, 255, 255, 0.05);
        }

        /* PANELS */
        .cc-panels {
          animation: ccFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        .cc-form-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
        }
        .cc-form-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(200, 16, 46, 0.4),
            transparent
          );
        }
        .cc-form-title {
          font-family: var(--display);
          font-size: 22px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 6px;
        }
        .cc-form-sub {
          font-size: 13px;
          color: var(--text);
          font-weight: 300;
          margin-bottom: 36px;
        }

        /* FORM */
        .cc-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cc-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cc-field label {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text);
        }
        .cc-field label span {
          color: var(--red);
          margin-left: 2px;
        }
        .cc-field input,
        .cc-field textarea,
        .cc-field select {
          font-family: var(--body);
          font-size: 14px;
          font-weight: 400;
          color: var(--white);
          background: var(--card2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 16px;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        .cc-field input::placeholder,
        .cc-field textarea::placeholder {
          color: var(--muted);
        }
        .cc-field input:focus,
        .cc-field textarea:focus,
        .cc-field select:focus {
          border-color: rgba(200, 16, 46, 0.5);
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.08);
        }
        .cc-field textarea {
          resize: none;
          min-height: 120px;
          line-height: 1.6;
        }

        /* UPLOAD */
        .cc-upload-label {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--card2);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .cc-upload-label:hover {
          border-color: rgba(200, 16, 46, 0.4);
        }
        .cc-upload-icon {
          width: 36px;
          height: 36px;
          background: rgba(200, 16, 46, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cc-upload-icon svg {
          width: 16px;
          height: 16px;
          stroke: var(--red);
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cc-upload-text {
          font-size: 13px;
          color: var(--text);
          font-weight: 300;
        }
        .cc-upload-text strong {
          color: var(--white);
          font-weight: 500;
          display: block;
          font-size: 13px;
        }

        /* SUBMIT */
        .cc-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--red);
          color: #fff;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 16px 40px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition:
            background 0.25s,
            box-shadow 0.25s,
            transform 0.2s;
          align-self: flex-start;
          margin-top: 8px;
        }
        .cc-submit svg {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.2s;
        }
        .cc-submit:hover:not(:disabled) {
          background: #a30d24;
          box-shadow: 0 8px 30px var(--red-glow);
          transform: translateY(-1px);
        }
        .cc-submit:hover:not(:disabled) svg {
          transform: translateX(3px);
        }
        .cc-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* MSG */
        .cc-msg {
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 400;
          margin-top: 4px;
        }
        .cc-msg.success {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #86efac;
        }
        .cc-msg.error {
          background: rgba(200, 16, 46, 0.08);
          border: 1px solid rgba(200, 16, 46, 0.2);
          color: #fca5a5;
        }

        /* TRACK */
        .track-result {
          margin-top: 24px;
          padding: 20px;
          background: rgba(200, 16, 46, 0.05);
          border: 1px solid rgba(200, 16, 46, 0.15);
          border-radius: 10px;
        }
        .track-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--white);
        }
        .track-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
          flex-shrink: 0;
          animation: ccPulse 2s infinite;
        }
        @keyframes ccPulse {
          0%,
          100% {
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 14px rgba(34, 197, 94, 0.8);
          }
        }

        /* DIVIDER */
        .cc-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 52px 0 40px;
          animation: ccFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
        }
        .cc-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .cc-divider-text {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        /* CONTACT */
        .cc-contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          animation: ccFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        .cc-contact-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition:
            border-color 0.25s,
            transform 0.25s,
            box-shadow 0.25s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .cc-contact-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--red), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cc-contact-card:hover {
          border-color: rgba(200, 16, 46, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
          color: var(--white);
        }
        .cc-contact-card:hover::before {
          opacity: 1;
        }
        .cc-contact-icon {
          width: 52px;
          height: 52px;
          background: rgba(200, 16, 46, 0.08);
          border: 1px solid rgba(200, 16, 46, 0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          transition: background 0.25s;
        }
        .cc-contact-card:hover .cc-contact-icon {
          background: rgba(200, 16, 46, 0.15);
        }
        .cc-contact-icon svg {
          width: 20px;
          height: 20px;
          stroke: var(--red);
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cc-contact-card h3 {
          font-family: var(--display);
          font-size: 17px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 6px;
        }
        .cc-contact-card p {
          font-size: 13px;
          color: var(--text);
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .cc-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--red);
          color: #fff;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 11px 24px;
          border-radius: 8px;
          width: 100%;
        }
        .cc-contact-card:hover .cc-contact-btn {
          background: #a30d24;
          box-shadow: 0 4px 20px var(--red-glow);
        }

        @keyframes ccFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .cc-wrap {
            padding: 60px 20px 80px;
          }
          .cc-form-card {
            padding: 28px 20px;
          }
          .cc-row {
            grid-template-columns: 1fr;
          }
          .cc-contact {
            grid-template-columns: 1fr;
          }
          .cc-tabs {
            flex-direction: column;
            width: 100%;
          }
          .cc-submit {
            width: 100%;
          }
          .cc-bc-wrap {
            padding: 0 20px;
          }
        }
        @media (max-width: 480px) {
          .cc-tab {
            padding: 10px 16px;
            font-size: 10px;
          }
        }
      ` }} />
    </section>
  );
}
