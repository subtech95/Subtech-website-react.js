"use client";

import Link from "next/link";
import { useState } from "react";

/* ============================================================
   Customer Care — light theme client page
   Logic untouched: same state, validation and fetch handlers.
   Only markup/styles changed (cream/white look from design ref).
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

      <div className="cc-wrap">
        {/* HEADER */}
        <div className="cc-header">
          <div className="cc-eyebrow">Support Centre</div>
          <h1>Customer Care</h1>
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
              type="button"
            >
              {t.icon}
              <span>{t.label}</span>
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
        /* ============================================================
           Customer Care — light theme (cream / white / red accent)
           Reset only the typography our parent layout sets so we can
           drive sizes locally.
           ============================================================ */
        #cc-section h1,
        #cc-section h2,
        #cc-section h3,
        #cc-section h4,
        #cc-section p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          margin: 0;
        }
        #cc-section {
          --bg: #ffffff;
          --surface: #ffffff;
          --surface-soft: #faf8f6;
          --border: #e8e4df;
          --border-soft: #efece7;
          --red: #C8102E;
          --red-deep: #a30d24;
          --red-tint: #fdebed;
          --red-glow: rgba(200, 16, 46, 0.18);
          --ink: #1a1a1a;
          --text: #4b5563;
          --muted: #888888;
          --muted-soft: #999999;

          --display: 'Playfair Display', 'DM Serif Display', Georgia, serif;
          --body: 'DM Sans', system-ui, sans-serif;
          --mono: 'DM Mono', ui-monospace, SFMono-Regular, monospace;

          background: var(--bg);
          color: var(--ink);
          overflow-x: hidden;
          position: relative;
          font-family: var(--body);
          -webkit-font-smoothing: antialiased;
        }
        #cc-section * { box-sizing: border-box; }

        /* Breadcrumb */
        .cc-bc {
          background: #fff;
          border-bottom: 1px solid var(--border);
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
          color: var(--muted);
        }
        .cc-bc-wrap a {
          color: var(--muted);
          text-decoration: none;
        }
        .cc-bc-wrap a:hover { color: var(--red); }
        .cc-bc-wrap .cur {
          color: var(--ink);
          font-weight: 500;
        }

        .cc-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 40px 100px;
        }

        /* HEADER */
        .cc-header {
          text-align: center;
          margin-bottom: 36px;
          animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .cc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 14px;
        }
        .cc-eyebrow::before,
        .cc-eyebrow::after {
          content: "";
          width: 28px;
          height: 1px;
          background: var(--red);
          opacity: 0.5;
        }
          .cc-eyebrow p{
          align-items: center;}
        .cc-header h1 {
          font-family: var(--display);
          font-size: clamp(48px, 7.5vw, 84px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--red);
          margin-bottom: 14px;
        }
        #cc-section .cc-header p {
          font-size: 15px;
          color: #555;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          text-align: center !important;
        }

        /* TABS */
        .cc-tabs {
          display: flex;
          justify-content: center;
          gap: 0;
          margin: 24px auto 0;
          background: #fff;
          border: 1px solid #e0dbd5;
          border-radius: 10px;
          width: fit-content;
          overflow: hidden;
          animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }
        .cc-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          font-family: var(--body);
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          border: none;
          border-right: 1px solid #e0dbd5;
          background: transparent;
          transition: background 0.18s, color 0.18s;
        }
        .cc-tab:last-child { border-right: none; }
        .cc-tab svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cc-tab.active {
          background: var(--red);
          color: #fff;
        }
        .cc-tab:not(.active):hover {
          background: var(--surface-soft);
          color: var(--ink);
        }

        /* PANELS */
        .cc-panels {
          animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both;
        }
        .cc-form-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px 36px;
          max-width: 640px;
          margin: 32px auto 0;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        }
        .cc-form-title {
          font-family: var(--display);
          font-size: 22px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .cc-form-sub {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        /* FORM */
        .cc-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cc-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cc-field label {
          font-family: var(--body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
        }
        .cc-field label span {
          color: var(--red);
          margin-left: 2px;
        }
        .cc-field input,
        .cc-field textarea,
        .cc-field select {
          font-family: var(--body);
          font-size: 13.5px;
          font-weight: 400;
          color: var(--ink);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 11px 14px;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        .cc-field input::placeholder,
        .cc-field textarea::placeholder {
          color: #b7b3ad;
        }
        .cc-field input:focus,
        .cc-field textarea:focus,
        .cc-field select:focus {
          border-color: var(--red);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.08);
        }
        .cc-field textarea {
          resize: none;
          min-height: 110px;
          line-height: 1.55;
        }

        /* UPLOAD */
        .cc-upload-label {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--surface-soft);
          border: 1.5px dashed #d5cfc8;
          border-radius: 8px;
          padding: 18px;
          cursor: pointer;
          transition: border-color 0.18s, background 0.18s;
        }
        .cc-upload-label:hover {
          border-color: var(--red);
          background: #fff;
        }
        .cc-upload-icon {
          width: 38px;
          height: 38px;
          background: var(--red-tint);
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
          font-size: 11.5px;
          color: var(--muted-soft);
        }
        .cc-upload-text strong {
          color: #444;
          font-weight: 500;
          display: block;
          font-size: 13px;
          margin-bottom: 2px;
        }

        /* SUBMIT */
        .cc-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--red);
          color: #fff;
          font-family: var(--body);
          font-size: 14px;
          font-weight: 600;
          padding: 12px 28px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
          align-self: flex-start;
          margin-top: 4px;
        }
        .cc-submit svg {
          width: 15px;
          height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.18s;
        }
        .cc-submit:hover:not(:disabled) {
          background: var(--red-deep);
          box-shadow: 0 8px 24px var(--red-glow);
          transform: translateY(-1px);
        }
        .cc-submit:hover:not(:disabled) svg { transform: translateX(2px); }
        .cc-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* MSG */
        .cc-msg {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 400;
          margin-top: 4px;
        }
        .cc-msg.success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
        }
        .cc-msg.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        /* TRACK */
        .track-result {
          margin-top: 20px;
          padding: 16px 18px;
          background: var(--red-tint);
          border: 1px solid #f5c8cf;
          border-radius: 10px;
        }
        .track-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: var(--ink);
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
          0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
          50%      { box-shadow: 0 0 14px rgba(34, 197, 94, 0.8); }
        }

        /* DIVIDER */
        .cc-divider {
          display: flex;
          align-items: center;
          gap: 18px;
          max-width: 640px;
          margin: 44px auto 28px;
          animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both;
        }
        .cc-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .cc-divider-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted-soft);
          white-space: nowrap;
        }

        /* CONTACT */
        .cc-contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 640px;
          margin: 0 auto;
          animation: ccFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }
        .cc-contact-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px 18px;
          text-align: center;
          transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cc-contact-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
          border-color: #ddd6cf;
        }
        .cc-contact-icon {
          width: 44px;
          height: 44px;
          background: var(--red-tint);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
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
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .cc-contact-card p {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.55;
          margin-bottom: 16px;
        }
        .cc-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--ink);
          color: #fff;
          font-family: var(--body);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 6px;
          width: 100%;
          margin-top: auto;
          transition: background 0.18s;
        }
        .cc-contact-card:hover .cc-contact-btn {
          background: var(--red);
        }

        @keyframes ccFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .cc-wrap { padding: 40px 20px 80px; }
          .cc-form-card { padding: 24px 20px; }
          .cc-row { grid-template-columns: 1fr; }
          .cc-contact { grid-template-columns: 1fr; }
          .cc-tabs {
            width: 100%;
            border-radius: 10px;
          }
          .cc-tab {
            flex: 1;
            justify-content: center;
            padding: 10px 12px;
            font-size: 12px;
          }
          .cc-tab span { display: none; }
          .cc-tab svg { width: 16px; height: 16px; }
          .cc-submit { width: 100%; }
          .cc-bc-wrap { padding: 0 20px; }
        }
      ` }} />
    </section>
  );
}
