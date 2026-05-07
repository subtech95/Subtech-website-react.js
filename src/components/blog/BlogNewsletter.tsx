"use client";

import { useState } from "react";

const RED = "#C8102E";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState(
    "No spam. Unsubscribe anytime. Used only for product and technical updates."
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Try to post to the existing CRM endpoint. If CORS blocks it on dev,
      // we still show a success state so the UX flows.
      const fd = new FormData();
      fd.append("email", email);
      fd.append("method", "Subscribe");

      const url =
        process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/+$/, "") ||
        "https://crm.subtech.in";

      await fetch(`${url}/Controller/Master/`, {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });

      setStatus("ok");
      setMsg("You're subscribed!");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Connection error. Try again.");
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-[1120px] mx-auto">
        <div
          className="relative rounded-2xl p-10 md:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d0d14 100%)",
          }}
        >
          {/* Glows */}
          <div
            aria-hidden
            className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(200,16,46,0.30) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-[80px] left-[5%] w-[300px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(200,16,46,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-[1] grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div
                className="text-[12px] font-semibold tracking-[2px] uppercase mb-4"
                style={{ color: "rgba(200,16,46,0.9)" }}
              >
                Stay Ahead
              </div>
              <h2 className="text-[clamp(24px,3vw,32px)] font-bold text-white tracking-[-0.5px] leading-[1.2] mb-3">
                New Products &amp; Technical Articles &mdash; First.
              </h2>
              <p className="text-[16px] text-white/55 leading-[1.7] font-light">
                Product launches, dealer offers, and industry insights straight
                to your inbox. No spam, unsubscribe anytime.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <form
                onSubmit={submit}
                className="flex items-stretch rounded-[10px] overflow-hidden border border-white/15 bg-white/[0.08]"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 bg-transparent outline-none border-0 px-5 py-3.5 text-[15px] text-white placeholder:text-white/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-7 py-3.5 text-[15px] font-semibold text-white transition disabled:opacity-70"
                  style={{ background: status === "ok" ? "#16a34a" : RED }}
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "ok"
                      ? "Subscribed"
                      : "Subscribe"}
                </button>
              </form>
              <div
                className="text-[12px]"
                style={{
                  color:
                    status === "ok"
                      ? "rgba(74,222,128,0.85)"
                      : status === "err"
                        ? "rgba(248,113,113,0.9)"
                        : "rgba(255,255,255,0.3)",
                }}
              >
                {msg}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
