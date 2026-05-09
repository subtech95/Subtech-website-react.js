"use client";

import { useState } from "react";
import BlogShareCopy from "./BlogShareCopy";

const RED = "#EF2E33";
const RED_DARK = "#c9232a";

type Props = {
  url: string; // canonical URL of the post
  title: string;
};

/**
 * Sticky left rail used in the blog detail layout.
 * Mirrors `.sb-share` from bloging-single.php — share icons + newsletter card.
 *
 * On desktop the parent layout uses `sticky top-24` on the column wrapper, so
 * we don't need scroll math here.
 */
export default function BlogShareRail({ url, title }: Props) {
  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col gap-5">
      {/* Share row */}
      <div className="flex flex-col gap-2.5">
        <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#bbb]">
          Share
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SocialBtn
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialBtn>
          <SocialBtn
            href={`https://wa.me/?text=${encTitle}%20${enc}`}
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </SocialBtn>
          <SocialBtn
            href={`https://twitter.com/intent/tweet?url=${enc}&text=${encTitle}`}
            title="X / Twitter"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialBtn>
          <BlogShareCopy />
        </div>
      </div>

      {/* Newsletter Card */}
      <NewsletterCard />
    </div>
  );
}

function SocialBtn({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
      className="w-9 h-9 rounded-full border-[1.5px] border-[#e0e0e0] bg-white text-[#999] flex items-center justify-center transition-all hover:border-[#EF2E33] hover:text-[#EF2E33] hover:bg-[#fdeaeb] hover:scale-110"
    >
      <span className="w-[14px] h-[14px] block">{children}</span>
    </a>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("method", "Subscribe");
      fd.append("source", "earth.subtech.in blog share rail");

      // Same-origin proxy — see /api/enquiry/route.ts.
      await fetch("/api/enquiry", {
        method: "POST",
        body: fd,
      });

      setState("ok");
      setMsg("You're subscribed!");
      setEmail("");
    } catch {
      setState("err");
      setMsg("Connection error. Try again.");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[14px] bg-[#111] p-5 max-w-[600px]">
      {/* Pulsing red wire on left edge */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-[10px] h-[70%] [animation:wirePulse_3s_ease_infinite]"
        style={{
          background: `linear-gradient(to bottom, ${RED}, #ff6b6b, ${RED})`,
        }}
      />

      <div
        className="w-[34px] h-[34px] rounded-lg border flex items-center justify-center mb-3"
        style={{
          background: "rgba(239,46,51,0.15)",
          borderColor: "rgba(239,46,51,0.2)",
          color: RED,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <p
        className="text-[9px] font-extrabold tracking-[2px] uppercase mb-1.5"
        style={{ color: RED }}
      >
        Newsletter
      </p>
      <h4 className="text-[14px] font-extrabold text-white leading-[1.3] mb-1.5">
        Stay ahead in automation
      </h4>
      <p className="text-[11.5px] leading-[1.55] text-white/40 mb-3.5">
        Product launches &amp; industry insights — no spam.
      </p>

      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-white/5 border-[1.5px] border-white/10 text-white placeholder:text-white/35 px-3 py-2.5 rounded-lg outline-none text-[12.5px] focus:border-[color:var(--R)]"
          style={{ ["--R" as string]: RED }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-white font-bold text-[12px] cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(239,46,51,0.3)] disabled:opacity-70"
          style={{
            background: state === "ok" ? "#16a34a" : RED,
          }}
          onMouseEnter={(e) => {
            if (state !== "ok")
              (e.currentTarget as HTMLButtonElement).style.background = RED_DARK;
          }}
          onMouseLeave={(e) => {
            if (state !== "ok")
              (e.currentTarget as HTMLButtonElement).style.background = RED;
          }}
        >
          {state === "loading"
            ? "Sending..."
            : state === "ok"
              ? "Subscribed"
              : "Subscribe"}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <div
          className="text-[11.5px] font-semibold min-h-[16px] text-center"
          style={{
            color:
              state === "ok"
                ? "rgb(74,222,128)"
                : state === "err"
                  ? "rgb(248,113,113)"
                  : "rgba(255,255,255,0.5)",
          }}
        >
          {msg}
        </div>
      </form>

      <style jsx>{`
        @keyframes wirePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; box-shadow: 0 0 12px ${RED}; }
        }
      `}</style>
    </div>
  );
}
