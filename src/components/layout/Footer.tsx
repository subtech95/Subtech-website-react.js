"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


function IconLocation() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
      <path d="M10.1869 1.73431C9.06854 0.61592 7.58155 0 5.99993 0C4.4183 0 2.93129 0.61592 1.81292 1.73431C0.694534 2.85273 0.0786133 4.33969 0.0786133 5.92129C0.0786133 9.12084 3.10388 11.7821 4.72917 13.2118C4.95504 13.4105 5.15008 13.582 5.30547 13.7272C5.50016 13.9091 5.75006 14 5.9999 14C6.24979 14 6.49964 13.9091 6.69435 13.7272C6.84975 13.582 7.04479 13.4105 7.27065 13.2118C8.89594 11.7821 11.9212 9.12084 11.9212 5.92129C11.9212 4.33969 11.3053 2.85273 10.1869 1.73431ZM6.72897 12.5961C6.49816 12.7991 6.29885 12.9744 6.13451 13.1279C6.05902 13.1984 5.94078 13.1984 5.86526 13.1279C5.70095 12.9744 5.50161 12.7991 5.2708 12.596C3.74283 11.2519 0.898656 8.75001 0.898656 5.92131C0.898656 3.1085 3.18704 0.820124 5.99987 0.820124C8.81268 0.820124 11.1011 3.1085 11.1011 5.92131C11.1011 8.75001 8.25694 11.2519 6.72897 12.5961Z" fill="currentColor"/>
      <path d="M6.00008 3.08887C4.56122 3.08887 3.39062 4.25943 3.39062 5.69829C3.39062 7.13715 4.56122 8.30772 6.00008 8.30772C7.43894 8.30772 8.6095 7.13715 8.6095 5.69829C8.6095 4.25943 7.43894 3.08887 6.00008 3.08887ZM6.00008 7.48759C5.01343 7.48759 4.21072 6.68489 4.21072 5.69826C4.21072 4.71164 5.01343 3.90894 6.00008 3.90894C6.98673 3.90894 7.7894 4.71164 7.7894 5.69826C7.7894 6.68489 6.98673 7.48759 6.00008 7.48759Z" fill="currentColor"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11.6666 9.4091L10.9841 8.4641C10.7324 8.12417 10.3574 7.89649 9.93972 7.82996C9.522 7.76343 9.09484 7.86335 8.74998 8.10827L8.09081 8.59243C7.13399 7.73698 6.36526 6.69214 5.83331 5.5241L6.49248 5.04577C6.837 4.79478 7.06794 4.41741 7.13464 3.99641C7.20135 3.5754 7.09838 3.14513 6.84831 2.79993L6.18331 1.86077C5.93339 1.51663 5.55703 1.28582 5.13698 1.21909C4.71693 1.15236 4.28757 1.25518 3.94331 1.50493L2.91664 2.23993C2.58681 2.47798 2.33009 2.80349 2.17547 3.17972C2.02086 3.55595 1.9745 3.96792 2.04164 4.3691C2.33803 6.09644 3.02915 7.73206 4.06118 9.14856C5.0932 10.5651 6.43827 11.7242 7.99164 12.5358C8.30603 12.696 8.65376 12.78 9.00664 12.7808C9.46814 12.7804 9.91756 12.6333 10.29 12.3608L11.3108 11.6666C11.4837 11.5428 11.6302 11.3858 11.7419 11.2048C11.8535 11.0238 11.9281 10.8224 11.9612 10.6123C11.9943 10.4023 11.9853 10.1877 11.9347 9.98113C11.8842 9.77457 11.793 9.58012 11.6666 9.4091Z" fill="currentColor"/>
    </svg>
  );
}
function IconEmail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11.8125 2.625H2.1875C1.8394 2.625 1.50556 2.76328 1.25942 3.00942C1.01328 3.25556 0.875 3.5894 0.875 3.9375V10.0625C0.875 10.4106 1.01328 10.7444 1.25942 10.9906C1.50556 11.2367 1.8394 11.375 2.1875 11.375H11.8125C12.1606 11.375 12.4944 11.2367 12.7406 10.9906C12.9867 10.7444 13.125 10.4106 13.125 10.0625V3.9375C13.125 3.5894 12.9867 3.25556 12.7406 3.00942C12.4944 2.76328 12.1606 2.625 11.8125 2.625ZM11.5675 3.5L7.28 7.07438C7.20139 7.13985 7.10231 7.17571 7 7.17571C6.89769 7.17571 6.79861 7.13985 6.72 7.07438L2.4325 3.5H11.5675ZM11.8125 10.5H2.1875C2.07147 10.5 1.96019 10.4539 1.87814 10.3719C1.79609 10.2898 1.75 10.1785 1.75 10.0625V4.06875L6.16 7.74375C6.39584 7.94019 6.69307 8.04776 7 8.04776C7.30693 8.04776 7.60416 7.94019 7.84 7.74375L12.25 4.06875V10.0625C12.25 10.1785 12.2039 10.2898 12.1219 10.3719C12.0398 10.4539 11.9285 10.5 11.8125 10.5Z" fill="currentColor"/>
    </svg>
  );
}
function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <defs>
        <linearGradient id="ftAppA" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00C7DC"/><stop offset="100%" stopColor="#00A0C8"/></linearGradient>
        <linearGradient id="ftAppB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFCE00"/><stop offset="100%" stopColor="#FFB400"/></linearGradient>
        <linearGradient id="ftAppC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF3A44"/><stop offset="100%" stopColor="#C30D23"/></linearGradient>
        <linearGradient id="ftAppD" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00F076"/><stop offset="100%" stopColor="#00B05C"/></linearGradient>
      </defs>
      <path fill="url(#ftAppA)" d="M3.609 1.814 13.792 12 3.61 22.186A.996.996 0 0 1 3 21.27V2.73a1 1 0 0 1 .609-.916z"/>
      <path fill="url(#ftAppC)" d="M14.5 11.293 17.4 8.39 5.864 2.658 14.5 11.293z"/>
      <path fill="url(#ftAppD)" d="M14.5 12.707 5.864 21.342 17.4 15.61 14.5 12.707z"/>
      <path fill="url(#ftAppB)" d="M17.7 8.602 20.5 10.034c.674.39.674 1.354 0 1.744L17.7 13.398 14.792 12.5l2.908-3.898z"/>
    </svg>
  );
}
function FacebookIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function InstagramIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function LinkedInIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
}
function YouTubeIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#0a0a0b" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
}
function XIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setMsg("Thanks! You're subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Try again.");
    }
  };

  return (
    <footer className="ft2-footer">

      <div className="ft2-nl-wrap">
        <div className="ft2-nl-banner">
          <div className="ft2-nl-inner">
            <div>
              <p className="ft2-nl-label">New Products &amp; Offers</p>
              <h4 className="ft2-nl-heading">Stay ahead in<br />electrical automation.</h4>
              <p className="ft2-nl-desc">
                Product launches, dealer offers &amp; industry insights — straight to your inbox. No spam, unsubscribe anytime.
              </p>
            </div>
            <form className="ft2-nl-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="ft2-nl-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="ft2-nl-btn" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing…" : "Subscribe Now →"}
              </button>
              {msg && <p className="ft2-smsg">{msg}</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="ft2-body">
        <div className="ft2-container">
          <div className="ft2-grid">

            <div className="ft2-brand-col">
              <Link href="/">
                <Image src="/images/white.png" alt="Subtech logo" width={120} height={40} className="ft2-logo" />
              </Link>
              <span className="ft2-since">Since 1998</span>
              <ul className="ft2-socials">
                <li><a href="https://www.facebook.com/subtech.in" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a></li>
                <li><a href="https://www.instagram.com/subtech.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a></li>
                <li><a href="https://linkedin.com/company/subtech-in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a></li>
                <li><a href="https://www.youtube.com/@subtech.e" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon /></a></li>
                <li><a href="https://x.com/Subteche" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><XIcon /></a></li>
              </ul>
              <div className="ft2-app-block">
                <div className="ft2-app-label">Electrician App</div>
                <a href="https://play.google.com/store/apps/details?id=com.subtech.app" target="_blank" rel="noopener noreferrer" className="ft2-app-btn" aria-label="Download Subtech Soldier App on Google Play">
                  <GooglePlayIcon />
                  <span>
                    <span className="ft2-app-small">Get Subtech Soldier on</span>
                    <span className="ft2-app-strong">Google Play</span>
                  </span>
                </a>
                <p className="ft2-app-tag">Free app for electricians — register installs, claim cashback, get leads.</p>
              </div>
            </div>

            <div>
              <div className="ft2-col-head">Business Contact</div>
              <ul className="ft2-contact-list">
                <li className="ft2-contact-item">
                  <span className="ft2-icon-wrap"><IconLocation /></span>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Subtech/data=!4m2!3m1!1s0x0:0xa16e659d4bff04f?sa=X&ved=1t:2428&ictx=111">
                    271, Udyog Kendra II, Ecotech III,<br />Greater Noida – 201306, UP, India
                  </a>
                </li>
                <li className="ft2-contact-item">
                  <span className="ft2-icon-wrap"><IconPhone /></span>
                  <a href="tel:08506060582">085060 60582</a>
                </li>
                <li className="ft2-contact-item">
                  <span className="ft2-icon-wrap"><IconEmail /></span>
                  <a href="mailto:info@subtech.in">info@subtech.in</a>
                </li>
              </ul>
              <a href="https://www.google.com/maps/place/Subtech/data=!4m2!3m1!1s0x0:0xa16e659d4bff04f?sa=X&ved=1t:2428&ictx=111" className="ft2-directions-btn" target="_blank" rel="noopener noreferrer">
                Get Directions ↗
              </a>
            </div>

            <div>
              <div className="ft2-col-head">About Us</div>
              <ul className="ft2-link-list">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/jobs">Career</Link></li>
                <li><Link href="/pathshala">Pathshala</Link></li>
              </ul>
            </div>

            <div>
              <div className="ft2-col-head">Useful Links</div>
              <ul className="ft2-link-list">
                <li><Link href="/blog">Blogs</Link></li>
                <li><Link href="/solutions">Solutions</Link></li>
                <li><Link href="/customer-care">Warranty</Link></li>
                <li><Link href="/rate-electrician">Rate Your Electrician</Link></li>
              </ul>
            </div>

            <div className="ft2-cta-col">
              <Link href="/contact" className="ft2-cta-btn">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://subtech.in/images/customer_care.png" alt="Customer Care" className="ft2-cta-icon" />
                Let&apos;s Talk
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="ft2-bottom">
        <div className="ft2-container">
          <div className="ft2-bottom-inner">
            <p className="ft2-copy">&copy; 2025 Managed by <b>S S Power System</b></p>
            <ul className="ft2-legal">
              <li><Link href="/term-and-condition">Terms</Link></li>
              <li><Link href="/privacy-policy">Privacy &amp; Policy</Link></li>
              <li><Link href="/privacy-policy">Disclaimer</Link></li>
              <li><Link href="/return-policy">Return Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  );
}